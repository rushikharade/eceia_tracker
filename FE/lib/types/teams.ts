// lib/types/teams.ts
export interface Team {
  id: string;
  name: string;
  description: string;
  leadId: string;
  department: string;
  
  members: string[]; // Employee IDs
  projects: string[]; // Project IDs
  
  // Stats
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  headId: string;
  description: string;
  teamIds: string[];
  employeeCount: number;
}