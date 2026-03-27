// components/dashboard/TaskOverviewChart.tsx
'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function TaskOverviewChart() {
  const [timeRange, setTimeRange] = useState('month');

  const taskData = {
    allocated: 156,
    completed: 124,
    pending: 24,
    lagging: 8,
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Task Overview</h2>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <select 
            className="border rounded-lg px-3 py-1 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">Allocated</p>
            <p className="text-2xl font-bold text-blue-800">{taskData.allocated}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">Completed</p>
            <p className="text-2xl font-bold text-green-800">{taskData.completed}</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">Pending</p>
            <p className="text-2xl font-bold text-yellow-800">{taskData.pending}</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700">Lagging</p>
            <p className="text-2xl font-bold text-red-800">{taskData.lagging}</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Completion Rate</span>
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {Math.round((taskData.completed / taskData.allocated) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-1000"
                style={{ width: `${(taskData.completed / taskData.allocated) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">In-Progress Tasks</span>
              <span className="text-yellow-600">{taskData.pending} tasks</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full transition-all duration-1000"
                style={{ width: `${(taskData.pending / taskData.allocated) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Lagging Tasks</span>
              <span className="text-red-600">{taskData.lagging} tasks</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-1000"
                style={{ width: `${(taskData.lagging / taskData.allocated) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}