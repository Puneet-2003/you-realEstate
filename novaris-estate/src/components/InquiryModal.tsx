import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Shield, Clock } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, initialProject }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: initialProject || 'Novaris Portfolio General',
    budget: '$25M - $50M',
    timeframe: 'Immediate (Within 30 Days)',
    notes: ''
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto bg-[#0e0e12] border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl text-white scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-black/60 hover:bg-white text-zinc-400 hover:text-black border border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 border border-white/30 text-amber-200 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400">
                Inquiry Logged // Reference #NV-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h3 className="font-syne text-xl sm:text-3xl font-bold text-white">
                Private Viewing Requested
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name || 'Client'}</span>. An architectural principal will contact you securely at <span className="text-white font-mono break-all">{formData.email}</span> within 4 hours to arrange your confidential consultation.
              </p>
            </div>

            <div className="pt-2 sm:pt-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer uppercase tracking-wider font-syne active:scale-95"
              >
                Return to Novaris Estate
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-200/90 block">
                Confidential Client Services
              </span>
              <h3 className="font-syne text-xl sm:text-3xl font-bold text-white mt-1">
                Schedule Private Viewing
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1">
                Direct access to off-market architectural acquisitions and custom commissions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Victoria Sterling"
                    className="w-full bg-[#16161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="v.sterling@domain.ch"
                    className="w-full bg-[#16161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Phone / Signal *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+41 22 555 0192"
                    className="w-full bg-[#16161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Residence of Interest
                  </label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="Novaris Horizon or Nebula"
                    className="w-full bg-[#16161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Investment Parameter
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#16161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-white/40 transition-colors cursor-pointer"
                  >
                    <option value="$15M - $25M">$15M - $25M</option>
                    <option value="$25M - $50M">$25M - $50M</option>
                    <option value="$50M+">$50M+ (Bespoke Commission)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Preferred Timeframe
                  </label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full bg-[#16161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-white/40 transition-colors cursor-pointer"
                  >
                    <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                    <option value="Q3/Q4 2026">Q3/Q4 2026</option>
                    <option value="Future Development">Future Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Private Architectural Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify particular site requirements, helipad needs, or private security parameters..."
                  className="w-full bg-[#16161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] sm:text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-200" />
                  <span>Strict NDA & encrypted transmission</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Under 4h reply</span>
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg tracking-wider uppercase font-syne active:scale-95"
                >
                  Submit Confidential Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
