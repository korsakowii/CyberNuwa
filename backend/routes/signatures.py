"""
署名管理路由 - 处理署名信息和贡献路径
"""

from fastapi import APIRouter, HTTPException
from typing import List, Optional, Dict, Any
from models.schemas import (
    SignatureCreate, SignatureResponse, APIResponse, PaginatedResponse
)
from utils.database import signatures_db, agents_db, modules_db, tasks_db, wishes_db
import json
from datetime import datetime

router = APIRouter()

@router.post("/signature_log", response_model=APIResponse)
async def signature_log(signature: SignatureCreate):
    """
    记录署名信息，生成贡献路径 json
    
    - **agent_id**: 关联的智能体ID
    - **user_id**: 用户ID
    - **contribution**: 贡献内容
    
    返回署名记录和贡献路径
    """
    try:
        # 验证智能体是否存在
        agent = await agents_db.get_item_by_id(signature.agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="智能体不存在")
        
        # 创建署名记录
        signature_data = signature.dict()
        created_signature = await signatures_db.add_item(signature_data)
        
        # 生成贡献路径
        contribution_path = await generate_contribution_path(signature.agent_id)
        
        # 更新智能体状态
        await agents_db.update_item(signature.agent_id, {"status": "ready"})
        
        return APIResponse(
            success=True,
            message="署名记录成功",
            data={
                "signature": created_signature,
                "contribution_path": contribution_path
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"记录署名失败: {str(e)}")

@router.get("/get_signature_log/{agent_id}", response_model=APIResponse)
async def get_signature_log(agent_id: int):
    """
    获取智能体的署名日志和贡献路径
    
    - **agent_id**: 智能体ID
    """
    try:
        # 验证智能体是否存在
        agent = await agents_db.get_item_by_id(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="智能体不存在")
        
        # 获取所有署名记录
        all_signatures = await signatures_db.read_all()
        agent_signatures = [s for s in all_signatures if s.get('agent_id') == agent_id]
        
        # 生成贡献路径
        contribution_path = await generate_contribution_path(agent_id)
        
        return APIResponse(
            success=True,
            message="获取署名日志成功",
            data={
                "agent": agent,
                "signatures": agent_signatures,
                "contribution_path": contribution_path
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取署名日志失败: {str(e)}")

@router.get("/list_signatures", response_model=APIResponse)
async def list_signatures(
    agent_id: Optional[int] = None,
    user_id: Optional[str] = None,
    page: int = 1,
    size: int = 10
):
    """
    获取署名列表
    
    - **agent_id**: 智能体ID筛选（可选）
    - **user_id**: 用户ID筛选（可选）
    - **page**: 页码（默认1）
    - **size**: 每页数量（默认10）
    """
    try:
        signatures = await signatures_db.read_all()
        
        # 筛选条件
        if agent_id:
            signatures = [s for s in signatures if s.get('agent_id') == agent_id]
        if user_id:
            signatures = [s for s in signatures if s.get('user_id') == user_id]
        
        # 按创建时间倒序排序
        signatures.sort(key=lambda x: x.get('created_at', ''), reverse=True)
        
        # 分页处理
        total = len(signatures)
        start = (page - 1) * size
        end = start + size
        paginated_signatures = signatures[start:end]
        
        # 为每个署名添加关联的智能体信息
        for signature in paginated_signatures:
            if signature.get('agent_id'):
                agent = await agents_db.get_item_by_id(signature['agent_id'])
                signature['agent'] = agent
        
        return APIResponse(
            success=True,
            message="获取署名列表成功",
            data=PaginatedResponse(
                items=paginated_signatures,
                total=total,
                page=page,
                size=size,
                pages=(total + size - 1) // size
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取署名列表失败: {str(e)}")

@router.get("/signature/{signature_id}", response_model=APIResponse)
async def get_signature(signature_id: int):
    """
    获取单个署名详情
    
    - **signature_id**: 署名ID
    """
    try:
        signature = await signatures_db.get_item_by_id(signature_id)
        if not signature:
            raise HTTPException(status_code=404, detail="署名不存在")
        
        # 添加关联的智能体信息
        if signature.get('agent_id'):
            agent = await agents_db.get_item_by_id(signature['agent_id'])
            signature['agent'] = agent
        
        return APIResponse(
            success=True,
            message="获取署名详情成功",
            data=signature
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取署名详情失败: {str(e)}")

@router.get("/contribution_path/{agent_id}", response_model=APIResponse)
async def get_contribution_path(agent_id: int):
    """
    获取智能体的完整贡献路径
    
    - **agent_id**: 智能体ID
    """
    try:
        # 验证智能体是否存在
        agent = await agents_db.get_item_by_id(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="智能体不存在")
        
        # 生成贡献路径
        contribution_path = await generate_contribution_path(agent_id)
        
        return APIResponse(
            success=True,
            message="获取贡献路径成功",
            data=contribution_path
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取贡献路径失败: {str(e)}")

@router.get("/user_contributions/{user_id}", response_model=APIResponse)
async def get_user_contributions(user_id: str):
    """
    获取用户的贡献历史
    
    - **user_id**: 用户ID
    """
    try:
        # 获取用户的所有署名
        all_signatures = await signatures_db.read_all()
        user_signatures = [s for s in all_signatures if s.get('user_id') == user_id]
        
        # 获取用户贡献的模块
        all_modules = await modules_db.read_all()
        user_modules = [m for m in all_modules if m.get('user_id') == user_id]
        
        # 统计贡献信息
        contribution_stats = {
            "total_signatures": len(user_signatures),
            "total_modules": len(user_modules),
            "contributed_agents": len(set(s.get('agent_id') for s in user_signatures)),
            "contributed_tasks": len(set(m.get('task_id') for m in user_modules))
        }
        
        return APIResponse(
            success=True,
            message="获取用户贡献历史成功",
            data={
                "user_id": user_id,
                "signatures": user_signatures,
                "modules": user_modules,
                "stats": contribution_stats
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取用户贡献历史失败: {str(e)}")

async def generate_contribution_path(agent_id: int) -> Dict[str, Any]:
    """
    生成智能体的完整贡献路径
    
    - **agent_id**: 智能体ID
    """
    try:
        # 获取智能体信息
        agent = await agents_db.get_item_by_id(agent_id)
        if not agent:
            return {}
        
        # 获取任务信息
        task = await tasks_db.get_item_by_id(agent['task_id'])
        if not task:
            return {}
        
        # 获取愿望信息
        wish = await wishes_db.get_item_by_id(task['wish_id'])
        
        # 获取任务相关的所有模块
        all_modules = await modules_db.read_all()
        task_modules = [m for m in all_modules if m.get('task_id') == agent['task_id']]
        
        # 获取智能体的所有署名
        all_signatures = await signatures_db.read_all()
        agent_signatures = [s for s in all_signatures if s.get('agent_id') == agent_id]
        
        # 构建贡献路径
        contribution_path = {
            "agent_id": agent_id,
            "agent_name": agent.get('name', ''),
            "creation_timeline": {
                "wish_created": wish.get('created_at') if wish else None,
                "task_created": task.get('created_at'),
                "modules_submitted": [m.get('created_at') for m in task_modules],
                "agent_built": agent.get('created_at'),
                "signatures_added": [s.get('created_at') for s in agent_signatures]
            },
            "contributors": {
                "wish_creator": wish.get('user_id') if wish else None,
                "module_contributors": list(set(m.get('user_id') for m in task_modules if m.get('user_id'))),
                "signature_contributors": list(set(s.get('user_id') for s in agent_signatures))
            },
            "modules": [
                {
                    "id": m.get('id'),
                    "name": m.get('name'),
                    "contributor": m.get('user_id'),
                    "created_at": m.get('created_at'),
                    "status": m.get('status')
                }
                for m in task_modules
            ],
            "signatures": [
                {
                    "id": s.get('id'),
                    "contributor": s.get('user_id'),
                    "contribution": s.get('contribution'),
                    "created_at": s.get('created_at')
                }
                for s in agent_signatures
            ],
            "path_summary": {
                "total_contributors": len(set(
                    [wish.get('user_id') if wish else None] +
                    [m.get('user_id') for m in task_modules if m.get('user_id')] +
                    [s.get('user_id') for s in agent_signatures]
                ) - {None}),
                "total_modules": len(task_modules),
                "total_signatures": len(agent_signatures),
                "development_duration": calculate_duration(
                    wish.get('created_at') if wish else task.get('created_at'),
                    agent.get('created_at')
                )
            }
        }
        
        return contribution_path
    except Exception as e:
        print(f"生成贡献路径失败: {str(e)}")
        return {}

def calculate_duration(start_time: str, end_time: str) -> str:
    """
    计算时间间隔
    """
    try:
        start = datetime.fromisoformat(start_time.replace('Z', '+00:00'))
        end = datetime.fromisoformat(end_time.replace('Z', '+00:00'))
        duration = end - start
        
        days = duration.days
        hours = duration.seconds // 3600
        minutes = (duration.seconds % 3600) // 60
        
        if days > 0:
            return f"{days}天 {hours}小时 {minutes}分钟"
        elif hours > 0:
            return f"{hours}小时 {minutes}分钟"
        else:
            return f"{minutes}分钟"
    except:
        return "未知" 