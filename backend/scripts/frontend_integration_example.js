/**
 * CyberNuwa 前端集成示例
 * 展示如何在前端调用后端API
 */

// API基础配置
const API_BASE_URL = 'http://localhost:8000';
const API_ENDPOINTS = {
    // 愿望管理
    SUBMIT_WISH: '/api/wishes/submit_wish',
    LIST_WISHES: '/api/wishes/list_wishes',
    GET_WISH: '/api/wishes/wish',
    
    // 任务管理
    LIST_TASKS: '/api/tasks/list_tasks',
    SYNTHESIZE_TASK: '/api/tasks/synthesize_task',
    GET_TASK: '/api/tasks/task',
    
    // 模块管理
    SUBMIT_MODULE: '/api/modules/submit_module',
    LIST_MODULES: '/api/modules/list_modules',
    GET_MODULE: '/api/modules/module',
    
    // 智能体管理
    BUILD_AGENT: '/api/agents/build_agent',
    GET_AGENT_DEMO: '/api/agents/get_agent_demo',
    LIST_AGENTS: '/api/agents/list_agents',
    
    // 署名管理
    SIGNATURE_LOG: '/api/signatures/signature_log',
    GET_SIGNATURE_LOG: '/api/signatures/get_signature_log',
    LIST_SIGNATURES: '/api/signatures/list_signatures'
};

// 通用API请求函数
async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.detail || '请求失败');
        }
        
        return result;
    } catch (error) {
        console.error('API请求失败:', error);
        throw error;
    }
}

// 愿望管理API
class WishAPI {
    // 提交愿望
    static async submitWish(content, userId = null) {
        const data = { content };
        if (userId) data.user_id = userId;
        
        return await apiRequest(API_ENDPOINTS.SUBMIT_WISH, 'POST', data);
    }
    
    // 获取愿望列表
    static async listWishes(page = 1, size = 10, status = null) {
        const params = new URLSearchParams({ page, size });
        if (status) params.append('status', status);
        
        return await apiRequest(`${API_ENDPOINTS.LIST_WISHES}?${params}`);
    }
    
    // 获取愿望详情
    static async getWish(wishId) {
        return await apiRequest(`${API_ENDPOINTS.GET_WISH}/${wishId}`);
    }
}

// 任务管理API
class TaskAPI {
    // 获取任务列表（任务广场）
    static async listTasks(page = 1, size = 10, status = null) {
        const params = new URLSearchParams({ page, size });
        if (status) params.append('status', status);
        
        return await apiRequest(`${API_ENDPOINTS.LIST_TASKS}?${params}`);
    }
    
    // 合成任务
    static async synthesizeTask(wishId, useAI = true) {
        const data = { wish_id: wishId, use_ai: useAI };
        return await apiRequest(API_ENDPOINTS.SYNTHESIZE_TASK, 'POST', data);
    }
    
    // 获取任务详情
    static async getTask(taskId) {
        return await apiRequest(`${API_ENDPOINTS.GET_TASK}/${taskId}`);
    }
}

// 模块管理API
class ModuleAPI {
    // 提交模块
    static async submitModule(taskId, name, content, userId = null) {
        const data = { task_id: taskId, name, content };
        if (userId) data.user_id = userId;
        
        return await apiRequest(API_ENDPOINTS.SUBMIT_MODULE, 'POST', data);
    }
    
    // 获取模块列表
    static async listModules(taskId = null, page = 1, size = 10) {
        const params = new URLSearchParams({ page, size });
        if (taskId) params.append('task_id', taskId);
        
        return await apiRequest(`${API_ENDPOINTS.LIST_MODULES}?${params}`);
    }
    
    // 获取模块详情
    static async getModule(moduleId) {
        return await apiRequest(`${API_ENDPOINTS.GET_MODULE}/${moduleId}`);
    }
}

// 智能体管理API
class AgentAPI {
    // 构建智能体
    static async buildAgent(taskId, moduleIds) {
        const data = { task_id: taskId, modules: moduleIds };
        return await apiRequest(API_ENDPOINTS.BUILD_AGENT, 'POST', data);
    }
    
    // 获取智能体演示
    static async getAgentDemo(agentId) {
        return await apiRequest(`${API_ENDPOINTS.GET_AGENT_DEMO}/${agentId}`);
    }
    
    // 获取智能体列表
    static async listAgents(taskId = null, page = 1, size = 10) {
        const params = new URLSearchParams({ page, size });
        if (taskId) params.append('task_id', taskId);
        
        return await apiRequest(`${API_ENDPOINTS.LIST_AGENTS}?${params}`);
    }
}

// 署名管理API
class SignatureAPI {
    // 记录署名
    static async signatureLog(agentId, userId, contribution) {
        const data = { agent_id: agentId, user_id: userId, contribution };
        return await apiRequest(API_ENDPOINTS.SIGNATURE_LOG, 'POST', data);
    }
    
    // 获取署名日志
    static async getSignatureLog(agentId) {
        return await apiRequest(`${API_ENDPOINTS.GET_SIGNATURE_LOG}/${agentId}`);
    }
    
    // 获取署名列表
    static async listSignatures(agentId = null, page = 1, size = 10) {
        const params = new URLSearchParams({ page, size });
        if (agentId) params.append('agent_id', agentId);
        
        return await apiRequest(`${API_ENDPOINTS.LIST_SIGNATURES}?${params}`);
    }
}

