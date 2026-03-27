// components/dashboard/RecentProjects.tsx
'use client';

import Link from 'next/link';
import { Calendar, Users, MapPin, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: 'EIA' | 'EC' | 'Hybrid';
  status: 'in-progress' | 'completed' | 'delayed';
  progress: number;
  location: string;
  teamSize: number;
  startDate: string;
  endDate: string;
}

const projects: Project[] = [
  { 
    id: 'PRJ-001', 
    name: 'Solar Power Plant - Rajasthan', 
    type: 'EIA', 
    status: 'in-progress', 
    progress: 65, 
    location: 'Jaisalmer, RJ',
    teamSize: 8,
    startDate: '15 Jan 2024',
    endDate: '30 Jun 2024'
  },
  { 
    id: 'PRJ-002', 
    name: 'Wind Farm Project - Gujarat', 
    type: 'EC', 
    status: 'completed', 
    progress: 100, 
    location: 'Kutch, GJ',
    teamSize: 6,
    startDate: '01 Nov 2023',
    endDate: '28 Feb 2024'
  },
  { 
    id: 'PRJ-003', 
    name: 'Hydroelectric Dam - Himachal', 
    type: 'Hybrid', 
    status: 'delayed', 
    progress: 45, 
    location: 'Kinnaur, HP',
    teamSize: 12,
    startDate: '10 Dec 2023',
    endDate: '15 May 2024'
  },
];

export default function RecentProjects() {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
        <Link href="/projects" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium group-hover:text-blue-600">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.type === 'EIA' ? 'bg-green-100 text-green-800' :
                    project.type === 'EC' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {project.type}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.teamSize} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Start: {project.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>End: {project.endDate}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        project.status === 'completed' ? 'bg-green-500' :
                        project.status === 'delayed' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 ml-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}