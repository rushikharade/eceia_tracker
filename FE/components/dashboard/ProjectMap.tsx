'use client';

import { MapPin } from 'lucide-react';
import { mockProjects } from '@/lib/mock-data/projects';
import Link from 'next/link';

interface ProjectMapProps {
  mini?: boolean;
}

export default function ProjectMap({ mini = false }: ProjectMapProps) {
  const projects = mockProjects.slice(0, 4);

  return (
    <div className={`relative ${mini ? 'h-48' : 'h-96'} bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg overflow-hidden border`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 h-4/5 border border-gray-300 rounded-lg bg-white/30 relative">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                left: `${getRandom(20, 80)}%`,
                top: `${getRandom(20, 80)}%`,
              }}
            >
              <div className="relative">
                <MapPin className={`
                  w-6 h-6 
                  ${project.status === 'in-progress' ? 'text-green-500' : ''}
                  ${project.status === 'completed' ? 'text-blue-500' : ''}
                  ${project.status === 'delayed' ? 'text-red-500' : ''}
                  ${project.status === 'planned' ? 'text-yellow-500' : ''}
                  drop-shadow-md
                `} />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Delayed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}