'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from './TranslationProvider'

interface WishCardProps {
  wish: {
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
  index: number
  t: any // 翻译对象
}

export function WishCard({ wish, index, t }: WishCardProps) {
  const { language, setLanguage } = useLanguage()
  const { isTranslating } = useTranslation()

  // 获取状态颜色
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

  // 获取状态文本
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

  // 切换语言
  const handleToggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh'
    setLanguage(newLang)
  }

  return (
    <div 
      className="relative group"
      style={{
        animationDelay: `${index * 0.2}s`,
        animation: 'float 6s ease-in-out infinite'
      }}
    >
      {/* 卡片光晕效果 */}
      <div className="absolute -inset-1 bg-gradient-to-r from-slate-400/30 via-purple-400/30 to-indigo-400/30 rounded-xl blur opacity-10 group-hover:opacity-40 transition duration-1000"></div>
      
      {/* 浮动粒子效果 */}
      <div className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-300/60 rounded-full opacity-15" style={{ animation: 'gentle-ping 8s ease-in-out infinite', animationDelay: `${index * 0.8}s` }}></div>
      <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-300/60 rounded-full opacity-15" style={{ animation: 'gentle-pulse 10s ease-in-out infinite', animationDelay: `${index * 1.2}s` }}></div>
      
      <div className="relative bg-black/25 backdrop-blur-sm rounded-xl border border-slate-400/20 hover:border-purple-300/30 transition-all duration-500 p-6 transform hover:scale-105 hover:rotate-1 shadow-md">
        {/* 标题和状态 */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-cyan-100 transition-colors">
            {wish.title[language]}
          </h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(wish.status)} ml-2 flex-shrink-0 shadow-lg`}>
            {getStatusText(wish.status)}
          </span>
        </div>
        
        {/* 作者和时间 */}
        <div className="text-sm text-gray-400 mb-4 flex items-center">
          <span className="mr-2">👤</span>
          {t.author}: {wish.author[language]} • {t.time}: {wish.createdAt}
        </div>
        
        {/* 描述 */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors">
          {wish.description[language]}
        </p>
        
        {/* 标签 */}
        {wish.tags[language].length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {wish.tags[language].map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-400/12 text-slate-100 border border-slate-300/20 hover:bg-slate-400/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* 统计信息 */}
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
          <span className="flex items-center hover:text-red-400 transition-colors">
            <span className="text-red-400 mr-1">❤️</span>
            {wish.likes} {t.likes}
          </span>
          <span className="flex items-center hover:text-blue-400 transition-colors">
            <span className="text-blue-400 mr-1">💬</span>
            {wish.comments} {t.comments}
          </span>
          <span className="flex items-center hover:text-purple-400 transition-colors">
            <span className="text-purple-400 mr-1">👁️</span>
            {wish.views} {t.views}
          </span>
        </div>
        

        
        {/* 操作按钮 */}
        <button className="w-full text-center bg-gradient-to-r from-slate-400/10 via-purple-400/10 to-indigo-400/10 text-slate-100 hover:text-white font-medium text-sm py-2 rounded-lg border border-slate-400/15 hover:border-purple-300/30 hover:bg-gradient-to-r hover:from-slate-400/18 hover:via-purple-400/18 hover:to-indigo-400/18 transition-all duration-300 transform hover:scale-105">
          ✨ {t.supportWish}
        </button>
      </div>
    </div>
  )
} 