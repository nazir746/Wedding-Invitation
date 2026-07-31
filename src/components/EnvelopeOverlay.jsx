import { motion } from 'framer-motion';
import { useState } from 'react';
import Confetti from './Confetti';

// Generate star particle positions once at module scope so no impure
// Math.random() calls happen during render.
const STARS = Array.from({ length: 20 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 4,
}));

const EnvelopeOverlay = ({ onReveal }) => {
  const [isRevealing, setIsRevealing] = useState(false);

  const handleReveal = () => {
    if (isRevealing) return;
    setIsRevealing(true);
    setTimeout(onReveal, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #100D06 0%, #070707 60%, #040404 100%)' }}
    >
      {/* Ambient gold vignette background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,175,55,0.08) 0%, transparent 70%)'
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 flex flex-col items-center"
      >

        {/* The Envelope */}
        <motion.button
          onClick={handleReveal}
          disabled={isRevealing}
          whileHover={!isRevealing ? { scale: 1.02, y: -4 } : {}}
          whileTap={!isRevealing ? { scale: 0.98 } : {}}
          aria-label="Open the wedding invitation"
          className="envelope group focus:outline-none"
          style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 30px rgba(212,175,55,0.15))' }}
        >
          <div className="envelope-back" />

          {/* Letter slides up */}
          <motion.div
            className="envelope-letter"
            initial={false}
            animate={
              isRevealing
                ? { y: '-65%', rotateX: -12, opacity: 1 }
                : { y: 0, rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.8, delay: isRevealing ? 0.5 : 0, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="text-center px-3 py-1.5 w-full flex flex-col items-center justify-center">
              {/* Bismillah */}
              <p className="font-sans mb-1" style={{
                fontSize: '10px',
                color: 'rgba(80,55,10,0.55)',
                letterSpacing: '0.04em',
                direction: 'rtl',
                display: 'block',
              }}>
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>

              {/* Top ornament */}
              <div className="flex items-center justify-center gap-2 mb-1.5 w-full">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(100,70,10,0.35))' }} />
                <svg width="6" height="6" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="rgba(139,105,20,0.4)"/></svg>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(-90deg, transparent, rgba(100,70,10,0.35))' }} />
              </div>

              <p style={{ color: 'rgba(50,35,5,0.45)', fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '3px' }}>
                Wedding Invitation
              </p>

              {/* Couple names on letter */}
              <p style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: 'italic',
                fontSize: '1.4rem',
                fontWeight: 400,
                color: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #6B4F0A 0%, #B8860B 40%, #8B6914 70%, #6B4F0A 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                lineHeight: 1.1,
                marginBottom: '3px',
              }}>
                Nazir &amp; Aliya
              </p>

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-2 mt-1 w-full">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(100,70,10,0.3))' }} />
                <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(139,105,20,0.35)' }} />
                <div className="h-px flex-1" style={{ background: 'linear-gradient(-90deg, transparent, rgba(100,70,10,0.3))' }} />
              </div>

              <p style={{ color: 'rgba(50,35,5,0.35)', fontSize: '6px', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginTop: '3px' }}>
                5 &amp; 6 December 2026
              </p>
            </div>
          </motion.div>

          <div className="envelope-front" />
          <div className="envelope-shadow" />

          {/* Envelope flap with gold edge */}
          <motion.div
            className="envelope-flap"
            initial={false}
            animate={isRevealing ? { rotateX: -178 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* Gold Envelope edge accent */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-[7]"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 40%, transparent 60%, rgba(212,175,55,0.05) 100%)',
              borderRadius: '16px'
            }}
          />

          {/* Seal wrapper — plain div handles centering, motion.div handles animation only */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              transform: 'translate(-50%, -50%)',
              zIndex: 6,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
            <motion.div
              animate={isRevealing
                ? { scale: [1, 1.8, 0], opacity: [1, 1, 0] }
                : { scale: 1, opacity: 1 }
              }
              transition={isRevealing
                ? { duration: 1, delay: 0.2, ease: 'easeInOut' }
                : { duration: 0.3 }
              }
              style={{
                filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.7)) drop-shadow(0 0 40px rgba(212,175,55,0.3))'
              }}
            >
              {/* Pure SVG Seal — no image dependency */}
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                {/* Outer ring */}
                <circle cx="48" cy="48" r="46" stroke="url(#sealGold1)" strokeWidth="2" fill="url(#sealBg)" />
                {/* Inner decorative ring */}
                <circle cx="48" cy="48" r="40" stroke="url(#sealGold2)" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
                {/* Inner circle */}
                <circle cx="48" cy="48" r="33" stroke="url(#sealGold1)" strokeWidth="1" fill="url(#sealInner)" />
                {/* Monogram N&A */}
                <text x="48" y="50" textAnchor="middle" dominantBaseline="middle"
                  fontFamily="Cormorant Garamond, serif" fontStyle="italic"
                  fontSize="17" fill="url(#sealText)" letterSpacing="2">N &amp; A</text>
                {/* 8 small diamonds around ring */}
                {[0,45,90,135,180,225,270,315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx2 = 48 + 42 * Math.cos(rad);
                  const cy2 = 48 + 42 * Math.sin(rad);
                  return <circle key={i} cx={cx2} cy={cy2} r="1.5" fill="url(#sealGold1)" />;
                })}
                <defs>
                  <radialGradient id="sealBg" cx="50%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#2A1E08" />
                    <stop offset="100%" stopColor="#0D0A04" />
                  </radialGradient>
                  <radialGradient id="sealInner" cx="40%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#1E1508" />
                    <stop offset="100%" stopColor="#0A0702" />
                  </radialGradient>
                  <linearGradient id="sealGold1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5E6A3" />
                    <stop offset="30%" stopColor="#D4AF37" />
                    <stop offset="60%" stopColor="#F0D060" />
                    <stop offset="100%" stopColor="#8B6914" />
                  </linearGradient>
                  <linearGradient id="sealGold2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#8B6914" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="sealText" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F5E6A3" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#A07820" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            </motion.div>
          </div>
        </motion.button>

        {/* Hint Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 text-center"
        >
          <motion.div
            animate={!isRevealing ? { y: [0, 6, 0] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-[11px] uppercase tracking-[0.5em] font-sans"
              style={{ color: 'rgba(212,175,55,0.6)' }}>
              {isRevealing ? 'Opening…' : 'Tap to Open'}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-4" style={{ background: 'rgba(212,175,55,0.25)' }} />
              <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,7 0,1 8,1" fill="rgba(212,175,55,0.4)" /></svg>
              <div className="h-px w-4" style={{ background: 'rgba(212,175,55,0.25)' }} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Light burst reveal */}
      {isRevealing && (
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 30, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute z-40 w-12 h-12 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(245,230,163,0.9) 0%, rgba(212,175,55,0.6) 30%, transparent 70%)',
            filter: 'blur(4px)'
          }}
          aria-hidden="true"
        />
      )}

      {isRevealing && <Confetti />}
    </motion.div>
  );
};

export default EnvelopeOverlay;
