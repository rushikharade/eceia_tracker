export type ProjectType = 'EIA' | 'EC' | 'Hybrid' | 'Other';
export type ProjectStatus = 'planned' | 'in-progress' | 'completed' | 'delayed' | 'on-hold';

export interface ProjectLocation {
  state: string;
  district: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  startDate: Date;
  endDate: Date;
  location: ProjectLocation;
  teamLeadId: string;
  teamMemberIds: string[];
  department: string;
  progress: number;
  budget: {
    allocated: number;
    utilized: number;
    currency: string;
  };
  eiaRequired: boolean;
  eiaNumber?: string;
  clearanceDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  documents: string[];
  tags: string[];
}