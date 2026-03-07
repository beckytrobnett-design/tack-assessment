export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, systemPrompt, userId, userMessage } = req.body;

    // --- PENNY'S RESPONSE ---
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: systemPrompt,
        messages: messages,
      }),
    });

    const data = await response.json();
    const pennyResponse = data.content[0].text;

    // --- MEMORY EXTRACTION ---
    // Only run if we have userId and userMessage
    if (userId && userMessage) {
      try {
        const extractionPrompt = `You are analyzing a coaching conversation to extract structured data.

The user's message: "${userMessage}"
Penny's response: "${pennyResponse}"

Respond with JSON only. No other text. Format:
{
  "commitment": null or "brief description of commitment user made",
  "breakthrough": null or "brief description of insight or shift that occurred",
  "language_shift": null or "if user described themselves differently than before, capture it"
}

Only extract something if it clearly occurred. Most exchanges will return all nulls. Be conservative.`;

        const extractionResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 200,
            messages: [{ role: 'user', content: extractionPrompt }],
          }),
        });

        const extractionData = await extractionResponse.json();
        const rawText = extractionData.content[0].text.replace(/```json\n?|\n?```/g, '').trim();
        const extracted = JSON.parse(rawText);
        const today = new Date().toISOString().split('T')[0];

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (extracted.commitment) {
          const item = JSON.stringify([{ text: extracted.commitment, date: today, active: true }]);
          await fetch(`${supabaseUrl}/rest/v1/rpc/append_to_commitments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ user_id: userId, new_item: item }),
          });
        }

        if (extracted.breakthrough) {
          const item = JSON.stringify([{ text: extracted.breakthrough, date: today }]);
          await fetch(`${supabaseUrl}/rest/v1/rpc/append_to_breakthroughs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ user_id: userId, new_item: item }),
          });
        }

      } catch (extractionError) {
        console.error('Memory extraction failed (non-fatal):', extractionError);
      }
    }

    res.status(200).json({ content: pennyResponse });

  } catch (error) {
    console.error('Penny chat error:', error);
    res.status(500).json({ error: 'Penny had trouble responding.' });
  }
}
