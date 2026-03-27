// app/map/page.tsx - Full Screen Map View
'use client';

import { useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Filter, X, Download, Layers } from 'lucide-react';
import Link from 'next/link';

const allProjects = [
  { id: 1, name: 'Solar Power Plant - Rajasthan', type: 'EIA', status: 'active', state: 'Rajasthan', teamSize: 8, budget: '₹250 Cr' },
  { id: 2, name: 'Wind Farm - Gujarat', type: 'EC', status: 'completed', state: 'Gujarat', teamSize: 6, budget: '₹150 Cr' },
  { id: 3, name: 'Hydro Project - Himachal', type: 'Hybrid', status: 'delayed', state: 'Himachal Pradesh', teamSize: 12, budget: '₹320 Cr' },
  { id: 4, name: 'Thermal Plant - Maharashtra', type: 'EIA', status: 'active', state: 'Maharashtra', teamSize: 10, budget: '₹500 Cr' },
  { id: 5, name: 'Nuclear Plant - Tamil Nadu', type: 'EC', status: 'completed', state: 'Tamil Nadu', teamSize: 15, budget: '₹800 Cr' },
  { id: 6, name: 'Solar Park - Karnataka', type: 'EIA', status: 'active', state: 'Karnataka', teamSize: 7, budget: '₹120 Cr' },
  { id: 7, name: 'Wind Turbines - Andhra', type: 'EC', status: 'active', state: 'Andhra Pradesh', teamSize: 9, budget: '₹180 Cr' },
  { id: 8, name: 'Biomass Plant - Punjab', type: 'Hybrid', status: 'planned', state: 'Punjab', teamSize: 5, budget: '₹80 Cr' },
  { id: 9, name: 'Solar Farm - Madhya Pradesh', type: 'EIA', status: 'active', state: 'Madhya Pradesh', teamSize: 8, budget: '₹200 Cr' },
  { id: 10, name: 'Wind Energy - Rajasthan', type: 'EC', status: 'completed', state: 'Rajasthan', teamSize: 6, budget: '₹160 Cr' },
];

const getCoordinateOffset = (seed: string, axis: 'x' | 'y', spread: number) => {
  const hash = Array.from(`${seed}-${axis}`).reduce(
    (value, character) => value + character.charCodeAt(0),
    0
  );

  return ((hash % 1000) / 1000 - 0.5) * spread;
};

