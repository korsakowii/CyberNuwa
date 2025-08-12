// 智能 API 客户端 - 支持超时、重试、缓存和离线模式

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
  timestamp: string;
  pagination?: {
    page: number;
    size: number;
    total: number;
    pages: number;
  };
}

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retryCount: number;
  enableCache: boolean;
  enableMock: boolean;
  cacheTTL: number;
}

// 默认配置
const defaultConfig: ApiConfig = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.cybernuwa.com' 
    : 'http://localhost:8002',
  timeout: 5000,
  retryCount: 3,
  enableCache: true,
  enableMock: process.env.NODE_ENV === 'development',
  cacheTTL: 5 * 60 * 1000, // 5分钟
};

// 内存缓存
class MemoryCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = defaultConfig.cacheTTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

// Mock 数据服务
class MockDataService {
  private static instance: MockDataService;
  private mockData: Map<string, any> = new Map();

  static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
      MockDataService.instance.initializeMockData();
    }
    return MockDataService.instance;
  }

  private initializeMockData() {
    // Wishes Mock 数据
    this.mockData.set('/api/wishes/list_wishes', {
      success: true,
      data: {
        items: [
          {
            id: 1,
            title: { zh: '咖啡智能助手', en: 'Coffee Assistant' },
            description: { zh: '帮助制作完美咖啡', en: 'Help make perfect coffee' },
            author: { zh: '咖啡爱好者', en: 'Coffee Lover' },
            status: 'pending',
            likes: 23,
            comments: 8,
            views: 1567,
            tags: { zh: ['咖啡', '智能助手', '生活'], en: ['coffee', 'assistant', 'life'] },
            createdAt: '2025-01-15',
          },
          {
            id: 2,
            title: { zh: '动漫推荐系统', en: 'Anime Recommendation System' },
            description: { zh: '基于用户喜好的动漫推荐', en: 'Anime recommendations based on user preferences' },
            author: { zh: '动漫迷', en: 'Anime Fan' },
            status: 'processing',
            likes: 45,
            comments: 12,
            views: 2341,
            tags: { zh: ['动漫', '推荐', 'AI'], en: ['anime', 'recommendation', 'AI'] },
            createdAt: '2025-01-14',
          },
        ],
        total: 2,
        page: 1,
        size: 10,
        pages: 1,
      },
      message: 'Mock data loaded successfully',
      timestamp: new Date().toISOString(),
    });

    // Agents Mock 数据
    this.mockData.set('/api/agents/list_agents', {
      success: true,
      data: {
        items: [
          {
            id: 1,
            name: { zh: '咖啡助手', en: 'Coffee Assistant' },
            description: { zh: '专业的咖啡制作指导', en: 'Professional coffee making guidance' },
            status: 'active',
            performance: 95,
            tasksCompleted: 150,
            lastActive: '2025-01-15T10:30:00Z',
          },
        ],
        total: 1,
        page: 1,
        size: 10,
        pages: 1,
      },
      message: 'Mock data loaded successfully',
      timestamp: new Date().toISOString(),
    });
  }

  getMockData(endpoint: string): any | null {
    return this.mockData.get(endpoint) || null;
  }
}

// 智能 API 客户端
export class SmartApiClient {
  private config: ApiConfig;
  private cache: MemoryCache;
  private mockService: MockDataService;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.cache = new MemoryCache();
    this.mockService = MockDataService.getInstance();
  }

  // 主要请求方法
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const cacheKey = `${endpoint}-${JSON.stringify(options)}`;

    // 1. 检查缓存
    if (this.config.enableCache) {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        console.log(`[SmartAPI] Cache hit for ${endpoint}`);
        return cached;
      }
    }

    // 2. 尝试真实 API 调用
    try {
      const result = await this.makeRequest<T>(url, options);
      
      // 缓存成功响应
      if (this.config.enableCache) {
        this.cache.set(cacheKey, result);
      }
      
      return result;
    } catch (error) {
      console.warn(`[SmartAPI] Real API failed for ${endpoint}:`, error);
      
      // 3. 降级到 Mock 数据
      if (this.config.enableMock) {
        const mockData = this.mockService.getMockData(endpoint);
        if (mockData) {
          console.log(`[SmartAPI] Using mock data for ${endpoint}`);
          return mockData;
        }
      }
      
      throw error;
    }
  }

  // 实际网络请求
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        ...data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.config.timeout}ms`);
      }
      
      throw error;
    }
  }

  // 带重试的请求
  async requestWithRetry<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    let lastError: Error;

    for (let attempt = 1; attempt <= this.config.retryCount; attempt++) {
      try {
        return await this.request<T>(endpoint, options);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < this.config.retryCount) {
          const delay = Math.pow(2, attempt) * 1000; // 指数退避
          console.log(`[SmartAPI] Retry ${attempt}/${this.config.retryCount} in ${delay}ms`);
          await this.delay(delay);
        }
      }
    }

    throw lastError!;
  }

  // 健康检查
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseURL}/health`, {
        method: 'GET',
        timeout: 3000,
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // 清理缓存
  clearCache() {
    this.cache.clear();
  }

  // 延迟函数
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 导出单例实例
export const smartApiClient = new SmartApiClient();

// 便捷方法
export const api = {
  get: <T>(endpoint: string) => smartApiClient.request<T>(endpoint),
  post: <T>(endpoint: string, data: any) => 
    smartApiClient.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: <T>(endpoint: string, data: any) => 
    smartApiClient.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: <T>(endpoint: string) => 
    smartApiClient.request<T>(endpoint, { method: 'DELETE' }),
};
