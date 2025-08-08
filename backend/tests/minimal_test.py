#!/usr/bin/env python3
"""
最小化测试服务器
"""

from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/test")
def test():
    return {"status": "ok"}

if __name__ == "__main__":
    print("启动最小化测试服务器...")
    try:
        uvicorn.run(app, host="127.0.0.1", port=8001)
    except Exception as e:
        print(f"启动失败: {e}")
        import traceback
        traceback.print_exc()
