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

const MainContent: React.FC = () => {
  const { activeTab } = useTelemetry();

  return (
    <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 overflow-x-hidden">
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

export const AppContent: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-nsitf-green-600 selection:text-white">
      <Header onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="flex flex-1 relative">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />
        <MainContent />
      </div>
      <CommandPalette />
      <AICopilotDock />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <TelemetryProvider>
        <AppContent />
      </TelemetryProvider>
    </ThemeProvider>
  );
}

export default App;
