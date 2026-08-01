import React, { useState } from 'react';
import { useTelemetry, NIGERIA_ZONE_STATES } from '../../../context/TelemetryContext';
import { Building2, Radio, ArrowUpRight, CheckCircle2, Compass } from 'lucide-react';
import { Branch } from '../../../types';

// ── Positions calibrated to nigeria-map-neon.png ─────────────────────────────
// Bounds: lat 4.0–14.0°N · lng 2.7–14.7°E
// left = ((lng - 2.7) / 12.0) * 83 + 8
// top  = ((14.0 - lat) / 10.0) * 82 + 7
const BRANCH_POSITIONS: Record<string, { top: string; left: string }> = {
  // NORTH-WEST ────────────────────────────────────────────
  'br-sok-01': { top: '15%', left: '26%' },   // Sokoto   13.06°N 5.24°E
  'br-kan-01': { top: '23%', left: '48%' },   // Kano     12.00°N 8.52°E
  'br-kad-01': { top: '36%', left: '41%' },   // Kaduna   10.51°N 7.42°E
  // NORTH-EAST ────────────────────────────────────────────
  'br-mai-01': { top: '25%', left: '80%' },   // Maiduguri 11.83°N 13.15°E
  'br-bau-01': { top: '37%', left: '57%' },   // Bauchi    10.32°N  9.84°E
  // NORTH-CENTRAL / FCT ───────────────────────────────────
  'br-hq-01':  { top: '47%', left: '41%' },   // Abuja HQ   9.06°N  7.50°E ★
  'br-jos-01': { top: '40%', left: '51%' },   // Jos        9.92°N  8.90°E
  // SOUTH-WEST ────────────────────────────────────────────
  'br-iba-01': { top: '61%', left: '17%' },   // Ibadan     7.38°N  3.90°E
  'br-abk-01': { top: '63%', left: '12%' },   // Abeokuta   7.16°N  3.35°E
  'br-lag-01': { top: '69%', left: '12%' },   // Lagos      6.60°N  3.35°E
  // SOUTH-EAST ────────────────────────────────────────────
  'br-enu-01': { top: '64%', left: '45%' },   // Enugu      6.46°N  7.55°E
  'br-owe-01': { top: '73%', left: '38%' },   // Owerri     5.48°N  7.04°E
  // SOUTH-SOUTH ───────────────────────────────────────────
  'br-ben-01': { top: '68%', left: '29%' },   // Benin City 6.34°N  5.60°E
  'br-ph-01':  { top: '81%', left: '42%' },   // Port Harcourt 4.82°N 7.05°E
  'br-cal-01': { top: '78%', left: '54%' },   // Calabar    4.96°N  8.32°E
};

const nodeColor = (rate: number) =>
  rate >= 95 ? '#00c878' : rate >= 90 ? '#16b8e8' : rate >= 85 ? '#fbbf24' : '#f43f5e';

const ZONE_FILTERS = [
  { id: 'ALL',           label: 'All Nigeria' },
  { id: 'NORTH_WEST',    label: 'North-West' },
  { id: 'NORTH_EAST',    label: 'North-East' },
  { id: 'NORTH_CENTRAL', label: 'North-Central (FCT)' },
  { id: 'SOUTH_WEST',    label: 'South-West' },
  { id: 'SOUTH_EAST',    label: 'South-East' },
  { id: 'SOUTH_SOUTH',   label: 'South-South' },
];

