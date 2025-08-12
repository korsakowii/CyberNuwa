# CyberNüwa 部署指南

## 🚀 部署状态

### GitHub Pages 部署

- **状态**: 已配置，等待自动部署
- **触发条件**: 推送到 `main` 分支时自动触发
- **访问地址**: https://korsakowii.github.io/CyberNuwa/
- **Showcase页面**: https://korsakowii.github.io/CyberNuwa/showcase/standalone/

### Vercel 部署

- **状态**: 主站已部署
- **访问地址**: [你的Vercel地址]

## 🔧 部署配置

### GitHub Actions 工作流

文件位置: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 📁 页面结构

### 主站页面

- `/` - 主页
- `/launch-mission` - 发布任务
- `/agents` - 智能体孵化器
- `/train-agent` - 智能体训练
- `/wishes` - 许愿池
- `/roles` - 用户角色
- `/narratives` - 元叙事广场
- `/task-square` - 任务广场
- `/showcase` - 功能展示

### 独立展示页面

- `/showcase/standalone` - 独立的展示页面（适合GitHub Pages）

## 🛠️ 技术配置

### Next.js 配置

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出
  trailingSlash: true, // 尾部斜杠
  images: {
    unoptimized: true, // 图片优化关闭（静态部署需要）
  },
};

module.exports = nextConfig;
```

### 构建命令

```bash
npm run build  # 构建静态文件
```

### 构建输出

- 输出目录: `out/`
- 静态文件: HTML, CSS, JS
- 资源文件: `_next/` 目录

## 🔍 故障排除

### 常见问题

1. **权限错误 (403)**
   - 原因: GitHub Actions 权限不足
   - 解决: 已配置正确的 `permissions` 设置

2. **构建失败**
   - 检查 Node.js 版本 (需要 >= 18.17.0)
   - 检查依赖安装
   - 查看构建日志

3. **页面样式丢失**
   - 检查 Tailwind CSS 配置
   - 确保 `globals.css` 正确导入

### 调试步骤

1. **本地测试**

   ```bash
   npm run build
   npm run start
   ```

2. **检查构建输出**

   ```bash
   ls -la out/
   ```

3. **查看 GitHub Actions 日志**
   - 访问: https://github.com/korsakowii/CyberNuwa/actions

## 📞 支持

如有部署问题，请检查：

1. GitHub Actions 运行状态
2. 构建日志输出
3. 权限配置是否正确

---

**CyberNuwa** - AI智能体平台部署指南 🚀
