'use client'

// 尝试导入LanguageContext，如果失败则使用默认中文
let useLanguage: any = null
try {
  const context = require('@/contexts/LanguageContext')
  useLanguage = context.useLanguage
} catch (error) {
  // LanguageContext不可用，使用默认中文
}

interface FooterProps {
  language?: 'zh' | 'en'
}

export default function Footer({ language: propLanguage }: FooterProps = {}) {
  // 优先级：props > LanguageContext > 默认中文
  const contextLanguage = useLanguage ? useLanguage().language : null
  const language = propLanguage || contextLanguage || 'zh'

  return (
    <footer className="bg-zinc-800/50 border-t border-zinc-700 mt-20 pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* 版权信息 */}
          <div className="text-zinc-400 text-sm">
            © 2025 Cyber Nüwa. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </div>

          {/* 右侧可以添加其他信息，比如版本号等 */}
          <div className="text-zinc-500 text-xs">
            {language === 'zh' ? 'AI智能体共创平台' : 'AI Agent Co-Creation Platform'}
          </div>
        </div>
      </div>
    </footer>
  )
} 