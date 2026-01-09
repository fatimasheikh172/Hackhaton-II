import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';
import TaskItem from './task/TaskItem';
import { getTasks, deleteTask } from '../lib/api-client';
import { CheckCircle2, Circle, FileText, Calendar, Clock, Filter, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Update tasks when initialTasks changes
  useEffect(() => {
    if (initialTasks) {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  // Filter tasks based on status only
  const filteredTasks = tasks.filter(task => {
    // Apply status filter
    if (statusFilter === 'pending') return task.status === 'pending';
    if (statusFilter === 'completed') return task.status === 'completed';
    return true; // 'all' filter
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Skeleton loaders */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/70 bg-white border border-slate-200/50 border-gray-200 rounded-xl p-4 shadow-sm animate-pulse"
          >
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-700/50 rounded-xl p-6 text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  const deleteAllCompletedTasks = async () => {
    if (!window.confirm('Are you sure you want to delete all completed tasks?')) return;

    try {
      const completedTasks = tasks.filter(task => task.status === 'completed');
      for (const task of completedTasks) {
        await deleteTask(task.id);
      }
      // Update the tasks list by removing completed tasks
      const updatedTasks = tasks.filter(task => task.status !== 'completed');
      setTasks(updatedTasks);
      onTasksUpdate?.(updatedTasks);
    } catch (error) {
      console.error('Error deleting completed tasks:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 text-gray-500">
            {filteredTasks.length} of {tasks.length} tasks
          </span>
          {statusFilter === 'completed' && tasks.some(task => task.status === 'completed') && (
            <button
              onClick={deleteAllCompletedTasks}
              className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete All
            </button>
          )}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white/70 bg-white border border-slate-200/50 border-gray-200 rounded-xl p-8 shadow-sm">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 text-gray-900 mb-2">
              {statusFilter === 'completed' ? 'No completed tasks' :
               statusFilter === 'pending' ? 'No pending tasks' : 'No tasks yet'}
            </h3>
            <p className="text-gray-600 text-gray-500">
              {statusFilter === 'completed' ? 'Complete some tasks to see them here' :
               statusFilter === 'pending' ? 'All tasks are completed! Great job!' : 'Get started by creating your first task!'}
            </p>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="bg-white/80 bg-white border border-slate-200/50 border-gray-200 rounded-xl p-4 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 hover:border-[#6366f1]/50"
            >
              <TaskItem task={task} onUpdate={setTasks} />
            </motion.div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;


