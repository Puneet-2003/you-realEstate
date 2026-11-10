import React from 'react';
import { Layers } from 'lucide-react';

export type EditionType = 'novaris' | 'aurora' | 'riviera';

interface EditionSwitcherProps {
  currentEdition: EditionType;
  onChangeEdition: (edition: EditionType) => void;
}

export const EditionSwitcher: React.FC<EditionSwitcherProps> = ({ currentEdition, onChangeEdition }) => {
  return (
    <aside 
      aria-label="Reference screenshot edition switcher" 
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#121216]/92 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-sans max-w-[calc(100vw-1.5rem)]"
    >
      <div className="flex items-center gap-1.5 pl-2 pr-1 text-zinc-400 shrink-0">
        <Layers className="w-3.5 h-3.5 text-amber-200" />
        <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase hidden sm:inline">Editions:</span>
      </div>

      <button
        onClick={() => onChangeEdition('novaris')}
        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
          currentEdition === 'novaris'
            ? 'bg-white text-black font-semibold shadow-md'
            : 'text-zinc-300 hover:text-white hover:bg-white/10'
        }`}
      >
        Novaris
      </button>

      <button
        onClick={() => onChangeEdition('aurora')}
        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
          currentEdition === 'aurora'
            ? 'bg-white text-black font-semibold shadow-md'
            : 'text-zinc-300 hover:text-white hover:bg-white/10'
        }`}
      >
        Aurora
      </button>

      <button
        onClick={() => onChangeEdition('riviera')}
        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
          currentEdition === 'riviera'
            ? 'bg-white text-black font-semibold shadow-md'
            : 'text-zinc-300 hover:text-white hover:bg-white/10'
        }`}
      >
        Riviera
      </button>
    </aside>
  );
};
