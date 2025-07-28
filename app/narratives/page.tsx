'use client'

import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Narratives() {
  const { language } = useLanguage()
  const narratives = [
    {
      id: 1,
      title: 'CyberNuwa 的诞生：从创意到现实',
      type: 'community',
      author: '创始人团队',
      content: '2024年初，一群充满激情的AI爱好者和创意工作者聚集在一起，讨论如何创建一个真正开放、协作的AI智能体平台。经过数月的构思和设计，CyberNuwa应运而生。',
      date: '2024-01-01',
      tags: ['社区历史', '创始故事'],
      readTime: '5分钟',
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      title: '智能体"创意助手"的成长历程',
      type: 'agent-biography',
      author: 'Alice',
      content: '从最初的简单提示词到现在的复杂行为模式，"创意助手"经历了无数次的训练和优化。它学会了理解用户的情感需求，能够提供个性化的创意建议。',
      date: '2024-01-10',
      tags: ['智能体传记', '训练记录'],
      readTime: '8分钟',
      likes: 156,
      comments: 23
    },
    {
      id: 3,
      title: '社区第一次大型协作项目回顾',
      type: 'community',
      author: '社区管理员',
      content: '在2024年1月，我们发起了第一个社区协作项目：开发多语言翻译工具。超过50名用户参与其中，从需求分析到最终部署，整个过程展现了社区协作的强大力量。',
      date: '2024-01-15',
      tags: ['协作项目', '社区成就'],
      readTime: '12分钟',
      likes: 189,
      comments: 67
    },
    {
      id: 4,
      title: '智能体"代码审查员"的技术突破',
      type: 'agent-biography',
      author: 'Bob',
      content: '通过引入先进的代码分析算法和机器学习模型，"代码审查员"在代码质量检测方面取得了重大突破，准确率提升至95%以上。',
      date: '2024-01-20',
      tags: ['技术突破', '智能体进化'],
      readTime: '10分钟',
      likes: 203,
      comments: 34
    },
    {
      id: 5,
      title: '用户角色系统的演进',
      type: 'community',
      author: '系统设计师',
      content: '从简单的用户等级到复杂的角色权限系统，我们不断优化用户体验，让每个参与者都能找到适合自己的位置和成长路径。',
      date: '2024-01-25',
      tags: ['系统设计', '用户体验'],
      readTime: '6分钟',
      likes: 98,
      comments: 15
    },
    {
      id: 6,
      title: '智能体"故事编织者"的文学之旅',
      type: 'agent-biography',
      author: 'Charlie',
      content: '从简单的故事生成到现在的复杂情节构建，"故事编织者"学会了理解人物动机、情节发展和文学技巧，创作出了许多令人印象深刻的作品。',
      date: '2024-01-30',
      tags: ['文学创作', '智能体发展'],
      readTime: '15分钟',
      likes: 267,
      comments: 89
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
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold mb-4">📖 元叙事广场</h1>
          <p className="text-zinc-400 mb-6">记录社区发展和 Agent 传记</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{narratives.length}</div>
            <div className="text-zinc-400">总叙事数</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">
              {narratives.filter(n => n.type === 'agent-biography').length}
            </div>
            <div className="text-zinc-400">智能体传记</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {narratives.filter(n => n.type === 'community').length}
            </div>
            <div className="text-zinc-400">社区历史</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {narratives.reduce((acc, n) => acc + n.likes, 0)}
            </div>
            <div className="text-zinc-400">总点赞数</div>
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
                  <h3 className="text-xl font-semibold mb-2">{narrative.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-zinc-400">
                    <span>by {narrative.author}</span>
                    <span>•</span>
                    <span>{narrative.date}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(narrative.type)}`}>
                  {getTypeText(narrative.type)}
                </span>
              </div>

              {/* Content Preview */}
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed line-clamp-3">
                {narrative.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {narrative.tags.map((tag, index) => (
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
                  阅读全文
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline View */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">社区发展时间线</h2>
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
                      <span className="text-sm font-medium text-zinc-300">{narrative.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(narrative.type)}`}>
                        {getTypeText(narrative.type)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">{narrative.date}</p>
                    <p className="text-sm text-zinc-300 mt-2 line-clamp-2">{narrative.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">分享你的故事</h3>
            <p className="text-zinc-400 mb-6">
              无论是社区贡献的经历，还是智能体训练的心得，<br/>
              都值得被记录和分享。让我们一起书写 CyberNuwa 的历史。
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              ✍️ 撰写叙事
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