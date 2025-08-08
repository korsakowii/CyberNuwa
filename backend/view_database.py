#!/usr/bin/env python3
"""
数据库查看工具
用于查看CyberNuwa项目的所有数据库内容
"""

import json
import sqlite3
import os
from datetime import datetime

def print_separator(title):
    """打印分隔符"""
    print("\n" + "="*60)
    print(f"📊 {title}")
    print("="*60)

def view_json_database(file_path, title):
    """查看JSON数据库文件"""
    print_separator(title)
    
    if not os.path.exists(file_path):
        print(f"❌ 文件不存在: {file_path}")
        return
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if not data:
            print("📭 数据库为空")
            return
        
        print(f"📄 文件路径: {file_path}")
        print(f"📊 记录数量: {len(data)}")
        print("\n📋 数据内容:")
        
        for i, item in enumerate(data, 1):
            print(f"\n--- 记录 {i} ---")
            for key, value in item.items():
                if isinstance(value, list):
                    print(f"  {key}: {', '.join(map(str, value))}")
                else:
                    print(f"  {key}: {value}")
                    
    except Exception as e:
        print(f"❌ 读取文件失败: {e}")

def view_sqlite_database(db_path, table_name):
    """查看SQLite数据库表"""
    print_separator(f"SQLite表: {table_name}")
    
    if not os.path.exists(db_path):
        print(f"❌ 数据库文件不存在: {db_path}")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # 获取表结构
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = cursor.fetchall()
        
        print(f"📄 数据库文件: {db_path}")
        print(f"📋 表名: {table_name}")
        print(f"🏗️  表结构:")
        for col in columns:
            print(f"  - {col[1]} ({col[2]})")
        
        # 获取记录数量
        cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
        count = cursor.fetchone()[0]
        print(f"📊 记录数量: {count}")
        
        if count > 0:
            # 获取所有数据
            cursor.execute(f"SELECT * FROM {table_name}")
            rows = cursor.fetchall()
            
            print("\n📋 数据内容:")
            for i, row in enumerate(rows, 1):
                print(f"\n--- 记录 {i} ---")
                for j, value in enumerate(row):
                    col_name = columns[j][1] if j < len(columns) else f"col_{j}"
                    print(f"  {col_name}: {value}")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ 查询失败: {e}")

def main():
    """主函数"""
    print("🌌 CyberNuwa 数据库查看工具")
    print("="*60)
    
    # 查看JSON数据库文件
    data_dir = "data"
    json_files = [
        ("wishes.json", "愿望数据库"),
        ("tasks.json", "任务数据库"),
        ("modules.json", "模块数据库"),
        ("agents.json", "智能体数据库"),
        ("signatures.json", "署名数据库")
    ]
    
    for filename, title in json_files:
        file_path = os.path.join(data_dir, filename)
        view_json_database(file_path, title)
    
    # 查看SQLite数据库
    sqlite_db = "cybernuwa.db"
    sqlite_tables = ["wishes", "tasks", "modules", "agents", "signatures"]
    
    for table in sqlite_tables:
        view_sqlite_database(sqlite_db, table)
    
    print("\n" + "="*60)
    print("✅ 数据库查看完成!")
    print("="*60)

if __name__ == "__main__":
    main() 