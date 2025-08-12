#!/bin/bash

# 端口管理脚本
# 用法: ./manage-ports.sh [command] [options]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目配置
PROJECTS=(
  "cybernuwa:3000:8000:5432:6379"
  "project2:3001:8001:5433:6380"
  "project3:3002:8002:5434:6381"
  "project4:3003:8003:5435:6382"
  "project5:3004:8004:5436:6383"
  "project6:3005:8005:5437:6384"
)

# 显示帮助信息
show_help() {
  echo "🌐 端口管理脚本"
  echo "=================="
  echo "用法: $0 [command] [options]"
  echo ""
  echo "命令:"
  echo "  check [project]    检查指定项目或所有项目的端口状态"
  echo "  reserve [project]  为指定项目预留端口"
  echo "  release [project]  释放指定项目的端口"
  echo "  list              列出所有项目配置"
  echo "  status            显示当前端口占用状态"
  echo "  help              显示此帮助信息"
  echo ""
  echo "示例:"
  echo "  $0 check cybernuwa    # 检查 CyberNuwa 项目端口"
  echo "  $0 check              # 检查所有项目端口"
  echo "  $0 reserve project2   # 为 project2 预留端口"
  echo "  $0 status             # 显示端口状态"
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

# 检查项目端口状态
check_project_ports() {
  local project_name=$1
  
  for project in "${PROJECTS[@]}"; do
    IFS=':' read -r name frontend backend database redis <<< "$project"
    
    if [[ -n "$project_name" && "$name" != "$project_name" ]]; then
      continue
    fi
    
    echo -e "\n${BLUE}📋 项目: $name${NC}"
    echo "----------------------------------------"
    
    # 检查前端端口
    if check_port $frontend; then
      echo -e "  🌐 前端端口 $frontend: ${GREEN}✅ 可用${NC}"
    else
      echo -e "  🌐 前端端口 $frontend: ${RED}❌ 被占用${NC}"
      lsof -Pi :$frontend -sTCP:LISTEN
    fi
    
    # 检查后端端口
    if check_port $backend; then
      echo -e "  🔧 后端端口 $backend: ${GREEN}✅ 可用${NC}"
    else
      echo -e "  🔧 后端端口 $backend: ${RED}❌ 被占用${NC}"
      lsof -Pi :$backend -sTCP:LISTEN
    fi
    
    # 检查数据库端口
    if check_port $database; then
      echo -e "  🗄️  数据库端口 $database: ${GREEN}✅ 可用${NC}"
    else
      echo -e "  🗄️  数据库端口 $database: ${RED}❌ 被占用${NC}"
      lsof -Pi :$database -sTCP:LISTEN
    fi
    
    # 检查Redis端口
    if check_port $redis; then
      echo -e "  🔴 Redis端口 $redis: ${GREEN}✅ 可用${NC}"
    else
      echo -e "  🔴 Redis端口 $redis: ${RED}❌ 被占用${NC}"
      lsof -Pi :$redis -sTCP:LISTEN
    fi
  done
}

# 显示端口状态概览
show_status() {
  echo -e "${BLUE}🌐 端口状态概览${NC}"
  echo "=================="
  
  local total_ports=0
  local available_ports=0
  local occupied_ports=0
  
  for project in "${PROJECTS[@]}"; do
    IFS=':' read -r name frontend backend database redis <<< "$project"
    
    echo -e "\n${YELLOW}📊 $name${NC}"
    
    # 统计端口状态
    local ports=($frontend $backend $database $redis)
    for port in "${ports[@]}"; do
      total_ports=$((total_ports + 1))
      if check_port $port; then
        echo -e "  ${GREEN}●${NC} $port"
        available_ports=$((available_ports + 1))
      else
        echo -e "  ${RED}●${NC} $port"
        occupied_ports=$((occupied_ports + 1))
      fi
    done
  done
  
  echo -e "\n${BLUE}📈 统计信息${NC}"
  echo "总端口数: $total_ports"
  echo -e "可用端口: ${GREEN}$available_ports${NC}"
  echo -e "占用端口: ${RED}$occupied_ports${NC}"
  echo -e "可用率: ${GREEN}$((available_ports * 100 / total_ports))%${NC}"
}

# 列出所有项目配置
list_projects() {
  echo -e "${BLUE}📋 项目配置列表${NC}"
  echo "=================="
  printf "%-15s %-8s %-8s %-8s %-8s\n" "项目名" "前端" "后端" "数据库" "Redis"
  echo "----------------------------------------"
  
  for project in "${PROJECTS[@]}"; do
    IFS=':' read -r name frontend backend database redis <<< "$project"
    printf "%-15s %-8s %-8s %-8s %-8s\n" "$name" "$frontend" "$backend" "$database" "$redis"
  done
}

# 主函数
main() {
  local command=${1:-help}
  
  case $command in
    "check")
      check_project_ports $2
      ;;
    "status")
      show_status
      ;;
    "list")
      list_projects
      ;;
    "help"|*)
      show_help
      ;;
  esac
}

# 运行主函数
main "$@"
