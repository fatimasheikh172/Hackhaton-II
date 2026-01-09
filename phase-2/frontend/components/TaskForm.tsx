import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, Calendar, AlertCircle, AlignLeft } from 'lucide-react';
import { Task } from '../types/task';
import { createTask } from '../lib/api-client';
// Validation Schema
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  due_date: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onTaskCreated?: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { priority: 'medium' }
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: TaskFormData) => {
    setServerError(null);
    try {
      const newTask = await createTask({
        ...data,
        description: data.description || null,
        status: 'pending',
        due_date: data.due_date ? new Date(data.due_date).toISOString() : null,
      });

      reset();
      onTaskCreated?.(newTask);
    } catch (err) {
      setServerError('System was unable to save your task.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white/40 bg-white border border-white/20 border-gray-200 rounded-2xl shadow-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title Input */}
        <div className="relative">
          <input
            {...register('title')}
            placeholder="What's your next big goal?"
            className={`w-full bg-transparent border-b-2 py-2 text-lg font-medium outline-none transition-all
              ${errors.title ? 'border-red-400' : 'border-gray-200 border-gray-200 focus:border-indigo-500'}`}
          />
          {errors.title && (
            <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.title.message}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex gap-2 items-start">
          <AlignLeft className="mt-2 text-gray-400" size={18} />
          <textarea
            {...register('description')}
            rows={2}
            placeholder="Add some details..."
            className="w-full bg-gray-50 bg-white rounded-xl p-3 text-sm outline-none focus:ring-2 ring-indigo-500/20 resize-none"
          />
        </div>

        {/* Grid Controls */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-1">Priority</label>
            <select
              {...register('priority')}
              className="w-full bg-gray-50 bg-white rounded-lg p-2 text-sm border-none outline-none focus:ring-2 ring-indigo-500/20 appearance-none"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-1">Due Date</label>
            <div className="relative">
              <input
                type="date"
                {...register('due_date')}
                className="w-full bg-gray-50 bg-white rounded-lg p-2 text-sm border-none outline-none focus:ring-2 ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Error Handling */}
        <AnimatePresence>
          {serverError && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="bg-red-500/10 text-red-500 p-3 rounded-lg text-xs flex items-center gap-2"
            >
              <AlertCircle size={14} /> {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Plus size={20} />
          )}
          {isSubmitting ? 'Syncing...' : 'Add Task'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TaskForm;