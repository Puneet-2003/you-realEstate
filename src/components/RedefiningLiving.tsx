import React from 'react';

export const RedefiningLiving: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full">
      {/* Top Header Row: Section Title + Architectural Micro-text */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-16 border-b border-white/10">
        <div>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-amber-200/90 block mb-1">
            Design Philosophy
          </span>
          <h2 className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-tight sm:leading-none">
            REDEFINING MODERN LIVING
          </h2>
        </div>

        <div className="text-zinc-400 text-xs sm:text-[13px] font-mono tracking-wider max-w-xs space-y-1">
          <p>New architectural landmark in</p>
          <p>residential engineering. Designed for</p>
          <p className="text-zinc-200">discerning individuals.</p>
        </div>
      </div>

      {/* Main Content Split: Manifesto Text + Architectural Stepped Balcony Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-8 sm:pt-16 items-center">
        {/* Left: Statement Paragraph with High-Contrast Bold Highlights */}
        <div className="lg:col-span-8 space-y-6">
          <p className="font-syne text-xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.35] text-zinc-500 font-normal">
            <span className="text-white font-bold">We believe</span> the future{' '}
            <span className="text-white font-bold">of living is defined by</span>{' '}
            more than{' '}
            <span className="text-white font-bold">architecture alone.</span> It
            is the{' '}
            <span className="text-white font-bold">seamless connection</span> between{' '}
            <span className="text-white font-bold">design, functionality, and</span> the{' '}
            <span className="text-white font-bold">people</span> who{' '}
            <span className="text-white font-bold">inhabit these spaces.</span>
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs text-zinc-400 font-mono">
            <span>// FORM FOLLOWS HUMAN NATURE</span>
            <span className="hidden sm:inline">·</span>
            <span>SUSTAINABILITY INDEX 99.4%</span>
          </div>
        </div>

        {/* Right: Modern Stepped Residential Balconies Photo Card */}
        <div className="lg:col-span-4">
          <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-500 hover:border-white/25">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src="/assets/images/modern_stepped_balconies_1794323289202.jpg"
                alt="Modern stepped geometric residential balconies with hanging greenery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/modern_stepped_balconies_1794323289202.jpg';
                }}
              />
            </div>
            <div className="p-3.5 sm:p-4 bg-[#0a0a0c]/95 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-300">Biophilic Cantilever Design</span>
              <span className="font-mono text-zinc-500 text-[11px]">Cap d'Antibes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
