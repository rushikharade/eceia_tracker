export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p className="text-gray-600">System configuration and settings</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">User Management</h3>
          <p className="text-gray-600">Manage user roles and permissions</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">System Settings</h3>
          <p className="text-gray-600">Configure application settings</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">Data Management</h3>
          <p className="text-gray-600">Import/export and backup data</p>
        </div>
      </div>
    </div>
  );
}