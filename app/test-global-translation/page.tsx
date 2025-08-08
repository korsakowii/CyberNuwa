'use client'

import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../components/TranslationProvider'
import { TranslationControls } from '../../components/TranslationControls'
import { DevOnly } from '../../components/DevOnly'

function TestGlobalTranslationContent() {
  const { language } = useLanguage()
  const { translateText, isTranslating } = useTranslation()
  const [testText, setTestText] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  const handleTestTranslation = async () => {
    if (!testText.trim()) return
    
    try {
      const targetLang = language === 'zh' ? 'en' : 'zh'
      const result = await translateText(testText, targetLang)
      setTranslatedText(result)
    } catch (error) {
      console.error('翻译测试失败:', error)
      setTranslatedText('翻译失败')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">全局翻译功能测试</h1>
        
        {/* 测试说明 */}
        <div className="mb-8 p-6 bg-zinc-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">测试说明</h2>
          <p className="text-zinc-300 mb-4">
            这个页面用于测试全局翻译功能。您可以：
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>在下方输入框中输入要翻译的文本</li>
            <li>点击"测试翻译"按钮进行单文本翻译测试</li>
            <li>使用右下角的翻译控件进行全局页面翻译</li>
            <li>观察页面上的所有文本是否被正确翻译</li>
          </ul>
        </div>

        {/* 单文本翻译测试 */}
        <div className="mb-8 p-6 bg-zinc-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">单文本翻译测试</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                输入要翻译的文本:
              </label>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder={language === 'zh' ? '请输入中文或英文文本...' : 'Please enter Chinese or English text...'}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>
            
            <button
              onClick={handleTestTranslation}
              disabled={!testText.trim() || isTranslating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isTranslating ? '翻译中...' : '测试翻译'}
            </button>
            
            {translatedText && (
              <div className="p-4 bg-zinc-700 rounded-lg">
                <h3 className="font-semibold mb-2">翻译结果:</h3>
                <p className="text-zinc-200">{translatedText}</p>
              </div>
            )}
          </div>
        </div>

        {/* 示例文本 */}
        <div className="mb-8 p-6 bg-zinc-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">示例文本</h2>
          <div className="space-y-4">
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">中文示例:</h3>
              <p className="text-zinc-200">
                这是一个中文示例文本，用于测试全局翻译功能。您可以点击右下角的翻译按钮来翻译整个页面。
              </p>
            </div>
            
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">English Example:</h3>
              <p className="text-zinc-200">
                This is an English example text for testing global translation functionality. You can click the translation button in the bottom right to translate the entire page.
              </p>
            </div>
            
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">混合文本示例:</h3>
              <p className="text-zinc-200">
                这是一个混合文本示例，包含中文和English混合内容。This demonstrates mixed language content.
              </p>
            </div>
          </div>
        </div>

        {/* 当前状态 */}
        <div className="p-6 bg-zinc-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">当前状态</h2>
          <div className="space-y-2 text-zinc-300">
            <p><strong>当前语言:</strong> {language === 'zh' ? '中文' : 'English'}</p>
            <p><strong>翻译状态:</strong> {isTranslating ? '翻译中...' : '空闲'}</p>
            <p><strong>页面URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
          </div>
        </div>
      </div>
      
      {/* 翻译控件 */}
      <TranslationControls />
    </div>
  )
}

export default function TestGlobalTranslation() {
  return (
    <DevOnly>
      <TestGlobalTranslationContent />
    </DevOnly>
  )
} 