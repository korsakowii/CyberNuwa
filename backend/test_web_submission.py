#!/usr/bin/env python3
"""
网页表单提交测试脚本
监控数据库变化，验证网页提交是否成功写入本地数据库
"""

import json
import time
import requests
from datetime import datetime

def get_database_counts():
    """获取数据库记录数量"""
    counts = {}
    try:
        with open('data/wishes.json', 'r', encoding='utf-8') as f:
            wishes = json.load(f)
            counts['wishes'] = len(wishes)
    except:
        counts['wishes'] = 0
    
    try:
        with open('data/tasks.json', 'r', encoding='utf-8') as f:
            tasks = json.load(f)
            counts['tasks'] = len(tasks)
    except:
        counts['tasks'] = 0
    
    try:
        with open('data/modules.json', 'r', encoding='utf-8') as f:
            modules = json.load(f)
            counts['modules'] = len(modules)
    except:
        counts['modules'] = 0
    
    try:
        with open('data/agents.json', 'r', encoding='utf-8') as f:
            agents = json.load(f)
            counts['agents'] = len(agents)
    except:
        counts['agents'] = 0
    
    return counts

def test_web_submission():
    """测试网页表单提交"""
    print("🧪 网页表单提交测试")
    print("=" * 50)
    
    # 1. 获取初始状态
    print("📊 初始数据库状态:")
    initial_counts = get_database_counts()
    for db, count in initial_counts.items():
        print(f"   {db}: {count} 条记录")
    
    print(f"\n⏰ 开始时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("\n🌐 请访问以下地址进行测试:")
    print("   主页面: http://localhost:3000")
    print("   愿望页面: http://localhost:3000/wishes")
    print("   集成测试: http://localhost:3000/integration-test")
    
    print("\n📝 测试步骤:")
    print("   1. 打开浏览器访问 http://localhost:3000/wishes")
    print("   2. 在表单中输入愿望内容")
    print("   3. 点击提交按钮")
    print("   4. 观察下方实时数据变化")
    
    print("\n🔄 实时监控数据库变化...")
    print("-" * 50)
    
    last_counts = initial_counts.copy()
    check_count = 0
    
    while True:
        try:
            current_counts = get_database_counts()
            check_count += 1
            
            # 检查是否有变化
            changes = []
            for db, count in current_counts.items():
                if count != last_counts[db]:
                    changes.append(f"{db}: {last_counts[db]} → {count}")
            
            if changes:
                print(f"\n🆕 检测到数据变化! (第{check_count}次检查)")
                print(f"⏰ 时间: {datetime.now().strftime('%H:%M:%S')}")
                for change in changes:
                    print(f"   📈 {change}")
                
                # 显示最新数据
                if 'wishes' in changes:
                    try:
                        with open('data/wishes.json', 'r', encoding='utf-8') as f:
                            wishes = json.load(f)
                            latest_wish = wishes[-1] if wishes else None
                            if latest_wish:
                                print(f"   📝 最新愿望: {latest_wish.get('content', 'N/A')}")
                                print(f"   👤 用户ID: {latest_wish.get('user_id', 'N/A')}")
                                print(f"   🕒 创建时间: {latest_wish.get('created_at', 'N/A')}")
                    except Exception as e:
                        print(f"   ❌ 读取愿望数据失败: {e}")
                
                print("-" * 50)
            
            last_counts = current_counts.copy()
            time.sleep(2)  # 每2秒检查一次
            
        except KeyboardInterrupt:
            print("\n\n⏹️ 监控已停止")
            print("📊 最终数据库状态:")
            final_counts = get_database_counts()
            for db, count in final_counts.items():
                print(f"   {db}: {count} 条记录")
            break
        except Exception as e:
            print(f"❌ 监控出错: {e}")
            time.sleep(5)

if __name__ == "__main__":
    test_web_submission() 