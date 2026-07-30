import React from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { StatCard } from '../../common/StatCard';
import { NigeriaBranchMap } from './NigeriaBranchMap';
import { LiveTicker } from './LiveTicker';
import {
  Users,
  Zap,
  Building2,
  FileCheck2,
  BrainCircuit,
  TrendingUp,
  ShieldAlert,
  BarChart2,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from 'recharts';

export const ExecutiveDashboard: React.FC = () => {
  const { branches, aiAlerts, resolveAIAlert, setIsCopilotOpen } = useTelemetry();

  const chartData = branches.map((b) => ({
    name: b.name.replace(' NSITF', '').replace(' Regional Office', '').replace(' Office', ''),
    Attendance: b.attendanceRate,
    Productivity: b.productivityIndex,
    ClaimsSLA: b.claimsSlaCompliance,
  }));

  const radarData = [
    { subject: 'ECA Audits', HQ: 98, Lagos: 92, PH: 85, Kano: 94 },
    { subject: 'Claims SLA', HQ: 96, Lagos: 89, PH: 85, Kano: 94 },
    { subject: 'Geofence Rate', HQ: 97, Lagos: 94, PH: 92, Kano: 96 },
    { subject: 'PMS Compliance', HQ: 99, Lagos: 95, PH: 90, Kano: 93 },
    { subject: 'Safety Dispatches', HQ: 95, Lagos: 91, PH: 88, Kano: 92 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Live Ticker */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-2xl p-5 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-nsitf-gold-400 font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-nsitf-gold-400 animate-ping" />
              Executive Control Portal • Federal Republic of Nigeria
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
              Workforce Performance Intelligence Overview
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Synchronized nationwide across 6 Geopolitical Zones & 36 State Directorates + FCT
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-nsitf-gold-600 to-nsitf-gold-500 hover:from-nsitf-gold-500 hover:to-nsitf-gold-400 text-slate-950 font-bold text-xs shadow-glow-gold transition"
            >
              <BrainCircuit className="w-4 h-4" />
              Run Executive Copilot Briefing
            </button>
          </div>
        </div>

        <LiveTicker />
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Nationwide Attendance Rate"
          value="95.4%"
          change="+1.8%"
          isPositive={true}
          subtitle="Real-time geofenced clock-ins"
          icon={Users}
          accentColor="green"
        />
        <StatCard
          title="Productivity Score Index"
          value="92.8 / 100"
          change="+3.2 pts"
          isPositive={true}
          subtitle="SLA task turnarounds"
          icon={Zap}
          accentColor="gold"
        />
        <StatCard
          title="Active ECA Employer Audits"
          value="1,480"
          change="+114 this month"
          isPositive={true}
          subtitle="Dangote, BUA, Shell, Total"
          icon={Building2}
          accentColor="cyan"
        />
        <StatCard
          title="Claims SLA Compliance"
          value="92.1%"
          change="-0.6%"
          isPositive={false}
          subtitle="Workplace injury turnaround"
          icon={FileCheck2}
          accentColor="purple"
        />
      </div>

      {/* Interactive Branch Map & Radar */}
      <NigeriaBranchMap />

      {/* Recharts Data Visualization Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Regional Performance Comparison Bar Chart */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-nsitf-green-400 flex-shrink-0" />
                Regional Office Performance Benchmarks
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">Comparing Attendance, Productivity Index & Claims SLA Compliance</p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 self-start sm:self-auto flex-shrink-0">
              Q2 2026 Telemetry
            </span>
          </div>

          <div className="h-56 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#00a859',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="Attendance" fill="#00a859" radius={[6, 6, 0, 0]} name="Attendance %" />
                <Bar dataKey="Productivity" fill="#d4af37" radius={[6, 6, 0, 0]} name="Productivity Index" />
                <Bar dataKey="ClaimsSLA" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Claims SLA %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Capability Radar Chart */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white tracking-tight">
              Directorate Matrix Radar
            </h3>
            <p className="text-xs text-slate-400">Multi-dimensional operational audit balance</p>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar name="HQ Abuja" dataKey="HQ" stroke="#00a859" fill="#00a859" fillOpacity={0.3} />
                <Radar name="Lagos" dataKey="Lagos" stroke="#d4af37" fill="#d4af37" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[10px] text-slate-400 font-mono text-center border-t border-slate-800 pt-2">
            Green: HQ Abuja • Amber: Lagos Regional Directorate
          </div>
        </div>
      </div>

      {/* AI Predictive Risk Flags Feed */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-nsitf-gold-400 flex-shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              AI Predictive Risk Flags ({aiAlerts.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="text-xs text-nsitf-gold-400 hover:text-nsitf-gold-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            Ask Copilot to resolve
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-nsitf-gold-500/40 transition space-y-3 flex flex-col justify-between shadow-glass"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {alert.category.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{alert.confidenceScore}% Confidence</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">{alert.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{alert.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="text-[10px] text-nsitf-gold-300 bg-nsitf-gold-500/10 p-2 rounded-lg border border-nsitf-gold-500/20">
                  💡 {alert.recommendedAction}
                </div>
                <button
                  onClick={() => resolveAIAlert(alert.id)}
                  className="w-full flex items-center justify-center gap-1 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 transition"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Mark Action Plan Applied
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
