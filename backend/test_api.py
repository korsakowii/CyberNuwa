#!/usr/bin/env python3
"""
CyberNuwa Backend API 测试脚本
"""

import requests
import json
import time
from typing import Dict, Any

BASE_URL = "http://localhost:8000"

def test_api_endpoint(method: str, endpoint: str, data: Dict[str, Any] = None) -> Dict[str, Any]:
    """测试API端点"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method.upper() == "GET":
            response = requests.get(url, params=data if data else {})
        elif method.upper() == "POST":
            response = requests.post(url, json=data if data else {})
        elif method.upper() == "PUT":
            response = requests.put(url, json=data if data else {})
        elif method.upper() == "DELETE":
            response = requests.delete(url)
        else:
            return {"error": f"不支持的HTTP方法: {method}"}
        
        return {
            "status_code": response.status_code,
            "data": response.json() if response.content else None,
            "success": response.status_code < 400
        }
    except requests.exceptions.ConnectionError:
        return {"error": "无法连接到服务器，请确保后端服务正在运行"}
    except Exception as e:
        return {"error": f"请求失败: {str(e)}"}

def print_result(test_name: str, result: Dict[str, Any]):
    """打印测试结果"""
    print(f"\n{'='*50}")
    print(f"测试: {test_name}")
    print(f"{'='*50}")
    
    if "error" in result:
        print(f"❌ 错误: {result['error']}")
    else:
        status = "✅" if result.get("success") else "❌"
        print(f"{status} 状态码: {result.get('status_code')}")
        
        data = result.get("data")
        if data:
            print(f"📄 响应数据:")
            print(json.dumps(data, ensure_ascii=False, indent=2))
    
    print("-" * 50)

def main():
    """主测试函数"""
    print("🧪 CyberNuwa Backend API 测试")
    print("=" * 50)
    
    # 测试1: 健康检查
    print_result("健康检查", test_api_endpoint("GET", "/health"))
    
    # 测试2: 提交愿望
    wish_data = {
        "content": "想知道喜欢的女生什么时候跟我确定关系",
        "user_id": "user_001"
    }
    wish_result = test_api_endpoint("POST", "/api/wishes/submit_wish", wish_data)
    print_result("提交愿望", wish_result)
    
    if wish_result.get("success"):
        wish_id = wish_result.get("data", {}).get("data", {}).get("id")
        
        # 测试3: 合成任务
        task_data = {
            "wish_id": wish_id,
            "use_ai": True
        }
        task_result = test_api_endpoint("POST", "/api/tasks/synthesize_task", task_data)
        print_result("合成任务", task_result)
        
        if task_result.get("success"):
            task_id = task_result.get("data", {}).get("data", {}).get("task", {}).get("id")
            
            # 测试4: 提交模块
            module_data = {
                "task_id": task_id,
                "name": "情感分析模块",
                "content": "def analyze_emotion(text): return {'emotion': 'positive', 'confidence': 0.8}",
                "user_id": "user_002"
            }
            module_result = test_api_endpoint("POST", "/api/modules/submit_module", module_data)
            print_result("提交模块", module_result)
            
            if module_result.get("success"):
                module_id = module_result.get("data", {}).get("data", {}).get("id")
                
                # 测试5: 构建智能体
                agent_data = {
                    "task_id": task_id,
                    "modules": [module_id]
                }
                agent_result = test_api_endpoint("POST", "/api/agents/build_agent", agent_data)
                print_result("构建智能体", agent_result)
                
                if agent_result.get("success"):
                    agent_id = agent_result.get("data", {}).get("data", {}).get("id")
                    
                    # 测试6: 获取智能体演示
                    demo_result = test_api_endpoint("GET", f"/api/agents/get_agent_demo/{agent_id}")
                    print_result("获取智能体演示", demo_result)
                    
                    # 测试7: 记录署名
                    signature_data = {
                        "agent_id": agent_id,
                        "user_id": "user_003",
                        "contribution": "参与了智能体的设计和测试"
                    }
                    signature_result = test_api_endpoint("POST", "/api/signatures/signature_log", signature_data)
                    print_result("记录署名", signature_result)
    
    # 测试8: 获取任务列表
    tasks_result = test_api_endpoint("GET", "/api/tasks/list_tasks", {"page": 1, "size": 5})
    print_result("获取任务列表", tasks_result)
    
    # 测试9: 获取愿望列表
    wishes_result = test_api_endpoint("GET", "/api/wishes/list_wishes", {"page": 1, "size": 5})
    print_result("获取愿望列表", wishes_result)
    
    print("\n🎉 测试完成!")
    print("=" * 50)

if __name__ == "__main__":
    main() 