// 使用示例
class CyberNuwaFrontend {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        console.log('🚀 CyberNuwa 前端集成示例初始化');
        this.bindEvents();
    }
    
    bindEvents() {
        // 绑定按钮事件
        document.addEventListener('DOMContentLoaded', () => {
            // 愿望提交
            const wishForm = document.getElementById('wish-form');
            if (wishForm) {
                wishForm.addEventListener('submit', this.handleWishSubmit.bind(this));
            }
            
            // 任务列表
            const taskListBtn = document.getElementById('load-tasks');
            if (taskListBtn) {
                taskListBtn.addEventListener('click', this.loadTasks.bind(this));
            }
            
            // 模块提交
            const moduleForm = document.getElementById('module-form');
            if (moduleForm) {
                moduleForm.addEventListener('submit', this.handleModuleSubmit.bind(this));
            }
            
            // 智能体构建
            const agentBuildBtn = document.getElementById('build-agent');
            if (agentBuildBtn) {
                agentBuildBtn.addEventListener('click', this.buildAgent.bind(this));
            }
        });
    }
    
    // 处理愿望提交
    async handleWishSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const content = form.querySelector('[name="wish-content"]').value;
        const userId = form.querySelector('[name="user-id"]').value || 'anonymous';
        
        try {
            this.showLoading('提交愿望中...');
            
            const result = await WishAPI.submitWish(content, userId);
            
            this.showSuccess('愿望提交成功！', result);
            form.reset();
            
            // 自动合成任务
            if (result.data && result.data.id) {
                await this.synthesizeTask(result.data.id);
            }
            
        } catch (error) {
            this.showError('愿望提交失败', error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // 合成任务
    async synthesizeTask(wishId) {
        try {
            this.showLoading('正在合成任务...');
            
            const result = await TaskAPI.synthesizeTask(wishId, true);
            
            this.showSuccess('任务合成成功！', result);
            
        } catch (error) {
            this.showError('任务合成失败', error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // 加载任务列表
    async loadTasks() {
        try {
            this.showLoading('加载任务列表中...');
            
            const result = await TaskAPI.listTasks(1, 10);
            
            this.displayTasks(result.data);
            
        } catch (error) {
            this.showError('加载任务列表失败', error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // 显示任务列表
    displayTasks(data) {
        const container = document.getElementById('tasks-container');
        if (!container) return;
        
        const tasks = data.items || [];
        
        container.innerHTML = tasks.map(task => `
            <div class="task-card">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="task-meta">
                    <span>状态: ${task.status}</span>
                    <span>模块数: ${task.modules ? task.modules.length : 0}</span>
                </div>
                <button onclick="cyberNuwa.claimTask(${task.id})">认领任务</button>
            </div>
        `).join('');
    }
    
    // 处理模块提交
    async handleModuleSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const taskId = parseInt(form.querySelector('[name="task-id"]').value);
        const name = form.querySelector('[name="module-name"]').value;
        const content = form.querySelector('[name="module-content"]').value;
        const userId = form.querySelector('[name="user-id"]').value || 'anonymous';
        
        try {
            this.showLoading('提交模块中...');
            
            const result = await ModuleAPI.submitModule(taskId, name, content, userId);
            
            this.showSuccess('模块提交成功！', result);
            form.reset();
            
        } catch (error) {
            this.showError('模块提交失败', error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // 构建智能体
    async buildAgent() {
        const taskId = parseInt(document.getElementById('agent-task-id').value);
        const moduleIds = [1, 2, 3]; // 示例模块ID
        
        try {
            this.showLoading('构建智能体中...');
            
            const result = await AgentAPI.buildAgent(taskId, moduleIds);
            
            this.showSuccess('智能体构建成功！', result);
            
            // 获取演示
            if (result.data && result.data.id) {
                await this.getAgentDemo(result.data.id);
            }
            
        } catch (error) {
            this.showError('智能体构建失败', error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // 获取智能体演示
    async getAgentDemo(agentId) {
        try {
            const result = await AgentAPI.getAgentDemo(agentId);
            
            this.displayAgentDemo(result.data);
            
        } catch (error) {
            this.showError('获取智能体演示失败', error.message);
        }
    }
    
    // 显示智能体演示
    displayAgentDemo(data) {
        const container = document.getElementById('agent-demo-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="agent-demo">
                <h3>${data.agent.name}</h3>
                <p>${data.agent.description}</p>
                <pre><code>${data.demo_code}</code></pre>
                <div class="dependencies">
                    <h4>依赖包:</h4>
                    <ul>${data.dependencies.map(dep => `<li>${dep}</li>`).join('')}</ul>
                </div>
            </div>
        `;
    }
    
    // 认领任务
    async claimTask(taskId) {
        try {
            this.showLoading('认领任务中...');
            
            // 这里可以添加认领任务的逻辑
            this.showSuccess(`任务 ${taskId} 认领成功！`);
            
        } catch (error) {
            this.showError('认领任务失败', error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // UI辅助方法
    showLoading(message) {
        console.log(`⏳ ${message}`);
        // 这里可以显示加载动画
    }
    
    hideLoading() {
        console.log('✅ 操作完成');
        // 这里可以隐藏加载动画
    }
    
    showSuccess(title, data) {
        console.log(`✅ ${title}`, data);
        // 这里可以显示成功提示
    }
    
    showError(title, message) {
        console.error(`❌ ${title}: ${message}`);
        // 这里可以显示错误提示
    }
}

// 初始化前端集成
const cyberNuwa = new CyberNuwaFrontend();

// 导出API类供外部使用
window.CyberNuwaAPI = {
    WishAPI,
    TaskAPI,
    ModuleAPI,
    AgentAPI,
    SignatureAPI
};

console.log('🎉 CyberNuwa 前端集成示例加载完成！');
console.log('📖 使用示例:');
console.log('  - 提交愿望: WishAPI.submitWish("愿望内容", "用户ID")');
console.log('  - 获取任务: TaskAPI.listTasks(1, 10)');
console.log('  - 构建智能体: AgentAPI.buildAgent(taskId, moduleIds)'); 