import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnvelopeOverlay from './components/EnvelopeOverlay';
import Countdown from './components/Countdown';
import BentoGrid from './components/BentoGrid';
import RSVPForm from './components/RSVPForm';
import Preloader from './components/Preloader';
import AudioToggle from './components/AudioToggle';
import Particles from './components/Particles';
import ScrollProgress from './components/ScrollProgress';
import OrnamentDivider from './components/OrnamentDivider';
import ActionsBar from './components/ActionsBar';
import GiftSection from './components/GiftSection';
import BismillahCalligraphy from './components/BismillahCalligraphy';
import ParentsSection from './components/ParentsSection';
import { wedding } from './weddingConfig';

function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh bg-midnight text-cream overflow-x-hidden selection:bg-gold/30">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <ScrollProgress />
      <Particles />
      <AudioToggle />

      {/* Mobile ambient glow */}
      <div className="fixed inset-0 md:hidden z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="aurora-blob w-72 h-72 -top-20 -left-24 bg-gold/10 animate-aurora" />
        <div className="aurora-blob w-80 h-80 -bottom-24 -right-28 bg-emerald/15 animate-aurora" style={{ animationDelay: '-7s' }} />
      </div>

      {/* Desktop Ambient Background */}
      <div className="fixed inset-0 hidden md:block z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />
      </div>

      <AnimatePresence>
        {!isRevealed ? (
          <EnvelopeOverlay key="overlay" onReveal={() => setIsRevealed(true)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 mx-auto max-w-lg md:shadow-2xl md:shadow-gold/5 bg-midnight min-h-dvh border-x border-white/5"
          >

            {/* ── HERO ── */}
            <section className="relative pt-12 pb-16 px-6 flex flex-col items-center text-center overflow-hidden">

              {/* Top radial glow — no grey overlay */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[420px] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 55% at 50% 5%, rgba(212,175,55,0.13) 0%, transparent 75%)',
                  zIndex: 0,
                }} />

              {/* Decorative corner filigree — top left */}
              <svg className="absolute top-4 left-4 opacity-20 z-0" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M2 2 Q30 2 58 2 Q58 30 58 58" stroke="url(#cg1)" strokeWidth="0.8" fill="none"/>
                <circle cx="2" cy="2" r="2.5" fill="rgba(212,175,55,0.5)"/>
                <circle cx="30" cy="2" r="1.2" fill="rgba(212,175,55,0.3)"/>
                <circle cx="58" cy="30" r="1.2" fill="rgba(212,175,55,0.3)"/>
                <defs><linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#D4AF37" stopOpacity="0.8"/><stop offset="1" stopColor="#D4AF37" stopOpacity="0"/></linearGradient></defs>
              </svg>
              {/* Decorative corner filigree — top right */}
              <svg className="absolute top-4 right-4 opacity-20 z-0" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M58 2 Q30 2 2 2 Q2 30 2 58" stroke="url(#cg2)" strokeWidth="0.8" fill="none"/>
                <circle cx="58" cy="2" r="2.5" fill="rgba(212,175,55,0.5)"/>
                <circle cx="30" cy="2" r="1.2" fill="rgba(212,175,55,0.3)"/>
                <circle cx="2" cy="30" r="1.2" fill="rgba(212,175,55,0.3)"/>
                <defs><linearGradient id="cg2" x1="1" y1="0" x2="0" y2="1"><stop stopColor="#D4AF37" stopOpacity="0.8"/><stop offset="1" stopColor="#D4AF37" stopOpacity="0"/></linearGradient></defs>
              </svg>

              {/* Bismillah Calligraphy */}
              <BismillahCalligraphy />

              {/* Gold ornament divider line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.2 }}
                className="w-48 h-px mb-6 mt-1 z-20"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
              />

              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative z-20 flex flex-col items-center"
              >
                {/* Tag line */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6))' }} />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-sans" style={{ color: 'rgba(212,175,55,0.65)' }}>
                    Together with their families
                  </span>
                  <div className="h-px w-8" style={{ background: 'linear-gradient(-90deg, transparent, rgba(212,175,55,0.6))' }} />
                </div>

                {/* Guest greeting */}
                {wedding.guest && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-serif italic mb-3"
                    style={{ color: 'rgba(212,175,55,0.8)', fontSize: '1.1rem' }}
                  >
                    Dear {wedding.guest},
                  </motion.p>
                )}

                {/* Names — hero headline */}
                <h1
                  className="gold-gradient-text leading-tight tracking-tight my-2"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(3rem, 12vw, 4.5rem)',
                    fontWeight: 300,
                    textShadow: '0 0 60px rgba(212,175,55,0.25)',
                  }}
                >
                  {wedding.names}
                </h1>

                <p className="font-serif italic my-4"
                  style={{ color: 'rgba(212,175,55,0.6)', fontSize: '1.05rem', letterSpacing: '0.04em' }}>
                  Request the honor of your presence
                </p>

                {/* Premium Date card */}
                <motion.div
                  whileHover={{ scale: 1.015, y: -2 }}
                  className="my-6 relative overflow-hidden w-full"
                  style={{
                    background: 'linear-gradient(160deg, rgba(24,18,6,0.95) 0%, rgba(14,10,3,0.98) 100%)',
                    border: '1px solid rgba(212,175,55,0.22)',
                    borderRadius: '20px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Top shimmer bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
                  }} />

                  {/* Nikkah row */}
                  <div className="flex items-center justify-between px-6 py-5"
                    style={{ borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                    <div>
                      <span className="text-[8px] uppercase tracking-[0.35em] font-sans block mb-1"
                        style={{ color: 'rgba(212,175,55,0.4)' }}>Nikkah Ceremony</span>
                      <span className="font-serif block"
                        style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: '1.65rem',
                          fontWeight: 300,
                          background: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #F0D060)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                        Saturday, 5 December
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className="text-[10px] font-sans block font-medium" style={{ color: 'rgba(212,175,55,0.7)' }}>After Asar</span>
                      <span className="text-[9px] font-sans block mt-0.5 uppercase tracking-wider" style={{ color: 'rgba(212,175,55,0.3)' }}>2026</span>
                    </div>
                  </div>

                  {/* Walima row */}
                  <div className="flex items-center justify-between px-6 py-5">
                    <div>
                      <span className="text-[8px] uppercase tracking-[0.35em] font-sans block mb-1"
                        style={{ color: 'rgba(212,175,55,0.4)' }}>Walima Reception</span>
                      <span className="font-serif block"
                        style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: '1.65rem',
                          fontWeight: 300,
                          background: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #F0D060)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                        Sunday, 6 December
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className="text-[10px] font-sans block font-medium" style={{ color: 'rgba(212,175,55,0.7)' }}>10:00 AM</span>
                      <span className="text-[9px] font-sans block mt-0.5 uppercase tracking-wider" style={{ color: 'rgba(212,175,55,0.3)' }}>2026</span>
                    </div>
                  </div>

                  {/* Bottom shimmer bar */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)',
                  }} />
                </motion.div>

                <div className="w-32 h-px mx-auto mb-8"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />

                <Countdown targetDate={wedding.dateISO} />
              </motion.div>
            </section>

            {/* Parents */}
            <ParentsSection />

            {/* Quranic Quote & Sunnah Marriage Dua */}
            <section className="px-6 py-12 relative z-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="max-w-sm mx-auto"
                style={{
                  background: 'linear-gradient(145deg, rgba(22,17,6,0.85) 0%, rgba(12,9,3,0.95) 100%)',
                  border: '1px solid rgba(212,175,55,0.18)',
                  borderRadius: '24px',
                  padding: '30px 24px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                }}
              >
                {/* Prophetic Marriage Dua */}
                <div className="mb-6 pb-5" style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                  <p className="font-sans mb-2 text-base leading-relaxed tracking-wider font-semibold"
                    style={{ color: '#F5E6A3', direction: 'rtl' }}>
                    بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                  </p>
                  <p className="font-serif italic text-xs leading-relaxed" style={{ color: 'rgba(212,175,55,0.8)' }}>
                    &ldquo;May Allah bless you, shower His blessings upon you, and unite you in goodness.&rdquo;
                  </p>
                  <span className="text-[8px] uppercase tracking-[0.25em] font-sans mt-1.5 block" style={{ color: 'rgba(212,175,55,0.4)' }}>
                    Sunan Abu Dawud
                  </span>
                </div>

                {/* Quranic Verse */}
                <div>
                  <div className="text-3xl font-serif mb-2" style={{ color: 'rgba(212,175,55,0.3)', lineHeight: 1 }}>&ldquo;</div>
                  <p className="font-serif italic leading-relaxed mb-4 text-sm"
                    style={{ color: 'rgba(250,246,238,0.75)' }}>{wedding.quote}</p>
                  <div className="w-12 h-px mx-auto mb-2.5"
                    style={{ background: 'rgba(212,175,55,0.25)' }} />
                  <div className="text-[9px] uppercase tracking-widest font-sans"
                    style={{ color: 'rgba(212,175,55,0.45)' }}>{wedding.quoteRef}</div>
                </div>
              </motion.div>
            </section>

            <OrnamentDivider />

            {/* Events & Details */}
            <section className="relative z-20">
              <div className="px-6 py-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-10 text-center"
                >
                  <h2 className="text-2xl font-serif italic mb-2"
                    style={{ color: '#D4AF37', fontFamily: '"Cormorant Garamond", serif', textShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
                    The Celebration
                  </h2>
                  <p className="text-sm leading-relaxed max-w-xs mx-auto font-sans"
                    style={{ color: 'rgba(250,246,238,0.4)', letterSpacing: '0.03em' }}>
                    We joyfully invite you to witness this blessed union
                  </p>
                </motion.div>

                <BentoGrid />
                <ActionsBar />
                <GiftSection />
              </div>

              <OrnamentDivider />
              <RSVPForm />
            </section>

            {/* Footer */}
            <footer className="py-12 text-center" style={{ borderTop: '1px solid rgba(212,175,55,0.07)', margin: '0 24px' }}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
                <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="rgba(212,175,55,0.35)"/></svg>
                <div className="h-px w-10" style={{ background: 'linear-gradient(-90deg, transparent, rgba(212,175,55,0.3))' }} />
              </div>
              <p className="text-[9px] uppercase tracking-[0.45em] font-sans" style={{ color: 'rgba(212,175,55,0.35)' }}>
                Made with Love · 2026
              </p>
              <p className="text-[9px] uppercase tracking-[0.35em] font-sans mt-1.5" style={{ color: 'rgba(212,175,55,0.22)' }}>
                {wedding.hashtag}
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
