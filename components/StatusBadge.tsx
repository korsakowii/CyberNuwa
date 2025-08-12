'use client';

import React from 'react';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

// 状态类型定义
export type StatusType = 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'cancelled';

// 状态配置接口
interface StatusConfig {
  label: string;
  variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  className?: string;
  icon?: string;
}

// 状态配置映射
const statusConfigs: Record<StatusType, StatusConfig> = {
  success: {
    label: '成功',
    variant: 'success',
    className: 'bg-green-100 text-green-800 border-green-200',
    icon: '✅'
  },
  warning: {
    label: '警告',
    variant: 'warning',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '⚠️'
  },
  error: {
    label: '错误',
    variant: 'danger',
    className: 'bg-red-100 text-red-800 border-red-200',
    icon: '❌'
  },
  info: {
    label: '信息',
    variant: 'primary',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: 'ℹ️'
  },
  pending: {
    label: '待处理',
    variant: 'secondary',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '⏳'
  },
  processing: {
    label: '处理中',
    variant: 'warning',
    className: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '🔄'
  },
  completed: {
    label: '已完成',
    variant: 'success',
    className: 'bg-green-100 text-green-800 border-green-200',
    icon: '✅'
  },
  cancelled: {
    label: '已取消',
    variant: 'outline',
    className: 'bg-gray-50 text-gray-600 border-gray-300',
    icon: '🚫'
  }
};

// 组件属性接口
interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function StatusBadge({
  status,
  showIcon = true,
  size = 'md',
  className,
  onClick,
  interactive = false
}: StatusBadgeProps) {
  const config = statusConfigs[status];
  
  if (!config) {
    console.warn(`Unknown status type: ${status}`);
    return null;
  }

  const badgeContent = (
    <>
      {showIcon && config.icon && (
        <span className="mr-1">{config.icon}</span>
      )}
      {config.label}
    </>
  );

  return (
    <Badge
      variant={config.variant}
      size={size}
      className={cn(
        config.className,
        interactive && 'cursor-pointer hover:scale-105 transition-transform',
        className
      )}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {badgeContent}
    </Badge>
  );
}

// 状态组组件 - 用于显示多个状态
interface StatusGroupProps {
  statuses: Array<{ type: StatusType; label?: string }>;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function StatusGroup({ 
  statuses, 
  direction = 'horizontal', 
  className 
}: StatusGroupProps) {
  return (
    <div
      className={cn(
        'flex gap-2',
        direction === 'vertical' && 'flex-col',
        className
      )}
    >
      {statuses.map((status, index) => (
        <StatusBadge
          key={`${status.type}-${index}`}
          status={status.type}
          className={status.label ? 'cursor-help' : ''}
          title={status.label}
        />
      ))}
    </div>
  );
}

// 状态指示器组件 - 用于显示状态变化
interface StatusIndicatorProps {
  currentStatus: StatusType;
  previousStatus?: StatusType;
  showChange?: boolean;
  className?: string;
}

export function StatusIndicator({
  currentStatus,
  previousStatus,
  showChange = true,
  className
}: StatusIndicatorProps) {
  const hasChanged = previousStatus && previousStatus !== currentStatus;
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <StatusBadge status={currentStatus} />
      {showChange && hasChanged && (
        <span className="text-xs text-gray-500">
          {previousStatus} → {currentStatus}
        </span>
      )}
    </div>
  );
}
