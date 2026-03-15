/**
 * Vercel serverless function: POST /api/pod-message
 * Saves a pod message, triggers Penny response if @Penny mentioned,
 * and sends push notifications to other pod members.
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

    // If @Penny mentioned, generate a response
    if (content.toLowerCase().includes('@penny')) {
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

      // Fetch pod orientation
      const { data: pod } = await supabase.from('pods').select('orientation, name').eq('id', podId).single();

      const pennyRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: `You are Penny, a warm financial wellness coach participating in a small peer support group called "${pod?.name || 'The Pod'}". The group members all share the "${pod?.orientation || 'survivor'}" financial orientation. You were just @mentioned. Respond briefly, warmly, and helpfully — like a trusted guide, not a therapist. Keep it to 2-3 sentences max. No emojis.`,
          mesges: [{ role: 'user', content: `Group chat context:\n${context}\n\nRespond to the @Penny mention.` }]
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
    }

    return res.status(200).json({ success: true, message });
  } catch (err) {
    console.error('pod-message error:', err);
    return res.status(500).json({ error: err.message });
  }
}
