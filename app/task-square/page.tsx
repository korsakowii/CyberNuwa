'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '../../locales/translations'

function formatExperience(experience: string, language: string) {
  // experience like '6000-8000 XP' or '2500 XP'
  const match = experience.match(/(\d+)(-(\d+))?XP?/)
  if (!match) return experience
  const min = parseInt(match[1], 10)
  const max = match[3] ? parseInt(match[3], 10) : undefined
  if (language === 'en') {
    return max ? `${min}-${max} XP` : `${min} XP`
  }
  return max ? `${min}-${max} 经验值` : `${min} 经验值`
}

export default function TaskSquare() {
  const { language } = useLanguage()
  const t = translations[language].taskSquare
  // 模拟任务数据
  const tasks = [
    {
      id: 1,
      title: { zh: 'AI 写作助手开发', en: 'AI Writing Assistant Development' },
      description: {
        zh: '开发一个能够辅助用户写作、润色和生成内容的智能体。',
        en: 'Develop an agent that assists users in writing, polishing, and generating content.'
      },
      creator: { zh: 'Alice', en: 'Alice' },
      status: 'in-progress',
      tags: {
        zh: ['AI', '写作', '内容生成'],
        en: ['AI', 'Writing', 'Content Generation']
      },
      progress: 60,
      participants: 12,
      priority: 'high',
      deadline: '2024-07-01',
      assignee: 'Alice',
      reward: '6000-8000 XP',
      views: 1247
    },
    {
      id: 2,
      title: { zh: '多语言翻译工具', en: 'Multilingual Translation Tool' },
      description: {
        zh: '构建一个支持多语言实时翻译的智能体，适用于文本和语音。',
        en: 'Build an agent that supports real-time multilingual translation for text and speech.'
      },
      creator: { zh: 'Bob', en: 'Bob' },
      status: 'completed',
      tags: {
        zh: ['翻译', '多语言', '语音'],
        en: ['Translation', 'Multilingual', 'Speech']
      },
      progress: 100,
      participants: 8,
      priority: 'medium',
      deadline: '2024-06-15',
      assignee: 'Bob',
      reward: '4000-6000 XP',
      views: 892
    },
    {
      id: 3,
      title: { zh: '智能体协作平台优化', en: 'Agent Collaboration Platform Optimization' },
      description: {
        zh: '优化平台性能，提升多智能体协作效率和用户体验。',
        en: 'Optimize platform performance to improve multi-agent collaboration efficiency and user experience.'
      },
      creator: { zh: 'Charlie', en: 'Charlie' },
      status: 'pending',
      tags: {
        zh: ['平台', '协作', '优化'],
        en: ['Platform', 'Collaboration', 'Optimization']
      },
      progress: 0,
      participants: 5,
      priority: 'low',
      deadline: '2024-08-01',
      assignee: 'Charlie',
      reward: '2500-3500 XP',
      views: 567
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-400/10'
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10'
      case 'completed': return 'text-green-400 bg-green-400/10'
      case 'closed': return 'text-gray-400 bg-gray-400/10'
      case 'pending': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return '招募中'
      case 'in-progress': return '进行中'
      case 'completed': return '已完成'
      case 'closed': return '已关闭'
      default: return '未知'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '高优先级'
      case 'medium': return '中优先级'
      case 'low': return '低优先级'
      default: return '未知'
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
          <Link
            href="/launch-mission"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {t.addTask}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{tasks.length}</div>
            <div className="text-zinc-400">{t.totalTasks}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-zinc-400">{t.inProgress}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-zinc-400">{t.completed}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {tasks.reduce((acc, task) => acc + task.participants, 0)}
            </div>
            <div className="text-zinc-400">{t.participants}</div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="space-y-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/70 hover:border-zinc-600 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* 任务信息 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold">{task.title[language]}</h3>
                    <div className="flex items-center space-x-2">
                      {/* 状态标签 */}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {t.status[task.status as keyof typeof t.status] || task.status}
                      </span>
                      {/* 优先级标签 */}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)} bg-zinc-700/50`}>
                        {t.priority ? t.priority[task.priority as keyof typeof t.priority] : task.priority}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                    {task.description[language]}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.tags[language].map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-zinc-700/50 text-zinc-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 进度条 */}
                  {task.status === 'in-progress' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">{t.progress}</span>
                        <span className="text-zinc-300">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* 任务元信息 */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                    <span>{t.deadline} {task.deadline}</span>
                    <span>{t.participants}: {task.participants}</span>
                    {task.assignee && <span>{t.assignee}: {task.assignee}</span>}
                    <span>{t.reward} {formatExperience(task.reward, language)}</span>
                    <span className="flex items-center gap-1">
                      <span role="img" aria-label="views">👀</span> 
                      {task.views?.toLocaleString() || 0} {language === 'zh' ? '围观' : 'Views'}
                    </span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col space-y-2 min-w-[120px]">
                  {task.status === 'open' ? (
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      {t.participants}
                    </button>
                  ) : task.status === 'in-progress' ? (
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      {t.viewProgress}
                    </button>
                  ) : (
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      {t.viewResult}
                    </button>
                  )}
                  <button className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    {t.details}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {tasks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold mb-2">{t.emptyTaskSquare}</h3>
            <p className="text-zinc-400 mb-6">{t.beFirst}</p>
            <Link
              href="/launch-mission"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              {t.launchFirstTask}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 