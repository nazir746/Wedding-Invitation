// ═══════════════════════════════════════════════════════════════
//  WEDDING CONFIG
// ═══════════════════════════════════════════════════════════════

const guestParam =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('guest')
    : null;

export const wedding = {
  // ── Couple ──
  groom: 'Nazir',
  bride: 'Aliya',
  names: 'Nazir & Aliya',
  monogram: 'N&A',

  // ── Parents ──
  groomFather: 'Imran Shafi Khanushiya',
  groomMother: 'Mumtaz Imran Khanushiya',
  brideFather: 'Abdul Salam Ibrahim Dhapa',
  brideMother: 'Nasim Abdul Salam Dhapa',

  // ── Events ──
  nikkahDateISO: '2026-12-05T16:30:00',
  walimahDateISO: '2026-12-06T10:00:00',

  // Countdown targets the first event (Nikkah)
  dateISO: '2026-12-05T16:30:00',
  displayDate: '5th & 6th December 2026',
  displayTime: 'After Asr',
  durationHours: 4,

  // ── Venue ──
  venue: 'At Home',
  address: 'Aman House, Opposite Ammar Bin Yasin Masjid, Ilol Talav, Himmatnagar, Sabarkantha, Gujarat',
  // Embed URL — exact coordinates: 23.6498716, 72.893228
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=23.6498716,72.893228&t=&z=17&ie=UTF8&iwloc=&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=23.6498716,72.893228',

  // ── Music ──
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',

  // ── Social ──
  hashtag: '#NazirAndAliya',

  // ── Schedule ──
  schedule: [
    { date: '5 Dec', time: 'After Asar', event: 'Nikkah Ceremony', desc: 'The sacred union' },
    { date: '6 Dec', time: '10:00 AM', event: 'Walima Reception', desc: 'Festive feast & celebrations' },
  ],

  // ── Gallery ──
  gallery: [],

  // ── Guest ──
  guest: guestParam,

  // ── Quranic Quote ──
  quote:
    'And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
  quoteRef: '— Surah Ar-Rum [30:21]',
};
