#!/bin/bash

# CyberNuwa 一键部署脚本

echo "🚀 CyberNuwa 一键部署开始..."
echo "=================================="

# 检查当前状态
echo "📋 检查项目状态..."

# 检查后端是否在运行
if pgrep -f "python main.py" > /dev/null; then
    echo "✅ 本地后端正在运行"
else
    echo "⚠️  本地后端未运行"
fi

# 检查前端是否在运行
if pgrep -f "next dev" > /dev/null; then
    echo "✅ 前端开发服务器正在运行"
else
    echo "⚠️  前端开发服务器未运行"
fi

echo ""
echo "🌐 选择部署方案:"
echo "1) 🚀 部署后端到 Vercel (推荐)"
echo "2) 🚂 部署后端到 Railway"
echo "3) 🎨 部署后端到 Render"
echo "4) 🔄 仅更新本地配置"
echo "5) ❌ 取消部署"

read -p "请选择 (1-5): " choice

case $choice in
    1)
        echo "🚀 开始部署到 Vercel..."
        
        # 检查 Vercel CLI
        if ! command -v vercel &> /dev/null; then
            echo "📦 安装 Vercel CLI..."
            npm install -g vercel
        fi
        
        # 部署后端
        cd backend
        echo "📤 部署后端到 Vercel..."
        vercel --prod
        
        # 获取部署 URL
        echo "🔗 部署完成！请复制上面的 URL 并更新前端配置"
        ;;
        
    2)
        echo "🚂 开始部署到 Railway..."
        
        # 检查 Railway CLI
        if ! command -v railway &> /dev/null; then
            echo "📦 安装 Railway CLI..."
            npm install -g @railway/cli
        fi
        
        # 部署后端
        cd backend
        echo "📤 部署后端到 Railway..."
        railway login
        railway init
        railway up
        
        echo "🔗 部署完成！请复制上面的 URL 并更新前端配置"
        ;;
        
    3)
        echo "🎨 开始部署到 Render..."
        echo ""
        echo "📋 手动部署步骤:"
        echo "1. 访问 https://render.com"
        echo "2. 连接你的 GitHub 仓库"
        echo "3. 选择 'Web Service'"
        echo "4. 配置以下设置:"
        echo "   - 构建命令: pip install -r requirements.txt"
        echo "   - 启动命令: uvicorn main:app --host 0.0.0.0 --port \$PORT"
        echo "5. 设置环境变量"
        echo ""
        echo "🔗 部署完成后，请更新前端配置"
        ;;
        
    4)
        echo "🔄 更新本地配置..."
        
        # 创建环境变量文件
        if [ ! -f "backend/.env" ]; then
            echo "📝 创建环境变量文件..."
            cp backend/env.example backend/.env
            echo "✅ 已创建 backend/.env 文件，请编辑配置"
        else
            echo "✅ 环境变量文件已存在"
        fi
        
        # 检查端口配置
        echo "🔍 检查端口配置..."
        if grep -q "port=8002" backend/main.py; then
            echo "✅ 后端端口配置为 8002"
        else
            echo "⚠️  后端端口配置需要检查"
        fi
        
        echo "✅ 本地配置更新完成"
        ;;
        
    5)
        echo "❌ 部署已取消"
        exit 0
        ;;
        
    *)
        echo "❌ 无效选择，默认部署到 Vercel..."
        cd backend
        vercel --prod
        ;;
esac

echo ""
echo "🎯 部署后需要做的事情:"
echo "1. 复制后端 URL"
echo "2. 更新前端代码中的 API 地址"
echo "3. 在部署平台设置环境变量"
echo "4. 测试前后端连接"
echo ""
echo "📚 详细说明请查看: docs/CLOUD_DEPLOYMENT.md"
echo "✅ 部署流程完成！"
