/**
 * Vercel serverless function: POST /api/send-report
 * Receives: email, responses, results, pdfBase64, timestamp
 * 1. Sends PDF orientation report to the user via Resend
 * 2. Sends admin record email (email, orientation results, timestamp) for your records
 *
 * Env vars: RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_ADMIN_EMAIL, TACK_APP_URL (default: https://tack.tondreaupoint.com)
 */

import { Resend } from 'resend';

const ORIENTATION_NAMES = {
  survivor: 'The Survivor',
  provider: 'The Provider',
  striver: 'The Striver',
  vigilante: 'The Vigilante',
  avoider: 'The Avoider',
  builder: 'The Builder',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { email, results, pdfBase64, timestamp } = req.body;

  if (!email || !results) {
    return res.status(400).json({ error: 'Missing email or results' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Penny at TACK <onboarding@resend.dev>';
  const adminEmail = process.env.RESEND_ADMIN_EMAIL;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const resend = new Resend(resendApiKey);
  const recordTimestamp = timestamp || new Date().toISOString();
  const primaryName = ORIENTATION_NAMES[results.primary?.orientation] || results.primary?.orientation;
  const secondaryName = results.secondary
    ? ORIENTATION_NAMES[results.secondary.orientation] || results.secondary.orientation
    : null;

  const baseUrl = process.env.TACK_APP_URL || 'https://tack.tondreaupoint.com';
  const logoUrl = `${baseUrl}/logo-horizontal.png`;

  const userHtmlBody = `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; background-color: #F5F3ED; padding: 40px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${baseUrl}" style="display: inline-block;">
          <img src="${logoUrl}" alt="TACK by Tondreau Point" width="280" style="max-width: 100%; height: auto; display: block;" />
        </a>
      </div>
      <div style="background-color: #ffffff; padding: 32px; border-radius: 8px; box-shadow: 0 1px 3px rgba(26,43,68,0.08);">
        <p style="font-size: 16px; color: #1A2B44; line-height: 1.7; margin: 0 0 16px;">Hi there,</p>
        <p style="font-size: 16px; color: #1A2B44; line-height: 1.7; margin: 0 0 16px;">Thanks for taking the time to explore your relationship with money. That takes real courage.</p>
        <p style="font-size: 16px; color: #1A2B44; line-height: 1.7; margin: 0 0 16px;">Your orientation report is attached — it's got everything we just talked about, plus a few things to sit with.</p>
        <p style="font-size: 16px; color: #1A2B44; line-height: 1.7; margin: 0 0 24px;">No rush. Read it when you're ready. And know that wherever you are right now is exactly the right place to start.</p>
        <p style="font-size: 16px; color: #1A2B44; line-height: 1.7; margin: 0; font-style: italic;">— Penny</p>
      </div>
      <p style="text-align: center; margin-top: 32px; font-size: 12px; color: #A88661;">
        <a href="${baseUrl}" style="color: #A88661; text-decoration: none;">TACK by Tondreau Point</a>
      </p>
    </div>
  `;

  const attachments = pdfBase64
    ? [
        {
          filename: 'TACK-Orientation-Report.pdf',
          content: Buffer.from(pdfBase64, 'base64'),
        },
      ]
    : [];

  try {
    // 1. Send PDF report to the user
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your TACK Orientation Report Is Here',
      html: userHtmlBody,
      attachments,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    // 2. Send admin record email (if RESEND_ADMIN_EMAIL is set)
    if (adminEmail) {
      const adminHtmlBody = `
        <h2>New TACK Assessment Completed</h2>
        <table style="border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Primary Orientation</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${primaryName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Secondary Orientation</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${secondaryName || '—'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Completed At</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${recordTimestamp}</td></tr>
        </table>
        <p style="margin-top: 16px; color: #6B7280; font-size: 12px;">TACK by Tondreau Point — Assessment Records</p>
      `;

      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `TACK Assessment: ${email} — ${primaryName}`,
        html: adminHtmlBody,
      });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Send report error:', err);
    return res.status(500).json({ error: err.message });
  }
}
