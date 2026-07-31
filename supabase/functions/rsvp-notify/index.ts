// ═══════════════════════════════════════════════════════════════
//  rsvp-notify — Supabase Edge Function
//  Sends an email via Gmail SMTP whenever a guest RSVPs.
//
//  Invoked directly by the RSVP form in the browser via
//  supabase.functions.invoke('rsvp-notify', ...) — email only, no storage.
//
//  Spam protection (best-effort, in-memory):
//    • Honeypot fields  — hidden inputs bots auto-fill; humans never see them.
//    • Min submit time  — payload.started_at (epoch ms) must be > 1.5s old
//                         (and must be present); bots submit instantly.
//    • Per-IP rate cap  — at most 5 emails per 10 minutes per client IP.
//      Note: in-memory state is per warm instance; Supabase may run several,
//      so this is a deterrent, not a hard guarantee.
//
//  Required secrets (set with `supabase secrets set`):
//    GMAIL_USER        = naziraman7@gmail.com
//    GMAIL_APP_PASS    = your Gmail app password (no spaces)
//    NOTIFY_TO         = najir74680@gmail.com
//    GMAIL_FROM_NAME   = optional display name (default: Nazir & Aliya)
//    RSVP_AUTH         = the anon/publishable key from .env.local
//                        (VITE_SUPABASE_ANON_KEY) — the form sends this as
//                        Authorization: Bearer <key>. It must match exactly,
//                        otherwise every call returns 401.
// ═══════════════════════════════════════════════════════════════
import nodemailer from 'npm:nodemailer@6.9.15';

const GMAIL_USER = Deno.env.get('GMAIL_USER') ?? '';
const GMAIL_APP_PASS = (Deno.env.get('GMAIL_APP_PASS') ?? '').replace(/\s+/g, '');
const NOTIFY_TO = Deno.env.get('NOTIFY_TO') ?? '';
const FROM_NAME = Deno.env.get('GMAIL_FROM_NAME') ?? 'Nazir & Aliya';

// ── Spam protection ──
const HONEYPOT_FIELDS = ['website', 'company', 'phone'];
const MIN_SUBMIT_MS = 1500;            // humans take >1.5s after page load; bots submit instantly
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX_PER_IP = 5;             // max emails per IP per window
const submissions = new Map();         // ip -> number[] of timestamps

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

const getClientIp = (req) =>
  (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';

const isRateLimited = (ip) => {
  const now = Date.now();
  const times = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (times.length >= RATE_MAX_PER_IP) return true;
  times.push(now);
  submissions.set(ip, times);
  // Keep the map bounded
  if (submissions.size > 2000) {
    for (const [k, v] of submissions) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) submissions.delete(k);
    }
  }
  return false;
};

