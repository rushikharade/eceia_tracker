// app/teams/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Users, Building } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  description: string;
  lead: string;
  department: string;
  memberCount: number;
  projectCount: number;
}

const mockTeams: Team[] = [
  {
    id: 'TEA-001',
    name: 'Environmental Assessment Team',
    description: 'Handles all EIA projects and environmental clearances',
    lead: 'Rajesh Kumar',
    department: 'Environmental',
    memberCount: 8,
    projectCount: 12,
  },
  {
    id: 'TEA-002',
    name: 'Engineering Team',
    description: 'Technical design and field implementation',
    lead: 'Amit Patel',
    department: 'Engineering',
    memberCount: 6,
    projectCount: 8,
  },
  {
    id: 'TEA-003',
    name: 'Legal & Compliance',
    description: 'Legal documentation and regulatory compliance',
    lead: 'Sneha Verma',
    department: 'Legal',
    memberCount: 4,
    projectCount: 6,
  },
  {
    id: 'TEA-004',
    name: 'Community Relations',
    description: 'Public consultations and stakeholder management',
    lead: 'Vikram Singh',
    department: 'Community',
    memberCount: 5,
    projectCount: 7,
  },
];

export default function TeamsPage() {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredTeams = mockTeams.filter(team => {
    if (search && !team.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (departmentFilter !== 'all' && team.department !== departmentFilter) {
      return false;
    }
    return true;
  });

  const departments = Array.from(new Set(mockTeams.map(team => team.department)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600">Manage project teams and members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Create Team
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Teams</p>
              <p className="text-2xl font-bold mt-2">{mockTeams.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold mt-2">
                {mockTeams.reduce((sum, team) => sum + team.memberCount, 0)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold mt-2">
                {mockTeams.reduce((sum, team) => sum + team.projectCount, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold mt-2">{departments.length}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Building className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search teams..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{team.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{team.description}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {team.department}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">{team.lead}</span> (Team Lead)
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{team.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span>{team.projectCount} projects</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No teams found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          <button 
            className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800"
            onClick={() => {
              setSearch('');
              setDepartmentFilter('all');
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
