import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Brain, Cpu, Globe, BarChart3, Wrench, Network, LayoutGrid } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { SKILLS } from '../data/skills';

const iconMap: Record<string, any> = {
  Code2,
  Brain,
  Cpu,
  Globe,
  BarChart3,
  Wrench,
};

interface SkillsProps {
  viewMode: 'recruiter' | 'developer';
}

export default function Skills({ viewMode }: SkillsProps) {
  const [showConstellation, setShowConstellation] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 },
    },
  };

  // Define strategic hub positions for the constellation SVG layout
  const constellationData = useMemo(() => {
    const hubCoordinates = [
      { name: 'Programming', cx: 160, cy: 120 },
      { name: 'AI / ML', cx: 400, cy: 80 },
      { name: 'AI Engineering', cx: 640, cy: 120 },
      { name: 'Web', cx: 160, cy: 380 },
      { name: 'Data', cx: 400, cy: 420 },
      { name: 'Tools', cx: 640, cy: 380 },
    ];

    const nodes: Array<{
      name: string;
      x: number;
      y: number;
      parent: string;
    }> = [];

    const lines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      parent: string;
      skillName: string;
    }> = [];

    SKILLS.forEach((cat) => {
      const coord = hubCoordinates.find((h) => h.name === cat.name);
      if (!coord) return;

      const N = cat.skills.length;
      const r_orbit = 65; // orbit radius

      cat.skills.forEach((skill, idx) => {
        const angle = (idx * 2 * Math.PI) / N;
        const x = coord.cx + r_orbit * Math.cos(angle);
        const y = coord.cy + r_orbit * Math.sin(angle);

        nodes.push({ name: skill, x, y, parent: cat.name });
        lines.push({
          x1: coord.cx,
          y1: coord.cy,
          x2: x,
          y2: y,
          parent: cat.name,
          skillName: skill,
        });
      });
    });

    return { hubs: hubCoordinates, nodes, lines };
  }, []);

  return (
    <SectionWrapper
      id="skills"
      eyebrow="Technical Matrix"
      title="Skills &amp; Capabilities"
      subtitle="A categorized map of programming languages, artificial intelligence domains, tools, and libraries I use"
    >
      
      {/* Constellation Toggle Button (Only on large desktop devices) */}
      <div className="hidden lg:flex justify-center mb-8">
        <div className="toggle-switch-container shadow-md shadow-black/25">
          <button
            onClick={() => setShowConstellation(false)}
            className={`toggle-switch-btn flex items-center gap-1.5 ${
              !showConstellation ? 'active' : 'inactive'
            }`}
            data-cursor="HOVER"
          >
            <LayoutGrid size={11} />
            Matrix Grid
          </button>
          <button
            onClick={() => setShowConstellation(true)}
            className={`toggle-switch-btn flex items-center gap-1.5 ${
              showConstellation ? 'active' : 'inactive'
            }`}
            data-cursor="HOVER"
          >
            <Network size={11} />
            Constellation Map
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showConstellation ? (
          // Matrix Grid View
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SKILLS.map((category) => {
              const Icon = iconMap[category.icon] || Code2;
              const isCatHovered = hoveredCategory === category.name;
              
              return (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`glass-card overflow-hidden relative group transition-all duration-300 ${
                    isCatHovered ? 'border-accent/30 shadow-lg shadow-accent/5' : ''
                  }`}
                  data-cursor="HOVER"
                >
                  {/* Colored top bar for visual hierarchy */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/20 to-cyan/20 group-hover:from-accent/70 group-hover:to-cyan/60 transition-all duration-300" />
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="p-2.5 bg-accent/5 rounded-xl group-hover:bg-accent/15 transition-colors border border-accent/10 text-accent-light">
                        <Icon size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-white tracking-wide">{category.name}</h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => {
                        const isSkillHovered = hoveredSkill === skill;
                        return (
                          <span
                            key={skill}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className={`px-2 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/5 text-slate-400 transition-all duration-200 cursor-default select-none ${
                              isSkillHovered || isCatHovered ? '!bg-accent/10 !border-accent/20 !text-white' : ''
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          // Interactive Constellation View
          <motion.div
            key="constellation"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:block glass-card p-6 border border-white/5 relative overflow-hidden bg-dark-950/60"
          >
            {/* Background grid markings for telemetry research look */}
            <div className="absolute inset-0 bg-grid-bg opacity-10 pointer-events-none" />

            <div className="relative w-full h-[520px] max-w-4xl mx-auto select-none">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500">
                {/* Glowing connection lines */}
                {constellationData.lines.map((line, idx) => {
                  const isParentHovered = hoveredCategory === line.parent;
                  const isSkillHovered = hoveredSkill === line.skillName;
                  const isActive = isParentHovered || isSkillHovered;

                  return (
                    <line
                      key={idx}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={isActive ? '#818cf8' : 'rgba(255, 255, 255, 0.05)'}
                      strokeWidth={isActive ? '1.2' : '0.6'}
                      strokeDasharray={isActive ? 'none' : '2, 4'}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Draw Category Hub Nodes */}
                {constellationData.hubs.map((hub) => {
                  const isHovered = hoveredCategory === hub.name;
                  const isActive = isHovered || constellationData.nodes.some(n => n.parent === hub.name && hoveredSkill === n.name);

                  return (
                    <g 
                      key={hub.name}
                      onMouseEnter={() => setHoveredCategory(hub.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={hub.cx}
                        cy={hub.cy}
                        r={isHovered ? 16 : 12}
                        fill={isActive ? 'rgba(99, 102, 241, 0.2)' : 'rgba(10, 15, 30, 0.8)'}
                        stroke={isActive ? '#818cf8' : 'rgba(255, 255, 255, 0.15)'}
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                      {/* Monogram indicator */}
                      <text
                        x={hub.cx}
                        y={hub.cy + 3}
                        textAnchor="middle"
                        fill={isActive ? '#fff' : '#64748b'}
                        fontSize="9"
                        fontWeight="900"
                        className="font-mono tracking-tighter"
                      >
                        {hub.name.slice(0, 2).toUpperCase()}
                      </text>
                      {/* Hub Label */}
                      <text
                        x={hub.cx}
                        y={hub.cy + (hub.cy < 250 ? -22 : 26)}
                        textAnchor="middle"
                        fill={isActive ? '#fff' : '#94a3b8'}
                        fontSize="10"
                        fontWeight="800"
                        className="font-sans uppercase tracking-widest transition-colors duration-300"
                      >
                        {hub.name}
                      </text>
                    </g>
                  );
                })}

                {/* Draw Skill Nodes */}
                {constellationData.nodes.map((node) => {
                  const isHovered = hoveredSkill === node.name;
                  const isParentHovered = hoveredCategory === node.parent;
                  const isActive = isHovered || isParentHovered;

                  return (
                    <g 
                      key={node.name}
                      onMouseEnter={() => {
                        setHoveredSkill(node.name);
                        setHoveredCategory(node.parent);
                      }}
                      onMouseLeave={() => {
                        setHoveredSkill(null);
                        setHoveredCategory(null);
                      }}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? 6 : 4}
                        fill={isActive ? '#22d3ee' : 'rgba(255, 255, 255, 0.1)'}
                        stroke={isActive ? '#818cf8' : 'none'}
                        strokeWidth="1"
                        className="transition-all duration-300"
                      />
                      
                      {/* Skill Label (only when node/parent is hovered or details are illuminated) */}
                      {isActive && (
                        <text
                          x={node.x}
                          y={node.y + (node.y > 250 ? 14 : -10)}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="700"
                          className="font-mono pointer-events-none drop-shadow-md"
                        >
                          {node.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Centered instruction text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                  Skills Constellation Map
                </p>
                <p className="text-[10px] text-slate-400 font-sans mt-1">
                  Hover nodes to discover structural linkages
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
