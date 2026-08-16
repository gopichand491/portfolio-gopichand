import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Play, Code, Instagram, Phone } from 'lucide-react';
import { PERSONAL } from '../data/personal';
import { useScrollTo } from '../hooks/useNavigation';
import Modal from './Modal';
import VideoPlayer from './VideoPlayer';

// Custom X (formerly Twitter) icon component
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

interface HeroProps {
  viewMode: 'recruiter' | 'developer';
}

export default function Hero({ viewMode }: HeroProps) {
  const scrollTo = useScrollTo();
  const [videoOpen, setVideoOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt Effect using direct DOM updates for performance
  useEffect(() => {
    const card = cardRef.current;
    const ring = ringRef.current;
    const orb = orbRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate tilt degrees (max 10 degrees)
      const tiltX = -y / (rect.height / 20);
      const tiltY = x / (rect.width / 20);

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Parallax shifts on ring and volumetric orbs
      if (ring) {
        ring.style.transform = `translate3d(${x * 0.08}px, ${y * 0.08}px, 0) rotate(${x * 0.02}deg)`;
      }
      if (orb) {
        orb.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (ring) {
        ring.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
      if (orb) {
        orb.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (card) {
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-16 pb-12 overflow-hidden">
      
      {/* Layer 1: Deep-space dark background with gradients */}
      <div className="absolute inset-0 bg-dark-900 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Layer 2: Subtle animated grid overlay */}
      <div className="grid-bg opacity-30 pointer-events-none z-0" />
      
      {/* Layer 4: Volumetric lighting orbs */}
      <div ref={orbRef} className="absolute inset-0 pointer-events-none z-0 transition-transform duration-300 ease-out">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[130px] orb-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[130px] orb-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Layer 7: Foreground Typography & Badges */}
            <motion.div variants={itemVariants} className="w-fit">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-accent/20 bg-accent/5 text-[10px] font-bold uppercase tracking-wider text-accent-light shadow-md shadow-accent/5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                ● OPEN TO INTERNSHIPS &amp; COLLABORATIONS
              </span>
            </motion.div>

            {/* Name Heading */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
              <span className="text-slate-500 text-lg sm:text-xl font-bold tracking-widest block mb-1 font-mono">GAMIDI</span>
              <span className="gradient-text uppercase block">GOPI CHAND</span>
            </motion.h1>

            {/* Subtitle / Roles */}
            <motion.div variants={itemVariants} className="space-y-1 mb-6">
              <p className="text-lg md:text-xl text-slate-300 font-semibold">
                AI &amp; Data Science Student
              </p>
              <p className="text-xs font-bold tracking-widest uppercase text-cyan-light font-mono flex items-center gap-1.5">
                <span>AI Engineer</span>
                <span className="text-slate-600">•</span>
                <span>Full-Stack Developer</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              {viewMode === 'recruiter' 
                ? "Fusing machine learning algorithms with modern application architecture to build robust, scalable AI solutions. Ready to add value immediately to internships and engineering teams."
                : PERSONAL.tagline
              }
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
              {viewMode === 'recruiter' ? (
                <>
                  <a
                    href={PERSONAL.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 cursor-pointer text-xs uppercase tracking-wider"
                    data-cursor="OPEN"
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 hover:border-accent/40 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5 text-xs uppercase tracking-wider cursor-pointer"
                    data-cursor="CONNECT"
                  >
                    Let's Connect
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => scrollTo('projects')}
                    className="px-6 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 cursor-pointer text-xs uppercase tracking-wider"
                    data-cursor="VIEW"
                  >
                    Explore Architectures
                  </button>
                  <button
                    onClick={() => scrollTo('engineering-lab')}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/10 hover:border-accent/40 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5 text-xs uppercase tracking-wider cursor-pointer"
                    data-cursor="VIEW"
                  >
                    <Code size={14} />
                    Engineering Lab
                  </button>
                </>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="GitHub Profile"
                data-cursor="CODE"
              >
                <Github size={18} />
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="LinkedIn Profile"
                data-cursor="CONNECT"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={PERSONAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="Instagram Profile"
                data-cursor="CONNECT"
              >
                <Instagram size={18} />
              </a>
              <a
                href={PERSONAL.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="X (Twitter) Profile"
                data-cursor="CONNECT"
              >
                <XIcon size={16} />
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="Email Gopi Chand"
                data-cursor="CONNECT"
              >
                <Mail size={18} />
              </a>
              <a
                href={`tel:${PERSONAL.phone.replace(/\s+/g, '')}`}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="Phone Gopi Chand"
                data-cursor="CONNECT"
              >
                <Phone size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Layer 5 Profile Picture & Layer 6 3D Light Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center gap-8 perspective-container z-10"
          >
            {/* Premium 3D Floating Frame */}
            <div 
              ref={cardRef}
              className="relative group select-none transition-all duration-300 ease-out p-1 perspective-card"
              style={{ transformStyle: 'preserve-3d' }}
            >
              
              {/* Outer soft light sweep and dynamic SVG 3D ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-cyan/20 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity" />
              
              {/* Layer 6: Dynamic slow-rotating SVG ring */}
              <svg 
                ref={ringRef}
                className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)] pointer-events-none transition-transform duration-500 ease-out" 
                viewBox="0 0 200 200"
              >
                <motion.circle
                  cx="100"
                  cy="100"
                  r="94"
                  fill="none"
                  stroke="rgba(99, 102, 241, 0.25)"
                  strokeWidth="0.8"
                  strokeDasharray="6, 18, 45, 12"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="89"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="40, 10, 8, 30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="84"
                  fill="none"
                  stroke="rgba(129, 140, 248, 0.15)"
                  strokeWidth="1.2"
                  strokeDasharray="4, 4"
                  animate={{ rotate: 180 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
              </svg>

              <div 
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-accent/25 p-1 bg-dark-900/80 shadow-2xl shadow-black/80 float-anim"
                style={{ transform: 'translateZ(40px)' }}
              >
                <img
                  src={PERSONAL.profileImage}
                  alt="Gamidi Gopi Chand"
                  className="w-full h-full object-cover rounded-full filter saturate-[0.95] contrast-[1.02]"
                  loading="eager"
                />
              </div>
            </div>

            {/* Video Trigger CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white border border-white/10 hover:border-accent/40 rounded-xl transition-all hover:bg-accent/5 cursor-pointer shadow-md shadow-black/35"
              data-cursor="PLAY"
            >
              <div className="w-5 h-5 flex items-center justify-center bg-accent/20 rounded-full text-accent-light group-hover:bg-accent/40 transition-colors">
                <Play size={10} className="ml-0.5" />
              </div>
              Watch Video Introduction
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.button
          onClick={() => scrollTo(viewMode === 'recruiter' ? 'about' : 'skills')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 hover:text-accent transition-colors py-2 cursor-pointer no-print"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.button>
      </div>

      {/* Video Modal (lazy loaded control inside) */}
      <Modal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        title="Introduction Video — Gamidi Gopi Chand"
        size="lg"
      >
        <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10 relative">
          {videoOpen && (
            <VideoPlayer src={PERSONAL.introVideo} />
          )}
        </div>
      </Modal>
    </section>
  );
}