// Escape user content so guest markup never renders in the email
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function buildEmailHtml({ name, attendance, wishes, created_at }) {
  const attending = attendance === 'attending';
  const time = created_at
    ? new Date(created_at).toLocaleString('en-GB', {
      day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
    })
    : 'just now';

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0B0B0B;font-family:Georgia,'Times New Roman',serif;">
    <center>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;padding:32px 16px;">
        <tr><td align="center">
          <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background:#14100A;border:1px solid rgba(212,175,55,0.35);border-radius:16px;overflow:hidden;">
            <tr><td height="6" style="background:linear-gradient(90deg,#996515,#D4AF37,#F5E6A3,#D4AF37,#996515);"></td></tr>
            <tr><td align="center" style="padding:40px 36px 8px;">
              <p style="margin:0;color:#D4AF37;font-size:11px;letter-spacing:6px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Nazir &amp; Aliya</p>
              <h1 style="margin:14px 0 4px;color:#F5E6A3;font-size:28px;font-weight:normal;letter-spacing:1px;">New RSVP Received</h1>
              <div style="width:64px;height:1px;background:linear-gradient(90deg,transparent,#D4AF37,transparent);margin:16px auto;"></div>
            </td></tr>
            <tr><td align="center" style="padding:8px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1C1608;border:1px solid rgba(212,175,55,0.15);border-radius:12px;">
                <tr><td style="padding:20px 24px;border-bottom:1px solid rgba(212,175,55,0.1);">
                  <p style="margin:0;color:#D4AF37;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Guest</p>
                  <p style="margin:6px 0 0;color:#FDFBF7;font-size:20px;">${esc(name)}</p>
                </td></tr>
                <tr><td style="padding:20px 24px;border-bottom:1px solid rgba(212,175,55,0.1);">
                  <p style="margin:0;color:#D4AF37;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Response</p>
                  <p style="margin:6px 0 0;color:${attending ? '#8BE08B' : '#F4A2A2'};font-size:18px;">${attending ? 'InshaAllah attending' : 'Regretfully declining'}</p>
                </td></tr>
                <tr><td style="padding:20px 24px;">
                  <p style="margin:0;color:#D4AF37;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Wishes</p>
                  <p style="margin:6px 0 0;color:#E8DCC0;font-size:15px;line-height:1.6;font-style:italic;">&ldquo;${esc(wishes)}&rdquo;</p>
                </td></tr>
              </table>
            </td></tr>
            <tr><td align="center" style="padding:28px 36px 36px;">
              <p style="margin:0;color:rgba(253,251,247,0.45);font-size:12px;font-family:Arial,Helvetica,sans-serif;">Received ${time} &middot; via the wedding invitation</p>
              <p style="margin:10px 0 0;color:rgba(212,175,55,0.5);font-size:10px;letter-spacing:4px;font-family:Arial,Helvetica,sans-serif;">#NAZIRANDALIYA</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </center>
  </body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('method not allowed', { status: 405 });
  }

  // Accept only our anon/publishable key (public but RLS-protected) to stop
  // random abuse. The RSVP form sends: Authorization: Bearer <key>.
  // We compare against RSVP_AUTH — set to the exact key from .env.local
  // (VITE_SUPABASE_ANON_KEY) — so the two sides always match
  // (SUPABASE_ANON_KEY may be a legacy JWT that differs from the
  // publishable key).
  const auth = req.headers.get('authorization') ?? '';
  const expected = Deno.env.get('RSVP_AUTH') ?? Deno.env.get('SUPABASE_ANON_KEY');
  if (expected && auth !== `Bearer ${expected}`) {
    return new Response('unauthorized', { status: 401 });
  }

  try {
    const payload = await req.json();
    const { name, attendance, wishes, created_at } = payload;

    // 1) Honeypot: bots auto-fill hidden fields that humans never see.
    //    Pretend success so scrapers can't learn they were caught.
    for (const f of HONEYPOT_FIELDS) {
      if (typeof payload[f] === 'string' && payload[f].trim().length > 0) {
        console.log('rsvp-notify: honeypot triggered', { field: f });
        return json({ ok: true, ignored: true });
      }
    }

    // 2) Too fast to be human = bot. The form always sends started_at (epoch
    //    ms), so a missing value is suspicious too. Guard against clock skew:
    //    only enforce when the client timestamp is NOT in the future relative
    //    to the server (negative elapsed), so users with fast clocks are never
    //    blocked.
    if (typeof payload.started_at !== 'number') {
      console.log('rsvp-notify: rejected missing started_at');
      return json({ ok: true, ignored: true });
    }
    const elapsed = Date.now() - payload.started_at;
    if (elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
      console.log('rsvp-notify: rejected too-fast submit', { elapsed });
      return json({ ok: true, ignored: true });
    }

    // 3) Per-IP rate limit.
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      console.log('rsvp-notify: rate limited', { ip });
      return json({ ok: false, error: 'Too many RSVPs — please try again later.' }, 429);
    }

    if (!GMAIL_USER || !GMAIL_APP_PASS || !NOTIFY_TO) {
      return json({ ok: false, error: 'SMTP secrets not configured' }, 500);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASS },
    });

    const attending = attendance === 'attending';
    await transporter.sendMail({
      from: `${FROM_NAME} <${GMAIL_USER}>`,
      to: NOTIFY_TO,
      subject: `New RSVP: ${name} (${attending ? 'attending' : 'declining'})`,
      html: buildEmailHtml(payload),
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: err.message }, 500);
  }
});
