'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TrainAgent() {
  const [trainingData, setTrainingData] = useState({
    name: '',
    description: '',
    prompt: '',
    samples: '',
    personality: '',
    constraints: ''
  })

  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTraining(true)
    setTrainingProgress(0)

    // 模拟训练过程
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTrainingData({
      ...trainingData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold mb-4">🎯 训练智能体</h1>
          <p className="text-zinc-400">通过提示词和样本训练自定义 Agent</p>
        </div>

        {!isTraining ? (
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    智能体名称 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={trainingData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400"
                    placeholder="给你的智能体起个名字..."
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
                    智能体描述 *
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={trainingData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400"
                    placeholder="简要描述智能体的功能..."
                  />
                </div>
              </div>

              {/* 核心提示词 */}
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-zinc-300 mb-2">
                  核心提示词 *
                </label>
                <textarea
                  id="prompt"
                  name="prompt"
                  value={trainingData.prompt}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder="定义智能体的核心行为和响应模式..."
                />
                <p className="text-xs text-zinc-500 mt-1">这是智能体的核心指令，决定了它的基本行为模式</p>
              </div>

              {/* 训练样本 */}
              <div>
                <label htmlFor="samples" className="block text-sm font-medium text-zinc-300 mb-2">
                  训练样本 *
                </label>
                <textarea
                  id="samples"
                  name="samples"
                  value={trainingData.samples}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder="提供一些输入输出的示例，帮助智能体学习正确的响应方式..."
                />
                <p className="text-xs text-zinc-500 mt-1">格式：输入 | 期望输出（每行一个样本）</p>
              </div>

              {/* 性格设定 */}
              <div>
                <label htmlFor="personality" className="block text-sm font-medium text-zinc-300 mb-2">
                  性格设定
                </label>
                <textarea
                  id="personality"
                  name="personality"
                  value={trainingData.personality}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder="描述智能体的性格特点，如：友好、专业、幽默等..."
                />
              </div>

              {/* 约束条件 */}
              <div>
                <label htmlFor="constraints" className="block text-sm font-medium text-zinc-300 mb-2">
                  约束条件
                </label>
                <textarea
                  id="constraints"
                  name="constraints"
                  value={trainingData.constraints}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder="定义智能体不应该做的事情或限制条件..."
                />
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
              >
                开始训练智能体
              </button>
            </form>
          </div>
        ) : (
          /* 训练进度界面 */
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 text-center">
            <div className="text-6xl mb-6">🤖</div>
            <h2 className="text-2xl font-bold mb-4">正在训练智能体...</h2>
            <p className="text-zinc-400 mb-8">请耐心等待，训练过程可能需要几分钟</p>
            
            {/* 进度条 */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">训练进度</span>
                <span className="text-zinc-300">{trainingProgress}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${trainingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* 训练步骤 */}
            <div className="text-left max-w-md mx-auto space-y-2">
              <div className={`flex items-center space-x-3 ${trainingProgress >= 20 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 20 ? '✓' : '○'}</span>
                <span>解析训练数据</span>
              </div>
              <div className={`flex items-center space-x-3 ${trainingProgress >= 40 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 40 ? '✓' : '○'}</span>
                <span>构建模型架构</span>
              </div>
              <div className={`flex items-center space-x-3 ${trainingProgress >= 60 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 60 ? '✓' : '○'}</span>
                <span>训练模型参数</span>
              </div>
              <div className={`flex items-center space-x-3 ${trainingProgress >= 80 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 80 ? '✓' : '○'}</span>
                <span>优化性能</span>
              </div>
              <div className={`flex items-center space-x-3 ${trainingProgress >= 100 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 100 ? '✓' : '○'}</span>
                <span>部署完成</span>
              </div>
            </div>

            {trainingProgress >= 100 && (
              <div className="mt-8">
                <div className="text-green-400 text-xl font-semibold mb-4">🎉 训练完成！</div>
                <Link
                  href="/agents"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  查看智能体
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 说明文字 */}
        <div className="mt-8 text-center text-zinc-400 text-sm">
          <p>
            训练完成后，你的智能体将出现在 Agent 养成所中。<br/>
            后续可扩展为接入真实的 LLM 接口进行训练。
          </p>
        </div>
      </div>
    </main>
  )
} 