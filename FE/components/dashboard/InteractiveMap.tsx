// components/dashboard/InteractiveMap.tsx
'use client';

import { useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Filter, Download } from 'lucide-react';

// Mock project locations data
const projectLocations = [
  { id: 1, name: 'Solar Power Plant', type: 'EIA', status: 'active', state: 'Rajasthan', lat: 27, lng: 74, teamSize: 8 },
  { id: 2, name: 'Wind Farm', type: 'EC', status: 'completed', state: 'Gujarat', lat: 22, lng: 72, teamSize: 6 },
  { id: 3, name: 'Hydro Project', type: 'Hybrid', status: 'delayed', state: 'Himachal Pradesh', lat: 31, lng: 77, teamSize: 12 },
  { id: 4, name: 'Thermal Plant', type: 'EIA', status: 'active', state: 'Maharashtra', lat: 19, lng: 73, teamSize: 10 },
  { id: 5, name: 'Nuclear Plant', type: 'EC', status: 'completed', state: 'Tamil Nadu', lat: 11, lng: 79, teamSize: 15 },
  { id: 6, name: 'Solar Park', type: 'EIA', status: 'active', state: 'Karnataka', lat: 15, lng: 76, teamSize: 7 },
  { id: 7, name: 'Wind Turbines', type: 'EC', status: 'active', state: 'Andhra Pradesh', lat: 16, lng: 80, teamSize: 9 },
  { id: 8, name: 'Biomass Plant', type: 'Hybrid', status: 'planned', state: 'Punjab', lat: 31, lng: 75, teamSize: 5 },
];

const stateData = [
  { state: 'Rajasthan', eia: 8, ec: 4, total: 12 },
  { state: 'Gujarat', eia: 6, ec: 9, total: 15 },
  { state: 'Maharashtra', eia: 12, ec: 8, total: 20 },
  { state: 'Tamil Nadu', eia: 5, ec: 7, total: 12 },
  { state: 'Karnataka', eia: 9, ec: 6, total: 15 },
  { state: 'Andhra Pradesh', eia: 4, ec: 8, total: 12 },
  { state: 'Himachal Pradesh', eia: 3, ec: 2, total: 5 },
  { state: 'Punjab', eia: 2, ec: 3, total: 5 },
];

const getCoordinateOffset = (seed: string, axis: 'x' | 'y', spread: number) => {
  const hash = Array.from(`${seed}-${axis}`).reduce(
    (value, character) => value + character.charCodeAt(0),
    0
  );

  return ((hash % 1000) / 1000 - 0.5) * spread;
};

