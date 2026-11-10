import React from 'react';

interface ResidenceAuroraViewProps {
  onBackToNovaris: () => void;
  onInquire: () => void;
}

export const ResidenceAuroraView: React.FC<ResidenceAuroraViewProps> = ({ onBackToNovaris, onInquire }) => {
  return (
    <div className="min-h-screen bg-[#fcfbfa] text-[#1a1a1a] font-serif selection:bg-black selection:text-white transition-colors duration-500">
      {/* Top Bar for Aurora */}
      <header className="sticky top-0 z-40 bg-[#fcfbfa]/95 backdrop-blur-md border-b border-[#e8e5e0] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-xs tracking-widest uppercase font-sans">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onBackToNovaris}
            className="flex items-center gap-1 sm:gap-1.5 text-zinc-500 hover:text-black transition-colors font-medium cursor-pointer active:scale-95 text-[11px] sm:text-xs"
          >
            <span>← Novaris</span>
          </button>
          <span className="text-zinc-300">|</span>
          <span className="font-semibold text-black truncate max-w-[120px] sm:max-w-none">Residence AURORA</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[11px] text-zinc-600">
          <a href="#aurora-about" className="hover:text-black transition-colors">About</a>
          <a href="#aurora-residences" className="hover:text-black transition-colors">Residences</a>
          <a href="#aurora-amenities" className="hover:text-black transition-colors">Amenities</a>
          <a href="#aurora-contact" className="hover:text-black transition-colors">Contact</a>
        </nav>

        <button
          onClick={onInquire}
          className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#1c1c1e] hover:bg-black text-white text-[10px] sm:text-[11px] font-sans tracking-wider uppercase transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
        >
          Book Viewing ↗
        </button>
      </header>

      {/* Hero Section: High-rise Luxury Living */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden bg-[#181a20] text-white">
        {/* Editorial Sky Tower Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero_novaris_villa_1794323288845.jpg"
            alt="Residence Aurora Towers"
            className="w-full h-full object-cover filter brightness-[0.75]"
            onError={(e) => {
              e.currentTarget.src = '/src/assets/images/hero_novaris_villa_1794323288845.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14151a] via-black/30 to-black/50" />
        </div>

        {/* Top Tagline */}
        <div className="relative z-10 max-w-sm space-y-1 text-zinc-300 font-sans text-xs tracking-wider">
          <p className="uppercase text-amber-200 font-medium text-[11px] sm:text-xs">Aurora Residence — Frankfurt</p>
          <p className="text-zinc-300 text-[10px] sm:text-[11px] leading-relaxed">
            Your statement of elegance, privacy, and prestige in the city center.
          </p>
        </div>

        {/* Center Grand Typography */}
        <div className="relative z-10 my-auto py-8 sm:py-12 text-center max-w-4xl mx-auto space-y-2 sm:space-y-3">
          <p className="font-serif italic text-2xl sm:text-4xl text-amber-100/90 tracking-wide">
            Residence
          </p>
          <h1 className="font-sans text-4xl sm:text-7xl lg:text-8xl font-light tracking-[0.15em] uppercase text-white leading-none">
            AURORA
          </h1>
          <div className="pt-4 sm:pt-6">
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl text-zinc-200 uppercase tracking-widest font-normal">
              WHERE <span className="italic font-light lowercase text-amber-100">premium</span> LIVING MEETS TIMELESS COMFORT
            </h2>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-10 pt-6 sm:pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 text-[10px] sm:text-xs font-sans tracking-widest uppercase text-zinc-300">
          <span>Private Penthouses & Sky Duplexes</span>
          <span>Architect: Atelier von Sternberg</span>
          <span>Frankfurt am Main // 2026</span>
        </div>
      </section>

      {/* Editorial Section 2: WE DON'T JUST BUILD RESIDENCES */}
      <section id="aurora-about" className="py-16 sm:py-24 px-4 sm:px-14 lg:px-24 max-w-7xl mx-auto space-y-12 sm:space-y-20">
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-4">
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] text-zinc-400 uppercase">Advantages & Heritage</span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-wide text-zinc-900 leading-tight">
            WE DON'T JUST BUILD RESIDENCES
          </h2>
          <p className="font-serif text-xl sm:text-3xl md:text-4xl italic text-zinc-600 font-light">
            WE CREATE AURORA LIVING
          </p>
        </div>

        {/* Editorial Collage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Item 1: 24/7 Concierge */}
          <div className="space-y-3 sm:space-y-4 group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-200 border border-zinc-200 shadow-md">
              <img
                src="/assets/images/nebula_residence_interior_1794323290097.jpg"
                alt="Concierge Service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/nebula_residence_interior_1794323290097.jpg';
                }}
              />
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-4xl font-normal text-black italic">24/7</p>
              <h3 className="font-sans text-xs tracking-widest uppercase font-semibold text-zinc-800 mt-1">
                Concierge & Premium Services
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">
                Personalized access from delivery handling to private assistance — available anytime.
              </p>
            </div>
          </div>

          {/* Item 2: 15+ Cafes & Dining */}
          <div className="space-y-3 sm:space-y-4 group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-200 border border-zinc-200 shadow-md">
              <img
                src="/assets/images/modern_stepped_balconies_1794323289202.jpg"
                alt="Cafes and Dining"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/modern_stepped_balconies_1794323289202.jpg';
                }}
              />
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-4xl font-normal text-black italic">15+</p>
              <h3 className="font-sans text-xs tracking-widest uppercase font-semibold text-zinc-800 mt-1">
                Cafes & Fine Dining
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">
                Curated selection of bistros and high-end dining experiences within the private enclave.
              </p>
            </div>
          </div>

          {/* Item 3: 300+ Parking Spaces */}
          <div className="space-y-3 sm:space-y-4 group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-200 border border-zinc-200 shadow-md">
              <img
                src="/assets/images/nextgen_tech_residence_1794323290943.jpg"
                alt="Secure Parking"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/nextgen_tech_residence_1794323290943.jpg';
                }}
              />
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-4xl font-normal text-black italic">300+</p>
              <h3 className="font-sans text-xs tracking-widest uppercase font-semibold text-zinc-800 mt-1">
                Underground Parking Spaces
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">
                Secure private parking with high-speed EV charging for every residence.
              </p>
            </div>
          </div>

          {/* Item 4: 10 min to Center */}
          <div className="space-y-3 sm:space-y-4 group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-200 border border-zinc-200 shadow-md">
              <img
                src="/assets/images/futuristic_parametric_pavilion_1794323290253.jpg"
                alt="City Center Proximity"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/futuristic_parametric_pavilion_1794323290253.jpg';
                }}
              />
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-4xl font-normal text-black italic">10 min</p>
              <h3 className="font-sans text-xs tracking-widest uppercase font-semibold text-zinc-800 mt-1">
                To Frankfurt City Center
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">
                Direct access to the financial district, cultural institutions, and opera.
              </p>
            </div>
          </div>
        </div>

        {/* Aurora Footer CTA */}
        <div className="pt-8 sm:pt-12 text-center border-t border-zinc-200">
          <button
            onClick={onInquire}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-black text-white text-xs font-sans tracking-widest uppercase hover:bg-zinc-800 transition-colors cursor-pointer shadow-lg active:scale-95"
          >
            Schedule Private Presentation
          </button>
        </div>
      </section>
    </div>
  );
};
