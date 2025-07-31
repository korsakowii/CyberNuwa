#!/bin/bash

# CyberNuwa 部署脚本 / CyberNuwa Deployment Script
# 确保 Vercel 部署的是 release 分支 / Ensure Vercel deploys from release branch

set -e

echo "🚀 CyberNuwa 部署脚本启动... / CyberNuwa deployment script starting..."

# 检查当前分支 / Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 当前分支: $CURRENT_BRANCH / Current branch: $CURRENT_BRANCH"

# 检查是否有未提交的更改 / Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改，请先提交或暂存更改 / Uncommitted changes detected, please commit or stash first"
    git status --short
    exit 1
fi

# 确保本地分支与远程同步
echo "🔄 同步远程分支..."
git fetch origin

# 根据当前分支执行不同的部署策略
case $CURRENT_BRANCH in
    "main")
        echo "📋 在 main 分支上，准备推送到 release 分支..."
        
        # 切换到 release 分支
        git checkout release
        
        # 合并 main 分支的更改
        git merge main --no-edit
        
        # 推送到远程 release 分支
        git push origin release
        
        echo "✅ main 分支的更改已合并到 release 分支并推送"
        echo "🔄 Vercel 将自动部署 release 分支"
        
        # 切换回 main 分支
        git checkout main
        ;;
        
    "qa")
        echo "📋 在 qa 分支上，准备推送到 release 分支..."
        
        # 切换到 release 分支
        git checkout release
        
        # 合并 qa 分支的更改
        git merge qa --no-edit
        
        # 推送到远程 release 分支
        git push origin release
        
        echo "✅ qa 分支的更改已合并到 release 分支并推送"
        echo "🔄 Vercel 将自动部署 release 分支"
        
        # 切换回 qa 分支
        git checkout qa
        ;;
        
    "release")
        echo "📋 直接在 release 分支上，推送更改..."
        
        # 推送到远程 release 分支
        git push origin release
        
        echo "✅ release 分支已推送"
        echo "🔄 Vercel 将自动部署"
        ;;
        
    *)
        echo "❌ 未知分支: $CURRENT_BRANCH"
        echo "请切换到 main、qa 或 release 分支"
        exit 1
        ;;
esac

echo "🎉 部署流程完成！"
echo "📊 检查 Vercel 部署状态: https://vercel.com/dashboard" 