import { motion } from 'framer-motion';

const BismillahCalligraphy = () => {
  return (
    <div className="relative flex flex-col items-center justify-center my-4 z-20">
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

      {/* Floating image */}
      <motion.img
        src="/assets/bismillah.png"
        alt="Bismillah ir-Rahman ir-Rahim"
        decoding="async"
        fetchPriority="high"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 1.2, ease: 'easeOut' },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
        }}
        style={{
          width: '260px',
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(0 0 18px rgba(212,175,55,0.45)) drop-shadow(0 0 6px rgba(212,175,55,0.2))',
          position: 'relative',
          zIndex: 10,
        }}
      />

      {/* Bottom accent line */}
      <div style={{
        width: '80px',
        height: '1px',
        marginTop: '10px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
        position: 'relative',
        zIndex: 10,
      }} />
    </div>
  );
};

export default BismillahCalligraphy;
