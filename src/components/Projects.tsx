import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, BookOpen, Cpu } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import PipelineVisual from './PipelineVisual';
import Modal from './Modal';
import { FEATURED_PROJECTS, MORE_PROJECTS, type Project } from '../data/projects';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glass-card overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
      >
        <div className="p-6 md:p-8">
          {/* Top Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-black text-white/5 font-mono select-none">
              0{index + 1}
            </span>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {project.category.split(' • ').map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-light bg-accent/5 border border-accent/10 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-accent-light transition-colors">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">{project.subtitle}</p>
          )}
          <p className="text-slate-300 text-sm leading-relaxed mb-5">{project.description}</p>

          {/* Highlights */}
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

          {/* Architecture Pipeline Section */}
          <div className="mt-6 pt-5 border-t border-white/5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Architectural Pipeline</span>
            <PipelineVisual steps={project.architecture} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 md:px-8 md:pb-8 pt-0 flex flex-wrap gap-3">
          {project.caseStudy && (
            <button
              onClick={() => setCaseStudyOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-accent/15 hover:bg-accent/25 border border-accent/20 rounded-lg transition-all cursor-pointer shadow-sm shadow-accent/5"
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
          >
            <Github size={13} />
            Source Code
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-cyan/20 rounded-lg transition-all hover:bg-white/5"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </motion.div>

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
  
  // Custom design for CNN vs ANN comparative view in Project 4
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

      {/* Special Comparison Graphic for Project 4 */}
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
              <p className="text-xs font-bold text-accent-light uppercase tracking-wider mb-2">Artificial Neural Network (ANN / MLP)</p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Best at global frequency/representation classification</li>
                <li>Fully connected layers with non-linear activation (ReLU/Sigmoid)</li>
                <li>Processes flattened inputs or bag-of-words tf-idf representations</li>
                <li>Effective baseline but prone to losing sequential context</li>
              </ul>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 italic mt-2.5">
            * Refer to project repository source code for exact training metrics, model checkpoints, and evaluation datasets.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 border-t border-white/5 pt-5">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Project Results</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.results}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            Future Improvements
            <span className="text-[9px] font-semibold text-amber-400/80 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">
              Future Work
            </span>
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">{cs.futureWork}</p>
        </div>
      </div>

      {project.technologies && (
        <div className="border-t border-white/5 pt-5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-3 py-1 text-xs text-emerald-400 bg-emerald-400/5 border border-emerald-500/10 rounded-lg font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card p-6 flex flex-col justify-between group"
    >
      <div>
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {project.category.split(' • ').map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-light bg-accent/5 border border-accent/10 rounded">
              {tag}
            </span>
          ))}
        </div>
        <h4 className="text-base font-bold text-white mb-2 group-hover:text-accent-light transition-colors">{project.title}</h4>
        <p className="text-slate-400 text-xs leading-relaxed mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.highlights.map((h) => (
            <span key={h} className="px-2 py-0.5 text-[10px] text-slate-500 bg-white/5 border border-transparent rounded">
              {h}
            </span>
          ))}
        </div>
      </div>
      
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <Github size={12} />
        Source Code
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const [showMore, setShowMore] = useState(false);

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Artifacts"
      title="Featured Projects"
      subtitle="Production-grade AI systems, physics engines, and deep learning comparative analyses"
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
