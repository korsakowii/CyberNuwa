// Application configuration constants

export const APP_CONFIG = {
  name: 'CyberNuwa',
  version: '1.0.0',
  description: 'AI Agent Training & Collaboration Platform',

  // API configuration
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Feature flags
  features: {
    autoTranslate: true,
    darkMode: true,
    notifications: true,
    analytics: false,
  },

  // Pagination defaults
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
    pageSizeOptions: [10, 20, 50, 100],
  },

  // Cache configuration
  cache: {
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
  },

  // Localization
  localization: {
    defaultLanguage: 'zh',
    supportedLanguages: ['zh', 'en'],
    fallbackLanguage: 'en',
  },

  // UI configuration
  ui: {
    theme: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    animation: {
      duration: 300,
      easing: 'ease-in-out',
    },
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  // Security
  security: {
    passwordMinLength: 8,
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
  },

  // File upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/*', 'application/pdf', 'text/*'],
    maxFiles: 5,
  },

  // Validation rules
  validation: {
    username: {
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_-]+$/,
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
    },
  },

  // Error messages
  errors: {
    network: {
      timeout: 'Request timeout. Please try again.',
      connectionFailed:
        'Connection failed. Please check your internet connection.',
      serverError: 'Server error. Please try again later.',
    },
    validation: {
      required: 'This field is required.',
      invalidFormat: 'Invalid format.',
      tooShort: 'Too short.',
      tooLong: 'Too long.',
    },
    auth: {
      unauthorized: 'You are not authorized to perform this action.',
      forbidden: 'Access forbidden.',
      invalidCredentials: 'Invalid credentials.',
    },
  },
} as const;

// Environment-specific configuration
export const ENV_CONFIG = {
  development: {
    debug: true,
    logLevel: 'debug',
    enableHotReload: true,
  },
  production: {
    debug: false,
    logLevel: 'error',
    enableHotReload: false,
  },
  test: {
    debug: true,
    logLevel: 'debug',
    enableHotReload: false,
  },
} as const;

// Get current environment configuration
export function getEnvConfig() {
  const env = process.env.NODE_ENV || 'development';
  return ENV_CONFIG[env as keyof typeof ENV_CONFIG] || ENV_CONFIG.development;
}

// Feature flag checker
export function isFeatureEnabled(
  feature: keyof typeof APP_CONFIG.features
): boolean {
  return APP_CONFIG.features[feature];
}

// Configuration validation
export function validateConfig(): string[] {
  const errors: string[] = [];

  // Validate required environment variables
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    errors.push('NEXT_PUBLIC_API_BASE_URL is not set');
  }

  // Validate configuration values
  if (APP_CONFIG.pagination.defaultPageSize <= 0) {
    errors.push('Default page size must be positive');
  }

  if (APP_CONFIG.cache.defaultTTL <= 0) {
    errors.push('Cache TTL must be positive');
  }

  return errors;
}

// Export configuration for use in components
export default APP_CONFIG;
