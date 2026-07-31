import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { wedding } from '../weddingConfig';

const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const BentoCard = ({ children, className = '', delay = 0, noPadding = false }) => (
  <motion.div
    variants={cardAnim}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay }}
    className={`rounded-2xl sm:rounded-3xl overflow-hidden ${noPadding ? '' : 'p-4 sm:p-6'} ${className}`}
    style={{
      background: 'linear-gradient(145deg, rgba(22,17,6,0.92) 0%, rgba(12,9,3,0.97) 100%)',
      border: '1px solid rgba(212,175,55,0.13)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.035)',
    }}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2.5 mb-5">
    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.22)' }}>
      <Icon size={13} style={{ color: '#D4AF37' }} />
    </div>
    <h3 style={{ color: 'rgba(212,175,55,0.65)', letterSpacing: '0.22em', fontSize: '10px' }}
      className="font-sans uppercase font-medium">{text}</h3>
  </div>
);

const BentoGrid = () => (
  <div className="flex flex-col gap-4 w-full mb-10">

    {/* Two-Day Schedule */}
    <BentoCard>
      <SectionLabel icon={Calendar} text="Celebration Events" />
      <div className="space-y-0">
        {wedding.schedule.map((item, i) => (
          <div key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4"
            style={{
              borderBottom: i < wedding.schedule.length - 1 ? '1px solid rgba(212,175,55,0.07)' : 'none',
            }}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Date pill */}
              <div className="flex-shrink-0 text-center px-2.5 py-1.5 rounded-xl"
                style={{
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.14)',
                  minWidth: '48px'
                }}>
                <p className="text-[8px] uppercase tracking-widest font-sans" style={{ color: 'rgba(212,175,55,0.5)' }}>
                  {item.date.split(' ')[1]}
                </p>
                <p className="font-serif text-lg leading-none mt-0.5 gold-gradient-text">
                  {item.date.split(' ')[0]}
                </p>
              </div>

              {/* Vertical divider */}
              <div className="w-px self-stretch" style={{ background: 'rgba(212,175,55,0.12)' }} />

              {/* Event info */}
              <div className="flex-1 min-w-0">
                <p className="font-serif text-base sm:text-lg leading-tight" style={{ color: '#FAF6EE' }}>{item.event}</p>
                <p className="text-[10px] font-sans mt-0.5" style={{ color: 'rgba(250,246,238,0.4)' }}>{item.desc}</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex-shrink-0 flex items-center gap-1.5 self-end sm:self-center pl-12 sm:pl-0">
              <Clock size={10} style={{ color: 'rgba(212,175,55,0.4)' }} />
              <span className="text-xs font-sans tabular-nums" style={{ color: 'rgba(212,175,55,0.55)' }}>
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>

    {/* Location */}
    <BentoCard noPadding delay={0.1}>
      <div className="p-6 pb-4">
        <SectionLabel icon={MapPin} text="Venue" />
        <p className="font-serif text-xl mb-1" style={{ color: '#FAF6EE' }}>{wedding.venue}</p>
        <p className="text-sm font-sans mb-4" style={{ color: 'rgba(250,246,238,0.42)' }}>{wedding.address}</p>
      </div>

      <div className="w-full h-44 relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}>
        <iframe
          title="Venue location map"
          src={wedding.mapsEmbedUrl}
          className="w-full h-full border-0 transition-all duration-700"
          style={{ filter: 'none' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(12,9,3,0.5) 0%, transparent 50%)' }} />
      </div>

      <div className="px-6 py-4 flex items-center justify-between">
        <motion.a
          href={wedding.mapsDirectionsUrl}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ x: 3 }}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-sans transition-colors"
          style={{ color: 'rgba(212,175,55,0.55)' }}
        >
          <ExternalLink size={11} />
          Get Directions
        </motion.a>
        <div className="text-[9px] font-sans uppercase tracking-wider"
          style={{ color: 'rgba(212,175,55,0.3)' }}>
          Himmatnagar, Gujarat
        </div>
      </div>
    </BentoCard>
  </div>
);

export default BentoGrid;
