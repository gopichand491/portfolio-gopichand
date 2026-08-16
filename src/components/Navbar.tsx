import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, UserCheck, Code } from 'lucide-react';
import { NAV_ITEMS, PERSONAL } from '../data/personal';
import { useActiveSection, useScrollTo, useScrolled } from '../hooks/useNavigation';

interface NavbarProps {
  viewMode: 'recruiter' | 'developer';
  setViewMode: (mode: 'recruiter' | 'developer') => void;
}

export default function Navbar({ viewMode, setViewMode }: NavbarProps) {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollTo = useScrollTo();

  // Dynamically filter nav items based on the active view mode
  const filteredNavItems = NAV_ITEMS.filter((item) => {
    if (viewMode === 'recruiter') {
      return item.id !== 'engineering-lab';
    } else {
      // developer view mode
      return (
        item.id !== 'about' &&
        item.id !== 'experience' &&
        item.id !== 'achievements' &&
        item.id !== 'certificates'
      );
    }
  });

  const sectionIds = filteredNavItems.map((n) => n.id);
  const active = useActiveSection(sectionIds);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Handle focus trapping inside mobile menu when active
  useEffect(() => {
    if (!mobileOpen) return;
    const focusableElements = menuRef.current?.querySelectorAll(
      'button, a, [tabindex="0"]'
    );
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstEl = focusableElements[0] as HTMLElement;
    const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabTrap);
    return () => window.removeEventListener('keydown', handleTabTrap);
  }, [mobileOpen]);

  const handleNav = (id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
          scrolled
            ? 'bg-dark-900/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30 py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Monogram Brand Signature Logo */}
            <button
              onClick={() => handleNav('home')}
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 hover:border-accent/30 bg-dark-800/80 transition-all cursor-pointer font-mono text-base font-black tracking-widest text-white shadow-md shadow-black/20"
              aria-label="Back to top"
              data-cursor="HOME"
            >
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-cyan-light font-black group-hover:scale-105 transition-transform">GCG</span>
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </button>

            {/* Desktop Navbar List */}
            <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
              {filteredNavItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`relative px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-accent/10 rounded-lg border border-accent/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* View Mode Toggle & Resume Button */}
            <div className="flex items-center gap-4">
              
              {/* Recruiter / Developer View Toggle Switch */}
              <div className="hidden sm:inline-flex toggle-switch-container shadow-md shadow-black/25">
                <button
                  onClick={() => setViewMode('recruiter')}
                  className={`toggle-switch-btn flex items-center gap-1.5 ${
                    viewMode === 'recruiter' ? 'active' : 'inactive'
                  }`}
                  aria-label="Switch to Recruiter View"
                >
                  <UserCheck size={11} />
                  Recruiter
                </button>
                <button
                  onClick={() => setViewMode('developer')}
                  className={`toggle-switch-btn flex items-center gap-1.5 ${
                    viewMode === 'developer' ? 'active' : 'inactive'
                  }`}
                  aria-label="Switch to Developer View"
                >
                  <Code size={11} />
                  Developer
                </button>
              </div>

              {/* Resume button & Mobile Toggle */}
              <a
                href={PERSONAL.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-accent/15 hover:bg-accent/25 border border-accent/25 rounded-xl transition-all shadow-sm shadow-accent/5"
                data-cursor="OPEN"
              >
                <FileText size={13} />
                Resume ↗
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-dark-800 border-l border-white/5 p-6 pt-20 flex flex-col justify-between"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="space-y-6">
                
                {/* View Mode Toggle for Mobile */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Perspective Mode</span>
                  <div className="flex w-full toggle-switch-container">
                    <button
                      onClick={() => setViewMode('recruiter')}
                      className={`flex-1 text-center justify-center toggle-switch-btn flex items-center gap-1.5 ${
                        viewMode === 'recruiter' ? 'active' : 'inactive'
                      }`}
                    >
                      <UserCheck size={11} />
                      Recruiter
                    </button>
                    <button
                      onClick={() => setViewMode('developer')}
                      className={`flex-1 text-center justify-center toggle-switch-btn flex items-center gap-1.5 ${
                        viewMode === 'developer' ? 'active' : 'inactive'
                      }`}
                    >
                      <Code size={11} />
                      Developer
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Navigation</span>
                  {filteredNavItems.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`text-left w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                          isActive
                            ? 'text-white bg-accent/10 border border-accent/20'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mt-6">
                <a
                  href={PERSONAL.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-accent/15 hover:bg-accent/25 border border-accent/25 rounded-xl transition-all"
                >
                  <FileText size={13} />
                  Resume ↗
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
