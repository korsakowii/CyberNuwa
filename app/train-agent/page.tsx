'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '../../locales/translations'

export default function TrainAgent() {
  const { language } = useLanguage()
  const t = translations[language].trainAgent

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
    <div className="bg-zinc-900 text-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block">
            {t.backHome}
          </Link>
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-zinc-400">{t.subtitle}</p>
        </div>

        {!isTraining ? (
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={trainingData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400"
                    placeholder={t.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t.form.description}
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={trainingData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400"
                    placeholder={t.form.descriptionPlaceholder}
                  />
                </div>
              </div>

              {/* 核心提示词 */}
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.form.prompt}
                </label>
                <textarea
                  id="prompt"
                  name="prompt"
                  value={trainingData.prompt}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder={t.form.promptPlaceholder}
                />
                <p className="text-xs text-zinc-500 mt-1">{language === 'zh' ? '这是智能体的核心指令，决定了它的基本行为模式' : 'This is the agent\'s core instruction that determines its basic behavior patterns'}</p>
              </div>

              {/* 训练样本 */}
              <div>
                <label htmlFor="samples" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.form.samples}
                </label>
                <textarea
                  id="samples"
                  name="samples"
                  value={trainingData.samples}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder={language === 'zh' ? '提供一些输入输出的示例，帮助智能体学习正确的响应方式...' : 'Provide input-output examples to help the agent learn correct response patterns...'}
                />
                <p className="text-xs text-zinc-500 mt-1">{language === 'zh' ? '格式：输入 | 期望输出（每行一个样本）' : 'Format: Input | Expected Output (one sample per line)'}</p>
              </div>

              {/* 性格设定 */}
              <div>
                <label htmlFor="personality" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.form.personality}
                </label>
                <textarea
                  id="personality"
                  name="personality"
                  value={trainingData.personality}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder={t.form.personalityPlaceholder}
                />
              </div>

              {/* 约束条件 */}
              <div>
                <label htmlFor="constraints" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.form.constraints}
                </label>
                <textarea
                  id="constraints"
                  name="constraints"
                  value={trainingData.constraints}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none"
                  placeholder={t.form.constraintsPlaceholder}
                />
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
              >
                {t.form.submit}
              </button>
            </form>
          </div>
        ) : (
          /* 训练进度界面 */
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 text-center">
            <div className="text-6xl mb-6">🤖</div>
            <h2 className="text-2xl font-bold mb-4">{t.form.training}</h2>
            <p className="text-zinc-400 mb-8">{language === 'zh' ? '请耐心等待，训练过程可能需要几分钟' : 'Please wait patiently, training may take several minutes'}</p>
            
            {/* 进度条 */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">{t.progress.title}</span>
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
                <span>{language === 'zh' ? '解析训练数据' : 'Parsing training data'}</span>
              </div>
              <div className={`flex items-center space-x-3 ${trainingProgress >= 40 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 40 ? '✓' : '○'}</span>
                <span>{language === 'zh' ? '构建模型架构' : 'Building model architecture'}</span>
              </div>
              <div className={`flex items-center space-x-3 ${trainingProgress >= 60 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 60 ? '✓' : '○'}</span>
                <span>{language === 'zh' ? '训练模型参数' : 'Training model parameters'}</span>
              </div>
              <div className={`flex items-center space-x-3 ${trainingProgress >= 80 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 80 ? '✓' : '○'}</span>
                <span>{language === 'zh' ? '优化性能' : 'Optimizing performance'}</span>
              </div>
              <div className={`flex items-center space-x-3 ${trainingProgress >= 100 ? 'text-green-400' : 'text-zinc-500'}`}>
                <span>{trainingProgress >= 100 ? '✓' : '○'}</span>
                <span>{language === 'zh' ? '部署完成' : 'Deployment complete'}</span>
              </div>
            </div>

            {trainingProgress >= 100 && (
              <div className="mt-8">
                <div className="text-green-400 text-xl font-semibold mb-4">🎉 {t.progress.complete}</div>
                <Link
                  href="/agents"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {language === 'zh' ? '查看智能体' : 'View Agents'}
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 说明文字 */}
        <div className="mt-8 text-center text-zinc-400 text-sm">
          <p>
            {language === 'zh' 
              ? '训练完成后，你的智能体将出现在 Agent 养成所中。后续可扩展为接入真实的 LLM 接口进行训练。'
              : 'After training, your agent will appear in the Agent Incubator. Future versions can integrate with real LLM APIs for training.'
            }
          </p>
        </div>
      </div>
    </div>
  )
} 