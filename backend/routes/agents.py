"""
智能体管理路由 - 处理智能体的构建和管理
"""

from fastapi import APIRouter, HTTPException
from typing import List, Optional
from models.schemas import (
    AgentCreate, AgentResponse, AgentUpdate, APIResponse, PaginatedResponse,
    AgentBuildRequest, AgentDemoResponse
)
from utils.database import agents_db, tasks_db, modules_db
from utils.ai_service import build_agent_from_modules, generate_agent_demo
import os
import aiofiles
from utils.config import settings

router = APIRouter()

@router.post("/build_agent", response_model=APIResponse)
async def build_agent(request: AgentBuildRequest):
    """
    汇总任务模块，调用 LLM 构建 demo agent
    
    - **task_id**: 任务ID
    - **modules**: 模块ID列表
    """
    try:
        # 验证任务是否存在
        task = await tasks_db.get_item_by_id(request.task_id)
        if not task:
            raise HTTPException(status_code=404, detail="任务不存在")
        
        # 获取指定的模块
        all_modules = await modules_db.read_all()
        selected_modules = [m for m in all_modules if m.get('id') in request.modules]
        
        if not selected_modules:
            raise HTTPException(status_code=400, detail="未找到指定的模块")
        
        # 调用AI服务构建智能体
        agent_data = await build_agent_from_modules(task, selected_modules)
        
        # 创建智能体记录
        agent_record = {
            "task_id": request.task_id,
            "name": agent_data.get("name", f"智能体_{request.task_id}"),
            "description": agent_data.get("description", ""),
            "code": agent_data.get("code", ""),
            "status": "building"
        }
        
        created_agent = await agents_db.add_item(agent_record)
        
        # 保存智能体代码到文件
        agent_file_path = os.path.join(
            settings.data_dir,
            settings.agents_dir,
            f"agent_{created_agent['id']}.py"
        )
        
        async with aiofiles.open(agent_file_path, 'w', encoding='utf-8') as f:
            await f.write(agent_data.get("code", ""))
        
        created_agent['file_path'] = agent_file_path
        created_agent['modules_used'] = [m['id'] for m in selected_modules]
        
        return APIResponse(
            success=True,
            message="智能体构建成功",
            data=created_agent
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"构建智能体失败: {str(e)}")

