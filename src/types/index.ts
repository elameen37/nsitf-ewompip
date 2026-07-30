export type UserRole =
  | 'DIRECTOR_GENERAL'
  | 'REGIONAL_DIRECTOR'
  | 'BRANCH_MANAGER'
  | 'HR_ADMIN'
  | 'FIELD_OFFICER';

export type GeopoliticalZone =
  | 'NORTH_CENTRAL'
  | 'NORTH_EAST'
  | 'NORTH_WEST'
  | 'SOUTH_EAST'
  | 'SOUTH_SOUTH'
  | 'SOUTH_WEST';

export type OfficeType = 'HEADQUARTERS' | 'REGIONAL_OFFICE' | 'STATE_OFFICE' | 'BRANCH_OFFICE';

export interface Branch {
  id: string;
  name: string;
  code: string;
  type: OfficeType;
  zone: GeopoliticalZone;
  state: string;
  city: string;
  address: string;
  managerName: string;
  staffCount: number;
  attendanceRate: number; // percentage (e.g. 94.2)
  productivityIndex: number; // score out of 100
  claimsSlaCompliance: number; // percentage
  activeAuditsCount: number;
  lat: number;
  lng: number;
  status: 'OPTIMAL' | 'MODERATE_DELAY' | 'ATTENTION_REQUIRED';
}

export interface StaffMember {
  id: string;
  staffId: string; // e.g. "NSITF/2021/4892"
  fullName: string;
  rank: string;
  gradeLevel: string; // e.g. "GL 14", "GL 17"
  department: string;
  branchId: string;
  branchName: string;
  zone: GeopoliticalZone;
  email: string;
  phone: string;
  avatar: string;
  attendanceStatus: 'CLOCKED_IN' | 'CLOCKED_OUT' | 'ON_LEAVE' | 'FIELD_DUTY';
  kpiScore: number; // 0-100
  claimsProcessedMonth: number;
  lastClockIn?: string;
  promotionStatus: 'ELIGIBLE' | 'IN_REVIEW' | 'NOT_ELIGIBLE';
}

export interface AttendanceRecord {
  id: string;
  staffId: string;
  staffName: string;
  gradeLevel: string;
  department: string;
  branchName: string;
  clockInTime: string;
  clockOutTime?: string;
  verificationMethod: 'DYNAMIC_QR' | 'GEOFENCE_GPS' | 'CARD_TAP';
  geofenceStatus: 'VERIFIED_ON_SITE' | 'REMOTE_FIELD_APPROVED' | 'GEOFENCE_VIOLATION';
  distanceFromOfficeMeters: number;
  lat: number;
  lng: number;
  deviceInfo: string;
}

export interface OperationalTask {
  id: string;
  taskNumber: string; // e.g. "TSK-NSITF-8842"
  title: string;
  category: 'EMPLOYER_AUDIT' | 'COMPENSATION_CLAIM' | 'SAFETY_INSPECTION' | 'BENEFICIARY_VERIFY';
  assignedToName: string;
  assignedToStaffId: string;
  branchName: string;
  zone: GeopoliticalZone;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL';
  status: 'IN_PROGRESS' | 'PENDING_REVIEW' | 'COMPLETED' | 'SLA_BREACHED';
  slaHoursLeft: number;
  completionPercentage: number;
  targetCompany?: string;
  claimAmountNaira?: number;
}

export interface PMSAppraisal {
  id: string;
  appraisalPeriod: string; // e.g. "2026 Q2 Annual Cycle"
  staffId: string;
  staffName: string;
  gradeLevel: string;
  department: string;
  branchName: string;
  selfScore: number; // out of 100
  supervisorScore: number; // out of 100
  finalGrade: 'OUTSTANDING' | 'EXCEEDS_EXPECTATIONS' | 'MEETS_EXPECTATIONS' | 'NEEDS_IMPROVEMENT';
  okrCompletionRate: number;
  promotionEligible: boolean;
  status: 'COMPLETED' | 'SUPERVISOR_REVIEW' | 'DISPUTED' | 'DRAFT';
  keyAccomplishments: string[];
  trainingRecommendations: string[];
}

export interface PredictiveAIAlert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'INFO';
  category: 'ATTRITION_RISK' | 'WORKLOAD_BURNOUT' | 'SLA_BOTTLENECK' | 'ATTENDANCE_ANOMALY';
  title: string;
  impactedBranchOrUnit: string;
  description: string;
  recommendedAction: string;
  confidenceScore: number; // e.g., 94
  timestamp: string;
}

export interface AuditLogItem {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetResource: string;
  ipAddress: string;
  timestamp: string;
  status: 'SUCCESS' | 'FLAGGED' | 'DENIED';
}
