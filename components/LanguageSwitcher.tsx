'use client'

interface LanguageSwitcherProps {
  language: 'zh' | 'en'
  onLanguageChange: (language: 'zh' | 'en') => void
}

export default function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg p-2">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as 'zh' | 'en')}
          className="bg-transparent text-white border-none outline-none cursor-pointer"
        >
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  )
} 