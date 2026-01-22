export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null; // ISO string format
  user_id: string;
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
}

export interface CreateTaskRequest {
  title: string;
  description?: string | null;
  status?: 'pending' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  due_date?: string | null; // ISO string format
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string | null;
  status?: 'pending' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  due_date?: string | null; // ISO string format
}