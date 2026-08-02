import React from 'react';
import { motion } from 'framer-motion';
import { FileText, BookOpen, Download, Code, Video, ArrowRight, Sparkles } from 'lucide-react';

const RESOURCES = [
  { icon: FileText, type: 'DOCUMENTATION', title: 'EWMIP Platform Administration Guide', desc: 'System architecture, RBAC configuration, and directorate deployment.' },
  { icon: BookOpen, type: 'POLICY GUIDE', title: 'ECA 2010 Automated Compliance Manual', desc: 'Step-by-step audit guidelines for regional compliance officers.' },
  { icon: Code, type: 'API REFERENCE', title: 'Federal IPPIS & HRMS Integration API', desc: 'REST & GraphQL developer endpoints for payroll data synchronization.' },
  { icon: Video, type: 'TRAINING', title: 'QRCode Node Onboarding Video Series', desc: 'Video walkthroughs for state directorate QR code kiosk setups.' },
];

export const ResourcesSection: React.FC = () => {
  return (
    <section id="resources" className="relative py-24 bg-[#040c16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold">
            <BookOpen className="w-3.5 h-3.5 text-[#00c878]" />
            <span>KNOWLEDGE & RESOURCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Documentation, Manuals & Case Studies
          </h2>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#071727] border border-[#122c48] hover:border-[#00c878]/40 transition-all duration-200 flex flex-col justify-between group hover:bg-[#0c2238]/60 space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#008751]/15 border border-[#008751]/30 flex items-center justify-center text-[#00c878] group-hover:scale-110 transition-transform">
                    <r.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#00c878] bg-[#008751]/15 px-2 py-0.5 rounded border border-[#008751]/30">
                    {r.type}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {r.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#122c48] flex items-center justify-between text-xs font-mono text-[#00c878] font-bold">
                <span className="flex items-center gap-1">Download PDF</span>
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
