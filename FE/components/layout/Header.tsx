// components/layout/Header.tsx - FIXED
'use client';

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Sun, 
  Moon, 
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Settings // ADD THIS IMPORT
} from 'lucide-react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search projects, tasks, employees..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-lg hover:bg-gray-100"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Help */}
          <button className="p-2.5 rounded-lg hover:bg-gray-100">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="p-2.5 rounded-lg hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Menu Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
                <div className="px-4 py-3 border-b">
                  <p className="font-medium">Admin User</p>
                  <p className="text-sm text-gray-500">admin@tsl.com</p>
                </div>
                <div className="py-1">
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                    <User className="w-4 h-4" />
                    Your Profile
                  </a>
                  <a href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                    <Settings className="w-4 h-4" /> {/* NOW THIS WORKS */}
                    Settings
                  </a>
                </div>
                <div className="border-t py-1">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full">
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
              Quick Add
            </button>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:opacity-90 font-medium">
              New Project
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}