# CyberNuwa API 文档 / CyberNuwa API Documentation

[English](#english) | [中文](#中文)

---

## English

### 🔌 API Overview

CyberNuwa provides a comprehensive REST API for managing AI agents, wishes, tasks, and modules. The API is built with FastAPI and supports both synchronous and asynchronous operations.

### 🏗️ Architecture

- **Framework**: FastAPI (Python)
- **Database**: JSON files + SQLite
- **Authentication**: Basic (planned)
- **Documentation**: Auto-generated Swagger/ReDoc

### 📋 API Endpoints

#### Wishes Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/wishes/submit_wish` | Submit a new wish |
| GET | `/api/wishes/list_wishes` | Get all wishes |
| GET | `/api/wishes/wish/{id}` | Get wish details |

#### Tasks Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/list_tasks` | Get all tasks |
| POST | `/api/tasks/synthesize_task` | Create task from wish |
| GET | `/api/tasks/task/{id}` | Get task details |

#### Modules Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/modules/submit_module` | Submit a module |
| POST | `/api/modules/upload_module_file` | Upload module file |
| GET | `/api/modules/list_modules` | Get all modules |

#### Agents Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/agents/build_agent` | Build an agent |
| GET | `/api/agents/get_agent_demo/{id}` | Get agent demo |
| GET | `/api/agents/list_agents` | Get all agents |

#### Signatures Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signatures/signature_log` | Log signature |
| GET | `/api/signatures/get_signature_log/{id}` | Get signature log |
| GET | `/api/signatures/contribution_path/{id}` | Get contribution path |

### 🔧 Request/Response Examples

#### Submit Wish

**Request**
```json
{
  "content": "I want to know when my crush will confirm our relationship",
  "user_id": "user_001"
}
```

**Response**
```json
{
  "id": 1,
  "content": "I want to know when my crush will confirm our relationship",
  "user_id": "user_001",
  "status": "pending",
  "created_at": "2025-01-28T10:00:00Z"
}
```

#### Build Agent

**Request**
```json
{
  "task_id": 1,
  "modules": ["emotion_analysis", "behavior_prediction"],
  "user_id": "user_001"
}
```

**Response**
```json
{
  "id": 1,
  "task_id": 1,
  "name": "Emotion Analysis Assistant",
  "description": "AI agent for relationship analysis",
  "modules": ["emotion_analysis", "behavior_prediction"],
  "demo_code": "console.log('Hello from agent!')",
  "status": "completed",
  "created_at": "2025-01-28T10:30:00Z"
}
```

### 🚀 Getting Started

#### 1. Start the API Server

```bash
cd backend
pip install -r requirements.txt
python start.py
```

#### 2. Access API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

#### 3. Test API Endpoints

```bash
# Test wish submission
curl -X POST "http://localhost:8000/api/wishes/submit_wish" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test wish", "user_id": "test_user"}'
```

### 🔒 Security

- Input validation with Pydantic
- CORS support
- Error handling
- Rate limiting (planned)

### 📊 Error Handling

**Standard Error Response**
```json
{
  "detail": "Error message",
  "status_code": 400
}
```

**Common Error Codes**
- 400: Bad Request
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error

---

## 中文

### 🔌 API 概述

CyberNuwa 提供全面的 REST API 来管理 AI 智能体、愿望、任务和模块。API 基于 FastAPI 构建，支持同步和异步操作。

### 🏗️ 架构

- **框架**: FastAPI (Python)
- **数据库**: JSON 文件 + SQLite
- **认证**: 基础认证（计划中）
- **文档**: 自动生成 Swagger/ReDoc

### 📋 API 端点

#### 愿望管理

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/wishes/submit_wish` | 提交新愿望 |
| GET | `/api/wishes/list_wishes` | 获取所有愿望 |
| GET | `/api/wishes/wish/{id}` | 获取愿望详情 |

#### 任务管理

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/tasks/list_tasks` | 获取所有任务 |
| POST | `/api/tasks/synthesize_task` | 从愿望创建任务 |
| GET | `/api/tasks/task/{id}` | 获取任务详情 |

#### 模块管理

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/modules/submit_module` | 提交模块 |
| POST | `/api/modules/upload_module_file` | 上传模块文件 |
| GET | `/api/modules/list_modules` | 获取所有模块 |

#### 智能体管理

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/agents/build_agent` | 构建智能体 |
| GET | `/api/agents/get_agent_demo/{id}` | 获取智能体演示 |
| GET | `/api/agents/list_agents` | 获取所有智能体 |

#### 署名管理

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/signatures/signature_log` | 记录署名 |
| GET | `/api/signatures/get_signature_log/{id}` | 获取署名日志 |
| GET | `/api/signatures/contribution_path/{id}` | 获取贡献路径 |

### 🔧 请求/响应示例

#### 提交愿望

**请求**
```json
{
  "content": "想知道喜欢的女生什么时候跟我确定关系",
  "user_id": "user_001"
}
```

**响应**
```json
{
  "id": 1,
  "content": "想知道喜欢的女生什么时候跟我确定关系",
  "user_id": "user_001",
  "status": "pending",
  "created_at": "2025-01-28T10:00:00Z"
}
```

#### 构建智能体

**请求**
```json
{
  "task_id": 1,
  "modules": ["emotion_analysis", "behavior_prediction"],
  "user_id": "user_001"
}
```

**响应**
```json
{
  "id": 1,
  "task_id": 1,
  "name": "情感分析助手",
  "description": "关系分析 AI 智能体",
  "modules": ["emotion_analysis", "behavior_prediction"],
  "demo_code": "console.log('Hello from agent!')",
  "status": "completed",
  "created_at": "2025-01-28T10:30:00Z"
}
```

### 🚀 快速开始

#### 1. 启动 API 服务器

```bash
cd backend
pip install -r requirements.txt
python start.py
```

#### 2. 访问 API 文档

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

#### 3. 测试 API 端点

```bash
# 测试愿望提交
curl -X POST "http://localhost:8000/api/wishes/submit_wish" \
  -H "Content-Type: application/json" \
  -d '{"content": "测试愿望", "user_id": "test_user"}'
```

### 🔒 安全

- 使用 Pydantic 进行输入验证
- CORS 支持
- 错误处理
- 速率限制（计划中）

### 📊 错误处理

**标准错误响应**
```json
{
  "detail": "错误信息",
  "status_code": 400
}
```

**常见错误代码**
- 400: 错误请求
- 404: 未找到
- 422: 验证错误
- 500: 内部服务器错误 