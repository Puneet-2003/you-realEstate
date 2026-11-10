import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, PhoneCall, Compass } from 'lucide-react';

interface NavbarProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExploreClick, onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Zero-overhead intersection observer
    const sections = ['home', 'about', 'projects', 'technology', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-6 pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-8 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-500 max-w-4xl w-full ${
            scrolled
              ? 'bg-[#0c0c0e]/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80'
              : 'bg-black/45 backdrop-blur-md border border-white/10 hover:border-white/20'
          }`}
        >
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('home');
            }}
            className="flex items-center gap-2 group cursor-pointer shrink-0 py-1"
          >
            <span className="font-syne text-xs sm:text-sm font-bold tracking-widest text-white/95 group-hover:text-white uppercase transition-colors">
              NOVARIS
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide text-zinc-300">
            <button
              onClick={() => scrollTo('home')}
              className={`transition-colors cursor-pointer hover:text-white py-1 ${
                activeSection === 'home' ? 'text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('about')}
              className={`transition-colors cursor-pointer hover:text-white py-1 ${
                activeSection === 'about' ? 'text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className={`transition-colors cursor-pointer hover:text-white py-1 ${
                activeSection === 'projects' ? 'text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('technology')}
              className={`transition-colors cursor-pointer hover:text-white py-1 ${
                activeSection === 'technology' ? 'text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              Technology
            </button>
            <button
              onClick={onContactClick}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer py-1"
            >
              Contact
            </button>
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onExploreClick}
              className="group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/10 hover:bg-white text-zinc-200 hover:text-black border border-white/20 hover:border-white transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95"
            >
              <span className="hidden sm:inline">Explore Homes</span>
              <span className="sm:hidden font-medium">Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -mr-1 text-zinc-300 hover:text-white active:scale-95 transition-transform cursor-pointer rounded-full hover:bg-white/10"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#070709]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto animate-in fade-in duration-200">
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="font-syne text-sm font-bold tracking-widest text-white uppercase">
                NOVARIS
              </span>
              <span className="text-[10px] font-mono uppercase text-amber-200/80 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded-full">
                Estate
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
              aria-label="Close Navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with generous touch targets (min 48px) */}
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <button
              onClick={() => scrollTo('home')}
              className={`w-full py-2 text-2xl font-syne tracking-wide transition-colors ${
                activeSection === 'home' ? 'text-amber-200 font-bold' : 'text-zinc-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('about')}
              className={`w-full py-2 text-2xl font-syne tracking-wide transition-colors ${
                activeSection === 'about' ? 'text-amber-200 font-bold' : 'text-zinc-300 hover:text-white'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className={`w-full py-2 text-2xl font-syne tracking-wide transition-colors ${
                activeSection === 'projects' ? 'text-amber-200 font-bold' : 'text-zinc-300 hover:text-white'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('technology')}
              className={`w-full py-2 text-2xl font-syne tracking-wide transition-colors ${
                activeSection === 'technology' ? 'text-amber-200 font-bold' : 'text-zinc-300 hover:text-white'
              }`}
            >
              Technology
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-2 text-2xl font-syne tracking-wide text-zinc-300 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Actions & Footer Info */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shadow-lg active:scale-98"
            >
              <span>Explore Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors active:scale-98"
            >
              <PhoneCall className="w-4 h-4 text-amber-200" />
              <span>Private Consultation</span>
            </button>

            <div className="text-center pt-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Zurich · Aspen · Cap d'Antibes · Tokyo
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
