export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  github: string;
  liveDemo?: string;
  description: string;
  highlights: string[];
  architecture: string[];
  technologies?: string[];
  languages?: string[];
  caseStudy?: {
    problem: string;
    solution: string;
    implementation: string;
    results: string;
    challenges: string;
    futureWork: string;
  };
  featured: boolean;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'resume-compiler',
    title: 'A Compiler-Based Intelligent Resume Analysis and Quality Assessment System',
    category: 'Compiler Design • AI • NLP',
    github: 'https://github.com/gopichand491/Resume-compiler-',
    description: 'An intelligent system that applies compiler design principles—lexical analysis, parsing, and semantic analysis—to evaluate and score resumes for quality and completeness.',
    highlights: [
      'Lexical Analysis',
      'Syntax Analysis',
      'Parsing',
      'Semantic Analysis',
      'Resume Processing',
      'Quality Assessment',
      'Intelligent Scoring',
    ],
    architecture: [
      'Resume Input',
      'Lexical Analysis',
      'Parsing',
      'Semantic Analysis',
      'Quality Assessment',
      'Final Report',
    ],
    caseStudy: {
      problem: 'Traditional resume screening lacks structured, objective analysis. Manual review is time-consuming and inconsistent.',
      solution: 'Apply compiler design principles to systematically analyze resumes through lexical, syntactic, and semantic phases, producing structured quality assessments.',
      implementation: 'The system processes resumes through a multi-phase compiler pipeline: lexical analysis tokenizes resume content, parsing validates structure, and semantic analysis evaluates meaning and relevance to produce a quality assessment report.',
      results: 'The system produces structured quality assessment reports for input resumes, applying compiler-based analysis techniques.',
      challenges: 'Handling diverse resume formats and ensuring the compiler pipeline generalizes across different document structures.',
      futureWork: 'Integration with job description matching, support for additional resume formats, and enhanced scoring algorithms.',
    },
    featured: true,
  },
  {
    id: 'smartlivestock-ai',
    title: 'SmartLivestock AI',
    subtitle: 'Intelligent Livestock Monitoring & Disease Detection System',
    category: 'Computer Vision • AI • Full Stack',
    github: 'https://github.com/gopichand491/smartlivestock-ai',
    description: 'An AI-powered livestock monitoring system with webcam integration, live camera streaming, animal detection, disease analysis, and a multilingual AI assistant.',
    highlights: [
      'Webcam Integration',
      'Live Camera Streaming',
      'Snapshot Capture',
      'Animal Detection',
      'Livestock Classification',
      'Disease Analysis',
      'AI Assistant',
      'Multilingual Interface',
      'Real-time Monitoring',
      'Upload Fallback',
      'Vision-based Analysis',
    ],
    languages: ['English', 'Telugu', 'Tamil', 'Hindi'],
    architecture: [
      'Camera',
      'Vision Analysis',
      'Animal Detection',
      'Disease Analysis',
      'AI Assistant',
      'Result',
    ],
    caseStudy: {
      problem: 'Livestock farmers lack accessible tools for real-time animal health monitoring and disease detection, especially in rural multilingual communities.',
      solution: 'A full-stack AI application combining computer vision for animal detection and disease analysis with a multilingual AI assistant interface.',
      implementation: 'Integrates webcam/camera streaming with vision AI models for animal detection and classification. Includes disease analysis capabilities and a multilingual AI assistant supporting English, Telugu, Tamil, and Hindi.',
      results: 'A working system capable of camera-based livestock monitoring, animal detection, disease analysis, and multilingual user interaction.',
      challenges: 'Supporting multiple camera input modes, multilingual interface design, and integrating vision AI with real-time streaming.',
      futureWork: 'Breed identification improvements, expanded language support, offline capabilities for rural areas, and integration with veterinary databases.',
    },
    featured: true,
  },
  {
    id: 'antigravity-simulation',
    title: 'AI-Based Antigravity Simulation & Force Analysis System',
    category: 'AI/ML • Physics Simulation • Data Visualization',
    github: 'https://github.com/gopichand491/Antigravity-Simulation',
    description: 'A physics simulation system with AI/ML-powered force analysis, interactive visualizations, and data-driven insights into antigravity scenarios.',
    highlights: [
      'Force Analysis',
      'Physics Simulation',
      'AI/ML Analysis',
      'Interactive Visualization',
      '3D Visualization',
      'Mathematical Modeling',
      'Data Analysis',
      'Report Generation',
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'scikit-learn', 'Three.js', 'Recharts', 'ReportLab'],
    architecture: [
      'Input Parameters',
      'Simulation Engine',
      'Force Analysis',
      'AI/ML Analysis',
      'Visualization',
      'Report',
    ],
    caseStudy: {
      problem: 'Understanding complex force interactions in theoretical antigravity scenarios requires sophisticated simulation and analysis tools.',
      solution: 'A full-stack system combining physics simulation, AI/ML analysis, and interactive data visualization to explore antigravity force dynamics.',
      implementation: 'React + TypeScript frontend with Three.js for 3D visualization and Recharts for data plots. FastAPI + Python backend with scikit-learn for ML analysis and ReportLab for report generation.',
      results: 'An interactive simulation platform that enables exploration of antigravity scenarios with AI-driven analysis and visual reporting.',
      challenges: 'Integrating physics simulation with real-time 3D visualization and ensuring ML models provide meaningful analysis of simulation data.',
      futureWork: 'Enhanced physics models, additional ML algorithms, collaborative simulation sessions, and extended reporting capabilities.',
    },
    featured: true,
  },
  {
    id: 'ai-text-detection',
    title: 'AI-Generated Text Detection: Comparative Accuracy Analysis of CNN and ANN',
    category: 'NLP • Deep Learning • Model Comparison',
    github: 'https://github.com/gopichand491/AI-Generated-Text-Detection',
    description: 'A comparative study analyzing the accuracy of CNN and ANN architectures for detecting AI-generated text, with systematic model evaluation.',
    highlights: [
      'AI-Generated Text Detection',
      'CNN Architecture',
      'ANN Architecture',
      'Comparative Model Evaluation',
      'Accuracy Analysis',
      'NLP Processing',
    ],
    architecture: [
      'Text Input',
      'Preprocessing',
      'Feature Extraction',
      'CNN / ANN Models',
      'Comparison',
      'Detection Result',
    ],
    caseStudy: {
      problem: 'With the rise of large language models, distinguishing AI-generated text from human-written text has become a critical challenge.',
      solution: 'A systematic comparative analysis of CNN and ANN architectures applied to AI-generated text detection, evaluating their relative strengths.',
      implementation: 'Implements both CNN and ANN models for text classification, with a structured evaluation framework comparing model performance on text detection tasks.',
      results: 'Comparative analysis results between CNN and ANN approaches for AI-generated text detection. Refer to the project repository for specific metrics.',
      challenges: 'Ensuring fair comparison between architectures and handling the evolving nature of AI-generated text.',
      futureWork: 'Transformer-based detection models, larger dataset evaluation, real-time detection API, and multi-language support.',
    },
    featured: true,
  },
];

