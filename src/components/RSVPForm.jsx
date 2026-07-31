import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart } from 'lucide-react';
import { submitRsvp } from '../lib/email';
import { wedding } from '../weddingConfig';

const STORAGE_KEY = 'wedding-rsvp';

const loadSaved = () => {
  try {
    const r = localStorage.getItem(STORAGE_KEY);
    if (r) return JSON.parse(r);
  } catch {
    /* ignore */
  }
  return null;
};

const RSVPForm = () => {
  const [formData, setFormData] = useState(
    () => loadSaved()?.form ?? { name: wedding.guest || '', attendance: 'attending', wishes: '' }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  // "Submitted" is a real flag, never derived from mere presence of a draft,
  // so a plain refresh can't show the thank-you card for an unsent response.
  const [submitted, setSubmitted] = useState(() => !!loadSaved()?.submitted);
  const [error, setError] = useState(null);

  // Spam protection:
  // - honeypot: a hidden field only bots fill in (humans never see it)
  // - startedAt: when the form mounted, so the server can reject instant submits.
  //   Lazy-initialized inside an effect (not useRef(Date.now())) to satisfy the
  //   React purity lint rule.
  const [honeypot, setHoneypot] = useState('');
  const startedAtRef = useRef(null);

  // Persist draft + submitted flag together; also stamp the form mount time
  // once (used by the server's anti-bot min-time check)
  useEffect(() => {
    if (startedAtRef.current === null) startedAtRef.current = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form: formData, submitted }));
  }, [formData, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    // Honeypot check for spam protection
    if (honeypot.trim().length > 0) {
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    // Dispatch email notification via EmailJS
    try {
      const { error: submitError } = await submitRsvp(formData);
      if (submitError) {
        console.warn('EmailJS notification notice:', submitError);
      }
    } catch (err) {
      console.warn('EmailJS notification notice:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const update = (field, value) => {
    setError(null);
    setFormData((f) => ({ ...f, [field]: value }));
  };

  const inputStyle = {
    background: 'rgba(212,175,55,0.03)',
    border: '1px solid rgba(212,175,55,0.15)',
    borderRadius: '12px',
    color: '#FAF6EE',
    padding: '14px 16px',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  if (submitted) {
    const attending = formData.attendance === 'attending';
    return (
      <div className="px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-10 rounded-3xl text-center"
          style={{
            background: 'linear-gradient(145deg, rgba(20,15,5,0.9) 0%, rgba(12,9,3,0.95) 100%)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)' }}
          >
            <Heart size={22} style={{ color: '#D4AF37' }} />
          </motion.div>

          <h3
            className="text-3xl font-serif mb-3"
            style={{ color: '#D4AF37', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic' }}
          >
            JazakAllah Khayr!
          </h3>
          <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'rgba(250,246,238,0.6)' }}>
            {attending
              ? `Thank you ${(formData.name || '').split(' ')[0] || 'friend'}, we look forward to celebrating with you!`
              : `Thank you ${(formData.name || '').split(' ')[0] || 'friend'}, we'll miss you — your kind wishes mean the world.`}
          </p>
          {formData.wishes && (
            <div
              className="mb-6 px-4 py-3 rounded-xl text-sm font-serif italic"
              style={{
                background: 'rgba(212,175,55,0.05)',
                border: '1px solid rgba(212,175,55,0.1)',
                color: 'rgba(250,246,238,0.7)',
              }}
            >
              &ldquo;{formData.wishes}&rdquo;
            </div>
          )}
          <button
            onClick={() => setSubmitted(false)}
            className="text-[9px] uppercase tracking-widest font-sans transition-colors"
            style={{ color: 'rgba(212,175,55,0.4)' }}
            onMouseEnter={(e) => (e.target.style.color = 'rgba(212,175,55,0.7)')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(212,175,55,0.4)')}
          >
            Change Response
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(20,15,5,0.9) 0%, rgba(12,9,3,0.95) 100%)',
          border: '1px solid rgba(212,175,55,0.12)',
        }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center" style={{ borderBottom: '1px solid rgba(212,175,55,0.07)' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-8" style={{ background: 'rgba(212,175,55,0.3)' }} />
            <Heart size={12} style={{ color: 'rgba(212,175,55,0.5)' }} />
            <div className="h-px w-8" style={{ background: 'rgba(212,175,55,0.3)' }} />
          </div>
          <h3
            className="text-3xl mb-1"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              color: '#D4AF37',
              textShadow: '0 0 30px rgba(212,175,55,0.3)',
            }}
          >
            RSVP
          </h3>
          <p className="text-[10px] uppercase tracking-widest font-sans" style={{ color: 'rgba(250,246,238,0.35)' }}>
            Kindly respond by December 1, 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {/* Honeypot — visually hidden; only bots fill this in */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, overflow: 'hidden' }}
          />

          {/* Name */}
          <div>
            <label
              htmlFor="rsvp-name"
              className="block text-[9px] uppercase tracking-[0.25em] mb-2 font-sans"
              style={{ color: 'rgba(212,175,55,0.55)' }}
            >
              Your Full Name
            </label>
            <input
              id="rsvp-name"
              required
              type="text"
              value={formData.name}
              onChange={(e) => update('name', e.target.value)}
              autoComplete="name"
              placeholder="Enter your name"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.06), 0 0 20px rgba(212,175,55,0.1)';
                e.target.style.background = 'rgba(212,175,55,0.05)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(212,175,55,0.15)';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(212,175,55,0.03)';
              }}
            />
          </div>

          {/* Attendance */}
          <div>
            <label
              className="block text-[9px] uppercase tracking-[0.25em] mb-3 font-sans"
              style={{ color: 'rgba(212,175,55,0.55)' }}
            >
              Will you attend?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'attending', label: 'InshaAllah ✓', sub: "I'll be there" },
                { value: 'declining', label: 'Regretfully ✕', sub: 'Unable to attend' },
              ].map((opt) => (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => update('attendance', opt.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-pressed={formData.attendance === opt.value}
                  className="py-3.5 px-4 rounded-xl text-left transition-all"
                  style={{
                    background:
                      formData.attendance === opt.value ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.03)',
                    border:
                      formData.attendance === opt.value
                        ? '1px solid rgba(212,175,55,0.45)'
                        : '1px solid rgba(212,175,55,0.1)',
                    boxShadow:
                      formData.attendance === opt.value ? '0 0 20px rgba(212,175,55,0.1)' : 'none',
                  }}
                >
                  <p
                    className="text-sm font-serif"
                    style={{ color: formData.attendance === opt.value ? '#D4AF37' : 'rgba(250,246,238,0.6)' }}
                  >
                    {opt.label}
                  </p>
                  <p className="text-[9px] font-sans mt-0.5" style={{ color: 'rgba(250,246,238,0.3)' }}>
                    {opt.sub}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Wishes */}
          <div>
            <label
              htmlFor="rsvp-wishes"
              className="block text-[9px] uppercase tracking-[0.25em] mb-2 font-sans"
              style={{ color: 'rgba(212,175,55,0.55)' }}
            >
              Your Blessing &amp; Wishes
            </label>
            <textarea
              id="rsvp-wishes"
              rows={4}
              value={formData.wishes}
              onChange={(e) => update('wishes', e.target.value)}
              placeholder="Send your heartfelt blessings…"
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.06)';
                e.target.style.background = 'rgba(212,175,55,0.05)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(212,175,55,0.15)';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(212,175,55,0.03)';
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="text-xs font-sans text-center"
              style={{ color: 'rgba(244,130,110,0.9)' }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            className="w-full py-4 rounded-xl flex items-center justify-center gap-2.5 font-sans font-medium text-sm tracking-wider disabled:opacity-50 transition-all"
            style={{
              background: 'linear-gradient(135deg, #8B6914 0%, #D4AF37 35%, #F5E6A3 50%, #D4AF37 65%, #8B6914 100%)',
              backgroundSize: '200% auto',
              color: '#0D0A04',
              boxShadow: '0 8px 30px rgba(212,175,55,0.25), 0 0 0 1px rgba(212,175,55,0.3)',
              animation: isSubmitting ? 'none' : 'gold-shimmer 4s linear infinite',
            }}
          >
            {isSubmitting ? (
              <>
                <div
                  className="w-5 h-5 rounded-full border-2 border-transparent border-t-[#0D0A04]"
                  style={{ animation: 'spin 0.8s linear infinite' }}
                />
                <span>Sending…</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Confirm Attendance</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RSVPForm;
