import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { PERSONAL } from '../data/personal';

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

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Collaboration"
      title="Let's Build Something Intelligent"
      subtitle="Open to internships, technical roles, hackathon pairings, and research collaborations"
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
        
        {/* Left Column: Information Card */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between glass-card p-6 md:p-8 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">Connect with Gopi Chand</h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              Whether you are an industry recruiter looking for interns, a fellow developer proposing hackathon ideas, 
              or a researcher reviewing project concepts — I would love to hear from you.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="flex items-center gap-3.5 text-slate-300 hover:text-white transition-all group"
              >
                <div className="p-2.5 bg-accent/5 border border-accent/15 rounded-xl group-hover:bg-accent/15 transition-all text-accent-light">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Direct Mail</p>
                  <span className="text-sm font-semibold">{PERSONAL.email}</span>
                </div>
              </a>
              
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-slate-300 hover:text-white transition-all group"
              >
                <div className="p-2.5 bg-accent/5 border border-accent/15 rounded-xl group-hover:bg-accent/15 transition-all text-accent-light">
                  <Github size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">GitHub Profile</p>
                  <span className="text-sm font-semibold">github.com/gopichand491</span>
                </div>
              </a>

              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-slate-300 hover:text-white transition-all group"
              >
                <div className="p-2.5 bg-accent/5 border border-accent/15 rounded-xl group-hover:bg-accent/15 transition-all text-accent-light">
                  <Linkedin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">LinkedIn Profile</p>
                  <span className="text-sm font-semibold">linkedin.com/in/gopichand491</span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass-card p-6 md:p-8 flex flex-col justify-between gap-5"
          noValidate
        >
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Name</label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-colors`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle size={12} />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-colors`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle size={12} />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
            <textarea
              id="contact-message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-colors resize-none`}
              placeholder="Describe your inquiry, project scope, or opportunity..."
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle size={12} />
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-accent/15 hover:shadow-accent/25 hover:-translate-y-0.5 cursor-pointer"
          >
            <Send size={14} />
            Send Message via Mail
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="flex items-center gap-2 text-xs text-emerald-400 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"
              >
                <CheckCircle size={14} />
                <span>Redirecting to your default mail client...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