export const MORE_PROJECTS: Project[] = [
  {
    id: 'digital-twin',
    title: 'AI Digital Twin for Human Behavior Prediction',
    category: 'Machine Learning • Digital Twin • Behavioral Prediction',
    github: 'https://github.com/gopichand491',
    description: 'A machine learning system for generating digital twins that predict human behavior patterns using dataset generation, visualization, and explainable models.',
    highlights: ['Machine Learning', 'Digital Twin', 'Behavioral Prediction', 'Dataset Generation', 'Visualization', 'Streamlit'],
    architecture: ['Data Input', 'Feature Engineering', 'ML Model', 'Behavior Prediction', 'Visualization'],
    featured: false,
  },
  {
    id: 'fake-news-detection',
    title: 'Explainable Fake News Detection Using NLP & Machine Learning',
    category: 'NLP • Machine Learning • Explainable AI',
    github: 'https://github.com/gopichand491',
    description: 'An NLP-powered system for detecting fake news with explainable AI techniques, providing transparency into classification decisions.',
    highlights: ['NLP', 'Machine Learning', 'Text Classification', 'Explainable AI'],
    architecture: ['News Input', 'NLP Processing', 'Feature Extraction', 'Classification', 'Explanation'],
    featured: false,
  },
  {
    id: 'demand-forecasting',
    title: 'Retail Demand Forecasting System',
    category: 'Time-Series • ARIMA • Data Visualization',
    github: 'https://github.com/gopichand491',
    description: 'A time-series forecasting system for retail demand prediction using ARIMA models and interactive data visualizations.',
    highlights: ['Time-Series Analysis', 'ARIMA', 'Forecasting', 'Data Visualization'],
    architecture: ['Historical Data', 'Preprocessing', 'ARIMA Model', 'Forecast', 'Visualization'],
    featured: false,
  },
  {
    id: 'exoplanet-analysis',
    title: 'AI-Driven Multi-Modal Characterization of Exoplanet Host Stars and Their Systems',
    category: 'AI • Astronomy • Scientific Analysis',
    github: 'https://github.com/gopichand491',
    description: 'An AI/ML system for multi-modal analysis of astronomical data to characterize exoplanet host stars and their planetary systems.',
    highlights: ['AI', 'Machine Learning', 'Astronomy Data', 'Multi-modal Analysis', 'Scientific Data Analysis'],
    architecture: ['Astronomical Data', 'Multi-modal Processing', 'ML Analysis', 'Characterization', 'Results'],
    featured: false,
  },
];
