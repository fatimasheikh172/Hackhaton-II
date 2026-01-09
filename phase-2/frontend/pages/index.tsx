import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth-context';
import { CheckCircle2, Calendar, Users, Zap, ArrowRight, Github, Lock, Cloud } from 'lucide-react';

const HomePage = () => {
  const router = useRouter();
  const { state } = useAuth();

  // Redirect authenticated users to tasks page
  useEffect(() => {
    if (state.isAuthenticated) {
      router.push('/tasks');
    }
  }, [state.isAuthenticated, router]);

  const handleGetStarted = () => {
    if (state.isAuthenticated) {
      router.push('/tasks');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Todo App - Organize Your Tasks Efficiently</title>
        <meta name="description" content="A beautiful and efficient todo application to organize your tasks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Todo App</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/fatimasheikh172?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Organize Your Tasks Efficiently
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A simple and effective todo application to help you manage your tasks and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Simple and Effective
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Everything you need to stay organized and productive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Task Management
              </h3>
              <p className="text-gray-600">
                Easily create, update, and track your tasks.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Organization
              </h3>
              <p className="text-gray-600">
                Keep your tasks organized and prioritize effectively.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Productivity
              </h3>
              <p className="text-gray-600">
                Boost your productivity with simple tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Todo App</span>
            </div>
            <p className="text-gray-600 mb-6">
              Organize your tasks, boost your productivity.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;