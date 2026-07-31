import { Gift, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

// For many weddings, especially Islamic ones, guests love a charity option.
const GiftSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-4 mb-12"
    >
      <div className="glass-card p-8 rounded-3xl text-center">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mb-4 w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center"
        >
          <Gift className="text-gold w-5 h-5" />
        </motion.div>

        <h3 className="text-2xl font-serif text-gold-light mb-3 italic">Your Presence is Our Gift</h3>
        <p className="text-cream/60 text-sm leading-relaxed font-sans mb-5">
          The greatest joy is having you with us. If you wish to honour us further,
          a contribution to charity (Sadaqah) in our names would mean the world.
        </p>

        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/60">
          <Heart className="w-3 h-3" />
          <span>With gratitude</span>
          <Heart className="w-3 h-3" />
        </div>
      </div>
    </motion.section>
  );
};

export default GiftSection;
