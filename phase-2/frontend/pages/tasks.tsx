import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth-context';
import ProtectedRoute from '../components/ProtectedRoute';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Task } from '../types/task';
import { getTasks } from '../lib/api-client';
import { Inbox, Calendar, Archive, Filter, Plus, Menu, X, LogOut, User, Search, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TasksPage = () => {
  const router = useRouter();
  const { state, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inbox' | 'today' | 'completed'>('inbox');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data.tasks);
      } catch (err) {
        console.error('Failed to load tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask: Task) => setTasks(prev => [newTask, ...prev]);
  const handleTasksUpdate = (updatedTasks: Task[]) => setTasks(updatedTasks);
  const handleLogout = () => { logout(); router.push('/'); };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.due_date || Date.now()).toDateString();
    if (activeTab === 'today') return taskDate === today;
    if (activeTab === 'completed') return task.status === 'completed';
    return true;
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#faf8f8] flex flex-col md:flex-row text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans">
        <Head>
          <title>Command Center | Productivity App</title>
        </Head>

        {/* --- SIDEBAR --- */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <div className="h-full flex flex-col p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <CheckCircleIcon className="text-white h-6 w-6" />
              </div>
              <span className="text-xl font-black tracking-tight">FocusFlow</span>
            </div>

            <nav className="flex-1 space-y-1">
              <SidebarLink icon={Inbox} label="Inbox" active={activeTab === 'inbox'} onClick={() => setActiveTab('inbox')} count={totalTasks} />
              <SidebarLink icon={Calendar} label="Today" active={activeTab === 'today'} onClick={() => setActiveTab('today')} />
              <SidebarLink icon={Archive} label="Completed" active={activeTab === 'completed'} onClick={() => setActiveTab('completed')} />
              
              <div className="pt-8 pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4">Workspace</div>
              <SidebarLink icon={Hash} label="Work" />
              <SidebarLink icon={Hash} label="Personal" />
            </nav>

            <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all font-medium">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-600"><Menu /></button>
            
            <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-2xl w-96 group focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search your tasks..." className="bg-transparent border-none outline-none ml-3 text-sm w-full text-black placeholder:text-gray-500" />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-black">{state.user?.name || 'User'}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full border-2 border-white shadow-md" />
            </div>
          </header>

          {/* Dashboard Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
              
              {/* Stats Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-tight">Daily Progress</p>
                  <div className="flex items-end justify-between mt-2">
                    <h3 className="text-3xl font-black text-black">{progressPercentage}%</h3>
                    <p className="text-xs font-bold text-indigo-600 mb-1">{completedTasks}/{totalTasks} Done</p>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} className="h-full bg-indigo-600" />
                  </div>
                </motion.div>
                {/* Yahan aap mazeed cards add kar sakte hain (Weekly, streaks etc) */}
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Task Form Column */}
                <div className="lg:w-1/3">
                   <div className="sticky top-28">
                     <h2 className="text-xl font-black text-black mb-4">Add Task</h2>
                     <TaskForm onTaskCreated={handleTaskCreated} />
                   </div>
                </div>

                {/* Task List Column */}
                <div className="lg:w-2/3">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-black tracking-tight capitalize">{activeTab}</h2>
                    <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-all">
                      <Filter size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400 font-medium">Fetching your tasks...</p>
                      </div>
                    ) : (
                      <TaskList initialTasks={filteredTasks} onTasksUpdate={handleTasksUpdate} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

// Helper Component for Sidebar Links
const SidebarLink = ({ icon: Icon, label, active = false, onClick, count }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:bg-gray-50 hover:text-black'
    }`}
  >
    <div className="flex items-center gap-3 font-bold text-sm">
      <Icon size={20} className={active ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'} />
      <span>{label}</span>
    </div>
    {count !== undefined && (
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
        {count}
      </span>
    )}
  </button>
);

const CheckCircleIcon = (props: any) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default TasksPage;