#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 测试页面目录列表
const testPages = [
  'app/test-translation',
  'app/test-translation-fix',
  'app/test-complete-translation',
  'app/test-language-state',
  'app/test-simple',
  'app/test-form',
  'app/test-particle',
  'app/integration-test',
];

function addDevOnlyToPage(pagePath) {
  const pageFile = path.join(pagePath, 'page.tsx');

  if (!fs.existsSync(pageFile)) {
    // // console.log(`跳过: ${pageFile} 不存在`)
    return;
  }

  let content = fs.readFileSync(pageFile, 'utf8');

  // 检查是否已经添加了DevOnly
  if (content.includes('DevOnly')) {
    // // console.log(`跳过: ${pageFile} 已经包含DevOnly`)
    return;
  }

  // 添加DevOnly导入
  if (!content.includes('import { DevOnly }')) {
    const importMatch = content.match(/import.*from.*['"]/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      const insertIndex = content.lastIndexOf(lastImport) + lastImport.length;
      content =
        content.slice(0, insertIndex) +
        "\nimport { DevOnly } from '../../components/DevOnly'" +
        content.slice(insertIndex);
    }
  }

  // 包装组件
  const exportMatch = content.match(/export default function (\w+)/);
  if (exportMatch) {
    const componentName = exportMatch[1];
    const newComponentName = componentName + 'Content';

    // 重命名原组件
    content = content.replace(
      new RegExp(`export default function ${componentName}`),
      `function ${newComponentName}`
    );

    // 添加新的导出
    content += `\n\nexport default function ${componentName}() {
  return (
    <DevOnly>
      <${newComponentName} />
    </DevOnly>
  )
}`;
  }

  fs.writeFileSync(pageFile, content);
  // // console.log(`✅ 已更新: ${pageFile}`)
}

// 执行批量更新
// // console.log('开始为测试页面添加DevOnly包装...\n')

testPages.forEach(pagePath => {
  addDevOnlyToPage(pagePath);
});

// // console.log('\n✅ 所有测试页面已更新完成!')
