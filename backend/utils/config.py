"""
配置管理模块
"""

import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """应用配置类"""
    
    # 环境配置
    NODE_ENV: str = "development"
    
    # 服务器配置
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
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
    
    # 动态端口配置
    @property
    def get_port(self) -> int:
        """动态获取端口，支持环境变量覆盖"""
        # 优先使用环境变量
        env_port = os.getenv("BACKEND_PORT")
        if env_port:
            try:
                return int(env_port)
            except ValueError:
                pass
        
        # 根据环境返回不同端口
        if self.NODE_ENV == "production":
            return 8000
        elif self.NODE_ENV == "test":
            return 8001
        else:
            # 开发环境，尝试多个端口
            ports = [8000, 8002, 8003, 8004, 8005, 8006, 8007]
            for port in ports:
                if not self._is_port_in_use(port):
                    return port
            return 8000  # 默认端口
    
    def _is_port_in_use(self, port: int) -> bool:
        """检查端口是否被占用"""
        import socket
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('localhost', port))
                return False
            except OSError:
                return True
    
    class Config:
        env_file = ".env"
        extra = "ignore"  # 忽略额外的环境变量

settings = Settings() 