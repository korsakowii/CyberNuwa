'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  useLanguage,
  detectLanguage,
} from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TranslationControlsProps {
  className?: string;
  showSettings?: boolean;
}

export function TranslationControls({
  className,
  showSettings: defaultShowSettings = false,
}: TranslationControlsProps) {
  const { language, toggleLanguage, isInitialized } = useLanguage();
  const [showSettings, setShowSettings] = useState(defaultShowSettings);
  const [autoTranslate, setAutoTranslate] = useState(false);

  const handleToggleSettings = useCallback(() => {
    setShowSettings(prev => !prev);
  }, []);

  const handleToggleAutoTranslate = useCallback(() => {
    setAutoTranslate(prev => !prev);
  }, []);

  const toggleButtonText = useMemo(() => {
    return language === 'zh' ? '切换为英文' : 'Switch to Chinese';
  }, [language]);

  const currentLanguageText = useMemo(() => {
    return language === 'zh' ? '中文' : 'English';
  }, [language]);

  if (!isInitialized) {
    return null;
  }

  return (
    <div className={cn('fixed bottom-4 left-4 z-50', className)}>
      <div className='bg-zinc-800/90 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg p-4'>
        <div className='flex items-center space-x-3'>
          {/* 一键翻译按钮 */}
          <Button
            onClick={toggleLanguage}
            variant='primary'
            size='md'
            className='flex items-center space-x-2'
          >
            <span className='text-lg'>🌐</span>
            <span className='text-sm'>{toggleButtonText}</span>
          </Button>

          {/* 设置按钮 */}
          <Button
            onClick={handleToggleSettings}
            variant='ghost'
            size='sm'
            className='p-2'
          >
            <span className='text-lg'>⚙️</span>
          </Button>
        </div>

        {/* 设置面板 */}
        {showSettings && (
          <div className='mt-3 pt-3 border-t border-zinc-700'>
            <div className='space-y-2'>
              <label className='flex items-center space-x-2 text-sm text-zinc-300'>
                <input
                  type='checkbox'
                  checked={autoTranslate}
                  onChange={handleToggleAutoTranslate}
                  className='rounded border-zinc-600 bg-zinc-700 text-blue-600 focus:ring-blue-500'
                />
                <span>
                  {language === 'zh' ? '自动翻译页面' : 'Auto Translate Page'}
                </span>
              </label>

              <div className='text-xs text-zinc-500'>
                {language === 'zh' ? '当前语言: ' : 'Current Language: '}
                {currentLanguageText}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 翻译按钮组件（用于表单等）
interface TranslateButtonProps {
  text: string;
  onTranslate: (translated: string) => void;
  className?: string;
}

export function TranslateButton({
  text,
  onTranslate,
  className,
}: TranslateButtonProps) {
  const { language } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!text.trim()) {
      return;
    }

    setIsTranslating(true);
    try {
      // 检测文本语言，然后翻译为另一种语言
      const detectedLang = detectLanguage(text);
      // const targetLang = detectedLang === 'zh' ? 'en' : 'zh';

      // 这里可以集成真实的翻译API
      // 目前使用模拟翻译
      const _translated =
        detectedLang === 'zh'
          ? `[English translation of: ${text}]`
          : `[中文翻译: ${text}]`;

      onTranslate(_translated);
    } catch (error) {
      // // console.error('翻译失败:', error);
    } finally {
      setIsTranslating(false);
    }
  }, [text, onTranslate]);

  const buttonText = useMemo(() => {
    return language === 'zh' ? '翻译' : 'Translate';
  }, [language]);

  const loadingText = useMemo(() => {
    return language === 'zh' ? '翻译中' : 'Translating';
  }, [language]);

  return (
    <Button
      onClick={handleTranslate}
      disabled={isTranslating || !text.trim()}
      loading={isTranslating}
      variant='secondary'
      size='sm'
      className={cn('flex items-center space-x-1', className)}
    >
      {isTranslating ? (
        <>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>🌐</span>
          <span>{buttonText}</span>
        </>
      )}
    </Button>
  );
}

// 智能翻译输入框
interface SmartInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SmartInput({
  value,
  onChange,
  placeholder,
  className,
}: SmartInputProps) {
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!value.trim()) {
      return;
    }

    setIsTranslating(true);
    try {
      // 检测文本语言，然后翻译为另一种语言
      const detectedLang = detectLanguage(value);
      const targetLang = detectedLang === 'zh' ? 'en' : 'zh';

      // 这里可以集成真实的翻译API
      // 目前使用模拟翻译
      const translated =
        detectedLang === 'zh'
          ? `[English translation of: ${value}]`
          : `[中文翻译: ${value}]`;

      onChange(translated);
    } catch (error) {
      // // console.error('翻译失败:', error);
    } finally {
      setIsTranslating(false);
    }
  }, [value, onChange]);

  return (
    <div className='relative'>
      <input
        type='text'
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 transition-colors',
          className
        )}
      />
      {value.trim() && (
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-zinc-400 hover:text-white disabled:text-zinc-600 transition-colors'
        >
          {isTranslating ? (
            <div className='animate-spin rounded-full h-4 w-4 border-b border-white' />
          ) : (
            <span className='text-sm'>🌐</span>
          )}
        </button>
      )}
    </div>
  );
}

// 智能翻译文本区域
interface SmartTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function SmartTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className,
}: SmartTextareaProps) {
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!value.trim()) {
      return;
    }

    setIsTranslating(true);
    try {
      // 检测文本语言，然后翻译为另一种语言
      const detectedLang = detectLanguage(value);
      const targetLang = detectedLang === 'zh' ? 'en' : 'zh';

      // 这里可以集成真实的翻译API
      // 目前使用模拟翻译
      const translated =
        detectedLang === 'zh'
          ? `[English translation of: ${value}]`
          : `[中文翻译: ${value}]`;

      onChange(translated);
    } catch (error) {
      // // console.error('翻译失败:', error);
    } finally {
      setIsTranslating(false);
    }
  }, [value, onChange]);

  return (
    <div className='relative'>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 resize-none transition-colors',
          className
        )}
      />
      {value.trim() && (
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className='absolute right-2 top-2 p-1 text-zinc-400 hover:text-white disabled:text-zinc-600 transition-colors'
        >
          {isTranslating ? (
            <div className='animate-spin rounded-full h-4 w-4 border-b border-white' />
          ) : (
            <span className='text-sm'>🌐</span>
          )}
        </button>
      )}
    </div>
  );
}
