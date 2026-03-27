export default function ReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>
      <p className="text-gray-600">Generate and view project reports</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">Project Reports</h3>
          <ul className="space-y-2">
            <li className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Project Progress Report</li>
            <li className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Financial Summary</li>
            <li className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Timeline Analysis</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">Employee Reports</h3>
          <ul className="space-y-2">
            <li className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Performance Metrics</li>
            <li className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Task Completion Rate</li>
            <li className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Workload Distribution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}