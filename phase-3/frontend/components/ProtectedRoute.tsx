import React, { ReactNode } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push('/login');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  // Show loading state while checking authentication
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render children; otherwise, don't render anything while redirecting
  return state.isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;