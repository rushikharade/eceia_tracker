'use client';

import { Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function ProjectTimeline() {
  const timeline = [
    {
      project: 'Solar Plant - Rajasthan',
      date: 'Mar 15, 2024',
      status: 'upcoming',
      type: 'EIA Submission',
    },
    {
      project: 'Wind Farm - Gujarat',
      date: 'Mar 10, 2024',
      status: 'completed',
      type: 'Final Review',
    },
    {
      project: 'Hydro Dam - Himachal',
      date: 'Mar 5, 2024',
      status: 'delayed',
      type: 'Site Inspection',
    },
    {
      project: 'Thermal Plant - Maharashtra',
      date: 'Mar 1, 2024',
      status: 'completed',
      type: 'Client Meeting',
    },
    {
      project: 'Biomass Plant - Karnataka',
      date: 'Feb 28, 2024',
      status: 'completed',
      type: 'Report Submission',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'delayed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'upcoming':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'delayed':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'upcoming':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-3">
      {timeline.map((item, index) => (
        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
              {getStatusIcon(item.status)}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm truncate">{item.project}</h4>
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Calendar className="w-3 h-3" />
                <span>{item.date}</span>
              </div>
              <div className="text-xs text-gray-600">{item.type}</div>
            </div>
          </div>
        </div>
      ))}
      
      <button className="w-full p-3 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">View Full Calendar</span>
      </button>
    </div>
  );
}