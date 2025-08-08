#!/usr/bin/env python3
"""
端口测试脚本
"""

import socket
import sys

def test_port(port):
    """测试端口是否可用"""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex(('127.0.0.1', port))
        sock.close()
        return result != 0  # 0表示端口被占用
    except Exception as e:
        print(f"测试端口 {port} 时出错: {e}")
        return False

def main():
    """测试多个端口"""
    ports = [8001, 8002, 8003, 8004, 8005]
    
    print("🔍 测试端口可用性...")
    for port in ports:
        if test_port(port):
            print(f"✅ 端口 {port} 可用")
        else:
            print(f"❌ 端口 {port} 被占用")

if __name__ == "__main__":
    main()
