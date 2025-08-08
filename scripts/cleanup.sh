#!/bin/bash

# CyberNuwa 项目清理脚本

echo "🧹 开始清理 CyberNuwa 项目..."

# 清理 Python 缓存文件
echo "📦 清理 Python 缓存文件..."
find . -name "*.pyc" -delete
find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true

# 清理系统文件
echo "🖥️  清理系统文件..."
find . -name ".DS_Store" -delete
find . -name "Thumbs.db" -delete

# 清理临时文件
echo "🗑️  清理临时文件..."
find . -name "*.tmp" -delete
find . -name "*.temp" -delete
find . -name "*.log" -delete

# 清理 IDE 文件
echo "💻 清理 IDE 文件..."
find . -name "*.swp" -delete
find . -name "*.swo" -delete

# 清理 Node.js 缓存（可选）
if [ "$1" = "--full" ]; then
    echo "📦 执行完整清理（包括 Node.js 缓存）..."
    rm -rf node_modules/.cache
    rm -rf .next
fi

echo "✅ 清理完成！"
echo ""
echo "📊 清理统计："
echo "- Python 缓存文件已清理"
echo "- 系统临时文件已清理"
echo "- IDE 临时文件已清理"
if [ "$1" = "--full" ]; then
    echo "- Node.js 缓存已清理"
fi
