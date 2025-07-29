'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales/translations'

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
    <div className="bg-zinc-900 text-white">

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
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{module.title}</h3>
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
    </div>
  )
}
