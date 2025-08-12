'use client';

import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

// 环境类型定义
export type EnvironmentType = 'development' | 'production' | 'staging' | 'testing';

// 开发环境配置接口
interface DevConfig {
  enabled: boolean;
  features: string[];
  debugMode: boolean;
  showDevTools: boolean;
}

// 组件属性接口
interface DevOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  feature?: string;
  environment?: EnvironmentType;
  showDevInfo?: boolean;
  className?: string;
  onDevModeChange?: (enabled: boolean) => void;
}

export function DevOnly({ 
  children, 
  fallback, 
  feature,
  environment = 'production',
  showDevInfo = false,
  className,
  onDevModeChange
}: DevOnlyProps) {
  const [isDev, setIsDev] = useState(false);
  const [devConfig, setDevConfig] = useState<DevConfig>({
    enabled: false,
    features: [],
    debugMode: false,
    showDevTools: false
  });

  // 检查开发环境
  useEffect(() => {
    const checkEnvironment = () => {
      const nodeEnv = process.env.NODE_ENV;
      const isDevelopment = nodeEnv === 'development' || 
                           process.env.NEXT_PUBLIC_DEV_MODE === 'true' ||
                           window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1';
      
      setIsDev(isDevelopment);
      onDevModeChange?.(isDevelopment);
      
      // 设置开发配置
      if (isDevelopment) {
        setDevConfig({
          enabled: true,
          features: ['debug', 'testing', 'development'],
          debugMode: true,
          showDevTools: true
        });
      }
    };

    checkEnvironment();
    
    // 监听环境变化
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        const devMode = localStorage.getItem('devMode') === 'true';
        if (devMode !== isDev) {
          setIsDev(devMode);
          onDevModeChange?.(devMode);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isDev, onDevModeChange]);

  // 切换开发模式
  const toggleDevMode = () => {
    const newDevMode = !isDev;
    setIsDev(newDevMode);
    onDevModeChange?.(newDevMode);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('devMode', newDevMode.toString());
    }
  };

  // 检查功能是否可用
  const isFeatureEnabled = (featureName?: string) => {
    if (!featureName) return isDev;
    return isDev && devConfig.features.includes(featureName);
  };

  // 如果不在开发环境且没有指定功能，显示 fallback
  if (!isFeatureEnabled(feature)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className={cn('min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex items-center justify-center p-4', className)}>
        <Card className="max-w-md w-full bg-zinc-800/80 border-zinc-700 backdrop-blur-sm">
          <div className="text-center p-8">
            {/* 图标 */}
            <div className="text-6xl mb-6 animate-pulse">
              🚫
            </div>

            {/* 标题 */}
            <h1 className="text-2xl font-bold mb-4">
              {environment === 'production' ? '页面不可用' : '功能受限'}
            </h1>

            {/* 描述 */}
            <p className="text-zinc-400 mb-6">
              {environment === 'production' 
                ? '此页面仅在开发环境中可用。'
                : '此功能在当前环境中不可用。'
              }
            </p>

            {/* 环境信息 */}
            <div className="mb-6">
              <Badge variant="outline" className="mb-2">
                {environment}
              </Badge>
              <p className="text-xs text-zinc-500">
                当前环境: {process.env.NODE_ENV || 'unknown'}
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="space-y-3">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full"
              >
                ← 返回上页
              </Button>
              
              <Button
                onClick={() => window.location.href = '/'}
                variant="primary"
                className="w-full"
              >
                🏠 返回首页
              </Button>

              {/* 开发模式切换（仅在本地环境） */}
              {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                <Button
                  onClick={toggleDevMode}
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                >
                  🔧 {isDev ? '关闭' : '开启'} 开发模式
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // 在开发环境中显示内容
  return (
    <div className={className}>
      {/* 开发信息横幅 */}
      {showDevInfo && isDev && (
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="warning" size="sm">
                🚧 DEV
              </Badge>
              <span className="text-sm text-yellow-300">
                开发模式已启用
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-yellow-400">
              <span>环境: {process.env.NODE_ENV}</span>
              {feature && <span>功能: {feature}</span>}
            </div>
          </div>
        </div>
      )}

      {/* 开发工具面板 */}
      {devConfig.showDevTools && isDev && (
        <div className="fixed top-4 left-4 z-50">
          <Card className="w-64 bg-zinc-800/90 backdrop-blur-sm border-zinc-700">
            <div className="p-3 border-b border-zinc-700/50">
              <h3 className="text-sm font-semibold text-white flex items-center">
                🛠️ 开发工具
                <Badge variant="warning" size="sm" className="ml-2">
                  DEV
                </Badge>
              </h3>
            </div>
            
            <div className="p-3 space-y-2">
              <div className="text-xs text-zinc-400">
                <div>环境: {process.env.NODE_ENV}</div>
                <div>功能: {devConfig.features.join(', ')}</div>
                <div>调试: {devConfig.debugMode ? '开启' : '关闭'}</div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDevConfig(prev => ({ ...prev, debugMode: !prev.debugMode }))}
                  className="flex-1 text-xs"
                >
                  {devConfig.debugMode ? '关闭' : '开启'} 调试
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDevConfig(prev => ({ ...prev, showDevTools: false }))}
                  className="text-xs"
                >
                  ✕
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 主要内容 */}
      {children}
    </div>
  );
}

// 开发环境检查 Hook
export function useDevOnly() {
  const [isDev, setIsDev] = useState(false);
  const [devConfig, setDevConfig] = useState<DevConfig>({
    enabled: false,
    features: [],
    debugMode: false,
    showDevTools: false
  });

  useEffect(() => {
    const checkEnvironment = () => {
      const nodeEnv = process.env.NODE_ENV;
      const isDevelopment = nodeEnv === 'development' || 
                           process.env.NEXT_PUBLIC_DEV_MODE === 'true' ||
                           (typeof window !== 'undefined' && (
                             window.location.hostname === 'localhost' ||
                             window.location.hostname === '127.0.0.1'
                           ));
      
      setIsDev(isDevelopment);
      
      if (isDevelopment) {
        setDevConfig({
          enabled: true,
          features: ['debug', 'testing', 'development'],
          debugMode: true,
          showDevTools: true
        });
      }
    };

    checkEnvironment();
  }, []);

  const devOnly = (callback: () => void) => {
    if (isDev) {
      callback();
    }
  };

  const toggleDevMode = () => {
    const newDevMode = !isDev;
    setIsDev(newDevMode);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('devMode', newDevMode.toString());
    }
  };

  return { 
    isDev, 
    devOnly, 
    devConfig, 
    toggleDevMode,
    setDevConfig 
  };
}

// 功能检查 Hook
export function useFeatureFlag(feature: string) {
  const { isDev, devConfig } = useDevOnly();
  
  const isEnabled = isDev && devConfig.features.includes(feature);
  
  const enableFeature = () => {
    if (isDev) {
      // 启用功能的逻辑
      console.log(`Feature ${feature} enabled`);
    }
  };
  
  const disableFeature = () => {
    if (isDev) {
      // 禁用功能的逻辑
      console.log(`Feature ${feature} disabled`);
    }
  };
  
  return { isEnabled, enableFeature, disableFeature };
}
