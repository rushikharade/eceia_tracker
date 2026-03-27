// app/projects/page.tsx
export default function ProjectsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold mb-2">Project {i}</h3>
            <p className="text-gray-600 text-sm mb-4">Description of project {i}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}