@router.get("/get_agent_demo/{agent_id}", response_model=APIResponse)
async def get_agent_demo(agent_id: int):
    """
    返回某个 Agent 的完整结构与 demo 代码
    
    - **agent_id**: 智能体ID
    """
    try:
        agent = await agents_db.get_item_by_id(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="智能体不存在")
        
        # 获取关联的任务和模块信息
        task = await tasks_db.get_item_by_id(agent['task_id'])
        all_modules = await modules_db.read_all()
        task_modules = [m for m in all_modules if m.get('task_id') == agent['task_id']]
        
        # 生成演示代码
        demo_data = await generate_agent_demo(agent, task, task_modules)
        
        # 构建完整的演示响应
        demo_response = AgentDemoResponse(
            agent=agent,
            demo_code=demo_data.get("demo_code", ""),
            usage_examples=demo_data.get("usage_examples", []),
            dependencies=demo_data.get("dependencies", [])
        )
        
        return APIResponse(
            success=True,
            message="获取智能体演示成功",
            data=demo_response.dict()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取智能体演示失败: {str(e)}")

@router.get("/list_agents", response_model=APIResponse)
async def list_agents(
    task_id: Optional[int] = None,
    status: Optional[str] = None,
    page: int = 1,
    size: int = 10
):
    """
    获取智能体列表
    
    - **task_id**: 任务ID筛选（可选）
    - **status**: 状态筛选（可选）
    - **page**: 页码（默认1）
    - **size**: 每页数量（默认10）
    """
    try:
        agents = await agents_db.read_all()
        
        # 筛选条件
        if task_id:
            agents = [a for a in agents if a.get('task_id') == task_id]
        if status:
            agents = [a for a in agents if a.get('status') == status]
        
        # 按创建时间倒序排序
        agents.sort(key=lambda x: x.get('created_at', ''), reverse=True)
        
        # 分页处理
        total = len(agents)
        start = (page - 1) * size
        end = start + size
        paginated_agents = agents[start:end]
        
        # 为每个智能体添加关联的任务信息
        for agent in paginated_agents:
            if agent.get('task_id'):
                task = await tasks_db.get_item_by_id(agent['task_id'])
                agent['task'] = task
        
        return APIResponse(
            success=True,
            message="获取智能体列表成功",
            data=PaginatedResponse(
                items=paginated_agents,
                total=total,
                page=page,
                size=size,
                pages=(total + size - 1) // size
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取智能体列表失败: {str(e)}")

@router.get("/agent/{agent_id}", response_model=APIResponse)
async def get_agent(agent_id: int):
    """
    获取单个智能体详情
    
    - **agent_id**: 智能体ID
    """
    try:
        agent = await agents_db.get_item_by_id(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="智能体不存在")
        
        # 添加关联的任务信息
        if agent.get('task_id'):
            task = await tasks_db.get_item_by_id(agent['task_id'])
            agent['task'] = task
        
        return APIResponse(
            success=True,
            message="获取智能体详情成功",
            data=agent
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取智能体详情失败: {str(e)}")

@router.post("/agent", response_model=APIResponse)
async def create_agent(agent: AgentCreate):
    """
    手动创建智能体
    
    - **agent**: 智能体信息
    """
    try:
        agent_data = agent.dict()
        created_agent = await agents_db.add_item(agent_data)
        
        return APIResponse(
            success=True,
            message="智能体创建成功",
            data=created_agent
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"创建智能体失败: {str(e)}")

@router.put("/agent/{agent_id}", response_model=APIResponse)
async def update_agent(agent_id: int, agent_update: AgentUpdate):
    """
    更新智能体信息
    
    - **agent_id**: 智能体ID
    - **agent_update**: 更新内容
    """
    try:
        updates = {k: v for k, v in agent_update.dict().items() if v is not None}
        updated_agent = await agents_db.update_item(agent_id, updates)
        
        if not updated_agent:
            raise HTTPException(status_code=404, detail="智能体不存在")
        
        return APIResponse(
            success=True,
            message="智能体更新成功",
            data=updated_agent
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新智能体失败: {str(e)}")

@router.delete("/agent/{agent_id}", response_model=APIResponse)
async def delete_agent(agent_id: int):
    """
    删除智能体
    
    - **agent_id**: 智能体ID
    """
    try:
        success = await agents_db.delete_item(agent_id)
        if not success:
            raise HTTPException(status_code=404, detail="智能体不存在")
        
        return APIResponse(
            success=True,
            message="智能体删除成功"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除智能体失败: {str(e)}")

@router.get("/agents_by_task/{task_id}", response_model=APIResponse)
async def get_agents_by_task(task_id: int):
    """
    获取指定任务的所有智能体
    
    - **task_id**: 任务ID
    """
    try:
        agents = await agents_db.read_all()
        task_agents = [a for a in agents if a.get('task_id') == task_id]
        
        return APIResponse(
            success=True,
            message="获取任务相关智能体成功",
            data=task_agents
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取任务相关智能体失败: {str(e)}")

@router.post("/agent/{agent_id}/test", response_model=APIResponse)
async def test_agent(agent_id: int, input_data: dict):
    """
    测试智能体功能
    
    - **agent_id**: 智能体ID
    - **input_data**: 测试输入数据
    """
    try:
        agent = await agents_db.get_item_by_id(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="智能体不存在")
        
        # 这里可以添加实际的智能体测试逻辑
        # 目前返回模拟的测试结果
        test_result = {
            "agent_id": agent_id,
            "input": input_data,
            "output": f"智能体 {agent['name']} 的测试输出",
            "status": "success",
            "execution_time": "0.5s"
        }
        
        return APIResponse(
            success=True,
            message="智能体测试成功",
            data=test_result
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"测试智能体失败: {str(e)}") 