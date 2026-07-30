import React from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { Building2, Users, MapPin, ShieldCheck, ChevronRight, Award } from 'lucide-react';

export const OrganizationalHierarchy: React.FC = () => {
  const { filteredBranches: branches, filteredStaff: staffList, isFiltered, selectedZone, selectedState } = useTelemetry();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nsitf-green-400 font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            Federal Civil Service Structure
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
            NSITF Organizational Network & Directorate Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Hierarchical breakdown across HQ, 6 Regional Offices, and 36 State Directorates + FCT
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-nsitf-gold-400 font-bold bg-nsitf-gold-500/10 px-3 py-1.5 rounded-xl border border-nsitf-gold-500/30">
          <Building2 className="w-4 h-4" />
          50+ Offices Nationwide
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-nsitf-green-500/40 transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-nsitf-green-500/10 text-nsitf-green-300 border border-nsitf-green-500/30">
                  {branch.code}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{branch.zone.replace('_', ' ')}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{branch.name}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span>{branch.address}</span>
              </p>

              <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Head of Office / Director</div>
                <div className="font-semibold text-white">{branch.managerName}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{branch.staffCount} Officers</span>
              </div>
              <span className="text-emerald-400 font-bold">{branch.attendanceRate}% Attendance</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
