import { useMemo, useRef, useState } from 'react';
import { CalendarPlus, MapPin, Share2, MessageCircle, Check, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { wedding } from '../weddingConfig';

const toCalendarDate = (iso) => {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
};

const ActionBtn = ({ href, onClick, icon: Icon, label, isState }) => {
  const base = (
    <div className="action-btn rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center cursor-pointer"
      style={{ borderRadius: '16px' }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)' }}>
        <Icon size={16} style={{ color: isState ? '#6EE7B7' : '#D4AF37' }} />
      </div>
      <span className="text-[9px] uppercase tracking-widest font-sans" style={{ color: 'rgba(250,246,238,0.6)', letterSpacing: '0.15em' }}>
        {label}
      </span>
    </div>
  );

  if (href) return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
      {base}
    </motion.a>
  );

  return (
    <motion.button onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
      {base}
    </motion.button>
  );
};

const ActionsBar = () => {
  const [copied, setCopied] = useState(false);
  const icsRef = useRef(null);

  const start = toCalendarDate(wedding.dateISO);
  const end = toCalendarDate(
    new Date(new Date(wedding.dateISO).getTime() + wedding.durationHours * 3600 * 1000).toISOString()
  );

  const title = encodeURIComponent(`${wedding.names} — Wedding`);
  const details = encodeURIComponent(`Join us to celebrate the wedding of ${wedding.names}. ${wedding.hashtag}`);
  const location = encodeURIComponent(`${wedding.venue}, ${wedding.address}`);
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  const icsUrl = useMemo(() => {
    const content = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      `SUMMARY:${wedding.names} Wedding`, `DTSTART:${start}`, `DTEND:${end}`,
      `LOCATION:${wedding.venue}, ${wedding.address}`, `DESCRIPTION:${wedding.hashtag}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    return URL.createObjectURL(new Blob([content], { type: 'text/calendar' }));
  }, [start, end]);

  const shareText = `*Wedding Invitation: ${wedding.names}*\n*Date:* ${wedding.displayDate}\n*Location:* Himmatnagar, Gujarat`;

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: wedding.names, text: shareText, url: window.location.href }); }
      catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch { /* ignore */ }
    }
  };

  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${window.location.href}`)}`;

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-3">
        <ActionBtn href={gcalUrl} icon={CalendarPlus} label="Google Calendar" />
        <ActionBtn href={wedding.mapsDirectionsUrl} icon={MapPin} label="Get Directions" />
        <ActionBtn onClick={handleShare} icon={copied ? Check : Share2} label={copied ? 'Link Copied!' : 'Share Invite'} isState={copied} />
        <ActionBtn onClick={() => icsRef.current?.click()} icon={Download} label="Apple / Outlook Cal" />
      </div>

      <motion.a
        href={waUrl} target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        className="mt-3 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] uppercase tracking-widest font-sans transition-all"
        style={{
          background: 'rgba(37,211,102,0.06)',
          border: '1px solid rgba(37,211,102,0.15)',
          color: 'rgba(37,211,102,0.7)',
        }}
      >
        <MessageCircle size={13} />
        Share on WhatsApp
      </motion.a>

      <a href={icsUrl} download={`${wedding.names}-wedding.ics`} ref={icsRef} className="hidden" tabIndex={-1} aria-hidden="true" />
    </div>
  );
};

export default ActionsBar;
