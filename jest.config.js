module.exports = {
  // 测试环境
  testEnvironment: 'jsdom',
  
  // 测试文件匹配模式
  testMatch: [
    '<rootDir>/tests/**/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/**/__tests__/**/*.{ts,tsx,js,jsx}',
    '<rootDir>/**/*.{test,spec}.{ts,tsx,js,jsx}'
  ],
  
  // 测试覆盖率收集
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/**/*.d.ts',
    '!components/**/*.stories.{ts,tsx}',
    '!components/**/index.ts',
    '!**/node_modules/**'
  ],
  
  // 覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // 覆盖率报告器
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],
  
  // 模块文件扩展名
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  
  // 模块名称映射
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@types/(.*)$': '<rootDir>/types/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  
  // 转换器配置
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  
  // 设置文件
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts'
  ],
  
  // 测试路径忽略
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/dist/',
    '/build/'
  ],
  
  // 模块路径忽略
  modulePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/dist/',
    '/build/'
  ],
  
  // 测试超时
  testTimeout: 10000,
  
  // 最大工作进程数
  maxWorkers: '50%',
  
  // 缓存目录
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // 清除模拟
  clearMocks: true,
  
  // 恢复模拟
  restoreMocks: true,
  
  // 重置模拟
  resetMocks: true
};
