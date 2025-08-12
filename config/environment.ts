// 环境配置管理系统
export interface EnvironmentConfig {
  // 基础配置
  NODE_ENV: 'development' | 'production' | 'test';
  
  // 端口配置
  PORTS: {
    FRONTEND: number;
    BACKEND: number;
    DATABASE: number;
    REDIS: number;
  };
  
  // API 配置
  API: {
    BASE_URL: string;
    TIMEOUT: number;
    RETRY_ATTEMPTS: number;
  };
  
  // 数据库配置
  DATABASE: {
    HOST: string;
    PORT: number;
    NAME: string;
    USER: string;
    PASSWORD: string;
  };
  
  // 缓存配置
  CACHE: {
    REDIS_URL: string;
    TTL: number;
  };
}

// 开发环境配置
const developmentConfig: EnvironmentConfig = {
  NODE_ENV: 'development',
  PORTS: {
    FRONTEND: 3000,
    BACKEND: 8003,
    DATABASE: 5432,
    REDIS: 6379,
  },
  API: {
    BASE_URL: 'http://localhost:8003',
    TIMEOUT: 5000,
    RETRY_ATTEMPTS: 3,
  },
  DATABASE: {
    HOST: 'localhost',
    PORT: 5432,
    NAME: 'cybernuwa_dev',
    USER: 'postgres',
    PASSWORD: 'password',
  },
  CACHE: {
    REDIS_URL: 'redis://localhost:6379',
    TTL: 3600,
  },
};

// 生产环境配置
const productionConfig: EnvironmentConfig = {
  NODE_ENV: 'production',
  PORTS: {
    FRONTEND: 3000,
    BACKEND: 8000,
    DATABASE: 5432,
    REDIS: 6379,
  },
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cybernuwa.com',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 5,
  },
  DATABASE: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT || '5432'),
    NAME: process.env.DB_NAME || 'cybernuwa_prod',
    USER: process.env.DB_USER || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || '',
  },
  CACHE: {
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    TTL: 7200,
  },
};

// 测试环境配置
const testConfig: EnvironmentConfig = {
  NODE_ENV: 'test',
  PORTS: {
    FRONTEND: 3001,
    BACKEND: 8001,
    DATABASE: 5433,
    REDIS: 6380,
  },
  API: {
    BASE_URL: 'http://localhost:8001',
    TIMEOUT: 3000,
    RETRY_ATTEMPTS: 1,
  },
  DATABASE: {
    HOST: 'localhost',
    PORT: 5433,
    NAME: 'cybernuwa_test',
    USER: 'postgres',
    PASSWORD: 'password',
  },
  CACHE: {
    REDIS_URL: 'redis://localhost:6380',
    TTL: 1800,
  },
};

// 获取当前环境配置
export function getEnvironmentConfig(): EnvironmentConfig {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    default:
      return developmentConfig;
  }
}

// 导出配置
export const config = getEnvironmentConfig();
