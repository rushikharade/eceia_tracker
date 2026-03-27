'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MonthlyProjectChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = {
    eia: [3, 4, 5, 3, 6, 4, 5, 6, 4, 5, 6, 7],
    ec: [2, 3, 4, 5, 3, 4, 5, 4, 6, 5, 4, 6],
  };

  const maxValue = Math.max(...data.eia, ...data.ec);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold">156</div>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">+12% from last year</span>
          </div>
        </div>
        <p className="text-gray-600 mt-1">Total projects started this year</p>
      </div>

      <div className="relative h-48">
        <div className="absolute inset-0 flex items-end justify-between">
          {months.map((month, index) => {
            const eiaHeight = (data.eia[index] / maxValue) * 100;
            const ecHeight = (data.ec[index] / maxValue) * 100;
            
            return (
              <div key={month} className="flex flex-col items-center" style={{ width: '7%' }}>
                <div className="flex items-end justify-center w-full" style={{ height: '100%' }}>
                  <div className="w-3/5 bg-blue-500 rounded-t" style={{ height: `${eiaHeight}%` }}></div>
                  <div className="w-3/5 bg-green-500 rounded-t ml-1" style={{ height: `${ecHeight}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{month}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="font-medium">EIA Projects</span>
          </div>
          <div className="text-2xl font-bold mt-1">58</div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-3 h-3" />
            <span>+8% this year</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="font-medium">EC Projects</span>
          </div>
          <div className="text-2xl font-bold mt-1">44</div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-3 h-3" />
            <span>+15% this year</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="font-medium">Hybrid</span>
          </div>
          <div className="text-2xl font-bold mt-1">22</div>
          <div className="flex items-center gap-1 text-amber-600 text-sm">
            <TrendingDown className="w-3 h-3" />
            <span>-3% this year</span>
          </div>
        </div>
      </div>
    </div>
  );
}