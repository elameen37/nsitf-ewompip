import React, { useState } from 'react';
import { TelemetryProvider, useTelemetry } from './context/TelemetryContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { AICopilotDock } from './components/layout/AICopilotDock';
import { ExecutiveDashboard } from './components/modules/dashboard/ExecutiveDashboard';
import { AttendanceModule } from './components/modules/attendance/AttendanceModule';
import { ProductivityModule } from './components/modules/productivity/ProductivityModule';
import { AppraisalModule } from './components/modules/pms/AppraisalModule';
import { AIAnalyticsModule } from './components/modules/analytics/AIAnalyticsModule';
import { OrganizationalHierarchy } from './components/modules/settings/OrganizationalHierarchy';
import { AuditLogs } from './components/modules/settings/AuditLogs';
import { LandingPage } from './components/landing/LandingPage';
import { ArrowLeft, Globe } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useTelemetry();

  return (
    <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-[1600px] w-full mx-auto space-y-6 overflow-x-hidden">
      {activeTab === 'dashboard' && <ExecutiveDashboard />}
      {activeTab === 'attendance' && <AttendanceModule />}
      {activeTab === 'productivity' && <ProductivityModule />}
      {activeTab === 'pms' && <AppraisalModule />}
      {activeTab === 'analytics' && <AIAnalyticsModule />}
      {activeTab === 'hierarchy' && <OrganizationalHierarchy />}
      {activeTab === 'audit_logs' && <AuditLogs />}
    </main>
  );
};

export const AppContent: React.FC<{ onReturnToLanding: () => void }> = ({ onReturnToLanding }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#050e1a] text-slate-100 flex flex-col font-sans selection:bg-[#00c878] selection:text-slate-950">
      
      {/* Return to Public Landing Page Banner */}
      <div className="bg-gradient-to-r from-[#008751] via-[#061e33] to-[#008751] text-white px-4 py-1.5 flex items-center justify-between text-xs font-mono border-b border-[#00c878]/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00c878] animate-ping" />
          <span className="font-bold">NSITF EWMIP PORTAL</span>
          <span className="hidden sm:inline text-slate-300">• Live Federal Telemetry Stream</span>
        </div>
        <button
          onClick={onReturnToLanding}
          className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-[#00c878] text-slate-950 font-extrabold hover:bg-emerald-300 transition shadow"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Landing Page</span>
        </button>
      </div>

      <Header
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onToggleDesktopSidebar={() => setDesktopCollapsed(!desktopCollapsed)}
        desktopSidebarCollapsed={desktopCollapsed}
      />
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          desktopCollapsed={desktopCollapsed}
          onToggleDesktopSidebar={() => setDesktopCollapsed(!desktopCollapsed)}
        />
        <MainContent />
      </div>
      <CommandPalette />
      <AICopilotDock />
    </div>
  );
};

export function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('landing');

  return (
    <ThemeProvider>
      <TelemetryProvider>
        {viewMode === 'landing' ? (
          <LandingPage onLaunchPortal={() => setViewMode('portal')} />
        ) : (
          <AppContent onReturnToLanding={() => setViewMode('landing')} />
        )}
      </TelemetryProvider>
    </ThemeProvider>
  );
}

export default App;
