import React, { useState } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { MapPin, Building2, Users, Radio, ArrowUpRight, ShieldCheck, Activity, Layers, CheckCircle2 } from 'lucide-react';
import { Branch } from '../../../types';

export const NigeriaBranchMap: React.FC = () => {
  const { branches, setSelectedBranchId, setActiveTab } = useTelemetry();
  const [activeBranch, setActiveBranch] = useState<Branch>(branches[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ── LEFT PANEL: NATIONWIDE BRANCH NETWORK RADAR MAP ──────────────── */}
      <div className="lg:col-span-7 bg-[#081829] rounded-2xl p-5 border border-[#122c48] space-y-4 flex flex-col justify-between relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#122c48] pb-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#00c878] animate-pulse" />
              NATIONWIDE BRANCH NETWORK RADAR
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time telemetry across Nigeria
            </p>
          </div>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className="px-3 py-1.5 rounded-lg bg-[#0c2238] border border-[#143252] hover:border-[#00c878]/40 text-slate-300 hover:text-white text-xs font-semibold transition"
          >
            View All Zones
          </button>
        </div>

        {/* High-Tech Map Canvas with Glowing Nodes */}
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-xl bg-[#05111e] border border-[#10273f] p-4 flex items-center justify-center overflow-hidden">
          {/* Map Overlay Grid Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#143252_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Map Graphic / Nigeria Silhouette */}
          <svg className="w-full h-full max-w-[420px] opacity-35" viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M120,80 Q180,40 260,50 Q360,30 440,90 Q470,160 420,240 Q380,300 320,380 Q220,400 140,350 Q80,280 60,200 Q70,120 120,80 Z" stroke="#00c878" strokeWidth="1.5" strokeDasharray="4 4" fill="rgba(0, 200, 120, 0.03)" />
            <path d="M180,90 L240,110 L300,80 L360,120 L400,180 L350,260 L280,320 L200,340 L120,280 L100,180 Z" stroke="#16b8e8" strokeWidth="1" opacity="0.4" />
          </svg>

          {/* Map Quality Legend Box (Top Left) */}
          <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-[#071626]/90 border border-[#122c48] backdrop-blur-md space-y-1 text-[10px] font-mono z-10 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#00c878]" />
              <span className="text-slate-200">Excellent (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#16b8e8]" />
              <span className="text-slate-200">Good (60% - 79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
              <span className="text-slate-200">At Risk (40% - 59%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
              <span className="text-slate-200">Critical (&lt; 40%)</span>
            </div>
          </div>

          {/* Interactive Branch Markers with Radar Pulse */}
          <div className="absolute inset-0 p-6 pointer-events-auto">
            {branches.map((b, idx) => {
              // Custom map pin positions across Nigeria SVG coordinates
              const positions: Record<string, { top: string; left: string }> = {
                'br-hq-01': { top: '38%', left: '46%' }, // Abuja HQ
                'br-lag-01': { top: '68%', left: '22%' }, // Lagos
                'br-kan-01': { top: '20%', left: '55%' }, // Kano
                'br-ph-01': { top: '78%', left: '50%' }, // Port Harcourt
                'br-enu-01': { top: '66%', left: '56%' }, // Enugu
                'br-iba-01': { top: '62%', left: '26%' }, // Ibadan
                'br-mai-01': { top: '22%', left: '80%' }, // Maiduguri
                'br-kad-01': { top: '30%', left: '48%' }, // Kaduna
                'br-ben-01': { top: '72%', left: '36%' }, // Benin
              };
              const pos = positions[b.id] || { top: `${30 + (idx * 8) % 50}%`, left: `${25 + (idx * 12) % 60}%` };

              const nodeColor =
                b.attendanceRate >= 95
                  ? '#00c878'
                  : b.attendanceRate >= 90
                  ? '#16b8e8'
                  : b.attendanceRate >= 85
                  ? '#fbbf24'
                  : '#f43f5e';

              const isSelected = activeBranch.id === b.id;

              return (
                <button
                  key={b.id}
                  onClick={() => setActiveBranch(b)}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all"
                  title={`${b.name} (${b.attendanceRate}% Attendance)`}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className="w-5 h-5 rounded-full animate-ping absolute opacity-60"
                      style={{ backgroundColor: nodeColor }}
                    />
                    <span
                      className={`w-3.5 h-3.5 rounded-full border-2 border-[#05111e] transition-transform ${
                        isSelected ? 'scale-150 ring-4 ring-[#00c878]/40' : 'group-hover:scale-125'
                      }`}
                      style={{ backgroundColor: nodeColor }}
                    />

                    {/* Tooltip Label */}
                    <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                      <div className="px-2 py-1 rounded bg-[#071727] border border-[#143252] text-[10px] font-mono text-white whitespace-nowrap shadow-xl">
                        {b.city} • {b.attendanceRate}%
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom 4 Summary Counters Strip */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#122c48] text-center font-mono">
          <div className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
            <div className="text-base sm:text-lg font-extrabold text-white">9</div>
            <div className="text-[10px] text-slate-400 font-medium">Zones Active</div>
          </div>
          <div className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
            <div className="text-base sm:text-lg font-extrabold text-white">36+</div>
            <div className="text-[10px] text-slate-400 font-medium">States + FCT</div>
          </div>
          <div className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
            <div className="text-base sm:text-lg font-extrabold text-[#16b8e8]">1,480</div>
            <div className="text-[10px] text-slate-400 font-medium">Active Audits</div>
          </div>
          <div className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
            <div className="text-base sm:text-lg font-extrabold text-[#00c878]">24/7</div>
            <div className="text-[10px] text-slate-400 font-medium">Live Monitoring</div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: NSITF NATIONAL HEADQUARTERS PROFILE CARD ──────────── */}
      <div className="lg:col-span-5 bg-[#081829] rounded-2xl p-5 border border-[#122c48] space-y-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#122c48] pb-3">
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                NSITF NATIONAL HEADQUARTERS
                <span className="text-sm">🇳🇬</span>
              </h3>
              <p className="text-xs text-slate-400">Plot 794, Muhammad Buhari Way, CBD, Abuja</p>
            </div>
          </div>

          {/* Building Photo Image Container */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden mt-3 border border-[#122c48]">
            <img
              src="/nsitf-hq-building.jpg"
              alt="NSITF House — Nigeria Social Insurance Trust Fund Headquarters, Abuja"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081829] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-300 font-bold bg-[#071727]/90 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c878] animate-pulse" />
              FEDERAL COMMAND NODE
            </div>
          </div>

          {/* 2x2 Operational Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
              <div className="text-[10px] text-slate-400 font-mono">Attendance Rate</div>
              <div className="text-lg font-extrabold text-[#00c878] mt-0.5 font-mono">97.4%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Live Clock-In Streams</div>
            </div>

            <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
              <div className="text-[10px] text-slate-400 font-mono">Productivity Index</div>
              <div className="text-lg font-extrabold text-amber-400 mt-0.5 font-mono">94.8 / 100</div>
              <div className="text-[10px] text-slate-400 mt-0.5">SLA Efficiency</div>
            </div>

            <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
              <div className="text-[10px] text-slate-400 font-mono">Claims Turnaround SLA</div>
              <div className="text-lg font-extrabold text-[#16b8e8] mt-0.5 font-mono">96.2%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">ECA Benefit Claims</div>
            </div>

            <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
              <div className="text-[10px] text-slate-400 font-mono">Active ECA Audits</div>
              <div className="text-lg font-extrabold text-purple-400 mt-0.5 font-mono">142</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Employer Sites</div>
            </div>
          </div>

          {/* Head of Directorate Row */}
          <div className="mt-4 p-3 rounded-xl bg-[#061424] border border-[#122c48] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Head of Directorate</div>
              <div className="text-xs font-bold text-white mt-0.5">Dr. Oluwaseun Adesina (Director-General)</div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#00c878] flex-shrink-0" />
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => {
            setSelectedBranchId(activeBranch.id);
            setActiveTab('attendance');
          }}
          className="w-full mt-3 py-3 rounded-xl glow-green-btn text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg"
        >
          Inspect Geofenced Telemetry
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
