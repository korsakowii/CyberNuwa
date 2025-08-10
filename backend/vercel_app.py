"""
CyberNuwa Backend API for Vercel Deployment
AI Agent 共创平台后端服务 - Vercel版本
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 创建FastAPI应用
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

@app.get("/test")
async def test():
    """测试端点"""
    return {"message": "API is working!", "test": True}

# Vercel需要这个变量
app.debug = False
