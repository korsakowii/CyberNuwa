'use client'

import React from 'react'

interface DevOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function DevOnly({ children, fallback }: DevOnlyProps) {
  // 只在开发环境中显示内容
  if (process.env.NODE_ENV === 'production') {
    return fallback || (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">页面不可用</h1>
          <p className="text-zinc-400">此页面仅在开发环境中可用。</p>
          <div className="mt-4">
            <a 
              href="/" 
              className="text-blue-400 hover:text-blue-300 underline"
            >
              返回首页
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// 开发环境检查Hook
export function useDevOnly() {
  const isDev = process.env.NODE_ENV === 'development'
  
  const devOnly = (callback: () => void) => {
    if (isDev) {
      callback()
    }
  }
  
  return { isDev, devOnly }
} 