import React from 'react';

export const BentoStats: React.FC = () => {
  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Card 1: 500+ Residences Built */}
        <div className="lg:col-span-4 bg-[#111114]/92 border border-white/10 hover:border-white/20 p-6 sm:p-10 rounded-2xl sm:rounded-3xl flex flex-col justify-between min-h-[180px] sm:min-h-[220px] transition-all duration-300 group shadow-xl">
          <div className="space-y-1 sm:space-y-2">
            <span className="font-syne text-4xl sm:text-6xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">
              500+
            </span>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-zinc-300 font-medium text-sm sm:text-base tracking-wide">
              Residences Built
            </p>
            <p className="text-zinc-400 text-xs mt-1 font-light leading-relaxed">
              Across 14 countries with zero structural compromises
            </p>
          </div>
        </div>

        {/* Card 3: 120+ Prime Locations */}
        <div className="lg:col-span-4 bg-[#111114]/92 border border-white/10 hover:border-white/20 p-6 sm:p-10 rounded-2xl sm:rounded-3xl flex flex-col justify-between min-h-[180px] sm:min-h-[220px] transition-all duration-300 group shadow-xl">
          <div className="space-y-1 sm:space-y-2">
            <span className="font-syne text-4xl sm:text-6xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">
              120+
            </span>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-zinc-300 font-medium text-sm sm:text-base tracking-wide">
              Prime Locations
            </p>
            <p className="text-zinc-400 text-xs mt-1 font-light leading-relaxed">
              Alpine peaks, Mediterranean coastlines & metropolitan centers
            </p>
          </div>
        </div>

        {/* Card 4: 96% Energy Efficiency */}
        <div className="lg:col-span-4 bg-[#111114]/92 border border-white/10 hover:border-white/20 p-6 sm:p-10 rounded-2xl sm:rounded-3xl flex flex-col justify-between min-h-[180px] sm:min-h-[220px] transition-all duration-300 group shadow-xl">
          <div className="space-y-1 sm:space-y-2">
            <span className="font-syne text-4xl sm:text-6xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">
              96%
            </span>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-zinc-300 font-medium text-sm sm:text-base tracking-wide">
              Energy Efficiency
            </p>
            <p className="text-zinc-400 text-xs mt-1 font-light leading-relaxed">
              Geothermal storage, micro-grid solar & thermodynamic insulation
            </p>
          </div>
        </div>

        {/* Card 2: Wide Panoramic Architectural Pavilion Photo */}
        <div className="lg:col-span-8 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 min-h-[240px] sm:min-h-[340px] group transition-all duration-500 shadow-2xl">
          <img
            src="/assets/images/futuristic_parametric_pavilion_1794323290253.jpg"
            alt="Futuristic parametric cultural pavilion and residence at dusk"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/src/assets/images/futuristic_parametric_pavilion_1794323290253.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-amber-200/90">
                Civic & Residential Landmark
              </span>
              <h4 className="font-syne text-base sm:text-xl font-bold text-white">
                Nova Parametric Pavilion
              </h4>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 shrink-0 ml-2">
              Tokyo // 2024
            </span>
          </div>
        </div>

        {/* Card 5: 24/7 Smart Home Support */}
        <div className="lg:col-span-4 bg-[#111114]/92 border border-white/10 hover:border-white/20 p-6 sm:p-10 rounded-2xl sm:rounded-3xl flex flex-col justify-between min-h-[240px] sm:min-h-[340px] transition-all duration-300 group shadow-xl">
          <div>
            <span className="font-syne text-4xl sm:text-6xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">
              24/7
            </span>
            <p className="text-zinc-300 font-medium text-sm sm:text-base tracking-wide mt-2 sm:mt-3">
              Smart Home Support
            </p>
          </div>
          
          <div className="pt-4 sm:pt-6 border-t border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Predictive HVAC</span>
              <span className="text-emerald-400 font-mono">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Perimeter Neural Net</span>
              <span className="text-emerald-400 font-mono">Secure</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Automated Shading</span>
              <span className="text-zinc-300 font-mono">Synced</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
