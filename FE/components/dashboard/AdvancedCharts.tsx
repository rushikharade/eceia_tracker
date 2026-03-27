'use client';

import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  BarChart3,
  LineChart as LineChartIcon,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import CHART_COLORS from '@/lib/constants';

const monthlyData = [
  { month: 'Jan', eia: 45, ec: 32, hybrid: 12, revenue: 450 },
  { month: 'Feb', eia: 52, ec: 38, hybrid: 14, revenue: 520 },
  { month: 'Mar', eia: 48, ec: 42, hybrid: 16, revenue: 480 },
  { month: 'Apr', eia: 60, ec: 45, hybrid: 18, revenue: 600 },
  { month: 'May', eia: 55, ec: 48, hybrid: 20, revenue: 550 },
  { month: 'Jun', eia: 65, ec: 52, hybrid: 22, revenue: 650 },
  { month: 'Jul', eia: 70, ec: 58, hybrid: 25, revenue: 700 },
  { month: 'Aug', eia: 68, ec: 55, hybrid: 23, revenue: 680 },
];

const projectTypeData = [
  { name: 'EIA Projects', value: 45, color: CHART_COLORS.eia },
  { name: 'EC Projects', value: 32, color: CHART_COLORS.ec },
  { name: 'Hybrid', value: 15, color: CHART_COLORS.hybrid },
  { name: 'Others', value: 8, color: CHART_COLORS.others },
];

const taskStatusData = [
  { name: 'Completed', value: 124, color: CHART_COLORS.eia },
  { name: 'In Progress', value: 68, color: CHART_COLORS.ec },
  { name: 'Pending', value: 32, color: CHART_COLORS.pending },
  { name: 'Delayed', value: 16, color: CHART_COLORS.delayed },
];

const revenueData = [
  { month: 'Jan', revenue: 450, expenses: 320 },
  { month: 'Feb', revenue: 520, expenses: 380 },
  { month: 'Mar', revenue: 480, expenses: 350 },
  { month: 'Apr', revenue: 600, expenses: 420 },
  { month: 'May', revenue: 550, expenses: 400 },
  { month: 'Jun', revenue: 650, expenses: 480 },
];

type ChartType = 'bar' | 'line' | 'area';
type TimeRange = '3months' | '6months' | 'year';

export default function AdvancedCharts() {
  const [activeChart, setActiveChart] = useState<ChartType>('bar');
  const [timeRange, setTimeRange] = useState<TimeRange>('6months');

  const filteredData = useMemo(() => {
    if (timeRange === '3months') {
      return monthlyData.slice(-3);
    }

    if (timeRange === '6months') {
      return monthlyData.slice(-6);
    }

    return monthlyData;
  }, [timeRange]);

  const formatCount = (value: number) => `${value} projects`;
  const formatTasks = (value: number) => `${value} tasks`;
  const formatCurrencyShort = (value: number) =>
    `Rs ${Number(value).toLocaleString()} Cr`;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Projects Trend</h2>
            <p className="text-sm text-gray-600">
              Monthly project distribution by type
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                aria-pressed={activeChart === 'bar'}
                className={`px-3 py-1.5 text-sm transition-all ${
                  activeChart === 'bar'
                    ? 'rounded-md bg-white shadow'
                    : 'rounded-md hover:bg-gray-200'
                }`}
                onClick={() => setActiveChart('bar')}
              >
                <BarChart3 className="mr-2 inline h-4 w-4" />
                Bar
              </button>
              <button
                type="button"
                aria-pressed={activeChart === 'line'}
                className={`px-3 py-1.5 text-sm transition-all ${
                  activeChart === 'line'
                    ? 'rounded-md bg-white shadow'
                    : 'rounded-md hover:bg-gray-200'
                }`}
                onClick={() => setActiveChart('line')}
              >
                <LineChartIcon className="mr-2 inline h-4 w-4" />
                Line
              </button>
              <button
                type="button"
                aria-pressed={activeChart === 'area'}
                className={`px-3 py-1.5 text-sm transition-all ${
                  activeChart === 'area'
                    ? 'rounded-md bg-white shadow'
                    : 'rounded-md hover:bg-gray-200'
                }`}
                onClick={() => setActiveChart('area')}
              >
                <TrendingDown className="mr-2 inline h-4 w-4" />
                Area
              </button>
            </div>
            <select
              aria-label="Time range"
              className="rounded-lg border px-3 py-1.5 text-sm"
              value={timeRange}
              onChange={(event) => setTimeRange(event.target.value as TimeRange)}
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        <div className="h-80" style={{ minHeight: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === 'bar' ? (
              <BarChart data={filteredData}>
                <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => [formatCount(Number(value)), 'Count']}
                />
                <Legend verticalAlign="top" align="right" />
                <Bar
                  dataKey="eia"
                  fill={CHART_COLORS.eia}
                  name="EIA Projects"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="ec"
                  fill={CHART_COLORS.ec}
                  name="EC Projects"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="hybrid"
                  fill={CHART_COLORS.hybrid}
                  name="Hybrid Projects"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : activeChart === 'line' ? (
              <LineChart data={filteredData}>
                <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCount(Number(value)), 'Count']} />
                <Legend verticalAlign="top" align="right" />
                <Line
                  type="monotone"
                  dataKey="eia"
                  stroke={CHART_COLORS.eia}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="ec"
                  stroke={CHART_COLORS.ec}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="hybrid"
                  stroke={CHART_COLORS.hybrid}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <AreaChart data={filteredData}>
                <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCount(Number(value)), 'Count']} />
                <Legend verticalAlign="top" align="right" />
                <Area
                  type="monotone"
                  dataKey="eia"
                  stackId="1"
                  stroke={CHART_COLORS.eia}
                  fill={CHART_COLORS.eia}
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="ec"
                  stackId="1"
                  stroke={CHART_COLORS.ec}
                  fill={CHART_COLORS.ec}
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="hybrid"
                  stackId="1"
                  stroke={CHART_COLORS.hybrid}
                  fill={CHART_COLORS.hybrid}
                  fillOpacity={0.6}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold">Project Type Distribution</h3>
          <div className="h-64" style={{ minHeight: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props) =>
                    `${String(props.name ?? '')}: ${Math.round(
                      (props.percent ?? 0) * 100
                    )}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectTypeData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatTasks(Number(value)), 'Count']} />
                <Legend verticalAlign="top" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {projectTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
                <span className="ml-auto text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold">Task Status Distribution</h3>
          <div className="h-64" style={{ minHeight: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatTasks(Number(value)), 'Count']} />
                <Legend verticalAlign="top" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {taskStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
                <span className="ml-auto text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Revenue vs Expenses (Rs Crores)</h3>
            <p className="text-sm text-gray-600">Monthly financial overview</p>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">+18.5% growth</span>
          </div>
        </div>
        <div className="h-80" style={{ minHeight: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={CHART_COLORS.revenue}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={CHART_COLORS.revenue}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={CHART_COLORS.expenses}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={CHART_COLORS.expenses}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [formatCurrencyShort(Number(value)), 'Amount']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend verticalAlign="top" align="right" />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={CHART_COLORS.revenue}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke={CHART_COLORS.expenses}
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
