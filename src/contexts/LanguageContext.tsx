'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Language, TranslationContextType } from '@/types/translations';
import { translationManager } from '@/locales/translations';

// Create context with default values
const LanguageContext = createContext<TranslationContextType | undefined>(
  undefined
);

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage = 'zh',
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [showSettings, setShowSettings] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string, params?: Record<string, any>): string => {
    let translation = translationManager.getTranslation(key, language);

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }

    return translation;
  };

  // Handle language change
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setShowSettings(false);
  };

  // Toggle auto-translate
  const handleAutoTranslateToggle = () => {
    setAutoTranslate(!autoTranslate);
  };

  // Context value
  const contextValue: TranslationContextType = {
    language,
    setLanguage: handleLanguageChange,
    t,
    showSettings,
    setShowSettings,
    autoTranslate,
    setAutoTranslate: handleAutoTranslateToggle,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage(): TranslationContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for translations only
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}

// Hook for language switching
export function useLanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return { language, setLanguage };
}

// Hook for translation controls
export function useTranslationControls() {
  const { showSettings, setShowSettings, autoTranslate, setAutoTranslate } =
    useLanguage();

  return {
    showSettings,
    setShowSettings,
    autoTranslate,
    setAutoTranslate,
  };
}
