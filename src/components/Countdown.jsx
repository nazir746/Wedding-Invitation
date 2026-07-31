import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pad = (n) => String(n).padStart(2, '0');

const CountdownBox = ({ value, label }) => (
  <motion.div
    className="countdown-box flex flex-col items-center"
    whileHover={{ scale: 1.05 }}
  >
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="text-3xl md:text-4xl tabular-nums gold-gradient-text"
        style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, lineHeight: 1 }}
      >
        {pad(value)}
      </motion.span>
    </AnimatePresence>
    <span className="text-[9px] uppercase tracking-[0.3em] mt-2 font-sans"
      style={{ color: 'rgba(212,175,55,0.45)' }}>
      {label}
    </span>
  </motion.div>
);

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasReached, setHasReached] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) { setHasReached(true); return; }
      setHasReached(false);
      setTimeLeft({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  if (hasReached) return (
    <p className="font-serif italic text-center"
      style={{ color: 'rgba(212,175,55,0.8)', fontSize: '1.1rem' }}>
      Alhamdulillah — the celebration is here!
    </p>
  );

  return (
    <div className="flex justify-center gap-3 md:gap-5">
      <CountdownBox value={timeLeft?.days ?? 0} label="Days" />
      <div className="self-start pt-3 text-2xl font-thin" style={{ color: 'rgba(212,175,55,0.25)' }}>·</div>
      <CountdownBox value={timeLeft?.hours ?? 0} label="Hours" />
      <div className="self-start pt-3 text-2xl font-thin" style={{ color: 'rgba(212,175,55,0.25)' }}>·</div>
      <CountdownBox value={timeLeft?.minutes ?? 0} label="Mins" />
      <div className="self-start pt-3 text-2xl font-thin" style={{ color: 'rgba(212,175,55,0.25)' }}>·</div>
      <CountdownBox value={timeLeft?.seconds ?? 0} label="Secs" />
    </div>
  );
};

export default Countdown;
