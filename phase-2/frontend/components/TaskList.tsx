import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';
import TaskItem from './task/TaskItem';
import { getTasks, deleteTask } from '../lib/api-client';
import { FileText, Filter, Trash2, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  initialTasks?: Task[];
  onTasksUpdate?: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ initialTasks, onTasksUpdate }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks || []);
  const [loading, setLoading] = useState(initialTasks === undefined);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    if (initialTasks === undefined) {
      const fetchTasks = async () => {
        try {
          const data = await getTasks();
          setTasks(data.tasks);
          onTasksUpdate?.(data.tasks);
          setLoading(false);
        } catch (err) {
          setError('Failed to load tasks');
          setLoading(false);
        }
      };
      fetchTasks();
    }
  }, [initialTasks, onTasksUpdate]);

  useEffect(() => {
    if (initialTasks) setTasks(initialTasks);
  }, [initialTasks]);

  const filteredTasks = tasks.filter(task => {
    if (statusFilter === 'pending') return task.status === 'pending';
    if (statusFilter === 'completed') return task.status === 'completed';
    return true;
  });

  const deleteAllCompletedTasks = async () => {
    if (!window.confirm('Clear all completed tasks?')) return;
    try {
      const completedTasks = tasks.filter(task => task.status === 'completed');
      for (const task of completedTasks) {
        await deleteTask(task.id);
      }
      const updatedTasks = tasks.filter(task => task.status !== 'completed');
      setTasks(updatedTasks);
      onTasksUpdate?.(updatedTasks);
    } catch (error) {
      console.error('Error deleting completed tasks:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 bg-white/5 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-white/10 rounded-full w-1/3"></div>
                <div className="h-3 bg-white/5 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* --- PREMIUM FILTER CONTROLS --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02] p-2 rounded-[2rem] border border-white/5">
        <div className="flex p-1 bg-black/20 rounded-[1.5rem] gap-1">
          {(['all', 'pending', 'completed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                statusFilter === filter
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 px-4">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500">
            Showing <span className="text-indigo-400">{filteredTasks.length}</span> / {tasks.length}
          </span>
          
          {statusFilter === 'completed' && tasks.some(t => t.status === 'completed') && (
            <button
              onClick={deleteAllCompletedTasks}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              <Trash2 size={12} /> Clear Done
            </button>
          )}
        </div>
      </div>

      {/* --- TASK LIST RENDER --- */}
      {filteredTasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem]"
        >
          <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/5">
            <LayoutGrid className="text-gray-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">
            {statusFilter === 'completed' ? 'Nothing finished yet' : 'Your list is empty'}
          </h3>
          <p className="text-sm text-gray-500 max-w-[250px] mx-auto">
            {statusFilter === 'all' ? 'Time to add some goals and crush them!' : 'Keep going, you’re doing great!'}
          </p>
        </motion.div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task, index) => (
              <TaskItem key={task.id} task={task} onUpdate={setTasks} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default TaskList;