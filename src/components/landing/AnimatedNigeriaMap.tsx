import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, ShieldCheck, Activity, Compass, Users, MapPin, Zap } from 'lucide-react';

interface TelemetryNode {
  id: string;
  name: string;
  code: string;
  zone: string;
  top: string;
  left: string;
  attendance: number;
  sla: number;
  staff: number;
  type: 'HQ' | 'REGIONAL' | 'STATE';
}

const TELEMETRY_NODES: TelemetryNode[] = [
  { id: 'hq-abj', name: 'Abuja Federal HQ', code: 'NSITF-HQ-01', zone: 'North-Central', top: '46%', left: '42%', attendance: 97.4, sla: 96.8, staff: 1420, type: 'HQ' },
  { id: 'reg-lag', name: 'Lagos Directorate', code: 'NSITF-REG-LAG', zone: 'South-West', top: '69%', left: '13%', attendance: 95.8, sla: 94.2, staff: 980, type: 'REGIONAL' },
  { id: 'reg-kan', name: 'Kano Directorate', code: 'NSITF-REG-KAN', zone: 'North-West', top: '23%', left: '48%', attendance: 94.2, sla: 92.5, staff: 760, type: 'REGIONAL' },
  { id: 'reg-ph', name: 'Port Harcourt Directorate', code: 'NSITF-REG-PH', zone: 'South-South', top: '80%', left: '42%', attendance: 96.1, sla: 95.0, staff: 850, type: 'REGIONAL' },
  { id: 'reg-enu', name: 'Enugu Directorate', code: 'NSITF-REG-ENU', zone: 'South-East', top: '65%', left: '45%', attendance: 93.9, sla: 91.8, staff: 640, type: 'REGIONAL' },
  { id: 'reg-mai', name: 'Maiduguri Directorate', code: 'NSITF-REG-MAI', zone: 'North-East', top: '25%', left: '80%', attendance: 91.5, sla: 89.2, staff: 520, type: 'REGIONAL' },
  { id: 'st-sok', name: 'Sokoto State Directorate', code: 'NSITF-ST-SOK', zone: 'North-West', top: '15%', left: '26%', attendance: 94.3, sla: 91.7, staff: 430, type: 'STATE' },
  { id: 'st-ben', name: 'Benin City Directorate', code: 'NSITF-ST-BEN', zone: 'South-South', top: '68%', left: '29%', attendance: 93.9, sla: 86.2, staff: 490, type: 'STATE' },
];

export const AnimatedNigeriaMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<TelemetryNode>(TELEMETRY_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<TelemetryNode | null>(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-[#081829]/90 via-[#05111e]/95 to-[#030a14] border border-[#122c48] shadow-[0_0_50px_rgba(0,135,81,0.15)] overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#008751]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00c878]/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Radar Scanline Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #143252 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Map Card Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#122c48] pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00c878] animate-ping" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#00c878]" />
            NIGERIA GEOSPATIAL TELEMETRY RADAR
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-[#008751]/15 px-2.5 py-1 rounded-full border border-[#008751]/40">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00c878]" />
          <span>36 STATES + FCT SYNCED</span>
        </div>
      </div>

      {/* Main Interactive Map Container */}
      <div className="relative w-full aspect-square max-h-[460px] rounded-2xl bg-[#020912]/80 border border-[#10273f] p-3 flex items-center justify-center overflow-hidden">
        
        {/* Clean Vector Map Base Image */}
        <img
          src="/nigeria-map-clean.png"
          alt="Nigeria Geospatial Vector Boundaries"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none p-3"
          style={{ filter: 'drop-shadow(0 0 15px rgba(0,200,120,0.2))' }}
        />

        {/* Dynamic Beam Connection Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {TELEMETRY_NODES.filter(n => n.id !== 'hq-abj').map((node) => (
            <motion.line
              key={`line-${node.id}`}
              x1="42%"
              y1="46%"
              x2={node.left}
              y2={node.top}
              stroke="#00c878"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.35"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </svg>

        {/* Telemetry Nodes & Pulse Markers */}
        {TELEMETRY_NODES.map((node) => {
          const isHQ = node.type === 'HQ';
          const isSelected = activeNode.id === node.id;
          const isHovered = hoveredNode?.id === node.id;
          const showCard = isSelected || isHovered;

          return (
            <div
              key={node.id}
              className="absolute z-20"
              style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
            >
              <button
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="relative flex flex-col items-center group focus:outline-none"
              >
                {/* Ping Ring */}
                <span
                  className={`absolute rounded-full animate-ping opacity-60 ${
                    isHQ ? 'w-8 h-8 bg-[#00c878]' : 'w-5 h-5 bg-[#16b8e8]'
                  }`}
                />

                {/* Main Node Point */}
                <div
                  className={`rounded-full border-2 border-[#020912] flex items-center justify-center transition-all duration-200 shadow-xl ${
                    isHQ
                      ? 'w-5 h-5 bg-[#00c878] ring-4 ring-[#00c878]/40 scale-110'
                      : 'w-3.5 h-3.5 bg-[#16b8e8]'
                  } ${isSelected ? 'scale-150 ring-4 ring-white' : 'group-hover:scale-135'}`}
                >
                  {isHQ && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </div>

                {/* City Label Badge */}
                <span className="mt-1 text-[8.5px] font-mono font-black text-white bg-[#071727]/90 px-1.5 py-0.5 rounded border border-[#143252] shadow whitespace-nowrap">
                  {node.name.split(' ')[0]}
                </span>

                {/* Hover/Active Telemetry Badge */}
                {showCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none z-30 min-w-[200px]"
                  >
                    <div className="p-3 rounded-xl bg-[#061626]/98 border border-[#00c878]/40 text-white shadow-2xl space-y-1.5 backdrop-blur-xl">
                      <div className="flex items-center justify-between border-b border-[#122c48] pb-1">
                        <span className="font-extrabold text-[11px] text-emerald-300">{node.name}</span>
                        <span className="text-[9px] font-mono text-slate-400">{node.code}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-300">
                        <div>Staff: <strong className="text-white">{node.staff}</strong></div>
                        <div>Attendance: <strong className="text-[#00c878]">{node.attendance}%</strong></div>
                        <div>SLA: <strong className="text-[#16b8e8]">{node.sla}%</strong></div>
                        <div>Status: <strong className="text-emerald-400">ACTIVE</strong></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Node Summary Banner */}
      <div className="relative z-10 mt-4 p-3.5 rounded-2xl bg-[#061424] border border-[#122c48] flex items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#008751]/20 border border-[#008751]/40 flex items-center justify-center text-[#00c878]">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Selected Directorate Telemetry</div>
            <div className="text-sm font-black text-white">{activeNode.name} • <span className="text-[#00c878]">{activeNode.attendance}% Attendance</span></div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-right">
          <div>
            <div className="text-[10px] text-slate-400">SLA Compliance</div>
            <div className="text-sm font-black text-[#16b8e8]">{activeNode.sla}%</div>
          </div>
        </div>
      </div>

    </div>
  );
};
