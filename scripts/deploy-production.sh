#!/bin/bash

# CyberNuwa 生产环境部署脚本

set -e  # 遇到错误时退出

echo "🚀 开始生产环境部署..."

# 检查环境
if [ "$NODE_ENV" != "production" ]; then
    export NODE_ENV=production
    echo "设置 NODE_ENV=production"
fi

# 清理旧的构建文件
echo "🧹 清理旧的构建文件..."
rm -rf .next
rm -rf out

# 安装依赖
echo "📦 安装依赖..."
npm ci --only=production

# 构建应用
echo "🔨 构建应用..."
npm run build

# 检查构建结果
if [ ! -d ".next" ]; then
    echo "❌ 构建失败: .next 目录不存在"
    exit 1
fi

echo "✅ 构建成功!"

# 启动生产服务器
echo "🌐 启动生产服务器..."
npm start

echo "🎉 生产环境部署完成!" 