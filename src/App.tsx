import { useState, useCallback, useEffect, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import EngineeringLab from './components/EngineeringLab';
import ProofOfWork from './components/ProofOfWork';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import ParticleNetwork from './components/ParticleNetwork';
import BackgroundVideo from './components/BackgroundVideo';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [viewMode, setViewMode] = useState<'recruiter' | 'developer'>('recruiter');
  
  // Custom cursor state/refs
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Simple routing for 404 handling without external router libraries
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Custom cursor movement handler
  useEffect(() => {
    // Detect desktop (not touch device and screen size >= 1024px)
    const checkIsDesktop = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(!hasTouch && !prefersReduced && window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (coreRef.current && ringRef.current) {
        const { clientX: x, clientY: y } = e;
        
        // Fast tracking core
        coreRef.current.style.left = `${x}px`;
        coreRef.current.style.top = `${y}px`;
        
        // Ring follows with a tiny lag for a premium feel
        ringRef.current.animate(
          {
            left: `${x}px`,
            top: `${y}px`,
          },
          { duration: 250, fill: 'forwards', easing: 'ease-out' }
        );
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Search for nearest interactive parent with cursor attributes
      const clickable = target.closest('[data-cursor], button, a, [role="button"]');
      
      if (clickable) {
        setIsExpanded(true);
        const label = clickable.getAttribute('data-cursor');
        setCursorLabel(label || '');
      } else {
        setIsExpanded(false);
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isDesktop]);

  // Render 404 page if path is not root
  const is404 = currentPath !== '/' && currentPath !== '' && !currentPath.includes('index.html');

  if (is404) {
    return <NotFound />;
  }

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <div className={loaded ? 'relative z-10' : 'opacity-0 pointer-events-none'}>
        {/* Cinematic Pre-rendered Background Video Layer */}
        <BackgroundVideo />
        
        {/* Animated dynamic particle network canvas background */}
        <ParticleNetwork />

        <Navbar viewMode={viewMode} setViewMode={setViewMode} />

        {/* Desktop-only custom cursor markup */}
        {isDesktop && (
          <div className="custom-cursor-container">
            <div 
              ref={ringRef} 
              className={`custom-cursor-ring ${isExpanded ? 'expanded' : ''}`}
            >
              <span ref={labelRef} className="custom-cursor-label">
                {cursorLabel}
              </span>
            </div>
            <div 
              ref={coreRef} 
              className={`custom-cursor-core ${isExpanded ? 'expanded' : ''}`} 
            />
          </div>
        )}

        <main className="relative z-10">
          <Hero viewMode={viewMode} />
          
          <div className="section-divider" />
          
          {viewMode === 'recruiter' ? (
            <>
              <About />
              <div className="section-divider" />
              <Skills viewMode={viewMode} />
              <div className="section-divider" />
              <Projects viewMode={viewMode} />
              <div className="section-divider" />
              <Experience />
              <div className="section-divider" />
              <Achievements />
              <div className="section-divider" />
              <Certificates />
            </>
          ) : (
            <>
              <Skills viewMode={viewMode} />
              <div className="section-divider" />
              <Projects viewMode={viewMode} />
              <div className="section-divider" />
              <EngineeringLab />
              <div className="section-divider" />
              <ProofOfWork />
            </>
          )}
          
          <div className="section-divider" />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
