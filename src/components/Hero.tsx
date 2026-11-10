import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onViewProjects: () => void;
  onOpenFeatured: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewProjects, onOpenFeatured }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-transparent select-none"
    >
      {/* Ambient Lighting & Architectural Scrims for Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle glowing architectural light simulation */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[220px] sm:h-[350px] rounded-full pointer-events-none" 
          style={{ background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%)' }} 
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-[280px] sm:w-[500px] h-[180px] sm:h-[250px] rounded-full pointer-events-none" 
          style={{ background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.07) 0%, transparent 70%)' }} 
        />
        
        {/* Subtle Vignettes & Architectural Scrims for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040404]/85 via-black/25 to-black/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-36 sm:h-44 bg-gradient-to-b from-black/85 to-transparent pointer-events-none" />
      </div>

      {/* Top Header Region Metadata */}
      <div className="relative z-10 pt-20 sm:pt-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4">
        {/* Left Tag */}
        <div className="space-y-0.5 text-zinc-300">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-amber-200/90">
            Super-architectural
          </p>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase">
            REAL ESTATE
          </p>
          <p className="text-[10px] sm:text-xs text-zinc-400 font-light tracking-wide">
            for the modern world.
          </p>
        </div>

        {/* Right Slogan */}
        <div className="text-left sm:text-right space-y-0.5">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            Zurich · Aspen · Cap d'Antibes · Tokyo
          </p>
          <p className="text-[11px] sm:text-xs text-zinc-300 tracking-wide hidden sm:block">
            Refined Architectural Standards & Living
          </p>
        </div>
      </div>

      {/* Center Giant Title - NOVARIS ESTATE */}
      <div className="relative z-10 my-auto py-8 sm:py-12 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full text-center">
        <div className="inline-block max-w-full">
          <h1 className="font-syne text-[clamp(2.75rem,11.5vw,9.5rem)] font-extrabold uppercase tracking-tight text-white leading-[0.88] drop-shadow-2xl break-words">
            <span className="block tracking-[-0.04em]">
              N<span className="inline-block relative">O<span className="absolute -inset-1 rounded-full border border-white/20 animate-ping opacity-20 pointer-events-none" /></span>VARIS
            </span>
            <span className="block tracking-[0.02em] font-light text-zinc-100 mt-1 sm:mt-0">
              ESTATE
            </span>
          </h1>
        </div>
      </div>

      {/* Hero Bottom Bar: Floating Glass Card (Left) & Circular CTA (Right) */}
      <div className="relative z-10 pb-8 sm:pb-14 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-stretch md:items-end gap-5 sm:gap-8">
        
        {/* Bottom Left Floating Glass Card */}
        <div
          onClick={onOpenFeatured}
          className="glass-panel p-3 sm:p-4 rounded-2xl w-full md:max-w-md flex items-center gap-3.5 sm:gap-4 cursor-pointer group hover:bg-[#151518]/90 hover:border-white/30 transition-all duration-300 shadow-2xl active:scale-[0.99]"
        >
          {/* Thumbnail preview */}
          <div className="relative w-18 sm:w-24 h-16 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-zinc-900">
            <img
              src="/assets/images/hero_novaris_villa_1794323288845.jpg"
              alt="Homes from the Future preview"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/images/hero_novaris_villa_1794323288845.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Copy */}
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-syne text-xs sm:text-sm font-bold text-white tracking-tight leading-snug group-hover:text-amber-100 transition-colors truncate sm:whitespace-normal">
                Homes from the Future. Built for Today.
              </h3>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed line-clamp-2">
              Pioneering sustainable architectural design with cutting-edge engineering and timeless aesthetics.
            </p>
          </div>
        </div>

        {/* Bottom Right: Circular View Projects Action + Caption */}
        <div className="flex items-center justify-between sm:justify-end md:flex-col lg:flex-row md:items-start lg:items-end gap-4 sm:gap-5">
          {/* Caption */}
          <p className="text-[11px] sm:text-xs text-zinc-400 max-w-xs leading-relaxed text-left sm:text-right md:text-left lg:text-right">
            Where space, technology, and art become a lifestyle.
          </p>

          {/* Circular Button */}
          <button
            onClick={onViewProjects}
            className="group flex flex-col items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white transition-all duration-500 cursor-pointer shadow-2xl backdrop-blur-md shrink-0 active:scale-95"
            aria-label="Scroll to projects"
          >
            <span className="text-[9px] sm:text-xs font-medium tracking-wider uppercase mb-0.5 sm:mb-1">
              Projects
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-current flex items-center justify-center transition-transform duration-300 group-hover:translate-y-1">
              <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </button>
        </div>

      </div>

      {/* Decorative gradient transition to next section */}
      <div className="h-10 sm:h-12 w-full bg-gradient-to-b from-transparent to-[#040404] pointer-events-none" />
    </section>
  );
};
