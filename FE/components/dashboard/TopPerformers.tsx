import { Star, TrendingUp, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function TopPerformers() {
  const performers = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Lead Scientist',
      rating: 4.9,
      efficiency: 95,
      tasks: 156,
      projects: 8,
    },
    {
      name: 'Priya Sharma',
      role: 'Project Manager',
      rating: 4.8,
      efficiency: 92,
      tasks: 142,
      projects: 6,
    },
    {
      name: 'Arjun Patel',
      role: 'Researcher',
      rating: 4.7,
      efficiency: 88,
      tasks: 134,
      projects: 5,
    },
  ];

  return (
    <div className="space-y-4">
      {performers.map((performer, index) => (
        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {performer.name.split(' ').map(n => n[0]).join('')}
            </div>
            {index === 0 && (
              <Award className="absolute -top-1 -right-1 w-5 h-5 text-amber-500" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-sm truncate">{performer.name}</h4>
                <p className="text-xs text-gray-600">{performer.role}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-600">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-sm font-medium">{performer.rating}</span>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Efficiency</span>
                <span className="font-medium">{performer.efficiency}%</span>
              </div>
              <Progress value={performer.efficiency} className="h-1.5" />
              
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{performer.tasks} tasks</span>
                </div>
                <span>{performer.projects} projects</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
