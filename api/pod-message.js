/**
 * Vercel serverless function: POST /api/pod-message
 * Saves a pod message, triggers Penny response as group coach.
 * If @Penny mentioned, responds directly to that person; otherwise
 * responds to the group as a whole.
 */
import { getSupabaseAdmin } from './supabase-server.js';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { podId, senderId, senderName, content } = req.body;
  if (!podId || !content) return res.status(400).json({ error: 'Missing podId or content' });

  const supabase = getSupabaseAdmin();

  try {
    // Save message
    const { data: message, error: msgError } = await supabase
      .from('pod_messages')
      .insert({ pod_id: podId, sender_id: senderId, sender_name: senderName, content })
      .select()
      .single();

    if (msgError) throw msgError;

    // Update pod last_message_at
    await supabase.from('pods').update({ last_message_at: new Date().toISOString() }).eq('id', podId);

    // Penny responds to every message as group coach
    const mentionedPenny = content.toLowerCase().includes('@penny');

    // Fetch recent messages for context
    const { data: recentMessages } = await supabase
      .from('pod_messages')
      .select('sender_name, content, is_penny')
      .eq('pod_id', podId)
      .order('created_at', { ascending: false })
      .limit(10);

    const context = (recentMessages || []).reverse()
      .map(m => `${m.is_penny ? 'Penny' : m.sender_name}: ${m.content}`)
      .join('\n');

    // Fetch pod orientation and name
    const { data: pod } = await supabase.from('pods').select('orientation, name').eq('id', podId).single();

    const systemPrompt = `You are Penny, a trauma-informed financial wellness coach facilitating a small peer support group called "${pod?.name || 'The Survivors'}". Your role is to be a warm, present group coach — affirming what members share, asking gentle follow-up questions, and helping the group feel safe and connected. Keep responses short (2-4 sentences). Never lecture. If someone mentions @Penny, respond directly to them. Otherwise respond to the group as a whole.`;

    const userPrompt = mentionedPenny
      ? `Group chat context:\n${context}\n\n${senderName} just @mentioned you. Respond directly to them with a personal reply.`
      : `Group chat context:\n${context}\n\nRespond to the group as a whole — affirm what was shared, ask a gentle follow-up, or help the group feel connected.`;

    const pennyRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    const pennyData = await pennyRes.json();
    const pennyText = pennyData.content?.[0]?.text;

    if (pennyText) {
      await supabase.from('pod_messages').insert({
        pod_id: podId,
        sender_name: 'Penny',
        content: pennyText,
        is_penny: true
      });
    }

    return res.status(200).json({ success: true, message });
  } catch (err) {
    console.error('pod-message error:', err);
    return res.status(500).json({ error: err.message });
  }
}
