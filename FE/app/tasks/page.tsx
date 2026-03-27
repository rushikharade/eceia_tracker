// app/tasks/page.tsx
export default function TasksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Task {i}</h3>
                <p className="text-sm text-gray-500">Project {i}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                In Progress
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}