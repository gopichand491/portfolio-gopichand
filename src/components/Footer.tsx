import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { PERSONAL } from '../data/personal';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-900/60 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Identity Block */}
          <div className="text-center md:text-left">
            <p className="text-base font-black text-white tracking-wide uppercase">Gamidi Gopi Chand</p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              AI &amp; Data Science Student | AI Engineer | Full-Stack Developer
            </p>
          </div>

          {/* Social and Quick Actions */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="Email Gopi Chand"
            >
              <Mail size={18} />
            </a>
            <a
              href={PERSONAL.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
              aria-label="View Resume"
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
