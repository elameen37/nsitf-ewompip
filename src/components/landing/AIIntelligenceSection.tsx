import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, BrainCircuit, ShieldAlert, LineChart, MessageSquare, Zap, Cpu } from 'lucide-react';

const AI_FEATURES = [
  {
    icon: Bot,
    title: 'Executive AI Copilot',
    desc: 'Ask natural language questions about staff attendance, ECA claims turnaround, or regional branch performance.',
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    desc: 'Forecast attendance bottlenecks and operational capacity across all 36 states up to 30 days in advance.',
  },
  {
    icon: ShieldAlert,
    title: 'Automated Anomaly & Risk Detection',
    desc: 'Flag proxy clock-ins, suspicious ECA claims submissions, or irregular overtime patterns automatically.',
  },
  {
    icon: BrainCircuit,
    title: 'Workforce Intelligence Forecasting',
    desc: 'Simulate regional staffing allocations to optimize workplace safety inspections and employer audits.',
  },
  {
    icon: MessageSquare,
    title: 'Natural Language Policy Query',
    desc: 'Instant synthesis of Federal Civil Service rules, ECA 2010 guidelines, and internal NSITF directives.',
  },
  {
    icon: Zap,
    title: 'Automated Executive Briefings',
    desc: 'Daily AI-generated intelligence summaries delivered directly to the Director-General and Executive Management.',
  },
];

export const AIIntelligenceSection: React.FC = () => {
  return (
    <section id="ai-intelligence" className="relative py-24 bg-gradient-to-b from-[#030a14] via-[#05111e] to-[#040c16] overflow-hidden">
      
      {/* Background Brain Mesh Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#008751]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold">
            <BrainCircuit className="w-3.5 h-3.5 text-[#00c878]" />
            <span>AI INTELLIGENCE SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Autonomous AI for{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c878] via-emerald-400 to-teal-300">
              National Workforce Oversight
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Powered by advanced machine learning models trained on NSITF operational workflows to deliver actionable executive clarity.
          </p>
        </div>

        {/* Neural Network Centerpiece Animation */}
        <div className="relative mb-16 p-8 rounded-3xl bg-[#061424]/90 border border-[#122c48] backdrop-blur-2xl shadow-2xl overflow-hidden text-center">
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#008751] to-[#00381e] p-1 flex items-center justify-center shadow-[0_0_40px_rgba(0,200,120,0.4)]">
              <Bot className="w-10 h-10 text-white animate-bounce" />
              <div className="absolute inset-0 rounded-full border-2 border-[#00c878] animate-ping opacity-30" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-mono">NSITF AI COPILOT ENGINE v3.4</h3>
              <p className="text-xs text-emerald-400 font-mono mt-1">Streaming real-time telemetry from 20,000+ staff nodes</p>
            </div>
          </div>
        </div>

        {/* 6 AI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_FEATURES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#071727] border border-[#122c48] hover:border-[#00c878]/40 transition-all duration-300 space-y-3 group hover:bg-[#0c2238]/60"
            >
              <div className="w-10 h-10 rounded-xl bg-[#008751]/15 border border-[#008751]/30 flex items-center justify-center text-[#00c878] group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
