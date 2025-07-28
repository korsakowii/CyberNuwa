'use client'

import Link from 'next/link'
import { useState } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Home() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')

  const translations = {
    zh: {
      hero: {
        title: '🌌 Cyber Nüwa',
        subtitle: '面向创意共创与智能体养成的开放式平台',
        description: '融合 Kaggle 的任务机制、Notion 的协作空间与 HuggingFace 的模型文化'
      },
      modules: {
        title: '探索平台模块',
        launchMission: { title: '🚀 发起任务', description: '提交创意任务，让社区共同孵化' },
        agents: { title: '🤖 Agent 养成所', description: '查看智能体列表与训练记录' },
        trainAgent: { title: '🎯 训练智能体', description: '通过提示词和样本训练自定义 Agent' },
        wishes: { title: '⭐ 许愿池', description: '展示灵感碎片和半成品想法' },
        roles: { title: '👥 用户角色', description: '扮演不同角色，体验不同权限路径' },
        narratives: { title: '📖 元叙事广场', description: '记录社区发展和 Agent 传记' },
        taskSquare: { title: '🏛️ 任务广场', description: '浏览所有公开任务与进展' }
      },
      vision: {
        title: '项目愿景',
        content: '让每个创意都被看见、让每位参与者都能留下痕迹，在非问答型协作中捏出赛博智能体，共同建造一座人机共创的灵感宇宙。'
      }
    },
    en: {
      hero: {
        title: '🌌 Cyber Nüwa',
        subtitle: 'Open Platform for Creative Co-Creation and AI Agent Development',
        description: 'Integrating Kaggle\'s task mechanisms, Notion\'s collaborative spaces, and HuggingFace\'s model culture'
      },
      modules: {
        title: 'Explore Platform Modules',
        launchMission: { title: '🚀 Launch Mission', description: 'Submit creative tasks for community incubation' },
        agents: { title: '🤖 Agent Incubator', description: 'View agent list and training records' },
        trainAgent: { title: '🎯 Train Agent', description: 'Train custom agents with prompts and samples' },
        wishes: { title: '⭐ Wish Pool', description: 'Show inspiration fragments and half-finished ideas' },
        roles: { title: '👥 User Roles', description: 'Experience different roles and permission paths' },
        narratives: { title: '📖 Metanarrative Square', description: 'Record community development and agent biographies' },
        taskSquare: { title: '🏛️ Task Square', description: 'Browse all public tasks and progress' }
      },
      vision: {
        title: 'Project Vision',
        content: 'Let every idea be seen, let every participant leave their mark, mold cyber agents through non-Q&A collaboration, and together build a universe of human-machine co-creation.'
      }
    }
  }

  const t = translations[language]

  const modules = [
    {
      title: t.modules.launchMission.title,
      description: t.modules.launchMission.description,
      href: '/launch-mission',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: t.modules.agents.title,
      description: t.modules.agents.description,
      href: '/agents',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: t.modules.trainAgent.title,
      description: t.modules.trainAgent.description,
      href: '/train-agent',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: t.modules.wishes.title,
      description: t.modules.wishes.description,
      href: '/wishes',
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: t.modules.roles.title,
      description: t.modules.roles.description,
      href: '/roles',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      title: t.modules.narratives.title,
      description: t.modules.narratives.description,
      href: '/narratives',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: t.modules.taskSquare.title,
      description: t.modules.taskSquare.description,
      href: '/task-square',
      color: 'from-cyan-500 to-blue-600'
    }
  ]

  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      <LanguageSwitcher language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 cyber-gradient opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-float">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              {t.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t.modules.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={module.href}
              className="group transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={module.href}>
                <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 h-full transition-all duration-300 hover:bg-zinc-800/70 hover:border-zinc-600">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {module.title.split(' ')[0]}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{module.title.split(' ').slice(1).join(' ')}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{module.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.vision.title}
          </h2>
          <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700 rounded-xl p-8">
            <p className="text-lg text-zinc-300 leading-relaxed">
              {t.vision.content}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
