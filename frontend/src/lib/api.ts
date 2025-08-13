import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  client: string;
  timeline?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED' | 'CANCELLED';
  ownerId: string;
  owner: User;
  members: User[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token') as string;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie('refreshToken') as string;
        if (refreshToken) {
          const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/refresh', {
            refreshToken,
          });

          if (response.data.success && response.data.data) {
            setCookie('token', response.data.data.token, { 
              maxAge: 60 * 60 * 24 * 7, // 7 days
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax'
            });
            setCookie('refreshToken', response.data.data.refreshToken, { 
              maxAge: 60 * 60 * 24 * 30, // 30 days
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax'
            });
            
            originalRequest.headers.Authorization = `Bearer ${response.data.data.token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        deleteCookie('token');
        deleteCookie('refreshToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/api/auth/logout');
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/refresh', { refreshToken });
    return response.data;
  },

  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/api/auth/verify-email', { token });
    return response.data;
  },

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/api/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/api/auth/reset-password', { token, password });
    return response.data;
  },
};

// User API
export const userApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/api/users/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>('/api/users/profile', userData);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/api/users/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  getActivities: async (limit = 50, offset = 0): Promise<ApiResponse<any[]>> => {
    const response = await api.get<ApiResponse<any[]>>(`/api/users/activities?limit=${limit}&offset=${offset}`);
    return response.data;
  },
};

// Project API
export const projectApi = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    const response = await api.get<ApiResponse<Project[]>>('/api/projects');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Project>> => {
    const response = await api.get<ApiResponse<Project>>(`/api/projects/${id}`);
    return response.data;
  },

  create: async (projectData: Omit<Project, 'id' | 'owner' | 'members' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Project>> => {
    const response = await api.post<ApiResponse<Project>>('/api/projects', projectData);
    return response.data;
  },

  update: async (id: string, projectData: Partial<Project>): Promise<ApiResponse<Project>> => {
    const response = await api.put<ApiResponse<Project>>(`/api/projects/${id}`, projectData);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/api/projects/${id}`);
    return response.data;
  },

  addMember: async (id: string, userId: string): Promise<ApiResponse<Project>> => {
    const response = await api.post<ApiResponse<Project>>(`/api/projects/${id}/members`, { userId });
    return response.data;
  },

  removeMember: async (id: string, userId: string): Promise<ApiResponse<Project>> => {
    const response = await api.delete<ApiResponse<Project>>(`/api/projects/${id}/members/${userId}`);
    return response.data;
  },
};

// Health API
export const healthApi = {
  check: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/health');
    return response.data;
  },
};

export default api;
