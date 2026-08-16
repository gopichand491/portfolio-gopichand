import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, title, subtitle, eyebrow, children, className = '' }: Props) {
  return (
    <section id={id} className={`relative py-20 md:py-28 overflow-hidden ${className}`}>
      {/* Background glow highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light bg-accent/5 px-3 py-1 rounded-full border border-accent/15 mb-3 inline-block">
                {eyebrow}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="mt-5 mx-auto w-24 h-[1.5px] glow-line rounded-full" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
