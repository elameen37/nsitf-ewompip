import React, { useState } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { MapPin, Building2, Users, Radio, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
import { Branch } from '../../../types';

export const NigeriaBranchMap: React.FC = () => {
  const { branches, setSelectedBranchId, setActiveTab } = useTelemetry();
  const [activeBranch, setActiveBranch] = useState<Branch>(branches[0]);

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Nationwide Branch Network Radar
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry across Abuja HQ, 6 Regional Offices & 36 State Directorates + FCT
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            9 Zones Synchronized
          </span>
        </div>
      </div>

      {/* Grid: Map Visual Representation & Selected Branch Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Grid of Geopolitical Zones */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-3 sm:p-5 border border-slate-800/80 relative min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
          <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold mb-3 flex items-center justify-between">
            <span>Nigeria • Geopolitical Telemetry Grid</span>
            <span className="hidden sm:inline">GRS-80 Coordinate Mesh</span>
          </div>

          {/* Interactive Branch Pins Representation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {branches.map((branch) => {
              const isSelected = branch.id === activeBranch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranch(branch)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-nsitf-green-900/60 border-nsitf-green-400 text-white shadow-glow-green'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-nsitf-gold-400 font-bold">{branch.code}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        branch.status === 'OPTIMAL'
                          ? 'bg-emerald-400'
                          : branch.status === 'MODERATE_DELAY'
                          ? 'bg-amber-400'
                          : 'bg-rose-400 animate-pulse'
                      }`}
                    />
                  </div>
                  <div className="text-xs font-bold text-slate-100 truncate">{branch.city}</div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>{branch.attendanceRate}% Att.</span>
                    <span className="font-mono text-slate-300">{branch.staffCount} Staff</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between font-mono">
            <span>Click branch pin to view operational telemetry</span>
            <span className="text-emerald-400">GEOFENCE ACTIVE</span>
          </div>
        </div>

        {/* Right Selected Branch Detail Panel */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-nsitf-gold-400 px-2 py-0.5 rounded bg-nsitf-gold-500/10 border border-nsitf-gold-500/30">
                  {activeBranch.type.replace('_', ' ')}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeBranch.name}</h3>
                <p className="text-xs text-slate-400">{activeBranch.address}</p>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">Attendance Rate</div>
                <div className="text-xl font-extrabold text-emerald-400 mt-0.5 font-mono">
                  {activeBranch.attendanceRate}%
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Live Clock-In Streams</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">Productivity Index</div>
                <div className="text-xl font-extrabold text-nsitf-gold-400 mt-0.5 font-mono">
                  {activeBranch.productivityIndex} / 100
                </div>
                <div className="text-[10px] text-slate-500 mt-1">SLA Efficiency Metric</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">Claims Turnaround SLA</div>
                <div className="text-xl font-extrabold text-cyan-400 mt-0.5 font-mono">
                  {activeBranch.claimsSlaCompliance}%
                </div>
                <div className="text-[10px] text-slate-500 mt-1">ECA Benefit Claims</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">Active ECA Audits</div>
                <div className="text-xl font-extrabold text-purple-400 mt-0.5 font-mono">
                  {activeBranch.activeAuditsCount}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Employer Sites</div>
              </div>
            </div>

            {/* Branch Manager Info */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Head of Directorate</div>
                <div className="text-xs font-semibold text-white mt-0.5">{activeBranch.managerName}</div>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedBranchId(activeBranch.id);
              setActiveTab('attendance');
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-nsitf-green-600 hover:bg-nsitf-green-500 text-white text-xs font-bold shadow-glow-green transition"
          >
            Inspect Geofenced Telemetry
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
