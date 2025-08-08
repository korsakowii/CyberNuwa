// API服务 - 统一管理前后端API调用

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com' 
  : 'http://localhost:8001'

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

export interface Wish {
  id: number
  content: string
  user_id: string
  status: string
  created_at: string
  updated_at?: string
}

export interface Task {
  id: number
  wish_id: number
  title: string
  description: string
  modules: string[]
  difficulty: string
  estimated_time: number
  status: string
  created_at: string
  wish?: Wish
}

export interface Module {
  id: number
  task_id: number
  name: string
  content: string
  contributor: string
  created_at: string
  status?: string
}

export interface Agent {
  id: number
  task_id: number
  name: string
  description: string
  code: string
  status: string
  created_at: string
  updated_at?: string
}

// 通用API调用函数
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  try {
    console.log(`正在调用API: ${url}`) // 调试信息
    const response = await fetch(url, { ...defaultOptions, ...options })
    
    console.log(`API响应状态: ${response.status}`) // 调试信息
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log(`API响应数据:`, data) // 调试信息
    return data
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    throw error
  }
}

// 愿望相关API
export const wishesApi = {
  // 提交愿望
  submitWish: async (content: string, userId: string = 'user_001') => {
    return apiCall<{ wish: Wish }>('/api/wishes/submit_wish', {
      method: 'POST',
      body: JSON.stringify({ content, user_id: userId }),
    })
  },

  // 获取愿望列表
  getWishes: async (page: number = 1, size: number = 10) => {
    return apiCall<{ items: Wish[], total: number, page: number, size: number, pages: number }>(
      `/api/wishes/list_wishes?page=${page}&size=${size}`
    )
  },
}

// 任务相关API
export const tasksApi = {
  // 合成任务
  synthesizeTask: async (wishId: number) => {
    return apiCall<{ task: Task }>('/api/tasks/synthesize_task', {
      method: 'POST',
      body: JSON.stringify({ wish_id: wishId }),
    })
  },

  // 获取任务列表
  getTasks: async (page: number = 1, size: number = 10) => {
    return apiCall<{ items: Task[], total: number, page: number, size: number, pages: number }>(
      `/api/tasks/list_tasks?page=${page}&size=${size}`
    )
  },
}

// 模块相关API
export const modulesApi = {
  // 提交模块
  submitModule: async (taskId: number, name: string, content: string, contributor: string = 'user_002') => {
    return apiCall<{ module: Module }>('/api/modules/submit_module', {
      method: 'POST',
      body: JSON.stringify({ 
        task_id: taskId, 
        name, 
        content, 
        user_id: contributor 
      }),
    })
  },
}

// 智能体相关API
export const agentsApi = {
  // 构建智能体
  buildAgent: async (taskId: number, moduleIds: number[]) => {
    return apiCall<{ agent: Agent }>('/api/agents/build_agent', {
      method: 'POST',
      body: JSON.stringify({ 
        task_id: taskId, 
        modules: moduleIds 
      }),
    })
  },

  // 获取智能体演示
  getAgentDemo: async (agentId: number) => {
    return apiCall<{
      agent: Agent
      demo_code: string
      usage_examples: string[]
      dependencies: string[]
    }>(`/api/agents/get_agent_demo/${agentId}`)
  },
}

// 署名相关API
export const signaturesApi = {
  // 记录署名
  addSignature: async (agentId: number, userId: string, contribution: string) => {
    return apiCall<{ signature: any, contribution_path: any }>('/api/signatures/signature_log', {
      method: 'POST',
      body: JSON.stringify({ 
        agent_id: agentId, 
        user_id: userId, 
        contribution 
      }),
    })
  },
}

// 健康检查
export const healthApi = {
  check: async () => {
    return apiCall<{ status: string, timestamp: string }>('/health')
  },
}

export default {
  wishes: wishesApi,
  tasks: tasksApi,
  modules: modulesApi,
  agents: agentsApi,
  signatures: signaturesApi,
  health: healthApi,
} 