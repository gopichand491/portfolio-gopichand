import { motion } from 'framer-motion';
import { GraduationCap, Target, Briefcase } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { EDUCATION, FOCUS_AREAS } from '../data/personal';

export default function About() {
  return (
    <SectionWrapper
      id="about"
      eyebrow="Biographical Summary"
      title="About Me"
      subtitle="Fusing machine learning algorithms with modern application architecture to build robust, scalable AI solutions"
    >
      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Professional Bio & Education */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 flex flex-col gap-6"
        >
          <div className="glass-card p-6 md:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-accent/10 rounded-xl">
                  <GraduationCap size={20} className="text-accent-light" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Academic Background</h3>
              </div>
              
              <div className="border-l-2 border-accent/20 pl-4 py-1 mb-6 space-y-1">
                <p className="text-base font-semibold text-white">{EDUCATION.degree}</p>
                <p className="text-sm font-medium text-slate-300">{EDUCATION.institution}</p>
                <p className="text-xs text-slate-500 font-mono">{EDUCATION.period}</p>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                I am an AI &amp; Data Science student at SIMATS Engineering, graduating in 2028. 
                My focus lies at the intersection of machine learning algorithms, database architecture, 
                and full-stack software development. I build production-ready applications utilizing 
                modern NLP pipelines, computer vision systems, and custom multi-LLM workflows.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Technical Focus Areas & Targets */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-5 flex flex-col gap-6"
        >
          <div className="glass-card p-6 md:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-cyan/10 rounded-xl">
                  <Target size={20} className="text-cyan-light" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Core Competencies</h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-white/5 border border-white/5 rounded-lg hover:border-accent/30 hover:text-white transition-all duration-200 cursor-default"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="border-t border-white/5 pt-5">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Briefcase size={12} className="text-accent-light" />
                  <span>Actively Seeking</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI/ML internships, research roles, full-stack software development positions, 
                  and hackathon/collaborative engineering opportunities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </SectionWrapper>
  );
}
