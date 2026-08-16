import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const KEYWORDS = ['AI', 'DATA', 'SYSTEMS', 'ENGINEERING'];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeKeywordIndex, setActiveKeywordIndex] = useState(0);

  useEffect(() => {
    // Increment progress indicator for premium feel
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const nextProgress = prev + Math.floor(Math.random() * 15) + 8;
        return nextProgress >= 100 ? 100 : nextProgress;
      });
    }, 80);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 450);
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Map progress values to current technical keywords
  useEffect(() => {
    if (progress < 25) {
      setActiveKeywordIndex(0);
    } else if (progress < 50) {
      setActiveKeywordIndex(1);
    } else if (progress < 75) {
      setActiveKeywordIndex(2);
    } else {
      setActiveKeywordIndex(3);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-900"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-grid-bg opacity-20 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6 z-10"
          >
            {/* Spinning/pulsing circuit visual */}
            <div className="relative flex items-center justify-center w-24 h-24">
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
              <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-cyan-light select-none font-mono">GC</span>
            </div>

            <div className="text-center space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                  Initializing Portfolio
                </p>
                <div className="h-6 overflow-hidden flex justify-center items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={KEYWORDS[activeKeywordIndex]}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-black tracking-widest text-white font-mono uppercase"
                    >
                      {KEYWORDS[activeKeywordIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-56 h-1.5 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/5 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-cyan rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <p className="text-[9px] text-slate-600 font-mono">
                CORE STATUS: ACTIVE ({progress}%)
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
