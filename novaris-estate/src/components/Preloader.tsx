import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Decoupled custom event listeners: Prevents re-rendering the parent App component
    const handleProgress = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      const pct = customEvent.detail || 0;
      setProgress(pct);
      if (pct >= 100) {
        setFading(true);
        setTimeout(() => setVisible(false), 500);
      }
    };

    const handleReady = () => {
      setProgress(100);
      setFading(true);
      setTimeout(() => setVisible(false), 500);
    };

    window.addEventListener('novaris:progress', handleProgress);
    window.addEventListener('novaris:ready', handleReady);

    // Failsafe timer so users are never blocked on slow connections
    const failsafe = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 400);
    }, 2200);

    return () => {
      window.removeEventListener('novaris:progress', handleProgress);
      window.removeEventListener('novaris:ready', handleReady);
      clearTimeout(failsafe);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050507] text-white transition-opacity duration-700 ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient glowing backdrop */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%)' }} 
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full space-y-6">
        {/* Brand Monogram */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <span className="font-syne text-xl sm:text-2xl font-extrabold tracking-[0.25em] text-white uppercase">
              NOVARIS
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-200/80">
            Super-Architectural Estate
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2.5 pt-4">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-200 via-white to-amber-100 transition-all duration-200 ease-out"
              style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
            />
          </div>

          {/* Telemetry line */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-400">
            <span>PRE-RENDERING 3D SCENE</span>
            <span className="text-white font-semibold">{Math.min(100, Math.round(progress))}%</span>
          </div>
        </div>

        {/* Footnote caption */}
        <p className="text-[11px] text-zinc-500 font-light tracking-wide pt-2">
          Buffering high-fidelity spatial frames for 60fps scroll...
        </p>
      </div>
    </div>
  );
};
