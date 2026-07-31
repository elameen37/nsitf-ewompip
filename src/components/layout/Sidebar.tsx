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
  BarChart3,
  Bot,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Layers,
  Activity,
  CheckCircle2
} from 'lucide-react';

const NAV_ITEMS: { tab: MainTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
  { tab: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard },
  { tab: 'attendance', label: 'Geofenced Attendance', icon: Radio, badge: 'LIVE' },
  { tab: 'productivity', label: 'Productivity & SLA', icon: Zap },
  { tab: 'pms', label: 'PMS & Appraisals', icon: Target },
  { tab: 'analytics', label: 'AI Intelligence Hub', icon: BrainCircuit, badge: 'AI' },
  { tab: 'hierarchy', label: 'Branch Network & Zones', icon: Building2 },
  { tab: 'audit_logs', label: 'Government Audit Logs', icon: FileCheck2 },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  desktopCollapsed?: boolean;
  onToggleDesktopSidebar?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
  desktopCollapsed = false,
  onToggleDesktopSidebar,
}) => {
  const { activeTab, setActiveTab, setIsCopilotOpen, branches, tasks, attendanceLogs } = useTelemetry();

  const handleSelectTab = (tab: MainTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-6">
        {/* Mobile Close Header */}
        {onCloseMobile && (
          <div className="flex items-center justify-between p-4 border-b border-[#122c48] lg:hidden">
            <div className="flex items-center gap-2">
              <img src="/nsitf-logo.png" alt="NSITF Seal" className="w-6 h-6 object-contain" />
              <span className="text-xs font-bold text-white">NSITF Command Center</span>
            </div>
            <button onClick={onCloseMobile} className="p-1.5 rounded-lg bg-[#0a1c2e] text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Desktop Sidebar Toggle Header Strip */}
        {onToggleDesktopSidebar && (
          <div
            className={`hidden lg:flex items-center ${
              desktopCollapsed ? 'justify-center py-3' : 'justify-between px-4 pt-3 pb-1'
            } border-b border-[#122c48]/60`}
          >
            {!desktopCollapsed && (
              <span className="text-[10px] font-mono tracking-widest font-extrabold text-slate-400 uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                NAVIGATION PANE
              </span>
            )}
            <button
              onClick={onToggleDesktopSidebar}
              className="p-1.5 rounded-xl bg-[#0a1c2e] border border-[#143252] text-slate-300 hover:text-white hover:border-[#00c878]/50 hover:bg-[#0f2842] transition shadow-sm"
              title={desktopCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label={desktopCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {desktopCollapsed ? (
                <ChevronRight className="w-4 h-4 text-[#00c878]" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-300" />
              )}
            </button>
          </div>
        )}

        {/* ── COMMAND CENTER NAVIGATION ───────────────────────────────────── */}
        <div className="px-3 pt-2">
          <div className="px-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2.5 font-bold">
            COMMAND CENTER
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleSelectTab(item.tab)}
                  title={desktopCollapsed ? item.label : undefined}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? 'glow-green-btn text-slate-950 font-extrabold shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-[#0c2035]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition ${
                        isActive ? 'text-slate-950 stroke-[2.5]' : 'text-slate-400 group-hover:text-[#00c878]'
                      }`}
                    />
                    {!desktopCollapsed && (
                      <span className="tracking-tight truncate">{item.label}</span>
                    )}
                  </div>
                  {!desktopCollapsed && item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950 border border-slate-950/30'
                          : item.badge === 'LIVE'
                          ? 'bg-emerald-500/20 text-[#00e680] border border-emerald-500/40 animate-pulse'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
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

        {/* ── AI COPILOT CARD ──────────────────────────────────────────────── */}
        {!desktopCollapsed && (
          <div className="px-3">
            <div className="px-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2 font-bold">
              AI COPILOT
            </div>
            <div className="p-3.5 rounded-2xl dark:bg-[#091d31] bg-white dark:border-[#143455] border-[#c0dbc9] border space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#00c878]" />
                  <span className="text-xs font-bold dark:text-white text-slate-800">NSITF Copilot</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#00e680] text-[9px] font-mono font-bold border border-emerald-500/30">
                  Active
                </span>
              </div>
              <p className="text-[11px] dark:text-slate-400 text-slate-600 leading-relaxed">
                AI-powered insights and recommendations
              </p>
              <button
                onClick={() => {
                  setIsCopilotOpen(true);
                  if (onCloseMobile) onCloseMobile();
                }}
                className="w-full py-2 rounded-xl dark:bg-[#0b2640] bg-emerald-50 dark:hover:bg-[#0e2f50] hover:bg-emerald-100 dark:border-[#00c878]/30 border-[#00c878]/40 border dark:text-[#00e680] text-emerald-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                Open Copilot
              </button>
            </div>
          </div>
        )}

        {/* ── QUICK INSIGHTS ────────────────────────────────────────────────── */}
        {!desktopCollapsed && (
          <div className="px-3 space-y-2">
            <div className="px-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
              QUICK INSIGHTS
            </div>

            <div className="space-y-1.5 text-xs">
              {/* Stat 1 */}
              <div className="p-2.5 rounded-xl bg-[#091b2c] border border-[#122b44] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/15 text-[#00c878] flex-shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono leading-tight">9</div>
                  <div className="text-[10px] text-slate-400 font-medium">Zones Synchronized</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-2.5 rounded-xl bg-[#091b2c] border border-[#122b44] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono leading-tight">1,480</div>
                  <div className="text-[10px] text-slate-400 font-medium">Active ECA Audits</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-2.5 rounded-xl bg-[#091b2c] border border-[#122b44] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 flex-shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono leading-tight">95.4%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Attendance Rate</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-2.5 rounded-xl bg-[#091b2c] border border-[#122b44] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono leading-tight">142</div>
                  <div className="text-[10px] text-slate-400 font-medium">Active SLA Cases</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── SECURE CONNECTION FOOTER ────────────────────────────────────────── */}
      <div className="p-4 border-t border-[#122c48] bg-[#05111e] space-y-2">
        {desktopCollapsed ? (
          <div className="flex justify-center">
            <ShieldCheck className="w-4 h-4 text-[#00c878]" />
          </div>
        ) : (
          <>
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
              SECURE CONNECTION
            </div>
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#00c878] flex-shrink-0" />
              <div>
                <div className="font-bold text-slate-200 text-[11px] leading-tight">All systems operational</div>
                <div className="text-[10px] text-slate-400 font-mono">Encrypted & Monitored</div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-slate-500 font-mono border-t border-[#10273f]">
              v1.0.0 • Secure • Encrypted
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR: Smooth slide in/out via width + opacity transition ── */}
      <aside
        className={`
          bg-[#071727] flex-shrink-0 border-r border-[#122c48]
          hidden lg:flex flex-col min-h-[calc(100vh-64px)]
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${desktopCollapsed ? 'w-[64px]' : 'w-64'}
        `}
      >
        {navContent}
      </aside>

      {/* ── MOBILE DRAWER: Slides in from left with backdrop fade ── */}
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden
          bg-[#050e1a]/75 backdrop-blur-sm
          transition-opacity duration-300
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onCloseMobile}
      />

      {/* Drawer Panel */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 lg:hidden
          w-72 max-w-[85vw]
          bg-[#071727] border-r border-[#122c48]
          overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {navContent}
      </div>
    </>
  );
};
