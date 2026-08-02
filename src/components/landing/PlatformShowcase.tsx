import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Award, Lock, Sparkles, TrendingUp, Users, Activity, BarChart3, Clock } from 'lucide-react';

export const PlatformShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'performance' | 'ai'>('attendance');

  return (
    <section id="platform" className="relative py-24 bg-gradient-to-b from-[#040c16] via-[#061424] to-[#050e1a] overflow-hidden">
      
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#008751]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008751]/15 border border-[#008751]/40 text-emerald-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#00c878]" />
              <span>PLATFORM OVERVIEW</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              One Platform.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c878] to-emerald-400">
                Unlimited Possibilities.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Integrate attendance, performance, analytics, and AI into a single intelligent platform designed to transform the way NSITF operates nationwide.
            </p>

            {/* Checklist of Core Advantages */}
            <div className="space-y-3 pt-2">
              {[
                'Real-time Attendance & Geofenced Facial Recognition',
                'AI-Powered Performance Analytics & OKR Cascade',
                'Comprehensive Workforce Intelligence Dashboards',
                'Seamless Integrations with Federal Payroll & HRMS',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00c878]/20 text-[#00c878] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00c878]/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Compliance & ISO Badges Card */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-[#081829] border border-[#122c48] flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#00c878]" />
                <div>
                  <div className="text-xs font-bold text-white">ISO 27001 Certified</div>
                  <div className="text-[10px] text-slate-400">Federal Data Governance</div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#081829] border border-[#122c48] flex items-center gap-3">
                <Lock className="w-6 h-6 text-[#16b8e8]" />
                <div>
                  <div className="text-xs font-bold text-white">ECA 2010 Aligned</div>
                  <div className="text-[10px] text-slate-400">Automated Audit Trail</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Browser Dashboard Showcase */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl bg-[#071727] border border-[#143252] shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              
              {/* Fake Browser Window Header */}
              <div className="px-4 py-3 bg-[#050e1a] border-b border-[#122c48] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-slate-400">nsitf-ewompip.gov.ng/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  {(['attendance', 'performance', 'ai'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold capitalize transition ${
                        activeTab === tab
                          ? 'bg-[#00c878] text-slate-950 shadow-sm'
                          : 'bg-[#081829] text-slate-400 hover:text-white border border-[#122c48]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dashboard Content Container */}
              <div className="p-6 space-y-6">
                
                {/* 4 Quick Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Total Staff', value: '20,487', change: '+12.5%', color: 'text-white' },
                    { label: 'Clocked-In Today', value: '18,392', change: '89.8%', color: 'text-[#00c878]' },
                    { label: 'Avg Performance', value: '86.4%', change: '+8.2%', color: 'text-amber-400' },
                    { label: 'Active Directorates', value: '250+', change: '36 States', color: 'text-[#16b8e8]' },
                  ].map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#040e19] border border-[#10273f]">
                      <div className="text-[10px] text-slate-400 font-mono">{m.label}</div>
                      <div className={`text-base font-black font-mono mt-1 ${m.color}`}>{m.value}</div>
                      <div className="text-[9px] text-[#00c878] mt-0.5">{m.change}</div>
                    </div>
                  ))}
                </div>

                {/* Main Interactive Tab Preview Content */}
                {activeTab === 'attendance' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#00c878]" />
                        Nationwide Attendance Trend (This Week)
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-[#008751]/20 px-2 py-0.5 rounded border border-[#008751]/30">Live Stream</span>
                    </div>

                    {/* Simulated Bar Chart */}
                    <div className="h-40 rounded-xl bg-[#040e19] border border-[#10273f] p-4 flex items-end justify-between gap-3">
                      {[
                        { day: 'Mon', height: '88%', val: '94.2%' },
                        { day: 'Tue', height: '94%', val: '96.8%' },
                        { day: 'Wed', height: '91%', val: '95.1%' },
                        { day: 'Thu', height: '96%', val: '97.4%' },
                        { day: 'Fri', height: '92%', val: '94.9%' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div
                            className="w-full bg-gradient-to-t from-[#008751] to-[#00c878] rounded-t-md transition-all duration-500 shadow-[0_0_12px_rgba(0,200,120,0.3)]"
                            style={{ height: item.height }}
                          />
                          <span className="text-[10px] font-mono text-slate-400">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        Top Performing Geopolitical Directorates
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { region: 'Lagos Directorate', score: 94.2, staff: 980 },
                        { region: 'Abuja HQ Directorate', score: 92.8, staff: 1420 },
                        { region: 'Port Harcourt Directorate', score: 90.5, staff: 850 },
                        { region: 'Kano Directorate', score: 88.9, staff: 760 },
                      ].map((r, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#040e19] border border-[#10273f] flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-white">{r.region}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-slate-400">{r.staff} Staff</span>
                            <span className="text-[#00c878] font-black">{r.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#008751]/15 border border-[#008751]/40 text-xs font-mono space-y-1">
                      <div className="text-emerald-300 font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00c878]" />
                        Predictive AI Insight Engine
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Attendance in South-West region projected to hit 98.2% next Tuesday following QR code kiosk optimization.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
