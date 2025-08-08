#!/usr/bin/env python3
"""
实时数据库监控工具
监控数据库文件的变化
"""

import json
import os
import time
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class DatabaseMonitor(FileSystemEventHandler):
    def __init__(self):
        self.last_counts = {}
        self.data_dir = "data"
        self.update_counts()
    
    def update_counts(self):
        """更新记录数量"""
        for filename in os.listdir(self.data_dir):
            if filename.endswith('.json'):
                file_path = os.path.join(self.data_dir, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    self.last_counts[filename] = len(data)
                except:
                    self.last_counts[filename] = 0
    
    def on_modified(self, event):
        if event.is_directory:
            return
        
        if event.src_path.endswith('.json'):
            filename = os.path.basename(event.src_path)
            try:
                with open(event.src_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                current_count = len(data)
                last_count = self.last_counts.get(filename, 0)
                
                if current_count != last_count:
                    print(f"\n🔄 数据库变化检测 - {datetime.now().strftime('%H:%M:%S')}")
                    print(f"📄 文件: {filename}")
                    print(f"📊 记录数: {last_count} → {current_count}")
                    
                    if current_count > last_count:
                        print(f"➕ 新增了 {current_count - last_count} 条记录")
                        # 显示最新的记录
                        if data:
                            latest = data[-1]
                            print(f"📝 最新记录: {latest.get('content', latest.get('title', 'N/A'))[:50]}...")
                    elif current_count < last_count:
                        print(f"➖ 删除了 {last_count - current_count} 条记录")
                    
                    self.last_counts[filename] = current_count
                    
            except Exception as e:
                print(f"❌ 读取文件失败: {e}")

def monitor_database():
    """开始监控数据库"""
    print("🌌 CyberNuwa 数据库实时监控")
    print("="*50)
    print("正在监控数据库文件变化...")
    print("按 Ctrl+C 停止监控")
    print("="*50)
    
    # 显示初始状态
    monitor = DatabaseMonitor()
    print("\n📊 当前数据库状态:")
    for filename, count in monitor.last_counts.items():
        print(f"  {filename}: {count} 条记录")
    
    # 设置文件监控
    observer = Observer()
    observer.schedule(monitor, monitor.data_dir, recursive=False)
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\n\n🛑 监控已停止")
    
    observer.join()

if __name__ == "__main__":
    monitor_database() 