'use client'

import { useState } from 'react'
import { useTranslation } from '../../components/TranslationProvider'
import { useLanguage } from '../../contexts/LanguageContext'
import { TranslationControls } from '../../components/TranslationControls'
import { DevOnly } from '../../components/DevOnly'

function TestSimpleContent() {
  const { translateText, isTranslating } = useTranslation()
  const { language } = useLanguage()
  const [testText, setTestText] = useState('Hello world')
  const [translatedText, setTranslatedText] = useState('')

  const handleTranslate = async () => {
    const result = await translateText(testText, language === 'zh' ? 'en' : 'zh')
    setTranslatedText(result)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">翻译功能测试</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">测试文本:</label>
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg"
              placeholder="输入要翻译的文本"
            />
          </div>

          <div>
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-lg"
            >
              {isTranslating ? '翻译中...' : '翻译'}
            </button>
          </div>

          {translatedText && (
            <div>
              <label className="block text-sm font-medium mb-2">翻译结果:</label>
              <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg">
                {translatedText}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">页面翻译测试</h2>
            <p>这是一个英文段落，用于测试页面翻译功能。</p>
            <p>This is an English paragraph for testing page translation.</p>
            <p>点击左下角的翻译按钮来翻译整个页面。</p>
          </div>
        </div>
      </div>

      <TranslationControls />
    </div>
  )
} 

export default function TestSimple() {
  return (
    <DevOnly>
      <TestSimpleContent />
    </DevOnly>
  )
}