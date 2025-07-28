'use client'

import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Roles() {
  const { language } = useLanguage()
  const roles = [
    {
      id: 1,
      name: '🎨 创意者',
      description: '专注于提出创新想法和概念的用户',
      level: '初级',
      permissions: ['提交任务', '参与讨论', '查看公开内容'],
      requirements: '完成注册即可获得',
      avatar: '🎨',
      color: 'from-pink-500 to-rose-600',
      members: 156,
      nextLevel: '中级创意者'
    },
    {
      id: 2,
      name: '🤖 训练师',
      description: '专门训练和优化智能体的专家',
      level: '中级',
      permissions: ['训练智能体', '发布训练成果', '参与技术讨论'],
      requirements: '完成3个任务并获得好评',
      avatar: '🤖',
      color: 'from-blue-500 to-purple-600',
      members: 89,
      nextLevel: '高级训练师'
    },
    {
      id: 3,
      name: '🏛️ 守护者',
      description: '维护平台秩序和内容质量的社区管理者',
      level: '高级',
      permissions: ['内容审核', '用户管理', '平台规则制定'],
      requirements: '成为训练师6个月以上，贡献突出',
      avatar: '🏛️',
      color: 'from-green-500 to-teal-600',
      members: 23,
      nextLevel: '元老守护者'
    },
    {
      id: 4,
      name: '🌟 元老',
      description: '平台的核心贡献者和精神领袖',
      level: '顶级',
      permissions: ['平台决策参与', '特殊功能访问', '导师资格'],
      requirements: '成为守护者1年以上，对平台有重大贡献',
      avatar: '🌟',
      color: 'from-yellow-500 to-orange-600',
      members: 7,
      nextLevel: null
    }
  ]

  const currentUser = {
    role: '创意者',
    level: '初级',
    progress: 45,
    nextRequirement: '完成2个任务以获得训练师资格'
  }

  return (
    <div className="bg-zinc-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold mb-4">👥 用户角色</h1>
          <p className="text-zinc-400 mb-6">扮演不同角色，体验不同权限路径</p>
        </div>

        {/* Current User Status */}
        <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">你的当前状态</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{currentUser.role}</div>
              <div className="text-zinc-400">{currentUser.level}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{currentUser.progress}%</div>
              <div className="text-zinc-400">升级进度</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-zinc-300">{currentUser.nextRequirement}</div>
              <div className="text-zinc-400">下一级要求</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">升级进度</span>
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
                    <h3 className="text-xl font-semibold">{role.name}</h3>
                    <p className="text-sm text-zinc-400">{role.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-zinc-300">{role.members}</div>
                  <div className="text-xs text-zinc-400">成员</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                {role.description}
              </p>

              {/* Permissions */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">权限</h4>
                <div className="space-y-1">
                  {role.permissions.map((permission, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-zinc-400">
                      <span className="text-green-400">✓</span>
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">获得要求</h4>
                <p className="text-sm text-zinc-400">{role.requirements}</p>
              </div>

              {/* Next Level */}
              {role.nextLevel && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-zinc-300 mb-2">下一级</h4>
                  <p className="text-sm text-zinc-400">{role.nextLevel}</p>
                </div>
              )}

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
                查看详情
              </button>
            </div>
          ))}
        </div>

        {/* Role Progression Path */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">角色发展路径</h2>
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              {roles.map((role, index) => (
                <div key={role.id} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center text-2xl mb-2`}>
                    {role.avatar}
                  </div>
                  <div className="text-sm font-medium text-zinc-300">{role.name}</div>
                  <div className="text-xs text-zinc-400">{role.level}</div>
                  {index < roles.length - 1 && (
                    <div className="hidden md:block w-16 h-0.5 bg-zinc-600 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-zinc-400">
              <p>每个角色都有独特的权限和发展路径，通过贡献和参与来提升你的角色等级</p>
            </div>
          </div>
        </div>

        {/* How to Progress */}
        <div className="mt-8 text-center text-zinc-400 text-sm">
          <p>
            想要提升角色等级？积极参与任务、训练智能体、贡献优质内容！<br/>
            每个角色都有独特的成长路径和专属权限。
          </p>
        </div>
      </div>
    </div>
  )
} 