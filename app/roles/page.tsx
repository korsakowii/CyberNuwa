'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '../../locales/translations'

export default function Roles() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language].roles

  const roles = [
    {
      id: 1,
      name: { zh: '创意者', en: 'Creator' },
      description: {
        zh: '专注于提出创新想法和概念的用户',
        en: 'Users focused on proposing innovative ideas and concepts'
      },
      level: { zh: '初级', en: 'Beginner' },
      permissions: {
        zh: ['提交任务', '参与讨论', '查看公开内容'],
        en: ['Submit Tasks', 'Participate in Discussions', 'View Public Content']
      },
      requirements: { zh: '完成注册即可获得', en: 'Granted upon registration' },
      avatar: '🎨',
      color: 'from-pink-500 to-rose-600',
      members: 156,
      nextLevel: { zh: '中级创意者', en: 'Intermediate Creator' }
    },
    {
      id: 2,
      name: { zh: '训练师', en: 'Trainer' },
      description: {
        zh: '专门训练和优化智能体的专家',
        en: 'Experts specializing in training and optimizing agents'
      },
      level: { zh: '中级', en: 'Intermediate' },
      permissions: {
        zh: ['训练智能体', '发布训练成果', '参与技术讨论'],
        en: ['Train Agents', 'Publish Training Results', 'Join Technical Discussions']
      },
      requirements: { zh: '完成3个任务并获得好评', en: 'Complete 3 tasks and receive positive feedback' },
      avatar: '🤖',
      color: 'from-blue-500 to-purple-600',
      members: 89,
      nextLevel: { zh: '高级训练师', en: 'Advanced Trainer' }
    },
    {
      id: 3,
      name: { zh: '守护者', en: 'Guardian' },
      description: {
        zh: '维护平台秩序和内容质量的社区管理者',
        en: 'Community managers maintaining platform order and content quality'
      },
      level: { zh: '高级', en: 'Advanced' },
      permissions: {
        zh: ['内容审核', '用户管理', '平台规则制定'],
        en: ['Content Review', 'User Management', 'Platform Rule Setting']
      },
      requirements: { zh: '成为训练师6个月以上，贡献突出', en: 'Be a trainer for over 6 months with outstanding contributions' },
      avatar: '🏛️',
      color: 'from-green-500 to-teal-600',
      members: 23,
      nextLevel: { zh: '元老守护者', en: 'Elder Guardian' }
    },
    {
      id: 4,
      name: { zh: '元老', en: 'Elder' },
      description: {
        zh: '平台的核心贡献者和精神领袖',
        en: 'Core contributors and spiritual leaders of the platform'
      },
      level: { zh: '顶级', en: 'Top' },
      permissions: {
        zh: ['平台决策参与', '特殊功能访问', '导师资格'],
        en: ['Participate in Platform Decisions', 'Access Special Features', 'Mentor Qualification']
      },
      requirements: { zh: '成为守护者1年以上，对平台有重大贡献', en: 'Be a guardian for over 1 year with significant contributions' },
      avatar: '🌟',
      color: 'from-yellow-500 to-orange-600',
      members: 7,
      nextLevel: null
    }
  ]

  const currentUser = {
    role: { zh: '创意者', en: 'Creator' },
    level: { zh: '初级', en: 'Beginner' },
    progress: 45,
    nextRequirement: {
      zh: '完成2个任务以获得训练师资格',
      en: 'Complete 2 tasks to qualify as a Trainer'
    }
  }

  const progressionPath = [
    {
      name: { zh: '创意者', en: 'Creator' },
      level: { zh: '初级', en: 'Beginner' },
      color: 'from-pink-500 to-rose-600',
      icon: '🎨'
    },
    {
      name: { zh: '训练师', en: 'Trainer' },
      level: { zh: '中级', en: 'Intermediate' },
      color: 'from-blue-500 to-purple-600',
      icon: '🤖'
    },
    {
      name: { zh: '守护者', en: 'Guardian' },
      level: { zh: '高级', en: 'Advanced' },
      color: 'from-green-500 to-teal-600',
      icon: '🏛️'
    },
    {
      name: { zh: '元老', en: 'Elder' },
      level: { zh: '顶级', en: 'Top' },
      color: 'from-yellow-500 to-orange-600',
      icon: '🌟'
    }
  ]

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

        {/* Current User Status */}
        <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{t.currentStatus}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{currentUser.role[language]}</div>
              <div className="text-zinc-400">{currentUser.level[language]}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{currentUser.progress}%</div>
              <div className="text-zinc-400">{t.upgradeProgress}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-zinc-300">{currentUser.nextRequirement[language]}</div>
              <div className="text-zinc-400">{t.nextRequirement}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">{t.upgradeProgress}</span>
              <span className="text-zinc-300">{currentUser.progress}%</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentUser.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <div
              key={role.id}
              className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/70 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Role Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center text-2xl`}>
                    {role.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{role.name[language]}</h3>
                    <p className="text-sm text-zinc-400">{role.level[language]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-zinc-300">{role.members}</div>
                  <div className="text-xs text-zinc-400">{t.members}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                {role.description[language]}
              </p>

              {/* Permissions */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">{t.permissions}</h4>
                <div className="space-y-1">
                  {role.permissions[language].map((permission, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-zinc-400">
                      <span className="text-green-400">✓</span>
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">{t.requirement}</h4>
                <p className="text-sm text-zinc-400">{role.requirements[language]}</p>
              </div>

              {/* Next Level */}
              {role.nextLevel && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-zinc-300 mb-2">{t.nextLevel}</h4>
                  <p className="text-sm text-zinc-400">{role.nextLevel[language]}</p>
                </div>
              )}

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">{t.viewDetails}</button>
            </div>
          ))}
        </div>

        {/* Role Progression Path */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">{t.roleDevelopmentPath}</h2>
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              {progressionPath.map((role, index) => (
                <div key={role.name.zh} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center text-2xl mb-2`}>
                    {role.icon}
                  </div>
                  <div className="text-sm font-medium text-zinc-300">{role.name[language]}</div>
                  <div className="text-xs text-zinc-400">{role.level[language]}</div>
                  {index < progressionPath.length - 1 && (
                    <div className="hidden md:block w-16 h-0.5 bg-zinc-600 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-zinc-400">
              <p>{t.roleDevelopmentPathDescription}</p>
            </div>
          </div>
        </div>

        {/* How to Progress */}
        <div className="mt-8 text-center text-zinc-400 text-sm">
          <p>
            {t.howToProgress1}<br/>
            {t.howToProgress2}
          </p>
        </div>
      </div>
      {/* Footer with Language Switcher */}
      <footer className="bg-zinc-800/50 border-t border-zinc-700 mt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 版权信息 */}
            <div className="text-zinc-400 text-sm">
              © 2024 Cyber Nüwa. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
            </div>

            {/* 右侧平台描述 */}
            <div className="text-zinc-500 text-xs">
              {language === 'zh' ? 'AI智能体共创平台' : 'AI Agent Co-Creation Platform'}
            </div>

            {/* 语言切换器 - 移到最右侧 */}
            <div className="flex items-center">
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center space-x-2 px-3 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors"
              >
                <span>{language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
                <span>{language === 'zh' ? '中文' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 