#!/usr/bin/env python3
"""
CyberNuwa Backend 启动脚本
"""

import uvicorn
import os
import sys

# 添加项目根目录到Python路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("🚀 启动 CyberNuwa Backend API...")
    print("📖 API文档地址: http://localhost:8000/docs")
    print("🔧 重载文档地址: http://localhost:8000/redoc")
    print("🏥 健康检查: http://localhost:8000/health")
    print("-" * 50)
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
        access_log=True
    ) 