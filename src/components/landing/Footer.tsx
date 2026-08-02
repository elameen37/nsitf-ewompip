import React from 'react';
import { ShieldCheck, Lock, Award, Building2, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onLaunchPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLaunchPortal }) => {
  return (
    <footer className="bg-[#020812] text-slate-400 border-t border-[#122c48] pt-16 pb-12 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Split Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#008751]/20 border border-[#008751]/40 flex items-center justify-center">
                <img src="/nsitf-logo.png" alt="NSITF Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <div className="text-base font-black text-white font-mono">NSITF</div>
                <div className="text-[10px] text-slate-400 font-mono">Nigeria Social Insurance Trust Fund</div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Nigeria Social Insurance Trust Fund (NSITF) — Enterprise Workforce Management & Performance Intelligence Platform (EWMIP).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-2.5 py-1 rounded bg-[#008751]/15 border border-[#008751]/30 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> ISO 27001 SECURE
              </div>
              <div className="px-2.5 py-1 rounded bg-[#008751]/15 border border-[#008751]/30 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> ECA 2010 COMPLIANT
              </div>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <div className="text-white font-bold font-mono uppercase text-[11px] tracking-wider">Platform</div>
            <ul className="space-y-2">
              <li><button onClick={onLaunchPortal} className="hover:text-emerald-300 transition">Portal Login</button></li>
              <li><a href="#platform" className="hover:text-emerald-300 transition">Executive Dashboard</a></li>
              <li><a href="#features" className="hover:text-emerald-300 transition">QRCode Clock-In</a></li>
              <li><a href="#ai-intelligence" className="hover:text-emerald-300 transition">AI Copilot Engine</a></li>
              <li><a href="#analytics" className="hover:text-emerald-300 transition">Predictive Analytics</a></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <div className="text-white font-bold font-mono uppercase text-[11px] tracking-wider">Solutions</div>
            <ul className="space-y-2">
              <li><a href="#solutions" className="hover:text-emerald-300 transition">360° PMS Appraisals</a></li>
              <li><a href="#solutions" className="hover:text-emerald-300 transition">Geofence Monitoring</a></li>
              <li><a href="#solutions" className="hover:text-emerald-300 transition">ECA Claims Turnaround</a></li>
              <li><a href="#solutions" className="hover:text-emerald-300 transition">State Directorate Sync</a></li>
              <li><a href="#solutions" className="hover:text-emerald-300 transition">IPPIS Payroll Export</a></li>
            </ul>
          </div>

          {/* Column 4: Governance & HQ */}
          <div className="space-y-3">
            <div className="text-white font-bold font-mono uppercase text-[11px] tracking-wider">Federal HQ Address</div>
            <p className="text-slate-400 leading-relaxed font-mono text-[11px]">
              NSITF Corporate Headquarters<br />
              Plot 794, Muhammadu Buhari Way,<br />
              Central Business District, Abuja, FCT Nigeria.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              Email: info@nsitf.gov.ng<br />
              Phone: +234 (0) 9 461 8000
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#122c48] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Nigeria Social Insurance Trust Fund (NSITF). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
            <a href="#compliance" className="hover:text-white transition">Government Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
