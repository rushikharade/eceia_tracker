// components/dashboard/QuickActions.tsx
'use client';

import type { ElementType } from 'react';
import {
  Plus,
  FileText,
  Users,
  Calendar,
  Download,
  Settings,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils'; // assuming you have a cn utility (from shadcn/ui or clsx + tailwind-merge)

interface QuickAction {
  icon: ElementType;
  label: string;
  description: string;
  iconClassName: string;
  onClick?: () => void; // optional handler for future interactivity
}

const quickActions: QuickAction[] = [
  {
    icon: Plus,
    label: 'New Project',
    description: 'Start a fresh project',
    iconClassName: 'bg-blue-600 group-hover:bg-blue-700',
  },
  {
    icon: FileText,
    label: 'Generate Report',
    description: 'Export current data',
    iconClassName: 'bg-emerald-600 group-hover:bg-emerald-700',
  },
  {
    icon: Users,
    label: 'Add Team Member',
    description: 'Invite collaborators',
    iconClassName: 'bg-violet-600 group-hover:bg-violet-700',
  },
  {
    icon: Calendar,
    label: 'Schedule Meeting',
    description: 'Book a review session',
    iconClassName: 'bg-amber-600 group-hover:bg-amber-700',
  },
  {
    icon: Download,
    label: 'Export Data',
    description: 'Download all records',
    iconClassName: 'bg-indigo-600 group-hover:bg-indigo-700',
  },
  {
    icon: Settings,
    label: 'Settings',
    description: 'Manage preferences',
    iconClassName: 'bg-zinc-600 group-hover:bg-zinc-700',
  },
];

export default function QuickActions() {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              className={cn(
                "group relative flex flex-col items-center gap-3 p-5 rounded-xl",
                "border border-gray-200 bg-gray-50/50",
                "transition-all duration-200 ease-out",
                "hover:shadow-md hover:border-gray-300 hover:bg-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                "active:scale-95"
              )}
              onClick={action.onClick}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center",
                  "shadow-sm transition-all duration-200",
                  action.iconClassName,
                  "group-hover:scale-110 group-hover:shadow-lg"
                )}
              >
                <Icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>

              {/* Text */}
              <div className="text-center">
                <p className="font-semibold text-sm text-gray-900 leading-tight">
                  {action.label}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">
                  {action.description}
                </p>
              </div>

              {/* Optional subtle ripple effect on hover */}
              <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-blue-200/50 transition-all pointer-events-none" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
