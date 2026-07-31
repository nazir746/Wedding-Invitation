import { motion } from 'framer-motion';

// Generate random particle configs once, at module scope,
// so no impure Math.random() calls happen during render.
const PARTICLES = Array.from({ length: 20 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  rise: 20 + Math.random() * 30,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 10,
}));

const Particles = () => {
  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
          animate={{
            y: [`${p.y}%`, `${p.y - p.rise}%`],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,1) 0%, rgba(212,175,55,0) 70%)' }}
        />
      ))}
    </div>
  );
};

export default Particles;
