'use client'

import { useState } from 'react'
import { wishesApi } from '../../utils/api'
import { DevOnly } from '../../components/DevOnly'

function TestFormContent() {
  const [wishContent, setWishContent] = useState('')
  const [userId, setUserId] = useState('test_user_web')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setResult(null)

    try {
      console.log('🚀 提交愿望:', { content: wishContent, userId })
      
      const response = await wishesApi.submitWish(wishContent, userId)
      
      console.log('✅ 提交成功:', response)
      setResult(response)
      
      // 清空表单
      setWishContent('')
      
    } catch (err) {
      console.error('❌ 提交失败:', err)
      setError(err instanceof Error ? err.message : '提交失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🧪 愿望提交测试
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                用户ID
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入用户ID"
              />
            </div>
            
            <div>
              <label htmlFor="wishContent" className="block text-sm font-medium text-gray-700 mb-1">
                愿望内容
              </label>
              <textarea
                id="wishContent"
                value={wishContent}
                onChange={(e) => setWishContent(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入您的愿望..."
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !wishContent.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '提交中...' : '提交愿望'}
            </button>
          </form>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              ❌ 错误: {error}
            </div>
          )}
          
          {result && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              <div className="font-semibold">✅ 提交成功!</div>
              <div className="text-sm mt-1">
                愿望ID: {result.data?.id}<br/>
                状态: {result.data?.status}<br/>
                创建时间: {result.data?.created_at}
              </div>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <a 
              href="/wishes" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              查看所有愿望 →
            </a>
          </div>
        </div>
        
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            📋 测试说明
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. 填写愿望内容和用户ID</p>
            <p>2. 点击"提交愿望"按钮</p>
            <p>3. 观察提交结果</p>
            <p>4. 在终端查看实时数据库变化</p>
            <p>5. 访问 <a href="/wishes" className="text-blue-600 underline">愿望页面</a> 查看最新数据</p>
          </div>
        </div>
      </div>
    </div>
  )
} 

export default function TestForm() {
  return (
    <DevOnly>
      <TestFormContent />
    </DevOnly>
  )
}