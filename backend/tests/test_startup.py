#!/usr/bin/env python3
"""
后端启动诊断脚本
"""

import sys
import traceback

def test_imports():
    """测试所有必要的导入"""
    print("🔍 测试模块导入...")
    
    try:
        from fastapi import FastAPI, HTTPException
        print("✅ FastAPI 导入成功")
    except Exception as e:
        print(f"❌ FastAPI 导入失败: {e}")
        return False
    
    try:
        from fastapi.middleware.cors import CORSMiddleware
        print("✅ CORS 中间件导入成功")
    except Exception as e:
        print(f"❌ CORS 中间件导入失败: {e}")
        return False
    
    try:
        import uvicorn
        print("✅ uvicorn 导入成功")
    except Exception as e:
        print(f"❌ uvicorn 导入失败: {e}")
        return False
    
    try:
        from dotenv import load_dotenv
        print("✅ python-dotenv 导入成功")
    except Exception as e:
        print(f"❌ python-dotenv 导入失败: {e}")
        return False
    
    return True

def test_routes():
    """测试路由模块导入"""
    print("\n🔍 测试路由模块...")
    
    try:
        from routes import wishes, tasks, modules, agents, signatures, translation
        print("✅ 所有路由模块导入成功")
        return True
    except Exception as e:
        print(f"❌ 路由模块导入失败: {e}")
        traceback.print_exc()
        return False

def test_database():
    """测试数据库模块"""
    print("\n🔍 测试数据库模块...")
    
    try:
        from utils.database import init_database
        print("✅ 数据库模块导入成功")
        return True
    except Exception as e:
        print(f"❌ 数据库模块导入失败: {e}")
        traceback.print_exc()
        return False

def test_config():
    """测试配置模块"""
    print("\n🔍 测试配置模块...")
    
    try:
        from utils.config import settings
        print("✅ 配置模块导入成功")
        print(f"   数据库URL: {settings.DATABASE_URL}")
        print(f"   OpenAI模型: {settings.OPENAI_MODEL}")
        return True
    except Exception as e:
        print(f"❌ 配置模块导入失败: {e}")
        traceback.print_exc()
        return False

def test_app_creation():
    """测试应用创建"""
    print("\n🔍 测试应用创建...")
    
    try:
        from fastapi import FastAPI
        from fastapi.middleware.cors import CORSMiddleware
        
        app = FastAPI(
            title="CyberNuwa API",
            description="AI Agent 共创平台后端API",
            version="1.0.0"
        )
        
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        
        print("✅ FastAPI 应用创建成功")
        return True
    except Exception as e:
        print(f"❌ 应用创建失败: {e}")
        traceback.print_exc()
        return False

def main():
    """主诊断函数"""
    print("🚀 CyberNuwa 后端诊断开始...\n")
    
    tests = [
        test_imports,
        test_routes,
        test_database,
        test_config,
        test_app_creation
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print(f"📊 诊断结果: {passed}/{total} 测试通过")
    
    if passed == total:
        print("🎉 所有测试通过！后端应该可以正常启动")
        return True
    else:
        print("⚠️  发现问题，请检查上述错误信息")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
