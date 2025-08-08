'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface TranslationContextType {
  // 翻译功能
  translateText: (text: string, targetLang?: string) => Promise<string>
  translateForm: (formData: any) => Promise<any>
  autoTranslatePage: (onLanguageChange?: (newLang: string) => void) => Promise<void>
  
  // 翻译状态
  isTranslating: boolean
  translationCache: Map<string, string>
  
  // 智能翻译设置
  autoTranslate: boolean
  setAutoTranslate: (enabled: boolean) => void
  saveTranslation: (original: string, translated: string, lang: string) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage()
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationCache, setTranslationCache] = useState<Map<string, string>>(new Map())
  const [autoTranslate, setAutoTranslate] = useState(false)

  // 从localStorage加载翻译缓存
  useEffect(() => {
    const cached = localStorage.getItem('translation_cache')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setTranslationCache(new Map(Object.entries(parsed)))
      } catch (error) {
        console.error('Failed to load translation cache:', error)
      }
    }
  }, [])

  // 保存翻译缓存到localStorage
  const saveCacheToStorage = (cache: Map<string, string>) => {
    try {
      const cacheObj = Object.fromEntries(cache)
      localStorage.setItem('translation_cache', JSON.stringify(cacheObj))
    } catch (error) {
      console.error('Failed to save translation cache:', error)
    }
  }

  // 翻译单个文本
  const translateText = async (text: string, targetLang?: string): Promise<string> => {
    if (!text || !text.trim()) return text

    const lang = targetLang || language
    const cacheKey = `${text}_${lang}`

    // 检查缓存
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!
    }

    // 检测源语言，但不阻止翻译
    const detectedLang = detectLanguage(text)
    console.log(`Translating "${text}" from ${detectedLang} to ${lang}`)

    setIsTranslating(true)

    try {
      // 优先使用后端翻译API
      const response = await fetch('http://localhost:8001/api/translation/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          target_lang: lang,
          source_lang: 'auto'
        })
      })

      if (response.ok) {
        const result = await response.json()
        const translatedText = result.translated_text

        // 缓存结果
        const newCache = new Map(translationCache)
        newCache.set(cacheKey, translatedText)
        setTranslationCache(newCache)
        saveCacheToStorage(newCache)

        console.log(`Translation successful: "${text}" → "${translatedText}"`)
        return translatedText
      } else {
        console.error('Backend translation failed:', response.status)
        // 后端翻译失败，使用前端翻译
        return await translateWithFrontendAPI(text, lang)
      }
    } catch (error) {
      console.error('Backend translation failed, using frontend fallback:', error)
      return await translateWithFrontendAPI(text, lang)
    } finally {
      setIsTranslating(false)
    }
  }

  // 前端翻译API（备用方案）
  const translateWithFrontendAPI = async (text: string, targetLang: string): Promise<string> => {
    try {
      // 检测源语言
      const detectedLang = detectLanguage(text)
      const sourceLang = detectedLang === 'zh' ? 'zh' : 'en'
      
      const response = await fetch('https://de.libretranslate.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text'
        })
      })

      if (response.ok) {
        const result = await response.json()
        return result.translatedText || text
      }
    } catch (error) {
      console.error('Frontend translation failed:', error)
    }

    return text // 翻译失败时返回原文
  }

  // 翻译表单数据
  const translateForm = async (formData: any): Promise<any> => {
    const translatedData = { ...formData }

    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string' && value.trim()) {
        translatedData[key] = await translateText(value)
      }
    }

    return translatedData
  }



  // 自动翻译页面
  const autoTranslatePage = async (onLanguageChange?: (newLang: string) => void): Promise<void> => {
    if (isTranslating) return

    setIsTranslating(true)

    try {
      const targetLang = language === 'zh' ? 'en' : 'zh'
      const newLanguage = targetLang
      
      console.log(`开始全局翻译: ${language} → ${newLanguage}`)
      
      // 获取页面中所有需要翻译的文本节点
      const textNodes = getTextNodes(document.body)
      const textsToTranslate: { node: Text; text: string }[] = []
      
      // 收集需要翻译的文本，去重
      const uniqueTexts = new Set<string>()
      for (const node of textNodes) {
        const text = node.textContent?.trim()
        if (text && shouldTranslateText(text) && !uniqueTexts.has(text)) {
          uniqueTexts.add(text)
          textsToTranslate.push({ node, text })
        }
      }
      
      console.log(`找到 ${textsToTranslate.length} 个唯一文本需要翻译`)
      
      if (textsToTranslate.length === 0) {
        // 如果没有需要翻译的文本，直接切换语言
        if (onLanguageChange) {
          onLanguageChange(newLanguage)
        }
        return
      }
      
      // 使用批量翻译API
      const texts = textsToTranslate.map(item => item.text)
      
      try {
        const response = await fetch('http://localhost:8001/api/translation/translate_batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            texts,
            target_lang: targetLang,
            source_lang: 'auto'
          })
        })

        if (response.ok) {
          const result = await response.json()
          const translationMap = new Map()
          
          // 创建翻译映射
          result.results.forEach((item: any) => {
            translationMap.set(item.original_text, item.translated_text)
          })
          
          // 更新所有文本节点
          const allNodes = getTextNodes(document.body)
          allNodes.forEach(node => {
            const text = node.textContent?.trim()
            if (text && translationMap.has(text)) {
              const translatedText = translationMap.get(text)
              if (translatedText && translatedText !== text) {
                node.textContent = translatedText
                console.log(`翻译: "${text}" → "${translatedText}"`)
              }
            }
          })
          
          console.log(`批量翻译完成，共翻译 ${result.results.length} 个文本`)
        } else {
          throw new Error('批量翻译API失败')
        }
      } catch (error) {
        console.error('批量翻译失败，使用单文本翻译:', error)
        
        // 回退到单文本翻译
        const batchSize = 10 // 增加批次大小
        for (let i = 0; i < textsToTranslate.length; i += batchSize) {
          const batch = textsToTranslate.slice(i, i + batchSize)
          
          const translationPromises = batch.map(async ({ node, text }) => {
            try {
              const translatedText = await translateText(text, targetLang)
              if (translatedText && translatedText !== text) {
                // 更新所有相同的文本节点
                const allNodes = getTextNodes(document.body)
                allNodes.forEach(n => {
                  if (n.textContent?.trim() === text) {
                    n.textContent = translatedText
                  }
                })
              }
            } catch (error) {
              console.warn(`翻译失败: "${text}"`, error)
            }
          })
          
          await Promise.all(translationPromises)
          
          // 减少延迟
          if (i + batchSize < textsToTranslate.length) {
            await new Promise(resolve => setTimeout(resolve, 50))
          }
        }
      }
      
      // 通知组件更新语言状态
      if (onLanguageChange) {
        onLanguageChange(newLanguage)
      }
      
      console.log('全局翻译完成')
    } catch (error) {
      console.error('全局翻译失败:', error)
      // 如果翻译失败，直接切换语言
      if (onLanguageChange) {
        const targetLang = language === 'zh' ? 'en' : 'zh'
        onLanguageChange(targetLang)
      }
    } finally {
      setIsTranslating(false)
    }
  }

  // 保存翻译结果
  const saveTranslation = (original: string, translated: string, lang: string) => {
    const cacheKey = `${original}_${lang}`
    const newCache = new Map(translationCache)
    newCache.set(cacheKey, translated)
    setTranslationCache(newCache)
    saveCacheToStorage(newCache)
  }

  // 语言检测
  const detectLanguage = (text: string): string => {
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length
    const englishChars = (text.match(/[a-zA-Z]/g) || []).length
    
    return chineseChars > englishChars ? 'zh' : 'en'
  }

  // 判断文本是否需要翻译
  const shouldTranslateText = (text: string): boolean => {
    // 过滤掉不需要翻译的文本
    const skipPatterns = [
      /^\d+$/, // 纯数字
      /^\d{4}-\d{2}-\d{2}$/, // 日期格式
      /^[❤️💬👁️✨👤•]+$/, // 纯emoji
      /^[a-zA-Z0-9_]+$/, // 纯英文数字下划线（用户名等）
      /^[a-zA-Z0-9_]+_[0-9]+$/, // 带数字的用户名
      /^[•\s]+$/, // 纯空格和点
      /^[0-9\s]+$/, // 纯数字和空格
      /^[^\u4e00-\u9fff\w\s]+$/, // 纯特殊字符
      /^[a-zA-Z0-9_]+$/, // 纯英文数字下划线
      /^[0-9]+$/, // 纯数字
      /^[•]+$/, // 纯点
      /^[❤️]+$/, // 纯心形
      /^[💬]+$/, // 纯对话
      /^[👁️]+$/, // 纯眼睛
      /^[✨]+$/, // 纯星星
      /^[👤]+$/, // 纯用户
    ]

    // 如果文本太短（少于2个字符），不翻译
    if (text.length < 2) return false

    // 如果匹配任何跳过模式，不翻译
    for (const pattern of skipPatterns) {
      if (pattern.test(text)) {
        console.log(`跳过翻译: "${text}" (匹配模式: ${pattern})`)
        return false
      }
    }

    // 如果文本包含中文字符或英文字符，需要翻译
    const hasChinese = /[\u4e00-\u9fff]/.test(text)
    const hasEnglish = /[a-zA-Z]/.test(text)
    
    const shouldTranslate = hasChinese || hasEnglish
    if (shouldTranslate) {
      console.log(`需要翻译: "${text}" (中文: ${hasChinese}, 英文: ${hasEnglish})`)
    }
    
    return shouldTranslate
  }

  // 获取文本节点
  const getTextNodes = (element: Node): Text[] => {
    const textNodes: Text[] = []
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement
          if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
            return NodeFilter.FILTER_REJECT
          }
          return node.textContent && node.textContent.trim() ? 
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }
      }
    )

    let node
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }

    return textNodes
  }

  // 自动翻译功能
  useEffect(() => {
    if (autoTranslate) {
      autoTranslatePage()
    }
  }, [language, autoTranslate])

  const value: TranslationContextType = {
    translateText,
    translateForm,
    autoTranslatePage,
    isTranslating,
    translationCache,
    autoTranslate,
    setAutoTranslate,
    saveTranslation
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
} 