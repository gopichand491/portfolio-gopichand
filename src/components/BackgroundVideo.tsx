import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useAppStore } from '../store';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHeroVisible = useAppStore(state => state.isHeroVisible);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Safe scroll tracking for atmospheric color overlays
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 40 });

  // Section Color Atmosphere Transitions mapping to the user's requested themes
  // Home(Indigo) -> Projects(Cyan/Blue) -> EngLab(Emerald/Teal) -> Achieve(Gold/Amber) -> Certs(Violet/Magenta) -> Contact(Purple/Cyan)
  const atmosphericColor = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      'rgba(99, 102, 241, 0.15)',  // About: blue / violet
      'rgba(6, 182, 212, 0.15)',   // Projects: cyan / blue
      'rgba(16, 185, 129, 0.15)',  // Engineering Lab: emerald / teal
      'rgba(245, 158, 11, 0.1)',   // Achievements: gold / amber
      'rgba(217, 70, 239, 0.15)',  // Certificates: violet / magenta
      'rgba(147, 51, 234, 0.15)'   // Contact: purple / cyan
    ]
  );

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Manage video playback lifecycle based on Hero visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isHeroVisible || reducedMotion) {
      videoRef.current.pause();
    } else {
      // Attempt to play if not in hero section
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented by browser, safe to ignore
        });
      }
    }
  }, [isHeroVisible, reducedMotion]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      
      {/* Cinematic Pre-Rendered Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isHeroVisible ? 0 : 1 }}
        autoPlay={!isHeroVisible && !reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/assets/videos/background_ai_universe.webm" type="video/webm" />
        <source src="/assets/videos/background_ai_universe.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Color Grading Overlay */}
      <motion.div 
        className="absolute inset-0 mix-blend-overlay transition-colors duration-1000 ease-in-out"
        style={{ backgroundColor: atmosphericColor, opacity: isHeroVisible ? 0 : 1 }}
      />
      
      {/* Secondary Depth Shadow/Vignette for readability - removed to verify visibility */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030712]/30 transition-opacity duration-1000"
        style={{ opacity: isHeroVisible ? 0 : 1 }}
      />


    </div>
  );
}
