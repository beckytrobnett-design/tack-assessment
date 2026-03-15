/**
 * Vercel serverless function: POST /api/send-invite
 * Sends a branded invite email and records in Supabase invites table.
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY,
 *           RESEND_FROM_EMAIL, TEST_EMAIL
 */
import { Resend } from 'resend';
import { getSupabaseAdmin } from './supabase-server.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { inviterName, inviterEmail, inviterOrientation, inviteeName, inviteeEmail, inviterId } = req.body;

  if (!inviteeName || !inviteeEmail) {
    return res.status(400).json({ error: 'Missing invitee name or email' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const testEmail = process.env.TEST_EMAIL;

  // TEST_MODE: only send to test email
  const recipientEmail = testEmail || inviteeEmail;

  const assessmentUrl = 'https://tack.tondreaupoint.com';

  const htmlBody = `
  <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background-color: #F5EFE6; padding: 0;">

    <!-- Header -->
    <div style="background-color: #1C2B3F; padding: 32px 40px; text-align: center;">
      <a href="${assessmentUrl}">
        <img src="https://tack.tondreaupoint.com/logos/logo-stacked-dark.png" alt="TACK by Tondreau Point" width="120" style="display: block; margin: 0 auto; height: auto;" />
      </a>
    </div>

    <!-- Teal accent bar -->
    <div style="background-color: #3D8C8C; padding: 10px 40px; text-align: center;">
      <p style="font-size: 11px; letter-spacing: 0.3em; color: rgba(255,255,255,0.85); margin: 0; text-transform: uppercase; font-family: Georgia, serif;">You have been invited</p>
    </div>

    <!-- Body -->
    <div style="background-color: #FDFAF6; padding: 40px;">
      <p style="font-size: 16px; color: #1C2B3F; line-height: 1.7; margin: 0 0 16px;">Hi ${inviteeName},</p>
      <p style="font-size: 16px; color: #2B3A52; line-height: 1.7; margin: 0 0 16px;">${inviterName || 'Someone you know'} thought you might want to know your financial orientation — and invited you to find out.</p>
      <p style="font-size: 16px; font-style: italic; color: #2B3A52; line-height: 1.7; margin: 0 0 16px;">TACK is a short, honest questionnaire about your relationship with money. Not your budget. Not your credit score. The story underneath all of it.</p>
      <p style="font-size: 16px; color: #2B3A52; line-height: 1.7; margin: 0 0 32px;">It takes 7 minutes. There are no wrong answers.</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${assessmentUrl}" style="display: inline-block; background-color: #3D8C8C; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 14px 32px; border-radius: 4px;">Take the Assessment</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #F5EFE6; padding: 24px 40px; text-align: center; border-top: 1px solid rgba(196,131,74,0.2);">
      <a href="${assessmentUrl}"><img src="https://tack.tondreaupoint.com/logos/logo-wordmark-dark.png" width="100" style="height:auto;display:block;margin:0 auto 10px auto;" alt="TACK by Tondreau Point" /></a>
      <p style="font-size: 11px; color: #9A8E7E; margin: 0;">© 2026 Tondreau Point · <a href="${assessmentUrl}/privacy" style="color: #9A8E7E; text-decoration: none;">Privacy</a></p>
    </div>

  </div>`;

  try {
    // Save to Supabase
    const supabase = getSupabaseAdmin();
    await supabase.from('invites').insert({
      inviter_id: inviterId || null,
      inviter_name: inviterName || null,
      inviter_email: inviterEmail || null,
      inviter_orientation: inviterOrientation || null,
      invitee_name: inviteeName,
      invitee_email: inviteeEmail,
      status: 'pending',
    });

    // Send email
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: `${inviterName || 'Someone'} invited you to discover your financial orientation`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-invite error:', err);
    return res.status(500).json({ error: err.message || 'Failed to send invite' });
  }
}
