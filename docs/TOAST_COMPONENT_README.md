# Toast 组件使用指南

## 概述

Toast 组件是一个功能完整的通知系统，支持多种通知类型、自定义持续时间、操作按钮等功能。它提供了良好的用户体验和灵活的配置选项。

## 组件组成

- `ToastProvider`: 提供 Toast 上下文的 Provider 组件
- `Toast`: 单个 Toast 通知组件
- `ToastContainer`: Toast 容器，管理多个 Toast 的显示
- `useToast`: Hook，用于在组件中添加和管理 Toast

## 基本用法

### 1. 设置 Provider

在应用的根组件中添加 `ToastProvider`：

```tsx
import { ToastProvider } from '@/components';

function App() {
  return (
    <ToastProvider>
      {/* 你的应用内容 */}
    </ToastProvider>
  );
}
```

### 2. 使用 useToast Hook

在需要显示 Toast 的组件中使用：

```tsx
import { useToast } from '@/components';

function MyComponent() {
  const { addToast, removeToast, clearToasts } = useToast();

  const showSuccessMessage = () => {
    addToast({
      type: 'success',
      title: '操作成功',
      message: '数据已保存',
    });
  };

  return (
    <button onClick={showSuccessMessage}>
      显示成功消息
    </button>
  );
}
```

## API 参考

### Toast 接口

```typescript
interface Toast {
  id: string;                    // 唯一标识符（自动生成）
  type: 'success' | 'error' | 'warning' | 'info';  // 通知类型
  title: string;                 // 通知标题
  message?: string;              // 通知内容（可选）
  duration?: number;             // 持续时间（毫秒，0表示不自动消失）
  action?: {                     // 操作按钮（可选）
    label: string;               // 按钮文本
    onClick: () => void;         // 点击回调
  };
}
```

### useToast Hook

```typescript
const { addToast, removeToast, clearToasts } = useToast();

// 添加 Toast
addToast(toast: Omit<Toast, 'id'>): string;

// 移除指定 Toast
removeToast(id: string): void;

// 清除所有 Toast
clearToasts(): void;
```

### ToastContainer 属性

```typescript
interface ToastContainerProps {
  toasts: Toast[];               // Toast 数组
  onClose: (id: string) => void; // 关闭回调
  position?: 'top-left' | 'top-right' | 'top-center' | 
            'bottom-left' | 'bottom-right' | 'bottom-center'; // 位置
  className?: string;            // 自定义样式类
}
```

## 通知类型

### 成功通知 (success)
- 绿色主题
- 对勾图标
- 适用于操作成功、数据保存等场景

### 错误通知 (error)
- 红色主题
- 叉号图标
- 适用于操作失败、错误提示等场景

### 警告通知 (warning)
- 黄色主题
- 警告图标
- 适用于需要注意的重要信息

### 信息通知 (info)
- 蓝色主题
- 信息图标
- 适用于一般信息提示

## 高级功能

### 自定义持续时间

```tsx
// 5秒后自动消失
addToast({
  type: 'success',
  title: '操作完成',
  duration: 5000,
});

// 不自动消失，需要手动关闭
addToast({
  type: 'error',
  title: '错误信息',
  duration: 0,
});
```

### 操作按钮

```tsx
addToast({
  type: 'info',
  title: '需要确认',
  message: '您确定要删除这个项目吗？',
  duration: 0,
  action: {
    label: '确认删除',
    onClick: () => {
      // 执行删除操作
      deleteItem();
      // 显示成功消息
      addToast({
        type: 'success',
        title: '已删除',
        message: '项目已成功删除',
      });
    },
  },
});
```

### 位置配置

Toast 支持 6 个位置：

- `top-left`: 左上角
- `top-right`: 右上角（默认）
- `top-center`: 顶部中央
- `bottom-left`: 左下角
- `bottom-right`: 右下角
- `bottom-center`: 底部中央

## 样式定制

### 使用 Tailwind CSS 类

```tsx
<Toast
  toast={toast}
  onClose={handleClose}
  className="custom-toast-class"
/>
```

### 自定义样式

Toast 组件使用 Tailwind CSS 类，你可以通过以下方式自定义：

1. 覆盖默认样式类
2. 使用 `className` 属性添加自定义类
3. 修改组件的默认样式

## 最佳实践

### 1. 通知类型选择

- **success**: 操作成功、数据保存、任务完成
- **error**: 操作失败、网络错误、验证失败
- **warning**: 需要注意的信息、即将过期、容量警告
- **info**: 一般信息、状态更新、提示说明

### 2. 持续时间设置

- **即时操作**: 1-3秒（如保存成功）
- **需要阅读**: 3-5秒（如状态更新）
- **重要信息**: 5-8秒（如系统通知）
- **需要操作**: 0秒（如确认对话框）

### 3. 消息内容

- 标题简洁明了（5-10字）
- 消息内容具体详细
- 使用用户友好的语言
- 避免技术术语

### 4. 批量通知

```tsx
// 避免同时显示过多通知
const showBatchNotifications = () => {
  const notifications = [
    { title: '任务1完成', type: 'success' as const },
    { title: '任务2完成', type: 'success' as const },
    { title: '任务3完成', type: 'success' as const },
  ];

  notifications.forEach((notification, index) => {
    setTimeout(() => {
      addToast({
        ...notification,
        message: `第${index + 1}个任务已成功完成`,
        duration: 3000,
      });
    }, index * 500); // 间隔500ms显示
  });
};
```

## 示例代码

### 完整的表单提交示例

```tsx
import { useToast } from '@/components';

function ContactForm() {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      await submitForm(data);
      
      addToast({
        type: 'success',
        title: '提交成功',
        message: '您的消息已发送，我们会尽快回复',
        duration: 5000,
      });
      
      // 重置表单
      resetForm();
    } catch (error) {
      addToast({
        type: 'error',
        title: '提交失败',
        message: '发送失败，请检查网络连接后重试',
        duration: 0,
        action: {
          label: '重试',
          onClick: () => handleSubmit(data),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
    </form>
  );
}
```

## 注意事项

1. **Provider 位置**: 确保 `ToastProvider` 包裹在需要显示 Toast 的组件外层
2. **Hook 使用**: `useToast` 只能在 `ToastProvider` 内部使用
3. **性能考虑**: 避免在短时间内创建大量 Toast
4. **无障碍性**: Toast 组件已包含适当的 ARIA 属性和键盘导航支持
5. **移动端适配**: 组件已针对移动设备进行了响应式设计

## 故障排除

### 常见问题

1. **Toast 不显示**
   - 检查是否正确包裹了 `ToastProvider`
   - 确认 `useToast` 在 Provider 内部使用

2. **样式不正确**
   - 检查 Tailwind CSS 是否正确配置
   - 确认没有样式冲突

3. **动画不流畅**
   - 检查浏览器是否支持 CSS transitions
   - 确认没有 JavaScript 错误

### 调试技巧

```tsx
// 在开发环境中添加调试信息
const { addToast } = useToast();

const debugToast = (message: string) => {
  console.log('Adding toast:', message);
  addToast({
    type: 'info',
    title: '调试信息',
    message,
    duration: 3000,
  });
};
```

## 更新日志

- **v1.0.0**: 初始版本，支持基础通知功能
- **v1.1.0**: 添加操作按钮支持
- **v1.2.0**: 优化动画效果和性能
- **v1.3.0**: 添加位置配置选项
