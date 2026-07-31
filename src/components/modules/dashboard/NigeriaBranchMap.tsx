import React, { useState } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { MapPin, Building2, Users, Radio, ArrowUpRight, ShieldCheck, Activity, Layers, CheckCircle2, Compass } from 'lucide-react';
import { Branch } from '../../../types';

// Fine-tuned percentage positions relative to the neon Nigeria PNG map image
const BRANCH_MAP_POSITIONS: Record<string, { top: string; left: string }> = {
  'br-hq-01': { top: '45%', left: '44%' },   // Abuja HQ (FCT)
  'br-lag-01': { top: '68%', left: '11%' },  // Lagos Regional Office
  'br-ph-01':  { top: '80%', left: '41%' },  // Port Harcourt (Niger Delta)
  'br-kan-01': { top: '22%', left: '48%' },  // Kano Regional Office
  'br-enu-01': { top: '66%', left: '45%' },  // Enugu Regional Office
  'br-iba-01': { top: '60%', left: '17%' },  // Ibadan Regional Office
  'br-mai-01': { top: '23%', left: '85%' },  // Maiduguri Regional Office
  'br-kad-01': { top: '34%', left: '42%' },  // Kaduna State Office
  'br-ben-01': { top: '67%', left: '28%' },  // Benin City Branch Office
};

// Fallback position calculation for any dynamic branches based on geographic lat/lng
const getBranchPosition = (b: Branch) => {
  if (BRANCH_MAP_POSITIONS[b.id]) {
    return BRANCH_MAP_POSITIONS[b.id];
  }
  const minLng = 2.7;
  const maxLng = 14.7;
  const minLat = 4.2;
  const maxLat = 13.9;

  const left = Math.max(8, Math.min(92, ((b.lng - minLng) / (maxLng - minLng)) * 80 + 10));
  const top = Math.max(8, Math.min(90, ((maxLat - b.lat) / (maxLat - minLat)) * 76 + 10));

  return { top: `${top.toFixed(1)}%`, left: `${left.toFixed(1)}%` };
};

