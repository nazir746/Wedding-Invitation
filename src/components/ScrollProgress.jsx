import { motion, useScroll, useSpring } from 'framer-motion';

// Thin gold progress bar fixed to the top of the page.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
