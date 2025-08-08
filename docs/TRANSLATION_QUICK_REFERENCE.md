# 翻译系统快速参考

## 🚀 快速开始

### 1. 启动服务
```bash
# 后端
cd backend && python main.py

# 前端
npm run dev
```

### 2. 测试翻译
```bash
# 健康检查
curl http://localhost:8001/health

# 单文本翻译
curl -X POST http://localhost:8001/api/translation/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "你好世界", "target_lang": "en"}'

# 批量翻译
curl -X POST http://localhost:8001/api/translation/translate_batch \
  -H "Content-Type: application/json" \
  -d '{"texts": ["你好", "世界"], "target_lang": "en"}'
```

## 📋 API 速查

### 单文本翻译
```http
POST /api/translation/translate
{
  "text": "要翻译的文本",
  "target_lang": "en|zh",
  "source_lang": "auto"
}
```

### 批量翻译
```http
POST /api/translation/translate_batch
{
  "texts": ["文本1", "文本2"],
  "target_lang": "en|zh",
  "source_lang": "auto"
}
```

### 语言检测
```http
POST /api/translation/detect
{
  "text": "检测语言"
}
```

## 🎯 前端使用

### 基本用法
```typescript
import { useTranslation } from '@/components/TranslationProvider'

function MyComponent() {
  const { translateText, autoTranslatePage, isTranslating } = useTranslation()
  
  // 翻译单个文本
  const handleTranslate = async () => {
    const result = await translateText("你好", "en")
    console.log(result) // "Hello"
  }
  
  // 全局翻译
  const handleGlobalTranslate = async () => {
    await autoTranslatePage()
  }
  
  return (
    <button onClick={handleTranslate} disabled={isTranslating}>
      翻译
    </button>
  )
}
```

### 翻译控件
```tsx
import { TranslationControls } from '@/components/TranslationControls'

function App() {
  return (
    <div>
      {/* 页面内容 */}
      <TranslationControls />
    </div>
  )
}
```

## ⚡ 性能优化

### 关键配置
```python
# backend/utils/translation_service.py
self.semaphore = asyncio.Semaphore(10)  # 并发限制
self.request_interval = 0.2  # 请求间隔(秒)
```

```typescript
// 前端批量大小
const batchSize = 10  // 每批处理文本数量
```

### 缓存策略
- 内存缓存: 即时生效
- 本地存储: 跨会话保持
- 自动去重: 避免重复翻译

## 🔧 常见问题

### Q: 翻译速度慢？
A: 
- 检查网络连接
- 确认后端服务运行
- 查看浏览器控制台错误

### Q: 翻译失败？
A:
- 检查API服务状态
- 验证请求格式
- 查看服务器日志

### Q: 如何添加新语言？
A:
1. 在 `translation_service.py` 中添加新API
2. 更新前端语言检测逻辑
3. 添加语言标识符

## 📁 核心文件

```
components/
├── TranslationProvider.tsx    # 翻译上下文
├── TranslationControls.tsx    # 翻译控件
└── WishCard.tsx              # 卡片组件

backend/
├── routes/translation.py      # API路由
└── utils/translation_service.py # 翻译服务

app/
├── wishes/page.tsx           # 愿望页面
└── test-global-translation/  # 测试页面
```

## 🎨 UI组件

### TranslationControls
- 位置: 右下角固定
- 功能: 一键翻译 + 设置
- 状态: 进度指示器

### 状态指示器
- 位置: 右上角
- 显示: 当前语言
- 颜色: 绿色(中文) / 蓝色(英文)

## 📊 监控指标

- 翻译响应时间
- API调用频率  
- 缓存命中率
- 错误率统计

## 🔮 扩展功能

- [ ] 更多语言支持
- [ ] 语音翻译
- [ ] 翻译历史
- [ ] 用户偏好

---

**快速参考版本**: v1.0.0  
**完整文档**: [TRANSLATION_SYSTEM_DOCUMENTATION.md](./TRANSLATION_SYSTEM_DOCUMENTATION.md) 