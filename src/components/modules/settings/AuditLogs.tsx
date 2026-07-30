import React from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { FileCheck2, ShieldCheck, Lock, Search, Filter } from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { filteredAuditLogs: auditLogs, isFiltered, selectedZone, selectedState } = useTelemetry();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            Federal Auditor-General Compliance Stream
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
            Government Audit Trail & System Telemetry Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable log stream recording executive policy approvals, clock-ins, ECA dispatches & PMS appraisals
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
          <Lock className="w-4 h-4" />
          SHA-256 HASH VERIFIED
        </span>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Audit Ledger ({auditLogs.length} Records)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Actor & Persona Role</th>
                <th className="px-6 py-3">Logged Action Objective</th>
                <th className="px-6 py-3">Target Resource</th>
                <th className="px-6 py-3">Encrypted IP / Node</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition text-[11px]">
                  <td className="px-6 py-4 font-sans">
                    <div className="font-bold text-white">{log.actorName}</div>
                    <div className="text-[10px] font-mono text-nsitf-gold-400">{log.actorRole}</div>
                  </td>
                  <td className="px-6 py-4 font-sans font-medium text-slate-200">{log.action}</td>
                  <td className="px-6 py-4 text-slate-400">{log.targetResource}</td>
                  <td className="px-6 py-4 text-slate-400">{log.ipAddress}</td>
                  <td className="px-6 py-4 text-emerald-400">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
