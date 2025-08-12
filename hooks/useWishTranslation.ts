import { useState, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface TranslationCache {
  [key: string]: {
    [targetLang: string]: string
  }
}

export function useWishTranslation() {
  const { language } = useLanguage()
  const [translationCache, setTranslationCache] = useState<TranslationCache>({})
  const [isTranslating, setIsTranslating] = useState(false)

  // 翻译文本
  const translateText = useCallback(async (text: string, targetLang: string, sourceLang?: string): Promise<string> => {
    if (!text || text.trim() === '') return text
    
    // 检查缓存
    const cacheKey = `${text}_${sourceLang || 'auto'}`
    if (translationCache[cacheKey]?.[targetLang]) {
      return translationCache[cacheKey][targetLang]
    }

    // 如果目标语言与源语言相同，不需要翻译
    if (sourceLang === targetLang) {
      return text
    }

    try {
      setIsTranslating(true)
      
      const response = await fetch('/api/translation/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          target_lang: targetLang,
          source_lang: sourceLang || 'auto',
        }),
      })

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`)
      }

      const result = await response.json()
      const translatedText = result.translated_text || text

      // 更新缓存
      setTranslationCache(prev => ({
        ...prev,
        [cacheKey]: {
          ...prev[cacheKey],
          [targetLang]: translatedText
        }
      }))

      return translatedText
    } catch (error) {
      console.error('Translation error:', error)
      return text // 翻译失败时返回原文
    } finally {
      setIsTranslating(false)
    }
  }, [translationCache])

  // 翻译愿望内容
  const translateWish = useCallback(async (wish: any) => {
    const targetLang = language === 'zh' ? 'zh' : 'en'
    
    // 如果愿望已经是目标语言，直接返回
    if (wish.language === targetLang) {
      return wish
    }

    try {
      // 获取源语言内容（假设是中文）
      const sourceTitle = wish.title?.zh || wish.title || ''
      const sourceDescription = wish.description?.zh || wish.description || ''
      
      // 翻译标题和描述
      const [translatedTitle, translatedDescription] = await Promise.all([
        translateText(sourceTitle, targetLang, 'zh'),
        translateText(sourceDescription, targetLang, 'zh')
      ])

      // 更新多语言字段
      const updatedWish = {
        ...wish,
        title: {
          ...wish.title,
          [targetLang]: translatedTitle
        },
        description: {
          ...wish.description,
          [targetLang]: translatedDescription
        },
        language: targetLang
      }

      return updatedWish
    } catch (error) {
      console.error('Wish translation error:', error)
      return wish
    }
  }, [language, translateText])

  // 批量翻译愿望列表
  const translateWishes = useCallback(async (wishes: any[]) => {
    const translatedWishes = await Promise.all(
      wishes.map(wish => translateWish(wish))
    )
    return translatedWishes
  }, [translateWish])

  return {
    translateText,
    translateWish,
    translateWishes,
    isTranslating,
    clearCache: () => setTranslationCache({})
  }
}
