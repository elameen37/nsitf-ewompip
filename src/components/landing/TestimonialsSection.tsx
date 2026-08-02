import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Building2, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "The EWMIP platform has revolutionized how NSITF monitors staff attendance and ECA claims compliance across our regional directorates. Real-time QR code telemetry gives us unprecedented operational transparency.",
    author: "Executive Management Directorate",
    role: "Federal Civil Service Leadership",
    location: "Abuja HQ",
  },
  {
    quote: "With over 980 personnel under Lagos Directorate, automated geofenced clock-in has eliminated proxy attendance and improved our ECA claims turnaround SLA by 34%.",
    author: "Regional Director",
    role: "South-West Geopolitical Zone",
    location: "Lagos Regional Office",
  },
  {
    quote: "The AI Anomaly Detection engine identifies compliance risks before they escalate, ensuring strict adherence to civil service guidelines and fiscal accountability.",
    author: "State Director",
    role: "North-West Directorate",
    location: "Kano State Office",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#030a14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold">
            <Quote className="w-3.5 h-3.5 text-[#00c878]" />
            <span>EXECUTIVE ENDORSEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Trusted Across All Geopolitical Zones
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#071727] border border-[#122c48] flex flex-col justify-between space-y-6 hover:border-[#00c878]/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-emerald-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#122c48] flex items-center justify-between font-mono">
                <div>
                  <div className="text-sm font-bold text-white">{t.author}</div>
                  <div className="text-[10px] text-slate-400">{t.role}</div>
                </div>
                <span className="text-[9px] font-bold text-[#00c878] bg-[#008751]/20 px-2 py-0.5 rounded border border-[#008751]/30">
                  {t.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
