import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<string>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Private Villa', 'Coastal Estate', 'Urban Landmark', 'Mountain Villa'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

  const handlePrev = () => {
    const nextIdx = activeIndex > 0 ? activeIndex - 1 : filteredProjects.length - 1;
    setActiveIndex(nextIdx);
    if (scrollContainerRef.current) {
      const scrollStep = window.innerWidth < 640 ? 300 : 420;
      scrollContainerRef.current.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    const nextIdx = activeIndex < filteredProjects.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(nextIdx);
    if (scrollContainerRef.current) {
      const scrollStep = window.innerWidth < 640 ? 300 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
    }
  };

  const scrollToCard = (idx: number) => {
    setActiveIndex(idx);
    if (scrollContainerRef.current) {
      const items = scrollContainerRef.current.children;
      if (items[idx]) {
        (items[idx] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <section id="projects" className="relative py-16 sm:py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full">
      {/* Top Header Row: Section Title + Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-10 border-b border-white/10">
        <div>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-amber-200/90 block mb-1">
            Global Portfolio
          </span>
          <h2 className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-tight sm:leading-none">
            FEATURED PROJECTS
          </h2>
        </div>

        <div className="text-zinc-400 text-xs sm:text-[13px] font-mono tracking-wider max-w-xs space-y-1">
          <p>Curated architectural masterpieces.</p>
          <p className="text-zinc-200">Engineered for private clients worldwide.</p>
        </div>
      </div>

      {/* Category Filter Tabs & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 sm:py-8">
        {/* Filter buttons - Smooth horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setActiveIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
                filter === cat
                  ? 'bg-white text-black font-semibold shadow-lg'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 hover:border-white bg-[#111114] hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md active:scale-95"
            aria-label="Previous Project"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 hover:border-white bg-[#111114] hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md active:scale-95"
            aria-label="Next Project"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Cards Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none no-scrollbar snap-x snap-mandatory touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredProjects.map((project, idx) => {
          const isCurrent = idx === activeIndex;

          return (
            <div
              key={project.id}
              onClick={() => {
                setActiveIndex(idx);
                onSelectProject(project);
              }}
              className={`snap-center shrink-0 cursor-pointer transition-all duration-500 rounded-2xl sm:rounded-3xl overflow-hidden border group relative active:scale-[0.99] ${
                isCurrent
                  ? 'w-[82vw] max-w-[340px] sm:w-[420px] md:w-[480px] border-white/40 ring-1 ring-white/20 shadow-2xl'
                  : 'w-[70vw] max-w-[280px] sm:w-[300px] md:w-[340px] border-white/10 opacity-75 hover:opacity-100'
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const fallback = project.image.replace('/assets/', '/src/assets/');
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 group-hover:from-black/80 transition-colors" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-300 bg-black/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 truncate max-w-[70%]">
                    {project.category}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-white/15 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-white group-hover:text-black transition-all shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] sm:text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-200" />
                    <span className="truncate">{project.location}</span>
                    <span className="mx-0.5">·</span>
                    <span className="font-mono">{project.year}</span>
                  </div>

                  <h3 className="font-syne text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-100 transition-colors">
                    {project.name}
                  </h3>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] sm:text-xs font-mono">
                    <span className="text-zinc-200 font-semibold">{project.price}</span>
                    <span className="text-zinc-400">{project.area}</span>
                  </div>

                  {/* Hover Prompt */}
                  <div className="pt-1.5 flex items-center gap-1 text-[11px] font-medium text-white/90 group-hover:text-white">
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 pt-2 sm:pt-4">
        {filteredProjects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToCard(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer p-0 ${
              idx === activeIndex ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
