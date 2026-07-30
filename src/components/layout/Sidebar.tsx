import React from 'react';
import { useTelemetry, MainTab } from '../../context/TelemetryContext';
import {
  LayoutDashboard,
  Radio,
  Zap,
  Target,
  BrainCircuit,
  Building2,
  FileCheck2,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  X
} from 'lucide-react';

const NAV_ITEMS: { tab: MainTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
  { tab: 'dashboard', label: 'Executive Command', icon: LayoutDashboard },
  { tab: 'attendance', label: 'Geofenced Attendance', icon: Radio, badge: 'LIVE' },
  { tab: 'productivity', label: 'Productivity & SLA Tasks', icon: Zap },
  { tab: 'pms', label: 'PMS & Appraisals', icon: Target },
  { tab: 'analytics', label: 'AI Intelligence Hub', icon: BrainCircuit, badge: 'AI' },
  { tab: 'hierarchy', label: 'Branch Network & Zones', icon: Building2 },
  { tab: 'audit_logs', label: 'Government Audit Logs', icon: FileCheck2 },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const { activeTab, setActiveTab, aiAlerts, setIsCopilotOpen } = useTelemetry();

  const handleSelectTab = (tab: MainTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      <div className="p-4 space-y-6">
        {/* Mobile Header Close Button */}
        {onCloseMobile && (
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 lg:hidden">
            <div className="flex items-center gap-2">
              <img src="/nsitf-logo.png" alt="NSITF Seal" className="w-7 h-7 object-contain" />
              <span className="text-xs font-bold text-white">NSITF Navigation</span>
            </div>
            <button onClick={onCloseMobile} className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Menu */}
        <div>
          <div className="px-3 text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-3 font-semibold">
            Workforce Intelligence Modules
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleSelectTab(item.tab)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-nsitf-green-800 to-nsitf-green-700 text-white shadow-glow-green border border-nsitf-green-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition ${
                        isActive ? 'text-nsitf-gold-400 scale-110' : 'text-slate-400 group-hover:text-nsitf-green-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                        item.badge === 'LIVE'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                          : 'bg-nsitf-gold-500/20 text-nsitf-gold-300 border border-nsitf-gold-500/40'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* AI Predictive Intelligence Card */}
        {aiAlerts.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/80 to-nsitf-green-950/40 border border-nsitf-gold-500/30 shadow-glass">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-nsitf-gold-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-xs font-bold text-nsitf-gold-300">NSITF Copilot Flag</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-mono font-bold">
                {aiAlerts.length} Active
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3">
              {aiAlerts[0].title}
            </p>
            <button
              onClick={() => {
                setIsCopilotOpen(true);
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-nsitf-gold-500/20 hover:bg-nsitf-gold-500/30 border border-nsitf-gold-500/40 text-nsitf-gold-300 text-[11px] font-semibold transition"
            >
              Analyze with Copilot
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Profile & System Status */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
          <span>NSITF SECURE CORE</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            ENCRYPTED
          </span>
        </div>
        <div className="text-[11px] text-slate-400 leading-snug">
          Federal Republic of Nigeria • Ministry of Labour & Employment
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 glass-panel flex-shrink-0 border-r border-slate-800 hidden lg:flex flex-col min-h-[calc(100vh-65px)]">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-72 max-w-[80vw] bg-slate-950 border-r border-slate-800 h-full z-10 overflow-y-auto">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
