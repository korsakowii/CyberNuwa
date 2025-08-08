# CyberNüwa 部署策略

## 🚀 双部署架构

### 1. Vercel主站部署
**用途**: 完整功能演示和实际使用
**地址**: https://cybernuwa.vercel.app

#### 配置特点
- **Next.js配置**: `next.config.js` (标准配置)
- **构建方式**: 动态构建，支持SSR/SSG
- **图片优化**: 启用
- **功能**: 完整的7个功能模块
- **更新**: 实时部署，支持动态功能

#### 构建命令
```bash
npm run build  # 使用标准配置
```

#### 部署流程
1. 推送到GitHub main分支
2. Vercel自动检测并构建
3. 部署到Vercel生产环境
4. 支持预览部署和回滚

### 2. GitHub Pages静态展示
**用途**: 独立功能展示和演示
**地址**: https://korsakowii.github.io/CyberNuwa/showcase/standalone/

#### 配置特点
- **Next.js配置**: `next.config.static.js` (静态导出配置)
- **构建方式**: 静态HTML导出
- **图片优化**: 禁用 (静态部署需要)
- **功能**: 仅展示页面，无实际功能
- **更新**: 静态部署，定期更新

#### 构建命令
```bash
npm run build:static  # 使用静态配置
```

#### 部署流程
1. 推送到GitHub main分支
2. GitHub Actions自动触发
3. 使用静态配置构建
4. 部署到GitHub Pages

## 📁 配置文件说明

### next.config.js (Vercel主站)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 标准配置，支持动态功能
  images: {
    unoptimized: false // 启用图片优化
  },
}

module.exports = nextConfig;
```

### next.config.static.js (GitHub Pages)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // 静态导出
  trailingSlash: true,     // 尾部斜杠
  images: {
    unoptimized: true      // 禁用图片优化
  },
}

module.exports = nextConfig;
```

## 🔄 构建脚本

### package.json 脚本
```json
{
  "scripts": {
    "dev": "next dev",                    // 开发环境
    "build": "next build",                // Vercel构建
    "build:static": "next build --config next.config.static.js",  // GitHub Pages构建
    "start": "next start",                // 生产环境启动
    "export": "next build --config next.config.static.js"         // 静态导出
  }
}
```

## 🎯 部署区分

### Vercel主站
- **触发**: 推送到main分支
- **构建**: `npm run build`
- **配置**: `next.config.js`
- **输出**: 动态应用
- **功能**: 完整功能

### GitHub Pages展示
- **触发**: 推送到main分支
- **构建**: `npm run build:static`
- **配置**: `next.config.static.js`
- **输出**: 静态HTML
- **功能**: 仅展示

## 📊 部署对比

| 特性 | Vercel主站 | GitHub Pages展示 |
|------|------------|------------------|
| 构建方式 | 动态构建 | 静态导出 |
| 功能完整性 | 完整功能 | 仅展示 |
| 更新频率 | 实时 | 定期 |
| 图片优化 | 启用 | 禁用 |
| 交互性 | 高 | 低 |
| 加载速度 | 快 | 很快 |
| SEO友好 | 是 | 是 |

## 🛠️ 开发流程

### 日常开发
1. 在本地开发: `npm run dev`
2. 测试功能
3. 提交代码: `git add . && git commit -m "feat: ..."`
4. 推送到GitHub: `git push origin main`

### 自动部署
1. **Vercel**: 自动检测并部署主站
2. **GitHub Pages**: 自动构建并部署展示页

## 🔍 故障排除

### Vercel部署问题
- 检查 `next.config.js` 配置
- 确保没有静态导出配置
- 查看Vercel构建日志

### GitHub Pages部署问题
- 检查 `next.config.static.js` 配置
- 确保使用 `npm run build:static`
- 查看GitHub Actions日志

## 📞 维护说明

### 配置更新
- **主站配置**: 修改 `next.config.js`
- **展示页配置**: 修改 `next.config.static.js`

### 功能更新
- 主站功能更新: 直接推送代码
- 展示页更新: 推送代码，GitHub Actions自动构建

---

**CyberNuwa** - 清晰的双部署策略，满足不同需求 🚀 