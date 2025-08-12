'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../locales/translations'
import { wishesApi, Wish as ApiWish } from '../../utils/api'
import { WishCard } from '../../components/WishCard'
import HydrationGuard from '../../components/HydrationGuard'

// 定义愿望类型（UI专用）
interface Wish {
  id: number
  title: { zh: string; en: string }
  description: { zh: string; en: string }
  author: { zh: string; en: string }
  status: 'idea' | 'in-progress' | 'completed' | 'pending' | 'processing'
  likes: number
  comments: number
  views: number
  tags: { zh: string[]; en: string[] }
  createdAt: string
}

export default function Wishes() {
  const { language, isInitialized } = useLanguage()
  const router = useRouter()
  const t = translations[language].wishes

  const [wishes, setWishes] = useState<Wish[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // 获取愿望数据
  const fetchWishes = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      const response = await wishesApi.getWishes(1, 50)
      
      if (response.data && response.data.items && response.data.items.length > 0) {
        const apiWishes = response.data.items.map((item: ApiWish) => {
          // 处理作者信息
          let authorName = item.user_id || '用户'
          if (item.anonymous) {
            authorName = language === 'zh' ? '匿名许愿者' : 'Anonymous Wisher'
          } else if (item.author_name) {
            authorName = item.author_name
          } else if (item.user_id === 'anonymous_user') {
            authorName = language === 'zh' ? '匿名用户' : 'Anonymous'
          } else if (item.user_id && item.user_id !== 'anonymous_user') {
            authorName = item.user_id
          }
          
          // 获取标题和描述
          const title = item.title || '愿望'
          const description = item.description || ''
          
          // 处理标签
          const tags = item.tags || []
          
          return {
            id: item.id,
            title: { zh: title, en: title },
            description: { zh: description, en: description },
            author: { zh: authorName, en: authorName },
            status: (item.status || 'idea') as 'idea' | 'in-progress' | 'completed' | 'pending' | 'processing',
            likes: 0,
            comments: 0,
            views: 0,
            tags: { zh: tags, en: tags },
            createdAt: item.created_at ? item.created_at.split('T')[0] : new Date().toISOString().split('T')[0]
          } as Wish
        })
        
        setWishes(apiWishes)
      } else {
        setWishes([])
      }
    } catch (err) {
      console.error('获取愿望失败:', err)
      setError(err instanceof Error ? err.message : '获取愿望失败')
      setWishes([])
    } finally {
      setIsLoading(false)
    }
  }

  // 组件加载时获取数据
  useEffect(() => {
    fetchWishes()
  }, [])

  // 处理添加愿望
  const handleAddWish = () => {
    router.push('/wishes/add')
  }

  // 处理返回首页
  const handleBackHome = () => {
    router.push('/')
  }

  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto"></div>
          <p className="mt-4 text-zinc-300">{t.loading}</p>
        </div>
      </div>
    )
  }

  // 错误状态
  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">{t.loadingFailed}</h2>
          <p className="text-zinc-300 mb-4">{error}</p>
          <button 
            onClick={fetchWishes}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            {t.retry}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden">
      {/* 梦幻背景效果 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 星空背景 */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        {/* 浮动光点 */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-300/60 rounded-full animate-pulse opacity-15"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-300/60 rounded-full animate-ping opacity-15"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-bounce opacity-15"></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-cyan-300/60 rounded-full animate-pulse opacity-15"></div>
        <div className="absolute top-32 left-2/3 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-ping opacity-15"></div>

        {/* 宇宙能量流 - 对称分布 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent opacity-8 animate-pulse"></div>
          <div 
            className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-8 animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="mb-4">
            <button
              onClick={handleBackHome}
              className="text-zinc-400 hover:text-white transition-colors underline"
            >
              {t.backHome}
            </button>
          </div>
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-zinc-400 mb-6">{t.subtitle}</p>
          <button
            onClick={handleAddWish}
            className="bg-gradient-to-r from-purple-400/70 via-purple-500/70 to-indigo-500/70 text-white px-8 py-4 rounded-full font-medium hover:from-purple-400/80 hover:via-purple-500/80 hover:to-indigo-500/80 transition-all transform hover:scale-105 shadow-md hover:shadow-purple-400/25"
          >
            ✨ {t.dropWish}
          </button>
        </div>

        {/* 愿望数量 */}
        <div className="mb-6 text-center">
          <p className="text-zinc-400">
            {language === 'zh' ? `${t.currentDisplay} ${wishes.length} ${t.wishes}` : `${t.currentDisplay} ${wishes.length} ${t.wishes}`}
          </p>
        </div>
        
        {/* 空状态 */}
        {wishes.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              {language === 'zh' ? '还没有愿望' : 'No wishes yet'}
            </h3>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              {language === 'zh' 
                ? '成为第一个许愿的人吧！分享你的想法，让社区一起实现愿望。' 
                : 'Be the first to make a wish! Share your ideas and let the community realize them together.'
              }
            </p>
            <button
              onClick={handleAddWish}
              className="bg-gradient-to-r from-purple-400/70 via-purple-500/70 to-indigo-500/70 text-white px-6 py-3 rounded-full font-medium hover:from-purple-400/80 hover:via-purple-500/80 hover:to-indigo-500/80 transition-all transform hover:scale-105 shadow-md hover:shadow-purple-400/25"
            >
              ✨ {t.dropWish}
            </button>
          </div>
        )}
        
        {/* 愿望卡片网格 */}
        {wishes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishes.map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
                index={0}
                onLike={(wishId) => console.log('Like wish:', wishId)}
                onComment={(wishId) => console.log('Comment on wish:', wishId)}
                onView={(wishId) => console.log('View wish:', wishId)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* 简单Footer */}
      <footer className="relative z-10 mt-20 py-8 border-t border-zinc-700/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-zinc-400 text-sm">
            © 2025 Cyber Nüwa.{' '}
            {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </div>
          <div className="text-zinc-500 text-xs mt-2">
            {language === 'zh'
              ? 'AI智能体共创平台'
              : 'AI Agent Co-Creation Platform'}
          </div>
        </div>
      </footer>
    </div>
  )
}
