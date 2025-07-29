'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '../locales/translations'

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language].home

  const modules = [
    {
      title: t.modules.launchMission.title,
      description: t.modules.launchMission.description,
      href: '/launch-mission',
      color: 'from-blue-500 to-purple-600',
      icon: '🚀'
    },
    {
      title: t.modules.agents.title,
      description: t.modules.agents.description,
      href: '/agents',
      color: 'from-green-500 to-teal-600',
      icon: '🤖'
    },
    {
      title: t.modules.trainAgent.title,
      description: t.modules.trainAgent.description,
      href: '/train-agent',
      color: 'from-orange-500 to-red-600',
      icon: '🎯'
    },
    {
      title: t.modules.wishes.title,
      description: t.modules.wishes.description,
      href: '/wishes',
      color: 'from-pink-500 to-rose-600',
      icon: '⭐'
    },
    {
      title: t.modules.roles.title,
      description: t.modules.roles.description,
      href: '/roles',
      color: 'from-indigo-500 to-blue-600',
      icon: '👥'
    },
    {
      title: t.modules.narratives.title,
      description: t.modules.narratives.description,
      href: '/narratives',
      color: 'from-purple-500 to-pink-600',
      icon: '📖'
    },
    {
      title: t.modules.taskSquare.title,
      description: t.modules.taskSquare.description,
      href: '/task-square',
      color: 'from-cyan-500 to-blue-600',
      icon: '🏛️'
    }
  ]

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/task-square" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                <span>🏛️</span>
                {language === 'zh' ? '开始探索' : 'Start Exploring'}
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'zh' ? '平台概览' : 'Platform Overview'}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {language === 'zh' 
              ? 'CyberNuwa 是一个开放式的AI智能体共创平台，集成了任务发布、智能体训练、社区协作等核心功能。'
              : 'CyberNuwa is an open platform for AI agent co-creation, integrating task publishing, agent training, and community collaboration.'
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 text-center">
            <div className="text-3xl font-bold text-blue-400">7</div>
            <div className="text-zinc-400">{language === 'zh' ? '核心模块' : 'Core Modules'}</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 text-center">
            <div className="text-3xl font-bold text-green-400">∞</div>
            <div className="text-zinc-400">{language === 'zh' ? '无限可能' : 'Possibilities'}</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 text-center">
            <div className="text-3xl font-bold text-purple-400">🌐</div>
            <div className="text-zinc-400">{language === 'zh' ? '双语支持' : 'Bilingual'}</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 text-center">
            <div className="text-3xl font-bold text-yellow-400">⚡</div>
            <div className="text-zinc-400">{language === 'zh' ? '实时协作' : 'Real-time'}</div>
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
              className="group relative bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{module.icon}</div>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`}></div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {module.title}
              </h3>
              
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
                {module.description}
              </p>

              <Link
                href={module.href}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              >
                {language === 'zh' ? '进入' : 'Enter'}
                <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-700">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {t.vision.title}
          </h2>
          <p className="text-zinc-300 text-center leading-relaxed max-w-3xl mx-auto">
            {t.vision.content}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-zinc-400">
            © 2024 Cyber Nüwa. {language === 'zh' ? '让每个想法都被看见，让每个参与者都留下印记。' : 'Let every idea be seen, let every participant leave their mark.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
