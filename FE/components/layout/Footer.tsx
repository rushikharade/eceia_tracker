// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t bg-white py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} TSL EIA Project Manager. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a>
        </div>
        <div className="text-sm text-gray-500">
          Version 1.0.0
        </div>
      </div>
    </footer>
  );
}