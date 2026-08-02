import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, TrendingUp, Calendar, FileText, GraduationCap, ShieldCheck, GitBranch, CreditCard, Users, FileCheck2, BarChart3, Bot, Sparkles } from 'lucide-react';

const FEATURES = [
  { icon: QrCode, name: 'QRCode Clock-In', desc: 'QR code scanning & GPS geofencing' },
  { icon: TrendingUp, name: '360° Appraisals', desc: 'GL1-17 Civil Service OKRs' },
  { icon: Calendar, name: 'Leave Management', desc: 'Automated approval workflows' },
  { icon: FileText, name: 'Executive Reports', desc: 'Automated PDF & Excel generation' },
  { icon: GraduationCap, name: 'Staff Training LMS', desc: 'Skills tracking & certification' },
  { icon: ShieldCheck, name: 'ECA 2010 Compliance', desc: 'Automated audit trail enforcement' },
  { icon: GitBranch, name: 'Custom Workflows', desc: 'Multi-stage approval routing' },
  { icon: CreditCard, name: 'Payroll Sync', desc: 'IPPIS & Federal Remittance sync' },
  { icon: Users, name: 'HRMS Integration', desc: 'Centralized staff records' },
  { icon: FileCheck2, name: 'Claims Processing', desc: 'ECA benefit SLA tracking' },
  { icon: BarChart3, name: 'Real-time Analytics', desc: 'Live directorate heatmaps' },
  { icon: Bot, name: 'AI Copilot', desc: 'Natural language operational queries' },
];

export const PlatformFeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="relative py-24 bg-[#040c16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#00c878]" />
            <span>ENTERPRISE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Complete Suite of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c878] to-emerald-400">
              Workforce Tools
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Designed to meet every operational requirement of the Nigeria Social Insurance Trust Fund.
          </p>
        </div>

        {/* 12-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-[#071727] border border-[#122c48] hover:border-[#00c878]/40 transition-all duration-200 group hover:bg-[#0c2238]/80 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#008751]/15 border border-[#008751]/30 flex items-center justify-center text-[#00c878] mb-3 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
