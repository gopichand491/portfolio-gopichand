export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    name: 'Programming',
    icon: 'Code2',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'AI / ML',
    icon: 'Brain',
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Generative AI', 'Model Evaluation'],
  },
  {
    name: 'AI Engineering',
    icon: 'Cpu',
    skills: ['RAG', 'AI Agents', 'Multi-LLM Workflows', 'Prompt Engineering'],
  },
  {
    name: 'Web',
    icon: 'Globe',
    skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'FastAPI', 'REST APIs'],
  },
  {
    name: 'Data',
    icon: 'BarChart3',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Time-Series Analysis', 'Data Visualization'],
  },
  {
    name: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Firebase', 'Streamlit', 'VS Code', 'Three.js', 'Framer Motion', 'Recharts'],
  },
];
