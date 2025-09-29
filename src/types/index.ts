// Common API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Common error types
export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// Common filter and sort types
export interface BaseFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

// Common entity base
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

// Navigation types
export interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  roles?: string[];
}

// Notification types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

// Export all from other type files
export * from '../services/customerService';
export * from '../contexts/AuthContext';
