'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { translations } from '../../../locales/translations'
import { wishesApi } from '../../../utils/api'
import ParticleButton from '../../../components/ParticleButton'
import HydrationGuard from '../../../components/HydrationGuard'

export default function AddWish() {
  const { language, isInitialized } = useLanguage()
  const router = useRouter()
  const t = translations[language].wishes

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    anonymous: false,
    author_name: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 表单验证
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title || formData.title.length < 2 || formData.title.length > 60) {
      newErrors.title = language === 'zh' ? '标题长度必须在2-60字之间' : 'Title must be between 2-60 characters'
    }
    
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = language === 'zh' ? '描述至少需要10字' : 'Description must be at least 10 characters'
    }
    
    if (formData.tags) {
      const tagArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      if (tagArray.length > 5) {
        newErrors.tags = language === 'zh' ? '最多只能添加5个标签' : 'Maximum 5 tags allowed'
      }
      for (const tag of tagArray) {
        if (tag.length > 20) {
          newErrors.tags = language === 'zh' ? '每个标签不能超过20字' : 'Each tag must be under 20 characters'
          break
        }
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 处理表单提交
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // 处理标签
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag)
        .slice(0, 5) // 最多5个标签
      
      // 构建请求数据
      const wishData = {
        title: formData.title,
        description: formData.description,
        tags,
        anonymous: formData.anonymous,
        author_name: formData.anonymous ? '' : formData.author_name,
        user_id: 'user_001' // 临时用户ID，实际应该从认证系统获取
      }
      
      console.log('提交愿望数据:', wishData)
      
      // 调用API
      console.log('准备提交的数据:', wishData)
      console.log('组合后的content:', wishData.title + '。' + wishData.description)
      
      const response = await wishesApi.submitWishLegacy(
        wishData.title + '。' + wishData.description, // 向后兼容content字段
        wishData.user_id
      )
      
      console.log('API响应:', response)
      
      if (response.success) {
        // 成功提示
        alert(language === 'zh' ? '已放入许愿池，可在列表中查看进度' : 'Wish added to pool, check progress in the list')
        router.push('/wishes')
      } else {
        throw new Error(response.message || '提交失败')
      }
    } catch (error) {
      console.error('提交愿望失败:', error)
      alert(language === 'zh' ? '提交失败，请重试' : 'Submission failed, please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 检查表单是否完整
  const isFormComplete = () => {
    return formData.title.trim().length >= 2 && 
           formData.title.trim().length <= 60 && 
           formData.description.trim().length >= 10
  }

  // 处理粒子按钮点击
  const handleParticleClick = () => {
    // 检查表单是否完整
    if (!isFormComplete()) {
      return
    }
    
    // 延迟触发表单提交，让粒子动画先执行
    setTimeout(() => {
      handleSubmit()
    }, 2000) // 2秒后提交，让粒子动画完全播放
  }

  // 处理输入变化
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // 清除该字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className='min-h-screen bg-zinc-900 text-white relative overflow-hidden'>
      {/* 梦幻背景效果 */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* 星空背景 */}
        <div className='absolute inset-0 opacity-20'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* 浮动光点 */}
        <div className='absolute top-20 left-10 w-2 h-2 bg-cyan-300/60 rounded-full animate-pulse opacity-15'></div>
        <div className='absolute top-40 right-20 w-1 h-1 bg-purple-300/60 rounded-full animate-ping opacity-15'></div>
        <div className='absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-bounce opacity-15'></div>
        <div className='absolute top-80 right-1/3 w-1 h-1 bg-cyan-300/60 rounded-full animate-pulse opacity-15'></div>
        <div className='absolute top-32 left-2/3 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-ping opacity-15'></div>

        {/* 宇宙能量流 - 对称分布 */}
        <div className='absolute top-0 left-0 w-full h-full'>
          <div className='absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent opacity-8 animate-pulse'></div>
          <div
            className='absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-8 animate-pulse'
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* 头部 */}
        <div className='text-center mb-12'>
          <button
            onClick={() => router.back()}
            className='text-zinc-400 hover:text-white transition-colors mb-4 inline-block'
          >
            {t.backHome}
          </button>
          <h1 className='text-4xl font-bold mb-4'>
            ✨ {language === 'zh' ? '许下你的愿望' : 'Make Your Wish'}
          </h1>
          <p className='text-zinc-400 mb-6'>
            {language === 'zh'
              ? '在赛博女娲宇宙中，每个愿望都是一颗星辰，等待被实现的光芒照亮现实'
              : 'In the Cyber Nuwa universe, every wish is a star waiting to be realized and illuminate reality'}
          </p>
        </div>

        {/* 表单 */}
        <div className='bg-black/25 backdrop-blur-sm rounded-xl border border-slate-400/20 p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* 标题 */}
            <div>
              <label className='block text-sm font-medium text-slate-200 mb-2'>
                {language === 'zh' ? '愿望标题 *' : 'Wish Title *'}
              </label>
              <input
                type='text'
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={language === 'zh' ? '给愿望起个名字（2-60字）' : 'Give your wish a name (2-60 characters)'}
                className={`w-full px-4 py-3 bg-black/60 border rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all ${
                  errors.title ? 'border-red-500' : 'border-slate-400/20'
                }`}
              />
              {errors.title && (
                <p className='text-red-400 text-sm mt-1'>{errors.title}</p>
              )}
            </div>

            {/* 描述 */}
            <div>
              <label className='block text-sm font-medium text-slate-200 mb-2'>
                {language === 'zh' ? '愿望描述 *' : 'Wish Description *'}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder={language === 'zh' ? '说说你真正想要的事（≥10字）' : 'Tell us what you really want (≥10 characters)'}
                rows={4}
                className={`w-full px-4 py-3 bg-black/60 border rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all resize-none ${
                  errors.description ? 'border-red-500' : 'border-slate-400/20'
                }`}
              />
              {errors.description && (
                <p className='text-red-400 text-sm mt-1'>{errors.description}</p>
              )}
            </div>

            {/* 标签 */}
            <div>
              <label className='block text-sm font-medium text-slate-200 mb-2'>
                {language === 'zh' ? '标签' : 'Tags'}
              </label>
              <input
                type='text'
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder={language === 'zh' ? '逗号分隔，如：AI, 创意, 协作（最多5个）' : 'Comma separated, e.g.: AI, Creative, Collaboration (max 5)'}
                className={`w-full px-4 py-3 bg-black/60 border rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all ${
                  errors.tags ? 'border-red-500' : 'border-slate-400/20'
                }`}
              />
              {errors.tags && (
                <p className='text-red-400 text-sm mt-1'>{errors.tags}</p>
              )}
            </div>

            {/* 作者信息 */}
            <div className='space-y-4'>
              {/* 匿名选项 */}
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  id='anonymous'
                  checked={formData.anonymous}
                  onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                  className='w-4 h-4 text-purple-600 bg-black/60 border-slate-400/20 rounded focus:ring-purple-400 focus:ring-2'
                />
                <label htmlFor='anonymous' className='text-sm font-medium text-slate-200'>
                  {language === 'zh' ? '以匿名方式发布（提示：作者名将不对外展示）' : 'Publish anonymously (Note: Author name will not be displayed)'}
                </label>
              </div>

              {/* 作者名 */}
              {!formData.anonymous && (
                <div>
                  <label className='block text-sm font-medium text-slate-200 mb-2'>
                    {language === 'zh' ? '作者名' : 'Author Name'}
                  </label>
                  <input
                    type='text'
                    value={formData.author_name}
                    onChange={(e) => handleInputChange('author_name', e.target.value)}
                    placeholder={language === 'zh' ? '你的显示名称' : 'Your display name'}
                    className='w-full px-4 py-3 bg-black/60 border border-slate-400/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all'
                  />
                </div>
              )}
            </div>

            {/* 提交按钮 */}
            <div className='flex justify-center pt-6'>
              <ParticleButton
                onClick={handleParticleClick}
                disabled={isSubmitting || !isFormComplete()}
                className={`px-8 py-4 rounded-full font-medium transition-all transform shadow-md ${
                  !isSubmitting && isFormComplete()
                    ? 'bg-gradient-to-r from-purple-400/70 via-purple-500/70 to-indigo-500/70 text-white hover:from-purple-400/80 hover:via-purple-500/80 hover:to-indigo-500/80 hover:scale-105 hover:shadow-purple-400/25 cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                }`}
              >
                {isSubmitting ? (
                  <span className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                    {language === 'zh' ? '提交中...' : 'Submitting...'}
                  </span>
                ) : (
                  <span>
                    ✨ {language === 'zh' ? '许愿' : 'Make a Wish'}
                  </span>
                )}
              </ParticleButton>
            </div>
            
            {/* 表单完成状态提示 */}
            {!isFormComplete() && (
              <div className='text-center mt-3'>
                <p className='text-zinc-500 text-sm'>
                  {language === 'zh' 
                    ? '请填写愿望标题（2-60字）和描述（≥10字）' 
                    : 'Please fill in wish title (2-60 chars) and description (≥10 chars)'
                  }
                </p>
              </div>
            )}
          </form>
        </div>

        {/* 页脚 */}
        <footer className='mt-12 text-center'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-gray-400 text-sm'>
              © 2025 Cyber Nüwa. All rights reserved.
            </div>
            <div className='text-gray-500 text-xs'>
              🌌{' '}
              {language === 'zh'
                ? '赛博女娲宇宙许愿池'
                : 'Cyber Nuwa Universe Wish Pool'}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
