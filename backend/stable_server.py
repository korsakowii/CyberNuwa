#!/usr/bin/env python3
"""
稳定的CyberNuwa后端服务器
"""

import asyncio
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 创建FastAPI应用
app = FastAPI(
    title="CyberNuwa API",
    description="AI Agent 共创平台后端API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 挂载静态文件
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    """根路径 - API状态检查"""
    return {
        "message": "CyberNuwa Backend API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {"status": "healthy", "timestamp": "2025-01-28T00:00:00Z"}

@app.get("/api/wishes/list_wishes")
async def list_wishes():
    """获取愿望列表 - 模拟数据"""
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
                },
                {
                    "id": 2,
                    "content": "实时翻译日漫",
                    "user_id": "anime_fan",
                    "status": "in-progress",
                    "created_at": "2025-01-10T00:00:00Z"
                },
                {
                    "id": 3,
                    "content": "分析梦境含义",
                    "user_id": "dream_explorer",
                    "status": "idea",
                    "created_at": "2025-01-08T00:00:00Z"
                },
                {
                    "id": 4,
                    "content": "多肉植物养护",
                    "user_id": "plant_parent",
                    "status": "idea",
                    "created_at": "2025-01-05T00:00:00Z"
                }
            ],
            "total": 4,
            "page": 1,
            "size": 10,
            "pages": 1
        }
    }

@app.post("/api/wishes/submit_wish")
async def submit_wish(request: dict):
    """提交愿望"""
    return {
        "success": True,
        "data": {
            "wish": {
                "id": 999,
                "content": request.get("content", "新愿望"),
                "user_id": request.get("user_id", "user_001"),
                "status": "idea",
                "created_at": "2025-01-28T00:00:00Z"
            }
        }
    }

if __name__ == "__main__":
    print("🚀 启动稳定的CyberNuwa后端服务器...")
    print("📍 服务地址: http://localhost:8002")
    print("📚 API文档: http://localhost:8002/docs")
    print("💚 健康检查: http://localhost:8002/health")
    
    uvicorn.run(
        "stable_server:app",
        host="127.0.0.1",
        port=8002,
        reload=False,  # 不使用reload模式
        log_level="info",
        access_log=True
    )
