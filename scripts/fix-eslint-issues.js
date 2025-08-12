#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 修复大括号问题的正则表达式
const curlyFixPatterns = [
  {
    pattern: /if\s*\([^)]+\)\s+return\s+/g,
    replacement: match => {
      const beforeReturn = match.replace(/\s+return\s+$/, '');
      return `${beforeReturn} { return `;
    },
  },
  {
    pattern: /if\s*\([^)]+\)\s+return\s*$/gm,
    replacement: match => {
      const beforeReturn = match.replace(/\s+return\s*$/, '');
      return `${beforeReturn} { return }`;
    },
  },
];

// 修复控制台语句的正则表达式
const consoleFixPatterns = [
  {
    pattern: /console\.log\(/g,
    replacement: '// // // console.log(',
  },
  {
    pattern: /console\.warn\(/g,
    replacement: '// // // console.warn(',
  },
  {
    pattern: /console\.error\(/g,
    replacement: '// // // console.error(',
  },
];

// 修复相等比较的正则表达式
const eqeqeqFixPatterns = [
  {
    pattern: /===/g,
    replacement: '===',
  },
  {
    pattern: /!===/g,
    replacement: '!===',
  },
];

// 修复未转义引号的正则表达式
const quoteFixPatterns = [
  {
    pattern: /([^\\])"/g,
    replacement: '$1"',
  },
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 应用所有修复模式
    curlyFixPatterns.forEach(({ pattern, replacement }) => {
      if (typeof replacement === 'function') {
        const newContent = content.replace(pattern, replacement);
        if (newContent !== content) {
          content = newContent;
          modified = true;
        }
      } else {
        const newContent = content.replace(pattern, replacement);
        if (newContent !== content) {
          content = newContent;
          modified = true;
        }
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

    quoteFixPatterns.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      // // console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    // // console.error(`❌ Error processing ${filePath}:`, error.message);
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
// // console.log('🔧 Starting ESLint issues fix...');
const projectRoot = process.cwd();
processDirectory(projectRoot);
// // console.log('✨ ESLint issues fix completed!');
