"""
配置文件 - 环境变量和系统设置
"""

import os
from typing import Optional
from pydantic import BaseSettings

class Settings(BaseSettings):
    """应用配置类"""
    
    # 基础配置
    app_name: str = "CyberNuwa Backend"
    app_version: str = "1.0.0"
    debug: bool = True
    
    # 数据库配置
    database_url: str = "sqlite:///./cybernuwa.db"
    database_path: str = "./data"
    
    # OpenAI配置
    openai_api_key: Optional[str] = None
    openai_model: str = "gpt-3.5-turbo"
    openai_max_tokens: int = 2000
    
    # 文件存储配置
    data_dir: str = "./data"
    wishes_file: str = "wishes.json"
    tasks_file: str = "tasks.json"
    signatures_file: str = "signatures.json"
    modules_dir: str = "modules"
    agents_dir: str = "agents"
    
    # 安全配置
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS配置
    allowed_origins: list = ["*"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# 创建全局设置实例
settings = Settings()

# 确保数据目录存在
os.makedirs(settings.data_dir, exist_ok=True)
os.makedirs(os.path.join(settings.data_dir, settings.modules_dir), exist_ok=True)
os.makedirs(os.path.join(settings.data_dir, settings.agents_dir), exist_ok=True) 