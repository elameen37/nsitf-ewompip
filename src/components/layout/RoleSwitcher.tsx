import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { UserRole } from '../../types';
import { UserCheck, ShieldAlert, Award, Briefcase, Building2, ChevronDown } from 'lucide-react';

const ROLES_CONFIG: { role: UserRole; label: string; grade: string; badge: string }[] = [
  {
    role: 'DIRECTOR_GENERAL',
    label: 'Director-General / CEO',
    grade: 'GL 17 Executive',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    role: 'REGIONAL_DIRECTOR',
    label: 'Regional Director',
    grade: 'GL 17 Regional',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    role: 'BRANCH_MANAGER',
    label: 'State Branch Head',
    grade: 'GL 15 Manager',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  {
    role: 'HR_ADMIN',
    label: 'HR & PMS Admin',
    grade: 'GL 16 HR Lead',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  {
    role: 'FIELD_OFFICER',
    label: 'Field Inspector',
    grade: 'GL 12 ECA Auditor',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
];

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole } = useTelemetry();
  const [isOpen, setIsOpen] = useState(false);

  const activeConfig = ROLES_CONFIG.find((r) => r.role === currentRole) || ROLES_CONFIG[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-nsitf-green-500/50 transition text-xs font-medium"
      >
        <UserCheck className="w-4 h-4 text-nsitf-gold-400" />
        <div className="text-left hidden xl:block">
          <div className="text-[11px] text-slate-200 font-semibold leading-none">{activeConfig.label}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">{activeConfig.grade}</div>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${activeConfig.badge}`}>
          {activeConfig.role.replace('_', ' ')}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel p-2 shadow-2xl z-50 border border-nsitf-green-500/30 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-semibold text-slate-400 border-b border-slate-800">
            Switch Executive Persona View
          </div>
          <div className="mt-1 space-y-1">
            {ROLES_CONFIG.map((r) => {
              const isSelected = r.role === currentRole;
              return (
                <button
                  key={r.role}
                  onClick={() => {
                    setCurrentRole(r.role);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition ${
                    isSelected
                      ? 'bg-nsitf-green-900/60 text-white font-medium border border-nsitf-green-500/40'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">{r.label}</span>
                    <span className="text-[10px] text-slate-400">{r.grade}</span>
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-nsitf-gold-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
