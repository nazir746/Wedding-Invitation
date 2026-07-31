import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '../weddingConfig';

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            /* browser autoplay restriction will resolve on first user tap */
          });
      }
    };

    // Attempt autoplay immediately
    playAudio();

    // Listen for any user click/tap gesture on page to unblock autoplay
    const handleFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, [isPlaying]);

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed right-5 z-[70] bottom-[calc(1.25rem+env(safe-area-inset-bottom))]">
      <audio ref={audioRef} loop preload="auto" src={wedding.musicUrl} />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        aria-pressed={isPlaying}
        className="w-12 h-12 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30 flex items-center justify-center text-gold shadow-lg shadow-gold/10 relative"
      >
        {isPlaying && (
          <span
            className="absolute inset-0 rounded-full animate-ping pointer-events-none"
            style={{ background: 'rgba(212,175,55,0.2)' }}
          />
        )}
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Volume2 size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <VolumeX size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AudioToggle;
