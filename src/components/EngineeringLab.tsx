import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Network, HelpCircle, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import SectionWrapper from './SectionWrapper';

interface ArchNode {
  label: string;
  description: string;
}

interface ArchProject {
  name: string;
  nodes: ArchNode[];
}

const ARCHITECTURES: ArchProject[] = [
  {
    name: 'Resume Analyzer',
    nodes: [
      { label: 'Resume', description: 'Input document payload (PDF or DOCX format) provided by the candidate.' },
      { label: 'Lexer', description: 'Splits raw text strings into syntactically relevant tokens (credentials, skills, degree years).' },
      { label: 'Parser', description: 'Validates tokens against structured grammar rules to confirm sections and layouts.' },
      { label: 'Semantic Analysis', description: 'Evaluates contextual relevance, depth of skills, and hierarchy of professional experience.' },
      { label: 'Quality Assessment', description: 'Calculates scoring weights and grades completeness across multiple dimensions.' },
      { label: 'Report', description: 'Generates structured report JSON and user-facing feedback highlights.' },
    ],
  },
  {
    name: 'SmartLivestock',
    nodes: [
      { label: 'Camera', description: 'Webcam feed or static image snapshot capturing the livestock enclosure.' },
      { label: 'Vision Model', description: 'Preprocessing pipeline scaling images and preparing tensor structures.' },
      { label: 'Animal Detection', description: 'Object detection bounding boxes locate individual animals in the frame.' },
      { label: 'Disease Analysis', description: 'Deep learning classifiers evaluate crop symptoms or physiological indicators.' },
      { label: 'AI Assistant', description: 'Multilingual text module answering context questions in English, Telugu, Tamil, or Hindi.' },
    ],
  },
  {
    name: 'Antigravity Sim',
    nodes: [
      { label: 'Input', description: 'User-specified parameters: gravitational constants, mass variables, force coordinates.' },
      { label: 'Simulation', description: 'Executes mathematical differential equation solvers to model force interactions.' },
      { label: 'Force Analysis', description: 'Calculates vector dynamics, stress indices, and trajectory predictions.' },
      { label: 'AI/ML', description: 'Pattern clustering identifies stable gravity orbits and structural behaviors.' },
      { label: 'Visualization', description: 'Renders dynamic interactive graphs and Three.js force fields.' },
    ],
  },
];

const EXPERIMENTS = [
  {
    title: 'CNN vs ANN for Text Detection',
    description: 'Comparative testing of Neural Network architectures on structured text data. Evaluates sliding local context windows vs fully connected global frequency weights.',
    tags: ['Deep Learning', 'NLP', 'Structural Analysis'],
    chartData: [
      { name: 'Local Context', CNN: 90, ANN: 40 },
      { name: 'Sequence Width', CNN: 80, ANN: 50 },
      { name: 'Param Efficiency', CNN: 85, ANN: 60 },
      { name: 'Positional Order', CNN: 75, ANN: 30 },
    ]
  },
  {
    title: 'Time-Series Forecasting',
    description: 'ARIMA seasonal parameter testing. Analyzes predictive performance across varying lag coefficients and trend metrics on historical sequence sets.',
    tags: ['ARIMA', 'Time-Series', 'Predictive Analysis'],
    chartData: [
      { name: 'Trend Extraction', Score: 85 },
      { name: 'Seasonality Fit', Score: 70 },
      { name: 'Lag Adaptability', Score: 80 },
    ]
  },
  {
    title: 'Computer Vision Pipeline',
    description: 'Livestock frame-rate and detection speed experiments comparing anchor boxes and resolution scales for real-time webcam rendering.',
    tags: ['Computer Vision', 'Webcam', 'Inference'],
  },
  {
    title: 'Compiler-Based NLP',
    description: 'Investigating state machine performance for natural language analysis in resume scanning. Maps deterministic tokenization against LLM token speeds.',
    tags: ['Compiler Design', 'State Machine', 'Parsing'],
  },
];

export default function EngineeringLab() {
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);
  const [activeArch, setActiveArch] = useState(0);

  return (
    <SectionWrapper
      id="engineering-lab"
      eyebrow="Research Sandbox"
      title="Engineering Lab"
      subtitle="Interactive system architecture charts, machine learning sandboxes, and structural concept reviews"
    >
      <div className="space-y-10">
        
        {/* Architecture Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 md:p-8"
        >
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-2.5 bg-accent/10 border border-accent/15 rounded-xl text-accent-light">
              <Network size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">AI Architecture Explorer</h3>
              <p className="text-xs text-slate-400">Click on any pipeline node to inspect its runtime responsibility</p>
            </div>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {ARCHITECTURES.map((arch, i) => (
              <button
                key={arch.name}
                onClick={() => { setActiveArch(i); setSelectedNode(null); }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  activeArch === i
                    ? 'bg-accent/15 text-accent-light border border-accent/30 shadow-md shadow-accent/5'
                    : 'text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {arch.name}
              </button>
            ))}
          </div>

          {/* Pipeline Flowchart */}
          <div className="bg-dark-900/60 p-5 rounded-2xl border border-white/5">
            <div className="flex flex-wrap items-center gap-3">
              {ARCHITECTURES[activeArch].nodes.map((node, i) => {
                const isSelected = selectedNode?.label === node.label;
                return (
                  <div key={node.label} className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedNode(isSelected ? null : node)}
                      className={`pipeline-node flex items-center gap-1.5 ${
                        isSelected ? 'active !border-accent !bg-accent/15' : ''
                      }`}
                    >
                      {node.label}
                    </motion.button>
                    {i < ARCHITECTURES[activeArch].nodes.length - 1 && (
                      <span className="text-accent/40 font-bold select-none">→</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation box */}
            <div className="mt-5 min-h-[50px]">
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.label}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-4 bg-accent/5 border border-accent/15 rounded-xl"
                  >
                    <p className="text-xs font-bold text-accent-light uppercase tracking-wider mb-1">
                      {selectedNode.label}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedNode.description}
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-slate-500 italic p-1">
                    <HelpCircle size={14} />
                    <span>Select an architecture step above to read the technical explanation.</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {EXPERIMENTS.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-cyan/10 border border-cyan/15 rounded-lg text-cyan-light">
                      <FlaskConical size={16} />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-light transition-colors">{exp.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">{exp.description}</p>

                {/* Conceptual Chart for genuine data visualization */}
                {exp.chartData && (
                  <div className="h-44 w-full bg-dark-900/40 p-2.5 rounded-xl border border-white/5 mb-4">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-1">
                      <BarChart3 size={10} />
                      Relative Architecture Capabilities (Conceptual Scale)
                    </span>
                    <ResponsiveContainer width="100%" height="90%">
                      <ReBarChart data={exp.chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} domain={[0, 100]} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}
                          labelStyle={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}
                          itemStyle={{ fontSize: '10px' }}
                        />
                        {exp.title.includes('CNN vs ANN') ? (
                          <>
                            <Bar dataKey="CNN" fill="#818cf8" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="ANN" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                          </>
                        ) : (
                          <Bar dataKey="Score" fill="#818cf8" radius={[2, 2, 0, 0]} />
                        )}
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
