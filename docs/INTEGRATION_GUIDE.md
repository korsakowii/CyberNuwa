# CyberNüwa 前后端集成指南

## 概述

本文档描述了CyberNüwa项目的前后端集成架构、配置和使用方法。

## 架构概览

```
┌─────────────────┐    HTTP/API    ┌─────────────────┐
│   前端 (Next.js) │ ◄────────────► │   后端 (FastAPI) │
│   localhost:3000 │                │  localhost:8000  │
└─────────────────┘                └─────────────────┘
         │                                   │
         │                                   │
    ┌────▼────┐                        ┌────▼────┐
    │  React  │                        │ SQLite  │
    │ 组件    │                        │ 数据库   │
    └─────────┘                        └─────────┘
```

## 服务配置

### 前端服务 (Next.js)

- **端口**: 3000
- **启动命令**: `npm run dev`
- **配置文件**: `next.config.js`

```javascript
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};
```

### 后端服务 (FastAPI)

- **端口**: 8000
- **启动命令**: `cd backend && python3 main.py`
- **配置文件**: `backend/utils/config.py`

## API接口

### 基础URL

- 开发环境: `http://localhost:8000`
- 生产环境: `https://your-production-api.com`

### 主要接口

#### 1. 健康检查

```
GET /health
Response: {"status": "healthy", "timestamp": "2025-01-28T00:00:00Z"}
```

#### 2. 愿望管理

```
POST /api/wishes/submit_wish
GET /api/wishes/list_wishes?page=1&size=10
```

#### 3. 任务管理

```
POST /api/tasks/synthesize_task
GET /api/tasks/list_tasks?page=1&size=10
```

#### 4. 模块管理

```
POST /api/modules/submit_module
```

#### 5. 智能体管理

```
POST /api/agents/build_agent
GET /api/agents/get_agent_demo/{agent_id}
```

#### 6. 署名管理

```
POST /api/signatures/signature_log
```

## 前端API服务

### 位置: `utils/api.ts`

提供了统一的API调用接口，包括：

- `wishesApi`: 愿望相关API
- `tasksApi`: 任务相关API
- `modulesApi`: 模块相关API
- `agentsApi`: 智能体相关API
- `signaturesApi`: 署名相关API
- `healthApi`: 健康检查API

### 使用示例

```typescript
import { wishesApi, tasksApi } from '@/utils/api';

// 提交愿望
const wishResponse = await wishesApi.submitWish('我的愿望', 'user_001');

// 获取愿望列表
const wishesResponse = await wishesApi.getWishes(1, 10);

// 合成任务
const taskResponse = await tasksApi.synthesizeTask(wishResponse.data.wish.id);
```

## 集成测试

### 测试页面

访问 `http://localhost:3000/integration-test` 进行完整的前后端集成测试。

### 测试内容

1. 健康检查
2. 愿望提交和获取
3. 任务合成
4. 模块提交
5. 智能体构建
6. 智能体演示获取
7. 愿望列表获取
8. 任务列表获取

## 状态监控

### 集成状态组件

位置: `components/IntegrationStatus.tsx`

提供实时服务状态监控：

- 前端服务状态
- 后端API状态
- 响应时间
- 自动刷新

### 使用方法

组件会自动添加到所有页面的右下角，显示当前服务状态。

## 错误处理

### 前端错误处理

```typescript
try {
  const response = await wishesApi.getWishes();
  // 处理成功响应
} catch (error) {
  console.error('API调用失败:', error);
  // 处理错误
}
```

### 后端错误处理

```python
try:
    # API逻辑
    return {"success": True, "data": result}
except Exception as e:
    print(f"错误: {str(e)}")
    return {"success": False, "message": str(e)}
```

## 开发流程

### 1. 启动服务

```bash
# 启动后端
cd backend && python3 main.py

# 启动前端
npm run dev
```

### 2. 验证连接

```bash
# 检查后端健康状态
curl http://localhost:8000/health

# 检查前端服务
curl http://localhost:3000
```

### 3. 运行集成测试

访问 `http://localhost:3000/integration-test` 并点击"开始测试"。

## 常见问题

### 1. CORS错误

- 确保后端配置了正确的CORS头
- 检查前端API调用URL是否正确

### 2. 端口冲突

- 检查端口是否被占用: `lsof -i :3000` 或 `lsof -i :8000`
- 终止占用进程: `pkill -f "python3 main.py"`

### 3. API调用失败

- 检查后端服务是否正常运行
- 查看浏览器控制台和终端错误信息
- 验证API端点是否正确

### 4. 数据库问题

- 检查SQLite数据库文件是否存在
- 确保数据库权限正确

## 部署说明

### 开发环境

- 前端: `http://localhost:3000`
- 后端: `http://localhost:8000`

### 生产环境

- 更新 `utils/api.ts` 中的 `API_BASE_URL`
- 配置正确的CORS设置
- 设置环境变量

## 更新日志

### v1.0.0 (2025-01-28)

- 初始前后端集成
- 实现基础API接口
- 添加集成测试页面
- 添加状态监控组件

## 贡献指南

1. 遵循现有的代码风格
2. 添加适当的错误处理
3. 更新相关文档
4. 运行集成测试确保功能正常

## 联系方式

如有问题，请查看项目文档或提交Issue。
