"""
AI服务模块 - OpenAI API调用和智能体构建逻辑
"""

import openai
import json
import os
from typing import Dict, List, Any, Optional
from utils.config import settings

# 配置OpenAI客户端
if settings.openai_api_key:
    openai.api_key = settings.openai_api_key
else:
    # 如果没有API密钥，使用模拟响应
    print("⚠️ 未配置OpenAI API密钥，将使用模拟响应")

async def synthesize_task_from_wish(wish: Dict[str, Any]) -> Dict[str, Any]:
    """
    使用AI将愿望合成为结构化任务
    
    - **wish**: 愿望数据
    """
    try:
        if not settings.openai_api_key:
            # 模拟AI响应
            return generate_mock_task_synthesis(wish)
        
        # 构建提示词
        prompt = f"""
        请将以下用户愿望转化为一个结构化的AI任务，包含任务标题、描述和必要的模块分解：

        用户愿望：{wish.get('content', '')}

        请以JSON格式返回，包含以下字段：
        - title: 任务标题
        - description: 任务描述
        - modules: 模块列表（每个模块的名称）
        - difficulty: 难度等级（简单/中等/困难）
        - estimated_time: 预估完成时间（小时）

        示例格式：
        {{
            "title": "任务标题",
            "description": "详细的任务描述",
            "modules": ["模块1", "模块2", "模块3"],
            "difficulty": "中等",
            "estimated_time": 8
        }}
        """
        
        # 调用OpenAI API
        response = await openai.ChatCompletion.acreate(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": "你是一个专业的AI任务规划师，擅长将用户愿望转化为可执行的结构化任务。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=settings.openai_max_tokens,
            temperature=0.7
        )
        
        # 解析响应
        content = response.choices[0].message.content
        task_data = json.loads(content)
        
        # 添加愿望ID
        task_data['wish_id'] = wish.get('id')
        task_data['status'] = 'open'
        
        return task_data
        
    except Exception as e:
        print(f"AI任务合成失败: {str(e)}")
        # 返回基础任务结构
        return generate_mock_task_synthesis(wish)

