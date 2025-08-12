# 生产环境配置指南

## 🎯 概述

本文档描述了 CyberNuwa 项目的生产环境配置，确保应用在生产环境中安全、高效地运行。

## 🚀 环境区分

### 开发环境 (`NODE_ENV=development`)

- ✅ 显示所有调试组件
- ✅ 测试页面可用
- ✅ 详细错误信息
- ✅ 热重载功能

### 生产环境 (`NODE_ENV=production`)

- ❌ 隐藏调试组件
- ❌ 测试页面重定向到首页
- ❌ 简化错误信息
- ✅ 性能优化

## 🔧 配置组件

### 1. DevOnly 组件

```typescript
import { DevOnly } from '@/components/DevOnly'

// 只在开发环境显示
<DevOnly>
  <DebugComponent />
</DevOnly>
```

### 2. 环境检查 Hook

```typescript
import { useDevOnly } from '@/components/DevOnly';

const { isDev, devOnly } = useDevOnly();

// 只在开发环境执行
devOnly(() => {
  console.log('调试信息');
});
```

## 📁 受影响的页面

### 测试页面 (仅开发环境)

- `/test-global-translation` - 翻译功能测试
- `/test-api` - API 测试
- `/test-translation` - 翻译测试
- `/test-translation-fix` - 翻译修复测试
- `/test-complete-translation` - 完整翻译测试
- `/test-language-state` - 语言状态测试
- `/test-simple` - 简单测试
- `/test-form` - 表单测试
- `/integration-test` - 集成测试

### 调试组件 (仅开发环境)

- API状态指示器
- 翻译控件
- 语言状态指示器

## 🛠️ 部署脚本

### 生产环境部署

```bash
# 使用部署脚本
npm run deploy:prod

# 或手动部署
npm run build:prod
npm run start:prod
```

### 构建命令

```bash
# 生产环境构建
npm run build:prod

# 开发环境构建
npm run build

# 静态导出
npm run build:static
```

## ⚙️ Next.js 配置

### 生产环境优化

```javascript
// next.config.js
{
  productionBrowserSourceMaps: false, // 不生成source maps
  compress: true,                     // 启用压缩
  output: 'standalone',               // 独立输出
}
```

### 安全头部

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ]
}
```

### 重定向规则

```javascript
async redirects() {
  return [
    // 生产环境重定向测试页面
    ...(process.env.NODE_ENV === 'production' ? [
      {
        source: '/test-:path*',
        destination: '/',
        permanent: false,
      },
    ] : []),
  ]
}
```

## 🔒 安全配置

### 环境变量

```bash
# 生产环境变量
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.cybernuwa.com
```

### 安全头部

- `X-Frame-Options: DENY` - 防止点击劫持
- `X-Content-Type-Options: nosniff` - 防止MIME类型嗅探
- `Referrer-Policy: origin-when-cross-origin` - 控制引用策略

## 📊 性能优化

### 构建优化

- 禁用生产环境 source maps
- 启用 CSS 优化
- 优化包导入
- 启用压缩

### 运行时优化

- 条件渲染调试组件
- 测试页面重定向
- 简化错误处理

## 🚀 部署流程

### 1. 准备环境

```bash
# 设置生产环境
export NODE_ENV=production

# 安装依赖
npm ci --only=production
```

### 2. 构建应用

```bash
# 构建生产版本
npm run build:prod
```

### 3. 启动服务

```bash
# 启动生产服务器
npm run start:prod
```

### 4. 验证部署

- 检查应用是否正常启动
- 验证测试页面重定向
- 确认调试组件已隐藏
- 测试核心功能

## 🔍 监控和日志

### 生产环境日志

```javascript
// 生产环境日志配置
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}; // 禁用详细日志
}
```

### 错误监控

- 使用错误边界捕获 React 错误
- 配置错误报告服务
- 监控 API 调用状态

## 📝 检查清单

### 部署前检查

- [ ] 环境变量配置正确
- [ ] 所有测试页面已添加 DevOnly 包装
- [ ] 调试组件已条件渲染
- [ ] 安全头部已配置
- [ ] 重定向规则已设置

### 部署后验证

- [ ] 应用正常启动
- [ ] 测试页面重定向到首页
- [ ] 调试组件已隐藏
- [ ] 核心功能正常工作
- [ ] 性能指标正常

## 🐛 故障排除

### 常见问题

1. **测试页面仍然可访问**
   - 检查 NODE_ENV 是否正确设置
   - 确认重定向规则已生效
   - 清除浏览器缓存

2. **调试组件仍然显示**
   - 检查 DevOnly 组件是否正确导入
   - 确认环境检查逻辑正确
   - 重新构建应用

3. **性能问题**
   - 检查构建配置
   - 确认压缩已启用
   - 分析包大小

## 📚 相关文档

- [翻译系统文档](./TRANSLATION_SYSTEM_DOCUMENTATION.md)
- [快速参考](./TRANSLATION_QUICK_REFERENCE.md)
- [项目总结](./PROJECT_SUMMARY.md)

---

**文档版本**: v1.0.0  
**最后更新**: 2025-01-28  
**维护者**: CyberNuwa Team
