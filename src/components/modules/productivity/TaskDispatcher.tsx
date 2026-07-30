import React, { useState } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { Zap, X, Building2, User, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { OperationalTask } from '../../../types';

export const TaskDispatcher: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addNewTask, branches, staffList } = useTelemetry();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<OperationalTask['category']>('EMPLOYER_AUDIT');
  const [priority, setPriority] = useState<OperationalTask['priority']>('HIGH');
  const [targetCompany, setTargetCompany] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [assignedStaffId, setAssignedStaffId] = useState(staffList[0].id);

  if (!isOpen) return null;

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedStaff = staffList.find((s) => s.id === assignedStaffId) || staffList[0];
    const assignedBranch = branches.find((b) => b.id === assignedStaff.branchId) || branches[0];

    addNewTask({
      title,
      category,
      assignedToName: assignedStaff.fullName,
      assignedToStaffId: assignedStaff.staffId,
      branchName: assignedBranch.name,
      zone: assignedBranch.zone,
      priority,
      status: 'IN_PROGRESS',
      slaHoursLeft: priority === 'CRITICAL' ? 12 : 48,
      completionPercentage: 0,
      targetCompany: targetCompany || undefined,
      claimAmountNaira: claimAmount ? parseFloat(claimAmount) : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-nsitf-gold-500/40 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-nsitf-gold-500/20 border border-nsitf-gold-500/40 text-nsitf-gold-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Dispatch Operational Duty Task</h3>
              <p className="text-xs text-slate-400">Assign ECA Audit, Safety Inspection or Claims SLA</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleDispatch} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Task Title / Mission Objective</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ECA Audit: Dangote Fertilizers Limited"
              className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-nsitf-gold-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Duty Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-nsitf-gold-400"
              >
                <option value="EMPLOYER_AUDIT">ECA Employer Audit</option>
                <option value="COMPENSATION_CLAIM">Compensation Claim</option>
                <option value="SAFETY_INSPECTION">Safety Risk Audit</option>
                <option value="BENEFICIARY_VERIFY">Beneficiary Verification</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">SLA Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-nsitf-gold-400"
              >
                <option value="CRITICAL">🔥 CRITICAL (12h SLA)</option>
                <option value="HIGH">⚡ HIGH (24h SLA)</option>
                <option value="MEDIUM">🟢 MEDIUM (48h SLA)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Target Entity / Company</label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Julius Berger Nigeria Plc"
                className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-nsitf-gold-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Claim Amount (₦ Naira)</label>
              <input
                type="number"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                placeholder="e.g. 25000000"
                className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-nsitf-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Assign Lead Officer</label>
            <select
              value={assignedStaffId}
              onChange={(e) => setAssignedStaffId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-nsitf-gold-400"
            >
              {staffList.map((s) => (
                <option key={s.id} value={s.id}>
                  👤 {s.fullName} ({s.rank} • {s.branchName})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-nsitf-gold-600 to-nsitf-gold-500 hover:from-nsitf-gold-500 text-slate-950 text-xs font-bold shadow-glow-gold transition"
          >
            Dispatch Task & Initiate SLA Timer
          </button>
        </form>
      </div>
    </div>
  );
};
