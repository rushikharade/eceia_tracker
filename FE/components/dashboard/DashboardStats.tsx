// components/dashboard/DashboardStats.tsx
'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardStatsProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo';
  onClick?: () => void;
}

export default function DashboardStats({
  title,
  value,
  change,
  icon,
  color,
  onClick,
}: DashboardStatsProps) {
  const isPositive = change >= 0;
  
  const colorClasses = {
    blue: 'border-blue-200',
    green: 'border-green-200',
    orange: 'border-orange-200',
    red: 'border-red-200',
    purple: 'border-purple-200',
    indigo: 'border-indigo-200',
  };

  const bgColorClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    red: 'bg-red-50',
    purple: 'bg-purple-50',
    indigo: 'bg-indigo-50',
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    indigo: 'text-indigo-600',
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer ${colorClasses[color]}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-2 text-gray-900">{value.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${bgColorClasses[color]}`}>
          <div className={iconColorClasses[color]}>{icon}</div>
        </div>
      </div>
    </motion.div>
  );
}