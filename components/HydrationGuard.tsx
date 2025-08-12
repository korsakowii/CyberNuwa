'use client'

import { useState, useEffect, ReactNode } from 'react'

interface HydrationGuardProps {
  children: ReactNode
  fallback?: ReactNode
  waitFor?: boolean
}

/**
 * HydrationGuard 组件用于防止服务器端渲染和客户端水合不匹配
 * 
 * @param children - 需要保护的内容
 * @param fallback - 水合完成前显示的备用内容
 * @param waitFor - 额外的等待条件
 */
export default function HydrationGuard({ 
  children, 
  fallback = null,
  waitFor = true 
}: HydrationGuardProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // 如果还没有水合完成，显示备用内容
  if (!isHydrated) {
    return <>{fallback}</>
  }

  // 如果水合完成但等待条件不满足，也显示备用内容
  if (!waitFor) {
    return <>{fallback}</>
  }

  // 水合完成且等待条件满足，显示实际内容
  return <>{children}</>
}

/**
 * 使用水合状态的Hook
 * @returns 是否已完成水合
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}
