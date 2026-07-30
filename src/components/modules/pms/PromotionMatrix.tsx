import React from 'react';
import { Award, CheckCircle2, AlertCircle, ArrowUpRight, GraduationCap } from 'lucide-react';
import { useTelemetry } from '../../../context/TelemetryContext';

export const PromotionMatrix: React.FC = () => {
  const { pmsAppraisals } = useTelemetry();

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-nsitf-gold-400" />
            2026 Civil Service Promotion Eligibility Matrix
          </h3>
          <p className="text-xs text-slate-400">Automated Grade Level elevation calculator based on 3-year performance score</p>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
          GL 12 - GL 17 Benchmark Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pmsAppraisals.map((appraisal) => (
          <div
            key={appraisal.id}
            className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{appraisal.appraisalPeriod}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-nsitf-gold-500/20 text-nsitf-gold-300 border border-nsitf-gold-500/30">
                  {appraisal.finalGrade.replace(/_/g, ' ')}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">{appraisal.staffName}</h4>
              <div className="text-xs text-slate-400 mt-0.5">
                {appraisal.gradeLevel} • {appraisal.department} ({appraisal.branchName})
              </div>

              {/* Scores Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center font-mono">
                <div>
                  <div className="text-[9px] text-slate-500">Self Score</div>
                  <div className="text-sm font-bold text-white mt-0.5">{appraisal.selfScore}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500">Supervisor</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{appraisal.supervisorScore}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500">OKR Rate</div>
                  <div className="text-sm font-bold text-nsitf-gold-400 mt-0.5">{appraisal.okrCompletionRate}%</div>
                </div>
              </div>

              {/* Accomplishments */}
              <div className="mt-3 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 font-semibold">Key Achievements</div>
                {appraisal.keyAccomplishments.map((acc, idx) => (
                  <div key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{acc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Training recommendations & Eligibility button */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="text-[10px] text-cyan-300 bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/20 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{appraisal.trainingRecommendations[0]}</span>
              </div>

              <button className="w-full py-2 rounded-xl bg-nsitf-green-700 hover:bg-nsitf-green-600 text-white text-xs font-bold shadow-glow-green border border-nsitf-green-400/30 transition flex items-center justify-center gap-1.5">
                <span>Recommend for Grade Level Elevation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
