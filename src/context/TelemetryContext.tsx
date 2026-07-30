import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  UserRole,
  GeopoliticalZone,
  Branch,
  StaffMember,
  AttendanceRecord,
  OperationalTask,
  PMSAppraisal,
  PredictiveAIAlert,
  AuditLogItem,
} from '../types';
import {
  INITIAL_BRANCHES,
  INITIAL_STAFF,
  INITIAL_ATTENDANCE,
  INITIAL_TASKS,
  INITIAL_PMS_APPRAISALS,
  INITIAL_AI_ALERTS,
  INITIAL_AUDIT_LOGS,
} from '../mock/nsitfData';

export type MainTab = 'dashboard' | 'attendance' | 'productivity' | 'pms' | 'analytics' | 'hierarchy' | 'audit_logs';

// ── Nigeria 36 States + FCT mapped by Geopolitical Zone ──────────────────────
export const NIGERIA_ZONE_STATES: Record<GeopoliticalZone | 'ALL', string[]> = {
  ALL: [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
    'FCT – Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
    'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun',
    'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara',
  ],
  NORTH_CENTRAL: ['Benue', 'FCT – Abuja', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau'],
  NORTH_EAST:    ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
  NORTH_WEST:    ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
  SOUTH_EAST:    ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
  SOUTH_SOUTH:   ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
  SOUTH_WEST:    ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo'],
};

interface TelemetryContextType {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  selectedZone: GeopoliticalZone | 'ALL';
  setSelectedZone: (zone: GeopoliticalZone | 'ALL') => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedBranchId: string | 'ALL';
  setSelectedBranchId: (branchId: string | 'ALL') => void;

  // Raw (unfiltered) collections
  branches: Branch[];
  staffList: StaffMember[];
  attendanceLogs: AttendanceRecord[];
  tasks: OperationalTask[];
  pmsAppraisals: PMSAppraisal[];
  aiAlerts: PredictiveAIAlert[];
  auditLogs: AuditLogItem[];

  // ── GLOBALLY FILTERED collections (zone + state applied) ──────────────────
  filteredBranches: Branch[];
  filteredStaff: StaffMember[];
  filteredAttendanceLogs: AttendanceRecord[];
  filteredTasks: OperationalTask[];
  filteredPmsAppraisals: PMSAppraisal[];
  filteredAiAlerts: PredictiveAIAlert[];
  filteredAuditLogs: AuditLogItem[];
  isFiltered: boolean; // true when any zone/state filter is active

  isClockInModalOpen: boolean;
  setIsClockInModalOpen: (open: boolean) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  handleClockIn: (data: Omit<AttendanceRecord, 'id'>) => void;
  addNewTask: (task: Omit<OperationalTask, 'id' | 'taskNumber'>) => void;
  updateTaskStatus: (taskId: string, status: OperationalTask['status'], progress: number) => void;
  resolveAIAlert: (alertId: string) => void;
  userAttendanceStatus: 'CLOCKED_IN' | 'CLOCKED_OUT' | 'FIELD_DUTY';
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('DIRECTOR_GENERAL');
  const [selectedZone, setSelectedZoneRaw] = useState<GeopoliticalZone | 'ALL'>('ALL');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedBranchId, setSelectedBranchId] = useState<string | 'ALL'>('ALL');

  // When zone changes, reset state to ALL automatically
  const setSelectedZone = (zone: GeopoliticalZone | 'ALL') => {
    setSelectedZoneRaw(zone);
    setSelectedState('ALL');
  };

  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [staffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [tasks, setTasks] = useState<OperationalTask[]>(INITIAL_TASKS);
  const [pmsAppraisals] = useState<PMSAppraisal[]>(INITIAL_PMS_APPRAISALS);
  const [aiAlerts, setAiAlerts] = useState<PredictiveAIAlert[]>(INITIAL_AI_ALERTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  const [isClockInModalOpen, setIsClockInModalOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [userAttendanceStatus, setUserAttendanceStatus] = useState<'CLOCKED_IN' | 'CLOCKED_OUT' | 'FIELD_DUTY'>('CLOCKED_IN');

  // ── Build a lookup: branchName → { zone, state } for cross-entity filtering ─
  const branchLookup = useMemo(() => {
    const map = new Map<string, { zone: GeopoliticalZone; state: string }>();
    branches.forEach((b) => map.set(b.name, { zone: b.zone, state: b.state }));
    return map;
  }, [branches]);

  const isFiltered = selectedZone !== 'ALL' || selectedState !== 'ALL';

  // ── Global Filter Logic ─────────────────────────────────────────────────────
  const filteredBranches = useMemo(() => {
    return branches.filter((b) => {
      const zoneMatch = selectedZone === 'ALL' || b.zone === selectedZone;
      // Normalize "FCT Abuja" vs "FCT – Abuja" comparison
      const stateMatch =
        selectedState === 'ALL' ||
        b.state.toLowerCase().replace(/[–-]/g, '').trim() ===
          selectedState.toLowerCase().replace(/[–-]/g, '').trim();
      return zoneMatch && stateMatch;
    });
  }, [branches, selectedZone, selectedState]);

  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      const zoneMatch = selectedZone === 'ALL' || s.zone === selectedZone;
      if (!zoneMatch) return false;
      if (selectedState === 'ALL') return true;
      const branchData = branchLookup.get(s.branchName);
      return (
        branchData?.state.toLowerCase().replace(/[–-]/g, '').trim() ===
        selectedState.toLowerCase().replace(/[–-]/g, '').trim()
      );
    });
  }, [staffList, selectedZone, selectedState, branchLookup]);

  const filteredAttendanceLogs = useMemo(() => {
    return attendanceLogs.filter((log) => {
      if (selectedZone === 'ALL' && selectedState === 'ALL') return true;
      const branchData = branchLookup.get(log.branchName);
      if (!branchData) return selectedZone === 'ALL'; // HQ logs pass through when no zone filter
      const zoneMatch = selectedZone === 'ALL' || branchData.zone === selectedZone;
      const stateMatch =
        selectedState === 'ALL' ||
        branchData.state.toLowerCase().replace(/[–-]/g, '').trim() ===
          selectedState.toLowerCase().replace(/[–-]/g, '').trim();
      return zoneMatch && stateMatch;
    });
  }, [attendanceLogs, selectedZone, selectedState, branchLookup]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const zoneMatch = selectedZone === 'ALL' || t.zone === selectedZone;
      if (!zoneMatch) return false;
      if (selectedState === 'ALL') return true;
      const branchData = branchLookup.get(t.branchName);
      return (
        branchData?.state.toLowerCase().replace(/[–-]/g, '').trim() ===
        selectedState.toLowerCase().replace(/[–-]/g, '').trim()
      );
    });
  }, [tasks, selectedZone, selectedState, branchLookup]);

  const filteredPmsAppraisals = useMemo(() => {
    return pmsAppraisals.filter((a) => {
      if (selectedZone === 'ALL' && selectedState === 'ALL') return true;
      const branchData = branchLookup.get(a.branchName);
      if (!branchData) return selectedZone === 'ALL';
      const zoneMatch = selectedZone === 'ALL' || branchData.zone === selectedZone;
      const stateMatch =
        selectedState === 'ALL' ||
        branchData.state.toLowerCase().replace(/[–-]/g, '').trim() ===
          selectedState.toLowerCase().replace(/[–-]/g, '').trim();
      return zoneMatch && stateMatch;
    });
  }, [pmsAppraisals, selectedZone, selectedState, branchLookup]);

  const filteredAiAlerts = useMemo(() => {
    // AI alerts are branch-tagged via impactedBranchOrUnit — do a fuzzy match against filtered branches
    if (!isFiltered) return aiAlerts;
    const filteredBranchNames = new Set(filteredBranches.map((b) => b.name));
    return aiAlerts.filter((alert) =>
      [...filteredBranchNames].some((name) =>
        alert.impactedBranchOrUnit.toLowerCase().includes(name.split(' ')[0].toLowerCase())
      )
    );
  }, [aiAlerts, filteredBranches, isFiltered]);

  const filteredAuditLogs = useMemo(() => {
    if (selectedZone === 'ALL' && selectedState === 'ALL') return auditLogs;
    // Match audit logs whose targetResource references a filtered branch
    const filteredBranchNames = filteredBranches.map((b) => b.name);
    return auditLogs.filter((log) =>
      filteredBranchNames.some((name) => log.targetResource.includes(name)) ||
      // Always include non-attendance audit logs when zone filtered (policy logs etc.)
      !log.action.includes('Clock-In')
    );
  }, [auditLogs, filteredBranches, selectedZone, selectedState]);

  const handleClockIn = (recordData: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = { ...recordData, id: `att-${Date.now()}` };
    setAttendanceLogs((prev) => [newRecord, ...prev]);
    setUserAttendanceStatus('CLOCKED_IN');
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      actorName: recordData.staffName,
      actorRole: currentRole,
      action: `Geofenced Clock-In (${recordData.verificationMethod})`,
      targetResource: `Attendance Telemetry: ${recordData.branchName}`,
      ipAddress: '102.89.23.44 (GPS Encrypted)',
      timestamp: new Date().toISOString(),
      status: recordData.geofenceStatus === 'GEOFENCE_VIOLATION' ? 'FLAGGED' : 'SUCCESS',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addNewTask = (taskData: Omit<OperationalTask, 'id' | 'taskNumber'>) => {
    const newTask: OperationalTask = {
      ...taskData,
      id: `tsk-${Date.now()}`,
      taskNumber: `TSK-NSITF-2026-${Math.floor(100 + Math.random() * 900)}`,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTaskStatus = (taskId: string, status: OperationalTask['status'], progress: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status, completionPercentage: progress } : t))
    );
  };

  const resolveAIAlert = (alertId: string) => {
    setAiAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  return (
    <TelemetryContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentRole,
        setCurrentRole,
        selectedZone,
        setSelectedZone,
        selectedState,
        setSelectedState,
        selectedBranchId,
        setSelectedBranchId,
        branches,
        staffList,
        attendanceLogs,
        tasks,
        pmsAppraisals,
        aiAlerts,
        auditLogs,
        filteredBranches,
        filteredStaff,
        filteredAttendanceLogs,
        filteredTasks,
        filteredPmsAppraisals,
        filteredAiAlerts,
        filteredAuditLogs,
        isFiltered,
        isClockInModalOpen,
        setIsClockInModalOpen,
        isCopilotOpen,
        setIsCopilotOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        handleClockIn,
        addNewTask,
        updateTaskStatus,
        resolveAIAlert,
        userAttendanceStatus,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) throw new Error('useTelemetry must be used within TelemetryProvider');
  return context;
};
