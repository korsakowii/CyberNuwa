# CyberNuwa 本地部署指南

## 🚀 本地部署命令

### 1. 主网站开发 (Vercel风格)
```bash
# 开发环境
npm run dev
# 访问: http://localhost:3000

# 生产构建测试
npm run build
npm run start
# 访问: http://localhost:3000
```

### 2. GitHub Pages静态版本
```bash
# 静态构建
npm run build:static
# 查看输出: ls -la out/

# 本地预览静态文件
npm run preview:static
# 访问: http://localhost:3001
```

## 📋 详细操作步骤

### 测试主网站功能
```bash
# 1. 启动开发服务器
npm run dev

# 2. 在浏览器访问
# http://localhost:3000 - 主页
# http://localhost:3000/task-square - 任务广场
# http://localhost:3000/agents - 智能体孵化器
# 等等...

# 3. 测试生产构建
npm run build
npm run start
```

### 测试GitHub Pages静态版本
```bash
# 1. 构建静态文件
npm run build:static

# 2. 查看构建输出
ls -la out/
# 应该看到:
# - index.html (主页)
# - showcase/standalone/index.html (独立展示页)
# - _next/ (静态资源)
# - 其他页面目录

# 3. 预览静态文件
npm run preview:static
# 或者手动启动:
# npx serve out/ -p 3001

# 4. 在浏览器访问
# http://localhost:3001 - 静态主页
# http://localhost:3001/showcase/standalone/ - 独立展示页
```

## 🔧 构建脚本说明

| 命令 | 用途 | 配置 | 输出 |
|------|------|------|------|
| `npm run dev` | 开发环境 | 标准配置 | 开发服务器 |
| `npm run build` | Vercel构建 | next.config.js | .next目录 |
| `npm run build:static` | GitHub Pages构建 | next.config.static.js | out目录 |
| `npm run preview:static` | 静态预览 | 静态配置 | 本地服务器 |

## 🎯 区分要点

### 主网站 (Vercel)
- **配置**: `next.config.js` (标准配置)
- **构建**: 动态构建，支持SSR/SSG
- **功能**: 完整的7个功能模块
- **端口**: 3000

### GitHub Pages静态版本
- **配置**: `next.config.static.js` (静态导出)
- **构建**: 静态HTML导出
- **功能**: 仅展示页面
- **端口**: 3001

## 🔍 验证方法

### 验证主网站
1. 访问 http://localhost:3000
2. 检查所有功能模块是否正常工作
3. 测试语言切换功能
4. 验证动态功能

### 验证静态版本
1. 访问 http://localhost:3001
2. 检查静态文件是否正确生成
3. 验证独立展示页: http://localhost:3001/showcase/standalone/
4. 确认所有链接都是相对路径

## 🛠️ 故障排除

### 主网站问题
```bash
# 清理缓存
rm -rf .next
npm run dev

# 重新安装依赖
rm -rf node_modules
npm install
```

### 静态构建问题
```bash
# 清理构建文件
rm -rf out/
npm run build:static

# 检查配置文件
cat next.config.js
# 应该显示静态配置
```

## 📊 构建对比

| 特性 | 主网站 | 静态版本 |
|------|--------|----------|
| 构建时间 | 快 | 稍慢 |
| 文件大小 | 小 | 大 |
| 功能完整性 | 完整 | 仅展示 |
| 部署方式 | 动态 | 静态 |
| 本地预览 | 3000端口 | 3001端口 |

## 🎯 使用场景

### 主网站开发
- 功能开发和测试
- 动态功能验证
- 用户交互测试
- 性能优化

### 静态版本测试
- GitHub Pages部署验证
- 静态文件完整性检查
- 外部链接测试
- SEO优化验证

---

**CyberNuwa** - 清晰的本地部署指南 🚀 