import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Lock, Sparkles, Building2, Cpu, Globe, CheckCircle2 } from 'lucide-react';

const PILLARS = [
  {
    icon: Award,
    title: 'Federal Civil Service Mandate',
    desc: 'Empowering NSITF to execute its statutory mandate under the Employee Compensation Act (ECA 2010) with total digital transparency.',
  },
  {
    icon: Globe,
    title: '36 States + FCT Coverage',
    desc: 'Unifying over 20,000 personnel and 250+ offices under a single high-availability cloud architecture.',
  },
  {
    icon: Lock,
    title: 'Military-Grade Security & ISO 27001',
    desc: 'End-to-end encrypted QR code telemetry and RBAC access controls compliant with NITDA data sovereignty regulations.',
  },
  {
    icon: Cpu,
    title: 'Pioneering AI Adoption',
    desc: 'First Nigerian public sector institution leveraging predictive machine learning models for workforce performance optimization.',
  },
];

export const WhyNSITF: React.FC = () => {
  return (
    <section id="why-nsitf" className="relative py-24 bg-[#040c16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00c878]" />
            <span>TRANSFORMATION LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Why NSITF is Leading Digital Governance in Africa
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Setting the benchmark for public sector workforce intelligence, accountability, and institutional excellence.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#071727] border border-[#122c48] hover:border-[#00c878]/40 transition-all duration-300 flex items-start gap-6 group hover:bg-[#0c2238]/60"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#008751]/20 border border-[#008751]/40 flex items-center justify-center text-[#00c878] group-hover:scale-110 transition-transform flex-shrink-0">
                <item.icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
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
