import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, TrendingUp, Sparkles, LayoutDashboard, Cpu, ShieldCheck, ArrowRight, Activity, Users, Database } from 'lucide-react';

const BENTO_ITEMS = [
  {
    id: 'attendance',
    title: 'QRCode Attendance & Geofencing',
    tagline: 'REAL-TIME VERIFICATION',
    desc: 'GPS-fenced facial recognition and multi-modal clock-in nodes operating across 250+ offices with 99.98% anti-spoofing accuracy.',
    icon: QrCode,
    size: 'col-span-1 lg:col-span-8',
    gradient: 'from-[#008751]/20 via-[#005c36]/10 to-transparent',
    borderColor: 'border-[#00c878]/30',
    stat: '99.98%',
    statLabel: 'QRCode Verification Accuracy',
  },
  {
    id: 'performance',
    title: 'Performance & OKR Alignment',
    tagline: '360° APPRAISAL CASCADE',
    desc: 'Goal tracking and continuous KPI evaluation mapped directly to Federal Civil Service GL1-GL17 career frameworks.',
    icon: TrendingUp,
    size: 'col-span-1 lg:col-span-4',
    gradient: 'from-blue-600/15 via-indigo-600/5 to-transparent',
    borderColor: 'border-blue-500/30',
    stat: 'GL 1-17',
    statLabel: 'Grade Level Support',
  },
  {
    id: 'ai-analytics',
    title: 'AI Anomaly Detection & Predictive Insights',
    tagline: 'MACHINE LEARNING ENGINE',
    desc: 'Detect attendance irregularities, predict ECA audit risk scores, and automate workforce forecasting in real time.',
    icon: Sparkles,
    size: 'col-span-1 lg:col-span-4',
    gradient: 'from-amber-500/15 via-orange-600/5 to-transparent',
    borderColor: 'border-amber-500/30',
    stat: '< 0.01%',
    statLabel: 'False Positive Anomaly Rate',
  },
  {
    id: 'intelligence',
    title: 'Executive Intelligence & Command Center',
    tagline: 'DIRECTOR GENERAL SUITE',
    desc: 'High-level executive telemetry for real-time nationwide operational oversight, attendance maps, and audit readiness.',
    icon: LayoutDashboard,
    size: 'col-span-1 lg:col-span-8',
    gradient: 'from-[#00c878]/15 via-emerald-600/5 to-transparent',
    borderColor: 'border-[#00c878]/40',
    stat: '24/7',
    statLabel: 'Live Federal Command Sync',
  },
];

export const SolutionsBento: React.FC = () => {
  return (
    <section id="solutions" className="relative py-24 bg-[#040c16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold">
            <Cpu className="w-3.5 h-3.5 text-[#00c878]" />
            <span>POWERFUL SOLUTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Built for High-Stakes{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c878] to-emerald-400">
              Government Operations
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Every module is engineered to provide maximum transparency, strict compliance, and institutional efficiency across NSITF.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {BENTO_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${item.size} group relative rounded-3xl bg-gradient-to-br ${item.gradient} bg-[#071727] border ${item.borderColor} p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:shadow-[0_0_40px_rgba(0,200,120,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden`}
            >
              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#008751]/20 border border-[#008751]/40 flex items-center justify-center text-[#00c878] group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#00c878] bg-[#008751]/15 px-3 py-1 rounded-full border border-[#008751]/30">
                    {item.tagline}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </div>

              {/* Card Bottom Stat Strip */}
              <div className="pt-8 mt-6 border-t border-[#122c48] flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black font-mono text-white">{item.stat}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.statLabel}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#0a1d30] border border-[#143252] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#008751] group-hover:border-[#00c878] transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
