import React, { useState } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { Radio, Search, Filter, ShieldCheck, MapPin, Clock, AlertTriangle, UserCheck, Smartphone } from 'lucide-react';
import { AttendanceRecord } from '../../../types';
import { GeofenceClockInModal } from './GeofenceClockInModal';

export const AttendanceModule: React.FC = () => {
  const { filteredAttendanceLogs, setIsClockInModalOpen, selectedZone, selectedState, isFiltered } = useTelemetry();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VERIFIED_ON_SITE' | 'REMOTE_FIELD_APPROVED' | 'GEOFENCE_VIOLATION'>('ALL');

  const filteredLogs = filteredAttendanceLogs.filter((log) => {
    const matchesSearch =
      log.staffName.toLowerCase().includes(search.toLowerCase()) ||
      log.staffId.toLowerCase().includes(search.toLowerCase()) ||
      log.branchName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || log.geofenceStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-5 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            <Radio className="w-4 h-4 animate-pulse" />
            NSITF National Telemetry Radar
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
            Geofenced Attendance & Telemetry Station
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Dynamic Encrypted QR Code & GPS location validation stream
          </p>
        </div>

        <button
          onClick={() => setIsClockInModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-nsitf-green-700 to-nsitf-green-600 hover:from-nsitf-green-600 text-white font-bold text-xs shadow-glow-green border border-nsitf-green-400/40 transition"
        >
          <Clock className="w-4 h-4 text-nsitf-gold-300" />
          Launch Geofence Clock-In
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Clocked-In Officers</div>
            <div className="text-2xl font-extrabold text-white mt-1 font-mono">1,842</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">95.4% Nationwide Rate</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">On-Site Verified</div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">1,788</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Within 50m geofence</div>
          </div>
          <div className="p-3 rounded-xl bg-nsitf-green-500/10 text-nsitf-green-400 border border-nsitf-green-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Remote Field Duties</div>
            <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">54</div>
            <div className="text-[10px] text-slate-400 mt-0.5">ECA Site Audits</div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Geofence Flags</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1 font-mono">3</div>
            <div className="text-[10px] text-amber-300 mt-0.5">Under Manager Review</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search officer name, staff ID, or branch..."
            className="w-full bg-slate-900 border border-slate-800 text-xs text-white pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-nsitf-green-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl transition ${
              statusFilter === 'ALL'
                ? 'bg-nsitf-green-700 text-white font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            All Logs
          </button>

          <button
            onClick={() => setStatusFilter('VERIFIED_ON_SITE')}
            className={`px-3 py-1.5 rounded-xl transition ${
              statusFilter === 'VERIFIED_ON_SITE'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            On-Site Verified
          </button>

          <button
            onClick={() => setStatusFilter('REMOTE_FIELD_APPROVED')}
            className={`px-3 py-1.5 rounded-xl transition ${
              statusFilter === 'REMOTE_FIELD_APPROVED'
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Field Duty
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Data Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            Live Telemetry Log ({filteredLogs.length})
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            AUTO-SYNC: 500ms
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-4 sm:px-6 py-3">Officer & Grade</th>
                <th className="px-4 sm:px-6 py-3">Target Branch</th>
                <th className="px-4 sm:px-6 py-3">Clock-In Time</th>
                <th className="px-4 sm:px-6 py-3">Verification</th>
                <th className="px-4 sm:px-6 py-3">Geofence Status</th>
                <th className="px-4 sm:px-6 py-3">GPS Dist.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition">
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="font-bold text-white">{log.staffName}</div>
                    <div className="text-[10px] font-mono text-nsitf-gold-400">{log.staffId} • {log.gradeLevel}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="font-semibold text-slate-200">{log.branchName}</div>
                    <div className="text-[10px] text-slate-400">{log.department}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-400 font-semibold">
                    {new Date(log.clockInTime).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                      {log.verificationMethod.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 w-fit border ${
                        log.geofenceStatus === 'VERIFIED_ON_SITE'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : log.geofenceStatus === 'REMOTE_FIELD_APPROVED'
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                          : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      {log.geofenceStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">
                    {log.distanceFromOfficeMeters} meters from radius
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <GeofenceClockInModal />
    </div>
  );
};
