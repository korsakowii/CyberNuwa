
# 🌌 Cyber Nüwa - 智能体共创平台

这是一个面向创意共创与智能体养成的开放式平台，融合了 Kaggle 的任务机制、Notion 的协作空间与 HuggingFace 的模型文化。它致力于打造一个非问答型、署名保护、面向未来协作的 AI 应用宇宙。

> 在这里，每个创意都有"孵化权"，每个智能体都拥有"成长路径"。

---

# 🌌 Cyber Nüwa - AI Agent Co-Creation Platform

This is an open platform for creative co-creation and AI agent development, integrating Kaggle's task mechanisms, Notion's collaborative spaces, and HuggingFace's model culture. It aims to build a non-Q&A, attribution-protected, future-oriented collaborative AI application universe.

> Here, every idea has the "right to incubate", and every agent has a "growth path".

---

## 🌍 中英文双语支持 / Bilingual Support

✅ **完整的中英文双语界面** / Complete Chinese-English bilingual interface
- 实时语言切换 / Real-time language switching
- 所有页面内容本地化 / All page content localized
- 响应式语言切换组件 / Responsive language switcher component

## 📦 项目结构 / Project Structure

```
CyberNuwa/
├── app/                     # Next.js App Router 页面 / Pages
│   ├── page.tsx            # 首页 - 平台概览和模块导航 / Home - Platform Overview
│   ├── layout.tsx          # 根布局配置 / Root Layout
│   ├── globals.css         # 全局样式 / Global Styles
│   ├── launch-mission/     # 发起任务表单 / Launch Mission Form
│   ├── agents/             # Agent 养成所 / Agent Incubator
│   ├── train-agent/        # Agent 训练界面 / Agent Training Interface
│   ├── wishes/             # 许愿池 / Wish Pool
│   ├── roles/              # 用户角色系统 / User Role System
│   ├── narratives/         # 元叙事广场 / Metanarrative Square
│   └── task-square/        # 任务广场 / Task Square
├── components/             # 可复用组件 / Reusable Components
│   └── LanguageSwitcher.tsx # 语言切换组件 / Language Switcher Component
├── locales/                # 国际化文件 / Internationalization Files
│   ├── zh/                 # 中文翻译 / Chinese Translations
│   └── en/                 # 英文翻译 / English Translations
├── styles/                 # 样式文件 / Style Files
├── package.json            # 项目依赖与脚本 / Dependencies & Scripts
└── README.md               # 项目说明 / Project Documentation
```

## 🚀 启动方式 / Getting Started

### 中文 / Chinese

1. 安装依赖：

```bash
npm install
```

2. 本地开发模式：

```bash
npm run dev
```

3. 构建生产版本：

```bash
npm run build && npm start
```

### English

1. Install dependencies:

```bash
npm install
```

2. Local development mode:

```bash
npm run dev
```

3. Build production version:

```bash
npm run build && npm start
```

## ✨ 技术栈 / Tech Stack