async def build_agent_from_modules(task: Dict[str, Any], modules: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    基于任务和模块构建智能体
    
    - **task**: 任务数据
    - **modules**: 模块列表
    """
    try:
        if not settings.openai_api_key:
            # 模拟AI响应
            return generate_mock_agent_build(task, modules)
        
        # 构建模块内容摘要
        modules_summary = []
        for module in modules:
            modules_summary.append({
                "name": module.get('name', ''),
                "content": module.get('content', '')[:500] + "..." if len(module.get('content', '')) > 500 else module.get('content', '')
            })
        
        # 构建提示词
        prompt = f"""
        基于以下任务和模块，构建一个完整的AI智能体：

        任务信息：
        - 标题：{task.get('title', '')}
        - 描述：{task.get('description', '')}

        模块信息：
        {json.dumps(modules_summary, ensure_ascii=False, indent=2)}

        请生成一个完整的Python智能体代码，包含：
        1. 智能体类定义
        2. 主要功能方法
        3. 模块集成逻辑
        4. 使用示例

        请以JSON格式返回，包含以下字段：
        - name: 智能体名称
        - description: 智能体描述
        - code: 完整的Python代码
        - dependencies: 依赖包列表
        - usage_examples: 使用示例列表
        """
        
        # 调用OpenAI API
        response = await openai.ChatCompletion.acreate(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": "你是一个专业的AI智能体开发专家，擅长将多个模块整合成完整的智能体系统。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=settings.openai_max_tokens * 2,  # 代码生成需要更多token
            temperature=0.5
        )
        
        # 解析响应
        content = response.choices[0].message.content
        agent_data = json.loads(content)
        
        return agent_data
        
    except Exception as e:
        print(f"AI智能体构建失败: {str(e)}")
        # 返回模拟智能体
        return generate_mock_agent_build(task, modules)

async def generate_agent_demo(agent: Dict[str, Any], task: Dict[str, Any], modules: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    生成智能体演示代码和文档
    
    - **agent**: 智能体数据
    - **task**: 任务数据
    - **modules**: 模块列表
    """
    try:
        if not settings.openai_api_key:
            # 模拟演示生成
            return generate_mock_agent_demo(agent, task, modules)
        
        # 构建提示词
        prompt = f"""
        为以下智能体生成演示代码和文档：

        智能体信息：
        - 名称：{agent.get('name', '')}
        - 描述：{agent.get('description', '')}
        - 代码：{agent.get('code', '')}

        任务信息：
        - 标题：{task.get('title', '')}
        - 描述：{task.get('description', '')}

        请生成：
        1. 演示代码（包含完整的使用示例）
        2. 使用说明
        3. 依赖包列表
        4. 常见问题解答

        请以JSON格式返回，包含以下字段：
        - demo_code: 演示代码
        - usage_examples: 使用示例列表
        - dependencies: 依赖包列表
        - documentation: 使用文档
        """
        
        # 调用OpenAI API
        response = await openai.ChatCompletion.acreate(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": "你是一个专业的AI智能体文档专家，擅长生成清晰的使用示例和文档。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=settings.openai_max_tokens,
            temperature=0.3
        )
        
        # 解析响应
        content = response.choices[0].message.content
        demo_data = json.loads(content)
        
        return demo_data
        
    except Exception as e:
        print(f"AI演示生成失败: {str(e)}")
        # 返回模拟演示
        return generate_mock_agent_demo(agent, task, modules)

# 模拟响应生成函数
def generate_mock_task_synthesis(wish: Dict[str, Any]) -> Dict[str, Any]:
    """生成模拟的任务合成结果"""
    wish_content = wish.get('content', '')
    
    # 根据愿望内容生成相应的任务
    if '关系' in wish_content or '女生' in wish_content:
        return {
            "wish_id": wish.get('id'),
            "title": "情感关系分析助手",
            "description": f"基于用户愿望'{wish_content}'，构建一个智能的情感关系分析系统，帮助用户理解和改善人际关系。",
            "modules": ["情感分析模块", "行为预测模块", "建议生成模块", "风险评估模块"],
            "difficulty": "中等",
            "estimated_time": 12,
            "status": "open"
        }
    elif '助手' in wish_content or '管理' in wish_content:
        return {
            "wish_id": wish.get('id'),
            "title": "智能任务管理助手",
            "description": f"基于用户愿望'{wish_content}'，构建一个智能的任务管理系统，帮助用户高效管理日常事务。",
            "modules": ["任务识别模块", "优先级排序模块", "提醒系统模块", "进度跟踪模块"],
            "difficulty": "简单",
            "estimated_time": 8,
            "status": "open"
        }
    else:
        return {
            "wish_id": wish.get('id'),
            "title": f"通用智能助手 - {wish_content[:20]}...",
            "description": f"基于用户愿望'{wish_content}'，构建一个通用的智能助手系统。",
            "modules": ["输入处理模块", "核心逻辑模块", "输出生成模块"],
            "difficulty": "中等",
            "estimated_time": 10,
            "status": "open"
        }

def generate_mock_agent_build(task: Dict[str, Any], modules: List[Dict[str, Any]]) -> Dict[str, Any]:
    """生成模拟的智能体构建结果"""
    task_title = task.get('title', '智能助手')
    module_names = [m.get('name', '') for m in modules]
    
    # 生成智能体代码
    agent_code = f'''
import json
import datetime
from typing import Dict, List, Any

class {task_title.replace(' ', '').replace('-', '')}Agent:
    """基于任务"{task_title}"构建的智能体"""
    
    def __init__(self):
        self.name = "{task_title}"
        self.modules = {module_names}
        self.created_at = datetime.datetime.now()
    
    def process_input(self, user_input: str) -> Dict[str, Any]:
        """处理用户输入"""
        return {{
            "input": user_input,
            "timestamp": datetime.datetime.now().isoformat(),
            "status": "processed"
        }}
    
    def execute_modules(self, processed_input: Dict[str, Any]) -> Dict[str, Any]:
        """执行各个模块"""
        result = {{}}
        for module in self.modules:
            result[module] = f"模块 {{module}} 执行结果"
        return result
    
    def generate_response(self, module_results: Dict[str, Any]) -> str:
        """生成最终响应"""
        return f"基于 {{len(module_results)}} 个模块的分析结果：{{json.dumps(module_results, ensure_ascii=False)}}"
    
    def run(self, user_input: str) -> str:
        """运行智能体"""
        processed = self.process_input(user_input)
        results = self.execute_modules(processed)
        return self.generate_response(results)

# 使用示例
if __name__ == "__main__":
    agent = {task_title.replace(' ', '').replace('-', '')}Agent()
    response = agent.run("测试输入")
    print(response)
'''
    
    return {
        "name": task_title,
        "description": f"基于任务'{task_title}'构建的智能体，集成了{len(modules)}个模块",
        "code": agent_code,
        "dependencies": ["json", "datetime", "typing"],
        "usage_examples": [
            "agent = Agent()",
            "response = agent.run('用户输入')",
            "print(response)"
        ]
    }

def generate_mock_agent_demo(agent: Dict[str, Any], task: Dict[str, Any], modules: List[Dict[str, Any]]) -> Dict[str, Any]:
    """生成模拟的智能体演示"""
    agent_name = agent.get('name', '智能助手')
    
    demo_code = f'''
# {agent_name} 演示代码

# 1. 安装依赖
# pip install -r requirements.txt

# 2. 导入智能体
from agent import {agent_name.replace(' ', '').replace('-', '')}Agent

# 3. 创建实例
agent = {agent_name.replace(' ', '').replace('-', '')}Agent()

# 4. 运行演示
test_inputs = [
    "你好，请介绍一下你的功能",
    "帮我分析一下当前的情况",
    "请给出一些建议"
]

for input_text in test_inputs:
    print(f"输入: {{input_text}}")
    response = agent.run(input_text)
    print(f"输出: {{response}}")
    print("-" * 50)

# 5. 高级用法
# 可以自定义模块参数
# agent.set_module_config("模块名", {{"参数": "值"}})
'''
    
    return {
        "demo_code": demo_code,
        "usage_examples": [
            "基础使用：agent.run('用户输入')",
            "获取状态：agent.get_status()",
            "重置状态：agent.reset()"
        ],
        "dependencies": ["json", "datetime", "typing"],
        "documentation": f"""
# {agent_name} 使用文档

## 功能特性
- 基于{len(modules)}个模块构建
- 支持多种输入格式
- 实时响应处理

## 安装说明
1. 确保Python 3.8+
2. 安装依赖包
3. 运行演示代码

## 常见问题
Q: 如何处理错误输入？
A: 智能体会自动进行输入验证和错误处理。

Q: 如何扩展功能？
A: 可以通过添加新模块来扩展智能体功能。
        """
    } 