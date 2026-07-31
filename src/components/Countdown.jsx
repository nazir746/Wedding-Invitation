import { useState, useEffect } from 'react';

const pad = (n) => String(n).padStart(2, '0');

const CountdownBox = ({ value, label }) => (
  <div className="countdown-box flex flex-col items-center min-w-[46px] sm:min-w-[54px]">
    <div className="w-10 sm:w-12 h-9 sm:h-10 flex items-center justify-center">
      <span
        className="text-2xl sm:text-3xl md:text-4xl tabular-nums gold-gradient-text block text-center"
        style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, lineHeight: 1 }}
      >
        {pad(value)}
      </span>
    </div>
    <span
      className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] mt-1.5 font-sans"
      style={{ color: 'rgba(212,175,55,0.45)' }}
    >
      {label}
    </span>
  </div>
);

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasReached, setHasReached] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) {
        setHasReached(true);
        return;
      }
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

  if (hasReached)
    return (
      <p
        className="font-serif italic text-center"
        style={{ color: 'rgba(212,175,55,0.8)', fontSize: '1.1rem' }}
      >
        Alhamdulillah — the celebration is here!
      </p>
    );

  return (
    <div className="flex justify-center items-center gap-1.5 sm:gap-3 md:gap-5 w-full max-w-full">
      <CountdownBox value={timeLeft?.days ?? 0} label="Days" />
      <div className="self-start pt-2 text-xl sm:text-2xl font-thin" style={{ color: 'rgba(212,175,55,0.25)' }}>
        :
      </div>
      <CountdownBox value={timeLeft?.hours ?? 0} label="Hours" />
      <div className="self-start pt-2 text-xl sm:text-2xl font-thin" style={{ color: 'rgba(212,175,55,0.25)' }}>
        :
      </div>
      <CountdownBox value={timeLeft?.minutes ?? 0} label="Mins" />
      <div className="self-start pt-2 text-xl sm:text-2xl font-thin" style={{ color: 'rgba(212,175,55,0.25)' }}>
        :
      </div>
      <CountdownBox value={timeLeft?.seconds ?? 0} label="Secs" />
    </div>
  );
};

export default Countdown;
