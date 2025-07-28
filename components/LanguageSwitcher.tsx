'use client'

interface LanguageSwitcherProps {
  language: 'zh' | 'en'
  onLanguageChange: (language: 'zh' | 'en') => void
}

export default function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-zinc-800/90 backdrop-blur-md border border-zinc-600 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onLanguageChange('zh')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              language === 'zh'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-700'
            }`}
          >
            🇨🇳 中文
          </button>
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              language === 'en'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-700'
            }`}
          >
            🇺🇸 EN
          </button>
        </div>
      </div>
    </div>
  )
} 