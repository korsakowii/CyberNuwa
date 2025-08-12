# 🚨 水合问题修复指南

## 问题描述
水合问题（Hydration Mismatch）是指服务器端渲染（SSR）和客户端水合（CSR）时内容不一致导致的错误。

## 🎯 常见水合问题

### 1. **语言上下文不一致**
- 服务器端默认返回 `'en'`
- 客户端可能返回 `'zh'`（从localStorage读取）
- 导致翻译文本不匹配

### 2. **动态内容渲染**
- 愿望数量：`${wishes.length}`
- 条件渲染：`wishes.length === 0`
- 服务器端和客户端数据不同步

### 3. **时间相关数据**
- `new Date()` 在不同环境返回不同值
- 本地化日期格式差异

## ✅ 解决方案

### 1. **使用 HydrationGuard 组件**
```tsx
import HydrationGuard from '../../components/HydrationGuard'

// 保护动态内容
<HydrationGuard waitFor={isInitialized}>
  <div>愿望数量: {wishes.length}</div>
</HydrationGuard>
```

### 2. **语言上下文初始化检查**
```tsx
const { language, isInitialized } = useLanguage()

// 只在语言初始化完成后渲染
useEffect(() => {
  if (isInitialized) {
    fetchWishes()
  }
}, [isInitialized])
```

### 3. **客户端状态管理**
```tsx
const [isClient, setIsClient] = useState(false)

useEffect(() => {
  setIsClient(true)
}, [])

// 条件渲染
{isClient && <DynamicContent />}
```

## 🛡️ 最佳实践

### 1. **避免在服务器端和客户端渲染不同内容**
```tsx
// ❌ 错误：直接使用动态数据
<div>当前显示 {wishes.length} 个愿望</div>

// ✅ 正确：使用 HydrationGuard 保护
<HydrationGuard waitFor={isInitialized}>
  <div>当前显示 {wishes.length} 个愿望</div>
</HydrationGuard>
```

### 2. **统一状态管理**
```tsx
// 使用 isInitialized 确保语言上下文已准备就绪
const { language, isInitialized } = useLanguage()

// 等待所有依赖项准备完成
useEffect(() => {
  if (isInitialized) {
    // 执行需要语言上下文的操作
  }
}, [isInitialized])
```

### 3. **提供备用内容**
```tsx
<HydrationGuard 
  waitFor={isInitialized}
  fallback={<div>加载中...</div>}
>
  <ActualContent />
</HydrationGuard>
```

## 🔧 工具组件

### HydrationGuard
- **用途**：防止水合不匹配
- **参数**：
  - `children`: 需要保护的内容
  - `fallback`: 水合完成前显示的备用内容
  - `waitFor`: 额外的等待条件

### useHydration Hook
- **用途**：获取水合状态
- **返回**：是否已完成水合

## 📝 检查清单

- [ ] 所有动态内容都使用 `HydrationGuard` 包装
- [ ] 语言相关操作等待 `isInitialized`
- [ ] 避免在服务器端和客户端渲染不同内容
- [ ] 提供合适的备用内容
- [ ] 测试不同语言环境下的水合

## 🚀 性能优化

### 1. **延迟加载**
```tsx
// 只在需要时加载数据
useEffect(() => {
  if (isInitialized && !wishes.length) {
    fetchWishes()
  }
}, [isInitialized, wishes.length])
```

### 2. **缓存策略**
```tsx
// 避免重复请求
const [hasLoaded, setHasLoaded] = useState(false)

useEffect(() => {
  if (isInitialized && !hasLoaded) {
    fetchWishes()
    setHasLoaded(true)
  }
}, [isInitialized, hasLoaded])
```

## 🎉 结果
使用这些解决方案后：
- ✅ 消除水合错误
- ✅ 提升用户体验
- ✅ 代码更加健壮
- ✅ 维护性更好
