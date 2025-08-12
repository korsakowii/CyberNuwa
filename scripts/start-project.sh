#!/bin/bash

# 项目启动脚本
# 用法: ./start-project.sh [project_name] [environment]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 显示帮助信息
show_help() {
  echo "🚀 项目启动脚本"
  echo "=================="
  echo "用法: $0 [project_name] [environment]"
  echo ""
  echo "参数:"
  echo "  project_name    项目名称 (cybernuwa, project2, project3...)"
  echo "  environment     环境 (dev, test, prod)"
  echo ""
  echo "示例:"
  echo "  $0 cybernuwa dev     # 启动 CyberNuwa 开发环境"
  echo "  $0 project2 test     # 启动 project2 测试环境"
  echo "  $0                   # 显示帮助信息"
}

# 检查端口是否可用
check_port() {
  local port=$1
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
    return 1  # 端口被占用
  else
    return 0  # 端口可用
  fi
}

# 启动 CyberNuwa 项目
start_cybernuwa() {
  local env=${1:-dev}
  
  echo -e "${BLUE}🚀 启动 CyberNuwa 项目 (${env} 环境)${NC}"
  
  # 检查端口
  local ports=(3000 8000 5432 6379)
  local port_conflicts=()
  
  for port in "${ports[@]}"; do
    if ! check_port $port; then
      port_conflicts+=($port)
    fi
  done
  
  if [ ${#port_conflicts[@]} -gt 0 ]; then
    echo -e "${RED}❌ 端口冲突: ${port_conflicts[*]}${NC}"
    echo "请先停止占用这些端口的服务，或使用其他端口配置"
    return 1
  fi
  
  echo -e "${GREEN}✅ 端口检查通过${NC}"
  
  case $env in
    "dev")
      echo "启动开发环境..."
      if command -v docker-compose &> /dev/null; then
        echo "使用 Docker Compose 启动..."
        docker-compose up -d cybernuwa-frontend cybernuwa-backend cybernuwa-db cybernuwa-redis
      else
        echo "使用本地服务启动..."
        echo "请确保已安装并启动:"
        echo "  - PostgreSQL (端口 5432)"
        echo "  - Redis (端口 6379)"
        echo "  - 后端服务 (端口 8000)"
        echo "  - 前端服务 (端口 3000)"
      fi
      ;;
    "test")
      echo "启动测试环境..."
      # 使用测试端口配置
      ;;
    "prod")
      echo "启动生产环境..."
      # 使用生产端口配置
      ;;
    *)
      echo -e "${RED}❌ 未知环境: $env${NC}"
      return 1
      ;;
  esac
  
  echo -e "${GREEN}✅ CyberNuwa 项目启动完成${NC}"
  echo "访问地址:"
  echo "  - 前端: http://localhost:3000"
  echo "  - 后端: http://localhost:8000"
  echo "  - 数据库: localhost:5432"
  echo "  - Redis: localhost:6379"
}

# 启动其他项目
start_other_project() {
  local project_name=$1
  local env=${2:-dev}
  
  echo -e "${BLUE}🚀 启动 $project_name 项目 (${env} 环境)${NC}"
  
  # 根据项目名确定端口配置
  case $project_name in
    "project2")
      local ports=(3001 8001 5433 6380)
      ;;
    "project3")
      local ports=(3002 8002 5434 6381)
      ;;
    "project4")
      local ports=(3003 8003 5435 6382)
      ;;
    "project5")
      local ports=(3004 8004 5436 6383)
      ;;
    "project6")
      local ports=(3005 8005 5437 6384)
      ;;
    *)
      echo -e "${RED}❌ 未知项目: $project_name${NC}"
      return 1
      ;;
  esac
  
  # 检查端口
  local port_conflicts=()
  
  for port in "${ports[@]}"; do
    if ! check_port $port; then
      port_conflicts+=($port)
    fi
  done
  
  if [ ${#port_conflicts[@]} -gt 0 ]; then
    echo -e "${RED}❌ 端口冲突: ${port_conflicts[*]}${NC}"
    echo "请先停止占用这些端口的服务，或使用其他端口配置"
    return 1
  fi
  
  echo -e "${GREEN}✅ 端口检查通过${NC}"
  echo "请手动启动 $project_name 项目，使用以下端口配置:"
  echo "  - 前端: $ports"
  echo "  - 后端: $ports"
  echo "  - 数据库: $ports"
  echo "  - Redis: $ports"
}

# 主函数
main() {
  local project_name=${1:-help}
  local environment=${2:-dev}
  
  case $project_name in
    "cybernuwa")
      start_cybernuwa $environment
      ;;
    "project2"|"project3"|"project4"|"project5"|"project6")
      start_other_project $project_name $environment
      ;;
    "help"|*)
      show_help
      ;;
  esac
}

# 运行主函数
main "$@"