export default function MapPage() {
  const [zoom, setZoom] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showLayers, setShowLayers] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = selectedType === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.type === selectedType);

  const selectedProjectData = selectedProject 
    ? allProjects.find(p => p.id === selectedProject)
    : null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  // Calculate statistics
  const stats = {
    total: allProjects.length,
    eia: allProjects.filter(p => p.type === 'EIA').length,
    ec: allProjects.filter(p => p.type === 'EC').length,
    hybrid: allProjects.filter(p => p.type === 'Hybrid').length,
    active: allProjects.filter(p => p.status === 'active').length,
    completed: allProjects.filter(p => p.status === 'completed').length,
    totalBudget: allProjects.reduce((sum, p) => sum + parseInt(p.budget.replace('₹', '').replace(' Cr', '')), 0),
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-50 rounded-xl overflow-hidden">
      {/* Map Header */}
      <div className="bg-white border-b p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Locations Map</h1>
            <p className="text-gray-600">Interactive visualization of all EIA/EC projects across India</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
            >
              Back to Dashboard
            </Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Export Map
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Map Controls Sidebar */}
        <div className="w-80 bg-white border-r p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Statistics */}
            <div>
              <h3 className="font-semibold mb-3">Map Statistics</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
                  <div className="text-sm text-blue-600">Total Projects</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">₹{stats.totalBudget} Cr</div>
                  <div className="text-sm text-green-600">Total Budget</div>
                </div>
              </div>
            </div>

            {/* Project Type Filter */}
            <div>
              <h3 className="font-semibold mb-3">Filter by Type</h3>
              <div className="space-y-2">
                {[
                  { type: 'all', label: 'All Projects', color: 'gray', count: stats.total },
                  { type: 'EIA', label: 'EIA Projects', color: 'green', count: stats.eia },
                  { type: 'EC', label: 'EC Projects', color: 'blue', count: stats.ec },
                  { type: 'Hybrid', label: 'Hybrid Projects', color: 'purple', count: stats.hybrid },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setSelectedType(item.type)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedType === item.type
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50 border'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Project List */}
            <div>
              <h3 className="font-semibold mb-3">Projects ({filteredProjects.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedProject === project.id
                        ? 'bg-blue-50 border-blue-300'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm">{project.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.type === 'EIA' ? 'bg-green-100 text-green-800' :
                        project.type === 'EC' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {project.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'delayed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {project.state} • {project.budget} • {project.teamSize} members
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-gray-100">
          {/* Map Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="relative border-2 border-gray-300 rounded-xl bg-white/30 backdrop-blur-sm"
              style={{ 
                transform: `scale(${zoom})`,
                transition: 'transform 0.3s ease',
                width: '85%',
                height: '85%'
              }}
            >
              {/* Project Pins */}
              {filteredProjects.map((project) => {
                const state = project.state;
                const coords = getStateCoordinates(state);
                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${coords.x + getCoordinateOffset(project.name, 'x', 8)}%`,
                      top: `${coords.y + getCoordinateOffset(project.name, 'y', 5)}%`,
                    }}
                  >
                    <MapPin className={`
                      w-8 h-8 transition-all duration-300
                      ${selectedProject === project.id ? 'scale-125 drop-shadow-xl' : 'group-hover:scale-110'}
                      ${project.type === 'EIA' ? 'text-green-500' : ''}
                      ${project.type === 'EC' ? 'text-blue-500' : ''}
                      ${project.type === 'Hybrid' ? 'text-purple-500' : ''}
                      ${project.status === 'completed' ? 'opacity-80' : ''}
                    `} />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-2 py-1 rounded">
                      {project.name.split('-')[0].trim()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Project Details */}
          {selectedProjectData && (
            <div className="absolute top-4 right-4 w-96 bg-white rounded-xl shadow-xl border p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">{selectedProjectData.name}</h3>
                <button onClick={() => setSelectedProject(null)}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedProjectData.type === 'EIA' ? 'bg-green-100 text-green-800' :
                    selectedProjectData.type === 'EC' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {selectedProjectData.type} Project
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedProjectData.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedProjectData.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    selectedProjectData.status === 'delayed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedProjectData.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{selectedProjectData.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-medium">{selectedProjectData.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Team Size</p>
                    <p className="font-medium">{selectedProjectData.teamSize} members</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Project ID</p>
                    <p className="font-medium">PRJ-00{selectedProjectData.id}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    View Project Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-white border rounded-xl shadow-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowLayers(!showLayers)}
              className="p-3 bg-white border rounded-xl shadow-lg hover:bg-gray-50"
            >
              <Layers className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-3 bg-white border rounded-xl shadow-lg hover:bg-gray-50"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-3 bg-white border rounded-xl shadow-lg hover:bg-gray-50"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white border rounded-xl shadow-lg hover:bg-gray-50">
              <Download className="w-5 h-5" />
            </button>
          </div>

          {/* Zoom Level Display */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
            <div className="text-sm font-medium">Zoom: {Math.round(zoom * 100)}%</div>
          </div>

          {/* Legend */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h4 className="font-semibold mb-3">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" />
                <span className="text-sm">EIA Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-sm">EC Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Hybrid Projects</span>
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="text-xs text-gray-500">Click on pins for details</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for coordinates
function getStateCoordinates(state: string) {
  const coordinates: Record<string, { x: number; y: number }> = {
    'Rajasthan': { x: 30, y: 35 },
    'Gujarat': { x: 30, y: 50 },
    'Maharashtra': { x: 40, y: 50 },
    'Tamil Nadu': { x: 50, y: 75 },
    'Karnataka': { x: 45, y: 65 },
    'Andhra Pradesh': { x: 50, y: 60 },
    'Himachal Pradesh': { x: 45, y: 30 },
    'Punjab': { x: 40, y: 30 },
    'Madhya Pradesh': { x: 35, y: 45 },
  };
  return coordinates[state] || { x: 50, y: 50 };
}
