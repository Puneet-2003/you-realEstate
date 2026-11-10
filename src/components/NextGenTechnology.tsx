import React, { useState } from 'react';
import { Cpu, ShieldCheck, SunMedium, Wind, VolumeX } from 'lucide-react';

export const NextGenTechnology: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const techFeatures = [
    {
      id: 'climate',
      icon: Wind,
      title: 'Geothermal & Atmospheric Purity',
      tagline: 'Precision micro-climate with medical-grade HEPA & negative ion generation',
      description: 'Underfloor thermodynamic radiant slabs draw constant 12°C geothermal energy from 180m subterranean boreholes. Continuous positive-pressure filtration exchanges 100% of internal air volume every 42 minutes.',
      metrics: [
        { label: 'Air Purity Rating', val: 'AQI < 5 Constant' },
        { label: 'Energy Savings', val: '-74% vs Conventional' },
        { label: 'Humidity Balance', val: '45-50% Auto-Regulated' }
      ]
    },
    {
      id: 'glazing',
      icon: SunMedium,
      title: 'Kinetic Electrochromic Glazing',
      tagline: 'Autonomous solar heat gain rejection with zero glare',
      description: 'Triple-laminated smart glass shifts opacity and solar heat gain coefficient (SHGC) dynamically depending on real-time solar vector algorithms, preserving pristine daylight without needing blinds.',
      metrics: [
        { label: 'UV Rejection', val: '99.9% Shielded' },
        { label: 'Solar Heat Gain', val: '0.12 SHGC Peak' },
        { label: 'Dynamic Response', val: '< 90s Transition' }
      ]
    },
    {
      id: 'security',
      icon: ShieldCheck,
      title: 'Autonomous Perimeter Neural Net',
      tagline: 'Zero-touch biometric authentication with decentralized encrypted storage',
      description: 'Sub-millimeter optical facial & lidar gait verification automatically prepares entry vestibules, unlocks biometric portals, and disarms security layers without keycards or mobile prompts.',
      metrics: [
        { label: 'Latency', val: '< 180ms Recognition' },
        { label: 'Data Sovereignty', val: '100% Air-gapped' },
        { label: 'False Acceptance', val: '1 in 10,000,000' }
      ]
    },
    {
      id: 'acoustics',
      icon: VolumeX,
      title: 'Acoustic Decoupling & Spatial Sound',
      tagline: 'Floating slab construction eliminating airborne and vibrational resonance',
      description: 'Every master suite and cinema is mechanically decoupled using elastomeric isolation pads, delivering a pristine ambient noise threshold below NC-15 (whisper-quiet).',
      metrics: [
        { label: 'Sound Isolation', val: 'STC 68 Rating' },
        { label: 'Background Noise', val: '< 18 dB Floor' },
        { label: 'Architectural Sync', val: 'Invisible Transducers' }
      ]
    }
  ];

  return (
    <section id="technology" className="relative py-16 sm:py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-16 border-b border-white/10">
        <div>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-amber-200/90 block mb-1">
            Engineering & Infrastructure
          </span>
          <h2 className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-tight sm:leading-none">
            BUILT WITH NEXT-GEN TECHNOLOGY
          </h2>
        </div>

        <div className="text-zinc-400 text-xs sm:text-[13px] font-mono tracking-wider max-w-xs space-y-1">
          <p>The synthesis of architecture and advanced</p>
          <p className="text-zinc-200">intelligence creates a responsive ecosystem.</p>
        </div>
      </div>

      {/* Main Interactive Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pt-8 sm:pt-12 items-stretch">
        
        {/* Left Side: Tech Architecture Image Card */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 flex-1 min-h-[280px] sm:min-h-[440px] group shadow-2xl">
            <img
              src="/assets/images/nextgen_tech_residence_1794323290943.jpg"
              alt="High-tech modern architectural residence with integrated illuminated features"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/images/nextgen_tech_residence_1794323290943.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Bottom floating telemetry pill */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-300 flex items-center gap-1.5 sm:gap-2">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
                  <span className="text-[11px] sm:text-xs">Central Core OS // v4.2</span>
                </span>
                <span className="text-emerald-400 font-mono text-[10px] sm:text-[11px] bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Integrated
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] text-zinc-400 mt-1.5 line-clamp-2">
                Unified ambient automation orchestrating heating, natural airflow, daylight filtering, and sound isolation.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Technology Pillars */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-4">
          {techFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const isSelected = activeTab === idx;

            return (
              <div
                key={feat.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-[0.99] ${
                  isSelected
                    ? 'bg-[#121216]/95 border-white/30 shadow-xl'
                    : 'bg-[#0b0b0e]/90 border-white/10 hover:border-white/20 hover:bg-[#0e0e12]/95'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-2.5 rounded-xl border shrink-0 transition-colors ${
                    isSelected 
                      ? 'bg-white text-black border-white' 
                      : 'bg-zinc-900 text-zinc-400 border-white/10'
                  }`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-syne text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {feat.tagline}
                    </p>
                  </div>
                </div>

                {/* Expanded Details when Selected */}
                {isSelected && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 space-y-3 sm:space-y-4 animate-in fade-in duration-300">
                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                      {feat.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
                      {feat.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="bg-black/50 p-2 sm:p-2.5 rounded-xl border border-white/5">
                          <p className="text-[10px] text-zinc-400 uppercase font-mono">{m.label}</p>
                          <p className="text-xs font-bold text-white font-mono mt-0.5">{m.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