export const NigeriaBranchMap: React.FC = () => {
  const { branches, setSelectedBranchId, setActiveTab, selectedZone, setSelectedZone } = useTelemetry();
  const [activeBranch, setActiveBranch] = useState<Branch>(branches[0]);
  const [hoveredId, setHoveredId]       = useState<string | null>(null);

  const displayed = selectedZone === 'ALL'
    ? branches
    : branches.filter((b) => b.zone === selectedZone);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* ── LEFT PANEL ───────────────────────────────────────────────────────── */}
      <div className="lg:col-span-7 dark:bg-[#081829] bg-white rounded-2xl p-5 dark:border-[#122c48] border-[#c0dbc9] border flex flex-col gap-4">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#122c48] pb-3 gap-2">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2 font-mono">
              <Radio className="w-4 h-4 text-[#00c878] animate-pulse" />
              NATIONWIDE BRANCH NETWORK RADAR
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {selectedZone === 'ALL'
                ? 'Live telemetry across all 36 States & FCT — '
                : `Live telemetry across ${selectedZone.replace(/_/g, '-')} Zone — `}
              <strong className="text-white">{displayed.length}</strong> nodes active
            </p>
          </div>
          <button
            onClick={() => setActiveTab('hierarchy')}
            className="px-3 py-1.5 rounded-lg dark:bg-[#0c2238] bg-slate-100 dark:border-[#143252] border-slate-200 hover:border-[#00c878]/40 dark:text-slate-300 text-slate-700 dark:hover:text-white text-xs font-semibold transition flex items-center gap-1.5 border"
          >
            <Building2 className="w-3.5 h-3.5 text-[#00c878]" />
            View All Zones
          </button>
        </div>

        {/* Zone filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span className="text-slate-400 font-bold flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5 text-[#00c878]" />
            REGION:
          </span>
          {ZONE_FILTERS.map((z) => (
            <button
              key={z.id}
              onClick={() => setSelectedZone(z.id as any)}
              className={`px-2 py-0.5 rounded-md transition font-medium ${
                selectedZone === z.id
                  ? 'bg-[#00c878] text-slate-950 font-bold shadow-sm'
                  : 'bg-[#0a1d30] border border-[#143252] text-slate-300 hover:text-white hover:border-[#00c878]/40'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>

        {/* ── MAP CANVAS ───────────────────────────────────────────────────── */}
        <div
          className="relative w-full rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #031625 60%, #010c18)',
            border: '1px solid #10273f',
            aspectRatio: '1 / 1',
            maxHeight: 480,
          }}
        >
          {/* Radar dot-grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #143252 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              opacity: 0.22,
            }}
          />

          {/* Clean Nigeria State Boundaries & Rivers Map */}
          <img
            src="/nigeria-map-clean.png"
            alt="Nigeria State Boundaries & Rivers Map"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none p-2"
            draggable={false}
          />

          {/* Colour legend – top-left */}
          <div className="absolute top-2 left-2 p-2 rounded-xl bg-[#071626]/92 border border-[#122c48] space-y-1 text-[9.5px] font-mono z-10 shadow-xl backdrop-blur-sm">
            {[
              { color: '#00c878', label: 'Optimal (95%+)' },
              { color: '#16b8e8', label: 'Good (90–94%)' },
              { color: '#fbbf24', label: 'Moderate (85–89%)' },
              { color: '#f43f5e', label: 'Attention (<85%)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }}
                />
                <span className="text-slate-200">{label}</span>
              </div>
            ))}
          </div>

          {/* Zone label badge – top-right */}
          {selectedZone !== 'ALL' && (
            <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-[#00c878]/15 border border-[#00c878]/40 text-[10px] font-mono font-bold text-[#00c878] z-10 shadow">
              {selectedZone.replace(/_/g, ' ')}
            </div>
          )}

          {/* ── Branch markers ── */}
          {displayed.map((b) => {
            const pos     = BRANCH_POSITIONS[b.id] ?? { top: '50%', left: '50%' };
            const color   = nodeColor(b.attendanceRate);
            const isHQ    = b.type === 'HEADQUARTERS';
            const isActive  = activeBranch.id === b.id;
            const isHovered = hoveredId === b.id;
            const showCard  = isActive || isHovered;

            return (
              <div
                key={b.id}
                className="absolute z-20"
                style={{ top: pos.top, left: pos.left, transform: 'translate(-50%,-50%)' }}
              >
                <button
                  onClick={() => { setActiveBranch(b); setSelectedBranchId(b.id); }}
                  onMouseEnter={() => setHoveredId(b.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative flex flex-col items-center group focus:outline-none"
                  title={`${b.name} — ${b.attendanceRate}% attendance`}
                >
                  {/* Outer ping ring */}
                  <span
                    className={`absolute rounded-full animate-ping opacity-55 ${isHQ ? 'w-7 h-7' : 'w-5 h-5'}`}
                    style={{ backgroundColor: color }}
                  />

                  {/* Core node dot */}
                  <div
                    className={`rounded-full border-2 border-[#010c18] flex items-center justify-center transition-transform duration-150 ${
                      isHQ ? 'w-5 h-5' : 'w-3.5 h-3.5'
                    } ${isActive ? 'scale-[1.7] ring-4 ring-[#00c878]/50' : 'group-hover:scale-125'}`}
                    style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                  >
                    {isHQ && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </div>

                  {/* City name badge */}
                  <span className="mt-1 text-[8.5px] font-mono font-extrabold text-white bg-[#071727]/88 px-1.5 py-px rounded border border-[#143252] whitespace-nowrap pointer-events-none shadow tracking-tight">
                    {b.city}
                  </span>

                  {/* Floating info card */}
                  {showCard && (
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none z-30 min-w-[215px]">
                      <div className="p-3 rounded-xl bg-[#071727]/97 border border-[#1c3f6e] text-white shadow-2xl space-y-2 backdrop-blur-md">
                        <div className="flex items-center justify-between gap-2 border-b border-[#122c48] pb-1.5">
                          <span className="font-extrabold text-[11px] truncate leading-tight">{b.name}</span>
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-300">
                          <div>Zone: <strong className="text-slate-100">{b.zone.replace(/_/g, '-')}</strong></div>
                          <div>Staff: <strong className="text-white">{b.staffCount.toLocaleString()}</strong></div>
                          <div>Attendance: <strong className="text-[#00c878]">{b.attendanceRate}%</strong></div>
                          <div>SLA: <strong className="text-[#16b8e8]">{b.claimsSlaCompliance}%</strong></div>
                          <div>Audits: <strong className="text-amber-400">{b.activeAuditsCount}</strong></div>
                          <div>Productivity: <strong className="text-purple-400">{b.productivityIndex}</strong></div>
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 pt-1 border-t border-[#122c48] flex justify-between">
                          <span>{b.code}</span>
                          <span className="text-emerald-400 font-bold uppercase">{b.status.replace(/_/g, ' ')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-2 border-t border-[#122c48] pt-3 text-center font-mono">
          {[
            { value: '6', label: 'Zones Active', color: 'text-white' },
            {
              value: selectedZone === 'ALL' ? '36+FCT' : `${NIGERIA_ZONE_STATES[selectedZone].length} States`,
              label: selectedZone === 'ALL' ? 'State Coverage' : `${selectedZone.replace(/_/g, '-')} States`,
              color: 'text-white',
            },
            { value: '1,480', label: 'Active Audits', color: 'text-[#16b8e8]' },
            { value: '24/7', label: 'Live Telemetry', color: 'text-[#00c878]' },
          ].map(({ value, label, color }) => (
            <div key={label} className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
              <div className={`text-sm sm:text-base font-extrabold ${color}`}>{value}</div>
              <div className="text-[10px] text-slate-400 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL: SELECTED BRANCH ────────────────────────────────────── */}
      <div className="lg:col-span-5 dark:bg-[#081829] bg-white rounded-2xl p-5 dark:border-[#122c48] border-[#c0dbc9] border flex flex-col justify-between gap-4">
        <div className="space-y-4">

          {/* Header */}
          <div className="border-b border-[#122c48] pb-3">
            <div className="text-[10px] font-mono text-[#00c878] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c878] animate-pulse" />
              SELECTED TELEMETRY NODE
            </div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2 mt-0.5">
              {activeBranch.name}
              <span>🇳🇬</span>
            </h3>
            <p className="text-xs text-slate-400 truncate">{activeBranch.address}</p>
          </div>

          {/* Building photo */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#122c48]">
            <img
              src="/nsitf-hq-building.jpg"
              alt="NSITF Facility Building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081829] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-300 font-bold bg-[#071727]/90 px-2.5 py-1 rounded border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c878] animate-pulse" />
              {activeBranch.type.replace(/_/g, ' ')} • {activeBranch.code}
            </div>
          </div>

          {/* 2 × 2 Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Attendance Rate',    value: `${activeBranch.attendanceRate}%`,      color: 'text-[#00c878]',  sub: 'Live Clock-In Streams' },
              { label: 'Productivity Index', value: `${activeBranch.productivityIndex}`,    color: 'text-amber-400',  sub: 'SLA Efficiency' },
              { label: 'Claims SLA',         value: `${activeBranch.claimsSlaCompliance}%`, color: 'text-[#16b8e8]',  sub: 'ECA Benefit Claims' },
              { label: 'Active ECA Audits',  value: `${activeBranch.activeAuditsCount}`,    color: 'text-purple-400', sub: 'Employer Sites' },
            ].map(({ label, value, color, sub }) => (
              <div key={label} className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
                <div className="text-[10px] text-slate-400 font-mono">{label}</div>
                <div className={`text-lg font-extrabold mt-0.5 font-mono ${color}`}>{value}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>

          {/* Manager */}
          <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Branch / Regional Manager</div>
              <div className="text-xs font-bold text-white mt-0.5">{activeBranch.managerName}</div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#00c878] flex-shrink-0" />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => { setSelectedBranchId(activeBranch.id); setActiveTab('attendance'); }}
          className="w-full py-3 rounded-xl glow-green-btn text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg"
        >
          Inspect {activeBranch.city} Geofenced Telemetry
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
