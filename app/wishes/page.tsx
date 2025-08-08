'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../locales/translations'
import { wishesApi, Wish as ApiWish } from '../../utils/api'
import ApiStatus from '../../components/ApiStatus'
import { TranslationControls } from '../../components/TranslationControls'
import { WishCard } from '../../components/WishCard'


// 添加浮动动画样式
const floatAnimation = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes gentle-pulse {
    0%, 100% { opacity: 0.06; transform: scale(1); }
    50% { opacity: 0.15; transform: scale(1.03); }
  }
  
  @keyframes gentle-ping {
    0%, 100% { opacity: 0.05; transform: scale(1); }
    50% { opacity: 0.12; transform: scale(1.05); }
  }
  
  @keyframes gentle-bounce {
    0%, 100% { opacity: 0.06; transform: translateY(0px); }
    50% { opacity: 0.15; transform: translateY(-3px); }
  }
`

// 定义愿望类型
interface Wish {
  id: number
  title: { zh: string; en: string }
  description: { zh: string; en: string }
  author: { zh: string; en: string }
  status: string
  likes: number
  comments: number
  views: number
  tags: { zh: string[]; en: string[] }
  createdAt: string
}

export default function Wishes() {
  const { language, setLanguage } = useLanguage()
  const router = useRouter()
  const t = translations[language].wishes

  // 默认愿望数据（当API不可用时使用）
  const defaultWishes = [
    {
      id: 1,
      title: { zh: '每天都能喝到完美的咖啡', en: 'Perfect Coffee Every Day' },
      description: {
        zh: '找到最适合的咖啡豆，每一天都从一杯完美的咖啡开始，甚至能预测明天想喝什么口味。',
        en: 'Find the perfect coffee beans to start every day with a perfect cup of coffee, and predict tomorrow\'s taste.'
      },
      author: { zh: '咖啡爱好者', en: 'Coffee Lover' },
      status: 'idea',
      likes: 23,
      comments: 8,
      views: 1567,
      tags: {
        zh: ['咖啡', '生活品质', '日常'],
        en: ['Coffee', 'Lifestyle', 'Daily']
      },
      createdAt: '2025-01-15'
    },
    {
      id: 2,
      title: { zh: '实时翻译日漫', en: 'Real-time Anime Translation' },
      description: {
        zh: '不用等字幕组，实时翻译喜欢的日漫，享受原汁原味的观看体验，顺便自动配音成我的声音。',
        en: 'No need to wait for subtitles, translate anime in real-time for authentic viewing experience, and auto-dub with my voice.'
      },
      author: { zh: '动漫迷', en: 'Anime Fan' },
      status: 'in-progress',
      likes: 45,
      comments: 12,
      views: 2341,
      tags: {
        zh: ['动漫', '翻译', '娱乐'],
        en: ['Anime', 'Translation', 'Entertainment']
      },
              createdAt: '2025-01-10'
    },
    {
      id: 3,
      title: { zh: '分析梦境含义', en: 'Dream Analysis' },
      description: {
        zh: '分析梦境，了解这些奇怪的梦到底是什么意思，探索潜意识世界，顺便预测今晚会做什么梦。',
        en: 'Analyze dreams and understand what these strange dreams mean, exploring the subconscious world, and predict tonight\'s dreams.'
      },
      author: { zh: '梦境探索者', en: 'Dream Explorer' },
      status: 'idea',
      likes: 67,
      comments: 15,
      views: 1892,
      tags: {
        zh: ['梦境', '心理学', '探索'],
        en: ['Dreams', 'Psychology', 'Exploration']
      },
              createdAt: '2025-01-08'
    },
    {
      id: 4,
      title: { zh: '多肉植物养护', en: 'Succulent Care' },
      description: {
        zh: '多肉植物不再死掉，知道什么时候浇水、施肥，茁壮成长，还能听懂植物说话。',
        en: 'Succulents won\'t die anymore, knowing when to water and fertilize for healthy growth, and understand plant language.'
      },
      author: { zh: '植物父母', en: 'Plant Parent' },
      status: 'idea',
      likes: 89,
      comments: 20,
      views: 3124,
      tags: {
        zh: ['植物', '养护', '生活'],
        en: ['Plants', 'Care', 'Lifestyle']
      },
              createdAt: '2025-01-05'
    }
  ]

  const [wishes, setWishes] = useState<Wish[]>(defaultWishes)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // 从后端获取愿望数据
  const fetchWishes = async () => {
    try {
      const response = await wishesApi.getWishes(1, 50) // 获取更多记录
      console.log('API响应:', response) // 调试信息
      if (response.data && response.data.items && response.data.items.length > 0) {
        // 转换API数据格式为前端格式
        const apiWishes = response.data.items.map((item: ApiWish) => {
          // 处理作者信息
          let authorName = item.user_id || '用户'
          if (item.user_id === 'anonymous_user') {
            authorName = language === 'zh' ? '匿名用户' : 'Anonymous'
          } else if (item.user_id && item.user_id !== 'anonymous_user') {
            // 如果是中文用户名，直接使用；如果是英文，保持原样
            authorName = item.user_id
          }
          
          return {
            id: item.id,
            title: { zh: item.content || '愿望', en: item.content || 'Wish' },
            description: { zh: item.content || '', en: item.content || '' },
            author: { zh: authorName, en: authorName },
            status: item.status,
            likes: 0,
            comments: 0,
            views: 0,
            tags: { zh: [], en: [] },
            createdAt: item.created_at ? item.created_at.split('T')[0] : new Date().toISOString().split('T')[0]
          }
        })
        console.log('转换后的愿望数据:', apiWishes) // 调试信息
        setWishes(apiWishes)
      } else {
        // 如果API没有数据，使用默认数据
        setWishes(defaultWishes)
      }
    } catch (err) {
      console.error('获取愿望失败:', err)
      setError(err instanceof Error ? err.message : '获取愿望失败')
      // API失败时使用默认数据
      console.log('使用默认愿望数据') // 调试信息
      setWishes(defaultWishes)
    } finally {
      setIsLoading(false)
    }
  }

  // 组件加载时获取数据
  useEffect(() => {
    // 尝试从API获取数据，失败时使用默认数据
    fetchWishes()
  }, [])

  // 监听页面可见性变化，当页面重新可见时刷新数据
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchWishes()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    // 处理表单变化
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 处理表单提交
  }

  const handleDropWish = () => {
    // 跳转到添加愿望页面
    window.location.href = '/wishes/add'
  }

  const handleBackToHome = (e: React.MouseEvent) => {
    // 返回主页
    e.preventDefault()
    e.stopPropagation()
    console.log('Back to Home clicked!')
    try {
      window.location.href = '/'
    } catch (error) {
      console.error('Navigation error:', error)
      window.open('/', '_self')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'bg-blue-500/70 text-white'
      case 'in-progress': return 'bg-yellow-500/70 text-white'
      case 'completed': return 'bg-green-500/70 text-white'
      case 'pending': return 'bg-blue-500/70 text-white'
      case 'processing': return 'bg-yellow-500/70 text-white'
      case null: return 'bg-gray-500/70 text-white'
      default: return 'bg-gray-500/70 text-white'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'idea': return t.status.idea
      case 'in-progress': return t.status['in-progress']
      case 'completed': return t.status.completed
      case 'pending': return t.status.idea
      case 'processing': return t.status['in-progress']
      case null: return t.status.unknown
      default: return t.status.unknown
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto"></div>
          <p className="mt-4 text-zinc-300">{language === 'zh' ? '加载中...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">{language === 'zh' ? '加载失败' : 'Loading Failed'}</h2>
          <p className="text-zinc-300 mb-4">{error}</p>
          <button 
            onClick={fetchWishes}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            {language === 'zh' ? '重试' : 'Retry'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{floatAnimation}</style>
      <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden">
      {/* 梦幻背景效果 */}
      <div className="absolute inset-0">
        {/* 星空背景 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* 浮动光点 - 进一步降低闪烁强度，增加不同步延迟 */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-300 rounded-full opacity-10" style={{ animation: 'gentle-pulse 10s ease-in-out infinite', animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-300 rounded-full opacity-8" style={{ animation: 'gentle-ping 13s ease-in-out infinite', animationDelay: '2.5s' }}></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-10" style={{ animation: 'gentle-bounce 11s ease-in-out infinite', animationDelay: '1.8s' }}></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-8" style={{ animation: 'gentle-pulse 15s ease-in-out infinite', animationDelay: '4.2s' }}></div>
        <div className="absolute top-32 left-2/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-10" style={{ animation: 'gentle-ping 14s ease-in-out infinite', animationDelay: '6.7s' }}></div>
        
        {/* 宇宙能量流 - 进一步降低闪烁强度，增加不同步延迟 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent opacity-4" style={{animation: 'gentle-pulse 12s ease-in-out infinite', animationDelay: '0s'}}></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-4" style={{animation: 'gentle-pulse 14s ease-in-out infinite', animationDelay: '4.5s'}}></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-4" style={{animation: 'gentle-pulse 13s ease-in-out infinite', animationDelay: '8.2s'}}></div>
        </div>
      </div>

      {/* 头部 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        
        <div className="text-center mb-12">
          <div className="mb-4">
            <a
              href="/"
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer z-50 relative underline"
            >
              {t.backHome}
            </a>
          </div>
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-zinc-400 mb-6">{t.subtitle}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleDropWish}
              className="bg-gradient-to-r from-purple-400/70 via-purple-500/70 to-indigo-500/70 text-white px-8 py-4 rounded-full font-medium hover:from-purple-400/80 hover:via-purple-500/80 hover:to-indigo-500/80 transition-all transform hover:scale-105 shadow-md hover:shadow-purple-400/25"
            >
              ✨ {t.dropWish}
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 愿望卡片网格 */}
        <div className="mb-6 text-center">
          <p className="text-zinc-400">
            {language === 'zh' ? `当前显示 ${wishes.length} 个愿望` : `Currently displaying ${wishes.length} wishes`}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishes.map((wish, index) => (
            <WishCard 
              key={wish.id}
              wish={wish}
              index={index}
              t={t}
            />
          ))}
        </div>
      </div>
      
      {/* 页脚 */}
      <footer className="relative z-10 mt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Cyber Nüwa. All rights reserved.
            </div>
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center space-x-2 px-3 py-2 bg-black/40 backdrop-blur-sm border border-cyan-400/25 rounded-lg hover:border-cyan-300/50 hover:bg-black/60 transition-all"
            >
              <span>{language === 'zh' ? '🇺🇸' : '🇨🇳'}</span>
              <span className="text-white">{language === 'zh' ? 'English' : '中文'}</span>
            </button>
          </div>
        </div>
      </footer>
      
      {/* 开发环境调试组件 */}
      {process.env.NODE_ENV === 'development' && (
        <>
          {/* API状态指示器 */}
          <ApiStatus language={language} />
          
          {/* 翻译控件 */}
          <TranslationControls />
          
          {/* 全局翻译状态指示器 */}
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-zinc-800/90 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg p-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-zinc-300">
                  {language === 'zh' ? '当前语言: 中文' : 'Current Language: English'}
                </span>
                <span className={`w-2 h-2 rounded-full ${language === 'zh' ? 'bg-green-400' : 'bg-blue-400'}`}></span>
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </>
  )
}
