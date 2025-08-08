#!/usr/bin/env python3
"""
快速数据库查看工具
"""

import json
import os

def quick_view():
    """快速查看数据库内容"""
    print("🌌 CyberNuwa 数据库快速查看")
    print("="*50)
    
    # 查看JSON文件
    data_dir = "data"
    files = ["wishes.json", "tasks.json", "modules.json", "agents.json", "signatures.json"]
    
    for filename in files:
        file_path = os.path.join(data_dir, filename)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print(f"\n📄 {filename}: {len(data)} 条记录")
            
            # 显示前3条记录的关键信息
            for i, item in enumerate(data[:3], 1):
                if filename == "wishes.json":
                    print(f"  {i}. {item.get('content', 'N/A')[:50]}...")
                elif filename == "tasks.json":
                    print(f"  {i}. {item.get('title', 'N/A')}")
                elif filename == "modules.json":
                    print(f"  {i}. {item.get('name', 'N/A')}")
                elif filename == "agents.json":
                    print(f"  {i}. {item.get('name', 'N/A')} ({item.get('status', 'N/A')})")
                elif filename == "signatures.json":
                    print(f"  {i}. {item.get('contribution', 'N/A')[:30]}...")
            
            if len(data) > 3:
                print(f"  ... 还有 {len(data) - 3} 条记录")

if __name__ == "__main__":
    quick_view() 