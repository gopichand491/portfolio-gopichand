import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Network, HelpCircle, BarChart3, Binary, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import SectionWrapper from './SectionWrapper';

interface ArchNode {
  label: string;
  description: string;
  telemetry: string; // Factual mock telemetry matching the project
}

interface ArchProject {
  name: string;
  nodes: ArchNode[];
}

const ARCHITECTURES: ArchProject[] = [
  {
    name: 'Resume Analyzer',
    nodes: [
      { label: 'Resume', description: 'Input document payload (PDF or DOCX format) provided by the candidate.', telemetry: 'PAYLOAD: MIME_PDF [320KB]' },
      { label: 'Lexer', description: 'Splits raw text strings into syntactically relevant tokens (credentials, skills, degree years).', telemetry: 'TOKENS: 4,120 INDEXED' },
      { label: 'Parser', description: 'Validates tokens against structured grammar rules to confirm sections and layouts.', telemetry: 'AST: GEN_SUCCESS' },
      { label: 'Semantic Analysis', description: 'Evaluates contextual relevance, depth of skills, and hierarchy of professional experience.', telemetry: 'WEIGHTS: N-GRAM_COSINE' },
      { label: 'Quality Engine', description: 'Calculates scoring weights and grades completeness across multiple dimensions.', telemetry: 'SCORE_IDX: FLOAT_0.94' },
      { label: 'Report', description: 'Generates structured report JSON and user-facing feedback highlights.', telemetry: 'JSON: WRITE_SUCCESS' },
    ],
  },
  {
    name: 'SmartLivestock',
    nodes: [
      { label: 'Camera', description: 'Webcam feed or static image snapshot capturing the livestock enclosure.', telemetry: 'STREAM: 1080P_30FPS' },
      { label: 'Vision Model', description: 'Preprocessing pipeline scaling images and preparing tensor structures.', telemetry: 'NORM: Float32 [3, 224, 224]' },
      { label: 'Animal Detection', description: 'Object detection bounding boxes locate individual animals in the frame.', telemetry: 'YOLO_INF: 42MS' },
      { label: 'Disease Analysis', description: 'Deep learning classifiers evaluate crop symptoms or physiological indicators.', telemetry: 'CONFIDENCE: 92.4%' },
      { label: 'AI Assistant', description: 'Multilingual text module answering context questions in English, Telugu, Tamil, or Hindi.', telemetry: 'LLM_LATENCY: 1.2S' },
    ],
  },
  {
    name: 'Antigravity Sim',
    nodes: [
      { label: 'Input', description: 'User-specified parameters: gravitational constants, mass variables, force coordinates.', telemetry: 'VECTORS: N_3 [X,Y,Z]' },
      { label: 'Simulation', description: 'Executes mathematical differential equation solvers to model force interactions.', telemetry: 'INTEGRATOR: RUNGE_KUTTA_4' },
      { label: 'Force Analysis', description: 'Calculates vector dynamics, stress indices, and trajectory predictions.', telemetry: 'ACCEL_CURVE: F_NET' },
      { label: 'AI/ML', description: 'Pattern clustering identifies stable gravity orbits and structural behaviors.', telemetry: 'SCIKIT_REG: CLUST_3' },
      { label: 'Visualization', description: 'Renders dynamic interactive graphs and Three.js force fields.', telemetry: 'RENDER: WEBGL_60FPS' },
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
          className="glass-card p-6 md:p-8 relative overflow-hidden"
          data-cursor="HOVER"
        >
          <div className="absolute inset-0 bg-grid-bg opacity-5 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/15 rounded-xl text-emerald-400">
                <Network size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">AI Pipeline Architectures</h3>
                <p className="text-xs text-slate-400">Select any system to explore the telemetry of data flows</p>
              </div>
            </div>

            {/* Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
              {ARCHITECTURES.map((arch, i) => (
                <button
                  key={arch.name}
                  onClick={() => { setActiveArch(i); setSelectedNode(null); }}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    activeArch === i
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
                  data-cursor="HOVER"
                >
                  {arch.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Flowchart Diagram */}
          <div className="bg-dark-950/30 p-6 rounded-2xl border border-white/5 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-y-6 md:flex-row">
              {ARCHITECTURES[activeArch].nodes.map((node, i) => {
                const isSelected = selectedNode?.label === node.label;
                const totalNodes = ARCHITECTURES[activeArch].nodes.length;
                
                return (
                  <div key={node.label} className="flex items-center flex-1 min-w-[120px] max-w-full">
                    {/* Node block */}
                    <div className="flex flex-col items-center flex-1">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedNode(isSelected ? null : node)}
                        className={`w-full py-3.5 px-4 rounded-xl border font-mono text-[11px] font-semibold text-center uppercase tracking-wider transition-all duration-300 ${
                          isSelected 
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-300'
                        }`}
                        data-cursor="OPEN"
                      >
                        {node.label}
                      </motion.button>
                      <span className="text-[8px] font-bold font-mono text-slate-500 uppercase mt-1.5 opacity-80 scale-90">
                        {node.telemetry.split(':')[0]}
                      </span>
                    </div>

                    {/* Connection line with animated data packets */}
                    {i < totalNodes - 1 && (
                      <div className="hidden md:flex items-center justify-center relative w-12 h-[2px] bg-white/5 mx-2">
                        {/* Moving Packet Dot */}
                        <motion.div
                          animate={{ left: ['0%', '100%'] }}
                          transition={{ 
                            duration: 1.8, 
                            repeat: Infinity, 
                            ease: 'linear',
                            delay: i * 0.3 
                          }}
                          className="absolute w-2 h-2 rounded-full bg-emerald-400 blur-[2px] -translate-y-[3px]"
                        />
                        <ArrowRight size={10} className="text-slate-700 absolute right-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Micro Details Telemetry Terminal */}
            <div className="mt-6 border-t border-white/5 pt-5 min-h-[90px]">
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.label}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl font-mono text-xs text-slate-300 space-y-2 relative"
                  >
                    <div className="absolute top-3.5 right-4 text-[9px] font-bold text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {selectedNode.telemetry}
                    </div>
                    
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <Binary size={12} />
                      <span>{selectedNode.label.toUpperCase()} COMPONENT ACTIVE</span>
                    </div>
                    <p className="font-sans text-slate-400 leading-relaxed text-xs">
                      {selectedNode.description}
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-slate-500 italic p-1">
                    <HelpCircle size={14} className="text-emerald-500/60" />
                    <span>Select any pipeline component above to inspect its real-time telemetry and explanation.</span>
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
              className="glass-card p-6 flex flex-col justify-between group laser-scan-container cursor-pointer"
              data-cursor="VIEW"
            >
              {/* Laser scan animation sweep on hover */}
              <div className="laser-scan-overlay">
                <div className="laser-scan-line" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-cyan/10 border border-cyan/15 rounded-lg text-cyan-light group-hover:scale-105 transition-transform duration-300">
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
                  <div className="h-44 w-full bg-dark-900/20 p-2.5 rounded-xl border border-white/5 mb-4 relative z-10">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-1 font-mono">
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
