const fs = require('fs');

// 需要更新footer的页面
const pages = [
  'app/launch-mission/page.tsx',
  'app/agents/page.tsx',
  'app/train-agent/page.tsx',
  'app/wishes/page.tsx',
  'app/roles/page.tsx',
  'app/narratives/page.tsx',
  'app/task-square/page.tsx',
  'app/page.static.tsx',
];

// 新的footer布局模板
const newFooterTemplate = `      {/* Footer with Language Switcher */}
      <footer className="bg-zinc-800/50 border-t border-zinc-700 mt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 版权信息 */}
            <div className="text-zinc-400 text-sm">
              © 2025 Cyber Nüwa. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
            </div>

            {/* 右侧平台描述 */}
            <div className="text-zinc-500 text-xs">
              {language === 'zh' ? 'AI智能体共创平台' : 'AI Agent Co-Creation Platform'}
            </div>

            {/* 语言切换器 - 移到最右侧 */}
            <div className="flex items-center">
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center space-x-2 px-3 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors"
              >
                <span>{language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
                <span>{language === 'zh' ? '中文' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}`;

pages.forEach(pagePath => {
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');

    // 查找并替换footer部分
    const footerRegex =
      /      \{\/\* Footer with Language Switcher \*\/\}[\s\S]*?    <\/div>\s+\)\s+}/;

    if (footerRegex.test(content)) {
      content = content.replace(footerRegex, newFooterTemplate);
      fs.writeFileSync(pagePath, content);
      // // console.log(`✅ Updated footer layout in ${pagePath}`);
    } else {
      // // console.log(`⚠️  No footer found in ${pagePath}`);
    }
  } else {
    // // console.log(`❌ ${pagePath} not found`);
  }
});

// // console.log('🎉 Footer layout update completed!');
