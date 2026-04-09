/**
 * Vercel serverless function: POST /api/send-report
 * Receives: name, email, primary_orientation, orientation_scores, score_details (optional), pdfBase64, responses, results
 * 1. Validates name and email
 * 2. Writes to Supabase assessment_responses (server-side only, never exposes keys)
 * 3. Sends personalized PDF report via Resend
 * 4. Optionally sends admin record email
 *
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY,
 *           RESEND_FROM_EMAIL, RESEND_ADMIN_EMAIL, TACK_APP_URL
 */

import { Resend } from 'resend';
import { getSupabaseAdmin } from './supabase-server.js';

const ORIENTATION_NAMES = {
  survivor: 'The Survivor',
  provider: 'The Provider',
  striver: 'The Striver',
  vigilante: 'The Vigilante',
  avoider: 'The Avoider',
  builder: 'The Builder',
};

/** Short, warm intro line from Penny for each orientation — used in the email body */
const PENNY_EMAIL_INTROS = {
  survivor:
    "You've carried more than most people will ever understand. Your results are ready — and they honor that.",
  provider:
    "Your generosity is a superpower — and it deserves protecting. Here's your report.",
  striver:
    "You work so hard — and it's time to see what that says about your relationship with money.",
  vigilante:
    "You're probably doing better than you think. Your report is here to help you feel that.",
  avoider:
    "You're here — and that takes real courage. Your results are ready.",
  builder:
    "You've done the work. Your report is here to help you refine it.",
};

