'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../contexts/LanguageContext'
import { translations } from '../../../locales/translations'
import ParticleButton from '../../../components/ParticleButton'
import { wishesApi } from '../../../utils/api'
import ApiStatus from '../../../components/ApiStatus'

export default function AddWish() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language].wishes

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    isAnonymous: false,
    authorName: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // 检查表单是否有效（标题和描述是必填的）
  const isFormValid = formData.title.trim() !== '' && formData.description.trim() !== ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isFormValid) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // 组合标题和描述作为愿望内容
      const wishContent = `${formData.title}\n\n${formData.description}`
      
      // 生成用户ID
      const userId = formData.isAnonymous ? 'anonymous_user' : (formData.authorName || 'user_001')
      
      // 调用API提交愿望
      const response = await wishesApi.submitWish(wishContent, userId)
      
      if (response.success) {
        alert(language === 'zh' ? '愿望提交成功！' : 'Wish submitted successfully!')
        // 清空表单
        setFormData({
          title: '',
          description: '',
          tags: '',
          isAnonymous: false,
          authorName: ''
        })
        // 跳转到愿望池页面
        window.location.href = '/wishes'
      } else {
        setSubmitError(response.message || (language === 'zh' ? '提交失败，请重试' : 'Submission failed, please try again'))
      }
    } catch (error) {
      console.error('提交愿望失败:', error)
      setSubmitError(language === 'zh' ? '网络错误，请检查连接后重试' : 'Network error, please check connection and try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden">
      {/* 梦幻背景效果 */}
      <div className="absolute inset-0">
        {/* 星空背景 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* 浮动光点 */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-300/60 rounded-full animate-pulse opacity-15"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-300/60 rounded-full animate-ping opacity-15"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-bounce opacity-15"></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-cyan-300/60 rounded-full animate-pulse opacity-15"></div>
        <div className="absolute top-32 left-2/3 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-ping opacity-15"></div>
        
        {/* 宇宙能量流 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent opacity-8 animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-8 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-indigo-300 to-transparent opacity-8 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <Link href="/wishes" className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block">
            ← {language === 'zh' ? '返回许愿池' : 'Back to Wish Pool'}
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            ✨ {language === 'zh' ? '许下你的愿望' : 'Make Your Wish'}
          </h1>
          <p className="text-zinc-400 mb-6">
            {language === 'zh' 
              ? '在赛博女娲宇宙中，每个愿望都是一颗星辰，等待被实现的光芒照亮现实' 
              : 'In the Cyber Nuwa universe, every wish is a star waiting to be realized and illuminate reality'
            }
          </p>
        </div>

        {/* 表单 */}
        <div className="bg-black/25 backdrop-blur-sm rounded-xl border border-slate-400/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-2">
                {language === 'zh' ? '愿望标题' : 'Wish Title'}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/60 border border-slate-400/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
                placeholder={language === 'zh' ? '给你的愿望起个名字...' : 'Give your wish a name...'}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-200 mb-2">
                {language === 'zh' ? '愿望描述' : 'Wish Description'}
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/60 border border-slate-400/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all resize-none"
                placeholder={language === 'zh' ? '详细描述你的愿望...' : 'Describe your wish in detail...'}
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-slate-200 mb-2">
                {language === 'zh' ? '标签' : 'Tags'}
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/60 border border-slate-400/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
                placeholder={language === 'zh' ? '用逗号分隔标签，如：AI, 创意, 协作' : 'Separate tags with commas, e.g.: AI, Creative, Collaboration'}
              />
            </div>

            {/* 署名设置 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-purple-600 bg-black/60 border-slate-400/20 rounded focus:ring-purple-400 focus:ring-2"
                />
                <label htmlFor="isAnonymous" className="text-sm font-medium text-slate-200">
                  {language === 'zh' ? '匿名发布' : 'Publish Anonymously'}
                </label>
              </div>

              {!formData.isAnonymous && (
                <div>
                  <label htmlFor="authorName" className="block text-sm font-medium text-slate-200 mb-2">
                    {language === 'zh' ? '署名' : 'Author Name'}
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-slate-400/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
                    placeholder={language === 'zh' ? '输入你的名字或昵称（可选）' : 'Enter your name or nickname (optional)'}
                  />
                </div>
              )}
            </div>

            {/* 错误信息显示 */}
            {submitError && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                {submitError}
              </div>
            )}

            <div className="flex justify-center pt-6">
              <ParticleButton
                onClick={() => {
                  // 延迟触发表单提交，让粒子动画先执行
                  setTimeout(() => {
                    const form = document.querySelector('form')
                    if (form) {
                      form.dispatchEvent(new Event('submit', { bubbles: true }))
                    }
                  }, 2000) // 增加到2000ms，让粒子动画完全播放
                }}
                disabled={!isFormValid || isSubmitting}
                className={`px-8 py-4 rounded-full font-medium transition-all transform shadow-md ${
                  isFormValid && !isSubmitting
                    ? 'bg-gradient-to-r from-purple-400/70 via-purple-500/70 to-indigo-500/70 text-white hover:from-purple-400/80 hover:via-purple-500/80 hover:to-indigo-500/80 hover:scale-105 hover:shadow-purple-400/25 cursor-pointer' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                }`}
              >
                {isSubmitting ? (
                  <span>⏳ {language === 'zh' ? '提交中...' : 'Submitting...'}</span>
                ) : (
                  <span>✨ {language === 'zh' ? '许下愿望' : 'Make a Wish'}</span>
                )}
              </ParticleButton>
            </div>
          </form>
        </div>

        {/* 页脚 */}
        <footer className="mt-12 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Cyber Nüwa. All rights reserved.
            </div>
            <div className="text-gray-500 text-xs">
              🌌 {language === 'zh' ? '赛博女娲宇宙许愿池' : 'Cyber Nuwa Universe Wish Pool'}
            </div>
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center space-x-2 px-3 py-2 bg-black/40 backdrop-blur-sm border border-slate-400/20 rounded-lg hover:border-purple-400/40 hover:bg-black/60 transition-all"
            >
              <span>{language === 'zh' ? '🇺🇸' : '🇨🇳'}</span>
              <span className="text-white">{language === 'zh' ? 'English' : '中文'}</span>
            </button>
          </div>
        </footer>
      </div>
      
      {/* API状态指示器 */}
      <ApiStatus language={language} />
    </div>
  )
} 