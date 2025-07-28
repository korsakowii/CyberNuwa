'use client'

import { useState } from 'react'

interface LanguageSwitcherProps {
  language: 'zh' | 'en'
  onLanguageChange: (language: 'zh' | 'en') => void
}

export default function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleLanguageChange = (lang: 'zh' | 'en') => {
    onLanguageChange(lang)
    closeMenu()
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* 地球图标按钮 */}
      <button
        onClick={toggleMenu}
        className="w-10 h-10 bg-zinc-800/80 backdrop-blur-sm border border-zinc-600 rounded-full flex items-center justify-center hover:bg-zinc-700/80 hover:border-zinc-500 transition-all duration-200 hover:scale-110 shadow-lg"
      >
        <svg 
          className="w-5 h-5 text-zinc-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
          <path d="M2 12h20" strokeWidth="1.5"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="1.5"/>
        </svg>
      </button>

      {/* 弹出菜单 */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-zinc-800/95 backdrop-blur-md border border-zinc-600 rounded-xl shadow-xl overflow-hidden">
          <div className="py-2">
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`w-full px-4 py-2 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                language === 'zh'
                  ? 'bg-blue-500/20 text-blue-300 border-r-2 border-blue-500'
                  : 'text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
              }`}
            >
              <span className="text-base">🇨🇳</span>
              <span>中文</span>
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-4 py-2 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                language === 'en'
                  ? 'bg-blue-500/20 text-blue-300 border-r-2 border-blue-500'
                  : 'text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
              }`}
            >
              <span className="text-base">🇺🇸</span>
              <span>English</span>
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