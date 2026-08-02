import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Tablet, Smartphone, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const InteractivePreview: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#040c16] via-[#061424] to-[#030a14] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#00c878]" />
            <span>RESPONSIVE ENTERPRISE EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Designed for Desktop, Tablet & Field Operations
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Access real-time workforce telemetry seamlessly from any device, anywhere in Nigeria.
          </p>

          {/* Device Switcher Pills */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#081829] border border-[#122c48]">
            {[
              { id: 'desktop', label: 'Desktop HQ', icon: Laptop },
              { id: 'tablet', label: 'Tablet Directorate', icon: Tablet },
              { id: 'mobile', label: 'Mobile Field Officer', icon: Smartphone },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition ${
                  device === d.id
                    ? 'bg-[#00c878] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#0c2238]'
                }`}
              >
                <d.icon className="w-4 h-4" />
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Frame Preview */}
        <div className="flex justify-center items-center">
          <motion.div
            key={device}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`transition-all duration-300 rounded-3xl bg-[#071727] border border-[#143252] shadow-2xl p-4 overflow-hidden ${
              device === 'desktop'
                ? 'w-full max-w-5xl h-[420px]'
                : device === 'tablet'
                ? 'w-[640px] h-[400px]'
                : 'w-[320px] h-[520px]'
            }`}
          >
            <div className="w-full h-full rounded-2xl bg-[#040e19] border border-[#10273f] p-4 flex flex-col justify-between font-mono">
              <div className="flex items-center justify-between border-b border-[#122c48] pb-2">
                <span className="text-xs text-white font-bold uppercase">NSITF {device.toUpperCase()} MODE</span>
                <span className="text-[10px] text-[#00c878]">SYSTEM ONLINE</span>
              </div>
              <div className="flex-1 flex items-center justify-center text-center p-6 space-y-2">
                <div>
                  <ShieldCheck className="w-12 h-12 text-[#00c878] mx-auto mb-2" />
                  <div className="text-sm font-bold text-white">Encrypted Field Communication</div>
                  <div className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Optimized for low-latency bandwidth across all 36 States & FCT directorate networks.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
