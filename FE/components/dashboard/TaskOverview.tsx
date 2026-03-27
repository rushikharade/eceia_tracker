'use client';

import { useState } from 'react';
import { Progress } from '@/components/ui/progress';

export default function TaskOverview() {
  const [selectedView, setSelectedView] = useState('all');

  const taskData = {
    total: 156,
    byStatus: [
      { label: 'Completed', count: 89, color: 'bg-green-500' },
      { label: 'In Progress', count: 45, color: 'bg-blue-500' },
      { label: 'Pending', count: 22, color: 'bg-amber-500' },
    ],
    byPriority: [
      { label: 'High', count: 34, color: 'bg-red-500' },
      { label: 'Medium', count: 67, color: 'bg-yellow-500' },
      { label: 'Low', count: 55, color: 'bg-green-500' },
    ],
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">{taskData.total}</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('all')}
            className={`px-3 py-1 text-sm rounded-lg ${selectedView === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedView('priority')}
            className={`px-3 py-1 text-sm rounded-lg ${selectedView === 'priority' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
          >
            By Priority
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {(selectedView === 'all' ? taskData.byStatus : taskData.byPriority).map((item) => {
          const percentage = Math.round((item.count / taskData.total) * 100);
          
          return (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span>{item.label}</span>
                </div>
                <span className="font-medium">{item.count} ({percentage}%)</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold">{taskData.byStatus[0].count}</div>
            <div className="text-xs text-gray-600">Done</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{taskData.byStatus[1].count}</div>
            <div className="text-xs text-gray-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{taskData.byStatus[2].count}</div>
            <div className="text-xs text-gray-600">Todo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
