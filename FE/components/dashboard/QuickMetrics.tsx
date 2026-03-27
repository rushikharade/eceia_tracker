import { CheckCircle, Target, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function QuickMetrics() {
  const metrics = [
    {
      label: 'On-Time Delivery',
      value: '85%',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'green',
      change: '+5%',
    },
    {
      label: 'Budget Utilization',
      value: '62%',
      icon: <DollarSign className="w-4 h-4" />,
      color: 'blue',
      change: '+8%',
    },
    {
      label: 'Team Utilization',
      value: '82%',
      icon: <Users className="w-4 h-4" />,
      color: 'purple',
      change: '+12%',
    },
    {
      label: 'Client Satisfaction',
      value: '94%',
      icon: <Target className="w-4 h-4" />,
      color: 'green',
      change: '+2%',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((metric, index) => (
        <div key={index} className="p-3 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-1.5 rounded-lg bg-${metric.color}-100`}>
              <div className={`text-${metric.color}-600`}>{metric.icon}</div>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-3 h-3" />
              <span>{metric.change}</span>
            </div>
          </div>
          <div className="text-xl font-bold">{metric.value}</div>
          <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
