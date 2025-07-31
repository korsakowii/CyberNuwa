# 🚀 Vercel 部署指南 - 确保部署 Release 分支 / Vercel Deployment Guide - Ensuring Release Branch Deployment

[English](#english) | [中文](#中文)

---

## English

### 📋 Overview

This guide details how to configure Vercel to ensure only the `release` branch is deployed, implementing a stable production deployment strategy.

### 🎯 Branch Strategy

```
main (development) → qa (testing) → release (production)
```

- **main**: Daily development branch
- **qa**: Quality assurance branch  
- **release**: Production deployment branch (Vercel only deploys this branch)

### 🔧 Configuration Methods

#### Method 1: Vercel Console Configuration (Recommended)

1. **Access Vercel Console**
   ```
   https://vercel.com/dashboard
   ```

2. **Enter Project Settings**
   - Select CyberNuwa project
   - Click "Settings" tab

3. **Configure Git Settings**
   - Find "Production Branch" in "Git" section
   - Set value to `release`
   - Save settings

4. **Verify Configuration**
   - Push code to release branch
   - Check if Vercel automatically triggers deployment

#### Method 2: vercel.json Configuration

The `vercel.json` file in project root is configured:

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

#### Method 3: Vercel CLI Configuration

```bash
# Set production branch
vercel --prod --branch release

# Or use project linking
vercel link
vercel env pull .env.local
```

### 🚀 Deployment Process

#### Using Deployment Script (Recommended)

```bash
# Run on any branch
./deploy.sh
```

The script automatically:
1. Checks current branch
2. Merges changes to release branch
3. Pushes to remote release branch
4. Triggers Vercel auto-deployment

#### Manual Deployment Process

```bash
# 1. Ensure code is committed
git add .
git commit -m "feat: your changes"

# 2. Switch to release branch
git checkout release

# 3. Merge development branch changes
git merge main --no-edit

# 4. Push to remote
git push origin release

# 5. Switch back to development branch
git checkout main
```

### 📊 Deployment Verification

#### Check Deployment Status

1. **Vercel Console**
   - Visit project dashboard
   - View latest deployment status
   - Check build logs

2. **Deployment URLs**
   - Production: `https://cybernuwa.vercel.app`
   - Preview: `https://cybernuwa-git-release-yourusername.vercel.app`

3. **GitHub Integration**
   - Check GitHub repository Actions tab
   - Confirm release branch is latest

### 🛠️ Troubleshooting

#### Common Issues

**Issue 1: Vercel deployed wrong branch**
**Solution:**
```bash
# Check Vercel project settings
# Ensure Production Branch is set to release
```

**Issue 2: Deployment failed**
**Solution:**
```bash
# Check build logs
# Ensure all dependencies are installed
npm install

# Test build locally
npm run build
```

**Issue 3: Branch out of sync**
**Solution:**
```bash
# Sync remote branches
git fetch origin

# Reset local release branch
git checkout release
git reset --hard origin/release
```

### 🔄 Automated Workflow

#### GitHub Actions Configuration (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [release]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 📈 Monitoring and Maintenance

#### Deployment Monitoring

1. **Vercel Analytics**
   - Enable Vercel Analytics
   - Monitor performance metrics
   - Track user behavior

2. **Error Monitoring**
   - Integrate Sentry or similar tools
   - Monitor runtime errors
   - Set up alert notifications

#### Regular Maintenance

1. **Dependency Updates**
   ```bash
   npm audit fix
   npm update
   ```

2. **Performance Optimization**
   - Check Core Web Vitals
   - Optimize images and resources
   - Monitor loading times

3. **Security Checks**
   - Regular security audits
   - Update dependency packages
   - Check environment variables

### 🎉 Best Practices

#### Development Workflow

1. **Feature Development**
   ```bash
   git checkout main
   # Develop new features
   git add .
   git commit -m "feat: new feature"
   git push origin main
   ```

2. **Testing and Validation**
   ```bash
   git checkout qa
   git merge main
   # Perform testing
   git push origin qa
   ```

3. **Production Deployment**
   ```bash
   ./deploy.sh
   # Or manually merge to release branch
   ```

#### Version Management

1. **Semantic Versioning**
   - Use version numbers in package.json
   - Follow semantic versioning specification
   - Update CHANGELOG.md

2. **Tag Management**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

### 📞 Support

If you encounter deployment issues:

1. Check Vercel build logs
2. Verify branch configuration
3. Confirm code has no syntax errors
4. Review project documentation

---

## 中文

### 📋 概述

本指南详细说明如何配置 Vercel 确保只部署 `release` 分支，实现稳定的生产环境部署策略。

### 🎯 分支策略

```
main (开发分支) → qa (测试分支) → release (生产分支)
```

- **main**: 日常开发分支
- **qa**: 质量保证分支
- **release**: 生产部署分支（Vercel 只部署此分支）

## 🎯 分支策略

```
main (开发分支) → qa (测试分支) → release (生产分支)
```

- **main**: 日常开发分支
- **qa**: 质量保证分支
- **release**: 生产部署分支（Vercel 只部署此分支）

## 🔧 配置方法

### 方法 1: Vercel 控制台配置（推荐）

1. **访问 Vercel 控制台**
   ```
   https://vercel.com/dashboard
   ```

2. **进入项目设置**
   - 选择 CyberNuwa 项目
   - 点击 "Settings" 标签

3. **配置 Git 设置**
   - 在 "Git" 部分找到 "Production Branch"
   - 将值设置为 `release`
   - 保存设置

4. **验证配置**
   - 推送代码到 release 分支
   - 检查 Vercel 是否自动触发部署

### 方法 2: vercel.json 配置

项目根目录的 `vercel.json` 文件已配置：

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

### 方法 3: Vercel CLI 配置

```bash
# 设置生产分支
vercel --prod --branch release

# 或者使用项目链接
vercel link
vercel env pull .env.local
```

## 🚀 部署流程

### 使用部署脚本（推荐）

```bash
# 在任意分支上运行
./deploy.sh
```

脚本会自动：
1. 检查当前分支
2. 将更改合并到 release 分支
3. 推送到远程 release 分支
4. 触发 Vercel 自动部署

### 手动部署流程

```bash
# 1. 确保代码已提交
git add .
git commit -m "feat: your changes"

# 2. 切换到 release 分支
git checkout release

# 3. 合并开发分支的更改
git merge main --no-edit

# 4. 推送到远程
git push origin release

# 5. 切换回开发分支
git checkout main
```

## 📊 部署验证

### 检查部署状态

1. **Vercel 控制台**
   - 访问项目仪表板
   - 查看最新部署状态
   - 检查构建日志

2. **部署 URL**
   - 生产环境: `https://cybernuwa.vercel.app`
   - 预览环境: `https://cybernuwa-git-release-yourusername.vercel.app`

3. **GitHub 集成**
   - 检查 GitHub 仓库的 Actions 标签
   - 确认 release 分支是最新的

### 常见问题排查

#### 问题 1: Vercel 部署了错误的分支
**解决方案:**
```bash
# 检查 Vercel 项目设置
# 确保 Production Branch 设置为 release
```

#### 问题 2: 部署失败
**解决方案:**
```bash
# 检查构建日志
# 确保所有依赖已安装
npm install

# 本地测试构建
npm run build
```

#### 问题 3: 分支不同步
**解决方案:**
```bash
# 同步远程分支
git fetch origin

# 重置本地 release 分支
git checkout release
git reset --hard origin/release
```

## 🔄 自动化工作流

### GitHub Actions 配置（可选）

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [release]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📈 监控和维护

### 部署监控

1. **Vercel Analytics**
   - 启用 Vercel Analytics
   - 监控性能指标
   - 跟踪用户行为

2. **错误监控**
   - 集成 Sentry 或类似工具
   - 监控运行时错误
   - 设置告警通知

### 定期维护

1. **依赖更新**
   ```bash
   npm audit fix
   npm update
   ```

2. **性能优化**
   - 检查 Core Web Vitals
   - 优化图片和资源
   - 监控加载时间

3. **安全检查**
   - 定期安全审计
   - 更新依赖包
   - 检查环境变量

## 🎉 最佳实践

### 开发流程

1. **功能开发**
   ```bash
   git checkout main
   # 开发新功能
   git add .
   git commit -m "feat: new feature"
   git push origin main
   ```

2. **测试验证**
   ```bash
   git checkout qa
   git merge main
   # 进行测试
   git push origin qa
   ```

3. **生产部署**
   ```bash
   ./deploy.sh
   # 或手动合并到 release 分支
   ```

### 版本管理

1. **语义化版本**
   - 使用 `package.json` 中的版本号
   - 遵循语义化版本规范
   - 更新 CHANGELOG.md

2. **标签管理**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## 📞 支持

如果遇到部署问题：

1. 检查 Vercel 构建日志
2. 验证分支配置
3. 确认代码没有语法错误
4. 查看项目文档

---

**CyberNuwa** - 稳定的生产部署策略 🚀 