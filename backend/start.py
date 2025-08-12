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
    # 导入配置
    from utils.config import settings
    
    # 获取动态端口
    port = settings.get_port
    
    print("🚀 启动 CyberNuwa Backend API...")
    print(f"🌐 服务器地址: http://localhost:{port}")
    print(f"📖 API文档地址: http://localhost:{port}/docs")
    print(f"🔧 重载文档地址: http://localhost:{port}/redoc")
    print(f"🏥 健康检查: http://localhost:{port}/health")
    print(f"🔧 使用端口: {port}")
    print("-" * 50)
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=port,
        reload=True,
        log_level="info",
        access_log=True
    ) 