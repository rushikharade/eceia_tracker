import { AlertTriangle, Calendar, FileText, Users } from 'lucide-react';

export default function UpcomingDeadlines() {
  const deadlines = [
    {
      title: 'EIA Report Submission',
      project: 'Solar Power Plant',
      daysLeft: 2,
      priority: 'high',
      type: 'Document',
      assigned: 'Dr. Rajesh Kumar',
    },
    {
      title: 'Client Meeting',
      project: 'Wind Farm Project',
      daysLeft: 3,
      priority: 'medium',
      type: 'Meeting',
      assigned: 'Priya Sharma',
    },
    {
      title: 'Budget Review',
      project: 'Hydroelectric Dam',
      daysLeft: 5,
      priority: 'high',
      type: 'Review',
      assigned: 'Finance Team',
    },
    {
      title: 'Site Inspection',
      project: 'Thermal Plant',
      daysLeft: 7,
      priority: 'medium',
      type: 'Field Visit',
      assigned: 'Arjun Patel',
    },
  ];

  const getPriorityColor = (priority: string) => {
    return priority === 'high' 
      ? 'bg-red-100 text-red-800 border-red-200' 
      : 'bg-amber-100 text-amber-800 border-amber-200';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Document':
        return <FileText className="w-4 h-4" />;
      case 'Meeting':
        return <Users className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {deadlines.map((deadline, index) => (
        <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-100">
                {getIcon(deadline.type)}
              </div>
              <div>
                <h4 className="font-medium text-sm">{deadline.title}</h4>
                <p className="text-xs text-gray-600">{deadline.project}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(deadline.priority)}`}>
              {deadline.priority.toUpperCase()}
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Users className="w-3 h-3" />
              <span>{deadline.assigned}</span>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              deadline.daysLeft <= 3 ? 'text-red-600' : 'text-amber-600'
            }`}>
              <Calendar className="w-3 h-3" />
              <span>{deadline.daysLeft} day{deadline.daysLeft !== 1 ? 's' : ''} left</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}