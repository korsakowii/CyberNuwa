'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isOpen)
    setIsOpen(!isOpen)
  }
  const closeMenu = () => setIsOpen(false)

  const handleLanguageChange = (lang: 'zh' | 'en') => {
    console.log('Language changed to:', lang)
    setLanguage(lang)
    closeMenu()
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* 极简地球图标按钮 */}
      <button
        onClick={toggleMenu}
        className="w-8 h-8 bg-transparent hover:bg-zinc-800/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        <svg 
          className="w-4 h-4 text-zinc-400 hover:text-zinc-200 transition-colors duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="1"/>
          <path d="M2 12h20" strokeWidth="1"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="1"/>
        </svg>
      </button>

      {/* 极简弹出菜单 */}
      {isOpen && (
        <div className="absolute top-10 right-0 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-lg shadow-lg overflow-hidden min-w-[120px]">
          <div className="py-1">
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`w-full px-3 py-2 text-left text-sm transition-all duration-200 flex items-center space-x-2 ${
                language === 'zh'
                  ? 'text-white bg-zinc-800/50'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
              }`}
            >
              <span className="text-xs">🇨🇳</span>
              <span>中文</span>
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-3 py-2 text-left text-sm transition-all duration-200 flex items-center space-x-2 ${
                language === 'en'
                  ? 'text-white bg-zinc-800/50'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
              }`}
            >
              <span className="text-xs">🇺🇸</span>
              <span>EN</span>
            </button>
          </div>
        </div>
      )}

      {/* 点击外部关闭菜单 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeMenu}
        />
      )}
    </div>
  )
} 