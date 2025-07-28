'use client'

import { useState } from 'react'
import Link from 'next/link'
import LanguageSwitcher from '../../components/LanguageSwitcher'

export default function LaunchMission() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const translations = {
    zh: {
      title: '🚀 发起任务',
      subtitle: '提交创意任务，让社区共同孵化',
      form: {
        title: '任务标题',
        titlePlaceholder: '输入你的创意任务标题...',
        description: '任务描述',
        descriptionPlaceholder: '详细描述你的任务需求、目标和期望结果...',
        tags: '标签',
        tagsPlaceholder: '用逗号分隔的标签，如：AI, 创意, 协作',
        submit: '提交任务',
        back: '返回首页'
      },
      success: {
        title: '🎉 任务提交成功！',
        message: '你的创意任务已成功提交到社区。我们将尽快审核并发布。',
        newTask: '提交新任务',
        back: '返回首页'
      }
    },
    en: {
      title: '🚀 Launch Mission',
      subtitle: 'Submit creative tasks for community incubation',
      form: {
        title: 'Mission Title',
        titlePlaceholder: 'Enter your creative mission title...',
        description: 'Mission Description',
        descriptionPlaceholder: 'Describe your mission requirements, goals, and expected outcomes...',
        tags: 'Tags',
        tagsPlaceholder: 'Comma-separated tags, e.g.: AI, Creative, Collaboration',
        submit: 'Submit Mission',
        back: 'Back to Home'
      },
      success: {
        title: '🎉 Mission Submitted Successfully!',
        message: 'Your creative mission has been successfully submitted to the community. We will review and publish it soon.',
        newTask: 'Submit New Mission',
        back: 'Back to Home'
      }
    }
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNewTask = () => {
    setFormData({ title: '', description: '', tags: '' })
    setIsSubmitted(false)
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      <LanguageSwitcher language={language} onLanguageChange={setLanguage} />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-zinc-400">
            {t.subtitle}
          </p>
        </div>

        {!isSubmitted ? (
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.form.title}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={t.form.titlePlaceholder}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.form.description}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t.form.descriptionPlaceholder}
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.form.tags}
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder={t.form.tagsPlaceholder}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors duration-200"
                >
                  {t.form.back}
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  {t.form.submit}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              {t.success.title}
            </h2>
            <p className="text-zinc-300 mb-8">
              {t.success.message}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleNewTask}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {t.success.newTask}
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors duration-200"
              >
                {t.success.back}
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
} 