#!/usr/bin/env python3
"""
CyberNuwa 前后端集成测试脚本
"""

import requests
import json
import time
from typing import Dict, Any

FRONTEND_URL = "http://localhost:3000"
BACKEND_URL = "http://localhost:8000"

def test_backend_api():
    """测试后端API"""
    print("🔧 测试后端API...")
    
    # 测试健康检查
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=5)
        if response.status_code == 200:
            print("✅ 后端健康检查通过")
        else:
            print(f"❌ 后端健康检查失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 后端连接失败: {e}")
        return False
    
    # 测试API文档
    try:
        response = requests.get(f"{BACKEND_URL}/docs", timeout=5)
        if response.status_code == 200:
            print("✅ 后端API文档可访问")
        else:
            print(f"❌ 后端API文档访问失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 后端API文档连接失败: {e}")
    
    return True

def test_frontend_pages():
    """测试前端页面"""
    print("\n🌐 测试前端页面...")
    
    pages = [
        ("主页", "/"),
        ("智能体页面", "/agents"),
        ("愿望页面", "/wishes"),
        ("任务广场", "/task-square"),
        ("发布任务", "/launch-mission"),
        ("训练智能体", "/train-agent"),
        ("元叙事广场", "/narratives"),
        ("角色页面", "/roles"),
    ]
    
    successful = 0
    for page_name, path in pages:
        try:
            response = requests.get(f"{FRONTEND_URL}{path}", timeout=10)
            if response.status_code == 200:
                print(f"✅ {page_name} - 可访问")
                successful += 1
            else:
                print(f"❌ {page_name} - 状态码: {response.status_code}")
        except Exception as e:
            print(f"❌ {page_name} - 连接失败: {e}")
    
    print(f"📊 前端页面测试: {successful}/{len(pages)} 成功")
    return successful == len(pages)

def test_full_workflow():
    """测试完整工作流程"""
    print("\n🔄 测试完整工作流程...")
    
    try:
        # 1. 提交愿望
        wish_data = {
            "content": "测试愿望：希望有一个智能助手帮我管理时间",
            "user_id": "test_user_001"
        }
        response = requests.post(f"{BACKEND_URL}/api/wishes/submit_wish", json=wish_data, timeout=10)
        if response.status_code != 200:
            print("❌ 愿望提交失败")
            return False
        
        wish_result = response.json()
        wish_id = wish_result.get("data", {}).get("id")
        print(f"✅ 愿望提交成功，ID: {wish_id}")
        
        # 2. 合成任务
        task_data = {
            "wish_id": wish_id,
            "use_ai": True
        }
        response = requests.post(f"{BACKEND_URL}/api/tasks/synthesize_task", json=task_data, timeout=10)
        if response.status_code != 200:
            print("❌ 任务合成失败")
            return False
        
        task_result = response.json()
        task_id = task_result.get("data", {}).get("task", {}).get("id")
        print(f"✅ 任务合成成功，ID: {task_id}")
        
        # 3. 提交模块
        module_data = {
            "task_id": task_id,
            "name": "时间管理模块",
            "content": "def manage_time(): return {'status': 'managed', 'efficiency': 0.9}",
            "user_id": "test_user_002"
        }
        response = requests.post(f"{BACKEND_URL}/api/modules/submit_module", json=module_data, timeout=10)
        if response.status_code != 200:
            print("❌ 模块提交失败")
            return False
        
        module_result = response.json()
        module_id = module_result.get("data", {}).get("id")
        print(f"✅ 模块提交成功，ID: {module_id}")
        
        # 4. 构建智能体
        agent_data = {
            "task_id": task_id,
            "modules": [module_id]
        }
        response = requests.post(f"{BACKEND_URL}/api/agents/build_agent", json=agent_data, timeout=10)
        if response.status_code != 200:
            print("❌ 智能体构建失败")
            return False
        
        agent_result = response.json()
        agent_id = agent_result.get("data", {}).get("id")
        print(f"✅ 智能体构建成功，ID: {agent_id}")
        
        print("🎉 完整工作流程测试通过！")
        return True
        
    except Exception as e:
        print(f"❌ 工作流程测试失败: {e}")
        return False

def main():
    """主测试函数"""
    print("🧪 CyberNuwa 前后端集成测试")
    print("=" * 60)
    
    # 测试后端
    backend_ok = test_backend_api()
    
    # 测试前端
    frontend_ok = test_frontend_pages()
    
    # 测试完整工作流程
    workflow_ok = False
    if backend_ok:
        workflow_ok = test_full_workflow()
    
    # 总结
    print("\n" + "=" * 60)
    print("📊 测试结果总结")
    print("=" * 60)
    print(f"🔧 后端API: {'✅ 正常' if backend_ok else '❌ 异常'}")
    print(f"🌐 前端页面: {'✅ 正常' if frontend_ok else '❌ 异常'}")
    print(f"🔄 完整工作流程: {'✅ 正常' if workflow_ok else '❌ 异常'}")
    
    if backend_ok and frontend_ok and workflow_ok:
        print("\n🎊 所有测试通过！CyberNuwa 系统运行正常！")
        print(f"🌐 前端地址: {FRONTEND_URL}")
        print(f"🔧 后端地址: {BACKEND_URL}")
        print(f"📖 API文档: {BACKEND_URL}/docs")
    else:
        print("\n⚠️  部分测试失败，请检查系统状态。")

if __name__ == "__main__":
    main() 