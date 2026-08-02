import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, ShieldCheck, Activity, MapPin } from 'lucide-react';

const STATS = [
  {
    icon: MapPin,
    value: '36 + FCT',
    label: 'States Covered',
    desc: 'Complete nationwide geopolitical presence across all directorates',
    color: 'from-[#00c878] to-emerald-400',
  },
  {
    icon: Building2,
    value: '250+',
    label: 'Regional Offices',
    desc: 'Integrated state branches and regional command centers',
    color: 'from-emerald-400 to-[#16b8e8]',
  },
  {
    icon: Users,
    value: '20,000+',
    label: 'Synchronized Employees',
    desc: 'Live QR code clock-in streams & automated attendance tracking',
    color: 'from-[#16b8e8] to-blue-400',
  },
  {
    icon: Activity,
    value: '99.98%',
    label: 'Uptime Availability',
    desc: 'High-reliability infrastructure backed by redundant cloud SLAs',
    color: 'from-amber-400 to-emerald-400',
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'Government Compliant',
    desc: 'Aligned with Employee Compensation Act (ECA 2010) standards',
    color: 'from-[#00c878] to-[#008751]',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="relative py-12 bg-[#040c16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glassmorphic Container Panel */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#081829]/90 via-[#07192c]/95 to-[#081829]/90 border border-[#122c48] backdrop-blur-2xl shadow-[0_0_50px_rgba(0,135,81,0.1)] overflow-hidden">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-6 relative z-10">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col justify-between group p-3 rounded-2xl transition-all duration-200 hover:bg-[#0c2238]/60 border border-transparent hover:border-[#143252]"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#008751]/15 border border-[#008751]/30 flex items-center justify-center text-[#00c878] mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{stat.label}</div>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
