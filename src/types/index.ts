// Core types for CyberNuwa platform

// Language types
export type Language = 'zh' | 'en';

// Localized text type
export interface LocalizedText {
  zh: string;
  en: string;
}

// Base entity interface
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Wish related types
export interface Wish extends BaseEntity {
  title: LocalizedText;
  description: LocalizedText;
  author: LocalizedText;
  tags: LocalizedText[];
  status: WishStatus;
  likes: number;
  comments: number;
  priority: Priority;
  category: WishCategory;
}

export type WishStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type WishCategory =
  | 'feature'
  | 'bugfix'
  | 'improvement'
  | 'documentation';

// Agent related types
export interface Agent extends BaseEntity {
  name: LocalizedText;
  description: LocalizedText;
  avatar: string;
  creator: LocalizedText;
  trainingProgress: number;
  status: AgentStatus;
  capabilities: string[];
  experience: number;
  level: number;
}

export type AgentStatus = 'training' | 'active' | 'inactive' | 'archived';

// Mission related types
export interface Mission extends BaseEntity {
  title: LocalizedText;
  description: LocalizedText;
  tags: LocalizedText[];
  status: MissionStatus;
  priority: Priority;
  assignee?: string;
  participants: string[];
  deadline?: string;
  reward: number;
  experience: number;
}

export type MissionStatus = 'open' | 'in_progress' | 'completed' | 'closed';

// Narrative related types
export interface Narrative extends BaseEntity {
  title: LocalizedText;
  content: LocalizedText;
  author: LocalizedText;
  type: NarrativeType;
  likes: number;
  category: string;
  tags: LocalizedText[];
}

export type NarrativeType = 'community' | 'agent_biography' | 'other';

// Task related types
export interface Task extends BaseEntity {
  title: LocalizedText;
  description: LocalizedText;
  status: TaskStatus;
  priority: Priority;
  assignee?: string;
  participants: string[];
  deadline?: string;
  reward: number;
  experience: number;
  tags: LocalizedText[];
}

export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'closed';

// Role related types
export interface Role extends BaseEntity {
  name: LocalizedText;
  description: LocalizedText;
  permissions: string[];
  level: number;
  requirements: LocalizedText[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface FormField {
  name: string;
  label: LocalizedText;
  placeholder: LocalizedText;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'date';
  required: boolean;
  options?: Array<{ value: string; label: LocalizedText }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

// UI Component types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface CardProps {
  title?: LocalizedText;
  description?: LocalizedText;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Error types
export interface AppError {
  code: string;
  message: LocalizedText;
  details?: any;
  timestamp: string;
}

// User types
export interface User extends BaseEntity {
  username: string;
  email: string;
  avatar?: string;
  role: Role;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  language: Language;
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export interface UserStats {
  totalWishes: number;
  completedMissions: number;
  totalExperience: number;
  level: number;
  joinDate: string;
}

// Export all types
export * from './api';
export * from './components';
export * from './forms';
export * from './validation';
