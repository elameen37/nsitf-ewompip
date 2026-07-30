import React, { useState } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { Zap, Plus, Clock, CheckCircle2, AlertTriangle, Building2, User, ChevronRight, ShieldCheck, DollarSign } from 'lucide-react';
import { TaskDispatcher } from './TaskDispatcher';

export const ProductivityModule: React.FC = () => {
  const { filteredTasks, updateTaskStatus, selectedZone, selectedState, isFiltered } = useTelemetry();
  const [isDispatcherOpen, setIsDispatcherOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredTasks2 = filteredTasks.filter((t) => categoryFilter === 'ALL' || t.category === categoryFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-5 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nsitf-gold-400 font-semibold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            NSITF Operational SLA Dispatcher
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
            Workforce Productivity & SLA Task Dispatcher
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time management for ECA audits, industrial safety dispatches & compensation claims
          </p>
        </div>

        <button
          onClick={() => setIsDispatcherOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-nsitf-gold-600 to-nsitf-gold-500 hover:from-nsitf-gold-500 text-slate-950 font-bold text-xs shadow-glow-gold transition"
        >
          <Plus className="w-4 h-4" />
          Dispatch New Task
        </button>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        {['ALL', 'EMPLOYER_AUDIT', 'COMPENSATION_CLAIM', 'SAFETY_INSPECTION', 'BENEFICIARY_VERIFY'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-nsitf-gold-500 text-slate-950 shadow-glow-gold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'ALL' ? 'All Operational Duties' : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks2.map((task) => (
          <div
            key={task.id}
            className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-nsitf-gold-500/40 transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-nsitf-gold-500/10 text-nsitf-gold-300 border border-nsitf-gold-500/30">
                    {task.taskNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                      task.priority === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{task.slaHoursLeft}h SLA Left</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">{task.title}</h3>
              {task.targetCompany && (
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{task.targetCompany}</span>
                </div>
              )}

              {task.claimAmountNaira && (
                <div className="mt-2 text-xs font-mono text-nsitf-gold-400 font-bold">
                  Value: ₦{task.claimAmountNaira.toLocaleString()}
                </div>
              )}

              {/* Officer & Branch */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <div>
                    <div className="font-semibold text-slate-200">{task.assignedToName}</div>
                    <div className="text-[10px] text-slate-500">{task.branchName}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{task.zone.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Progress Bar & Actions */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Progress Index</span>
                  <span className="font-bold text-white">{task.completionPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-nsitf-green-500 to-nsitf-gold-500 transition-all duration-300"
                    style={{ width: `${task.completionPercentage}%` }}
                  />
                </div>
              </div>

              {task.status !== 'COMPLETED' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS', Math.min(task.completionPercentage + 25, 90))}
                    className="flex-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  >
                    + Progress Task
                  </button>
                  <button
                    onClick={() => updateTaskStatus(task.id, 'COMPLETED', 100)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-glow-green transition"
                  >
                    Mark Done
                  </button>
                </div>
              ) : (
                <div className="py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold text-center border border-emerald-500/30 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Mission Objective Completed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TaskDispatcher isOpen={isDispatcherOpen} onClose={() => setIsDispatcherOpen(false)} />
    </div>
  );
};
