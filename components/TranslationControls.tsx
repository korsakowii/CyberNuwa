'use client'

import React, { useState } from 'react'
import { useTranslation } from './TranslationProvider'
import { useLanguage } from '@/contexts/LanguageContext'

export function TranslationControls() {
  const { 
    translateText, 
    autoTranslatePage, 
    isTranslating, 
    autoTranslate, 
    setAutoTranslate 
  } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const [showSettings, setShowSettings] = useState(false)
  const [translationProgress, setTranslationProgress] = useState(0)

  const handleTranslatePage = async () => {
    try {
      setTranslationProgress(0)
      // 调用全局翻译功能
      await autoTranslatePage((newLang) => {
        setLanguage(newLang as 'zh' | 'en')
        setTranslationProgress(100)
      })
    } catch (error) {
      console.error('全局翻译失败:', error)
      // 如果翻译失败，直接切换语言
      const newLang = language === 'zh' ? 'en' : 'zh'
      setLanguage(newLang)
      setTranslationProgress(0)
    }
  }

  const handleToggleAutoTranslate = () => {
    setAutoTranslate(!autoTranslate)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-zinc-800/90 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-3">
          {/* 一键翻译按钮 */}
          <button
            onClick={handleTranslatePage}
            disabled={isTranslating}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors relative overflow-hidden"
          >
            {isTranslating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm text-white">翻译中...</span>
                {translationProgress > 0 && (
                  <div className="absolute bottom-0 left-0 h-1 bg-green-400 transition-all duration-300" 
                       style={{ width: `${translationProgress}%` }}></div>
                )}
              </>
            ) : (
              <>
                <span className="text-lg">🌐</span>
                <span className="text-sm text-white">
                  {language === 'zh' ? '翻译为英文' : 'Translate to Chinese'}
                </span>
              </>
            )}
          </button>

          {/* 设置按钮 */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-lg">⚙️</span>
          </button>
        </div>

        {/* 设置面板 */}
        {showSettings && (
          <div className="mt-3 pt-3 border-t border-zinc-700">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={autoTranslate}
                  onChange={handleToggleAutoTranslate}
                  className="rounded border-zinc-600 bg-zinc-700 text-blue-600 focus:ring-blue-500"
                />
                <span>{language === 'zh' ? '自动翻译页面' : 'Auto Translate Page'}</span>
              </label>
              
              <div className="text-xs text-zinc-500">
                {language === 'zh' ? '当前语言: ' : 'Current Language: '}{language === 'zh' ? '中文' : 'English'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 翻译按钮组件（用于表单等）
export function TranslateButton({ 
  text, 
  onTranslate, 
  className = "" 
}: { 
  text: string
  onTranslate: (translated: string) => void
  className?: string 
}) {
  const { translateText, isTranslating } = useTranslation()
  const { language } = useLanguage()

  const handleTranslate = async () => {
    // 检测文本语言，然后翻译为另一种语言
    const isChinese = /[\u4e00-\u9fff]/.test(text)
    const targetLang = isChinese ? 'en' : 'zh'
    const translated = await translateText(text, targetLang)
    onTranslate(translated)
  }

  return (
    <button
      onClick={handleTranslate}
      disabled={isTranslating}
      className={`flex items-center space-x-1 px-2 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-not-allowed rounded transition-colors ${className}`}
    >
      {isTranslating ? (
        <>
          <div className="animate-spin rounded-full h-3 w-3 border-b border-white"></div>
          <span>{language === 'zh' ? '翻译中' : 'Translating'}</span>
        </>
      ) : (
        <>
          <span>🌐</span>
          <span>{language === 'zh' ? '翻译' : 'Translate'}</span>
        </>
      )}
    </button>
  )
}

// 智能翻译输入框
export function SmartInput({ 
  value, 
  onChange, 
  placeholder, 
  className = "" 
}: { 
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string 
}) {
  const { translateText, isTranslating } = useTranslation()
  const { language } = useLanguage()

  const handleTranslate = async () => {
    if (value.trim()) {
      // 检测文本语言，然后翻译为另一种语言
      const isChinese = /[\u4e00-\u9fff]/.test(value)
      const targetLang = isChinese ? 'en' : 'zh'
      const translated = await translateText(value, targetLang)
      onChange(translated)
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 ${className}`}
      />
      {value.trim() && (
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-zinc-400 hover:text-white disabled:text-zinc-600 transition-colors"
        >
          {isTranslating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b border-white"></div>
          ) : (
            <span className="text-sm">🌐</span>
          )}
        </button>
      )}
    </div>
  )
}

// 智能翻译文本区域
export function SmartTextarea({ 
  value, 
  onChange, 
  placeholder, 
  rows = 4,
  className = "" 
}: { 
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  className?: string 
}) {
  const { translateText, isTranslating } = useTranslation()
  const { language } = useLanguage()

  const handleTranslate = async () => {
    if (value.trim()) {
      // 检测文本语言，然后翻译为另一种语言
      const isChinese = /[\u4e00-\u9fff]/.test(value)
      const targetLang = isChinese ? 'en' : 'zh'
      const translated = await translateText(value, targetLang)
      onChange(translated)
    }
  }

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 resize-none ${className}`}
      />
      {value.trim() && (
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="absolute right-2 top-2 p-1 text-zinc-400 hover:text-white disabled:text-zinc-600 transition-colors"
        >
          {isTranslating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b border-white"></div>
          ) : (
            <span className="text-sm">🌐</span>
          )}
        </button>
      )}
    </div>
  )
} 