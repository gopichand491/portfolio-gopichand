import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Eye, Filter } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import Modal from './Modal';
import { CERTIFICATES } from '../data/achievements';

export default function Certificates() {
  const [preview, setPreview] = useState<typeof CERTIFICATES[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Extract all categories dynamically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    CERTIFICATES.forEach(c => {
      if (c.category) cats.add(c.category);
    });
    return Array.from(cats);
  }, []);

  // Filter certificates based on selected category
  const filteredCertificates = useMemo(() => {
    if (activeCategory === 'All') return CERTIFICATES;
    return CERTIFICATES.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <SectionWrapper
      id="certificates"
      eyebrow="Credentials"
      title="Certifications"
      subtitle="Verified professional development milestones and program participation"
    >
      <div className="space-y-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto border-b border-white/5 pb-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-2 uppercase tracking-wider font-semibold">
            <Filter size={12} />
            <span>Filter:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-accent/15 text-accent-light border border-accent/20'
                  : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
              }`}
              data-cursor="HOVER"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert) => (
              <motion.button
                layout
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setPreview(cert)}
                className="glass-card p-4 text-left group hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden"
                data-cursor="OPEN"
              >
                <div>
                  {/* Thumbnail Wrapper with Laser Scan sweep */}
                  <div className="relative w-full h-36 mb-4.5 rounded-lg overflow-hidden bg-dark-700/30 border border-white/5 select-none laser-scan-container">
                    
                    {/* Laser scanner animation overlays */}
                    <div className="laser-scan-overlay">
                      <div className="laser-scan-line" />
                    </div>

                    <img
                      src={cert.image}
                      alt={`${cert.title} — ${cert.issuer}`}
                      className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
                    
                    {/* Hover eye icon badge */}
                    <div className="absolute bottom-2.5 right-2.5 p-1.5 bg-black/70 rounded-md border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye size={12} className="text-white" />
                    </div>

                    {/* Category Label badge */}
                    {cert.category && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-black/70 text-slate-300 border border-white/5 rounded">
                        {cert.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Award size={15} className="text-accent-light mt-0.5 flex-shrink-0 group-hover:rotate-6 transition-transform" />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-accent-light transition-colors line-clamp-1 leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Preview Lightbox */}
      <Modal
        isOpen={!!preview}
        onClose={() => setPreview(null)}
        title={preview ? `${preview.title} — Issued by ${preview.issuer}` : ''}
        size="xl"
      >
        {preview && (
          <div className="flex flex-col items-center justify-center p-2">
            <img
              src={preview.image}
              alt={`${preview.title} — ${preview.issuer}`}
              className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl border border-white/5"
              loading="lazy"
            />
            <div className="mt-5 flex gap-3">
              <a
                href={preview.image}
                download
                className="px-4.5 py-2 text-xs font-semibold text-white bg-accent hover:bg-accent-light rounded-xl transition-all"
              >
                Download Credential File
              </a>
              <button
                onClick={() => setPreview(null)}
                className="px-4.5 py-2 text-xs font-semibold text-slate-400 hover:text-white border border-white/10 rounded-xl transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
}
