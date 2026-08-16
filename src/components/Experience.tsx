import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, FileCheck, Award, Eye, Info } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import Modal from './Modal';
import { EXPERIENCES } from '../data/experience';

export default function Experience() {
  const [docPreview, setDocPreview] = useState<{ label: string; path: string } | null>(null);

  return (
    <SectionWrapper
      id="experience"
      eyebrow="Timeline"
      title="Experience"
      subtitle="Industry exposure, internships, and verified selections"
    >
      <div className="max-w-3xl mx-auto relative pl-4 sm:pl-0">
        
        {/* Central timeline line for desktop */}
        <div className="absolute left-6 sm:left-[11px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative pl-10 sm:pl-12 pb-12 last:pb-0"
          >
            {/* Timeline dot */}
            <div className={`absolute left-2.5 sm:left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center bg-dark-900 z-10 ${
              exp.status === 'completed'
                ? 'border-accent shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                : 'border-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                exp.status === 'completed' ? 'bg-accent' : 'bg-amber-400'
              }`} />
            </div>

            <div className="glass-card p-6 md:p-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                  exp.status === 'completed'
                    ? 'bg-emerald-400/5 text-emerald-400 border-emerald-500/10'
                    : 'bg-amber-400/5 text-amber-400 border-amber-500/10'
                }`}>
                  {exp.status === 'completed' ? (
                    <><FileCheck size={11} /> Completed</>
                  ) : (
                    <><Award size={11} /> Offer Received</>
                  )}
                </span>
                {exp.location && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/5 rounded-full uppercase tracking-wider">
                    {exp.location}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white">{exp.company}</h3>
              <p className="text-accent-light text-sm font-semibold mb-3">{exp.role}</p>

              {exp.period && (
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-5 font-medium">
                  <Calendar size={13} className="text-slate-500" />
                  <span>{exp.period}</span>
                </div>
              )}

              {/* Status Note or Description */}
              {exp.statusNote && (
                <div className="mb-5 flex items-start gap-2 p-3 bg-white/5 border border-white/5 rounded-lg text-xs text-slate-400">
                  <Info size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{exp.statusNote}</p>
                </div>
              )}

              {/* Projects completed */}
              {exp.projects && exp.projects.length > 0 && (
                <div className="mb-6 pt-4 border-t border-white/5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Briefcase size={12} className="text-accent-light" />
                    Key Deliverables
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {exp.projects.map((p) => (
                      <div key={p} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Document buttons */}
              {exp.documents && exp.documents.length > 0 && (
                <div className="pt-5 border-t border-white/5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Verification Documents</p>
                  <div className="flex flex-wrap gap-2.5">
                    {exp.documents.map((doc) => (
                      <button
                        key={doc.label}
                        onClick={() => setDocPreview(doc)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-accent/30 rounded-xl transition-all hover:bg-white/5 cursor-pointer"
                      >
                        <Eye size={12} />
                        {doc.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Document Preview Modal */}
      <Modal
        isOpen={!!docPreview}
        onClose={() => setDocPreview(null)}
        title={docPreview ? `Document Preview: ${docPreview.label}` : ''}
        size="xl"
      >
        {docPreview && (
          <div className="flex flex-col items-center justify-center p-2">
            <img
              src={docPreview.path}
              alt={docPreview.label}
              className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl border border-white/5"
              loading="lazy"
            />
            <div className="mt-4 flex gap-3">
              <a
                href={docPreview.path}
                download
                className="px-4.5 py-2 text-xs font-semibold text-white bg-accent hover:bg-accent-light rounded-xl transition-all"
              >
                Download File
              </a>
              <button
                onClick={() => setDocPreview(null)}
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
