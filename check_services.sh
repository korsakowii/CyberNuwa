#!/bin/bash

echo "🔍 CyberNuwa 服务状态检查"
echo "=========================="

# 检查前端服务
echo "📱 检查前端服务 (localhost:3000)..."
if curl -s http://localhost:3000/ > /dev/null; then
    echo "✅ 前端服务正常运行"
    echo "   主页: http://localhost:3000/"
    echo "   翻译测试: http://localhost:3000/test-translation"
else
    echo "❌ 前端服务无法访问"
fi

# 检查后端服务
echo ""
echo "🔧 检查后端服务 (localhost:8001)..."
if curl -s http://localhost:8001/ > /dev/null; then
    echo "✅ 后端服务正常运行"
    echo "   API文档: http://localhost:8001/docs"
    echo "   健康检查: http://localhost:8001/health"
else
    echo "❌ 后端服务无法访问"
fi

# 检查翻译API
echo ""
echo "🌐 检查翻译API..."
if curl -s -X POST http://localhost:8001/api/translation/translate \
    -H "Content-Type: application/json" \
    -d '{"text": "Hello", "target_lang": "zh", "source_lang": "en"}' > /dev/null; then
    echo "✅ 翻译API正常工作"
else
    echo "❌ 翻译API无法访问"
fi

# 检查端口使用情况
echo ""
echo "🔌 端口使用情况:"
echo "   3000端口: $(lsof -i :3000 | wc -l) 个进程"
echo "   8001端口: $(lsof -i :8001 | wc -l) 个进程"

echo ""
echo "🎯 推荐访问地址:"
echo "   主页: http://localhost:3000/"
echo "   翻译测试: http://localhost:3000/test-translation"
echo "   API文档: http://localhost:8001/docs"
echo ""
echo "如果仍然遇到404错误，请尝试:"
echo "1. 清除浏览器缓存 (Ctrl+Shift+R)"
echo "2. 使用无痕模式访问"
echo "3. 检查URL拼写是否正确" 