import { useState } from 'react';

const BismillahCalligraphy = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center my-4 z-20 min-h-[140px]">
      {/* Radial glow behind */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '280px',
          height: '180px',
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <img
        src="/assets/bismillah.png"
        alt="Bismillah ir-Rahman ir-Rahim"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: '260px',
          height: 'auto',
          display: 'block',
          mixBlendMode: 'screen',
          backgroundColor: 'transparent',
          filter: 'drop-shadow(0 0 18px rgba(212,175,55,0.45)) drop-shadow(0 0 6px rgba(212,175,55,0.2))',
          position: 'relative',
          zIndex: 10,
        }}
      />

      {/* Elegant Arabic Calligraphy text placeholder while image decodes */}
      {!loaded && (
        <p
          className="absolute font-sans text-xl tracking-wider text-center pointer-events-none z-10"
          style={{
            color: 'rgba(212,175,55,0.85)',
            textShadow: '0 0 12px rgba(212,175,55,0.4)',
            direction: 'rtl',
          }}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      )}

      {/* Bottom accent line */}
      <div
        style={{
          width: '80px',
          height: '1px',
          marginTop: '10px',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
          position: 'relative',
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default BismillahCalligraphy;
