import React, { useEffect } from 'react';
import { X, MapPin, CheckCircle, ChevronRight } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  // Lock body scroll while modal is active
  useEffect(() => {
    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92dvh] overflow-y-auto bg-[#0d0d10] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl text-white scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/75 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Hero Image Showcase */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden bg-black">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const fallback = project.image.replace('/assets/', '/src/assets/');
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-amber-200 bg-black/70 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10">
                {project.category}
              </span>
              <h2 className="font-syne text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1.5 sm:mt-2">
                {project.name}
              </h2>
              <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-300 text-xs sm:text-sm mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-200" />
                <span>{project.location}</span>
                <span>·</span>
                <span className="font-mono">{project.year}</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] sm:text-xs text-zinc-400 font-mono uppercase block">Estimated Value</span>
              <span className="font-syne text-xl sm:text-3xl font-bold text-white">{project.price}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
          {/* Key Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#141418] border border-white/5">
            <div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase">Living Space</p>
              <p className="text-sm sm:text-lg font-bold text-white font-mono mt-0.5">{project.area}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase">Suites / Baths</p>
              <p className="text-sm sm:text-lg font-bold text-white font-mono mt-0.5">{project.bedrooms} / {project.bathrooms}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase">Architect</p>
              <p className="text-xs sm:text-base font-semibold text-white truncate mt-0.5">{project.architect}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase">Status</p>
              <p className="text-xs sm:text-base font-semibold text-emerald-400 mt-0.5">Private Acquisition</p>
            </div>
          </div>

          {/* Architectural Description */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-syne text-base sm:text-lg font-bold text-white uppercase tracking-wide">
              Architectural Vision
            </h3>
            <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Key Features & Specifications Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
            {/* Features */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400">
                Signature Amenities & Features
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-amber-200/80 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400">
                Technical Specifications
              </h4>
              <div className="divide-y divide-white/5 rounded-xl sm:rounded-2xl bg-[#141418] border border-white/5 p-3.5 sm:p-4">
                {project.specs.map((spec, i) => (
                  <div key={i} className="py-2 sm:py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-400">{spec.label}</span>
                    <span className="font-mono text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="text-[11px] sm:text-xs text-zinc-400">
              Private showings strictly accompanied by senior architectural partner.
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 transition-colors cursor-pointer text-center"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onInquire(project.name);
                }}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
              >
                <span>Request Private Viewing</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
