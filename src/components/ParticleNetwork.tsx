import { useEffect, useRef } from 'react';

// Color mappings for section atmospheres
const ATMOSPHERE_COLORS = {
  home: { r: 99, g: 102, b: 241 },         // Indigo
  about: { r: 99, g: 102, b: 241 },        // Indigo
  skills: { r: 99, g: 102, b: 241 },       // Indigo
  projects: { r: 6, g: 182, b: 212 },      // Cyan
  experience: { r: 99, g: 102, b: 241 },   // Indigo
  achievements: { r: 245, g: 158, b: 11 }, // Amber/Gold
  certificates: { r: 99, g: 102, b: 241 }, // Indigo
  'engineering-lab': { r: 16, g: 185, b: 129 }, // Emerald
  'proof-of-work': { r: 6, g: 182, b: 212 },   // Cyan
  contact: { r: 148, g: 163, b: 184 },    // Slate/Muted
};

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = 'rgba(99, 102, 241, 0.04)';
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const hasTouch = window.matchMedia('(pointer: coarse)').matches;

    // Particle nodes count (fewer on mobile for speed)
    const particleCount = hasTouch 
      ? Math.min(20, Math.floor((width * height) / 60000))
      : Math.min(50, Math.floor((width * height) / 32000));

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulsePhase: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (hasTouch ? 0.15 : 0.25),
        vy: (Math.random() - 0.5) * (hasTouch ? 0.15 : 0.25),
        radius: Math.random() * 1.5 + 0.5,
        pulsePhase: Math.random() * Math.PI,
        pulseSpeed: 0.015 + Math.random() * 0.02,
      });
    }

    // Scroll state tracking
    let currentRGB = { r: 99, g: 102, b: 241 }; // Default Indigo
    let targetRGB = { r: 99, g: 102, b: 241 };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollY / (docHeight || 1);

      // Simple intersection-ratio fallback mapping scroll position to sections
      if (scrollRatio < 0.18) {
        targetRGB = ATMOSPHERE_COLORS.home;
      } else if (scrollRatio < 0.38) {
        targetRGB = ATMOSPHERE_COLORS.projects;
      } else if (scrollRatio < 0.58) {
        targetRGB = ATMOSPHERE_COLORS['engineering-lab'] || ATMOSPHERE_COLORS.home;
      } else if (scrollRatio < 0.78) {
        targetRGB = ATMOSPHERE_COLORS.achievements;
      } else {
        targetRGB = ATMOSPHERE_COLORS.contact;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    if (!hasTouch) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    const draw = () => {
      // Interpolate colors smoothly
      currentRGB.r += (targetRGB.r - currentRGB.r) * 0.05;
      currentRGB.g += (targetRGB.g - currentRGB.g) * 0.05;
      currentRGB.b += (targetRGB.b - currentRGB.b) * 0.05;

      const r = Math.round(currentRGB.r);
      const g = Math.round(currentRGB.g);
      const b = Math.round(currentRGB.b);

      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.06;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect nearby nodes to mouse pointer (Desktop Only)
        if (!hasTouch && mouseRef.current.x !== -1000) {
          const mdx = p1.x - mouseRef.current.x;
          const mdy = p1.y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 140) {
            const malpha = (1 - mdist / 140) * 0.09;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${malpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Dynamic node pulsing size/opacity
        p.pulsePhase += p.pulseSpeed;
        const pulse = Math.sin(p.pulsePhase) * 0.35 + 0.65; // scale factor between 0.3 and 1.0

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (0.8 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.1 + pulse * 0.15})`;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off bounds
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (!hasTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}
