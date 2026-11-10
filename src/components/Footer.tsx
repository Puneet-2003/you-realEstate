import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FooterProps {
  onContactClick: () => void;
  onExploreClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick, onExploreClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="relative bg-[#060608]/98 border-t border-white/10 text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Top CTA Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-10 sm:pb-14 border-b border-white/10">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-amber-200/90 block">
              Acquisition & Commissioning
            </span>
            <h3 className="font-syne text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              COMMISSION YOUR NEXT ARCHITECTURAL LANDMARK
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl leading-relaxed">
              We collaborate with visionary collectors and families to engineer spaces that defy convention and transcend generations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onContactClick}
              className="px-7 py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shadow-xl tracking-wider uppercase font-syne text-center active:scale-95"
            >
              Inquire Privately
            </button>
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-full text-xs font-semibold bg-transparent text-white border border-white/20 hover:border-white transition-colors cursor-pointer tracking-wider uppercase font-syne text-center active:scale-95"
            >
              Explore Portfolio
            </button>
          </div>
        </div>

        {/* Global Office Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-1 sm:space-y-2 p-4 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber-200/80">Zurich Atelier</p>
            <p className="text-sm text-white font-medium">Bahnhofstrasse 45</p>
            <p className="text-xs text-zinc-400">8001 Zurich, Switzerland</p>
            <p className="text-xs font-mono text-zinc-300 pt-1">+41 44 210 9980</p>
          </div>

          <div className="space-y-1 sm:space-y-2 p-4 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber-200/80">Côte d'Azur</p>
            <p className="text-sm text-white font-medium">Cap d'Antibes Sanctuary</p>
            <p className="text-xs text-zinc-400">06160 Antibes, France</p>
            <p className="text-xs font-mono text-zinc-300 pt-1">+33 4 93 61 40 22</p>
          </div>

          <div className="space-y-1 sm:space-y-2 p-4 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber-200/80">Tokyo Studio</p>
            <p className="text-sm text-white font-medium">Minato City, Roppongi 6-10</p>
            <p className="text-xs text-zinc-400">Tokyo 106-0032, Japan</p>
            <p className="text-xs font-mono text-zinc-300 pt-1">+81 3 5770 8200</p>
          </div>

          <div className="space-y-1 sm:space-y-2 p-4 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber-200/80">Aspen Gallery</p>
            <p className="text-sm text-white font-medium">East Cooper Avenue 420</p>
            <p className="text-xs text-zinc-400">Aspen, CO 81611, USA</p>
            <p className="text-xs font-mono text-zinc-300 pt-1">+1 (970) 925 3400</p>
          </div>
        </div>

        {/* Newsletter & Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-zinc-400">
            <span className="font-syne font-bold text-white tracking-widest text-sm">NOVARIS</span>
            <span>·</span>
            <span>© 2026 NOVARIS ESTATE. All Rights Reserved.</span>
          </div>

          {/* Confidential Dispatch Subscription */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto max-w-sm">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Join Off-Market Dispatch..."
              className="bg-[#121216] border border-white/10 rounded-full px-4 py-2.5 text-base sm:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors w-full"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shrink-0 active:scale-95"
            >
              {subscribed ? <Check className="w-4 h-4 text-emerald-600" /> : 'Subscribe'}
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};
