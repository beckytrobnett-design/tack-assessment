/**
 * Vercel serverless function: POST /api/join-waitlist
 * Accepts email, looks up assessment_responses by email, sets waitlist = true.
 * Uses SUPABASE_SERVICE_ROLE_KEY server-side only — never in frontend.
 *
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { getSupabaseAdmin } from './supabase-server.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const { email } = req.body;
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';

  if (!trimmedEmail) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('assessment_responses')
      .update({ waitlist: true })
      .eq('email', trimmedEmail)
      .select('id');

    if (error) {
      console.error('Join waitlist error:', error);
      return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }

    // No rows updated = email not found (user may have completed assessment before we stored responses)
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'We couldn\'t find your assessment. Please complete the assessment first.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Join waitlist error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
