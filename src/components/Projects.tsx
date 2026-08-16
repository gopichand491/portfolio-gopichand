import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ChevronDown, ChevronUp, BookOpen, Cpu } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import PipelineVisual from './PipelineVisual';
import Modal from './Modal';
import { FEATURED_PROJECTS, MORE_PROJECTS, type Project } from '../data/projects';

// Telemetry indicators mapping
const TELEMETRY_LABELS: Record<string, string> = {
  'resume-compiler': 'PARSER PIPELINE',
  'smartlivestock-ai': 'CAMERA PIPELINE',
  'antigravity-simulation': 'PHYSICS SOLVER',
  'ai-text-detection': 'CLASSIFIER MATRIX',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const visual = visualRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight cursor follow
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    }

    // 3D tilt coordinates relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -(e.clientY - rect.top - centerY) / (rect.height / 30);
    const tiltY = (e.clientX - rect.left - centerX) / (rect.width / 30);

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;

    // Internal parallax visual shift
    if (visual) {
      const px = (e.clientX - rect.left - centerX) * 0.035;
      const py = (e.clientY - rect.top - centerY) * 0.035;
      visual.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const visual = visualRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glow) {
      glow.style.opacity = '0';
    }
    if (visual) {
      visual.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col justify-between spotlight-card perspective-card cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        data-cursor="VIEW"
      >
        {/* Spotlight cursor glow */}
        <div ref={glowRef} className="spotlight-glow opacity-0 transition-opacity duration-300" />

        <div className="p-6 md:p-8 relative z-10" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
          {/* Top Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-black text-white/5 font-mono select-none">
              0{index + 1}
            </span>
            
            {/* Pulsing Telemetry indicator */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400 font-mono tracking-widest leading-none">
              <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse" />
              {TELEMETRY_LABELS[project.id] || 'REPOSITORY SYSTEM'}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-accent-light transition-colors">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">{project.subtitle}</p>
          )}
          <p className="text-slate-300 text-sm leading-relaxed mb-5">{project.description}</p>

          {/* Capabilities */}
          <div className="space-y-1.5 mb-5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Capabilities</span>
            <div className="flex flex-wrap gap-1.5">
              {project.highlights.map((h) => (
                <span key={h} className="px-2 py-0.5 text-xs text-slate-400 bg-white/5 border border-white/5 rounded">
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Languages or Technologies if present */}
          {project.languages && (
            <div className="mb-5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Supported Languages</span>
              <div className="flex flex-wrap gap-1.5">
                {project.languages.map((lang) => (
                  <span key={lang} className="px-2 py-0.5 text-xs text-cyan-light bg-cyan/5 border border-cyan/10 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.technologies && (
            <div className="mb-5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Project Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs text-emerald-400 bg-emerald-400/5 border border-emerald-500/10 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Pipeline Section with Parallax Container */}
          <div 
            ref={visualRef}
            className="mt-6 pt-5 border-t border-white/5 transition-transform duration-300 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Architectural Pipeline</span>
            <PipelineVisual steps={project.architecture} compact />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 md:px-8 md:pb-8 pt-0 flex flex-wrap gap-3 relative z-10" style={{ transform: 'translateZ(10px)' }}>
          {project.caseStudy && (
            <button
              onClick={() => setCaseStudyOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-accent/15 hover:bg-accent/25 border border-accent/20 rounded-lg transition-all cursor-pointer shadow-sm shadow-accent/5"
              data-cursor="OPEN"
            >
              <BookOpen size={13} />
              View Case Study
            </button>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-accent/20 rounded-lg transition-all hover:bg-white/5"
            data-cursor="CODE"
          >
            <Github size={13} />
            Source Code
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      {project.caseStudy && (
        <Modal
          isOpen={caseStudyOpen}
          onClose={() => setCaseStudyOpen(false)}
          title={`Case Study: ${project.title}`}
          size="xl"
        >
          <CaseStudyContent project={project} />
        </Modal>
      )}
    </>
  );
}

function CaseStudyContent({ project }: { project: Project }) {
  const cs = project.caseStudy!;
  const isDLComparison = project.id === 'ai-text-detection';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.category.split(' • ').map((tag) => (
          <span key={tag} className="px-2.5 py-0.5 text-xs font-bold text-accent-light bg-accent/5 border border-accent/10 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Problem Statement</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.problem}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Proposed Solution</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.solution}</p>
        </div>
      </div>

      <div className="border-t border-white/5 pt-5">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">System Pipeline &amp; Data Flow</h4>
        <PipelineVisual steps={project.architecture} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 border-t border-white/5 pt-5">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Implementation Details</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.implementation}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Key Challenges</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.challenges}</p>
        </div>
      </div>

      {isDLComparison && (
        <div className="border-t border-white/5 pt-5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Cpu size={14} className="text-accent-light" />
            CNN vs ANN Structural Comparison
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
              <p className="text-xs font-bold text-cyan-light uppercase tracking-wider mb-2">Convolutional Neural Network (CNN)</p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Best at local pattern detection (n-grams, adjacent word structures)</li>
                <li>Utilizes convolution filters to scan sliding windows of token embeddings</li>
                <li>Captures positional relationships in sequence chunks</li>
                <li>Lower parameters compared to deep dense networks for sequence width</li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
              <p className="text-xs font-bold text-accent-light uppercase tracking-wider mb-2">Artificial Neural Network (ANN)</p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Processes global frequency weights (bag-of-words / TF-IDF representations)</li>
                <li>Fully connected layers analyze document-wide occurrence rates</li>
                <li>Struggles to retain sequential ordering or token index offsets</li>
                <li>Requires structural regularization to avoid overfitting on sparse vectors</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 border-t border-white/5 pt-5">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Project Results</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.results}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Future Improvements</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.futureWork}</p>
        </div>
      </div>

      <div className="pt-5 border-t border-white/5 flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-semibold text-white bg-accent/20 hover:bg-accent/35 rounded-xl transition-all"
        >
          <Github size={13} />
          View on GitHub
        </a>
      </div>
    </div>
  );
}

function MoreProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card p-6 flex flex-col justify-between group cursor-pointer"
      data-cursor="CODE"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/5 rounded-md">
            {project.category}
          </span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github size={15} />
          </a>
        </div>
        <h4 className="text-sm font-bold text-white mb-2 group-hover:text-accent-light transition-colors leading-snug">
          {project.title}
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.highlights.map((h) => (
            <span key={h} className="px-2 py-0.5 text-[9px] text-slate-500 bg-white/5 rounded font-mono">
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectsProps {
  viewMode: 'recruiter' | 'developer';
}

export default function Projects({ viewMode }: ProjectsProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Artifacts"
      title={viewMode === 'recruiter' ? 'Featured Projects' : 'System Architectures & Code'}
      subtitle={viewMode === 'recruiter' ? 'Production-grade AI systems, physics engines, and deep learning comparative analyses' : 'Detailed code bases, modular pipelines, and technical blueprints'}
    >
      {/* Featured Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        {FEATURED_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Toggle Button */}
      <div className="text-center">
        <button
          onClick={() => setShowMore(!showMore)}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white border border-white/10 hover:border-accent/30 rounded-xl transition-all hover:bg-white/5 cursor-pointer shadow-md shadow-black/10"
          data-cursor="HOVER"
        >
          {showMore ? 'Collapse Projects' : 'Explore More Projects'}
          {showMore ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Extra Projects Grid */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {MORE_PROJECTS.map((project, i) => (
                <MoreProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
