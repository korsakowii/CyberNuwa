#!/usr/bin/env python3
"""
深度诊断脚本 - 全面检查后端问题
"""

import sys
import os
import traceback
import subprocess
import socket
import platform

def check_system_info():
    """检查系统信息"""
    print("🔍 系统信息检查...")
    print(f"   操作系统: {platform.system()} {platform.release()}")
    print(f"   Python版本: {sys.version}")
    print(f"   当前目录: {os.getcwd()}")
    print(f"   用户: {os.getenv('USER', 'unknown')}")
    return True

def check_virtual_env():
    """检查虚拟环境"""
    print("\n🔍 虚拟环境检查...")
    try:
        venv_path = os.path.join(os.getcwd(), 'venv')
        if os.path.exists(venv_path):
            print(f"   ✅ 虚拟环境存在: {venv_path}")
            
            # 检查Python可执行文件
            python_path = os.path.join(venv_path, 'bin', 'python')
            if os.path.exists(python_path):
                print(f"   ✅ Python可执行文件存在: {python_path}")
                
                # 检查Python版本
                result = subprocess.run([python_path, '--version'], 
                                      capture_output=True, text=True)
                if result.returncode == 0:
                    print(f"   ✅ Python版本: {result.stdout.strip()}")
                else:
                    print(f"   ❌ Python版本检查失败: {result.stderr}")
                    return False
            else:
                print(f"   ❌ Python可执行文件不存在: {python_path}")
                return False
        else:
            print(f"   ❌ 虚拟环境不存在: {venv_path}")
            return False
        return True
    except Exception as e:
        print(f"   ❌ 虚拟环境检查失败: {e}")
        return False

def check_dependencies():
    """检查依赖包"""
    print("\n🔍 依赖包检查...")
    try:
        # 激活虚拟环境并检查依赖
        python_path = os.path.join(os.getcwd(), 'venv', 'bin', 'python')
        result = subprocess.run([python_path, '-m', 'pip', 'list'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            packages = result.stdout
            required_packages = ['fastapi', 'uvicorn', 'pydantic', 'python-dotenv']
            
            for package in required_packages:
                if package in packages:
                    print(f"   ✅ {package} 已安装")
                else:
                    print(f"   ❌ {package} 未安装")
                    return False
            return True
        else:
            print(f"   ❌ 依赖检查失败: {result.stderr}")
            return False
    except Exception as e:
        print(f"   ❌ 依赖检查异常: {e}")
        return False

def check_network():
    """检查网络配置"""
    print("\n🔍 网络配置检查...")
    try:
        # 测试本地回环
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex(('127.0.0.1', 8001))
        sock.close()
        
        if result != 0:
            print("   ✅ 端口8001可用")
        else:
            print("   ❌ 端口8001被占用")
            return False
            
        return True
    except Exception as e:
        print(f"   ❌ 网络检查失败: {e}")
        return False

def test_imports():
    """测试模块导入"""
    print("\n🔍 模块导入测试...")
    try:
        # 激活虚拟环境
        python_path = os.path.join(os.getcwd(), 'venv', 'bin', 'python')
        
        # 测试基本导入
        test_code = """
import sys
sys.path.insert(0, '.')

try:
    from fastapi import FastAPI
    print('✅ FastAPI 导入成功')
except Exception as e:
    print(f'❌ FastAPI 导入失败: {e}')
    sys.exit(1)

try:
    import uvicorn
    print('✅ uvicorn 导入成功')
except Exception as e:
    print(f'❌ uvicorn 导入失败: {e}')
    sys.exit(1)

try:
    from dotenv import load_dotenv
    print('✅ python-dotenv 导入成功')
except Exception as e:
    print(f'❌ python-dotenv 导入失败: {e}')
    sys.exit(1)

print('✅ 所有基本模块导入成功')
"""
        
        result = subprocess.run([python_path, '-c', test_code], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print(result.stdout)
            return True
        else:
            print(f"   ❌ 模块导入测试失败: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"   ❌ 模块导入测试异常: {e}")
        return False

def test_server_startup():
    """测试服务器启动"""
    print("\n🔍 服务器启动测试...")
    try:
        # 创建简单的测试服务器
        test_server_code = """
from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

if __name__ == "__main__":
    print("启动测试服务器...")
    uvicorn.run(app, host="127.0.0.1", port=8001, log_level="error")
"""
        
        # 写入临时文件
        with open('temp_test_server.py', 'w') as f:
            f.write(test_server_code)
        
        # 启动服务器
        python_path = os.path.join(os.getcwd(), 'venv', 'bin', 'python')
        process = subprocess.Popen([python_path, 'temp_test_server.py'], 
                                 stdout=subprocess.PIPE, 
                                 stderr=subprocess.PIPE)
        
        # 等待启动
        import time
        time.sleep(3)
        
        # 检查进程是否运行
        if process.poll() is None:
            print("   ✅ 测试服务器启动成功")
            
            # 测试API调用
            import requests
            try:
                response = requests.get('http://127.0.0.1:8001/', timeout=5)
                if response.status_code == 200:
                    print("   ✅ API调用成功")
                else:
                    print(f"   ❌ API调用失败: {response.status_code}")
            except Exception as e:
                print(f"   ❌ API调用异常: {e}")
            
            # 终止进程
            process.terminate()
            process.wait()
            
            # 清理临时文件
            os.remove('temp_test_server.py')
            
            return True
        else:
            stdout, stderr = process.communicate()
            print(f"   ❌ 测试服务器启动失败")
            print(f"   错误信息: {stderr.decode()}")
            
            # 清理临时文件
            if os.path.exists('temp_test_server.py'):
                os.remove('temp_test_server.py')
            
            return False
            
    except Exception as e:
        print(f"   ❌ 服务器启动测试异常: {e}")
        traceback.print_exc()
        return False

def main():
    """主诊断函数"""
    print("🚀 CyberNuwa 后端深度诊断开始...\n")
    
    tests = [
        check_system_info,
        check_virtual_env,
        check_dependencies,
        check_network,
        test_imports,
        test_server_startup
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print(f"📊 深度诊断结果: {passed}/{total} 测试通过")
    
    if passed == total:
        print("🎉 所有测试通过！后端应该可以正常启动")
        print("\n💡 建议:")
        print("   1. 使用 'python stable_server.py' 启动后端")
        print("   2. 检查前端API配置是否正确")
        print("   3. 确保端口8001没有被其他程序占用")
        return True
    else:
        print("⚠️  发现问题，请根据上述错误信息进行修复")
        print("\n🔧 修复建议:")
        if passed < 2:
            print("   1. 检查虚拟环境是否正确创建")
            print("   2. 重新安装依赖: pip install -r requirements.txt")
        elif passed < 4:
            print("   1. 检查网络配置")
            print("   2. 尝试使用不同端口")
        else:
            print("   1. 检查Python版本兼容性")
            print("   2. 重新安装FastAPI和uvicorn")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
