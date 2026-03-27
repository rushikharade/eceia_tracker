// app/layout.tsx - Updated Layout with Modern Design
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'EIA/EC Project Command Center',
  description: 'Advanced Task Management System for Environmental Clearance Projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        {/* Background Gradient Layer */}
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 -z-10" />
        
        <div className="flex min-h-screen">
          {/* Enhanced Sidebar with Glassmorphism */}
          <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40">
            <div className="flex-1 flex flex-col backdrop-blur-xl bg-white/70 border-r border-white/40 shadow-2xl">
              <Sidebar />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:pl-64 flex flex-col flex-1 w-full">
            {/* Enhanced Header with Glassmorphism */}
            <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-lg">
              <Header />
            </div>
            
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="max-w-[1920px] mx-auto w-full">
                {children}
              </div>
            </main>
            
            {/* Enhanced Footer */}
            <div className="backdrop-blur-xl bg-white/70 border-t border-white/40">
              <Footer />
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        <div id="mobile-menu-backdrop" className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 hidden lg:hidden" />
      </body>
    </html>
  );
} 