import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #0E0B05 0%, #070707 100%)' }}
    >
      {/* Outer spinning ring */}
      <div className="relative w-20 h-20 mb-6">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid transparent',
            borderTopColor: '#D4AF37',
            borderRightColor: 'rgba(212,175,55,0.3)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            border: '1px solid transparent',
            borderBottomColor: 'rgba(212,175,55,0.5)',
            borderLeftColor: 'rgba(212,175,55,0.2)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center glow dot */}
        <motion.div
          className="absolute inset-0 m-auto w-3 h-3 rounded-full"
          style={{ background: 'radial-gradient(circle, #F5E6A3 0%, #D4AF37 100%)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-[10px] uppercase tracking-[0.5em] font-sans"
        style={{ color: 'rgba(212,175,55,0.5)' }}
      >
        Inviting Blessings…
      </motion.p>

      {/* Animated dots */}
      <div className="flex gap-1.5 mt-4">
        {[0, 0.3, 0.6].map((d, i) => (
          <motion.div key={i} className="w-1 h-1 rounded-full"
            style={{ background: 'rgba(212,175,55,0.4)' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: d }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Preloader;
