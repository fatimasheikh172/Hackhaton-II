import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth-context';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Task } from '../types/task';
import { getTasks } from '../lib/api-client';
import { Inbox, Calendar, Archive, Filter, Plus, CheckCircle, Clock, Menu, X, LogOut, User, Sun, Moon, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const TasksPage = () => {
  const router = useRouter();
  const { state, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data.tasks);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load tasks:', err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleTasksUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  // Calculate progress
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // State for sidebar navigation
  const [activeTab, setActiveTab] = useState<'inbox' | 'today' | 'completed'>('inbox');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter tasks based on active tab and status filter
  const filteredTasks = tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.created_at || task.updated_at || Date.now());

    // First apply the active tab filter
    let tabFilter = true;
    switch(activeTab) {
      case 'inbox':
        tabFilter = true; // Show all tasks
        break;
      case 'today':
        tabFilter = taskDate.toDateString() === today.toDateString();
        break;
      case 'completed':
        tabFilter = task.status === 'completed';
        break;
      default:
        tabFilter = true;
    }

    // Then apply the status filter
    let statusFilterApplied = true;
    switch(statusFilter) {
      case 'pending':
        statusFilterApplied = task.status === 'pending';
        break;
      case 'completed':
        statusFilterApplied = task.status === 'completed';
        break;
      case 'all':
        statusFilterApplied = true;
        break;
    }

    return tabFilter && statusFilterApplied;
  });

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Navigation items for the sidebar
  const navigationItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'completed', label: 'Completed', icon: Archive },
  ];

  // Categories for the sidebar
  const categories = [
    { id: 'work', label: 'Work', count: 12 },
    { id: 'personal', label: 'Personal', count: 8 },
    { id: 'shopping', label: 'Shopping', count: 5 },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 bg-gray-50">
        {/* Progress Tracking Line - Top of page */}
        <div className="w-full h-1 bg-gray-200 bg-white">
          <motion.div
            className="h-full bg-[#6366f1]"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Top/Right Header (User & Stats) - Third panel */}
        <header className="bg-white border-b border-gray-200 bg-white border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900 text-gray-900">Todo App</h1>
              </div>

              {state.isAuthenticated && (
                <div className="flex items-center space-x-4">
                  {/* Command Palette Search Bar */}
                  <div className="hidden md:flex items-center">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search tasks (CMD+K)"
                        className="w-64 pl-10 pr-4 py-2 bg-white bg-white border border-gray-200 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <kbd className="text-xs text-gray-400 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">⌘K</kbd>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <button className="flex items-center space-x-2 bg-white bg-white px-3 py-1.5 rounded-lg border border-gray-200 border-gray-200 hover:border-[#6366f1]/50 transition-colors">
                      <User className="h-4 w-4 text-gray-500 text-gray-500" />
                      <span className="text-sm text-gray-700 text-gray-700">
                        {state.user?.name || state.user?.email}
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 px-4 py-2 text-sm font-medium text-white bg-[#6366f1] rounded-lg hover:bg-[#4f46e5] focus:outline-none focus:ring-2 ring-[#6366f1] transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Left Sidebar (Navigation) - First panel */}
          <aside
            className={`fixed md:static z-40 h-[calc(100vh-4rem)] md:h-auto w-64 bg-white bg-white border border-gray-200 border-gray-200 transition-transform duration-300 rounded-2xl mx-4 mt-4 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:block`}
          >
            <div className="p-6">
              {/* Logo */}
              <div className="mb-8">
                <h1 className="text-xl font-bold text-gray-900 text-gray-900">Todo App</h1>
              </div>

              {/* Navigation */}
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-500 text-gray-500 mb-3 px-2">NAVIGATION</h2>
                <div className="space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as 'inbox' | 'today' | 'completed')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          activeTab === item.id
                            ? 'bg-indigo-100/50 dark:bg-[#6366f1]/20 text-[#6366f1] dark:text-[#818cf8]'
                            : 'text-gray-700 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-[#6366f1]/50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-500 text-gray-500 mb-3 px-2">CATEGORIES</h2>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 text-gray-700 hover:border-[#6366f1]/50"
                    >
                      <span>{category.label}</span>
                      <span className="bg-gray-200 bg-white text-gray-700 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logout button */}
              <div className="mt-auto pt-6 border-t border-gray-200 border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-gray-700 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-[#6366f1]/50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Center Panel (Task Content) - Second panel */}
          <main className="flex-1 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <Head>
                <title>Command Center - Todo App</title>
                <meta name="description" content="Professional grade task management dashboard" />
              </Head>

              {/* Welcome message and stats */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 text-gray-900 mb-2">
                  Welcome back, {state.user?.name || state.user?.email?.split('@')[0]}
                </h1>
                <div className="bg-white bg-white border border-gray-200 border-gray-200 rounded-2xl p-4 shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 text-gray-500">
                      {completedTasks} of {totalTasks} tasks completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 bg-white rounded-full h-2.5">
                    <div
                      className="bg-[#6366f1] h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white bg-white border border-gray-200 border-gray-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 text-gray-900">
                      {activeTab === 'inbox' && 'All Tasks'}
                      {activeTab === 'today' && 'Today\'s Tasks'}
                      {activeTab === 'completed' && 'Completed Tasks'}
                    </h2>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors shadow-sm shadow-indigo-500/20">
                      <Plus className="h-4 w-4" />
                      <span>New Task</span>
                    </button>
                  </div>
                  <TaskForm onTaskCreated={handleTaskCreated} />
                </div>

                <div className="bg-white bg-white border border-gray-200 border-gray-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 text-gray-900">
                      Task List
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-500 text-gray-500" />
                      <span className="text-sm text-gray-600 text-gray-500">
                        Filter by status
                      </span>
                    </div>
                  </div>
                  <div className="h-[calc(100vh-250px)] overflow-y-auto">
                    <TaskList initialTasks={filteredTasks} onTasksUpdate={handleTasksUpdate} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed top-20 right-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white bg-white border-t border-gray-200 border-gray-200 z-40">
          <div className="flex justify-around items-center h-16">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as 'inbox' | 'today' | 'completed');
                    setSidebarOpen(false); // Close sidebar when navigating
                  }}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'text-[#6366f1] dark:text-[#818cf8]'
                      : 'text-gray-600 text-gray-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all text-gray-600 text-gray-500"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        className="md:hidden fixed bottom-6 right-6 p-4 bg-[#6366f1] text-white rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all duration-200 z-30"
        onClick={() => {
          // Open add task modal or trigger the task form
          console.log('Open add task modal');
        }}
      >
        <Plus className="h-6 w-6" />
      </button>
    </ProtectedRoute>
  );
};

export default TasksPage;