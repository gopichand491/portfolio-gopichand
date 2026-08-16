import { motion } from 'framer-motion';
import { Code2, Brain, Cpu, Globe, BarChart3, Wrench } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { SKILLS } from '../data/skills';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Brain,
  Cpu,
  Globe,
  BarChart3,
  Wrench,
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
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

  return (
    <SectionWrapper
      id="skills"
      eyebrow="Technical Matrix"
      title="Skills &amp; Capabilities"
      subtitle="A categorized map of programming languages, artificial intelligence domains, tools, and libraries I use"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SKILLS.map((category) => {
          const Icon = iconMap[category.icon] || Code2;
          return (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="glass-card overflow-hidden relative group"
            >
              {/* Colored top bar for visual hierarchy */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 to-cyan/20 group-hover:from-accent/70 group-hover:to-cyan/60 transition-all duration-300" />
              
              <div className="p-6">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-2.5 bg-accent/10 rounded-xl group-hover:bg-accent/15 transition-colors border border-accent/10">
                    <Icon size={18} className="text-accent-light" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wide">{category.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
