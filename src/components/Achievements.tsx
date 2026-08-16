import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Eye } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import Modal from './Modal';
import { ACHIEVEMENTS } from '../data/achievements';

const labelStyles: Record<string, string> = {
  'First Prize': 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'Winner': 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'Finalist': 'bg-cyan/10 text-cyan-light border-cyan/20',
  'Participant': 'bg-white/5 text-slate-300 border-white/10',
};

export default function Achievements() {
  const [preview, setPreview] = useState<typeof ACHIEVEMENTS[0] | null>(null);

  // Separate Hero achievement (ProtoBlitz) from others
  const heroAchievement = ACHIEVEMENTS.find(a => a.id === 'protoblitz25');
  const otherAchievements = ACHIEVEMENTS.filter(a => a.id !== 'protoblitz25');

  return (
    <SectionWrapper
      id="achievements"
      eyebrow="Competitions"
      title="Achievements"
      subtitle="Hackathon placements, entrepreneurial finals, and project recognitions"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Prominent Hero Achievement */}
        {heroAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 md:p-8 border-amber-500/20 hover:border-amber-500/40 relative group overflow-hidden glow-gold cursor-pointer"
            data-cursor="OPEN"
          >
            {/* Volumetric Gold lighting */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0" />
            
            {/* Layered Floating golden micro-particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -35, 0],
                    opacity: [0, 0.7, 0],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{
                    duration: 3.5 + Math.random() * 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
                <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300">
                  <Trophy size={32} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full">
                      {heroAchievement.label}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{heroAchievement.event}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight group-hover:text-amber-300 transition-colors">
                    {heroAchievement.title}
                  </h3>
                  {heroAchievement.description && (
                    <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                      {heroAchievement.description}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setPreview(heroAchievement)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-amber-300 hover:text-white border border-amber-500/20 hover:border-amber-500/50 rounded-xl transition-all hover:bg-amber-500/5 cursor-pointer whitespace-nowrap align-middle self-center"
              >
                <Eye size={13} />
                View Certificate
              </button>
            </div>
          </motion.div>
        )}

        {/* Other achievements grid */}
        {otherAchievements.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {otherAchievements.map((ach, idx) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 flex flex-col justify-between group cursor-pointer"
                data-cursor="OPEN"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="p-2.5 bg-accent/10 rounded-xl border border-accent/10 text-accent-light group-hover:scale-105 transition-transform">
                      <Medal size={20} />
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full border ${labelStyles[ach.label]}`}>
                        {ach.label}
                      </span>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">{ach.event}</p>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-accent-light transition-colors">
                    {ach.title}
                  </h3>
                  {ach.description && (
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {ach.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setPreview(ach)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mt-2 cursor-pointer w-fit"
                >
                  <Eye size={12} />
                  View Certificate
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!preview}
        onClose={() => setPreview(null)}
        title={preview ? `Achievement Certificate: ${preview.title}` : ''}
        size="xl"
      >
        {preview && (
          <div className="flex flex-col items-center justify-center p-2">
            <img
              src={preview.certificate}
              alt={preview.title}
              className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl border border-white/5"
              loading="lazy"
            />
            <div className="mt-4 flex gap-3">
              <a
                href={preview.certificate}
                download
                className="px-4.5 py-2 text-xs font-semibold text-white bg-accent hover:bg-accent-light rounded-xl transition-all"
              >
                Download Certificate
              </a>
              <button
                onClick={() => setPreview(null)}
                className="px-4.5 py-2 text-xs font-semibold text-slate-400 hover:text-white border border-white/10 rounded-xl transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
}
