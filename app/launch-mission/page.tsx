'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '../../locales/translations'

export default function LaunchMission() {
  const { language, setLanguage } = useLanguage()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const t = translations[language].launchMission

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
    <div className="bg-zinc-900 text-white">

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