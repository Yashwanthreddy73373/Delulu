import SnakeGame from './components/SnakeGame.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-pink selection:text-white p-4 md:p-8 flex flex-col items-center justify-center overflow-x-hidden">
      {/* Background Grid Accent */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
             backgroundSize: '40px 40px' 
           }} 
      />

      <header className="w-full max-w-6xl mb-12 flex flex-col items-center relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-10 h-10 rounded-lg bg-neon-cyan flex items-center justify-center neon-border-cyan">
            <Terminal size={24} className="text-black" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter neon-text-pink">
            NEON SNAKE <span className="text-white">&</span> BEATS
          </h1>
        </motion.div>
        <p className="text-white/40 font-mono text-sm uppercase tracking-[0.3em] text-center">
          Prototype v1.0.42 // High Fidelity Audio-Visual Interface
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 items-start relative z-10">
        {/* Game Area */}
        <motion.section 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="order-1 lg:order-1"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center">
            <SnakeGame />
          </div>
        </motion.section>

        {/* Sidebar / Music Area */}
        <motion.section 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="order-2 lg:order-2 flex flex-col gap-8"
        >
          <MusicPlayer />
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 font-mono text-[10px] space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40 uppercase">System Status</span>
              <span className="text-neon-green">ACTIVE</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40 uppercase">Neural Link</span>
              <span className="text-neon-cyan">STABLE</span>
            </div>
            <p className="text-white/30 leading-relaxed">
              [LOG] EXECUTING SESSION_INIT...<br/>
              [LOG] BUFFERING AUDIO_STREAMS[3]...<br/>
              [LOG] GRID_SURFACE RENDERED AT 120HZ...<br/>
              [LOG] READY FOR PLAYBACK.
            </p>
          </div>
        </motion.section>
      </main>

      <footer className="mt-20 w-full text-center py-8 border-t border-white/5 relative z-10">
        <p className="text-white/20 text-xs font-mono tracking-widest">
          DESIGNED BY AI Studio // POWERED BY GEMINI PRO
        </p>
      </footer>
    </div>
  );
}
