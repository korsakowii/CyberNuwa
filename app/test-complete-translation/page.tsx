'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from '@/components/TranslationProvider'
import { useLanguage } from '@/contexts/LanguageContext'
import { TranslationControls } from '@/components/TranslationControls'
import { DevOnly } from '../../components/DevOnly'

function TestCompleteTranslationContent() {
  const { translateText, autoTranslatePage, isTranslating } = useTranslation()
  const { language, setLanguage } = useLanguage()
  
  const [testData, setTestData] = useState({
    title: { zh: '测试标题', en: 'Test Title' },
    description: { zh: '这是一个测试描述', en: 'This is a test description' },
    author: { zh: '测试用户', en: 'Test User' }
  })

  const [translationLog, setTranslationLog] = useState<string[]>([])

  const addLog = (message: string) => {
    setTranslationLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleTranslatePage = async () => {
    addLog('开始页面翻译...')
    try {
      await autoTranslatePage((newLang) => {
        setLanguage(newLang)
        addLog(`语言状态已更新为: ${newLang}`)
      })
      addLog('页面翻译完成')
    } catch (error) {
      addLog(`翻译失败: ${error}`)
    }
  }

  const handleManualLanguageSwitch = () => {
    const newLang = language === 'zh' ? 'en' : 'zh'
    setLanguage(newLang)
    addLog(`手动切换语言为: ${newLang}`)
  }

  useEffect(() => {
    addLog(`页面加载，当前语言: ${language}`)
  }, [])

  useEffect(() => {
    addLog(`语言状态变化: ${language}`)
  }, [language])

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'zh' ? '完整翻译测试' : 'Complete Translation Test'}
          </h1>
          <p className="text-zinc-400">
            {language === 'zh' ? '测试React组件状态更新和翻译功能' : 'Test React component state updates and translation'}
          </p>
        </div>

        {/* 语言状态显示 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '当前语言状态' : 'Current Language State'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '标题' : 'Title'}
              </h3>
              <p>{testData.title[language]}</p>
            </div>
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '描述' : 'Description'}
              </h3>
              <p>{testData.description[language]}</p>
            </div>
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '作者' : 'Author'}
              </h3>
              <p>{testData.author[language]}</p>
            </div>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '翻译控制' : 'Translation Controls'}
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleTranslatePage}
              disabled={isTranslating}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 rounded-lg font-medium"
            >
              {isTranslating 
                ? (language === 'zh' ? '翻译中...' : 'Translating...')
                : (language === 'zh' ? '🌐 翻译页面' : '🌐 Translate Page')
              }
            </button>
            
            <button
              onClick={handleManualLanguageSwitch}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium"
            >
              {language === 'zh' ? '🔄 手动切换语言' : '🔄 Manual Language Switch'}
            </button>
          </div>
        </div>

        {/* 翻译日志 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '翻译日志' : 'Translation Log'}
          </h2>
          <div className="bg-zinc-900 p-4 rounded-lg max-h-64 overflow-y-auto">
            {translationLog.length === 0 ? (
              <p className="text-zinc-500">
                {language === 'zh' ? '暂无日志' : 'No logs yet'}
              </p>
            ) : (
              <div className="space-y-1">
                {translationLog.map((log, index) => (
                  <div key={index} className="text-sm text-zinc-300 font-mono">
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setTranslationLog([])}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
          >
            {language === 'zh' ? '清除日志' : 'Clear Logs'}
          </button>
        </div>

        {/* 状态信息 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '状态信息' : 'Status Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '当前语言' : 'Current Language'}
              </h3>
              <p className="text-blue-400">{language}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '翻译状态' : 'Translation Status'}
              </h3>
              <p className={isTranslating ? 'text-yellow-400' : 'text-green-400'}>
                {isTranslating 
                  ? (language === 'zh' ? '翻译中' : 'Translating')
                  : (language === 'zh' ? '空闲' : 'Idle')
                }
              </p>
            </div>
          </div>
        </div>

        {/* 翻译控件 */}
        <TranslationControls />
      </div>
    </div>
  )
} 

export default function TestCompleteTranslation() {
  return (
    <DevOnly>
      <TestCompleteTranslationContent />
    </DevOnly>
  )
}