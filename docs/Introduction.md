# 🧠 Cyber Nuwa · 产品打造说明

## ✨ 项目简介

**Cyber Nüwa** 是一个面向创意共创与智能体养成的开放式平台，融合了 Kaggle 的任务机制、Notion 的协作空间与 HuggingFace 的模型文化。它致力于打造一个非问答型、署名保护、面向未来协作的 AI 应用宇宙。

> 在这里，每个创意都有“孵化权”，每个智能体都拥有“成长路径”。

---

## 📐 技术选型

| 模块 | 技术栈 |
|------|--------|
| 前端框架 | Next.js 14 + App Router |
| 组件库 | Tailwind CSS + shadcn/ui |
| 动效体验 | Framer Motion |
| 构建工具 | Vite / Turbopack (可选) |
| AI 集成（预留）| OpenAI API / HuggingFace Hub |
| 数据托管（预留） | Supabase / Firebase / GitHub Repo |

---

## 🏗️ 模块结构

| 模块名 | 说明 |
|--------|------|
| `/launch-mission` | 发起任务表单（用户提交创意任务） |
| `/agents` | Agent 养成所：显示 Agent 列表与训练记录（开发中） |
| `/train-agent` | Agent 训练界面（提示词 + 样本输入） |
| `/wishes` | 愿望池：展示灵感碎片、半成品想法（开发中） |
| `/roles` | 用户可扮演的角色及其权限/路径 |
| `/narratives` | 元叙事广场：记录社区发展、Agent 传记等 |
| `/task-square` | 任务广场：浏览所有公开任务与进展 |

---

## 📝 组件示例：发起智能任务表单（LaunchMissionForm）

位于 `app/launch-mission/page.tsx`：

- 使用 shadcn 卡片 + Tailwind 暗色 UI
- 动效标题 `🚀 发起智能任务` 使用 Framer Motion 实现缓入
- 表单包含三项输入：任务标题、任务描述、关键词标签
- 提交后切换状态并提示用户“任务已提交，感谢你的贡献！”
- 可扩展为将任务存入数据库 / GitHub Issue / Notion page

```tsx
<p className="text-green-400 text-center font-medium">
  任务已提交，感谢你的贡献！
</p>
```

后续推荐在 `handleSubmit()` 中接入 API、Notion SDK 或 GitHub API 实现自动存档。

---

## 🧬 样式指南（UI Style）

- 暗黑背景 `bg-zinc-900` + 白色文字
- 统一使用 `motion.div` 实现页面入场动效
- 所有按钮、卡片使用 `shadcn/ui` 风格一致化
- 推荐用 `max-w-3xl mx-auto` 控制内容宽度

---

## 🚧 下一步开发建议

1. 接入数据库或 GitHub API 实现任务存储
2. 构建 `/agents` 页面展示 Agent 成果
3. 引入 LLM 接口，让用户可训练自定义 Agent
4. 构建版本继承链，支持任务 > Agent > 演化路径追踪
5. 打造视觉宇宙（Logo/Icon/星图视图）

---

## 🧩 命名风格建议

| 英文 | 中文 | 含义 |
|------|------|------|
| MCP | Mission Collaboration Protocol | 任务协作协议名 |
| Agent | 智能体 | 被训练的模型或行为体 |
| 许愿池 | Wish Pool | 创意原矿区 |
| 元叙事 | Metanarrative | 社区历史、代表故事 |
| 数字子民 | Digital Entities | 用户训练生成的智能体 |