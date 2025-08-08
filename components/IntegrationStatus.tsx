'use client'

import { useState, useEffect } from 'react'
import { healthApi } from '../utils/api'

interface ServiceStatus {
  name: string
  url: string
  status: 'online' | 'offline' | 'checking'
  responseTime?: number
  lastChecked: Date
}

export default function IntegrationStatus() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: '前端服务',
      url: 'http://localhost:3000',
      status: 'checking',
      lastChecked: new Date()
    },
    {
      name: '后端API',
      url: 'http://localhost:8000',
      status: 'checking',
      lastChecked: new Date()
    }
  ])

  const [isExpanded, setIsExpanded] = useState(false)

  const checkService = async (service: ServiceStatus): Promise<ServiceStatus> => {
    const startTime = Date.now()
    
    try {
      if (service.name === '前端服务') {
        // 检查前端服务
        const response = await fetch(service.url, { 
          method: 'HEAD',
          mode: 'no-cors' // 避免CORS问题
        })
        return {
          ...service,
          status: 'online',
          responseTime: Date.now() - startTime,
          lastChecked: new Date()
        }
      } else if (service.name === '后端API') {
        // 检查后端API
        const response = await healthApi.check()
        return {
          ...service,
          status: 'online',
          responseTime: Date.now() - startTime,
          lastChecked: new Date()
        }
      }
    } catch (error) {
      return {
        ...service,
        status: 'offline',
        lastChecked: new Date()
      }
    }
    
    return {
      ...service,
      status: 'offline',
      lastChecked: new Date()
    }
  }

  const checkAllServices = async () => {
    const updatedServices = await Promise.all(
      services.map(service => checkService(service))
    )
    setServices(updatedServices)
  }

  useEffect(() => {
    checkAllServices()
    
    // 每30秒检查一次服务状态
    const interval = setInterval(checkAllServices, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return '🟢'
      case 'offline':
        return '🔴'
      case 'checking':
        return '🟡'
      default:
        return '⚪'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-400'
      case 'offline':
        return 'text-red-400'
      case 'checking':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const allOnline = services.every(service => service.status === 'online')
  const anyOffline = services.some(service => service.status === 'offline')

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-zinc-800/90 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg">
        {/* 状态栏 */}
        <div 
          className="px-4 py-2 cursor-pointer hover:bg-zinc-700/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">集成状态</span>
            <span className={getStatusColor(allOnline ? 'online' : anyOffline ? 'offline' : 'checking')}>
              {getStatusIcon(allOnline ? 'online' : anyOffline ? 'offline' : 'checking')}
            </span>
            <span className="text-xs text-zinc-400">
              {services.filter(s => s.status === 'online').length}/{services.length}
            </span>
          </div>
        </div>

        {/* 详细状态 */}
        {isExpanded && (
          <div className="border-t border-zinc-700 px-4 py-3 space-y-2">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={getStatusColor(service.status)}>
                    {getStatusIcon(service.status)}
                  </span>
                  <span className="text-sm text-white">{service.name}</span>
                </div>
                <div className="text-xs text-zinc-400">
                  {service.responseTime && (
                    <span className="mr-2">{service.responseTime}ms</span>
                  )}
                  {service.lastChecked.toLocaleTimeString()}
                </div>
              </div>
            ))}
            
            <div className="pt-2 border-t border-zinc-700">
              <button
                onClick={checkAllServices}
                className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded transition-colors"
              >
                刷新状态
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 