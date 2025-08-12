'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

// 错误类型定义
export type ErrorType = 'runtime' | 'network' | 'validation' | 'permission' | 'unknown';

// 错误信息接口
interface ErrorDetails {
  type: ErrorType;
  message: string;
  code?: string;
  timestamp: Date;
  stack?: string;
}

// 组件属性接口
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: ErrorDetails) => ReactNode);
  onError?: (error: ErrorDetails) => void;
  showDetails?: boolean;
  className?: string;
  resetOnPropsChange?: boolean;
}

// 组件状态接口
interface ErrorBoundaryState {
  hasError: boolean;
  error: ErrorDetails | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null 
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorDetails: ErrorDetails = {
      type: this.getErrorType(error),
      message: error.message || 'An unexpected error occurred',
      code: this.getErrorCode(error),
      timestamp: new Date(),
      stack: error.stack
    };

    return { 
      hasError: true, 
      error: errorDetails 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误信息
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 调用错误回调
    if (this.props.onError && this.state.error) {
      this.props.onError(this.state.error);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // 如果启用了 props 变化时重置，则重置错误状态
    if (this.props.resetOnPropsChange && 
        JSON.stringify(prevProps.children) !== JSON.stringify(this.props.children)) {
      this.setState({ hasError: false, error: null });
    }
  }

  // 获取错误类型
  private static getErrorType(error: Error): ErrorType {
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return 'runtime';
    }
    if (error.name === 'NetworkError' || error.message.includes('fetch')) {
      return 'network';
    }
    if (error.name === 'ValidationError') {
      return 'validation';
    }
    if (error.name === 'PermissionError' || error.message.includes('permission')) {
      return 'permission';
    }
    return 'unknown';
  }

  // 获取错误代码
  private static getErrorCode(error: Error): string | undefined {
    // 可以从错误对象中提取错误代码
    const codeMatch = error.message.match(/\[(\w+)\]/);
    return codeMatch ? codeMatch[1] : undefined;
  }

  // 重置错误状态
  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  // 重新加载页面
  private handleReload = () => {
    window.location.reload();
  };

  // 渲染错误详情
  private renderErrorDetails(error: ErrorDetails) {
    if (!this.props.showDetails) return null;

    return (
      <div className="mt-4 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
        <details className="text-sm text-zinc-400">
          <summary className="cursor-pointer hover:text-zinc-300 mb-2">
            错误详情
          </summary>
          <div className="space-y-2 text-xs">
            {error.code && (
              <div>
                <span className="text-zinc-500">错误代码:</span> {error.code}
              </div>
            )}
            <div>
              <span className="text-zinc-500">时间:</span> {error.timestamp.toLocaleString()}
            </div>
            {error.stack && (
              <div>
                <span className="text-zinc-500">堆栈:</span>
                <pre className="mt-1 p-2 bg-zinc-900 rounded text-zinc-400 overflow-x-auto">
                  {error.stack}
                </pre>
              </div>
            )}
          </div>
        </details>
      </div>
    );
  }

  // 渲染默认错误界面
  private renderDefaultError(error: ErrorDetails) {
    const errorIcons = {
      runtime: '💥',
      network: '🌐',
      validation: '📝',
      permission: '🔒',
      unknown: '⚠️'
    };

    const errorTitles = {
      runtime: '运行时错误',
      network: '网络错误',
      validation: '验证错误',
      permission: '权限错误',
      unknown: '未知错误'
    };

    const errorDescriptions = {
      runtime: '程序执行过程中出现了错误',
      network: '网络连接或请求出现问题',
      validation: '数据验证失败',
      permission: '没有足够的权限执行此操作',
      unknown: '发生了意外的错误'
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-zinc-800/80 border-zinc-700 backdrop-blur-sm">
          <div className="text-center p-6">
            {/* 错误图标 */}
            <div className="text-6xl mb-4 animate-bounce">
              {errorIcons[error.type]}
            </div>

            {/* 错误类型标签 */}
            <Badge 
              variant={error.type === 'runtime' ? 'danger' : 
                      error.type === 'network' ? 'warning' : 
                      error.type === 'validation' ? 'primary' : 
                      error.type === 'permission' ? 'secondary' : 'outline'}
              className="mb-4"
            >
              {errorTitles[error.type]}
            </Badge>

            {/* 错误标题 */}
            <h2 className="text-xl font-bold text-white mb-3">
              页面出现错误
            </h2>

            {/* 错误消息 */}
            <p className="text-zinc-300 mb-6 text-sm">
              {error.message}
            </p>

            {/* 错误描述 */}
            <p className="text-zinc-400 mb-6 text-xs">
              {errorDescriptions[error.type]}
            </p>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={this.handleReset}
                variant="primary"
                className="flex-1"
              >
                🔄 重试
              </Button>
              <Button
                onClick={this.handleReload}
                variant="outline"
                className="flex-1"
              >
                🔃 重新加载
              </Button>
            </div>

            {/* 错误详情 */}
            {this.renderErrorDetails(error)}
          </div>
        </Card>
      </div>
    );
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // 如果提供了自定义 fallback
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error);
        }
        return this.props.fallback;
      }

      // 渲染默认错误界面
      return this.renderDefaultError(this.state.error);
    }

    return this.props.children;
  }
}

// 函数式错误边界的 Hook 版本
export function useErrorBoundary() {
  const [error, setError] = React.useState<ErrorDetails | null>(null);

  const handleError = React.useCallback((error: Error) => {
    const errorDetails: ErrorDetails = {
      type: ErrorBoundary.getErrorType(error),
      message: error.message || 'An unexpected error occurred',
      code: ErrorBoundary.getErrorCode(error),
      timestamp: new Date(),
      stack: error.stack
    };
    setError(errorDetails);
  }, []);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, resetError };
}
