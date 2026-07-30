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

  const stateOptions = NIGERIA_ZONE_STATES[selectedZone];

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-nsitf-green-500/20 px-3 sm:px-5 py-2.5 sm:py-3 flex flex-col gap-2.5 transition-all">
      {/* Top Main Row */}
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Brand & Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Drawer Toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Official NSITF Logo */}
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 shadow-glow-green border border-nsitf-green-500/30 flex-shrink-0">
            <img
              src="/nsitf-logo.png"
              alt="NSITF Official Seal"
              className="w-full h-full object-contain"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                NSITF{' '}
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-nsitf-green-900/60 border border-nsitf-green-500/30 text-nsitf-green-300 font-mono">
                  EWOMPIP v1.0
                </span>
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Nigeria Social Insurance Trust Fund • Federal Republic of Nigeria
            </p>
          </div>
        </div>

        {/* Center Search - Desktop */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm mx-2">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-nsitf-green-500/40 text-slate-400 text-xs transition"
          >
            <Search className="w-3.5 h-3.5 text-nsitf-green-400 flex-shrink-0" />
            <span className="truncate">Search officers, branches, audits...</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Search */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            <Search className="w-4 h-4 text-nsitf-green-400" />
          </button>

          {/* Executive Persona Switcher */}
          <RoleSwitcher />

          {/* Clock In Button */}
          <button
            onClick={() => setIsClockInModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-nsitf-green-700 to-nsitf-green-600 hover:from-nsitf-green-600 hover:to-nsitf-green-500 text-white text-xs font-semibold shadow-glow-green border border-nsitf-green-400/30 transition"
          >
            <Clock className="w-3.5 h-3.5 text-nsitf-gold-300" />
            <span className="hidden lg:inline">{userAttendanceStatus === 'CLOCKED_IN' ? 'Clocked In ✓' : 'Geofence Clock-In'}</span>
            <span className="w-2 h-2 rounded-full bg-nsitf-gold-400 animate-ping" />
          </button>

          {/* Copilot */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="relative p-2 rounded-xl bg-slate-900/90 border border-nsitf-gold-500/40 hover:border-nsitf-gold-400 text-nsitf-gold-400 hover:text-nsitf-gold-300 shadow-glow-gold transition"
            title="NSITF Copilot AI"
          >
            <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            <Sparkles className="w-2.5 h-2.5 text-nsitf-gold-300 absolute -top-0.5 -right-0.5 animate-spin" style={{ animationDuration: '6s' }} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 transition"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-nsitf-green-600" />}
          </button>
        </div>
      </div>

      {/* Zone + State Filter Row — visible on xl screens */}
      <div className="hidden xl:flex items-center gap-2 py-1 border-t border-slate-800/60 pt-2">
        <MapPin className="w-3.5 h-3.5 text-nsitf-green-400 flex-shrink-0" />
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Filter:</span>

        {/* Zone Selector */}
        <div className="relative">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value as any)}
            className="appearance-none bg-slate-900 border border-slate-800 hover:border-nsitf-green-500/50 text-xs text-slate-200 pl-3 pr-7 py-1.5 rounded-lg focus:outline-none focus:border-nsitf-green-500 font-medium cursor-pointer transition"
          >
            <option value="ALL">🌐 All Geopolitical Zones</option>
            <option value="NORTH_CENTRAL">📍 North-Central</option>
            <option value="NORTH_EAST">📍 North-East</option>
            <option value="NORTH_WEST">📍 North-West</option>
            <option value="SOUTH_EAST">📍 South-East</option>
            <option value="SOUTH_SOUTH">📍 South-South</option>
            <option value="SOUTH_WEST">📍 South-West</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
        </div>

        {/* State Selector — dynamically updates when zone changes */}
        <div className="relative">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="appearance-none bg-slate-900 border border-slate-800 hover:border-nsitf-green-500/50 text-xs text-slate-200 pl-3 pr-7 py-1.5 rounded-lg focus:outline-none focus:border-nsitf-green-500 font-medium cursor-pointer transition min-w-[160px]"
          >
            <option value="ALL">— All States{selectedZone !== 'ALL' ? ` (${stateOptions.length})` : ' (36 + FCT)'}</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state} State{state === 'FCT – Abuja' ? '' : ''}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
        </div>

        {/* Active filter summary badge */}
        {(selectedZone !== 'ALL' || selectedState !== 'ALL') && (
          <span className="text-[10px] px-2 py-1 rounded-lg bg-nsitf-green-900/50 border border-nsitf-green-500/30 text-nsitf-green-300 font-mono font-semibold">
            {selectedState !== 'ALL' ? selectedState : selectedZone.replace('_', ' ')}
          </span>
        )}
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden w-full animate-in fade-in slide-in-from-top-1 duration-150">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs"
          >
            <Search className="w-4 h-4 text-nsitf-green-400" />
            <span className="truncate">Search officers, branches, ECA tasks...</span>
          </button>
        </div>
      )}
    </header>
  );
};
