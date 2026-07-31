/**
 * Pure SVG Islamic geometric ornamental divider — no image dependency.
 * Renders a gold calligraphic monogram flanked by geometric arabesque lines.
 */
const OrnamentDivider = ({ monogram = 'N & A' }) => {
  return (
    <div className="flex items-center justify-center gap-0 py-6 px-8" aria-hidden="true">
      {/* Left arm */}
      <div className="flex items-center flex-1">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), rgba(212,175,55,0.5))' }} />
        <svg width="20" height="20" viewBox="0 0 20 20" className="mx-1 opacity-70">
          <polygon points="10,2 12.5,7.5 18,8 13.5,12.5 15,18 10,15 5,18 6.5,12.5 2,8 7.5,7.5" fill="none" stroke="url(#dg1)" strokeWidth="0.8" />
          <polygon points="10,4 12,8.5 17,9 13,12.5 14,17 10,14.5 6,17 7,12.5 3,9 8,8.5" fill="rgba(212,175,55,0.1)" stroke="none" />
          <defs>
            <linearGradient id="dg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E6A3" />
              <stop offset="100%" stopColor="#8B6914" />
            </linearGradient>
          </defs>
        </svg>
        <div className="w-6 h-px" style={{ background: 'rgba(212,175,55,0.4)' }} />
      </div>

      {/* Center Diamond + Monogram */}
      <div className="flex items-center gap-2 px-3">
        <svg width="6" height="6" viewBox="0 0 6 6">
          <polygon points="3,0 6,3 3,6 0,3" fill="rgba(212,175,55,0.6)" />
        </svg>
        <span className="font-serif italic text-xs" style={{ color: 'rgba(212,175,55,0.8)', letterSpacing: '0.2em', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic' }}>
          {monogram}
        </span>
        <svg width="6" height="6" viewBox="0 0 6 6">
          <polygon points="3,0 6,3 3,6 0,3" fill="rgba(212,175,55,0.6)" />
        </svg>
      </div>

      {/* Right arm */}
      <div className="flex items-center flex-1">
        <div className="w-6 h-px" style={{ background: 'rgba(212,175,55,0.4)' }} />
        <svg width="20" height="20" viewBox="0 0 20 20" className="mx-1 opacity-70">
          <polygon points="10,2 12.5,7.5 18,8 13.5,12.5 15,18 10,15 5,18 6.5,12.5 2,8 7.5,7.5" fill="none" stroke="url(#dg2)" strokeWidth="0.8" />
          <polygon points="10,4 12,8.5 17,9 13,12.5 14,17 10,14.5 6,17 7,12.5 3,9 8,8.5" fill="rgba(212,175,55,0.1)" stroke="none" />
          <defs>
            <linearGradient id="dg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B6914" />
              <stop offset="100%" stopColor="#F5E6A3" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.5), rgba(212,175,55,0.15), transparent)' }} />
      </div>
    </div>
  );
};

export default OrnamentDivider;
