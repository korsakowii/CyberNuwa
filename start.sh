#!/bin/bash

# CyberNuwa 启动脚本
# 帮助用户选择启动动态主站还是静态展示

echo "🚀 CyberNuwa 启动脚本"
echo "================================"
echo ""
echo "请选择要启动的版本："
echo ""
echo "1) 🚀 动态主站 (完整功能版本)"
echo "   - 包含所有功能模块"
echo "   - 支持实时数据交互"
echo "   - 访问地址: http://localhost:3000"
echo ""
echo "2) 📊 静态展示 (展示版本)"
echo "   - 纯展示页面，无实际功能"
echo "   - 适合外部演示和分享"
echo "   - 访问地址: http://localhost:3001"
echo ""
echo "3) 🔄 同时启动两个版本"
echo "   - 动态主站: http://localhost:3000"
echo "   - 静态展示: http://localhost:3001"
echo ""
echo "4) 📖 查看页面区分说明"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 启动动态主站..."
        echo "================================"
        echo "正在启动前端服务..."
        npm run dev &
        echo "正在启动后端服务..."
        cd backend && python3 main.py &
        echo ""
        echo "✅ 服务启动完成！"
        echo "🌐 访问地址: http://localhost:3000"
        echo "📊 后端API: http://localhost:8000"
        echo ""
        echo "💡 提示："
        echo "- 动态主站包含完整功能，支持数据提交和获取"
        echo "- 页面顶部有导航链接可以跳转到展示页面"
        echo "- 按 Ctrl+C 停止服务"
        ;;
    2)
        echo ""
        echo "📊 启动静态展示..."
        echo "================================"
        echo "正在构建静态版本..."
        npm run build:static
        echo "正在启动预览服务..."
        npm run preview:static &
        echo ""
        echo "✅ 静态展示启动完成！"
        echo "🌐 访问地址: http://localhost:3001"
        echo ""
        echo "💡 提示："
        echo "- 静态展示页面包含功能展示和统计数据"
        echo "- 页面有按钮可以跳转到动态主站"
        echo "- 按 Ctrl+C 停止服务"
        ;;
    3)
        echo ""
        echo "🔄 同时启动两个版本..."
        echo "================================"
        echo "正在启动动态主站..."
        npm run dev &
        echo "正在启动后端服务..."
        cd backend && python3 main.py &
        echo "正在构建静态版本..."
        npm run build:static
        echo "正在启动静态展示..."
        npm run preview:static &
        echo ""
        echo "✅ 所有服务启动完成！"
        echo "🚀 动态主站: http://localhost:3000"
        echo "📊 静态展示: http://localhost:3001"
        echo "🔧 后端API: http://localhost:8000"
        echo ""
        echo "💡 提示："
        echo "- 两个版本可以同时访问和对比"
        echo "- 页面之间有导航链接可以互相跳转"
        echo "- 按 Ctrl+C 停止所有服务"
        ;;
    4)
        echo ""
        echo "📖 页面区分说明"
        echo "================================"
        echo ""
        echo "🚀 动态主站 (Dynamic Main Site)"
        echo "   - 用途: 完整功能演示和实际使用"
        echo "   - 特点: 支持实时数据交互、用户操作"
        echo "   - 适用: 功能开发、测试、实际使用"
        echo ""
        echo "📊 静态展示 (Static Showcase)"
        echo "   - 用途: 独立功能展示和演示"
        echo "   - 特点: 纯展示页面、快速加载"
        echo "   - 适用: 外部演示、分享、展示"
        echo ""
        echo "📁 详细说明请查看: PAGE_DIFFERENTIATION.md"
        echo ""
        ;;
    *)
        echo ""
        echo "❌ 无效选择，请重新运行脚本"
        exit 1
        ;;
esac

# 等待用户输入以保持脚本运行
echo ""
read -p "按回车键退出..." 