'use client'

import Link from 'next/link'

export default function TaskSquare() {
  // 模拟任务数据
  const tasks = [
    {
      id: 1,
      title: '开发智能代码审查助手',
      description: '创建一个能够自动审查代码质量、检测潜在bug并提供改进建议的AI助手。',
      status: 'open',
      priority: 'high',
      assignee: null,
      participants: 8,
      progress: 0,
      tags: ['编程', 'AI', '代码质量'],
      createdAt: '2024-01-15',
      deadline: '2024-02-15',
      reward: '社区贡献者徽章'
    },
    {
      id: 2,
      title: '设计创意写作AI',
      description: '开发一个能够根据用户输入的主题和风格生成创意文本的智能体。',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Alice',
      participants: 12,
      progress: 65,
      tags: ['写作', '创意', 'AI'],
      createdAt: '2024-01-10',
      deadline: '2024-02-10',
      reward: '早期采用者特权'
    },
    {
      id: 3,
      title: '构建多语言翻译工具',
      description: '创建一个支持实时语音翻译和文档翻译的智能工具。',
      status: 'completed',
      priority: 'high',
      assignee: 'Bob',
      participants: 15,
      progress: 100,
      tags: ['翻译', '多语言', '语音'],
      createdAt: '2024-01-05',
      deadline: '2024-01-25',
      reward: '项目贡献者证书'
    },
    {
      id: 4,
      title: '开发数据可视化生成器',
      description: '根据用户提供的数据自动生成美观且信息丰富的可视化图表。',
      status: 'open',
      priority: 'low',
      assignee: null,
      participants: 5,
      progress: 0,
      tags: ['数据', '可视化', '图表'],
      createdAt: '2024-01-12',
      deadline: '2024-03-01',
      reward: '技能认证徽章'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-400/10'
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10'
      case 'completed': return 'text-green-400 bg-green-400/10'
      case 'closed': return 'text-gray-400 bg-gray-400/10'
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
    <main className="min-h-screen bg-zinc-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold mb-4">🏛️ 任务广场</h1>
          <p className="text-zinc-400 mb-6">浏览所有公开任务与进展</p>
          <Link
            href="/launch-mission"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            🚀 发布新任务
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{tasks.length}</div>
            <div className="text-zinc-400">总任务数</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-zinc-400">进行中</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-zinc-400">已完成</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {tasks.reduce((acc, task) => acc + task.participants, 0)}
            </div>
            <div className="text-zinc-400">总参与者</div>
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
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)} bg-zinc-700/50`}>
                        {getPriorityText(task.priority)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                    {task.description}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.tags.map((tag, index) => (
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
                        <span className="text-zinc-400">完成进度</span>
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
                    <span>📅 截止: {task.deadline}</span>
                    <span>👥 参与者: {task.participants}</span>
                    {task.assignee && <span>🎯 负责人: {task.assignee}</span>}
                    <span>🏆 奖励: {task.reward}</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col space-y-2 min-w-[120px]">
                  {task.status === 'open' ? (
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      参与任务
                    </button>
                  ) : task.status === 'in-progress' ? (
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      查看进展
                    </button>
                  ) : (
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      查看成果
                    </button>
                  )}
                  <button className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    详情
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
            <h3 className="text-xl font-semibold mb-2">任务广场还是空的</h3>
            <p className="text-zinc-400 mb-6">成为第一个发布任务的人吧！</p>
            <Link
              href="/launch-mission"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              发布第一个任务
            </Link>
          </div>
        )}
      </div>
    </main>
  )
} 