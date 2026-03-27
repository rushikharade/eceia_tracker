// lib/types/tasks.ts
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed' | 'blocked' | 'cancelled';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  
  // Assignment
  assigneeId?: string;
  assigneeName?: string;
  reviewerId?: string;
  
  // Status
  status: TaskStatus;
  priority: TaskPriority;
  progress: number; // 0-100
  
  // Timeline
  startDate: Date;
  dueDate: Date;
  estimatedHours: number;
  actualHours?: number;
  
  // Tracking
  dependencies: string[]; // Task IDs
  blockerReason?: string;
  completionNotes?: string;
  
  // Updates
  updates: TaskUpdate[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  attachments: string[];
  tags: string[];
}

export interface TaskUpdate {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  progress: number;
  notes: string;
  attachments: string[];
  date: Date;
  blocker?: string;
  nextSteps?: string;
}