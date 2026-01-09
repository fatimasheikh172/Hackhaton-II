import React from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/router';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 bg-white border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 text-gray-900">Todo App</h1>
          </div>

          {state.isAuthenticated && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/70 px-3 py-1.5 rounded-lg border border-gray-200">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {state.user?.name || state.user?.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;