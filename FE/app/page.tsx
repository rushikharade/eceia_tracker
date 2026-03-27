"use client";

import { useState } from "react";
import {
  FolderKanban,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  TrendingUp,
  MapPin,
  BarChart3,
  Plus,
  FileText,
  Settings,
  UserPlus,
} from "lucide-react";

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentProjects from "@/components/dashboard/RecentProjects";
import TaskOverviewChart from "@/components/dashboard/TaskOverviewChart";
import EmployeePerformance from "@/components/dashboard/EmployeePerformance";
import AdvancedCharts from "@/components/dashboard/AdvancedCharts";
import InteractiveMap from "@/components/dashboard/InteractiveMap";
import NewProjectPanel from "@/components/NewProjectPanel";

export default function DashboardPage() {
  const [openNewProject, setOpenNewProject] = useState(false);

  /* ---------------- STATS DATA ---------------- */
  const statsData = [
    {
      title: "Total Projects",
      value: 48,
      change: 5,
      icon: <FolderKanban className="w-6 h-6" />,
      color: "blue" as const,
    },
    {
      title: "Completed Projects",
      value: 12,
      change: 5,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "green" as const,
    },
    {
      title: "In Progress",
      value: 32,
      change: 8,
      icon: <Clock className="w-6 h-6" />,
      color: "orange" as const,
    },
    {
      title: "Delayed Projects",
      value: 4,
      change: -2,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "red" as const,
    },
    {
      title: "Active Tasks",
      value: 156,
      change: 15,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "purple" as const,
    },
    {
      title: "Team Members",
      value: 42,
      change: 3,
      icon: <Users className="w-6 h-6" />,
      color: "indigo" as const,
    },
  ];

  /* ---------------- QUICK ACTIONS ---------------- */
  const quickActions = [
    {
      label: "New Project",
      description: "Create project",
      icon: Plus,
      color: "bg-blue-600",
    },
    {
      label: "Generate Report",
      description: "Export data",
      icon: FileText,
      color: "bg-green-600",
    },
    {
      label: "Add Member",
      description: "Invite user",
      icon: UserPlus,
      color: "bg-purple-600",
    },
    {
      label: "Settings",
      description: "System config",
      icon: Settings,
      color: "bg-gray-700",
    },
  ];
  return (
    <div className="space-y-6">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome, Admin 👋
          </h1>
          <p className="text-gray-600 mt-2">
            EIA / EC Project Management Dashboard
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg shadow-sm flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            View Full Map
          </button>
          <button
            onClick={() => setOpenNewProject(true)}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 text-sm font-semibold flex items-center gap-2"
          >
            <FolderKanban size={16} /> New Project
          </button>

          <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>
      {openNewProject && (
        <NewProjectPanel onClose={() => setOpenNewProject(false)} />
      )}

      {/* ---------------- STATS GRID ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statsData.map((stat, index) => (
          <DashboardStats key={index} {...stat} />
        ))}
      </div>

      {/* ---------------- MAP ---------------- */}
      <InteractiveMap />

      {/* ---------------- CHARTS ---------------- */}
      <AdvancedCharts />

      {/* ---------------- MAIN GRID ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROJECT TIMELINE */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Project Timeline</h2>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">On track: 85%</span>
              </div>
            </div>

            {[
              {
                project: "Solar Plant - Rajasthan",
                progress: 65,
                status: "On Track",
                timeline: "Jan 2024 - Jun 2024",
              },
              {
                project: "Wind Farm - Gujarat",
                progress: 100,
                status: "Completed",
                timeline: "Nov 2023 - Feb 2024",
              },
              {
                project: "Hydro Project - HP",
                progress: 45,
                status: "Delayed",
                timeline: "Dec 2023 - May 2024",
              },
            ].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{item.project}</span>
                  <span
                    className={
                      item.status === "Completed"
                        ? "text-blue-600"
                        : item.status === "Delayed"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {item.status}
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.status === "Completed"
                        ? "bg-blue-500"
                        : item.status === "Delayed"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{item.timeline}</span>
                  <span>{item.progress}%</span>
                </div>
              </div>
            ))}
          </div>

          <RecentProjects />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <TaskOverviewChart />
          <EmployeePerformance />

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-sm">{action.label}</span>
                    <span className="text-xs text-gray-500">
                      {action.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
