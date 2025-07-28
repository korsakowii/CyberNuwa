'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '../../locales/translations'

export default function Wishes() {
  const { language } = useLanguage()
  const t = translations[language].wishes

  const [wishes, setWishes] = useState([
    {
      id: 1,
      title: { zh: 'AI 诗歌创作助手', en: 'AI Poetry Assistant' },
      description: {
        zh: '一个能够根据用户情感和主题创作个性化诗歌的智能体，支持多种诗歌形式和风格。',
        en: 'An agent that creates personalized poems based on user emotions and themes, supporting various forms and styles.'
      },
      author: { zh: '诗人小A', en: 'Poet A' },
      status: 'idea',
      likes: 23,
      comments: 8,
      views: 1567,
      tags: {
        zh: ['AI', '诗歌', '创作', '情感'],
        en: ['AI', 'Poetry', 'Creation', 'Emotion']
      },
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: { zh: '代码重构专家', en: 'Code Refactoring Expert' },
      description: {
        zh: '自动分析代码结构，提供重构建议，帮助提升代码质量和可维护性。',
        en: 'Automatically analyzes code structure and provides refactoring suggestions to improve code quality and maintainability.'
      },
      author: { zh: '程序员B', en: 'Programmer B' },
      status: 'in-progress',
      likes: 45,
      comments: 12,
      views: 2341,
      tags: {
        zh: ['编程', '重构', '代码质量'],
        en: ['Programming', 'Refactoring', 'Code Quality']
      },
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      title: { zh: '多语言翻译助手', en: 'Multilingual Translation Assistant' },
      description: {
        zh: '支持实时语音翻译和文档翻译，保持原文风格和语气的智能翻译工具。',
        en: 'Supports real-time speech and document translation, preserving the original style and tone.'
      },
      author: { zh: '语言学家C', en: 'Linguist C' },
      status: 'idea',
      likes: 67,
      comments: 15,
      views: 1892,
      tags: {
        zh: ['翻译', '多语言', '语音'],
        en: ['Translation', 'Multilingual', 'Speech']
      },
      createdAt: '2024-01-08'
    },
    {
      id: 4,
      title: { zh: '创意设计生成器', en: 'Creative Design Generator' },
      description: {
        zh: '根据用户需求自动生成 Logo、海报、UI 设计等创意作品的智能体。',
        en: 'Automatically generates creative works such as logos, posters, and UI designs based on user needs.'
      },
      author: { zh: '设计师D', en: 'Designer D' },
      status: 'completed',
      likes: 89,
      comments: 23,
      views: 3124,
      tags: {
        zh: ['设计', '创意', '视觉'],
        en: ['Design', 'Creativity', 'Visual']
      },
      createdAt: '2024-01-05'
    }
  ])

  // 新建愿望的默认值为中英文结构
  const [newWish, setNewWish] = useState({
    title: { zh: '', en: '' },
    description: { zh: '', en: '' },
    tags: { zh: '', en: '' }
  })

  const [showForm, setShowForm] = useState(false)

  // 表单输入处理，按当前 language 写入
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewWish(prev => ({
      ...prev,
      [name as 'title' | 'description' | 'tags']: {
        ...prev[name as 'title' | 'description' | 'tags'],
        [language]: value
      }
    }))
  }

  // 提交时生成中英文结构的 wish
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const wish = {
      id: wishes.length + 1,
      title: { ...newWish.title },
      description: { ...newWish.description },
      author: { zh: '匿名用户', en: 'Anonymous' },
      status: 'idea',
      likes: 0,
      comments: 0,
      views: 1,
      tags: {
        zh: newWish.tags.zh.split(',').map(tag => tag.trim()).filter(Boolean),
        en: newWish.tags.en.split(',').map(tag => tag.trim()).filter(Boolean)
      },
      createdAt: new Date().toISOString().split('T')[0]
    }
    setWishes([wish, ...wishes])
    setNewWish({ title: { zh: '', en: '' }, description: { zh: '', en: '' }, tags: { zh: '', en: '' } })
    setShowForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'text-blue-400 bg-blue-400/10'
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10'
      case 'completed': return 'text-green-400 bg-green-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'idea': return t.status.idea
      case 'in-progress': return t.status['in-progress']
      case 'completed': return t.status.completed
      default: return t.status.unknown
    }
  }

  return (
    <div className="bg-zinc-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block">
            {t.backHome}
          </Link>
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-zinc-400 mb-6">{t.subtitle}</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {t.addWish}
          </button>
        </div>

        {/* 许愿表单 */}
        {showForm && (
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {language === 'zh' ? '许下你的愿望' : 'Make Your Wish'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-2">
                  {language === 'zh' ? '愿望标题 *' : 'Wish Title *'}
                </label>
                <input
                  type="text"
                  id="title"
                  value={newWish.title[language]}
                  onChange={handleChange}
                  name="title"
                  required
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-zinc-400"
                  placeholder={language === 'zh' ? '给你的愿望起个名字...' : 'Give your wish a name...'}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
                  {language === 'zh' ? '愿望描述 *' : 'Wish Description *'}
                </label>
                <textarea
                  id="description"
                  value={newWish.description[language]}
                  onChange={handleChange}
                  name="description"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder={language === 'zh' ? '详细描述你的愿望，让其他人理解你的想法...' : 'Describe your wish in detail so others can understand your idea...'}
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-zinc-300 mb-2">
                  {language === 'zh' ? '标签' : 'Tags'}
                </label>
                <input
                  type="text"
                  id="tags"
                  value={newWish.tags[language]}
                  onChange={handleChange}
                  name="tags"
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-zinc-400"
                  placeholder={language === 'zh' ? '用逗号分隔，如：AI, 创意, 工具' : 'Separate with commas, e.g.: AI, Creativity, Tools'}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {language === 'zh' ? '许愿' : 'Make Wish'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {language === 'zh' ? '取消' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 愿望列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/70 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* 愿望头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{wish.title[language]}</h3>
                  <div className="flex items-center space-x-2 text-sm text-zinc-400">
                    <span>{language === 'zh' ? '作者：' : 'by '}{wish.author[language]}</span>
                    <span>•</span>
                    <span>{wish.createdAt}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(wish.status)}`}>
                  {t.status[wish.status as keyof typeof t.status]}
                </span>
              </div>

              {/* 愿望描述 */}
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                {wish.description[language]}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {wish.tags[language].map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-zinc-700/50 text-zinc-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 互动数据 */}
              <div className="flex items-center justify-between text-sm text-zinc-400">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 hover:text-pink-400 transition-colors">
                    <span>❤️</span>
                    <span>{wish.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                    <span>💬</span>
                    <span>{wish.comments}</span>
                  </button>
                  <span className="flex items-center space-x-1">
                    <span role="img" aria-label="views">👀</span>
                    <span>{wish.views?.toLocaleString() || 0}</span>
                  </span>
                </div>
                <button className="text-pink-400 hover:text-pink-300 transition-colors">
                  {t.supportWish}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {wishes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">
              {language === 'zh' ? '许愿池还是空的' : 'Wish Pool is Empty'}
            </h3>
            <p className="text-zinc-400 mb-6">
              {language === 'zh' ? '成为第一个许愿的人吧！' : 'Be the first to make a wish!'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              {language === 'zh' ? '许下第一个愿望' : 'Make the First Wish'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 