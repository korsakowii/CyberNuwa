// API服务 - 统一管理前后端API调用
import { config } from '@/config/environment';

// 使用环境配置
const API_BASE_URL = config.API.BASE_URL;
const API_TIMEOUT = config.API.TIMEOUT;
const API_RETRY_ATTEMPTS = config.API.RETRY_ATTEMPTS;

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface Wish {
  id: number;
  // 新字段（推荐使用）
  title?: string;
  description?: string;
  tags?: string[];
  anonymous?: boolean;
  author_name?: string;
  
  // 旧字段（向后兼容）
  content: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface Task {
  id: number;
  wish_id: number;
  title: string;
  description: string;
  modules: string[];
  difficulty: string;
  estimated_time: number;
  status: string;
  created_at: string;
  wish?: Wish;
}

export interface Module {
  id: number;
  task_id: number;
  name: string;
  content: string;
  contributor: string;
  created_at: string;
  status?: string;
}

export interface Agent {
  id: number;
  task_id: number;
  name: string;
  description: string;
  code: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

// 通用API调用函数
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  let lastError: Error | null = null;
  
  // 重试机制
  for (let attempt = 1; attempt <= API_RETRY_ATTEMPTS; attempt++) {
    try {
      // 添加超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      const response = await fetch(url, { 
        ...defaultOptions, 
        ...options,
        signal: controller.signal 
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // 如果不是最后一次尝试，等待后重试
      if (attempt < API_RETRY_ATTEMPTS) {
        const delay = Math.pow(2, attempt) * 1000; // 指数退避
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // 最后一次尝试失败，抛出错误
      if (lastError.name === 'AbortError') {
        throw new Error(`Request timeout after ${API_TIMEOUT}ms - backend server may not be running`);
      }
      throw lastError;
    }
  }
  
  throw lastError || new Error('API call failed');
}

// 愿望相关API
export const wishesApi = {
  // 提交愿望（新版本，支持完整字段）
  submitWish: async (wishData: {
    title: string;
    description: string;
    tags: string[];
    anonymous: boolean;
    author_name?: string;
    user_id: string;
  }) => {
    return apiCall<{ wish: Wish }>('/api/wishes/submit_wish', {
      method: 'POST',
      body: JSON.stringify(wishData),
    });
  },

  // 提交愿望（向后兼容版本）
  submitWishLegacy: async (content: string, userId: string = 'user_001') => {
    return apiCall<{ wish: Wish }>('/api/wishes/submit_wish', {
      method: 'POST',
      body: JSON.stringify({ content, user_id: userId }),
    });
  },

  // 获取愿望列表
  getWishes: async (page: number = 1, size: number = 10) => {
    return apiCall<{
      items: Wish[];
      total: number;
      page: number;
      size: number;
      pages: number;
    }>(`/api/wishes/list_wishes?page=${page}&size=${size}`);
  },
};

// 任务相关API
export const tasksApi = {
  // 合成任务
  synthesizeTask: async (wishId: number) => {
    return apiCall<{ task: Task }>('/api/tasks/synthesize_task', {
      method: 'POST',
      body: JSON.stringify({ wish_id: wishId }),
    });
  },

  // 获取任务列表
  getTasks: async (page: number = 1, size: number = 10) => {
    return apiCall<{
      items: Task[];
      total: number;
      page: number;
      size: number;
      pages: number;
    }>(`/api/tasks/list_tasks?page=${page}&size=${size}`);
  },
};

// 模块相关API
export const modulesApi = {
  // 提交模块
  submitModule: async (
    taskId: number,
    name: string,
    content: string,
    contributor: string = 'user_002'
  ) => {
    return apiCall<{ module: Module }>('/api/modules/submit_module', {
      method: 'POST',
      body: JSON.stringify({
        task_id: taskId,
        name,
        content,
        user_id: contributor,
      }),
    });
  },
};

// 智能体相关API
export const agentsApi = {
  // 构建智能体
  buildAgent: async (taskId: number, moduleIds: number[]) => {
    return apiCall<{ agent: Agent }>('/api/agents/build_agent', {
      method: 'POST',
      body: JSON.stringify({
        task_id: taskId,
        modules: moduleIds,
      }),
    });
  },

  // 获取智能体演示
  getAgentDemo: async (agentId: number) => {
    return apiCall<{
      agent: Agent;
      demo_code: string;
      usage_examples: string[];
      dependencies: string[];
    }>(`/api/agents/get_agent_demo/${agentId}`);
  },
};

// 署名相关API
export const signaturesApi = {
  // 记录署名
  addSignature: async (
    agentId: number,
    userId: string,
    contribution: string
  ) => {
    return apiCall<{ signature: any; contribution_path: any }>(
      '/api/signatures/signature_log',
      {
        method: 'POST',
        body: JSON.stringify({
          agent_id: agentId,
          user_id: userId,
          contribution,
        }),
      }
    );
  },
};

// 健康检查API
export const healthApi = {
  check: async () => {
    return apiCall<{ status: string; timestamp: string }>('/api/health');
  },
};
