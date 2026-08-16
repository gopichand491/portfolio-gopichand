import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress indicator for premium feel
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 400);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-900"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-grid-bg opacity-40 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6 z-10"
          >
            {/* Spinning/pulsing circuit visual */}
            <div className="relative flex items-center justify-center w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full border border-accent/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-1.5 rounded-full border border-t-cyan border-r-transparent border-b-transparent border-l-cyan/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-dotted border-accent/40"
                animate={{ rotate: 180 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-xl font-black tracking-widest gradient-text select-none font-mono">GC</span>
            </div>

            <div className="text-center space-y-2.5">
              <p className="text-xs text-slate-400 loading-pulse font-mono tracking-wider">
                INITIALIZING GOPI CHAND'S AI PORTFOLIO...
              </p>
              
              {/* Progress bar */}
              <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-cyan rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              
              <p className="text-[10px] text-slate-600 font-mono">
                System status: ACTIVE ({Math.min(progress, 100)}%)
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
