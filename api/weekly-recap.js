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

Format it exactly like this:
Hi [Name],

[One or two sentences: name something specific they worked on and offer a brief reframe.]

[One gentle open question for the week ahead.]

Rules:
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

        // Generate personalized subject line
        const subjectRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 30,
            messages: [{
              role: 'user',
              content: `Write a short email subject line for this weekly coaching message. 5-8 words max. No quotes. No punctuation at the end. Personal and specific to the content, not generic. Start with the user's first name: ${user.name?.split(' ')[0] || 'there'}.\n\nMessage: ${recap}\n\nSubject line only, nothing else.`,
            }],
          }),
        });
        const subjectData = await subjectRes.json();
        const subject = subjectData.content?.[0]?.text?.trim().replace(/['"]/g, '') || `Your week with Penny`;

        // Format recap paragraphs as HTML
        const recapHtml = recap
          .split(/\n+/)
          .filter(p => p.trim())
          .map(p => `<p style="font-size:16px;color:#556553;line-height:1.7;margin:0 0 16px 0;">${p.trim()}</p>`)
          .join('');

        const htmlBody = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; background-color: #F6F3ED; padding: 40px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="https://tack.tondreaupoint.com" style="display: inline-block;">
          <img src="https://tack.tondreaupoint.com/tack-mark.png" alt="TACK by Tondreau Point" width="80" style="display: block; margin: 0 auto; height: auto;" />
        </a>
        <p style="font-family: Georgia, serif; font-size: 18px; font-weight: 600; color: #2B3E2E; letter-spacing: 0.08em; margin: 12px 0 0 0;">TACK</p>
        <p style="font-family: Georgia, serif; font-size: 12px; font-style: italic; color: #B5893E; margin: 4px 0 0 0;">by Tondreau Point</p>
      </div>
      <div style="background-color: #FDFCF9; padding: 32px; border-radius: 12px; border: 1px solid rgba(181, 137, 62, 0.1); box-shadow: 0 1px 3px rgba(43, 62, 46, 0.08);">
        ${recapHtml}
        <p style="font-size: 16px; color: #2B3E2E; line-height: 1.7; margin: 0; font-style: italic;">— Penny</p>
      </div>
      <div style="text-align: center; margin-top: 28px;">
        <p style="font-size: 14px; font-family: Georgia, serif; font-style: italic; color: #8A9784; margin: 0 0 16px 0;">Whenever you\'re ready, Penny is here.</p>
        <a href="https://tack.tondreaupoint.com" style="display: inline-block; background-color: #2B3E2E; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 13px 28px; border-radius: 4px;">Penny Chat</a>
      </div>
      <p style="text-align: center; margin-top: 28px; font-size: 12px;">
        <a href="https://tack.tondreaupoint.com" style="color: #B5893E; text-decoration: none; font-family: Georgia, serif; font-style: italic;">TACK by Tondreau Point</a>
      </p>
    </div>
  `;

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
            subject: subject,
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
