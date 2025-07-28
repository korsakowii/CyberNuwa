'use client'

import Link from 'next/link'

export default function Agents() {
  // 模拟数据 - 实际项目中应该从 API 获取
  const agents = [
    {
      id: 1,
      name: '创意助手',
      description: '专门帮助用户进行创意构思和头脑风暴的智能体',
      creator: 'Alice',
      status: 'active',
      trainingProgress: 85,
      tags: ['创意', '头脑风暴', '协作'],
      avatar: '🎨'
    },
    {
      id: 2,
      name: '代码审查员',
      description: '自动审查代码质量，提供改进建议的智能体',
      creator: 'Bob',
      status: 'training',
      trainingProgress: 45,
      tags: ['编程', '代码审查', '质量保证'],
      avatar: '💻'
    },
    {
      id: 3,
      name: '故事编织者',
      description: '根据用户提供的情节元素，生成完整故事的智能体',
      creator: 'Charlie',
      status: 'active',
      trainingProgress: 92,
      tags: ['写作', '故事创作', '文学'],
      avatar: '📚'
    },
    {
      id: 4,
      name: '数据分析师',
      description: '自动分析数据并生成可视化报告的智能体',
      creator: 'Diana',
      status: 'inactive',
      trainingProgress: 100,
      tags: ['数据分析', '可视化', '报告'],
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
      case 'active': return '运行中'
      case 'training': return '训练中'
      case 'inactive': return '已停用'
      default: return '未知'
    }
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold mb-4">🤖 Agent 养成所</h1>
          <p className="text-zinc-400 mb-6">查看智能体列表与训练记录</p>
          <Link
            href="/train-agent"
            className="inline-block bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            🎯 训练新智能体
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{agents.length}</div>
            <div className="text-zinc-400">总智能体数</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">
              {agents.filter(a => a.status === 'active').length}
            </div>
            <div className="text-zinc-400">运行中</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {agents.filter(a => a.status === 'training').length}
            </div>
            <div className="text-zinc-400">训练中</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {Math.round(agents.reduce((acc, agent) => acc + agent.trainingProgress, 0) / agents.length)}%
            </div>
            <div className="text-zinc-400">平均完成度</div>
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
                    <h3 className="text-xl font-semibold">{agent.name}</h3>
                    <p className="text-sm text-zinc-400">by {agent.creator}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                  {getStatusText(agent.status)}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                {agent.description}
              </p>

              {/* Training Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">训练进度</span>
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
                {agent.tags.map((tag, index) => (
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
                  查看详情
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors">
                  使用
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {agents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">还没有智能体</h3>
            <p className="text-zinc-400 mb-6">成为第一个训练智能体的用户吧！</p>
            <Link
              href="/train-agent"
              className="inline-block bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              开始训练
            </Link>
          </div>
        )}
      </div>
    </main>
  )
} 