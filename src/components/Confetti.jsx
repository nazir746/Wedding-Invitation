import { motion } from 'framer-motion';

// One-shot confetti burst used when the envelope is opened.
// Each piece is anchored at screen-center via left/top and animated
// outward with numeric pixel offsets so framer-motion interpolates smoothly.
const COLORS = ['#F3E5AB', '#D4AF37', '#FDFBF7', '#B38728', '#FBF5B7', '#AA771C'];
const PIECES = Array.from({ length: 60 }, () => {
  const angle = Math.random() * Math.PI * 2;
  const dist = 80 + Math.random() * 220;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: 5 + Math.random() * 7,
    duration: 1.4 + Math.random() * 1.2,
    delay: Math.random() * 0.35,
    rotate: Math.random() * 720 - 360,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
});

const Confetti = () => {
  return (
    <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden" aria-hidden="true">
      {PIECES.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{ x: p.x, y: p.y, opacity: [1, 1, 0], rotate: p.rotate, scale: 1 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
          className="absolute rounded-[2px]"
          style={{
            left: '50%',
            top: '50%',
            width: p.size,
            height: p.size * 1.6,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
