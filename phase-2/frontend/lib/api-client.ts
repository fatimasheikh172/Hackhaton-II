import axios, { AxiosRequestConfig } from 'axios';
import { Task, TaskListResponse, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

// Base API URL - Connect directly to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from wherever it's stored (e.g., localStorage, context, etc.)
    // For now, we'll assume it's in localStorage - in a real app, you'd get it from your auth provider
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 errors for non-auth endpoints (avoid interfering with login/register flow)
    const isAuthEndpoint = error.config?.url?.includes('/auth/');

    if (error.response?.status === 401 && !isAuthEndpoint) {
      // Handle unauthorized access - redirect to login, clear tokens, etc.
      localStorage.removeItem('auth_token');
      // Only redirect if we're not on auth pages
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Task API functions
export const getTasks = async (params?: {
  status?: string;
  priority?: string;
  limit?: number;
  offset?: number
}): Promise<TaskListResponse> => {
  const response = await apiClient.get<TaskListResponse>('/tasks', { params });
  return response.data;
};

export const getTask = async (id: string): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: CreateTaskRequest): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id: string, taskData: UpdateTaskRequest): Promise<Task> => {
  const response = await apiClient.put<Task>(`/tasks/${id}`, taskData);
  return response.data;
};

export const partialUpdateTask = async (id: string, taskData: Partial<UpdateTaskRequest>): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, taskData);
  return response.data;
};

export const markTaskComplete = async (id: string): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}/complete`);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};

export default apiClient;