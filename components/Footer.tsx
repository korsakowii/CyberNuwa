'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { createPortal } from 'react-dom'

export default function Footer() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [menuPos, setMenuPos] = useState<{top: number, right: number}>({top: 0, right: 0})
  const btnRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => setIsOpen(false)

  const handleLanguageChange = (lang: 'zh' | 'en') => {
    setLanguage(lang)
    closeMenu()
  }

  useEffect(() => {
    if (isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setMenuPos({
        top: rect.top - 8, // 8px 间距
        right: window.innerWidth - rect.right
      })
    }
  }, [isOpen])

  return (
    <footer className="bg-zinc-800/50 border-t border-zinc-700 mt-20 pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* 版权信息 */}
          <div className="text-zinc-400 text-sm">
            © 2024 Cyber Nüwa. All rights reserved.
          </div>

          {/* 语言切换器 */}
          <div className="relative">
            <button
              ref={btnRef}
              onClick={toggleMenu}
              className="flex items-center space-x-2 px-3 py-2 bg-zinc-700/50 hover:bg-zinc-700/70 rounded-lg transition-all duration-200 text-zinc-300 hover:text-white"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="1"/>
                <path d="M2 12h20" strokeWidth="1"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="1"/>
              </svg>
              <span className="text-sm">
                {language === 'zh' ? '中文' : 'EN'}
              </span>
            </button>

            {/* 语言选择菜单（Portal） */}
            {isOpen && typeof window !== 'undefined' && createPortal(
              <div
                style={{
                  position: 'fixed',
                  top: menuPos.top - 56, // 菜单高度约56px，向上弹出
                  right: menuPos.right,
                  zIndex: 9999
                }}
                className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/50 rounded-lg shadow-lg overflow-hidden min-w-[120px]"
              >
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
              </div>,
              document.body
            )}

            {/* 点击外部关闭菜单 */}
            {isOpen && (
              <div 
                className="fixed inset-0 z-40" 
                onClick={closeMenu}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  )
} 