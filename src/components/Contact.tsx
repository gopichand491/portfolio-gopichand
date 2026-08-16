import { useState, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle, Phone, Instagram, ArrowUpRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { PERSONAL } from '../data/personal';

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

interface CardData {
  label: string;
  value: string;
  href: string;
  icon: any;
}

function ContactCard({ card }: { card: CardData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = card.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardEl = cardRef.current;
    const glowEl = glowRef.current;
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowEl) {
      glowEl.style.left = `${x}px`;
      glowEl.style.top = `${y}px`;
      glowEl.style.opacity = '1';
    }

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -(e.clientY - rect.top - centerY) / (rect.height / 20);
    const tiltY = (e.clientX - rect.left - centerX) / (rect.width / 20);

    cardEl.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const cardEl = cardRef.current;
    const glowEl = glowRef.current;
    if (cardEl) {
      cardEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glowEl) {
      glowEl.style.opacity = '0';
    }
  };

  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full select-none text-left"
      data-cursor="CONNECT"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card p-5 relative overflow-hidden group spotlight-card perspective-card transition-all duration-300 h-full border border-white/5 hover:border-accent/30 flex flex-col justify-between"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Spotlight cursor glow */}
        <div ref={glowRef} className="spotlight-glow-cyan opacity-0 transition-opacity duration-300" />
        
        <div className="relative z-10 flex items-start gap-4" style={{ transform: 'translateZ(20px)' }}>
          <div className="p-3 bg-accent/5 rounded-xl border border-accent/15 group-hover:bg-accent/15 group-hover:scale-105 transition-all text-accent-light flex-shrink-0">
            <Icon size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">{card.label}</p>
            <span className="text-xs md:text-sm font-semibold text-white group-hover:text-accent-light transition-colors break-all leading-tight">
              {card.value}
            </span>
          </div>
        </div>

        <div className="relative z-10 flex justify-end mt-4" style={{ transform: 'translateZ(10px)' }}>
          <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
        </div>
      </div>
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.open(`mailto:${PERSONAL.email}?subject=${subject}&body=${body}`);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const cards: CardData[] = [
    {
      label: 'EMAIL',
      value: PERSONAL.email,
      href: `mailto:${PERSONAL.email}`,
      icon: Mail,
    },
    {
      label: 'PHONE',
      value: PERSONAL.phone,
      href: `tel:${PERSONAL.phone.replace(/\s+/g, '')}`,
      icon: Phone,
    },
    {
      label: 'LINKEDIN',
      value: 'Gopi Chand Gamidi',
      href: PERSONAL.linkedin,
      icon: Linkedin,
    },
    {
      label: 'GITHUB',
      value: 'gopichand491',
      href: PERSONAL.github,
      icon: Github,
    },
    {
      label: 'INSTAGRAM',
      value: '@its_me_gopichand',
      href: PERSONAL.instagram,
      icon: Instagram,
    },
    {
      label: 'X / TWITTER',
      value: '@gopichanddz',
      href: PERSONAL.x,
      icon: XIcon,
    },
  ];

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Collaboration"
      title="Let's Build Something Intelligent"
      subtitle="Have an idea, opportunity, collaboration, or technical challenge? Let's connect."
    >
      <div className="space-y-16 max-w-6xl mx-auto">
        
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Contact Cards Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <ContactCard key={card.label} card={card} />
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-5 glass-card p-6 md:p-8 flex flex-col justify-between gap-5 border border-white/5 relative overflow-hidden"
            noValidate
            data-cursor="HOVER"
          >
            <div className="absolute inset-0 bg-grid-bg opacity-5 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-colors`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1.5 font-mono">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-colors`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1.5 font-mono">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-colors resize-none`}
                  placeholder="Describe your inquiry, project scope, or opportunity..."
                />
                {errors.message && (
                  <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1.5 font-mono">
                    <AlertCircle size={12} />
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="relative z-10">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-accent/15 hover:shadow-accent/25 hover:-translate-y-0.5 cursor-pointer font-mono"
              >
                <Send size={12} />
                Send Message via Mail
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex items-center gap-2 text-xs text-emerald-400 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl mt-3 font-mono"
                  >
                    <CheckCircle size={14} />
                    <span>Redirecting to your default mail client...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>

        {/* Final CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 border border-white/5 relative overflow-hidden text-center max-w-4xl mx-auto"
          data-cursor="HOVER"
        >
          <div className="absolute inset-0 bg-grid-bg opacity-5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

          <h3 className="text-xl md:text-3xl font-black text-white mb-3 tracking-tight relative z-10">
            Have an idea worth building?
          </h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto relative z-10">
            Let's turn it into an intelligent system.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="px-6 py-3.5 bg-accent hover:bg-accent-light text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md shadow-accent/15 hover:shadow-accent/25 hover:-translate-y-0.5"
              data-cursor="CONNECT"
            >
              Email Me
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-white/10 hover:border-accent/40 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5"
              data-cursor="CONNECT"
            >
              Connect on LinkedIn
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-white/10 hover:border-accent/40 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5"
              data-cursor="CODE"
            >
              View GitHub
            </a>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
