"""
CyberNuwa Backend API
AI Agent 共创平台后端服务
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
from dotenv import load_dotenv

# 导入路由模块
from routes import wishes, tasks, modules, agents, signatures, translation
from utils.database import init_database
from utils.config import settings

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
    allow_origins=["*"],  # 生产环境中应该指定具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 挂载静态文件
app.mount("/static", StaticFiles(directory="static"), name="static")

# 注册路由
app.include_router(wishes.router, prefix="/api/wishes", tags=["愿望管理"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["任务管理"])
app.include_router(modules.router, prefix="/api/modules", tags=["模块管理"])
app.include_router(agents.router, prefix="/api/agents", tags=["智能体管理"])
app.include_router(signatures.router, prefix="/api/signatures", tags=["署名管理"])
app.include_router(translation.router)

@app.on_event("startup")
async def startup_event():
    """应用启动时初始化数据库"""
    await init_database()
    print("🚀 CyberNuwa Backend API 启动成功!")

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

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8002,
        reload=True,
        log_level="info"
    ) 