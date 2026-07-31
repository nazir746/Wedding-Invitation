import emailjs from '@emailjs/browser';

// EmailJS — sends the RSVP email straight from the browser. No backend, no
// storage. Your Gmail credentials live on EmailJS's servers (connected in
// their dashboard); the browser only holds a public key, so nothing secret
// ships in the bundle.
//
// Env vars come from .env.local (see .env.example):
//   VITE_EMAILJS_SERVICE_ID   -> EmailJS Dashboard -> Email Services
//   VITE_EMAILJS_TEMPLATE_ID  -> EmailJS Dashboard -> Email Templates
//   VITE_EMAILJS_PUBLIC_KEY   -> EmailJS Dashboard -> Account -> API Keys
//
// The EmailJS template should use these variables:
//   {{from_name}}  {{attendance}}  {{wishes}}  {{created_at}}  {{to_name}}
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_khgode4';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_8q6u4nm';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Pmu2M5oKU8bLLFS1l';

// Browser-side rate limiting (EmailJS built-in): at most one send per 5s per
// browser. Safe to call repeatedly — init is idempotent.
if (PUBLIC_KEY) {
  emailjs.init({
    publicKey: PUBLIC_KEY,
    limitRate: { id: 'wedding-rsvp', throttle: 5000 },
  });
}

// Send the RSVP details to your inbox via EmailJS (no backend, no storage).
// Returns { data, error } — error carries a .status/.text when the API rejects.
export const submitRsvp = async (payload) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return { data: null, error: new Error('EmailJS not configured') };
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_name: 'Nazir & Aliya',
        from_name: payload.name,
        name: payload.name,
        attendance: payload.attendance === 'attending' ? 'InshaAllah attending' : 'Regretfully declining',
        wishes: payload.wishes ?? '',
        created_at: new Date().toLocaleString('en-GB', {
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
      PUBLIC_KEY,
    );

    return { data: response, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
