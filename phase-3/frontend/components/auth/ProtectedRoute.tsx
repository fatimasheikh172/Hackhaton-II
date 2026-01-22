import React from 'react';
import { useAuth } from '../../context/auth-context';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback = null }) => {
  const { state } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return fallback || null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;