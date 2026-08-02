import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Activity, Building2, CheckCircle2, Lock, Sparkles, Award } from 'lucide-react';
import { AnimatedNigeriaMap } from './AnimatedNigeriaMap';

interface HeroSectionProps {
  onLaunchPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchPortal }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#050e1a] via-[#061424] to-[#040c16]">
      
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#008751]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#00c878]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            {/* Enterprise Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold tracking-wide shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00c878] animate-pulse" />
              <span>NIGERIA SOCIAL INSURANCE TRUST FUND</span>
            </motion.div>

            {/* Main Powerful Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Smarter Workforce.{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c878] via-[#00a86b] to-emerald-400">
                  Stronger Performance.
                </span>{' '}
                Better Nigeria.
              </h1>
            </motion.div>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              The Enterprise Workforce Management & Performance Intelligence Platform (EWMIP) brings real-time QR code telemetry, AI analytics, and automated ECA compliance to all 36 States and FCT Abuja.
            </motion.p>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onLaunchPortal}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#008751] via-[#00a86b] to-[#00c878] text-slate-950 font-black text-sm transition-all duration-200 shadow-[0_0_35px_rgba(0,200,120,0.4)] hover:shadow-[0_0_50px_rgba(0,200,120,0.6)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-3 border border-white/20"
              >
                <ShieldCheck className="w-5 h-5 text-slate-950" />
                <span>Launch Enterprise Portal</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => scrollToSection('platform')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#081829] hover:bg-[#10273f] text-slate-200 hover:text-white text-sm font-bold border border-[#122c48] hover:border-[#00c878]/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Platform Capabilities</span>
              </button>
            </motion.div>

            {/* Government Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-[#122c48]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono"
            >
              {[
                { icon: ShieldCheck, title: 'ISO 27001', desc: 'Data Security Standard' },
                { icon: Lock, title: 'Federal Ready', desc: 'ECA 2010 Compliant' },
                { icon: Activity, title: '99.98% SLA', desc: 'High Availability' },
                { icon: Building2, title: '36 + FCT', desc: 'Nationwide Directorates' },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#008751]/15 border border-[#008751]/30 flex items-center justify-center text-[#00c878] flex-shrink-0">
                    <badge.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">{badge.title}</div>
                    <div className="text-[10px] text-slate-400 leading-none mt-0.5">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Redesigned Interactive Nigeria Vector Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <AnimatedNigeriaMap />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