export default function InteractiveMap() {
  const [zoom, setZoom] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedType === 'all' 
    ? projectLocations 
    : projectLocations.filter(project => project.type === selectedType);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  // Get projects for selected state
  const stateProjects = selectedState 
    ? projectLocations.filter(p => p.state === selectedState)
    : [];

  // Calculate totals
  const totals = {
    totalProjects: projectLocations.length,
    activeProjects: projectLocations.filter(p => p.status === 'active').length,
    completedProjects: projectLocations.filter(p => p.status === 'completed').length,
    totalTeamSize: projectLocations.reduce((sum, p) => sum + p.teamSize, 0),
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Project Locations Map</h2>
          <p className="text-sm text-gray-600">Interactive map showing all EIA/EC projects across India</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <select 
              className="border rounded-lg px-3 py-1.5 text-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Project Types</option>
              <option value="EIA">EIA Projects</option>
              <option value="EC">EC Projects</option>
              <option value="Hybrid">Hybrid Projects</option>
            </select>
            <button className="p-1.5 border rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleZoomOut} className="p-1.5 border rounded-lg hover:bg-gray-50">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={handleZoomIn} className="p-1.5 border rounded-lg hover:bg-gray-50">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-1.5 border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="relative h-[400px] bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl border overflow-hidden">
            {/* Simplified India Map Outline */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="relative border-2 border-gray-300 rounded-lg bg-white/20"
                style={{ 
                  transform: `scale(${zoom})`,
                  transition: 'transform 0.3s ease',
                  width: '90%',
                  height: '90%'
                }}
              >
                {/* State Boundaries (simplified) */}
                {stateData.map((state) => (
                  <button
                    key={state.state}
                    onClick={() => setSelectedState(selectedState === state.state ? null : state.state)}
                    className={`absolute rounded-lg transition-all ${
                      selectedState === state.state 
                        ? 'bg-blue-100/70 border-2 border-blue-400' 
                        : 'bg-white/30 border border-gray-300 hover:bg-white/50'
                    }`}
                    style={{
                      left: `${getStateCoordinates(state.state).x}%`,
                      top: `${getStateCoordinates(state.state).y}%`,
                      width: `${getStateCoordinates(state.state).width}%`,
                      height: `${getStateCoordinates(state.state).height}%`,
                      padding: '4px',
                    }}
                  >
                    <div className="text-xs font-medium truncate">{state.state}</div>
                    <div className="text-xs text-gray-600">{state.total} projects</div>
                  </button>
                ))}

                {/* Project Pins */}
                {filteredProjects.map((project) => {
                  const coords = getProjectCoordinates(project.state);
                  return (
                    <div
                      key={project.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{
                        left: `${coords.x + getCoordinateOffset(project.name, 'x', 5)}%`,
                        top: `${coords.y + getCoordinateOffset(project.name, 'y', 3)}%`,
                      }}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <MapPin className={`
                        w-6 h-6 transition-transform duration-200
                        ${hoveredProject === project.id ? 'scale-125' : ''}
                        ${project.status === 'active' ? 'text-green-500' : ''}
                        ${project.status === 'completed' ? 'text-blue-500' : ''}
                        ${project.status === 'delayed' ? 'text-red-500' : ''}
                        ${project.status === 'planned' ? 'text-yellow-500' : ''}
                        ${project.type === 'EIA' ? 'drop-shadow-lg' : ''}
                        ${project.type === 'EC' ? 'drop-shadow-lg' : ''}
                      `} />
                      
                      {/* Project Info Tooltip */}
                      {hoveredProject === project.id && (
                        <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-3 rounded-lg shadow-xl z-50 min-w-[200px]">
                          <div className="text-sm font-semibold">{project.name}</div>
                          <div className="text-xs opacity-80 mt-1">{project.state}</div>
                          <div className="flex items-center gap-2 mt-2">
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
                          <div className="text-xs mt-2">
                            Team: {project.teamSize} members
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                className="p-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <div className="text-sm font-medium mb-2">Legend</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-xs">Active Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-xs">Completed Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-xs">Delayed Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs">Planned Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State-wise Statistics */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Map Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Projects</span>
                <span className="font-semibold">{totals.totalProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Projects</span>
                <span className="font-semibold text-green-600">{totals.activeProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-blue-600">{totals.completedProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Team Size</span>
                <span className="font-semibold">{totals.totalTeamSize}</span>
              </div>
            </div>
          </div>

          {/* State-wise Breakdown */}
          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-3">State-wise Project Count</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {stateData.map((state) => (
                <div 
                  key={state.state}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedState === state.state ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedState(state.state)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{state.state}</span>
                    <span className="text-sm font-semibold">{state.total}</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    <div 
                      className="h-2 rounded-full bg-green-500" 
                      style={{ width: `${(state.eia / state.total) * 100}%` }}
                    />
                    <div 
                      className="h-2 rounded-full bg-blue-500" 
                      style={{ width: `${(state.ec / state.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>EIA: {state.eia}</span>
                    <span>EC: {state.ec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected State Details */}
          {selectedState && stateProjects.length > 0 && (
            <div className="bg-white border rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Projects in {selectedState}</h3>
                <button 
                  onClick={() => setSelectedState(null)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {stateProjects.map((project) => (
                  <div key={project.id} className="p-2 border rounded-lg">
                    <div className="font-medium text-sm">{project.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        project.type === 'EIA' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {project.type}
                      </span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions for coordinates (simplified)
function getStateCoordinates(state: string) {
  const coordinates: Record<string, { x: number; y: number; width: number; height: number }> = {
    'Rajasthan': { x: 25, y: 30, width: 15, height: 15 },
    'Gujarat': { x: 25, y: 45, width: 10, height: 10 },
    'Maharashtra': { x: 35, y: 45, width: 12, height: 10 },
    'Tamil Nadu': { x: 45, y: 70, width: 8, height: 8 },
    'Karnataka': { x: 40, y: 60, width: 10, height: 8 },
    'Andhra Pradesh': { x: 45, y: 55, width: 10, height: 10 },
    'Himachal Pradesh': { x: 40, y: 25, width: 8, height: 6 },
    'Punjab': { x: 35, y: 25, width: 8, height: 6 },
  };
  return coordinates[state] || { x: 50, y: 50, width: 10, height: 10 };
}

function getProjectCoordinates(state: string) {
  const baseCoords = getStateCoordinates(state);
  return {
    x: baseCoords.x + baseCoords.width / 2,
    y: baseCoords.y + baseCoords.height / 2,
  };
}
