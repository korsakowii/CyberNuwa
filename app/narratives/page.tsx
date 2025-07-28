'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '../../locales/translations'

export default function Narratives() {
  const { language } = useLanguage()
  const t = translations[language].narratives

  const narratives = [
    {
      id: 1,
      type: 'community',
      title: { zh: '平台启动记', en: 'Platform Launch Story' },
      author: { zh: '管理员', en: 'Admin' },
      content: {
        zh: '2024年1月，Cyber Nüwa 平台正式上线，开启了人机共创的新纪元。',
        en: 'In January 2024, the Cyber Nüwa platform officially launched, ushering in a new era of human-AI co-creation.'
      },
      tags: {
        zh: ['平台', '历史'],
        en: ['Platform', 'History']
      },
      date: '2024-01-01',
      likes: 12,
      readTime: 3,
      comments: 2
    },
    {
      id: 2,
      type: 'agent-biography',
      title: { zh: '首个智能体诞生', en: 'First Agent Born' },
      author: { zh: 'Alice', en: 'Alice' },
      content: {
        zh: '创意助手成为平台上第一个被训练成功的智能体，帮助用户激发灵感。',
        en: 'Creative Assistant became the first successfully trained agent on the platform, helping users spark inspiration.'
      },
      tags: {
        zh: ['智能体', '创意'],
        en: ['Agent', 'Creativity']
      },
      date: '2024-01-10',
      likes: 8,
      readTime: 2,
      comments: 0
    },
    {
      id: 3,
      type: 'community',
      title: { zh: '社区共创高峰', en: 'Community Co-Creation Peak' },
      author: { zh: 'Bob', en: 'Bob' },
      content: {
        zh: '数百名用户参与任务与智能体训练，社区活跃度创新高。',
        en: 'Hundreds of users participated in tasks and agent training, reaching new heights of community engagement.'
      },
      tags: {
        zh: ['社区', '协作'],
        en: ['Community', 'Collaboration']
      },
      date: '2024-02-01',
      likes: 5,
      readTime: 4,
      comments: 5
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'community': return 'text-blue-400 bg-blue-400/10'
      case 'agent-biography': return 'text-green-400 bg-green-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'community': return '社区历史'
      case 'agent-biography': return '智能体传记'
      default: return '其他'
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{narratives.length}</div>
            <div className="text-zinc-400">{t.total}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">
              {narratives.filter(n => n.type === 'agent-biography').length}
            </div>
            <div className="text-zinc-400">{t.agentBiographies}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {narratives.filter(n => n.type === 'community').length}
            </div>
            <div className="text-zinc-400">{t.communityHistory}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {narratives.reduce((acc, n) => acc + (n.likes || 0), 0)}
            </div>
            <div className="text-zinc-400">{t.totalLikes}</div>
          </div>
        </div>

        {/* Narratives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {narratives.map((narrative) => (
            <div
              key={narrative.id}
              className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/70 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Narrative Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{narrative.title[language]}</h3>
                  <div className="flex items-center space-x-2 text-sm text-zinc-400">
                    <span>by {narrative.author[language]}</span>
                    <span>•</span>
                    <span>{narrative.date}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(narrative.type)}`}>
                  {narrative.type === 'community' ? t.communityHistory : t.agentBiographies}
                </span>
              </div>

              {/* Content Preview */}
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed line-clamp-3">
                {narrative.content[language]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {narrative.tags?.[language]?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-zinc-700/50 text-zinc-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-zinc-400">
                <div className="flex items-center space-x-4">
                  <span>⏱️ {narrative.readTime}</span>
                  <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                    <span>❤️</span>
                    <span>{narrative.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                    <span>💬</span>
                    <span>{narrative.comments}</span>
                  </button>
                </div>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  {t.readMore}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline View */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">{t.timelineTitle}</h2>
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
            <div className="space-y-6">
              {narratives.slice(0, 4).map((narrative, index) => (
                <div key={narrative.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full ${narrative.type === 'community' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                    {index < 3 && (
                      <div className={`w-0.5 h-12 mx-auto mt-2 ${narrative.type === 'community' ? 'bg-blue-400/30' : 'bg-green-400/30'}`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-zinc-300">{narrative.title[language]}</span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${narrative.type === 'community' ? 'bg-blue-900 text-blue-300' : 'bg-green-900 text-green-300'} mr-2`}
                      >
                        {narrative.type === 'community' ? t.communityHistory : t.agentBiographies}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">{narrative.date}</p>
                    <p className="text-sm text-zinc-300 mt-2 line-clamp-2">{narrative.content[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">{t.shareStory}</h3>
            <p className="text-zinc-400 mb-6">
              {t.shareDesc1}<br />{t.shareDesc2}
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              {t.shareButton}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
} 