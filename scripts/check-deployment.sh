#!/bin/bash

# CyberNuwa 部署状态检查脚本

echo "🔍 CyberNuwa 部署状态检查"
echo "=========================="

# 检查本地服务状态
echo "📋 本地服务状态:"
echo "----------------"

# 检查后端
if pgrep -f "python main.py" > /dev/null; then
    echo "✅ 后端服务: 运行中"
    BACKEND_PID=$(pgrep -f "python main.py")
    echo "   PID: $BACKEND_PID"
    
    # 检查端口
    if lsof -i :8002 > /dev/null 2>&1; then
        echo "   Port: 8002 (活跃)"
    else
        echo "   Port: 8002 (未监听)"
    fi
else
    echo "❌ 后端服务: 未运行"
fi

echo ""

# 检查前端
if pgrep -f "next dev" > /dev/null; then
    echo "✅ 前端服务: 运行中"
    FRONTEND_PID=$(pgrep -f "next dev")
    echo "   PID: $FRONTEND_PID"
    
    # 检查端口
    if lsof -i :3000 > /dev/null 2>&1; then
        echo "   Port: 3000 (活跃)"
    else
        echo "   Port: 3000 (未监听)"
    fi
else
    echo "❌ 前端服务: 未运行"
fi

echo ""

# 检查网络连接
echo "🌐 网络连接测试:"
echo "----------------"

# 测试后端健康检查
echo "🔍 测试后端健康检查..."
if command -v curl &> /dev/null; then
    if curl -s http://localhost:8002/health > /dev/null; then
        echo "✅ 后端健康检查: 成功"
        HEALTH_RESPONSE=$(curl -s http://localhost:8002/health)
        echo "   响应: $HEALTH_RESPONSE"
    else
        echo "❌ 后端健康检查: 失败"
    fi
else
    echo "⚠️  curl 未安装，无法测试网络连接"
fi

echo ""

# 检查文件状态
echo "📁 关键文件状态:"
echo "----------------"

# 检查后端文件
if [ -f "backend/main.py" ]; then
    echo "✅ backend/main.py: 存在"
else
    echo "❌ backend/main.py: 缺失"
fi

if [ -f "backend/requirements.txt" ]; then
    echo "✅ backend/requirements.txt: 存在"
    DEP_COUNT=$(wc -l < backend/requirements.txt)
    echo "   依赖数量: $DEP_COUNT"
else
    echo "❌ backend/requirements.txt: 缺失"
fi

if [ -f "backend/vercel.json" ]; then
    echo "✅ backend/vercel.json: 存在"
else
    echo "❌ backend/vercel.json: 缺失"
fi

# 检查前端文件
if [ -f "app/page.tsx" ]; then
    echo "✅ app/page.tsx: 存在"
else
    echo "❌ app/page.tsx: 缺失"
fi

if [ -f "package.json" ]; then
    echo "✅ package.json: 存在"
else
    echo "❌ package.json: 缺失"
fi

echo ""

# 检查环境配置
echo "⚙️  环境配置:"
echo "-------------"

# 检查虚拟环境
if [ -d "backend/venv" ]; then
    echo "✅ Python 虚拟环境: 存在"
    if [ -f "backend/venv/bin/activate" ]; then
        echo "   激活脚本: 存在"
    else
        echo "   激活脚本: 缺失"
    fi
else
    echo "❌ Python 虚拟环境: 缺失"
fi

# 检查环境变量文件
if [ -f "backend/.env" ]; then
    echo "✅ 环境变量文件: 存在"
    ENV_VARS=$(grep -c "=" backend/.env 2>/dev/null || echo "0")
    echo "   变量数量: $ENV_VARS"
else
    echo "⚠️  环境变量文件: 缺失 (使用 env.example 模板)"
fi

echo ""

# 检查部署配置
echo "🚀 部署配置:"
echo "-------------"

# 检查端口配置
if grep -q "port=8002" backend/main.py; then
    echo "✅ 后端端口: 8002"
else
    echo "⚠️  后端端口: 需要检查"
fi

# 检查 CORS 配置
if grep -q "CORS" backend/main.py; then
    echo "✅ CORS 配置: 存在"
else
    echo "⚠️  CORS 配置: 需要检查"
fi

echo ""

# 总结
echo "📊 部署状态总结:"
echo "=================="

# 计算成功项
SUCCESS_COUNT=0
TOTAL_COUNT=0

# 检查关键服务
if pgrep -f "python main.py" > /dev/null; then
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
fi
TOTAL_COUNT=$((TOTAL_COUNT + 1))

if pgrep -f "next dev" > /dev/null; then
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
fi
TOTAL_COUNT=$((TOTAL_COUNT + 1))

# 检查关键文件
if [ -f "backend/main.py" ] && [ -f "backend/requirements.txt" ] && [ -f "app/page.tsx" ]; then
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
fi
TOTAL_COUNT=$((TOTAL_COUNT + 1))

# 计算成功率
SUCCESS_RATE=$((SUCCESS_COUNT * 100 / TOTAL_COUNT))

echo "✅ 成功项: $SUCCESS_COUNT/$TOTAL_COUNT"
echo "📈 成功率: $SUCCESS_RATE%"

if [ $SUCCESS_RATE -eq 100 ]; then
    echo "🎉 部署状态: 完全正常"
elif [ $SUCCESS_RATE -ge 80 ]; then
    echo "✅ 部署状态: 基本正常"
elif [ $SUCCESS_RATE -ge 60 ]; then
    echo "⚠️  部署状态: 需要关注"
else
    echo "❌ 部署状态: 需要修复"
fi

echo ""
echo "🔧 建议操作:"
if [ $SUCCESS_RATE -lt 100 ]; then
    echo "1. 运行 ./scripts/quick-deploy.sh 进行部署"
    echo "2. 检查错误日志"
    echo "3. 验证配置文件"
else
    echo "1. 可以开始云端部署"
    echo "2. 运行 ./scripts/deploy-cloud.sh"
    echo "3. 测试所有功能"
fi

echo ""
echo "📚 更多信息请查看: docs/CLOUD_DEPLOYMENT.md"
