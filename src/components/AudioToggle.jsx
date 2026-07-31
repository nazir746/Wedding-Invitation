import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '../weddingConfig';

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log('Audio play blocked by browser', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed right-5 z-[70] bottom-[calc(1.25rem+env(safe-area-inset-bottom))]">
      <audio ref={audioRef} loop preload="none" src={wedding.musicUrl} />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        aria-pressed={isPlaying}
        className="w-12 h-12 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30 flex items-center justify-center text-gold shadow-lg shadow-gold/10"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <Volume2 size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
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
