import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Play } from 'lucide-react';
import { PERSONAL } from '../data/personal';
import { useScrollTo } from '../hooks/useNavigation';
import Modal from './Modal';
import VideoPlayer from './VideoPlayer';

export default function Hero() {
  const scrollTo = useScrollTo();
  const [videoOpen, setVideoOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 md:pt-16 pb-12 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[130px] pointer-events-none z-0 orb-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan/10 rounded-full blur-[130px] pointer-events-none z-0 orb-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="w-fit">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-accent/20 bg-accent/5 text-xs font-semibold text-accent-light">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
              <span className="text-slate-400 text-2xl sm:text-3xl font-bold tracking-wide block mb-1">GAMIDI</span>
              <span className="gradient-text uppercase block">GOPI CHAND</span>
            </motion.h1>

            {/* Subtitle / Roles */}
            <motion.div variants={itemVariants} className="space-y-1 mb-6">
              <p className="text-lg md:text-xl text-slate-300 font-semibold flex items-center gap-2">
                AI &amp; Data Science Student
              </p>
              <p className="text-sm font-semibold tracking-wider uppercase text-cyan-light font-mono">
                AI Engineer • Full-Stack Developer
              </p>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {PERSONAL.tagline}
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                Explore My Work
              </button>
              <a
                href={PERSONAL.resume}
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-accent/30 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5 text-sm"
              >
                <Download size={15} />
                Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
                aria-label="Email Gopi Chand"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Premium Profile Image Integration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center gap-6"
          >
            <div className="relative group select-none">
              {/* Outer double glowing ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-cyan to-accent-light rounded-full blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-accent-light rounded-full opacity-10" />

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-accent/25 p-1 bg-dark-900/60 float-anim">
                <img
                  src={PERSONAL.profileImage}
                  alt="Gamidi Gopi Chand"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>
            </div>

            {/* Video Trigger CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2.5 px-4.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-accent/40 rounded-xl transition-all hover:bg-accent/5 cursor-pointer shadow-md shadow-black/20"
            >
              <div className="w-5 h-5 flex items-center justify-center bg-accent/25 rounded-full text-accent-light group-hover:bg-accent/40 transition-colors">
                <Play size={10} className="ml-0.5" />
              </div>
              Watch Video Introduction
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.button
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 hover:text-accent transition-colors py-2 cursor-pointer no-print"
          aria-label="Scroll to About section"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={20} />
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
        <div className="aspect-video max-w-3xl mx-auto rounded-lg overflow-hidden">
          {videoOpen && (
            <VideoPlayer src={PERSONAL.introVideo} />
          )}
        </div>
      </Modal>
    </section>
  );
}
