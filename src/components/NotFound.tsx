import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900 px-4 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center z-10 space-y-6">
        
        {/* Animated 404 text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative select-none"
        >
          <h1 className="text-8xl sm:text-9xl font-black tracking-widest text-white/5 font-mono">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-black uppercase tracking-widest gradient-text">
              Page Not Found
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-sm mx-auto leading-relaxed"
        >
          The system route you are trying to access does not exist or has been modified.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-light text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-accent/15 hover:-translate-y-0.5 cursor-pointer"
          >
            Return to Portfolio
          </a>
        </motion.div>

      </div>
    </div>
  );
}
