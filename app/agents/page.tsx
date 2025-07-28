'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '../../locales/translations'

export default function Agents() {
  const { language } = useLanguage()
  const t = translations[language].agents

  // 多语言模拟数据
  const agents = [
    {
      id: 1,
      name: { zh: '创意助手', en: 'Creative Assistant' },
      description: {
        zh: '专门帮助用户进行创意构思和头脑风暴的智能体',
        en: 'An agent dedicated to helping users brainstorm and generate creative ideas'
      },
      creator: { zh: 'Alice', en: 'Alice' },
      status: 'active',
      trainingProgress: 85,
      tags: {
        zh: ['创意', '头脑风暴', '协作'],
        en: ['Creativity', 'Brainstorming', 'Collaboration']
      },
      avatar: '🎨'
    },
    {
      id: 2,
      name: { zh: '代码审查员', en: 'Code Reviewer' },
      description: {
        zh: '自动审查代码质量，提供改进建议的智能体',
        en: 'An agent that automatically reviews code quality and provides improvement suggestions'
      },
      creator: { zh: 'Bob', en: 'Bob' },
      status: 'training',
      trainingProgress: 45,
      tags: {
        zh: ['编程', '代码审查', '质量保证'],
        en: ['Programming', 'Code Review', 'Quality Assurance']
      },
      avatar: '💻'
    },
    {
      id: 3,
      name: { zh: '故事编织者', en: 'Story Weaver' },
      description: {
        zh: '根据用户提供的情节元素，生成完整故事的智能体',
        en: 'An agent that generates complete stories based on user-provided plot elements'
      },
      creator: { zh: 'Charlie', en: 'Charlie' },
      status: 'active',
      trainingProgress: 92,
      tags: {
        zh: ['写作', '故事创作', '文学'],
        en: ['Writing', 'Storytelling', 'Literature']
      },
      avatar: '📚'
    },
    {
      id: 4,
      name: { zh: '数据分析师', en: 'Data Analyst' },
      description: {
        zh: '自动分析数据并生成可视化报告的智能体',
        en: 'An agent that automatically analyzes data and generates visual reports'
      },
      creator: { zh: 'Diana', en: 'Diana' },
      status: 'inactive',
      trainingProgress: 100,
      tags: {
        zh: ['数据分析', '可视化', '报告'],
        en: ['Data Analysis', 'Visualization', 'Reporting']
      },
      avatar: '📊'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10'
      case 'training': return 'text-yellow-400 bg-yellow-400/10'
      case 'inactive': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t.status.active
      case 'training': return t.status.training
      case 'inactive': return t.status.inactive
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
          <Link
            href="/train-agent"
            className="inline-block bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {t.trainNew}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{agents.length}</div>
            <div className="text-zinc-400">{t.stats.total}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">
              {agents.filter(a => a.status === 'active').length}
            </div>
            <div className="text-zinc-400">{t.stats.active}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {agents.filter(a => a.status === 'training').length}
            </div>
            <div className="text-zinc-400">{t.stats.training}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {Math.round(agents.reduce((acc, agent) => acc + agent.trainingProgress, 0) / agents.length)}%
            </div>
            <div className="text-zinc-400">{language === 'zh' ? '平均完成度' : 'Avg Progress'}</div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/70 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Agent Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{agent.avatar}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{agent.name[language]}</h3>
                    <p className="text-sm text-zinc-400">by {agent.creator[language]}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                  {getStatusText(agent.status)}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                {agent.description[language]}
              </p>

              {/* Training Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">{language === 'zh' ? '训练进度' : 'Training Progress'}</span>
                  <span className="text-zinc-300">{agent.trainingProgress}%</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${agent.trainingProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {agent.tags[language].map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-zinc-700/50 text-zinc-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm py-2 px-3 rounded-lg transition-colors">
                  {language === 'zh' ? '查看详情' : 'View Details'}
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors">
                  {language === 'zh' ? '使用' : 'Use'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {agents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">{language === 'zh' ? '还没有智能体' : 'No agents yet'}</h3>
            <p className="text-zinc-400 mb-6">{language === 'zh' ? '成为第一个训练智能体的用户吧！' : 'Be the first to train an agent!'}</p>
            <Link
              href="/train-agent"
              className="inline-block bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              {language === 'zh' ? '开始训练' : 'Start Training'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 