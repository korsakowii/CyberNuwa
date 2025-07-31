# CyberNuwa 部署指南 / CyberNuwa Deployment Guide

[English](#english) | [中文](#中文)

---

## English

### 🚀 Deployment Overview

This guide covers all deployment options for CyberNuwa, including Vercel, GitHub Pages, and local deployment.

### 📋 Deployment Options

#### 1. Vercel Deployment (Recommended)

**Production Branch Strategy**
- Only deploy from `release` branch
- Automatic deployment on push
- Preview deployments for other branches

**Configuration**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "git": {
    "deploymentEnabled": {
      "main": false,
      "qa": false,
      "release": true
    }
  }
}
```

**Deployment Steps**
```bash
# Use deployment script
./deploy.sh

# Or manual deployment
git checkout release
git merge main --no-edit
git push origin release
```

#### 2. GitHub Pages Deployment

**Static Export Configuration**
```javascript
// next.config.static.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
}
```

**Build and Deploy**
```bash
npm run build:static
# Deploy to GitHub Pages
```

#### 3. Local Deployment

**Development Environment**
```bash
npm run dev
# Access at http://localhost:3000
```

**Production Build**
```bash
npm run build
npm start
# Access at http://localhost:3000
```

### 🔧 Configuration Files

- `vercel.json`: Vercel deployment configuration
- `next.config.js`: Next.js configuration for Vercel
- `next.config.static.js`: Next.js configuration for static export
- `.vercelignore`: Files to exclude from Vercel deployment

### 📊 Deployment Verification

1. **Check Vercel Dashboard**
   - Visit project dashboard
   - Review deployment logs
   - Verify build status

2. **Test URLs**
   - Production: `https://cybernuwa.vercel.app`
   - Preview: `https://cybernuwa-git-release-yourusername.vercel.app`

3. **Monitor Performance**
   - Core Web Vitals
   - Build times
   - Error rates

### 🛠️ Troubleshooting

**Common Issues**
- Build failures: Check dependencies and configuration
- Branch deployment: Verify Vercel settings
- Performance issues: Optimize images and code

**Support Resources**
- Vercel documentation
- Next.js deployment guide
- Project issue tracker

---

## 中文

### 🚀 部署概述

本指南涵盖 CyberNuwa 的所有部署选项，包括 Vercel、GitHub Pages 和本地部署。

### 📋 部署选项

#### 1. Vercel 部署（推荐）

**生产分支策略**
- 仅从 `release` 分支部署
- 推送时自动部署
- 其他分支的预览部署

**配置**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "git": {
    "deploymentEnabled": {
      "main": false,
      "qa": false,
      "release": true
    }
  }
}
```

**部署步骤**
```bash
# 使用部署脚本
./deploy.sh

# 或手动部署
git checkout release
git merge main --no-edit
git push origin release
```

#### 2. GitHub Pages 部署

**静态导出配置**
```javascript
// next.config.static.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
}
```

**构建和部署**
```bash
npm run build:static
# 部署到 GitHub Pages
```

#### 3. 本地部署

**开发环境**
```bash
npm run dev
# 访问 http://localhost:3000
```

**生产构建**
```bash
npm run build
npm start
# 访问 http://localhost:3000
```

### 🔧 配置文件

- `vercel.json`: Vercel 部署配置
- `next.config.js`: Next.js Vercel 配置
- `next.config.static.js`: Next.js 静态导出配置
- `.vercelignore`: Vercel 部署排除文件

### 📊 部署验证

1. **检查 Vercel 控制台**
   - 访问项目仪表板
   - 查看部署日志
   - 验证构建状态

2. **测试 URL**
   - 生产环境: `https://cybernuwa.vercel.app`
   - 预览环境: `https://cybernuwa-git-release-yourusername.vercel.app`

3. **监控性能**
   - Core Web Vitals
   - 构建时间
   - 错误率

### 🛠️ 故障排除

**常见问题**
- 构建失败: 检查依赖和配置
- 分支部署: 验证 Vercel 设置
- 性能问题: 优化图片和代码

**支持资源**
- Vercel 文档
- Next.js 部署指南
- 项目问题跟踪器 