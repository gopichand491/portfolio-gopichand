import { useEffect, useRef, ReactNode } from 'react';
import { useAppStore } from '../store';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  threshold?: number;
}

export default function Section({ id, className = '', children, threshold = 0.5 }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const setActiveSection = useAppStore(state => state.setActiveSection);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, setActiveSection, threshold]);

  return (
    <section ref={ref} id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}
