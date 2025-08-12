// 应用配置常量
export const APP_CONFIG = {
  name: 'CyberNuwa',
  version: '1.0.0',
  description: 'A modern AI agent training and collaboration platform',
  author: 'CyberNuwa Team',
  website: 'https://cybernuwa.com',
  supportEmail: 'support@cybernuwa.com',
} as const;

// API 配置常量
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8002',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

// 路由常量
export const ROUTES = {
  home: '/',
  agents: '/agents',
  launchMission: '/launch-mission',
  narratives: '/narratives',
  roles: '/roles',
  showcase: '/showcase',
  taskSquare: '/task-square',
  trainAgent: '/train-agent',
  wishes: '/wishes',
} as const;

// 语言配置常量
export const LANGUAGES = {
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    dateFormat: 'YYYY年MM月DD日',
    numberFormat: {
      decimal: '.',
      thousands: ',',
      currency: '¥',
    },
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    dateFormat: 'MMM DD, YYYY',
    numberFormat: {
      decimal: '.',
      thousands: ',',
      currency: '$',
    },
  },
} as const;

// 主题配置常量
export const THEMES = {
  light: {
    name: 'light',
    dark: false,
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      error: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981',
      info: '#3B82F6',
    },
  },
  dark: {
    name: 'dark',
    dark: true,
    colors: {
      primary: '#60A5FA',
      secondary: '#9CA3AF',
      accent: '#FBBF24',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      border: '#374151',
      error: '#F87171',
      warning: '#FBBF24',
      success: '#34D399',
      info: '#60A5FA',
    },
  },
} as const;

// 分页配置常量
export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50, 100],
  maxPageSize: 100,
} as const;

// 文件上传配置常量
export const FILE_UPLOAD = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxFiles: 5,
} as const;

// 验证配置常量
export const VALIDATION = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const;

// 错误消息常量
export const ERROR_MESSAGES = {
  required: '此字段为必填项',
  invalidEmail: '请输入有效的邮箱地址',
  invalidUrl: '请输入有效的URL地址',
  minLength: (min: number) => `最少需要${min}个字符`,
  maxLength: (max: number) => `最多允许${max}个字符`,
  pattern: '格式不正确',
  networkError: '网络错误，请稍后重试',
  serverError: '服务器错误，请稍后重试',
  unauthorized: '未授权访问',
  forbidden: '禁止访问',
  notFound: '资源未找到',
  validationError: '验证失败',
} as const;

// 成功消息常量
export const SUCCESS_MESSAGES = {
  saved: '保存成功',
  created: '创建成功',
  updated: '更新成功',
  deleted: '删除成功',
  uploaded: '上传成功',
  operationCompleted: '操作完成',
} as const;

// 状态常量
export const STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const;

// 智能体类型常量
export const AGENT_TYPES = {
  assistant: 'assistant',
  specialist: 'specialist',
  general: 'general',
  custom: 'custom',
} as const;

// 智能体状态常量
export const AGENT_STATUS = {
  active: 'active',
  inactive: 'inactive',
  training: 'training',
  error: 'error',
} as const;

// 任务状态常量
export const TASK_STATUS = {
  pending: 'pending',
  inProgress: 'in_progress',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

// 任务优先级常量
export const TASK_PRIORITY = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
} as const;

// 用户角色常量
export const USER_ROLES = {
  admin: 'admin',
  moderator: 'moderator',
  user: 'user',
  guest: 'guest',
} as const;

// 本地存储键名常量
export const STORAGE_KEYS = {
  language: 'cybernuwa_language',
  theme: 'cybernuwa_theme',
  user: 'cybernuwa_user',
  token: 'cybernuwa_token',
  settings: 'cybernuwa_settings',
} as const;

// 事件类型常量
export const EVENT_TYPES = {
  userLogin: 'user_login',
  userLogout: 'user_logout',
  agentCreated: 'agent_created',
  agentUpdated: 'agent_updated',
  taskCreated: 'task_created',
  taskCompleted: 'task_completed',
} as const;

// 动画配置常量
export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// 响应式断点常量
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// 测试配置常量
export const TEST_CONFIG = {
  timeout: 10000,
  retries: 3,
  coverage: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
} as const;
