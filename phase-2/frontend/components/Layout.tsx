import React, { ReactNode, useState } from 'react';
import Header from './Header';
import { Menu, X, Plus } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Floating Add Task Button */}
      <button
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-30"
        onClick={() => {
          // This would open the task modal
          console.log('Open add task modal');
        }}
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Layout;