#!/usr/bin/env python3
"""
简化的FastAPI服务器用于测试
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# 创建应用
app = FastAPI(
    title="CyberNuwa API",
    description="AI Agent 共创平台后端API",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "CyberNuwa Backend API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy", "timestamp": "2025-01-28T00:00:00Z"}

@app.get("/api/wishes/list_wishes")
async def list_wishes():
    """获取愿望列表"""
    return {
        "success": True,
        "data": {
            "items": [
                {
                    "id": 1,
                    "content": "每天都能喝到完美的咖啡",
                    "user_id": "coffee_lover",
                    "status": "idea",
                    "created_at": "2025-01-15T00:00:00Z"
                }
            ],
            "total": 1,
            "page": 1,
            "size": 10,
            "pages": 1
        }
    }

if __name__ == "__main__":
    print("🚀 启动简化服务器 (端口8002)...")
    uvicorn.run(
        "simple_server:app",
        host="127.0.0.1",
        port=8002,
        reload=False,
        log_level="info"
    )
