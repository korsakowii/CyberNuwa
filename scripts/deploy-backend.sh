#!/bin/bash

# CyberNuwa 后端部署脚本

echo "🚀 开始部署 CyberNuwa 后端..."

# 检查是否在正确的目录
if [ ! -f "backend/main.py" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 进入后端目录
cd backend

# 检查 Python 环境
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误：未找到 Python3"
    exit 1
fi

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo "📦 创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
echo "🔧 激活虚拟环境..."
source venv/bin/activate

# 安装依赖
echo "📦 安装依赖..."
pip install -r requirements.txt

# 检查环境变量文件
if [ ! -f ".env" ]; then
    echo "⚠️  警告：未找到 .env 文件，请复制 env.example 并配置"
    if [ -f "env.example" ]; then
        cp env.example .env
        echo "✅ 已复制 env.example 到 .env"
    fi
fi

# 启动服务器
echo "🚀 启动后端服务器..."
echo "📍 服务器地址: http://localhost:8002"
echo "📚 API 文档: http://localhost:8002/docs"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

python main.py
