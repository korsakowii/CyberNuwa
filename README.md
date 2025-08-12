# 🌌 Cyber Nüwa - 智能体共创平台

面向创意共创与智能体养成的开放式平台，融合任务机制、协作空间与模型文化。

## ✨ 特性

- 🚀 **现代化架构** - 基于 Next.js 14 + React 18 + TypeScript
- 🌐 **国际化支持** - 中英文双语界面，智能语言检测
- 🎨 **设计系统** - 统一的UI组件库，支持多种主题
- 📱 **响应式设计** - 完美适配各种设备尺寸
- 🧪 **测试覆盖** - 完整的单元测试和集成测试
- 🔧 **开发体验** - ESLint + Prettier + Husky 代码质量保障

## 🛠️ 技术栈

### 前端

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript 5.3+
- **UI库**: React 18 + Tailwind CSS
- **状态管理**: React Context API
- **测试**: Jest + React Testing Library

### 开发工具

- **代码质量**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **类型检查**: TypeScript strict mode
- **包管理**: npm

## 🚀 快速开始

### 环境要求

- Node.js 18.0.0+
- npm 9.0.0+

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
CyberNuwa/
├── app/                    # Next.js App Router 页面
├── components/            # React 组件
│   ├── ui/               # 基础UI组件库
│   └── ...               # 业务组件
├── contexts/             # React Context 状态管理
├── hooks/                # 自定义 React Hooks
├── lib/                  # 工具函数库
├── types/                # TypeScript 类型定义
├── tests/                # 测试文件
├── styles/               # 全局样式
└── docs/                 # 项目文档
```

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage

# 调试模式
npm run test:debug
```

### 测试覆盖率目标

- 分支覆盖率: 70%
- 函数覆盖率: 70%
- 行覆盖率: 70%
- 语句覆盖率: 70%

## 🔧 代码质量

### 代码检查

```bash
# 运行 ESLint
npm run lint

# 自动修复
npm run lint:fix

# 类型检查
npm run type-check

# 格式化代码
npm run format
```

### 质量检查

```bash
# 完整质量检查
npm run quality

# 自动修复
npm run quality:fix
```

## 🌐 国际化

项目支持中英文双语界面：

- 自动语言检测
- 持久化语言偏好
- 智能翻译功能
- 响应式语言切换

### 语言配置

```typescript
// 支持的语言
type Language = 'zh' | 'en';

// 语言检测
const detectedLang = detectLanguage(text);

// 语言格式化
const formattedLang = formatLanguage(lang);
```

## 🎨 组件库

### 基础组件

- **Button** - 支持多种变体和状态的按钮
- **Input** - 智能输入框，支持翻译功能
- **Textarea** - 多行文本输入
- **Card** - 卡片容器，支持多种布局

### 使用示例

```tsx
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

<Card variant='elevated' hover>
  <Card.Header title='标题' subtitle='副标题' />
  <Card.Content>内容区域</Card.Content>
  <Card.Footer justify='between'>
    <Button variant='outline'>取消</Button>
    <Button variant='primary'>确认</Button>
  </Card.Footer>
</Card>;
```

## 📚 自定义 Hooks

### useLocalStorage

```typescript
const [value, setValue] = useLocalStorage('key', initialValue);
```

### useDebounce

```typescript
const debouncedValue = useDebounce(value, 500);
```

## 🔄 开发工作流

1. **代码提交前检查**
   - ESLint 代码规范检查
   - Prettier 代码格式化
   - TypeScript 类型检查
   - 单元测试运行

2. **Git Hooks**
   - pre-commit: 运行 lint-staged
   - 确保代码质量

3. **持续集成**
   - 自动化测试
   - 代码覆盖率报告
   - 类型安全检查

## 📖 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 联系我们

- 项目主页: [Cyber Nüwa](https://github.com/your-username/CyberNuwa)
- 问题反馈: [Issues](https://github.com/your-username/CyberNuwa/issues)
- 功能建议: [Discussions](https://github.com/your-username/CyberNuwa/discussions)

---

**Cyber Nüwa** - 让创意与智能体共创美好未来 🌟
