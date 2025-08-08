'use client'

import { useState, useEffect } from 'react'
import { healthApi } from '../utils/api'

interface ApiStatusProps {
  language: 'zh' | 'en'
}

export default function ApiStatus({ language }: ApiStatusProps) {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  const checkApiStatus = async () => {
    try {
      setStatus('checking')
      await healthApi.check()
      setStatus('online')
      setLastCheck(new Date())
    } catch (error) {
      console.error('API health check failed:', error)
      setStatus('offline')
      setLastCheck(new Date())
    }
  }

  useEffect(() => {
    checkApiStatus()
    
    // 每30秒检查一次API状态
    const interval = setInterval(checkApiStatus, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'text-green-400'
      case 'offline': return 'text-red-400'
      case 'checking': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'online': return language === 'zh' ? 'API在线' : 'API Online'
      case 'offline': return language === 'zh' ? 'API离线' : 'API Offline'
      case 'checking': return language === 'zh' ? '检查中...' : 'Checking...'
      default: return language === 'zh' ? '未知状态' : 'Unknown'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return '🟢'
      case 'offline': return '🔴'
      case 'checking': return '🟡'
      default: return '⚪'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className={`flex items-center space-x-2 px-3 py-2 bg-black/60 backdrop-blur-sm border border-slate-600/30 rounded-lg text-sm ${getStatusColor()}`}
        title={language === 'zh' ? 'API服务器状态' : 'API Server Status'}
      >
        <span className="text-xs">{getStatusIcon()}</span>
        <span className="hidden sm:inline">{getStatusText()}</span>
        {lastCheck && (
          <span className="text-xs opacity-60">
            {lastCheck.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  )
} 