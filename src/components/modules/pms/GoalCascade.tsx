import React from 'react';
import { Target, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const GoalCascade: React.FC = () => {
  const okrs = [
    {
      level: '1. Executive Policy OKR (Director-General)',
      title: 'Achieve 98% Nationwide Employer ECA Compliance & Coverage across 36 States + FCT',
      target: '100% Target',
      progress: 94,
      status: 'ON_TRACK',
    },
    {
      level: '2. Directorate Objective (Compensation & Claims Directorate)',
      title: 'Reduce Injury Benefit Turnaround SLA from 14 Days to Under 7 Days Nationwide',
      target: '7.0 Days Baseline',
      progress: 88,
      status: 'ON_TRACK',
    },
    {
      level: '3. Regional Operational Goal (Lagos & South-South Zones)',
      title: 'Complete 1,000 High-Risk Offshore Oil Rig & Manufacturing Safety Audits',
      target: '1,000 Audits',
      progress: 92,
      status: 'ON_TRACK',
    },
    {
      level: '4. Officer Key Result (GL 12 Senior Field Inspector)',
      title: 'Audit 50 Employer Establishments & Inspect Safety Signage Protocols',
      target: '50 Inspections',
      progress: 96,
      status: 'EXCEEDED',
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Target className="w-5 h-5 text-nsitf-gold-400" />
          OKR & Policy Goal Cascade Architecture
        </h3>
        <p className="text-xs text-slate-400">Alignment from Federal Policy down to Branch Field Inspectors</p>
      </div>

      <div className="space-y-3">
        {okrs.map((okr, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-xl">
              <div className="text-[10px] font-mono font-bold text-nsitf-gold-400 uppercase">{okr.level}</div>
              <h4 className="text-xs font-bold text-white leading-snug">{okr.title}</h4>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">Achievement</div>
                <div className="font-mono font-extrabold text-emerald-400 text-sm">{okr.progress}%</div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {okr.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
