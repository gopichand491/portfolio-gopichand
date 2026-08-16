import { useState, useCallback, useEffect } from 'react';
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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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

  // Render 404 page if path is not root
  const is404 = currentPath !== '/' && currentPath !== '' && !currentPath.includes('index.html');

  if (is404) {
    return <NotFound />;
  }

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <div className={loaded ? 'relative z-10' : 'opacity-0 pointer-events-none'}>
        {/* Animated dynamic particle network canvas background */}
        <ParticleNetwork />

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <Experience />
          <div className="section-divider" />
          <Achievements />
          <div className="section-divider" />
          <Certificates />
          <div className="section-divider" />
          <EngineeringLab />
          <div className="section-divider" />
          <ProofOfWork />
          <div className="section-divider" />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
