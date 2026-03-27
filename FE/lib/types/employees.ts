export type EmployeeRole = 'admin' | 'project-manager' | 'eia-expert' | 'field-engineer' | 'consultant';
export type Department = 'environmental' | 'engineering' | 'legal' | 'community' | 'administration';

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  role: EmployeeRole;
  designation: string;
  joiningDate: Date;
  experience: number;
  expertise: string[];
  currentProjects: string[];
  assignedTasks: string[];
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  performanceScore: number;
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}