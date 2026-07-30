import React from 'react';
import { Target, Award, CheckCircle2, Plus, FileText, TrendingUp, Sparkles } from 'lucide-react';
import { GoalCascade } from './GoalCascade';
import { PromotionMatrix } from './PromotionMatrix';
import { useTelemetry } from '../../../context/TelemetryContext';

export const AppraisalModule: React.FC = () => {
  const { filteredPmsAppraisals: pmsAppraisals, isFiltered, selectedZone, selectedState } = useTelemetry();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-5 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nsitf-gold-400 font-semibold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            NSITF Performance Management System (PMS)
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
            360° Employee Appraisal & OKR Alignment Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Civil Service grade-level appraisals (GL 03 to GL 17) & automated promotion calculations
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-nsitf-green-700 to-nsitf-green-600 hover:from-nsitf-green-600 text-white font-bold text-xs shadow-glow-green border border-nsitf-green-400/40 transition">
          <Plus className="w-4 h-4 text-nsitf-gold-300" />
          Initiate New Self-Appraisal
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Completed Appraisals</div>
            <div className="text-2xl font-extrabold text-white mt-1 font-mono">1,420</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">92.4% Submission Rate</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Promotion Eligible Staff</div>
            <div className="text-2xl font-extrabold text-nsitf-gold-400 mt-1 font-mono">184</div>
            <div className="text-[10px] text-nsitf-gold-300 mt-0.5">3-Year High Score Benchmark</div>
          </div>
          <div className="p-3 rounded-xl bg-nsitf-gold-500/10 text-nsitf-gold-400 border border-nsitf-gold-500/30">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Average OKR Score</div>
            <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">91.8%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Civil Service Standard</div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Goal Cascade & Promotion Matrix */}
      <GoalCascade />
      <PromotionMatrix />
    </div>
  );
};
