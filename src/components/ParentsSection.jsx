import { motion } from 'framer-motion';
import { wedding } from '../weddingConfig';

const cardAnim = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FamilyBlock = ({ side, father, mother, index }) => (
  <motion.div
    custom={index}
    variants={cardAnim}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="flex flex-col items-center text-center px-6 py-6 rounded-2xl relative overflow-hidden"
    style={{
      background: 'linear-gradient(145deg, rgba(24,18,6,0.92) 0%, rgba(12,9,3,0.96) 100%)',
      border: '1px solid rgba(212,175,55,0.16)',
      boxShadow: '0 12px 36px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
    }}
  >
    {/* Subtle top gold accent */}
    <div style={{
      position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
    }} />

    {/* Family Badge */}
    <span
      className="text-[9px] uppercase tracking-[0.35em] mb-3 font-sans px-3.5 py-1 rounded-full"
      style={{
        color: 'rgba(212,175,55,0.7)',
        background: 'rgba(212,175,55,0.06)',
        border: '1px solid rgba(212,175,55,0.18)',
      }}
    >
      {side === 'groom' ? "Groom's Family" : "Bride's Family"}
    </span>

    {/* Relationship Title */}
    <p className="text-[10px] uppercase tracking-[0.3em] font-sans my-2" style={{ color: 'rgba(212,175,55,0.45)' }}>
      {side === 'groom' ? 'Son of' : 'Daughter of'}
    </p>

    {/* Father Name */}
    <p className="font-serif text-xl sm:text-2xl mt-1 mb-1" style={{ color: '#FAF6EE', fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
      {father}
    </p>

    {/* Ampersand separator */}
    <div className="flex items-center gap-3 my-2 opacity-80">
      <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
      <span className="font-serif italic text-sm" style={{ color: '#D4AF37' }}>&amp;</span>
      <div className="w-8 h-px" style={{ background: 'linear-gradient(-90deg, transparent, rgba(212,175,55,0.4))' }} />
    </div>

    {/* Mother Name */}
    <p className="font-serif text-xl sm:text-2xl mt-1" style={{ color: '#FAF6EE', fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
      {mother}
    </p>
  </motion.div>
);

const ParentsSection = () => (
  <section className="px-5 py-8 relative z-20">
    {/* Section header */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center gap-3 mb-6"
    >
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35))' }} />
      <p className="text-[9px] uppercase tracking-[0.35em] font-sans whitespace-nowrap" style={{ color: 'rgba(212,175,55,0.5)' }}>
        With the Blessings of
      </p>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(-90deg, transparent, rgba(212,175,55,0.35))' }} />
    </motion.div>

    {/* Stacked family cards */}
    <div className="flex flex-col gap-4">
      <FamilyBlock
        side="groom"
        father={wedding.groomFather}
        mother={wedding.groomMother}
        index={0}
      />

      {/* Center diamond ornament */}
      <div className="flex items-center justify-center py-0.5">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <polygon points="6,0 12,6 6,12 0,6" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
          <polygon points="6,2.5 9.5,6 6,9.5 2.5,6" fill="rgba(212,175,55,0.12)" stroke="none" />
        </svg>
      </div>

      <FamilyBlock
        side="bride"
        father={wedding.brideFather}
        mother={wedding.brideMother}
        index={1}
      />
    </div>
  </section>
);

export default ParentsSection;
