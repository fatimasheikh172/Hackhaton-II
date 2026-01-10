import React, { useState } from 'react';
import { Task } from '../../types/task';
import { updateTask, deleteTask, partialUpdateTask, markTaskComplete } from '../../lib/api-client';
import { Check, Edit3, Trash2, X, Save, Calendar } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onUpdate: (updateFn: (prev: Task[]) => Task[]) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // State initialization with safety checks
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status,
    priority: task.priority || 'medium',
    due_date: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '',
  });

  const handleToggleComplete = async () => {
    try {
      let response;
      if (task.status === 'completed') {
        // If task is completed, we need to update it to pending using partialUpdateTask
        response = await partialUpdateTask(task.id, { status: 'pending' });
      } else {
        // If task is not completed, use the markTaskComplete endpoint
        response = await markTaskComplete(task.id);
      }

      // Update the task in the list
      onUpdate((prev) => prev.map(t => t.id === task.id ? response : t));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      setIsDeleting(true);
      await deleteTask(task.id);
      // Fixed: Filter using Task type
      onUpdate((prev) => prev.filter(t => t.id !== task.id));
    } catch (error) {
      console.error('Error deleting task:', error);
      setIsDeleting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData: Task = {
        ...task,
        ...editForm,
        due_date: editForm.due_date ? new Date(editForm.due_date).toISOString() : null,
      };

      const response = await updateTask(task.id, updatedData);
      onUpdate((prev) => prev.map(t => t.id === task.id ? response : t));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task details:', error);
    }
  };

  return (
    <li className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 hover:border-[#6366f1]/50 ${
      task.status === 'completed' ? 'bg-green-50/50 dark:bg-emerald-900 border-green-200/50 dark:border-emerald-500' : ''
    }`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-3">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            // Added text-black here
            className="w-full px-3 py-2 bg-white text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            // Added text-black here
            className="w-full px-3 py-2 bg-white text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Description (optional)"
          />
          <div className="flex flex-wrap gap-2">
            <select
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
              // Added text-black here
              className="px-3 py-2 bg-white text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={editForm.priority}
              onChange={(e) => setEditForm({ ...editForm, priority: e.target.value as any })}
              // Added text-black here
              className="px-3 py-2 bg-white text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={editForm.due_date}
              onChange={(e) => setEditForm({ ...editForm, due_date: e.target.value })}
              // Added text-black here
              className="px-3 py-2 bg-white text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start space-x-3">
              <button
                onClick={handleToggleComplete}
                className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  task.status === 'completed'
                    ? 'bg-emerald-500 border-emerald-500 text-white scale-110'
                    : 'border-gray-300 hover:border-[#6366f1]'
                }`}
              >
                {task.status === 'completed' && <Check className="h-3.5 w-3.5" />}
              </button>
              <div className="flex-1 min-w-0">
                {/* Fixed Title Text Color: text-black */}
                <h3 className={`font-medium truncate transition-all duration-300 ${
                  task.status === 'completed'
                    ? 'line-through dark:text-emerald-500 text-emerald-500'
                    : 'text-black dark:text-white'
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  /* Fixed Description Text Color: text-gray-800 */
                  <p className={`text-sm mt-1 truncate transition-all duration-300 ${
                    task.status === 'completed'
                      ? 'line-through text-gray-500 dark:text-emerald-400'
                      : 'text-gray-800 dark:text-gray-300'
                  }`}>
                    {task.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                    task.priority === 'low'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : task.priority === 'medium'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                    task.status === 'pending'
                      ? 'bg-gray-100 text-gray-800 border border-gray-200'
                      : task.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  {task.due_date && (
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(task.due_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-1 ml-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Edit task"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`p-1.5 rounded-lg transition-colors ${
                isDeleting
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;