#!/usr/bin/env python3
"""
CyberNuwa Frontend 测试脚本
"""

import requests
import time
from typing import Dict, Any

BASE_URL = "http://localhost:3000"

def test_frontend_page(page_name: str, path: str) -> Dict[str, Any]:
    """测试前端页面"""
    url = f"{BASE_URL}{path}"
    
    try:
        response = requests.get(url, timeout=10)
        return {
            "page": page_name,
            "url": url,
            "status_code": response.status_code,
            "success": response.status_code == 200,
            "content_length": len(response.content),
            "has_html": "<html" in response.text.lower() or "<!doctype" in response.text.lower()
        }
    except requests.exceptions.ConnectionError:
        return {
            "page": page_name,
            "url": url,
            "error": "无法连接到前端服务",
            "success": False
        }
    except Exception as e:
        return {
            "page": page_name,
            "url": url,
            "error": f"请求失败: {str(e)}",
            "success": False
        }

def print_result(result: Dict[str, Any]):
    """打印测试结果"""
    print(f"\n{'='*50}")
    print(f"测试页面: {result['page']}")
    print(f"{'='*50}")
    
    if "error" in result:
        print(f"❌ 错误: {result['error']}")
    else:
        status = "✅" if result.get("success") else "❌"
        print(f"{status} 状态码: {result.get('status_code')}")
        print(f"📄 URL: {result.get('url')}")
        print(f"📊 内容长度: {result.get('content_length')} 字节")
        print(f"🌐 包含HTML: {'是' if result.get('has_html') else '否'}")
    
    print("-" * 50)

def main():
    """主测试函数"""
    print("🧪 CyberNuwa Frontend 测试")
    print("=" * 50)
    
    # 测试页面列表
    pages = [
        ("主页", "/"),
        ("智能体页面", "/agents"),
        ("愿望页面", "/wishes"),
        ("任务广场", "/task-square"),
        ("发布任务", "/launch-mission"),
        ("训练智能体", "/train-agent"),
        ("元叙事广场", "/narratives"),
        ("角色页面", "/roles"),
        ("展示页面", "/showcase"),
    ]
    
    results = []
    for page_name, path in pages:
        result = test_frontend_page(page_name, path)
        results.append(result)
        print_result(result)
        time.sleep(0.5)  # 避免请求过快
    
    # 统计结果
    successful = sum(1 for r in results if r.get("success", False))
    total = len(results)
    
    print(f"\n🎉 测试完成!")
    print(f"✅ 成功: {successful}/{total}")
    print(f"❌ 失败: {total - successful}/{total}")
    print("=" * 50)
    
    if successful == total:
        print("🎊 所有页面测试通过！前端运行正常！")
    else:
        print("⚠️  部分页面存在问题，请检查前端服务状态。")

if __name__ == "__main__":
    main() 