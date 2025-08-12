#!/bin/bash

# 端口检查脚本
# 用法: ./check-ports.sh [start_port] [end_port]

START_PORT=${1:-3000}
END_PORT=${2:-3010}

echo "🔍 检查端口 $START_PORT 到 $END_PORT 的可用性..."
echo "=================================="

for port in $(seq $START_PORT $END_PORT); do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "❌ 端口 $port: 被占用"
        lsof -Pi :$port -sTCP:LISTEN
    else
        echo "✅ 端口 $port: 可用"
    fi
done

echo "=================================="
echo "💡 提示: 使用 'lsof -i :端口号' 查看具体占用进程"
echo "💡 使用 'kill -9 PID' 强制结束进程（谨慎使用）"
