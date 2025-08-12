# CyberNuwa 项目结构

## 项目概述

CyberNuwa 是一个全栈项目，包含前端（Next.js）和后端（Python FastAPI）应用。

## 目录结构

### 根目录

```
CyberNuwa/
├── app/                    # Next.js 应用目录
├── backend/               # Python 后端应用
├── components/            # React 组件
├── contexts/              # React 上下文
├── docs/                  # 项目文档
├── lib/                   # 工具库
├── locales/               # 国际化文件
├── scripts/               # 脚本文件
├── styles/                # 样式文件
├── tests/                 # 测试文件
├── utils/                 # 工具函数
└── 配置文件...
```

### 后端结构 (backend/)

```
backend/
├── data/                  # 数据文件
├── models/                # 数据模型
├── routes/                # API 路由
├── scripts/               # 后端脚本
├── static/                # 静态文件
├── tests/                 # 后端测试
├── utils/                 # 后端工具
├── main.py               # 主应用入口
├── requirements.txt      # Python 依赖
└── env.example          # 环境变量示例
```

### 文档结构 (docs/)

```
docs/
├── translation/           # 翻译相关文档
└── 其他文档...
```

### 测试结构 (tests/)

```
tests/
├── test_final_translation.js
├── test_frontend.py
└── test_integration.py
```

## 主要功能模块

### 前端模块

- **agents/** - 智能体管理
- **launch-mission/** - 任务启动
- **narratives/** - 叙事管理
- **roles/** - 角色管理
- **showcase/** - 展示页面
- **task-square/** - 任务广场
- **train-agent/** - 智能体训练
- **wishes/** - 愿望管理

### 后端模块

- **agents/** - 智能体 API
- **modules/** - 模块管理
- **routes/** - API 路由
- **utils/** - 工具函数

## 开发指南

### 启动前端

```bash
npm run dev
```

### 启动后端

```bash
cd backend
python main.py
```

### 运行测试

```bash
# 前端测试
npm test

# 后端测试
cd backend/tests
python -m pytest
```

## 环境配置

1. 复制 `backend/env.example` 为 `backend/.env`
2. 配置必要的环境变量
3. 安装依赖：`npm install` 和 `pip install -r backend/requirements.txt`