- [Next.js 14](https://nextjs.org/) - React 全栈框架 / React Full-Stack Framework
- [React 18](https://reactjs.org/) - 用户界面库 / User Interface Library
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架 / Utility-First CSS Framework
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript / Type-Safe JavaScript
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) - 状态管理 / State Management

## 🏗️ 核心模块 / Core Modules

| 模块名 / Module | 路径 / Path | 说明 / Description |
|----------------|-------------|-------------------|
| 首页 / Home | `/` | 平台概览、模块导航、项目愿景 / Platform Overview & Navigation |
| 发起任务 / Launch Mission | `/launch-mission` | 提交创意任务，让社区共同孵化 / Submit Creative Tasks |
| Agent 养成所 / Agent Incubator | `/agents` | 查看智能体列表与训练记录 / View Agent List & Training Records |
| 训练智能体 / Train Agent | `/train-agent` | 通过提示词和样本训练自定义 Agent / Train Custom Agents |
| 许愿池 / Wish Pool | `/wishes` | 展示灵感碎片和半成品想法 / Show Inspiration Fragments |
| 用户角色 / User Roles | `/roles` | 扮演不同角色，体验不同权限路径 / Experience Different Roles |
| 元叙事广场 / Metanarrative | `/narratives` | 记录社区发展和 Agent 传记 / Community History & Biographies |
| 任务广场 / Task Square | `/task-square` | 浏览所有公开任务与进展 / Browse All Public Tasks |

## 🎨 设计特色 / Design Features

- **暗色主题 / Dark Theme**: 采用 `bg-zinc-900` 暗黑背景 + 白色文字 / Dark Background with White Text
- **渐变色彩 / Gradient Colors**: 每个模块使用独特的渐变色彩方案 / Unique Gradient Schemes
- **动效体验 / Animations**: 悬停动画、页面过渡、进度条动画 / Hover Effects & Transitions
- **响应式设计 / Responsive Design**: 支持桌面端和移动端 / Desktop & Mobile Support
- **现代化 UI / Modern UI**: 毛玻璃效果、圆角设计、阴影层次 / Glassmorphism & Modern Design
- **语言切换 / Language Switching**: 实时中英文切换 / Real-time Chinese-English switching

## 🧬 样式指南 / Style Guide

- 统一使用 `max-w-6xl mx-auto` 控制内容宽度 / Content Width Control
- 卡片样式：`bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl` / Card Styles
- 按钮样式：渐变背景 + 悬停缩放效果 / Button Styles with Gradients
- 标签样式：`px-2 py-1 bg-zinc-700/50 text-zinc-300 text-xs rounded-full` / Tag Styles

## 💡 项目愿景 / Project Vision

> 让每个创意都被看见、让每位参与者都能留下痕迹，  
> 在非问答型协作中捏出赛博智能体，  
> 共同建造一座人机共创的灵感宇宙。

> Let every idea be seen, let every participant leave their mark,  
> Mold cyber agents through non-Q&A collaboration,  
> Together build a universe of human-machine co-creation.

## 🚧 下一步开发建议 / Next Development Steps

### 中文 / Chinese

1. **数据持久化**: 接入数据库或 GitHub API 实现任务存储
2. **用户认证**: 实现用户注册、登录和权限管理
3. **AI 集成**: 引入 LLM 接口，让用户可训练自定义 Agent
4. **实时协作**: 添加实时聊天、协作编辑功能
5. **版本控制**: 构建版本继承链，支持任务 > Agent > 演化路径追踪
6. **视觉宇宙**: 打造 Logo、Icon、星图视图等视觉元素

### English

1. **Data Persistence**: Integrate database or GitHub API for task storage
2. **User Authentication**: Implement user registration, login, and permission management
3. **AI Integration**: Introduce LLM interfaces for custom agent training
4. **Real-time Collaboration**: Add real-time chat and collaborative editing
5. **Version Control**: Build version inheritance chains for task > agent > evolution tracking
6. **Visual Universe**: Create logos, icons, star map views, and other visual elements

## 🧩 命名风格 / Naming Conventions

| 英文 / English | 中文 / Chinese | 含义 / Meaning |
|---------------|---------------|---------------|
| MCP | Mission Collaboration Protocol | 任务协作协议名 / Mission Collaboration Protocol |
| Agent | 智能体 | 被训练的模型或行为体 / Trained Models or Entities |
| 许愿池 / Wish Pool | Wish Pool | 创意原矿区 / Creative Mining Area |
| 元叙事 / Metanarrative | Metanarrative | 社区历史、代表故事 / Community History & Stories |
| 数字子民 / Digital Entities | Digital Entities | 用户训练生成的智能体 / User-Trained Agents |

## 🌐 访问方式 / Access Methods

### 本地访问 / Local Access
- **开发环境**: http://localhost:3000
- **生产环境**: http://localhost:3000 (npm start)

### 在线部署 / Online Deployment
- **Vercel**: https://cybernuwa.vercel.app (推荐)
- **Netlify**: https://cybernuwa.netlify.app
- **GitHub Pages**: https://yourusername.github.io/CyberNuwa

---

如需参与贡献或提交任务，请访问 `发起任务（/launch-mission）` 页面。

To contribute or submit tasks, please visit the `Launch Mission (/launch-mission)` page.
