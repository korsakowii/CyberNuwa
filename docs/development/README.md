# CyberNuwa 开发指南 / CyberNuwa Development Guide

[English](#english) | [中文](#中文)

---

## English

### 🛠️ Development Environment Setup

#### Prerequisites

- Node.js 18+ 
- Python 3.8+
- Git
- VS Code (recommended)

#### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/CyberNuwa.git
cd CyberNuwa

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..

# Start development servers
npm run dev          # Frontend (http://localhost:3000)
cd backend && python start.py  # Backend (http://localhost:8000)
```

### 🏗️ Project Structure

```
CyberNuwa/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── agents/            # Agents page
│   ├── launch-mission/    # Mission launch page
│   ├── narratives/        # Narratives page
│   ├── roles/             # Roles page
│   ├── showcase/          # Showcase page
│   ├── task-square/       # Task square page
│   ├── train-agent/       # Agent training page
│   └── wishes/            # Wishes page
├── backend/               # FastAPI backend
│   ├── main.py           # Main application
│   ├── routes/           # API routes
│   ├── models/           # Data models
│   └── utils/            # Utilities
├── components/           # React components
├── contexts/             # React contexts
├── locales/              # Internationalization
├── styles/               # Additional styles
└── docs/                 # Documentation
```

### 🔧 Development Workflow

#### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Test locally
npm run dev

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature
```

#### 2. Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Build test
npm run build
```

#### 3. Testing

```bash
# Frontend tests
npm run test

# Backend tests
cd backend
python -m pytest

# API tests
python test_api.py
```

### 📝 Coding Standards

#### TypeScript/React

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Implement proper error boundaries

```typescript
// Example component
interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: Props) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

#### Python/FastAPI

- Use type hints
- Follow PEP 8 style guide
- Implement proper error handling
- Use Pydantic for data validation

```python
# Example API endpoint
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

class WishRequest(BaseModel):
    content: str
    user_id: str

@app.post("/api/wishes/submit_wish")
async def submit_wish(wish: WishRequest):
    try:
        # Process wish
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### 🎨 UI/UX Guidelines

#### Design System

- Use Tailwind CSS for styling
- Follow dark theme design
- Implement responsive design
- Use consistent spacing and typography

#### Component Library

```typescript
// Button component example
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  const baseClasses = "rounded-lg font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 🔄 State Management

#### React Context

```typescript
// Language context example
interface LanguageContextType {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'zh'>('zh');
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

### 🌐 Internationalization

#### Translation Structure

```json
// locales/zh/common.json
{
  "welcome": "欢迎来到 CyberNuwa",
  "submit": "提交",
  "cancel": "取消"
}

// locales/en/common.json
{
  "welcome": "Welcome to CyberNuwa",
  "submit": "Submit",
  "cancel": "Cancel"
}
```

#### Usage in Components

```typescript
import { useTranslations } from 'next-intl';

export default function Welcome() {
  const t = useTranslations('common');
  
  return <h1>{t('welcome')}</h1>;
}
```

### 🚀 Performance Optimization

#### Frontend

- Use Next.js Image component
- Implement code splitting
- Optimize bundle size
- Use React.memo for expensive components

#### Backend

- Implement caching
- Use async/await properly
- Optimize database queries
- Monitor API response times

### 🧪 Testing Strategy

#### Unit Tests

```typescript
// Component test example
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button variant="primary">Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

#### Integration Tests

```python
# API test example
def test_submit_wish():
    response = client.post("/api/wishes/submit_wish", json={
        "content": "Test wish",
        "user_id": "test_user"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "success"
```

### 📊 Monitoring and Debugging

#### Frontend

- Use React DevTools
- Monitor Core Web Vitals
- Implement error tracking
- Use performance profiling

#### Backend

- Use FastAPI debug mode
- Monitor API metrics
- Implement logging
- Use profiling tools

---

## 中文

### 🛠️ 开发环境设置

#### 前置要求

- Node.js 18+
- Python 3.8+
- Git
- VS Code（推荐）

#### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/CyberNuwa.git
cd CyberNuwa

# 安装前端依赖
npm install

# 安装后端依赖
cd backend
pip install -r requirements.txt
cd ..

