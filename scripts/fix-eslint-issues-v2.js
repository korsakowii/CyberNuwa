#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 修复大括号问题的正则表达式 - 更精确的匹配
const curlyFixPatterns = [
  // 修复 if 语句后直接 return 的情况
  {
    pattern: /if\s*\([^)]+\)\s+return\s+([^;]+);/g,
    replacement: 'if ($1) { return $2; }',
  },
  // 修复 if 语句后直接 return 的情况（无分号）
  {
    pattern: /if\s*\(([^)]+)\)\s+return\s+([^;]+)/g,
    replacement: 'if ($1) { return $2 }',
  },
];

// 修复控制台语句 - 只注释掉，不破坏语法
const consoleFixPatterns = [
  {
    pattern: /console\.log\(/g,
    replacement: '// // console.log(',
  },
  {
    pattern: /console\.warn\(/g,
    replacement: '// // console.warn(',
  },
  {
    pattern: /console\.error\(/g,
    replacement: '// // console.error(',
  },
];

// 修复相等比较 - 只修复 === 和 !==
const eqeqeqFixPatterns = [
  {
    pattern: /([^=])===([^=])/g,
    replacement: '$1===$2',
  },
  {
    pattern: /([^!])!==([^=])/g,
    replacement: '$1!===$2',
  },
];

// 修复未转义引号 - 只修复 JSX 中的引号
const quoteFixPatterns = [
  {
    pattern: /className="/g,
    replacement: 'className="',
  },
  {
    pattern: /"/g,
    replacement: '"',
  },
];

// 修复错误的 === 为 ===
const fixDoubleEquals = [
  {
    pattern: /===/g,
    replacement: '===',
  },
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 首先修复明显的语法错误
    fixDoubleEquals.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    // 修复引号问题
    quoteFixPatterns.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    // 应用其他修复模式
    curlyFixPatterns.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    consoleFixPatterns.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    eqeqeqFixPatterns.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      // console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    // console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 跳过 node_modules 和 .git 目录
      if (item !== 'node_modules' && item !== '.git' && item !== '.next') {
        processDirectory(fullPath);
      }
    } else if (
      item.endsWith('.tsx') ||
      item.endsWith('.ts') ||
      item.endsWith('.jsx') ||
      item.endsWith('.js')
    ) {
      fixFile(fullPath);
    }
  });
}

// 主执行
// console.log('🔧 Starting ESLint issues fix (v2)...');
const projectRoot = process.cwd();
processDirectory(projectRoot);
// console.log('✨ ESLint issues fix completed!');
