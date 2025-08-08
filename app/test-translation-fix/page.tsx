'use client'

import { useState } from 'react'
import { useTranslation } from '../../components/TranslationProvider'
import { useLanguage } from '../../contexts/LanguageContext'
import { DevOnly } from '../../components/DevOnly'

function TestTranslationFixContent() {
  const { translateText, autoTranslatePage, isTranslating } = useTranslation()
  const { language } = useLanguage()
  const [testText, setTestText] = useState('你好世界')
  const [translatedText, setTranslatedText] = useState('')
  const [result, setResult] = useState('')

  const handleTranslate = async () => {
    try {
      const translated = await translateText(testText, language === 'zh' ? 'en' : 'zh')
      setTranslatedText(translated)
      setResult(`翻译成功: "${testText}" → "${translated}"`)
    } catch (error) {
      setResult(`翻译失败: ${error}`)
    }
  }

  const handlePageTranslate = async () => {
    try {
      await autoTranslatePage()
      setResult('页面翻译完成')
    } catch (error) {
      setResult(`页面翻译失败: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          翻译功能测试页面
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">单文本翻译测试</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">测试文本:</label>
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="输入要翻译的文本"
            />
          </div>
          
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isTranslating ? '翻译中...' : '翻译文本'}
            </button>
            
            <button
              onClick={handlePageTranslate}
              disabled={isTranslating}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {isTranslating ? '翻译中...' : '翻译整个页面'}
            </button>
          </div>
          
          {translatedText && (
            <div className="p-3 bg-gray-50 rounded">
              <strong>翻译结果:</strong> {translatedText}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">测试结果</h2>
          <div className="p-3 bg-gray-50 rounded">
            <pre className="whitespace-pre-wrap">{result || '等待测试...'}</pre>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">当前状态</h2>
          <div className="space-y-2">
            <p><strong>当前语言:</strong> {language}</p>
            <p><strong>翻译状态:</strong> {isTranslating ? '翻译中' : '空闲'}</p>
            <p><strong>目标语言:</strong> {language === 'zh' ? 'en' : 'zh'}</p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-600">
          <p>打开浏览器控制台查看详细的翻译日志</p>
        </div>
      </div>
    </div>
  )
} 

export default function TestTranslationFix() {
  return (
    <DevOnly>
      <TestTranslationFixContent />
    </DevOnly>
  )
}