# 启动开发服务器
npm run dev          # 前端 (http://localhost:3000)
cd backend && python start.py  # 后端 (http://localhost:8000)
```

### 🏗️ 项目结构

```
CyberNuwa/
├── app/                    # Next.js app 目录
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── agents/            # 智能体页面
│   ├── launch-mission/    # 任务启动页面
│   ├── narratives/        # 叙事页面
│   ├── roles/             # 角色页面
│   ├── showcase/          # 展示页面
│   ├── task-square/       # 任务广场页面
│   ├── train-agent/       # 智能体训练页面
│   └── wishes/            # 愿望页面
├── backend/               # FastAPI 后端
│   ├── main.py           # 主应用
│   ├── routes/           # API 路由
│   ├── models/           # 数据模型
│   └── utils/            # 工具函数
├── components/           # React 组件
├── contexts/             # React 上下文
├── locales/              # 国际化
├── styles/               # 额外样式
└── docs/                 # 文档
```

### 🔧 开发工作流

#### 1. 功能开发

```bash
# 创建功能分支
git checkout -b feature/new-feature

# 进行更改
# 本地测试
npm run dev

# 提交更改
git add .
git commit -m "feat: 添加新功能"

# 推送到远程
git push origin feature/new-feature
```

#### 2. 代码质量

```bash
# 类型检查
npm run type-check

# 代码检查
npm run lint

# 格式化代码
npm run format

# 构建测试
npm run build
```

#### 3. 测试

```bash
# 前端测试
npm run test

# 后端测试
cd backend
python -m pytest

# API 测试
python test_api.py
```

### 📝 编码标准

#### TypeScript/React

- 使用 TypeScript 确保类型安全
- 遵循 React 最佳实践
- 使用函数组件和 hooks
- 实现适当的错误边界

```typescript
// 组件示例
interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: Props) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

#### Python/FastAPI

- 使用类型提示
- 遵循 PEP 8 风格指南
- 实现适当的错误处理
- 使用 Pydantic 进行数据验证

```python
# API 端点示例
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

class WishRequest(BaseModel):
    content: str
    user_id: str

@app.post("/api/wishes/submit_wish")
async def submit_wish(wish: WishRequest):
    try:
        # 处理愿望
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### 🎨 UI/UX 指南

#### 设计系统

- 使用 Tailwind CSS 进行样式设计
- 遵循暗色主题设计
- 实现响应式设计
- 使用一致的间距和排版

#### 组件库

```typescript
// 按钮组件示例
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  const baseClasses = "rounded-lg font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 🔄 状态管理

#### React Context

```typescript
// 语言上下文示例
interface LanguageContextType {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'zh'>('zh');
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

### 🌐 国际化

#### 翻译结构

```json
// locales/zh/common.json
{
  "welcome": "欢迎来到 CyberNuwa",
  "submit": "提交",
  "cancel": "取消"
}

// locales/en/common.json
{
  "welcome": "Welcome to CyberNuwa",
  "submit": "Submit",
  "cancel": "Cancel"
}
```

#### 在组件中使用

```typescript
import { useTranslations } from 'next-intl';

export default function Welcome() {
  const t = useTranslations('common');
  
  return <h1>{t('welcome')}</h1>;
}
```

### 🚀 性能优化

#### 前端

- 使用 Next.js Image 组件
- 实现代码分割
- 优化包大小
- 对昂贵组件使用 React.memo

#### 后端

- 实现缓存
- 正确使用 async/await
- 优化数据库查询
- 监控 API 响应时间

### 🧪 测试策略

#### 单元测试

```typescript
// 组件测试示例
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('渲染带有正确文本的按钮', () => {
  render(<Button variant="primary">点击我</Button>);
  expect(screen.getByText('点击我')).toBeInTheDocument();
});
```

#### 集成测试

```python
# API 测试示例
def test_submit_wish():
    response = client.post("/api/wishes/submit_wish", json={
        "content": "测试愿望",
        "user_id": "test_user"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "success"
```

### 📊 监控和调试

#### 前端

- 使用 React DevTools
- 监控 Core Web Vitals
- 实现错误跟踪
- 使用性能分析

#### 后端

- 使用 FastAPI 调试模式
- 监控 API 指标
- 实现日志记录
- 使用分析工具 