#!/bin/bash

# CyberNuwa 云端部署脚本

echo "🚀 开始部署 CyberNuwa 后端到云端..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

# 检查是否安装了 Railway CLI
if ! command -v railway &> /dev/null; then
    echo "📦 安装 Railway CLI..."
    npm install -g @railway/cli
fi

echo "🌐 选择部署平台:"
echo "1) Vercel (推荐 - 免费额度大，部署简单)"
echo "2) Railway (稳定，有免费额度)"
echo "3) Render (免费，但需要信用卡验证)"
echo "4) Heroku (经典选择，但免费额度有限)"

read -p "请选择部署平台 (1-4): " choice

case $choice in
    1)
        echo "🚀 部署到 Vercel..."
        cd backend
        vercel --prod
        ;;
    2)
        echo "🚂 部署到 Railway..."
        cd backend
        railway login
        railway init
        railway up
        ;;
    3)
        echo "🎨 部署到 Render..."
        echo "请访问 https://render.com 手动创建服务"
        echo "选择 'Web Service'，连接你的 GitHub 仓库"
        echo "构建命令: pip install -r requirements.txt"
        echo "启动命令: uvicorn main:app --host 0.0.0.0 --port \$PORT"
        ;;
    4)
        echo "🦸 部署到 Heroku..."
        cd backend
        if ! command -v heroku &> /dev/null; then
            echo "📦 安装 Heroku CLI..."
            curl https://cli-assets.heroku.com/install.sh | sh
        fi
        heroku login
        heroku create cybernuwa-backend
        git add .
        git commit -m "Deploy to Heroku"
        git push heroku main
        ;;
    *)
        echo "❌ 无效选择，默认使用 Vercel..."
        cd backend
        vercel --prod
        ;;
esac

echo "✅ 部署完成！"
echo "📚 记得更新前端代码中的 API 地址"
