import { motion } from 'framer-motion';
import { Github, Code2, Briefcase, Trophy, Award, FlaskConical, Quote } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { PERSONAL } from '../data/personal';

const PROOF_ITEMS = [
  {
    icon: Github,
    title: 'Open Source Repositories',
    description: 'Factual source repositories containing parser architectures, computer vision detectors, and mathematical simulation scripts.',
    link: PERSONAL.github,
    linkLabel: 'View GitHub Repositories',
  },
  {
    icon: Code2,
    title: 'Full-Stack Deployments',
    description: 'System pipelines combining web client UI, FastAPI routers, ML classifiers, and database schemas.',
    link: null,
    linkLabel: '',
  },
  {
    icon: Briefcase,
    title: 'Internship Milestones',
    description: 'Factual Software Development Intern role at Prodigy InfoTech with validated certificates and recommendation papers.',
    link: null,
    linkLabel: '',
  },
  {
    icon: Trophy,
    title: 'Hackathon Recognitions',
    description: 'ProtoBlitz\'25 First Prize victory at VelTech, verified through institutional award certificates.',
    link: null,
    linkLabel: '',
  },
  {
    icon: Award,
    title: 'Verified Certifications',
    description: 'Credential list from Kaggle (AI Agents), Adobe India Hackathon, Reliance (Data Science), and Geekster (Python).',
    link: null,
    linkLabel: '',
  },
  {
    icon: FlaskConical,
    title: 'Sandbox Experiments',
    description: 'Conceptual models evaluating CNN vs ANN text classification, lag ARIMA seasonal factors, and parsing algorithms.',
    link: null,
    linkLabel: '',
  },
];

export default function ProofOfWork() {
  return (
    <SectionWrapper
      id="proof-of-work"
      eyebrow="Verification"
      title="Proof of Work"
      subtitle="Factual artifacts and code repositories demonstrating built capability"
    >
      <div className="space-y-12">
        {/* Core Message Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-premium p-8 max-w-3xl mx-auto text-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 text-white/5 pointer-events-none">
            <Quote size={56} className="rotate-180" />
          </div>
          <div className="absolute bottom-4 right-4 text-white/5 pointer-events-none">
            <Quote size={56} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight italic select-none">
            "Show what I built, not just what I claim."
          </h3>
          <p className="text-xs uppercase font-mono tracking-widest text-accent-light">
            Core Philosophy &amp; Engineering Practice
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROOF_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card p-6 flex flex-col justify-between group hover:-translate-y-1 hover:border-accent/25 transition-all duration-300"
              >
                <div>
                  <div className="p-3 bg-accent/5 border border-accent/15 rounded-xl w-fit mb-4 text-accent-light group-hover:bg-accent/15 transition-colors">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 tracking-wide group-hover:text-accent-light transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:text-accent transition-colors cursor-pointer w-fit mt-2"
                  >
                    {item.linkLabel} →
                  </a>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block mt-2 select-none">
                    Verified Artifact
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
