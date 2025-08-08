'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { DevOnly } from '../../components/DevOnly'

function TestLanguageStateContent() {
  const { language, setLanguage } = useLanguage()
  
  const [testData] = useState({
    title: { 
      zh: '测试标题', 
      en: 'Test Title' 
    },
    description: { 
      zh: '这是一个测试描述', 
      en: 'This is a test description' 
    }
  })

  const [renderCount, setRenderCount] = useState(0)

  useEffect(() => {
    setRenderCount(prev => prev + 1)
  }, [language])

  const handleLanguageSwitch = () => {
    const newLang = language === 'zh' ? 'en' : 'zh'
    console.log(`Switching language from ${language} to ${newLang}`)
    setLanguage(newLang)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'zh' ? '语言状态测试' : 'Language State Test'}
          </h1>
          <p className="text-zinc-400">
            {language === 'zh' ? '测试React语言状态是否正确工作' : 'Test if React language state works correctly'}
          </p>
        </div>

        {/* 当前状态 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '当前状态' : 'Current State'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '语言' : 'Language'}
              </h3>
              <p className="text-blue-400">{language}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '渲染次数' : 'Render Count'}
              </h3>
              <p className="text-green-400">{renderCount}</p>
            </div>
          </div>
        </div>

        {/* 测试数据 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '测试数据' : 'Test Data'}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '标题' : 'Title'}
              </h3>
              <p className="text-lg">{testData.title[language]}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '描述' : 'Description'}
              </h3>
              <p>{testData.description[language]}</p>
            </div>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '控制' : 'Controls'}
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleLanguageSwitch}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
            >
              {language === 'zh' ? '🔄 切换语言' : '🔄 Switch Language'}
            </button>
            
            <button
              onClick={() => setLanguage('zh')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium"
            >
              🇨🇳 设置为中文
            </button>
            
            <button
              onClick={() => setLanguage('en')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
            >
              🇺🇸 Set to English
            </button>
          </div>
        </div>

        {/* 调试信息 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '调试信息' : 'Debug Info'}
          </h2>
          <div className="bg-zinc-900 p-4 rounded-lg">
            <pre className="text-sm text-zinc-300">
              {JSON.stringify({
                currentLanguage: language,
                renderCount,
                timestamp: new Date().toISOString()
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 

export default function TestLanguageState() {
  return (
    <DevOnly>
      <TestLanguageStateContent />
    </DevOnly>
  )
}