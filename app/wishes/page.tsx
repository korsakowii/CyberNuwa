'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Wishes() {
  const [wishes, setWishes] = useState([
    {
      id: 1,
      title: 'AI 诗歌创作助手',
      description: '一个能够根据用户情感和主题创作个性化诗歌的智能体，支持多种诗歌形式和风格。',
      author: '诗人小A',
      status: 'idea',
      likes: 23,
      comments: 8,
      tags: ['AI', '诗歌', '创作', '情感'],
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: '代码重构专家',
      description: '自动分析代码结构，提供重构建议，帮助提升代码质量和可维护性。',
      author: '程序员B',
      status: 'in-progress',
      likes: 45,
      comments: 12,
      tags: ['编程', '重构', '代码质量'],
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      title: '多语言翻译助手',
      description: '支持实时语音翻译和文档翻译，保持原文风格和语气的智能翻译工具。',
      author: '语言学家C',
      status: 'idea',
      likes: 67,
      comments: 15,
      tags: ['翻译', '多语言', '语音'],
      createdAt: '2024-01-08'
    },
    {
      id: 4,
      title: '创意设计生成器',
      description: '根据用户需求自动生成 Logo、海报、UI 设计等创意作品的智能体。',
      author: '设计师D',
      status: 'completed',
      likes: 89,
      comments: 23,
      tags: ['设计', '创意', '视觉'],
      createdAt: '2024-01-05'
    }
  ])

  const [newWish, setNewWish] = useState({
    title: '',
    description: '',
    tags: ''
  })

  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const wish = {
      id: wishes.length + 1,
      ...newWish,
      author: '匿名用户',
      status: 'idea',
      likes: 0,
      comments: 0,
      tags: newWish.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString().split('T')[0]
    }
    setWishes([wish, ...wishes])
    setNewWish({ title: '', description: '', tags: '' })
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
      case 'idea': return '灵感'
      case 'in-progress': return '进行中'
      case 'completed': return '已完成'
      default: return '未知'
    }
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold mb-4">⭐ 许愿池</h1>
          <p className="text-zinc-400 mb-6">展示灵感碎片和半成品想法</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? '取消' : '✨ 许下愿望'}
          </button>
        </div>

        {/* 许愿表单 */}
        {showForm && (
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">许下你的愿望</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-2">
                  愿望标题 *
                </label>
                <input
                  type="text"
                  id="title"
                  value={newWish.title}
                  onChange={(e) => setNewWish({...newWish, title: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-zinc-400"
                  placeholder="给你的愿望起个名字..."
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
                  愿望描述 *
                </label>
                <textarea
                  id="description"
                  value={newWish.description}
                  onChange={(e) => setNewWish({...newWish, description: e.target.value})}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder="详细描述你的愿望，让其他人理解你的想法..."
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-zinc-300 mb-2">
                  标签
                </label>
                <input
                  type="text"
                  id="tags"
                  value={newWish.tags}
                  onChange={(e) => setNewWish({...newWish, tags: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-zinc-400"
                  placeholder="用逗号分隔，如：AI, 创意, 工具"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  许愿
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  取消
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
                  <h3 className="text-xl font-semibold mb-2">{wish.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-zinc-400">
                    <span>by {wish.author}</span>
                    <span>•</span>
                    <span>{wish.createdAt}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(wish.status)}`}>
                  {getStatusText(wish.status)}
                </span>
              </div>

              {/* 愿望描述 */}
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                {wish.description}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {wish.tags.map((tag, index) => (
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
                </div>
                <button className="text-pink-400 hover:text-pink-300 transition-colors">
                  支持这个愿望
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {wishes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">许愿池还是空的</h3>
            <p className="text-zinc-400 mb-6">成为第一个许愿的人吧！</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              许下第一个愿望
            </button>
          </div>
        )}
      </div>
    </main>
  )
} 