export const NigeriaBranchMap: React.FC = () => {
  const { branches, setSelectedBranchId, setActiveTab, selectedZone, setSelectedZone } = useTelemetry();
  const [activeBranch, setActiveBranch] = useState<Branch>(branches[0]);
  const [hoveredBranch, setHoveredBranch] = useState<Branch | null>(null);

  // Filter branches by selected zone if active
  const displayedBranches = selectedZone === 'ALL'
    ? branches
    : branches.filter((b) => b.zone === selectedZone);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ── LEFT PANEL: NATIONWIDE BRANCH NETWORK RADAR MAP ──────────────── */}
      <div className="lg:col-span-7 dark:bg-[#081829] bg-white rounded-2xl p-5 dark:border-[#122c48] border-[#c0dbc9] border space-y-4 flex flex-col justify-between relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#122c48] pb-3 gap-2">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2 font-mono">
              <Radio className="w-4 h-4 text-[#00c878] animate-pulse" />
              NATIONWIDE BRANCH NETWORK RADAR
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Regional Telemetry across all 36 States & FCT Abuja
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('hierarchy')}
              className="px-3 py-1.5 rounded-lg dark:bg-[#0c2238] bg-white dark:border-[#143252] border-[#c0dbc9] hover:border-[#00c878]/40 dark:text-slate-300 text-slate-700 hover:text-emerald-700 dark:hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[#00c878]" />
              View All Zones
            </button>
          </div>
        </div>

        {/* Region Filter Quick Selector */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span className="text-slate-400 font-bold mr-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#00c878]" />
            REGION:
          </span>
          {[
            { id: 'ALL', label: 'All Nigeria' },
            { id: 'NORTH_CENTRAL', label: 'North-Central (FCT)' },
            { id: 'NORTH_WEST', label: 'North-West' },
            { id: 'NORTH_EAST', label: 'North-East' },
            { id: 'SOUTH_WEST', label: 'South-West' },
            { id: 'SOUTH_EAST', label: 'South-East' },
            { id: 'SOUTH_SOUTH', label: 'South-South' },
          ].map((z) => (
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

        {/* High-Tech Map Canvas with Attached PNG Map Image & Telemetry Overlay */}
        <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl dark:bg-[#030b14] bg-[#05111e] dark:border-[#10273f] border-[#143252] p-2 flex items-center justify-center overflow-hidden shadow-2xl">
          {/* Subtle Radar Scanline Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#143252_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

          {/* Map Image Container */}
          <div className="relative w-full h-full max-w-[520px] flex items-center justify-center">
            {/* Attached Neon Map PNG Image */}
            <img
              src="/nigeria-map-neon.png"
              alt="Nigeria State Boundaries & Rivers Map"
              className="w-full h-full object-contain pointer-events-none filter drop-shadow-[0_0_20px_rgba(0,200,120,0.3)] transition-all duration-300"
            />

            {/* Map Quality Legend Box (Top Left Overlay) */}
            <div className="absolute top-2 left-2 p-2.5 rounded-xl dark:bg-[#071626]/90 bg-slate-900/90 dark:border-[#122c48] border-[#143252] backdrop-blur-md space-y-1 text-[10px] font-mono z-10 shadow-xl border">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00c878] shadow-[0_0_8px_#00c878]" />
                <span className="text-slate-200">Optimal (95%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16b8e8] shadow-[0_0_8px_#16b8e8]" />
                <span className="text-slate-200">Good (90% - 94%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                <span className="text-slate-200">Moderate (85% - 89%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                <span className="text-slate-200">Attention (&lt; 85%)</span>
              </div>
            </div>

            {/* Interactive Branch Markers Overlaid on States */}
            <div className="absolute inset-0 pointer-events-auto">
              {displayedBranches.map((b) => {
                const pos = getBranchPosition(b);

                const nodeColor =
                  b.attendanceRate >= 95
                    ? '#00c878'
                    : b.attendanceRate >= 90
                    ? '#16b8e8'
                    : b.attendanceRate >= 85
                    ? '#fbbf24'
                    : '#f43f5e';

                const isSelected = activeBranch.id === b.id;
                const isHovered = hoveredBranch?.id === b.id;

                return (
                  <div
                    key={b.id}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => {
                        setActiveBranch(b);
                        setSelectedBranchId(b.id);
                      }}
                      onMouseEnter={() => setHoveredBranch(b)}
                      onMouseLeave={() => setHoveredBranch(null)}
                      className="relative flex items-center justify-center group focus:outline-none"
                      title={`${b.name} (${b.attendanceRate}% Attendance)`}
                    >
                      {/* Pulsing Outer Ping Ring */}
                      <span
                        className={`w-6 h-6 rounded-full animate-ping absolute opacity-70 ${
                          b.type === 'HEADQUARTERS' ? 'scale-150' : ''
                        }`}
                        style={{ backgroundColor: nodeColor }}
                      />

                      {/* Main Node Icon Marker */}
                      <div
                        className={`relative rounded-full flex items-center justify-center text-slate-950 font-bold border-2 border-[#040e1a] shadow-2xl transition-all ${
                          b.type === 'HEADQUARTERS' ? 'w-5 h-5 ring-4 ring-emerald-500/60 scale-125' : 'w-4 h-4'
                        } ${isSelected ? 'scale-150 ring-4 ring-[#00c878]' : 'group-hover:scale-135'}`}
                        style={{ backgroundColor: nodeColor }}
                      >
                        {b.type === 'HEADQUARTERS' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </div>

                      {/* Permanent City Name Badge below Node */}
                      <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-extrabold text-white bg-[#071727]/90 px-1.5 py-0.3 rounded border border-[#143252] whitespace-nowrap pointer-events-none shadow-xl tracking-tight">
                        {b.city}
                      </span>

                      {/* Floating Rich Hover Card */}
                      {(isHovered || isSelected) && (
                        <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none min-w-[200px]">
                          <div className="p-2.5 rounded-xl bg-[#071727]/95 border border-[#143252] text-xs text-white shadow-2xl space-y-1.5 backdrop-blur-md">
                            <div className="flex items-center justify-between gap-2 border-b border-[#122c48] pb-1.5">
                              <span className="font-extrabold text-white text-[11px] truncate">{b.name}</span>
                              <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: nodeColor }}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-300">
                              <div>State: <strong className="text-white">{b.state}</strong></div>
                              <div>Staff: <strong className="text-white">{b.staffCount}</strong></div>
                              <div>Attendance: <strong className="text-[#00c878]">{b.attendanceRate}%</strong></div>
                              <div>SLA: <strong className="text-[#16b8e8]">{b.claimsSlaCompliance}%</strong></div>
                            </div>

                            <div className="text-[9px] font-mono text-slate-400 pt-1 border-t border-[#122c48] flex items-center justify-between">
                              <span>Code: {b.code}</span>
                              <span className="text-emerald-400 font-bold uppercase">{b.status.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom 4 Summary Counters Strip */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#122c48] text-center font-mono">
          <div className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
            <div className="text-base sm:text-lg font-extrabold text-white">6</div>
            <div className="text-[10px] text-slate-400 font-medium">Zones Synced</div>
          </div>
          <div className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
            <div className="text-base sm:text-lg font-extrabold text-white">36 + FCT</div>
            <div className="text-[10px] text-slate-400 font-medium">State Coverage</div>
          </div>
          <div className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
            <div className="text-base sm:text-lg font-extrabold text-[#16b8e8]">1,480</div>
            <div className="text-[10px] text-slate-400 font-medium">Active Audits</div>
          </div>
          <div className="p-2 rounded-xl bg-[#091b2c] border border-[#122b44]">
            <div className="text-base sm:text-lg font-extrabold text-[#00c878]">24/7</div>
            <div className="text-[10px] text-slate-400 font-medium">Live Telemetry</div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: SELECTED BRANCH DETAILS & PROFILE CARD ────────────── */}
      <div className="lg:col-span-5 dark:bg-[#081829] bg-white rounded-2xl p-5 dark:border-[#122c48] border-[#c0dbc9] border space-y-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#122c48] pb-3">
            <div>
              <div className="text-[10px] font-mono text-[#00c878] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c878] animate-pulse" />
                SELECTED TELEMETRY NODE
              </div>
              <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2 mt-0.5">
                {activeBranch.name}
                <span className="text-sm">🇳🇬</span>
              </h3>
              <p className="text-xs text-slate-400 truncate">{activeBranch.address}</p>
            </div>
          </div>

          {/* Building Photo Image Container */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden mt-3 border border-[#122c48]">
            <img
              src="/nsitf-hq-building.jpg"
              alt="NSITF Facility Building"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081829] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-300 font-bold bg-[#071727]/90 px-2.5 py-1 rounded border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c878] animate-pulse" />
              {activeBranch.type.replace('_', ' ')} • {activeBranch.code}
            </div>
          </div>

          {/* 2x2 Operational Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
              <div className="text-[10px] text-slate-400 font-mono">Attendance Rate</div>
              <div className="text-lg font-extrabold text-[#00c878] mt-0.5 font-mono">{activeBranch.attendanceRate}%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Live Clock-In Streams</div>
            </div>

            <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
              <div className="text-[10px] text-slate-400 font-mono">Productivity Index</div>
              <div className="text-lg font-extrabold text-amber-400 mt-0.5 font-mono">{activeBranch.productivityIndex} / 100</div>
              <div className="text-[10px] text-slate-400 mt-0.5">SLA Efficiency</div>
            </div>

            <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
              <div className="text-[10px] text-slate-400 font-mono">Claims Turnaround SLA</div>
              <div className="text-lg font-extrabold text-[#16b8e8] mt-0.5 font-mono">{activeBranch.claimsSlaCompliance}%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">ECA Benefit Claims</div>
            </div>

            <div className="p-3 rounded-xl bg-[#061424] border border-[#122c48]">
              <div className="text-[10px] text-slate-400 font-mono">Active ECA Audits</div>
              <div className="text-lg font-extrabold text-purple-400 mt-0.5 font-mono">{activeBranch.activeAuditsCount}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Employer Sites</div>
            </div>
          </div>

          {/* Head of Directorate Row */}
          <div className="mt-4 p-3 rounded-xl bg-[#061424] border border-[#122c48] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Branch / Regional Manager</div>
              <div className="text-xs font-bold text-white mt-0.5">{activeBranch.managerName}</div>
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
          Inspect {activeBranch.city} Geofenced Telemetry
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
