import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Building2, PhoneCall } from 'lucide-react';

interface CtaBannerProps {
  onLaunchPortal: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onLaunchPortal }) => {
  return (
    <section id="contact" className="relative py-20 bg-[#030a14] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Glass Container */}
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#008751]/30 via-[#061e33] to-[#008751]/30 border border-[#00c878]/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,200,120,0.2)] text-center space-y-8 overflow-hidden">
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00c878]/20 border border-[#00c878]/40 text-[#00c878] text-xs font-mono font-black uppercase">
              <ShieldCheck className="w-4 h-4" />
              FEDERAL ENTERPRISE DEPLOYMENT READY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Ready to Transform NSITF Workforce Operations?
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              Access the live Enterprise Workforce Management & Performance Intelligence Platform or schedule a briefing with Executive Directorate Leadership.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchPortal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00c878] to-[#008751] text-slate-950 font-black text-sm transition-all duration-200 shadow-[0_0_35px_rgba(0,200,120,0.5)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 border border-white/30"
            >
              <ShieldCheck className="w-5 h-5 text-slate-950" />
              <span>Launch Portal Dashboard</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => window.open('mailto:info@nsitf.gov.ng')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#081829] hover:bg-[#10273f] text-slate-200 hover:text-white text-sm font-bold border border-[#122c48] transition-all flex items-center justify-center gap-2 font-mono"
            >
              <PhoneCall className="w-4 h-4 text-[#00c878]" />
              <span>Contact Federal HQ</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
