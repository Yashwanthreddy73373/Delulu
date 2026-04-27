import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { DUMMY_TRACKS } from '../constants.ts';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-pink/20 blur-[80px] rounded-full group-hover:bg-neon-pink/30 transition-colors" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-neon-cyan/20 blur-[80px] rounded-full group-hover:bg-neon-cyan/30 transition-colors" />

      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      <div className="flex items-center gap-6 relative z-10">
        <div className="relative flex-shrink-0">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-neon-pink neon-border-pink relative z-20"
          >
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Animated rings when playing */}
          {isPlaying && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border border-neon-pink rounded-full z-10"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 border border-neon-cyan rounded-full z-10"
              />
            </>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold truncate neon-text-pink tracking-tight">{currentTrack.title}</h3>
          <p className="text-white/50 text-sm truncate font-mono">{currentTrack.artist}</p>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-neon-cyan font-mono uppercase tracking-[0.2em]">
            <Music size={12} className="neon-glow-cyan" /> Now Playing
          </div>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        {/* Progress Bar */}
        <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={prevTrack}
              className="text-white/60 hover:text-neon-cyan transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </button>
            <button
              onClick={nextTrack}
              className="text-white/60 hover:text-neon-cyan transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-white/40">
            <Volume2 size={16} />
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
               <div className="w-2/3 h-full bg-white/40"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visualizer Mockup */}
      <div className="mt-6 flex items-end justify-between gap-[2px] h-4 opacity-50">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: isPlaying ? [4, Math.random() * 16 + 4, 4] : 4,
            }}
            transition={{
              duration: 0.5 + Math.random(),
              repeat: Infinity,
            }}
            className="flex-1 bg-gradient-to-t from-neon-cyan to-neon-pink rounded-t"
          />
        ))}
      </div>
    </div>
  );
}
