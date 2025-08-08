'use client'

import React, { useState } from 'react'
import { useTranslation } from '@/components/TranslationProvider'
import { useLanguage } from '@/contexts/LanguageContext'
import { TranslationControls } from '@/components/TranslationControls'
import { DevOnly } from '../../components/DevOnly'

function TestTranslationContent() {
  const { translateText, translateForm, autoTranslatePage, isTranslating } = useTranslation()
  const { language, setLanguage } = useLanguage()
  
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: ''
  })
  const [translatedForm, setTranslatedForm] = useState<any>({})

  const handleTranslateText = async () => {
    if (inputText.trim()) {
      const result = await translateText(inputText)
      setTranslatedText(result)
    }
  }

  const handleTranslateForm = async () => {
    const result = await translateForm(formData)
    setTranslatedForm(result)
  }

  const handleAutoTranslate = async () => {
    await autoTranslatePage()
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">翻译功能测试</h1>
          <p className="text-zinc-400">测试CyberNuwa的一键翻译功能</p>
        </div>

        {/* 语言切换 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">语言设置</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage('zh')}
              className={`px-4 py-2 rounded-lg ${language === 'zh' ? 'bg-blue-600' : 'bg-zinc-700'}`}
            >
              🇨🇳 中文
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg ${language === 'en' ? 'bg-blue-600' : 'bg-zinc-700'}`}
            >
              🇺🇸 English
            </button>
          </div>
          <p className="text-sm text-zinc-400 mt-2">
            当前语言: {language === 'zh' ? '中文' : 'English'}
          </p>
        </div>

        {/* 单文本翻译测试 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">单文本翻译测试</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">输入文本:</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="输入要翻译的文本..."
                className="w-full p-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white"
                rows={3}
              />
            </div>
            <button
              onClick={handleTranslateText}
              disabled={isTranslating || !inputText.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 rounded-lg"
            >
              {isTranslating ? '翻译中...' : '翻译文本'}
            </button>
            {translatedText && (
              <div>
                <label className="block text-sm font-medium mb-2">翻译结果:</label>
                <div className="p-3 bg-zinc-700 border border-zinc-600 rounded-lg">
                  {translatedText}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 表单翻译测试 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">表单翻译测试</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">标题:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="输入标题..."
                  className="w-full p-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">描述:</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="输入描述..."
                  className="w-full p-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">作者:</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  placeholder="输入作者..."
                  className="w-full p-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white"
                />
              </div>
            </div>
            <button
              onClick={handleTranslateForm}
              disabled={isTranslating}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-zinc-600 rounded-lg"
            >
              {isTranslating ? '翻译中...' : '翻译表单'}
            </button>
            {Object.keys(translatedForm).length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">翻译结果:</label>
                <div className="p-3 bg-zinc-700 border border-zinc-600 rounded-lg">
                  <pre className="text-sm">{JSON.stringify(translatedForm, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 页面翻译测试 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">页面翻译测试</h2>
          <p className="text-zinc-400 mb-4">
            点击下面的按钮将自动翻译整个页面的内容
          </p>
          <button
            onClick={handleAutoTranslate}
            disabled={isTranslating}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-600 rounded-lg text-lg font-medium"
          >
            {isTranslating ? '翻译中...' : '🌐 一键翻译页面'}
          </button>
        </div>

        {/* 测试文本 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">测试文本</h2>
          <div className="space-y-4">
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">中文测试:</h3>
              <p>这是一个中文测试文本，用于验证翻译功能是否正常工作。</p>
            </div>
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">English Test:</h3>
              <p>This is an English test text to verify that the translation function works properly.</p>
            </div>
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">混合文本 Mixed Text:</h3>
              <p>这是混合的中英文文本 This is mixed Chinese and English text.</p>
            </div>
          </div>
        </div>

        {/* 翻译控件 */}
        <TranslationControls />
      </div>
    </div>
  )
} 

export default function TestTranslation() {
  return (
    <DevOnly>
      <TestTranslationContent />
    </DevOnly>
  )
}