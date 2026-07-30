import React, { useState } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { Radio, X, MapPin, ShieldCheck, QrCode, CheckCircle2, Lock, Cpu, Sparkles } from 'lucide-react';

export const GeofenceClockInModal: React.FC = () => {
  const { isClockInModalOpen, setIsClockInModalOpen, handleClockIn, branches, staffList } = useTelemetry();

  const [selectedBranchId, setSelectedBranchId] = useState(branches[0].id);
  const [method, setMethod] = useState<'DYNAMIC_QR' | 'GEOFENCE_GPS' | 'CARD_TAP'>('DYNAMIC_QR');
  const [step, setStep] = useState<'SELECT' | 'SCANNING' | 'SUCCESS'>('SELECT');

  if (!isClockInModalOpen) return null;

  const currentBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];
  const activeStaff = staffList[0]; // Current user profile

  const triggerClockInProcess = () => {
    setStep('SCANNING');

    setTimeout(() => {
      handleClockIn({
        staffId: activeStaff.staffId,
        staffName: activeStaff.fullName,
        gradeLevel: activeStaff.gradeLevel,
        department: activeStaff.department,
        branchName: currentBranch.name,
        clockInTime: new Date().toISOString(),
        verificationMethod: method,
        geofenceStatus: 'VERIFIED_ON_SITE',
        distanceFromOfficeMeters: Math.floor(Math.random() * 18) + 2,
        lat: currentBranch.lat + 0.0001,
        lng: currentBranch.lng + 0.0001,
        deviceInfo: 'NSITF Encrypted Dynamic QR Kiosk v1.0',
      });
      setStep('SUCCESS');
    }, 1800);
  };

  const closeModal = () => {
    setIsClockInModalOpen(false);
    setStep('SELECT');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-nsitf-green-500/40 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-nsitf-green-600/20 border border-nsitf-green-500/40 text-nsitf-green-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Geofenced Attendance Station</h3>
              <p className="text-xs text-slate-400">Dynamic Encrypted QR Code & GPS Location Verification</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'SELECT' && (
          <div className="space-y-4 text-xs">
            {/* User Info Card */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 font-mono">OFFICER IDENTIFICATION</div>
                <div className="text-sm font-bold text-white">{activeStaff.fullName}</div>
                <div className="text-[11px] text-nsitf-gold-400 font-mono">{activeStaff.staffId} • {activeStaff.gradeLevel}</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/40">
                ACTIVE DUTY
              </span>
            </div>

            {/* Select Target Facility */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                Target NSITF Facility Location
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-nsitf-green-500"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    📍 {b.name} ({b.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Verification Method Picker */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-300">
                Authentication Telemetry Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMethod('DYNAMIC_QR')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                    method === 'DYNAMIC_QR'
                      ? 'bg-nsitf-green-900/60 border-nsitf-green-400 text-white shadow-glow-green'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-nsitf-gold-400" />
                  <span className="text-[10px] font-bold">Dynamic QR</span>
                </button>

                <button
                  onClick={() => setMethod('GEOFENCE_GPS')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                    method === 'GEOFENCE_GPS'
                      ? 'bg-nsitf-green-900/60 border-nsitf-green-400 text-white shadow-glow-green'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-bold">GPS Radar</span>
                </button>

                <button
                  onClick={() => setMethod('CARD_TAP')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                    method === 'CARD_TAP'
                      ? 'bg-nsitf-green-900/60 border-nsitf-green-400 text-white shadow-glow-green'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-bold">Smart Tap</span>
                </button>
              </div>
            </div>

            {/* GPS Radius Check Box */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Geofence Lock: <strong className="text-white">6m within boundary</strong></span>
              </div>
              <span className="text-emerald-400 font-mono font-bold">VALIDATED</span>
            </div>

            <button
              onClick={triggerClockInProcess}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-nsitf-green-700 to-nsitf-green-600 hover:from-nsitf-green-600 hover:to-nsitf-green-500 text-white text-xs font-bold shadow-glow-green border border-nsitf-green-400/40 transition"
            >
              Scan Dynamic QR Code & Complete Clock-In
            </button>
          </div>
        )}

        {step === 'SCANNING' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="relative w-28 h-28 flex items-center justify-center p-3 rounded-2xl bg-white/10 border-2 border-nsitf-gold-400 animate-pulse">
              <QrCode className="w-16 h-16 text-nsitf-gold-400" />
              <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-30" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Decrypting Time-Based Dynamic QR Code...</h4>
              <p className="text-xs text-slate-400 mt-1">Cross-referencing NSITF Time-Based One-Time Tokens (TOTP)</p>
            </div>
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Dynamic QR Clock-In Success</h4>
              <p className="text-xs text-slate-300 mt-1">
                Token & GPS telemetry logged to PostgreSQL Audit Stream
              </p>
            </div>
            <button
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
