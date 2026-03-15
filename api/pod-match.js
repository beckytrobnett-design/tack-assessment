/**
 * Vercel serverless function: POST /api/pod-match
 * Finds an existing forming pod for the user orientation with space,
 * or creates a new one. Adds the user as a member.
 */
import { getSupabaseAdmin } from './supabase-server.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userId, orientation, name } = req.body;
  if (!userId || !orientation) return res.status(400).json({ error: 'Missing userId or orientation' });

  const supabase = getSupabaseAdmin();

  try {
    // Check user is not already in an active pod
    const { data: existing } = await supabase
      .from('pod_members')
      .select('pod_id, pods(status)')
      .eq('user_id', userId)
      .maybeSingle();

    if (existing?.pods?.status === 'active') {
      return res.status(200).json({ alreadyInPod: true, podId: existing.pod_id });
    }

    // Find a forming pod with same orientation with space
    const { data: existingPods } = await supabase
      .from('pods')
      .select('id, name, orientation, max_size, pod_members(count)')
      .eq('orientation', orientation)
      .eq('status', 'forming')
      .limit(5);

    let targetPod = null;
    for (const pod of (existingPods || [])) {
      const memberCount = pod.pod_members?.[0]?.count ?? 0;
      if (memberCount < pod.max_size) {
        targetPod = pod;
        break;
      }
    }

    // Create a new pod if none found
    if (!targetPod) {
      const orientationNames = {
        survivor: 'The Survivors', provider: 'The Providers', striver: 'The Strivers',
        vigilante: 'The Vigilantes', avoider: 'The Avoiders', builder: 'The Builders',
      };
      const { data: newPod } = await supabase
        .from('pods')
        .insert({
          name: orientationNames[orientation] || 'The Pod',
          orientation,
          status: 'forming',
          max_size: 5,
        })
        .select()
        .single();
      targetPod = newPod;
    }

    // Add user to pod
    await supabase.from('pod_members').upsert({
      pod_id: targetPod.id,
      user_id: userId,
      role: 'member',
    });

    // Count members now
    const { count } = await supabase
      .from('pod_members')
      .select('*', { count: 'exact', head: true })
      .eq('pod_id', targetPod.id);

    // If 2+ members, activate the pod and have Penny welcome everyone
    if (count >= 2) {
      await supabase.from('pods').update({ status: 'active' }).eq('id', targetPod.id);
      await supabase.from('pod_messages').insert({
        pod_id: targetPod.id,
        sender_name: 'Penny',
        is_penny: true,
        content: "Welcome to your pod. You're here because you share something important — a similar relatnship with money, and the courage to look at it honestly. This is a space to think out loud, support each other, and grow. I'll check in from time to time. For now, feel free to introduce yourselves.",
      });
    }

    return res.status(200).json({ success: true, podId: targetPod.id, status: count >= 2 ? 'active' : 'forming' });
  } catch (err) {
    console.error('pod-match error:', err);
    return res.status(500).json({ error: err.message });
  }
}
