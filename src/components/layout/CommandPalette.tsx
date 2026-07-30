import React, { useState, useEffect } from 'react';
import { useTelemetry, MainTab } from '../../context/TelemetryContext';
import { Search, X, Building2, User, Zap, Radio, Target, BrainCircuit } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setActiveTab,
    branches,
    staffList,
    tasks,
  } = useTelemetry();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()) || b.state.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStaff = staffList.filter((s) =>
    s.fullName.toLowerCase().includes(query.toLowerCase()) || s.staffId.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) || t.taskNumber.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (tab: MainTab) => {
    setActiveTab(tab);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-nsitf-green-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-nsitf-green-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search offices, officers, ECA tasks..."
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500"
            autoFocus
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Navigation Commands */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2 mb-1.5">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => navigateTo('dashboard')}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/50 hover:bg-nsitf-green-900/40 hover:border-nsitf-green-500/30 border border-slate-800 text-slate-200 transition text-left"
              >
                <BrainCircuit className="w-4 h-4 text-nsitf-gold-400" />
                <span>Executive Command</span>
              </button>
              <button
                onClick={() => navigateTo('attendance')}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/50 hover:bg-nsitf-green-900/40 hover:border-nsitf-green-500/30 border border-slate-800 text-slate-200 transition text-left"
              >
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Geofenced Telemetry</span>
              </button>
              <button
                onClick={() => navigateTo('productivity')}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/50 hover:bg-nsitf-green-900/40 hover:border-nsitf-green-500/30 border border-slate-800 text-slate-200 transition text-left"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Productivity & SLA Tasks</span>
              </button>
              <button
                onClick={() => navigateTo('pms')}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/50 hover:bg-nsitf-green-900/40 hover:border-nsitf-green-500/30 border border-slate-800 text-slate-200 transition text-left"
              >
                <Target className="w-4 h-4 text-amber-400" />
                <span>PMS & Appraisal Engine</span>
              </button>
            </div>
          </div>

          {/* Offices / Branches */}
          {filteredBranches.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2 mb-1.5">
                NSITF Offices & Branches ({filteredBranches.length})
              </div>
              <div className="space-y-1">
                {filteredBranches.slice(0, 3).map((b) => (
                  <div
                    key={b.id}
                    onClick={() => navigateTo('hierarchy')}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 text-slate-200 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-nsitf-green-400" />
                      <div>
                        <div className="font-semibold text-slate-100">{b.name}</div>
                        <div className="text-[10px] text-slate-400">{b.state} • {b.staffCount} Officers</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {b.attendanceRate}% Attendance
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Officers */}
          {filteredStaff.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2 mb-1.5">
                Civil Service Officers ({filteredStaff.length})
              </div>
              <div className="space-y-1">
                {filteredStaff.slice(0, 3).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => navigateTo('pms')}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 text-slate-200 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-nsitf-gold-400" />
                      <div>
                        <div className="font-semibold text-slate-100">{s.fullName}</div>
                        <div className="text-[10px] text-slate-400">{s.rank} • {s.gradeLevel}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-300">{s.staffId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950/80 text-[10px] text-slate-400 flex items-center justify-between font-mono">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
