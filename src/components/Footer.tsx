import { Github, Linkedin, Mail, FileText, Instagram, Phone } from 'lucide-react';
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

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-900/30 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Identity Block */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <span className="px-2 py-0.5 text-[10px] font-black font-mono tracking-widest text-accent-light bg-accent/10 border border-accent/20 rounded">GCG</span>
              <p className="text-base font-black text-white tracking-wide uppercase">Gamidi Gopi Chand</p>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              AI &amp; Data Science Student | AI Engineer | Full-Stack Developer
            </p>
          </div>

          {/* Social and Quick Actions */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="GitHub Profile"
              data-cursor="CODE"
            >
              <Github size={18} />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="LinkedIn Profile"
              data-cursor="CONNECT"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={PERSONAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="Instagram Profile"
              data-cursor="CONNECT"
            >
              <Instagram size={18} />
            </a>
            <a
              href={PERSONAL.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="X (Twitter) Profile"
              data-cursor="CONNECT"
            >
              <XIcon size={16} />
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="Email Gopi Chand"
              data-cursor="CONNECT"
            >
              <Mail size={18} />
            </a>
            <a
              href={`tel:${PERSONAL.phone.replace(/\s+/g, '')}`}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="Phone Gopi Chand"
              data-cursor="CONNECT"
            >
              <Phone size={18} />
            </a>
            <a
              href={PERSONAL.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="View Resume"
              data-cursor="OPEN"
            >
              <FileText size={18} />
            </a>
          </div>
        </div>

        {/* Footer Base */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left select-none">
          <p className="text-[10px] text-slate-600 font-mono">
            Designed &amp; engineered locally • SIMATS Engineering 2028
          </p>
          <p className="text-[10px] text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} Gamidi Gopi Chand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
