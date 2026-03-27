// components/dashboard/EmployeePerformance.tsx
'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

const employees = [
  { id: 1, name: 'Rajesh Kumar', role: 'Project Manager', tasks: 15, completed: 14, performance: 95 },
  { id: 2, name: 'Priya Sharma', role: 'EIA Expert', tasks: 12, completed: 11, performance: 92 },
  { id: 3, name: 'Amit Patel', role: 'Field Engineer', tasks: 18, completed: 17, performance: 94 },
  { id: 4, name: 'Sneha Verma', role: 'Legal Consultant', tasks: 8, completed: 8, performance: 100 },
];

export default function EmployeePerformance() {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
        <button className="text-blue-600 text-sm hover:underline">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {employees.map((employee) => (
          <div key={employee.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-blue-700 font-semibold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium">{employee.name}</p>
                <p className="text-sm text-gray-500">{employee.role}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1">
                {employee.performance > 90 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <p className={`font-medium ${employee.performance > 90 ? 'text-green-600' : 'text-red-600'}`}>
                  {employee.performance}%
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {employee.completed}/{employee.tasks} tasks
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}