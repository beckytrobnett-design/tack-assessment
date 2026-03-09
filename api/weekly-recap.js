export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authenticate
  const auth = req.headers['authorization'];
  if (!auth || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  let emailsSent = 0;
  let emailsSkipped = 0;

  try {
    // Fetch all users with email
    const profilesRes = await fetch(
      `${supabaseUrl}/rest/v1/profiles?email=not.is.null&select=id,email,name,orientation,commitments,breakthroughs`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );
    const profiles = await profilesRes.json();
    console.log(`Found ${profiles.length} users`);

    for (const user of profiles) {
      try {
        // Fetch last 7 days of conversations
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const convoRes = await fetch(
          `${supabaseUrl}/rest/v1/conversations?user_id=eq.${user.id}&created_at=gte.${sevenDaysAgo}&order=created_at.asc`,
          {
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
          }
        );
        const messages = await convoRes.json();

        // Skip users with fewer than 3 messages
        if (!messages || messages.length < 3) {
          console.log(`Skipping ${user.email} — only ${messages?.length ?? 0} messages`);
          emailsSkipped++;
          continue;
        }

        // Extract user messages only, max 2000 chars
        const userMessages = messages
          .filter(m => m.role === 'user')
          .map(m => m.content)
          .join('\n');
        const excerpt = userMessages.slice(0, 2000);

        // Format commitments
        const commitmentText = (user.commitments || [])
          .map(c => {
            try {
              const item = typeof c === 'string' ? JSON.parse(c) : c;
              const obj = Array.isArray(item) ? item[0] : item;
              return obj?.text || '';
            } catch { return ''; }
          })
          .filter(Boolean)
          .join(', ') || 'None yet';

        // Call Claude for recap
        const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 600,
            system: `You are Penny, a warm financial wellness coach.
Write a very short weekly message — 3 to 5 sentences total, never more.

Structure:
1. Name one specific thing they worked on or said this week. Be concrete, not general.
2. Offer one brief reframe or reflection on it. One sentence.
3. End with one open question for the week ahead. Make it gentle and specific.

Rules:
- Use their name once, at the start.
- No summaries. No lists. No headers.
- No emojis. No hollow affirmations like great work or you should be proud.
- Write at a 6th grade reading level.
- The whole message should be readable in 20 seconds.`,
            messages: [{
              role: 'user',
              content: `User name: ${user.name || 'there'}
Orientation: ${user.orientation || 'unknown'}
Active commitments: ${commitmentText}
This week's conversation excerpts: ${excerpt}`,
            }],
          }),
        });

        const claudeData = await claudeRes.json();
        const recap = claudeData.content[0].text;

        // Format recap paragraphs as HTML
        const recapHtml = recap
          .split(/\n+/)
          .filter(p => p.trim())
          .map(p => `<p style="margin:0 0 20px 0;line-height:1.7;">${p.trim()}</p>`)
          .join('');

        const htmlBody = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#EEEADE;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EEEADE;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#EEEADE;border-radius:12px;overflow:hidden;border:1px solid #D8D4C8;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 36px 24px 36px;border-bottom:1px solid #D8D4C8;">
            <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:24px;color:#1B3A52;letter-spacing:0.5px;">TACK</p>
            <p style="margin:3px 0 0 0;font-size:10px;color:#8A9A8A;letter-spacing:2.5px;font-family:Arial,sans-serif;text-transform:uppercase;">by Tondreau Point</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 8px 36px;color:#1B3A52;font-size:16px;">
            ${recapHtml}
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:8px 36px 12px 36px;">
            <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#5C7A6A;">Whenever you're ready, Penny is here.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 36px 40px 36px;">
            <a href="https://tack.tondreaupoint.com" style="display:inline-block;background:#1B3A52;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 28px;border-radius:4px;">Open Penny</a>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="padding:0 36px 32px 36px;border-top:1px solid #D8D4C8;">
            <p style="margin:24px 0 0 0;font-family:Georgia,serif;font-style:italic;font-size:14px;color:#5C7A6A;">— Penny</p>
            <p style="margin:8px 0 0 0;font-size:11px;color:#AAAAAA;font-family:Arial,sans-serif;">TACK by Tondreau Point &nbsp;|&nbsp; You're receiving this as a TACK member.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

        // Send via Resend
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: user.email,
            subject: 'Your week with Penny',
            html: htmlBody,
            text: recap,
          }),
        });

        const emailData = await emailRes.json();
        console.log(`Email sent to ${user.email}:`, emailData.id);
        emailsSent++;

      } catch (userError) {
        console.error(`Error processing user ${user.email}:`, userError);
        emailsSkipped++;
      }
    }

    res.status(200).json({ emailsSent, emailsSkipped });

  } catch (error) {
    console.error('Weekly recap error:', error);
    res.status(500).json({ error: 'Weekly recap failed', details: error.message });
  }
}
