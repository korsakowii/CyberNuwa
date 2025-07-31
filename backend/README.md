# CyberNuwa Backend API

AI Agent 共创平台后端服务

## 🚀 快速开始

### 1. 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 2. 配置环境变量

复制环境变量示例文件并配置：

```bash
cp env.example .env
```

编辑 `.env` 文件，配置必要的环境变量：

```env
# OpenAI配置（可选，不配置将使用模拟响应）
OPENAI_API_KEY=your_openai_api_key_here

# 应用配置
DEBUG=true
SECRET_KEY=your-secret-key-here
```

### 3. 启动服务

```bash
# 方式1：使用启动脚本
python start.py

# 方式2：直接使用uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. 访问API文档

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **健康检查**: http://localhost:8000/health

## 📋 API端点

### 愿望管理 (`/api/wishes`)

- `POST /submit_wish` - 提交用户愿望
- `GET /list_wishes` - 获取愿望列表
- `GET /wish/{wish_id}` - 获取愿望详情
- `PUT /wish/{wish_id}` - 更新愿望
- `DELETE /wish/{wish_id}` - 删除愿望
- `POST /wish/{wish_id}/synthesize` - 将愿望合成为任务

### 任务管理 (`/api/tasks`)

- `GET /list_tasks` - 获取任务列表（任务广场）
- `POST /synthesize_task` - 将愿望转化为结构化任务
- `GET /task/{task_id}` - 获取任务详情
- `POST /task` - 创建任务
- `PUT /task/{task_id}` - 更新任务
- `DELETE /task/{task_id}` - 删除任务

### 模块管理 (`/api/modules`)

- `POST /submit_module` - 提交模块内容
- `POST /upload_module_file` - 上传模块文件
- `GET /list_modules` - 获取模块列表
- `GET /module/{module_id}` - 获取模块详情
- `PUT /module/{module_id}` - 更新模块
- `DELETE /module/{module_id}` - 删除模块

### 智能体管理 (`/api/agents`)

- `POST /build_agent` - 构建智能体
- `GET /get_agent_demo/{agent_id}` - 获取智能体演示
- `GET /list_agents` - 获取智能体列表
- `GET /agent/{agent_id}` - 获取智能体详情
- `POST /agent` - 创建智能体
- `PUT /agent/{agent_id}` - 更新智能体
- `DELETE /agent/{agent_id}` - 删除智能体

### 署名管理 (`/api/signatures`)

- `POST /signature_log` - 记录署名信息
- `GET /get_signature_log/{agent_id}` - 获取署名日志
- `GET /list_signatures` - 获取署名列表
- `GET /signature/{signature_id}` - 获取署名详情
- `GET /contribution_path/{agent_id}` - 获取贡献路径
- `GET /user_contributions/{user_id}` - 获取用户贡献历史

## 🧪 测试示例

### 1. 提交愿望

```bash
curl -X POST "http://localhost:8000/api/wishes/submit_wish" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "想知道喜欢的女生什么时候跟我确定关系",
    "user_id": "user_001"
  }'
```

### 2. 合成任务

```bash
curl -X POST "http://localhost:8000/api/tasks/synthesize_task" \
  -H "Content-Type: application/json" \
  -d '{
    "wish_id": 1,
    "use_ai": true
  }'
```

### 3. 获取任务列表

```bash
curl "http://localhost:8000/api/tasks/list_tasks?page=1&size=10"
```

### 4. 提交模块

```bash
curl -X POST "http://localhost:8000/api/modules/submit_module" \
  -H "Content-Type: application/json" \
  -d '{
    "task_id": 1,
    "name": "情感分析模块",
    "content": "def analyze_emotion(text): return {\"emotion\": \"positive\", \"confidence\": 0.8}",
    "user_id": "user_002"
  }'
```

### 5. 构建智能体

```bash
curl -X POST "http://localhost:8000/api/agents/build_agent" \
  -H "Content-Type: application/json" \
  -d '{
    "task_id": 1,
    "modules": [1, 2, 3]
  }'
```

## 📁 项目结构

```
backend/
├── main.py                 # 主应用文件
├── start.py               # 启动脚本
├── requirements.txt       # 依赖包列表
├── env.example           # 环境变量示例
├── README.md             # 项目文档
├── routes/               # 路由模块
│   ├── __init__.py
│   ├── wishes.py         # 愿望管理
│   ├── tasks.py          # 任务管理
│   ├── modules.py        # 模块管理
│   ├── agents.py         # 智能体管理
│   └── signatures.py     # 署名管理
├── models/               # 数据模型
│   ├── __init__.py
│   └── schemas.py        # Pydantic模型
├── utils/                # 工具模块
│   ├── __init__.py
│   ├── config.py         # 配置管理
│   ├── database.py       # 数据库操作
│   └── ai_service.py     # AI服务
└── data/                 # 数据存储目录
    ├── wishes.json       # 愿望数据
    ├── tasks.json        # 任务数据
    ├── signatures.json   # 署名数据
    ├── modules/          # 模块文件
    └── agents/           # 智能体文件
```

## 🔧 配置说明

### 数据库配置

项目使用JSON文件作为轻量级数据库，支持以下配置：

- `DATA_DIR`: 数据存储目录
- `WISHES_FILE`: 愿望数据文件
- `TASKS_FILE`: 任务数据文件
- `SIGNATURES_FILE`: 署名数据文件

### AI服务配置

- `OPENAI_API_KEY`: OpenAI API密钥
- `OPENAI_MODEL`: 使用的模型（默认gpt-3.5-turbo）
- `OPENAI_MAX_TOKENS`: 最大token数

### 安全配置

- `SECRET_KEY`: 应用密钥
- `DEBUG`: 调试模式
- `ALLOWED_ORIGINS`: 允许的跨域来源

## 🚀 部署

### 开发环境

```bash
python start.py
```

### 生产环境

```bash
# 使用gunicorn
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# 使用Docker
docker build -t cybernuwa-backend .
docker run -p 8000:8000 cybernuwa-backend
```

## 📝 开发说明

### 添加新的API端点

1. 在 `routes/` 目录下创建新的路由文件
2. 在 `models/schemas.py` 中定义数据模型
3. 在 `main.py` 中注册路由
4. 更新API文档

### 扩展AI功能

1. 在 `utils/ai_service.py` 中添加新的AI服务函数
2. 在相应的路由中调用AI服务
3. 添加错误处理和模拟响应

### 数据存储

项目支持多种数据存储方式：

- **JSON文件**: 轻量级，适合开发和小规模使用
- **SQLite**: 关系型数据库，适合中等规模
- **PostgreSQL**: 生产环境推荐

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## �� 许可证

MIT License 