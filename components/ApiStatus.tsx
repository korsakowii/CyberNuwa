'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { healthApi } from '../utils/api';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { cn } from '../lib/utils';

// API 状态类型
export type ApiStatusType = 'checking' | 'online' | 'offline' | 'degraded' | 'maintenance';

// API 状态配置接口
interface ApiStatusConfig {
  type: ApiStatusType;
  label: string;
  description: string;
  icon: string;
  variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  color: string;
  bgColor: string;
}

// API 状态配置映射
const statusConfigs: Record<ApiStatusType, ApiStatusConfig> = {
  checking: {
    type: 'checking',
    label: '检查中',
    description: '正在检查API状态',
    icon: '🔄',
    variant: 'warning',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20'
  },
  online: {
    type: 'online',
    label: '在线',
    description: 'API服务正常运行',
    icon: '🟢',
    variant: 'success',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20'
  },
  offline: {
    type: 'offline',
    label: '离线',
    description: 'API服务不可用',
    icon: '🔴',
    variant: 'danger',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20'
  },
  degraded: {
    type: 'degraded',
    label: '降级',
    description: 'API服务部分可用',
    icon: '🟡',
    variant: 'warning',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20'
  },
  maintenance: {
    type: 'maintenance',
    label: '维护中',
    description: 'API服务正在维护',
    icon: '🔧',
    variant: 'secondary',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  }
};

// 组件属性接口
interface ApiStatusProps {
  language?: 'zh' | 'en';
  showDetails?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  className?: string;
  compact?: boolean;
  onStatusChange?: (status: ApiStatusType) => void;
}

export default function ApiStatus({ 
  language: propLanguage,
  showDetails = false,
  autoRefresh = true,
  refreshInterval = 30000,
  className,
  compact = false,
  onStatusChange
}: ApiStatusProps = {}) {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage || 'zh';
  
  const [status, setStatus] = useState<ApiStatusType>('checking');
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // 检查API状态
  const checkApiStatus = useCallback(async () => {
    try {
      setStatus('checking');
      const startTime = Date.now();
      
      await healthApi.check();
      
      const endTime = Date.now();
      const responseTimeMs = endTime - startTime;
      
      setResponseTime(responseTimeMs);
      setStatus('online');
      setLastCheck(new Date());
      setErrorCount(0);
      
      // 调用状态变化回调
      onStatusChange?.('online');
    } catch (error) {
      console.error('API health check failed:', error);
      setStatus('offline');
      setLastCheck(new Date());
      setErrorCount(prev => prev + 1);
      
      // 调用状态变化回调
      onStatusChange?.('offline');
    }
  }, [onStatusChange]);

  // 手动刷新
  const handleManualRefresh = () => {
    checkApiStatus();
  };

  // 切换展开状态
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // 获取本地化文本
  const getLocalizedText = (key: keyof typeof statusConfigs.online) => {
    const config = statusConfigs[status];
    if (!config) return '';
    
    const localizedLabels = {
      label: {
        checking: language === 'zh' ? '检查中' : 'Checking',
        online: language === 'zh' ? '在线' : 'Online',
        offline: language === 'zh' ? '离线' : 'Offline',
        degraded: language === 'zh' ? '降级' : 'Degraded',
        maintenance: language === 'zh' ? '维护中' : 'Maintenance'
      },
      description: {
        checking: language === 'zh' ? '正在检查API状态' : 'Checking API status',
        online: language === 'zh' ? 'API服务正常运行' : 'API service is running normally',
        offline: language === 'zh' ? 'API服务不可用' : 'API service is unavailable',
        degraded: language === 'zh' ? 'API服务部分可用' : 'API service is partially available',
        maintenance: language === 'zh' ? 'API服务正在维护' : 'API service is under maintenance'
      }
    };
    
    return localizedLabels[key][status] || config[key];
  };

  // 初始化和自动刷新
  useEffect(() => {
    checkApiStatus();

    if (autoRefresh) {
      const interval = setInterval(checkApiStatus, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [checkApiStatus, autoRefresh, refreshInterval]);

  const config = statusConfigs[status];
  if (!config) return null;

  // 紧凑模式
  if (compact) {
    return (
      <div className={cn('fixed bottom-4 right-4 z-50', className)}>
        <div
          className={cn(
            'flex items-center space-x-2 px-3 py-2',
            'bg-black/60 backdrop-blur-sm border border-slate-600/30 rounded-lg text-sm',
            config.color
          )}
          title={language === 'zh' ? 'API服务器状态' : 'API Server Status'}
        >
          <span className="text-xs animate-spin">{config.icon}</span>
          <span className="hidden sm:inline">{getLocalizedText('label')}</span>
          {lastCheck && (
            <span className="text-xs opacity-60">
              {lastCheck.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
    );
  }

  // 完整模式
  return (
    <div className={cn('fixed bottom-4 right-4 z-50', className)}>
      <Card className="w-80 bg-black/80 backdrop-blur-sm border-slate-600/30">
        {/* 状态头部 */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={cn('text-2xl', status === 'checking' && 'animate-spin')}>
                {config.icon}
              </span>
              <div>
                <Badge variant={config.variant} className="mb-1">
                  {getLocalizedText('label')}
                </Badge>
                <p className="text-sm text-slate-300">
                  {getLocalizedText('description')}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="p-1 h-8 w-8"
            >
              {isExpanded ? '▼' : '▶'}
            </Button>
          </div>
        </div>

        {/* 展开的详细信息 */}
        {isExpanded && (
          <div className="p-4 space-y-3">
            {/* 响应时间 */}
            {responseTime !== null && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  {language === 'zh' ? '响应时间' : 'Response Time'}:
                </span>
                <span className={cn(
                  responseTime < 100 ? 'text-green-400' :
                  responseTime < 500 ? 'text-yellow-400' : 'text-red-400'
                )}>
                  {responseTime}ms
                </span>
              </div>
            )}

            {/* 最后检查时间 */}
            {lastCheck && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  {language === 'zh' ? '最后检查' : 'Last Check'}:
                </span>
                <span className="text-slate-300">
                  {lastCheck.toLocaleString()}
                </span>
              </div>
            )}

            {/* 错误计数 */}
            {errorCount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  {language === 'zh' ? '错误次数' : 'Error Count'}:
                </span>
                <span className="text-red-400">
                  {errorCount}
                </span>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex space-x-2 pt-2 border-t border-slate-700/50">
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualRefresh}
                disabled={status === 'checking'}
                className="flex-1"
              >
                {status === 'checking' ? '🔄' : '🔄'} 
                {language === 'zh' ? '刷新' : 'Refresh'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('/status', '_blank')}
                className="flex-1"
              >
                📊 {language === 'zh' ? '详情' : 'Details'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
