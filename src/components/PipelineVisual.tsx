import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Info } from 'lucide-react';

interface Props {
  steps: string[];
  compact?: boolean;
}

// Technical explanations for pipeline nodes
const NODE_EXPLANATIONS: Record<string, string> = {
  // Resume Analyzer
  'Resume Input': 'Accepts resume files (PDF, DOCX) containing professional text data.',
  'Lexical Analysis': 'Tokenizes the document text into tokens like credentials, skills, and dates.',
  'Parsing': 'Validates structural rules and hierarchical sections of the resume.',
  'Semantic Analysis': 'Evaluates the contextual meaning, skill relevance, and depth of experience.',
  'Quality Assessment': 'Applies grading algorithms to evaluate resume strength objectively.',
  'Final Report': 'Outputs a detailed, structured feedback report with score metrics.',

  // SmartLivestock AI
  'Camera': 'Captures real-time video streaming or snapshots from high-res webcams.',
  'Vision Analysis': 'Performs preprocessing, frame-rate control, and image preparation.',
  'Animal Detection': 'YOLO/CNN based real-time object detection to locate livestock.',
  'Disease Analysis': 'Vision classifiers identify physical symptoms or anomalies on the animal.',
  'AI Assistant': 'Natural language interface answering farm management questions.',
  'Result': 'Displays species identification, disease severity, and recommended actions.',

  // Antigravity Sim
  'Input Parameters': 'Allows users to configure gravity constants, mass, force vectors, and variables.',
  'Simulation Engine': 'Executes real-time physics calculations using numerical integration.',
  'Force Analysis': 'Calculates stress points, vector magnitudes, and acceleration curves.',
  'AI/ML Analysis': 'Predicts stability zones and builds structural behavior patterns.',
  'Visualization': 'Renders simulated particles, gravitational fields, and force vectors.',
  'Report': 'Generates detailed data tables and graphs for scientific analysis.',

  // AI-Generated Text Detection
  'Text Input': 'User inputs text paragraph or document to analyze authenticity.',
  'Preprocessing': 'Cleans text, tokenizes, removes stop-words, and prepares vectors.',
  'Feature Extraction': 'Extracts lexical diversity, syntax complexity, and perplexity.',
  'CNN / ANN Models': 'Executes parallel deep learning classifiers trained on generative text.',
  'Comparison': 'Weighs confidence scores, precision, and recall between model types.',
  'Detection Result': 'Outputs clear probability metrics indicating AI vs Human authorship.',
};

export default function PipelineVisual({ steps, compact = false }: Props) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (step: string) => {
    setSelectedNode(prev => (prev === step ? null : step));
  };

  return (
    <div className={`space-y-3 ${compact ? '' : 'my-6'}`}>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, i) => {
          const hasExplanation = step in NODE_EXPLANATIONS;
          const isSelected = selectedNode === step;

          return (
            <div key={step} className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => hasExplanation && handleNodeClick(step)}
                className={`pipeline-node flex items-center gap-1.5 ${
                  isSelected ? 'active !border-accent !bg-accent/15' : ''
                } ${hasExplanation ? 'cursor-pointer' : 'cursor-default'}`}
                aria-label={`Pipeline node: ${step}${hasExplanation ? '. Click for details.' : ''}`}
              >
                {step}
                {hasExplanation && (
                  <Info size={11} className={`${isSelected ? 'text-accent-light' : 'text-slate-500 group-hover:text-slate-300'}`} />
                )}
              </motion.button>
              {i < steps.length - 1 && (
                <ChevronRight size={14} className="pipeline-arrow" />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedNode && NODE_EXPLANATIONS[selectedNode] && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            className="p-3 bg-dark-800/50 border border-accent/20 rounded-lg text-xs text-slate-300 shadow-md shadow-black/45 max-w-xl"
          >
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-accent-light rounded-full" />
              {selectedNode}
            </div>
            <p className="leading-relaxed">{NODE_EXPLANATIONS[selectedNode]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
