'use client'

import { useState, useEffect } from 'react'
import { wishesApi } from '../../utils/api'
import { DevOnly } from '../../components/DevOnly'

function TestApiContent() {
  const [apiData, setApiData] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await wishesApi.getWishes(1, 10)
      setApiData(response)
      console.log('API测试成功:', response)
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
      console.error('API测试失败:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testApi()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">API 测试页面</h1>
      
      <button 
        onClick={testApi}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
      >
        {loading ? '测试中...' : '重新测试'}
      </button>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4">
          <h3 className="text-red-400 font-bold">错误:</h3>
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {apiData && (
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h3 className="text-green-400 font-bold">API响应:</h3>
          <pre className="text-green-300 text-sm overflow-auto">
            {JSON.stringify(apiData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default function TestApi() {
  return (
    <DevOnly>
      <TestApiContent />
    </DevOnly>
  )
} 