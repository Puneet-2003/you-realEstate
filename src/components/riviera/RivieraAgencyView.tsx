import React, { useState } from 'react';
import { ArrowDownLeft } from 'lucide-react';

interface RivieraAgencyViewProps {
  onBackToNovaris: () => void;
  onInquire: () => void;
}

export const RivieraAgencyView: React.FC<RivieraAgencyViewProps> = ({ onBackToNovaris, onInquire }) => {
  const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'sell'>('buy');

  return (
    <div className="min-h-screen bg-[#07090d] text-white font-sans selection:bg-amber-200 selection:text-black">
      {/* Top Bar for French Riviera Agency */}
      <header className="sticky top-0 z-40 bg-[#07090d]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-xs tracking-widest uppercase">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onBackToNovaris}
            className="flex items-center gap-1 sm:gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer text-[11px] sm:text-xs active:scale-95"
          >
            <span>← Novaris</span>
          </button>
          <span className="text-zinc-600">|</span>
          <span className="font-semibold text-white tracking-wider truncate max-w-[120px] sm:max-w-none">MAGREY & SONS</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[11px] text-zinc-400 font-mono">
          <button onClick={() => setActiveTab('rent')} className={`cursor-pointer ${activeTab === 'rent' ? 'text-white font-semibold' : 'hover:text-white'}`}>Rent</button>
          <button onClick={() => setActiveTab('buy')} className={`cursor-pointer ${activeTab === 'buy' ? 'text-white font-semibold' : 'hover:text-white'}`}>Buy</button>
          <button onClick={() => setActiveTab('sell')} className={`cursor-pointer ${activeTab === 'sell' ? 'text-white font-semibold' : 'hover:text-white'}`}>Sell</button>
        </nav>

        <button
          onClick={onInquire}
          className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 hover:border-white text-white text-[10px] sm:text-[11px] tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap active:scale-95"
        >
          Contact Agency ↗
        </button>
      </header>

      {/* Hero with French Riviera Bastide & Swimming Pool */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden">
        {/* Background French Riviera Villa */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero_novaris_villa_1794323288845.jpg"
            alt="French Riviera Luxury Bastide"
            className="w-full h-full object-cover filter brightness-[0.78]"
            onError={(e) => {
              e.currentTarget.src = '/src/assets/images/hero_novaris_villa_1794323288845.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-black/40 to-black/60" />
        </div>

        {/* Top Micro Navigation */}
        <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
          <span className="truncate">French Riviera · Saint-Tropez · Cannes · Monaco</span>
          <span className="hidden sm:inline shrink-0 ml-4">50+ Years Distinction</span>
        </div>

        {/* Center Agency Headline */}
        <div className="relative z-10 my-auto py-8 sm:py-12 max-w-4xl space-y-6 sm:space-y-8">
          <div>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-amber-200">
              Exclusive Mediterranean Real Estate
            </span>
            <h1 className="font-syne text-3xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mt-1.5 sm:mt-2 leading-[0.95]">
              LUXURY REAL ESTATE AGENCY
            </h1>
          </div>

          {/* Interactive RENT / BUY / SELL Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
            <button
              onClick={() => {
                setActiveTab('rent');
                onInquire();
              }}
              className={`p-4 sm:p-6 rounded-2xl glass-panel text-left flex flex-col justify-between h-28 sm:h-36 transition-all cursor-pointer group hover:border-white/40 active:scale-98 ${
                activeTab === 'rent' ? 'ring-1 ring-white/50 bg-white/10' : ''
              }`}
            >
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase">Properties For Rent</span>
              <div className="flex items-center justify-between">
                <span className="font-syne text-lg sm:text-xl font-bold uppercase tracking-wide">RENT</span>
                <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 group-hover:scale-110 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('buy');
                onInquire();
              }}
              className={`p-4 sm:p-6 rounded-2xl glass-panel text-left flex flex-col justify-between h-28 sm:h-36 transition-all cursor-pointer group hover:border-white/40 active:scale-98 ${
                activeTab === 'buy' ? 'ring-1 ring-white/50 bg-white/10' : ''
              }`}
            >
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase">Properties For Sale</span>
              <div className="flex items-center justify-between">
                <span className="font-syne text-lg sm:text-xl font-bold uppercase tracking-wide">BUY</span>
                <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 group-hover:scale-110 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('sell');
                onInquire();
              }}
              className={`p-4 sm:p-6 rounded-2xl glass-panel text-left flex flex-col justify-between h-28 sm:h-36 transition-all cursor-pointer group hover:border-white/40 active:scale-98 ${
                activeTab === 'sell' ? 'ring-1 ring-white/50 bg-white/10' : ''
              }`}
            >
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase">Sell Your Property</span>
              <div className="flex items-center justify-between">
                <span className="font-syne text-lg sm:text-xl font-bold uppercase tracking-wide">SELL</span>
                <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 group-hover:scale-110 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Subtitle Paragraph */}
        <div className="relative z-10 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed font-light">
            Magrey & Sons is a real estate group that specializes in selling and renting luxury properties on the French Riviera for over 50 years.
          </p>

          <button
            onClick={onInquire}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors cursor-pointer shrink-0 text-center active:scale-95"
          >
            Read More ↗
          </button>
        </div>
      </section>
    </div>
  );
};
