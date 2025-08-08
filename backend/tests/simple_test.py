#!/usr/bin/env python3
"""
最简单的测试脚本
"""

print("开始测试...")

try:
    print("1. 导入FastAPI...")
    from fastapi import FastAPI
    print("   ✅ FastAPI导入成功")
except Exception as e:
    print(f"   ❌ FastAPI导入失败: {e}")
    exit(1)

try:
    print("2. 导入uvicorn...")
    import uvicorn
    print("   ✅ uvicorn导入成功")
except Exception as e:
    print(f"   ❌ uvicorn导入失败: {e}")
    exit(1)

try:
    print("3. 创建FastAPI应用...")
    app = FastAPI()
    print("   ✅ FastAPI应用创建成功")
except Exception as e:
    print(f"   ❌ FastAPI应用创建失败: {e}")
    exit(1)

try:
    print("4. 添加路由...")
    @app.get("/")
    def root():
        return {"message": "Hello World"}
    print("   ✅ 路由添加成功")
except Exception as e:
    print(f"   ❌ 路由添加失败: {e}")
    exit(1)

try:
    print("5. 启动服务器...")
    print("   正在启动服务器，请等待...")
    uvicorn.run(app, host="127.0.0.1", port=8002, log_level="info")
except Exception as e:
    print(f"   ❌ 服务器启动失败: {e}")
    import traceback
    traceback.print_exc()
    exit(1)
