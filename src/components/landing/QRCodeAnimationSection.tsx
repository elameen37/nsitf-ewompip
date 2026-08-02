import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Smartphone, CheckCircle2, Shield, Wifi, MapPin, Clock, Zap, Sparkles, ScanLine, ArrowRight } from 'lucide-react';

/* ─── Animated QR grid pattern (purely CSS-driven) ─── */
const QR_PATTERN = [
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,0,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
  [1,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,0,1,1],
  [0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0],
  [1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1],
  [0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,1,1,0,0,1,0],
  [1,1,1,1,1,1,1,0,1,0,0,1,1,0,1,0,1,0,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,1,0,1,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0],
  [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1,1,0],
  [1,0,0,0,0,0,1,0,1,1,0,0,0,1,0,1,1,0,0,1,0],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1,1],
];

/* ─── Clock-in workflow steps ─── */
const STEPS = [
  { icon: Smartphone, label: 'Open NSITF App', sub: 'Staff launches mobile application' },
  { icon: QrCode, label: 'Scan QR Code', sub: 'Point camera at office QR terminal' },
  { icon: MapPin, label: 'GPS Verified', sub: 'Location validated within geofence' },
  { icon: CheckCircle2, label: 'Clock-In Confirmed', sub: 'Real-time sync to HQ dashboard' },
];

export const QRCodeAnimationSection: React.FC = () => {
  const [scanLine, setScanLine] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  /* Scan-line animation loop */
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((p) => (p >= 100 ? 0 : p + 1.5));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  /* Step-by-step workflow auto-advance */
  useEffect(() => {
    const t = setInterval(() => {
      setActiveStep((p) => (p + 1) % STEPS.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="qrcode-clockin" className="relative py-28 bg-gradient-to-b from-[#030a14] via-[#04111e] to-[#040c16] overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00c878]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#008751]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ─── Section Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold tracking-wider"
          >
            <QrCode className="w-4 h-4 text-[#00c878] animate-pulse" />
            <span>QRCODE CLOCK-IN SYSTEM</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]"
          >
            Scan. Verify.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c878] via-emerald-400 to-teal-300">
              Clock-In Instantly.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Every NSITF office is equipped with a unique, dynamic QR code terminal.
            Staff simply scan with the EWMIP mobile app — GPS-verified, tamper-proof, and synchronized to HQ in under 2 seconds.
          </motion.p>
        </div>

        {/* ─── Main Content: QR Showcase + Workflow ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Giant Animated QR Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer holographic ring */}
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#00c878]/20 via-transparent to-[#008751]/20 blur-2xl pointer-events-none" />
              <div className="absolute -inset-3 rounded-[1.5rem] border border-[#00c878]/20 pointer-events-none animate-pulse" />

              {/* QR Container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-[#050e1a] border-2 border-[#00c878]/40 p-4 shadow-[0_0_80px_rgba(0,200,120,0.2)] overflow-hidden">

                {/* QR Grid */}
                <div className="grid gap-[2px] w-full h-full" style={{ gridTemplateColumns: `repeat(21, 1fr)`, gridTemplateRows: `repeat(21, 1fr)` }}>
                  {QR_PATTERN.flat().map((cell, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.002, duration: 0.15 }}
                      className={`rounded-[1px] transition-colors duration-500 ${
                        cell
                          ? 'bg-[#00c878] shadow-[0_0_4px_rgba(0,200,120,0.4)]'
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>

                {/* Scanning Beam */}
                <div
                  className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00c878] to-transparent shadow-[0_0_20px_rgba(0,200,120,0.8)] transition-none pointer-events-none"
                  style={{ top: `${scanLine}%` }}
                />

                {/* Corner brackets */}
                {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((pos, idx) => (
                  <div key={idx} className={`absolute ${pos} w-6 h-6 border-[#00c878] rounded-sm pointer-events-none`} />
                ))}
              </div>

              {/* Floating status badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#00c878] text-slate-950 text-xs font-black font-mono flex items-center gap-2 shadow-[0_0_30px_rgba(0,200,120,0.5)]"
              >
                <Wifi className="w-3.5 h-3.5" />
                LIVE SCAN ACTIVE
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Clock-In Workflow + Stats */}
          <div className="space-y-8">
            {/* How It Works Label */}
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold tracking-widest">
              <Zap className="w-4 h-4" />
              HOW QRCODE CLOCK-IN WORKS
            </div>

            {/* 4-Step Vertical Timeline */}
            <div className="space-y-0 relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#00c878]/60 via-[#008751]/30 to-transparent" />

              {STEPS.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  className={`relative flex items-start gap-5 py-4 px-3 rounded-xl transition-all duration-500 ${
                    activeStep === idx
                      ? 'bg-[#00c878]/10 border border-[#00c878]/30'
                      : 'border border-transparent'
                  }`}
                >
                  {/* Circle node */}
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    activeStep === idx
                      ? 'bg-[#00c878] shadow-[0_0_20px_rgba(0,200,120,0.5)]'
                      : 'bg-[#081829] border border-[#122c48]'
                  }`}>
                    <step.icon className={`w-5 h-5 transition-colors ${
                      activeStep === idx ? 'text-slate-950' : 'text-[#00c878]'
                    }`} />
                    {activeStep === idx && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#00c878] animate-ping opacity-30" />
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <div className={`text-sm font-bold transition-colors ${
                      activeStep === idx ? 'text-white' : 'text-slate-400'
                    }`}>{step.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{step.sub}</div>
                  </div>

                  {/* Step Number */}
                  <div className={`ml-auto text-xs font-mono font-black px-2 py-0.5 rounded ${
                    activeStep === idx
                      ? 'bg-[#00c878] text-slate-950'
                      : 'bg-[#081829] text-slate-500 border border-[#122c48]'
                  }`}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '<2s', label: 'Scan-to-Verify Time' },
                { value: '99.98%', label: 'GPS Accuracy' },
                { value: '250+', label: 'Active QR Terminals' },
              ].map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="p-4 rounded-xl bg-[#071727] border border-[#122c48] text-center"
                >
                  <div className="text-xl font-black font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#00c878] to-emerald-400">
                    {s.value}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom Feature Highlights ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {[
            { icon: Shield, title: 'Anti-Proxy Protection', desc: 'Unique per-office dynamic QR codes rotate every 30 seconds — impossible to share or duplicate.' },
            { icon: Clock, title: 'Instant Sync', desc: 'Clock-in data streams to the Director-General\'s command center within 2 seconds of verification.' },
            { icon: MapPin, title: 'Geofence Validated', desc: 'GPS coordinates verified against authorized office boundary before clock-in is accepted.' },
            { icon: Sparkles, title: 'AI Anomaly Guard', desc: 'Machine learning models flag unusual scan patterns, time mismatches, and suspicious location data.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-[#071727] border border-[#122c48] hover:border-[#00c878]/40 transition-all duration-200 group hover:bg-[#0c2238]/60"
            >
              <div className="w-10 h-10 rounded-xl bg-[#008751]/15 border border-[#008751]/30 flex items-center justify-center text-[#00c878] mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
