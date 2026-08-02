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
  CheckCircle2,
  Radio,
  ChevronDown,
  ArrowUpRight
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
  Legend
} from 'recharts';

export const ExecutiveDashboard: React.FC = () => {
  const { filteredBranches, aiAlerts, resolveAIAlert, setIsCopilotOpen } = useTelemetry();

  const chartData = (filteredBranches.length > 0 ? filteredBranches : [
    { name: 'Lagos', attendanceRate: 94.1, productivityIndex: 91.5, claimsSlaCompliance: 90.2 },
    { name: 'Port Harcourt', attendanceRate: 88.5, productivityIndex: 84.0, claimsSlaCompliance: 85.0 },
    { name: 'Kano', attendanceRate: 96.2, productivityIndex: 92.4, claimsSlaCompliance: 94.1 },
    { name: 'Enugu', attendanceRate: 93.8, productivityIndex: 89.2, claimsSlaCompliance: 91.5 },
    { name: 'Ibadan', attendanceRate: 95.0, productivityIndex: 90.8, claimsSlaCompliance: 93.0 },
    { name: 'Maiduguri', attendanceRate: 86.4, productivityIndex: 82.0, claimsSlaCompliance: 84.5 },
    { name: 'Benin City', attendanceRate: 93.9, productivityIndex: 87.6, claimsSlaCompliance: 86.2 },
  ]).map((b: any) => ({
    name: b.name ? b.name.replace(' NSITF', '').replace(' Regional Office', '').replace(' Office', '') : b.name,
    Attendance: b.attendanceRate,
    Productivity: b.productivityIndex,
    ClaimsSLA: b.claimsSlaCompliance,
  }));

  const radarData = [
    { subject: 'ECA Audits', HQ: 98, Lagos: 92, NationalAvg: 88 },
    { subject: 'Claims SLA', HQ: 96, Lagos: 89, NationalAvg: 86 },
    { subject: 'Geofence Rate', HQ: 97, Lagos: 94, NationalAvg: 90 },
    { subject: 'PMS Compliance', HQ: 99, Lagos: 95, NationalAvg: 91 },
    { subject: 'Dispatches', HQ: 95, Lagos: 91, NationalAvg: 87 },
  ];

  return (
    <div className="space-y-6">
      {/* ── 1. MAIN HERO HEADER ────────────────────────────────────────────── */}
      <div className="bg-[#081829] rounded-2xl p-5 sm:p-6 border border-[#122c48] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
              <span>EXECUTIVE CONTROL PORTAL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight font-sans">
              Workforce Performance Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Real-time performance, attendance, productivity & compliance across Geopolitical Zones & State Directorates + FCT.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="px-4 py-3 rounded-xl glow-green-btn text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg flex-shrink-0"
            >
              <BrainCircuit className="w-4 h-4 text-slate-950" />
              <span>Run Copilot Briefing</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry Status Bar */}
        <div className="p-3 rounded-xl bg-[#05111e] border border-[#10273f] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#00c878] font-bold">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>LIVE TELEMETRY</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-slate-300 text-[11px]">
            <span>Mr. Faleye Adesina (DG/CEO)</span>
            <span className="text-slate-600">•</span>
            <span>NSITF National Headquarters</span>
            <span className="text-slate-600">•</span>
            <span className="px-2 py-0.5 rounded bg-[#00381e] text-[#00e680] font-bold border border-[#008048]">
              [DYNAMIC]
            </span>
          </div>

          <div className="text-slate-400 text-[11px]">
            08:42 AM WAT
          </div>
        </div>

        {/* Live Scrolling Ticker Marquee */}
        <LiveTicker />
      </div>

      {/* ── 2. SUMMARY KPI CARDS GRID (4 Columns) ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="ATTENDANCE RATE"
          value="95.4%"
          change="+1.8% vs yesterday"
          isPositive={true}
          subtitle="Real-time Geofenced Attendance"
          icon={Users}
          accentColor="green"
        />
        <StatCard
          title="PRODUCTIVITY SCORE"
          value="92.8 / 100"
          change="+3.2 pts vs yesterday"
          isPositive={true}
          subtitle="SLA Task Turnaround"
          icon={Zap}
          accentColor="gold"
        />
        <StatCard
          title="ACTIVE ECA AUDITS"
          value="1,480"
          change="+114 this month"
          isPositive={true}
          subtitle="Across Directorates"
          icon={Building2}
          accentColor="cyan"
        />
        <StatCard
          title="CLAIMS SLA COMPLIANCE"
          value="92.1%"
          change="-0.6% vs yesterday"
          isPositive={false}
          subtitle="Workplace injury turnaround"
          icon={FileCheck2}
          accentColor="purple"
        />
      </div>

      {/* ── 3. MAP RADAR & HEADQUARTERS PROFILE CARD ROW ──────────────────── */}
      <NigeriaBranchMap />

      {/* ── 4. BENCHMARKS BAR CHART & MATRIX RADAR ROW ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Regional Performance Benchmarks Bar Chart */}
        <div className="lg:col-span-7 bg-[#081829] rounded-2xl p-5 border border-[#122c48] space-y-4 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#122c48] pb-3">
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#00c878]" />
                REGIONAL OFFICE PERFORMANCE BENCHMARKS
              </h3>
              <p className="text-xs text-slate-400">Comparing Attendance, Productivity Index & Claims SLA Compliance</p>
            </div>

            <div className="relative">
              <select className="appearance-none bg-[#05111e] border border-[#122c48] text-xs text-slate-300 pl-3 pr-7 py-1.5 rounded-lg focus:outline-none focus:border-[#00c878]">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Q2 2026</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071727',
                    borderColor: '#00c878',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="Attendance" fill="#00c878" radius={[4, 4, 0, 0]} name="Attendance Rate %" />
                <Bar dataKey="Productivity" fill="#16b8e8" radius={[4, 4, 0, 0]} name="Productivity Index" />
                <Bar dataKey="ClaimsSLA" fill="#fbbf24" radius={[4, 4, 0, 0]} name="Claims SLA %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 border-t border-[#122c48] pt-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#00c878]" />
              <span>Attendance Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#16b8e8]" />
              <span>Productivity Index</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#fbbf24]" />
              <span>Claims SLA Compliance</span>
            </div>
          </div>
        </div>

        {/* Right Directorate Matrix Radar Chart */}
        <div className="lg:col-span-5 bg-[#081829] rounded-2xl p-5 border border-[#122c48] space-y-4 flex flex-col justify-between">
          <div className="border-b border-[#122c48] pb-3">
            <h3 className="text-base font-extrabold text-white tracking-tight">
              DIRECTORATE MATRIX RADAR
            </h3>
            <p className="text-xs text-slate-400">Multi-dimensional operational audit balance</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#122c48" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" fontSize={9} />
                <Radar name="HQ Abuja" dataKey="HQ" stroke="#00c878" fill="#00c878" fillOpacity={0.3} />
                <Radar name="Lagos RO" dataKey="Lagos" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.2} />
                <Radar name="National Avg" dataKey="NationalAvg" stroke="#16b8e8" fill="#16b8e8" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 font-mono text-center border-t border-[#122c48] pt-2">
            Green: HQ Abuja • Amber: Lagos RO • Blue: National Avg.
          </div>
        </div>
      </div>

      {/* ── 5. AI PREDICTIVE RISK FLAGS SECTION ─────────────────────────────── */}
      <div className="bg-[#081829] rounded-2xl p-5 sm:p-6 border border-[#122c48] space-y-4">
        <div className="flex items-center justify-between border-b border-[#122c48] pb-3">
          <div>
            <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              AI PREDICTIVE RISK FLAGS ({aiAlerts.length || 3})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">AI identifies risks early so you can act faster</p>
          </div>

          <button
            onClick={() => setIsCopilotOpen(true)}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            View All Risks
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Risk Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Risk Card 1 */}
          <div className="p-4 rounded-xl bg-[#061424] border border-[#122c48] hover:border-rose-500/40 transition space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                  SLA BOTTLENECK
                </span>
                <span className="text-[10px] font-mono text-rose-400 font-bold">HIGH PRIORITY</span>
              </div>
              <h4 className="text-sm font-extrabold text-white leading-tight">
                Port Harcourt Claims Processing SLA Delay Risk
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Claim turnaround times in Rivers State have increased by +18.4% over the past 14 days due to a sudden surge in offshore oil sector injury filings.
              </p>
            </div>

            <div className="pt-2 border-t border-[#122c48] space-y-2.5">
              <div className="text-xs text-amber-300 bg-[#382b00]/50 p-2.5 rounded-lg border border-amber-500/30 leading-snug">
                💡 Reallocate 4 Senior Claims Officers from Enugu Regional Office (which currently operates at 42% capacity) to Port Harcourt queue temporarily.
              </div>
              <button
                onClick={() => resolveAIAlert('alert-1')}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#00381e] hover:bg-[#004d29] text-[#00e680] text-xs font-bold border border-[#008048] transition shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Action Plan Applied
              </button>
            </div>
          </div>

          {/* Risk Card 2 */}
          <div className="p-4 rounded-xl bg-[#061424] border border-[#122c48] hover:border-amber-500/40 transition space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  WORKLOAD BURNOUT
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold">MODERATE RISK</span>
              </div>
              <h4 className="text-sm font-extrabold text-white leading-tight">
                High Burnout Index Flag: Lagos ECA Audit Division
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Field officers have logged an average of 54.2 field audit hours per week over 4 consecutive weeks. Historical data correlates this with a 31% turnover risk.
              </p>
            </div>

            <div className="pt-2 border-t border-[#122c48] space-y-2.5">
              <div className="text-xs text-amber-300 bg-[#382b00]/50 p-2.5 rounded-lg border border-amber-500/30 leading-snug">
                💡 Adjust quarterly audit quota by -10% or dispatch 2 regional assistance teams from Ibadan office.
              </div>
              <button
                onClick={() => resolveAIAlert('alert-2')}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#00381e] hover:bg-[#004d29] text-[#00e680] text-xs font-bold border border-[#008048] transition shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Action Plan Applied
              </button>
            </div>
          </div>

          {/* Risk Card 3 */}
          <div className="p-4 rounded-xl bg-[#061424] border border-[#122c48] hover:border-cyan-500/40 transition space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                  ATTENDANCE ANOMALY
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">LOW RISK</span>
              </div>
              <h4 className="text-sm font-extrabold text-white leading-tight">
                Geofence Radius Shift Flagged at Maiduguri Office
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                14 staff clock-in records originated from GPS coordinates 1.8km outside authorized branch geofence boundary between 08:00 and 08:30.
              </p>
            </div>

            <div className="pt-2 border-t border-[#122c48] space-y-2.5">
              <div className="text-xs text-amber-300 bg-[#382b00]/50 p-2.5 rounded-lg border border-amber-500/30 leading-snug">
                💡 Request State Manager verification for field assignment or trigger QR code secondary authentication request.
              </div>
              <button
                onClick={() => resolveAIAlert('alert-3')}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#00381e] hover:bg-[#004d29] text-[#00e680] text-xs font-bold border border-[#008048] transition shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Action Plan Applied
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
