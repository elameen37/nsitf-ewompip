import React, { useState } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { BrainCircuit, Sparkles, AlertTriangle, CheckCircle2, Cpu, Zap, ArrowRight, RefreshCw, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const AIAnalyticsModule: React.FC = () => {
  const { aiAlerts, resolveAIAlert, setIsCopilotOpen } = useTelemetry();
  const [analyzing, setAnalyzing] = useState(false);

  const predictiveTrend = [
    { week: 'Wk 1', BurnoutRisk: 14, SLAEfficiency: 94 },
    { week: 'Wk 2', BurnoutRisk: 18, SLAEfficiency: 92 },
    { week: 'Wk 3', BurnoutRisk: 26, SLAEfficiency: 88 },
    { week: 'Wk 4', BurnoutRisk: 34, SLAEfficiency: 85 },
    { week: 'Wk 5 (AI Optim)', BurnoutRisk: 12, SLAEfficiency: 96 },
  ];

  const reAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-5 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nsitf-gold-400 font-semibold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4" />
            NSITF Vector Intelligence & Neural Analytics
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
            AI-Powered Workforce Analytics & Predictive Models
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            OpenAI & Vector Search engine for workforce optimization, attrition risk & SLA bottleneck detection
          </p>
        </div>

        <button
          onClick={reAnalyze}
          disabled={analyzing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-nsitf-gold-500/40 text-nsitf-gold-300 font-bold text-xs shadow-glow-gold transition"
        >
          <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
          {analyzing ? 'Re-Clustering Vectors...' : 'Run Real-Time AI Simulation'}
        </button>
      </div>

      {/* Grid: Predictive Chart & AI Recommendation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Burnout vs SLA Impact Chart */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-nsitf-gold-400" />
                Predictive Workload Burnout vs. SLA Efficiency
              </h3>
              <p className="text-xs text-slate-400">Simulation showing impact of AI-driven staff rebalancing</p>
            </div>
            <span className="text-[10px] font-mono text-nsitf-gold-400 bg-nsitf-gold-500/10 px-2 py-1 rounded border border-nsitf-gold-500/30">
              Neural Forecast
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictiveTrend}>
                <defs>
                  <linearGradient id="colorBurnout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSLA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00a859" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00a859" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#d4af37',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Area type="monotone" dataKey="BurnoutRisk" stroke="#f43f5e" fillOpacity={1} fill="url(#colorBurnout)" name="Burnout Risk Index %" />
                <Area type="monotone" dataKey="SLAEfficiency" stroke="#00a859" fillOpacity={1} fill="url(#colorSLA)" name="SLA Turnaround Efficiency %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations Action Card */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-nsitf-gold-400 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <h3 className="text-base font-bold text-white">AI Resource Optimizer</h3>
                <p className="text-xs text-slate-400">Automated staff distribution engine</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Recommendation #1</div>
                <div className="font-bold text-white">Reallocate 4 Senior Inspectors (Enugu → PH)</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Port Harcourt claims queue is experiencing a +18.4% delay spike. Enugu office currently has +24% surplus capacity.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-nsitf-gold-400 font-bold uppercase">Recommendation #2</div>
                <div className="font-bold text-white">Cap Lagos ECA Field Hours at 45h / Week</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Prevent field inspector burnout by rotating Dangote Refinery audit teams with Ibadan state officers.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCopilotOpen(true)}
            className="w-full py-2.5 rounded-xl bg-nsitf-gold-500 hover:bg-nsitf-gold-400 text-slate-950 font-bold text-xs shadow-glow-gold transition flex items-center justify-center gap-2"
          >
            <span>Ask Copilot to Generate Full Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
