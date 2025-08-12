'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isInitialized: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// 语言持久化键
const LANGUAGE_STORAGE_KEY = 'cyber-nuwa-language';

// 获取初始语言
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'zh' || stored === 'en') {
      return stored;
    }

    // 检测浏览器语言
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }

    return 'en';
  } catch {
    return 'en';
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化语言 - 修复Hydration问题
  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
    // 延迟设置初始化状态，确保水合完成
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // 设置语言并持久化
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
        // 更新HTML lang属性
        document.documentElement.lang = newLanguage === 'zh' ? 'zh-CN' : 'en';
      } catch (error) {
        // console.warn('Failed to persist language preference:', error);
      }
    }
  }, []);

  // 切换语言
  const toggleLanguage = useCallback(() => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
  }, [language, setLanguage]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    isInitialized,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// 语言检测工具函数
export const detectLanguage = (text: string): Language => {
  const chineseRegex = /[\u4e00-\u9fff]/;
  return chineseRegex.test(text) ? 'zh' : 'en';
};

// 语言格式化工具
export const formatLanguage = (lang: Language): string => {
  return lang === 'zh' ? '中文' : 'English';
};
