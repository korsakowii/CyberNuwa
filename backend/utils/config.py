"""
配置管理模块
"""

import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """应用配置类"""
    
    # 数据库配置
    DATABASE_URL: str = "sqlite:///./cybernuwa.db"
    
    # API配置
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "CyberNuwa API"
    
    # CORS配置
    BACKEND_CORS_ORIGINS: list = ["*"]
    
    # 安全配置
    SECRET_KEY: str = "your-secret-key-here"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # OpenAI配置
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-3.5-turbo"
    OPENAI_MAX_TOKENS: int = 2000
    
    class Config:
        env_file = ".env"
        extra = "ignore"  # 忽略额外的环境变量

settings = Settings() 