#!/bin/bash

# CyberNuwa 快速部署脚本 / Quick Deployment Script
echo "🚀 CyberNuwa 部署脚本 / CyberNuwa Deployment Script"
echo "=================================================="

# 检查 Git 状态 / Check Git status
echo "📋 检查 Git 状态 / Checking Git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  有未提交的更改 / There are uncommitted changes"
    echo "请先提交更改: git add . && git commit -m 'your message'"
    echo "Please commit changes first: git add . && git commit -m 'your message'"
    exit 1
fi

# 构建项目 / Build project
echo "🔨 构建项目 / Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败 / Build failed"
    exit 1
fi

echo "✅ 构建成功 / Build successful"

# 检查远程仓库 / Check remote repository
echo "🌐 检查远程仓库 / Checking remote repository..."
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  未配置远程仓库 / No remote repository configured"
    echo "请先添加远程仓库: git remote add origin https://github.com/yourusername/CyberNuwa.git"
    echo "Please add remote repository first: git remote add origin https://github.com/yourusername/CyberNuwa.git"
    exit 1
fi

# 推送代码 / Push code
echo "📤 推送代码到 GitHub / Pushing code to GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ 推送失败 / Push failed"
    echo "请检查 GitHub 仓库是否存在 / Please check if GitHub repository exists"
    exit 1
fi

echo "✅ 代码推送成功 / Code pushed successfully"

echo ""
echo "🎉 部署准备完成！/ Deployment preparation completed!"
echo "=================================================="
echo "📋 下一步 / Next steps:"
echo "1. 访问 https://vercel.com"
echo "2. 使用 GitHub 账户登录"
echo "3. 点击 'New Project'"
echo "4. 选择 CyberNuwa 仓库"
echo "5. 点击 'Deploy'"
echo ""
echo "🌐 部署完成后，你的网站将在几分钟内上线！"
echo "After deployment, your website will be live in minutes!" 