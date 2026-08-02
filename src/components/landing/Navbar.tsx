import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronRight, Menu, X, ArrowUpRight, Sparkles, Building2 } from 'lucide-react';

interface NavbarProps {
  onLaunchPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunchPortal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050e1a]/85 backdrop-blur-xl border-b border-[#122c48]/80 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Identifier */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#008751] to-[#00381e] p-0.5 shadow-[0_0_20px_rgba(0,200,120,0.3)] flex items-center justify-center border border-[#00c878]/30">
              <img
                src="/nsitf-logo.png"
                alt="NSITF Logo"
                className="w-full h-full object-contain p-0.5 rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-white tracking-wider font-mono">NSITF</span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-extrabold uppercase bg-[#00c878]/15 text-[#00c878] border border-[#00c878]/30 rounded">
                  GOV.NG
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Workforce Intelligence Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#081829]/70 border border-[#122c48] backdrop-blur-md shadow-inner">
            {[
              { id: 'platform', label: 'Platform' },
              { id: 'solutions', label: 'Solutions' },
              { id: 'features', label: 'Features' },
              { id: 'ai-intelligence', label: 'AI Engine' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'why-nsitf', label: 'Why NSITF' },
              { id: 'resources', label: 'Resources' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#10273f]/60 rounded-full transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1 font-mono"
            >
              Contact HQ
            </button>

            <button
              onClick={onLaunchPortal}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-[#008751] via-[#00a86b] to-[#00c878] text-slate-950 font-black text-xs transition-all shadow-[0_0_25px_rgba(0,200,120,0.35)] hover:shadow-[0_0_35px_rgba(0,200,120,0.5)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 border border-white/20"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>NSITF Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onLaunchPortal}
              className="px-3 py-1.5 rounded-lg bg-[#00c878] text-slate-950 font-bold text-xs shadow-md"
            >
              Portal
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-[#081829] border border-[#122c48] text-slate-300 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#050e1a]/95 backdrop-blur-2xl border-b border-[#122c48] px-6 py-6 space-y-4 animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-2">
            {[
              { id: 'platform', label: 'Platform' },
              { id: 'solutions', label: 'Solutions' },
              { id: 'features', label: 'Features' },
              { id: 'ai-intelligence', label: 'AI Engine' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'why-nsitf', label: 'Why NSITF' },
              { id: 'resources', label: 'Resources' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-[#081829] border border-transparent hover:border-[#122c48] transition"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-[#122c48] flex flex-col gap-3">
            <button
              onClick={onLaunchPortal}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#008751] to-[#00c878] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" />
              Launch Enterprise Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