function getFirstName(name) {
  if (!name || typeof name !== 'string') return 'there';
  const trimmed = name.trim();
  if (!trimmed) return 'there';
  const first = trimmed.split(/\s+/)[0];
  return first || 'there';
}

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

  const {
    name,
    email,
    primary_orientation,
    orientation_scores,
    score_details,
    pdfBase64,
    results,
    timestamp,
  } = req.body;

  // Validate required fields before any DB or email operations
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedName) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!trimmedEmail) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  const testEmail = process.env.TEST_EMAIL;
  if (testEmail && trimmedEmail !== testEmail) {
    return res.status(200).json({ message: 'TEST_MODE: email skipped' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Penny at TACK <onboarding@resend.dev>';
  const adminEmail = process.env.RESEND_ADMIN_EMAIL;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Fail fast if Supabase is not configured (helps debug deployment)
  try {
    getSupabaseAdmin();
  } catch (supabaseErr) {
    console.error('Supabase config error:', supabaseErr.message);
    return res.status(500).json({
      error: 'Database not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.',
    });
  }

  const orientation = primary_orientation || results?.primary?.orientation || 'builder';
  const orientationScores = orientation_scores ?? results ?? null;
  const ttmStage = results?.ttmStage ?? null;
  const recordTimestamp = timestamp || new Date().toISOString();
  const primaryName = ORIENTATION_NAMES[orientation] || orientation;
  const secondaryName = results?.secondary
    ? ORIENTATION_NAMES[results.secondary.orientation] || results.secondary.orientation
    : null;
  const firstName = getFirstName(trimmedName);

  // 1. Write to Supabase (server-side only — service role key never exposed to frontend)
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('assessment_responses').insert({
      name: trimmedName,
      email: trimmedEmail,
      primary_orientation: primaryName,
      orientation_scores: orientationScores,
      score_details: score_details ?? null,
      ttm_stage: ttmStage,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message || error.details || JSON.stringify(error) });
    }
  } catch (err) {
    console.error('Supabase error:', err);
    return res.status(500).json({ error: 'Could not save your response. Please try again.' });
  }

  // 2. Send personalized email via Resend — Library Sage branding
  const baseUrl = process.env.TACK_APP_URL || 'https://tack.tondreaupoint.com';
  const logoUrl = 'https://tack.tondreaupoint.com/logos/logo-stacked-dark.png';
  const pennyIntro =
    PENNY_EMAIL_INTROS[orientation] ||
    "Your orientation report is ready — it's got everything we talked about, plus a few things to sit with.";

  const userHtmlBody = `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; background-color: #F5EFE6; padding: 0;">
    
    <!-- Header -->
    <div style="background-color: #1C2B3F; padding: 32px 40px; text-align: center;">
      <a href="${baseUrl}" style="display: inline-block;">
        <img src="${logoUrl}" alt="TACK by Tondreau Point" width="120" style="display: block; margin: 0 auto; height: auto;" />
      </a>
    </div>

    <!-- Teal accent bar -->
    <div style="background-color: #3D8C8C; padding: 10px 40px; text-align: center;">
      <p style="font-size: 11px; letter-spacing: 0.3em; color: rgba(255,255,255,0.85); margin: 0; text-transform: uppercase; font-family: Georgia, serif;">Your Orientation Report</p>
    </div>

    <!-- Body -->
    <div style="background-color: #FDFAF6; padding: 36px 40px;">
      <p style="font-size: 16px; color: #1C2B3F; line-height: 1.7; margin: 0 0 16px;">Hi ${firstName},</p>
      <p style="font-size: 16px; color: #2B3A52; line-height: 1.7; margin: 0 0 16px;">${pennyIntro}</p>
      <p style="font-size: 16px; color: #2B3A52; line-height: 1.7; margin: 0 0 16px;">Your orientation report is attached — it's got everything we just talked about, plus a few things to sit with.</p>
      <p style="font-size: 16px; color: #2B3A52; line-height: 1.7; margin: 0 0 24px;">No rush. Read it when you're ready. And know that wherever you are right now is exactly the right place to start.</p>
      <p style="font-size: 16px; color: #1C2B3F; line-height: 1.7; margin: 0; font-style: italic;">— Penny</p>
    </div>

    <!-- Penny CTA -->
    <div style="background-color: #1C2B3F; padding: 36px 40px; text-align: center;">
      <p style="font-family: Georgia, serif; font-size: 20px; font-weight: 300; color: #FDFAF6; margin: 0 0 8px 0; line-height: 1.4;">Ready to go deeper?</p>
      <p style="font-size: 14px; color: rgba(255,255,255,0.55); margin: 0 0 24px 0; line-height: 1.6; font-family: Georgia, serif; font-style: italic;">Penny is your personal financial coach — available anytime you want to talk through what this means for your life.</p>
      <a href="${baseUrl}" style="display: inline-block; background-color: #3D8C8C; color: #ffffff; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 14px 32px; border-radius: 4px;">Talk to Penny</a>
    </div>

    <!-- Footer -->
    <div style="background-color: #F5EFE6; padding: 24px 40px; text-align: center; border-top: 1px solid rgba(196,131,74,0.2);">
      <a href="${baseUrl}"><img src="https://tack.tondreaupoint.com/logos/logo-wordmark-light.png" width="100" style="height:auto;display:block;margin:0 auto 10px auto;" alt="TACK by Tondreau Point" /></a>
      <p style="font-size: 11px; color: #9A8E7E; margin: 0;">© 2026 Tondreau Point · <a href="${baseUrl}/privacy" style="color: #9A8E7E; text-decoration: none;">Privacy</a></p>
    </div>

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

  const resend = new Resend(resendApiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: trimmedEmail,
      subject: `Your TACK Results Are Here, ${firstName}`,
      html: userHtmlBody,
      attachments,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    // 3. Send admin record email (if configured)
    if (adminEmail) {
      const adminHtmlBody = `
        <h2>New TACK Assessment Completed</h2>
        <table style="border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${trimmedName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${trimmedEmail}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Primary Orientation</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${primaryName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Secondary Orientation</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${secondaryName || '—'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Completed At</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${recordTimestamp}</td></tr>
        </table>
        <p style="margin-top: 16px; color: #6B7280; font-size: 12px;">TACK by Tondreau Point — Assessment Records</p>
      `;

      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `TACK Assessment: ${trimmedEmail} — ${primaryName}`,
        html: adminHtmlBody,
      });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Send report error:', err);
    return res.status(500).json({ error: err.message });
  }
}
