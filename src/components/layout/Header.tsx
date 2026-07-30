import React, { useState } from 'react';
import { useTelemetry, NIGERIA_ZONE_STATES } from '../../context/TelemetryContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Search,
  Bot,
  Sun,
  Moon,
  Bell,
  Clock,
  Sparkles,
  MapPin,
  Menu,
  ChevronDown,
  RefreshCw,
  SlidersHorizontal,
  Mail,
  Settings,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';

export const Header: React.FC<{ onToggleMobileMenu?: () => void }> = ({ onToggleMobileMenu }) => {
  const {
    currentRole,
    setIsCopilotOpen,
    setIsCommandPaletteOpen,
    setIsClockInModalOpen,
    userAttendanceStatus,
    selectedZone,
    setSelectedZone,
    selectedState,
    setSelectedState,
  } = useTelemetry();
  const { theme, toggleTheme } = useTheme();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState('08:42 AM WAT');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stateOptions = NIGERIA_ZONE_STATES[selectedZone];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastRefreshTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WAT');
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#071727] border-b border-[#122c48] flex flex-col transition-all">
      {/* ── Top Main Header Row ────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 w-full">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-[#0a1c2e] border border-[#143252] text-slate-300 hover:text-white"
            title="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white p-1 shadow-glow-green border border-emerald-500/30 flex-shrink-0">
            <img
              src="/nsitf-logo.png"
              alt="NSITF Official Seal"
              className="w-full h-full object-contain"
            />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#00c878] border-2 border-[#071727] rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2 font-mono">
                NSITF
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-[#00381e] border border-[#008048] text-[#00e680] font-bold font-mono tracking-wide">
                  EWOMPIP v1.0
                </span>
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Nigeria Social Insurance Trust Fund • Federal Republic of Nigeria
            </p>
          </div>
        </div>

        {/* Center Global Search Field */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#0a1d30] border border-[#143252] hover:border-[#00c878]/50 text-slate-400 text-xs transition shadow-inner"
          >
            <Search className="w-4 h-4 text-[#00c878] flex-shrink-0" />
            <span className="truncate text-slate-400">Search officers, branches, audits...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#061424] text-[10px] font-mono text-slate-400 border border-[#143252]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Controls & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-xl bg-[#0a1c2e] border border-[#143252] text-slate-300"
          >
            <Search className="w-4 h-4 text-[#00c878]" />
          </button>

          {/* Executive Persona Switcher */}
          <RoleSwitcher />

          {/* Profile Card Pill (Executive User) */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0a1d30] border border-[#143252]">
            <div className="relative w-7 h-7 rounded-lg bg-emerald-700/40 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs font-mono">
              OA
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white leading-tight">Dr. Oluwaseun Adesina</div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                <span>Director-General / CEO</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-[#00e680] text-[9px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c878] animate-pulse" />
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-xl bg-[#0a1c2e] border border-[#143252] hover:border-slate-600 text-slate-300 hover:text-white transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border border-[#071727]" />
          </button>

          {/* Messages */}
          <button
            className="p-2 rounded-xl bg-[#0a1c2e] border border-[#143252] hover:border-slate-600 text-slate-300 hover:text-white transition hidden sm:block"
            title="Messages"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#0a1c2e] border border-[#143252] hover:border-slate-600 text-slate-300 transition"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#00c878]" />}
          </button>

          {/* Settings */}
          <button
            className="p-2 rounded-xl bg-[#0a1c2e] border border-[#143252] hover:border-slate-600 text-slate-300 hover:text-white transition hidden sm:block"
            title="Control Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Filter & Control Strip (Below Top Header) ───────────────────────── */}
      <div className="px-4 sm:px-6 py-2 bg-[#061424] border-t border-[#122c48] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00c878]" />
            <span>FILTERS:</span>
          </div>

          {/* Geopolitical Zone Selector */}
          <div className="relative">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value as any)}
              className="appearance-none bg-[#0a1d30] border border-[#143252] hover:border-[#00c878]/50 text-xs text-slate-200 pl-3 pr-7 py-1.5 rounded-lg focus:outline-none focus:border-[#00c878] font-medium cursor-pointer transition"
            >
              <option value="ALL">All Geopolitical Zones</option>
              <option value="NORTH_CENTRAL">North-Central (Abuja HQ)</option>
              <option value="NORTH_EAST">North-East Zone</option>
              <option value="NORTH_WEST">North-West Zone</option>
              <option value="SOUTH_EAST">South-East Zone</option>
              <option value="SOUTH_SOUTH">South-South Zone</option>
              <option value="SOUTH_WEST">South-West Zone</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>

          {/* State Selector */}
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="appearance-none bg-[#0a1d30] border border-[#143252] hover:border-[#00c878]/50 text-xs text-slate-200 pl-3 pr-7 py-1.5 rounded-lg focus:outline-none focus:border-[#00c878] font-medium cursor-pointer transition min-w-[170px]"
            >
              <option value="ALL">All States (36 + FCT)</option>
              {stateOptions.map((st) => (
                <option key={st} value={st}>
                  {st} State
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>

          {/* Active Filter Badge */}
          {(selectedZone !== 'ALL' || selectedState !== 'ALL') && (
            <span className="px-2.5 py-1 rounded-md bg-[#00381e] border border-[#008048] text-[#00e680] text-[10px] font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c878] animate-pulse" />
              Active Filter: {selectedState !== 'ALL' ? selectedState : selectedZone.replace('_', ' ')}
            </span>
          )}
        </div>

        {/* Right Telemetry Refresh Status */}
        <div className="flex items-center gap-3 text-slate-400 text-xs font-mono ml-auto sm:ml-0">
          <span>Last Updated: <strong className="text-slate-200 font-normal">{lastRefreshTime}</strong></span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0a1d30] border border-[#143252] hover:border-[#00c878]/50 text-slate-300 hover:text-white transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00c878] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Expandable Box */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-[#071727] border-t border-[#122c48] animate-in fade-in duration-150">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0a1d30] border border-[#143252] text-slate-400 text-xs"
          >
            <Search className="w-4 h-4 text-[#00c878]" />
            <span className="truncate">Search officers, branches, audits...</span>
          </button>
        </div>
      )}
    </header>
  );
};
