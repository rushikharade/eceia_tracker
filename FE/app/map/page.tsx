'use client';

import ProjectMap from '@/components/dashboard/ProjectMap';

export default function MapPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Locations</h1>
          <p className="text-gray-600">View all projects on map</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Projects</option>
            <option>EIA Projects</option>
            <option>EC Projects</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border p-4">
        <ProjectMap mini={false} />
      </div>
    </div>
  );
}