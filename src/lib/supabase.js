import { createClient } from '@supabase/supabase-js';

// Supabase is used here ONLY to call the rsvp-notify Edge Function, which
// emails najir74680@gmail.com when a guest RSVPs. Nothing is stored in the
// database — it's a send-and-forget call.
// Env vars come from .env.local (see .env.example):
//   VITE_SUPABASE_URL
//   VITE_SUPABASE_ANON_KEY
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create the client if credentials exist — the app degrades gracefully
// (simulated submission) when the backend isn't configured yet.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

// Send the RSVP straight to the rsvp-notify Edge Function (no DB storage).
// The function POSTs the email via Gmail SMTP and returns { ok: true }.
// Returns { data, error } like the Supabase API.
export const submitRsvp = async (payload) => {
  if (!supabase) return { error: new Error('Backend not configured') };

  const { data, error } = await supabase.functions.invoke('rsvp-notify', {
    // The edge function checks the Authorization header itself (RSVP_AUTH),
    // so send the anon key explicitly — supabase-js only adds it automatically
    // for signed-in sessions, and guests are anonymous here.
    headers: { Authorization: `Bearer ${anonKey}` },
    body: {
      name: payload.name,
      attendance: payload.attendance,
      wishes: payload.wishes ?? '',
      created_at: new Date().toISOString(),
      // Spam protection passthrough (honeypot + form start time)
      website: payload.website ?? '',
      started_at: payload.started_at,
    },
  });

  return { data, error };
};
