"""
任务管理路由 - 处理任务的管理和展示
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models.schemas import (
    TaskCreate, TaskResponse, TaskUpdate, APIResponse, PaginatedResponse,
    TaskSynthesisRequest, TaskSynthesisResponse
)
from utils.database import tasks_db, wishes_db
from utils.ai_service import synthesize_task_from_wish
import json

router = APIRouter()

@router.get("/list_tasks", response_model=APIResponse)
async def list_tasks(
    page: int = Query(1, ge=1, description="页码"),
    size: int = Query(10, ge=1, le=100, description="每页数量"),
    status: Optional[str] = Query(None, description="任务状态筛选"),
    wish_id: Optional[int] = Query(None, description="愿望ID筛选")
):
    """
    获取任务列表 - 供任务广场页面展示
    
    - **page**: 页码（默认1）
    - **size**: 每页数量（默认10，最大100）
    - **status**: 状态筛选（可选：open, in_progress, completed, closed）
    - **wish_id**: 愿望ID筛选（可选）
    """
    try:
        tasks = await tasks_db.read_all()
        
        # 状态筛选
        if status:
            tasks = [t for t in tasks if t.get('status') == status]
        
        # 愿望ID筛选
        if wish_id:
            tasks = [t for t in tasks if t.get('wish_id') == wish_id]
        
        # 按创建时间倒序排序
        tasks.sort(key=lambda x: x.get('created_at', ''), reverse=True)
        
        # 分页处理
        total = len(tasks)
        start = (page - 1) * size
        end = start + size
        paginated_tasks = tasks[start:end]
        
        # 为每个任务添加关联的愿望信息
        for task in paginated_tasks:
            if task.get('wish_id'):
                wish = await wishes_db.get_item_by_id(task['wish_id'])
                task['wish'] = wish
        
        return APIResponse(
            success=True,
            message="获取任务列表成功",
            data=PaginatedResponse(
                items=paginated_tasks,
                total=total,
                page=page,
                size=size,
                pages=(total + size - 1) // size
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取任务列表失败: {str(e)}")

@router.get("/task/{task_id}", response_model=APIResponse)
async def get_task(task_id: int):
    """
    获取单个任务详情
    
    - **task_id**: 任务ID
    """
    try:
        task = await tasks_db.get_item_by_id(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="任务不存在")
        
        # 添加关联的愿望信息
        if task.get('wish_id'):
            wish = await wishes_db.get_item_by_id(task['wish_id'])
            task['wish'] = wish
        
        return APIResponse(
            success=True,
            message="获取任务详情成功",
            data=task
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取任务详情失败: {str(e)}")

@router.post("/synthesize_task", response_model=APIResponse)
async def synthesize_task(request: TaskSynthesisRequest):
    """
    将愿望转化为结构化任务
    
    - **wish_id**: 愿望ID
    - **use_ai**: 是否使用AI合成（默认True）
    """
    try:
        # 获取愿望信息
        wish = await wishes_db.get_item_by_id(request.wish_id)
        if not wish:
            raise HTTPException(status_code=404, detail="愿望不存在")
        
        if request.use_ai:
            # 使用AI合成任务
            task_data = await synthesize_task_from_wish(wish)
        else:
            # 手动创建基础任务结构
            task_data = {
                "wish_id": request.wish_id,
                "title": f"基于愿望的任务",
                "description": f"基于愿望：{wish['content']}",
                "modules": ["模块1", "模块2", "模块3"],
                "status": "open"
            }
        
        # 保存任务到数据库
        created_task = await tasks_db.add_item(task_data)
        
        # 更新愿望状态
        await wishes_db.update_item(request.wish_id, {"status": "processing"})
        
        return APIResponse(
            success=True,
            message="任务合成成功",
            data=TaskSynthesisResponse(
                task=created_task,
                modules=task_data.get('modules', []),
                synthesis_method="AI合成" if request.use_ai else "手动创建"
            )
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"任务合成失败: {str(e)}")

@router.post("/task", response_model=APIResponse)
async def create_task(task: TaskCreate):
    """
    手动创建任务
    
    - **task**: 任务信息
    """
    try:
        task_data = task.dict()
        created_task = await tasks_db.add_item(task_data)
        
        return APIResponse(
            success=True,
            message="任务创建成功",
            data=created_task
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"创建任务失败: {str(e)}")

@router.put("/task/{task_id}", response_model=APIResponse)
async def update_task(task_id: int, task_update: TaskUpdate):
    """
    更新任务信息
    
    - **task_id**: 任务ID
    - **task_update**: 更新内容
    """
    try:
        updates = {k: v for k, v in task_update.dict().items() if v is not None}
        updated_task = await tasks_db.update_item(task_id, updates)
        
        if not updated_task:
            raise HTTPException(status_code=404, detail="任务不存在")
        
        return APIResponse(
            success=True,
            message="任务更新成功",
            data=updated_task
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新任务失败: {str(e)}")

@router.delete("/task/{task_id}", response_model=APIResponse)
async def delete_task(task_id: int):
    """
    删除任务
    
    - **task_id**: 任务ID
    """
    try:
        success = await tasks_db.delete_item(task_id)
        if not success:
            raise HTTPException(status_code=404, detail="任务不存在")
        
        return APIResponse(
            success=True,
            message="任务删除成功"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除任务失败: {str(e)}")

@router.get("/tasks_by_wish/{wish_id}", response_model=APIResponse)
async def get_tasks_by_wish(wish_id: int):
    """
    获取指定愿望的所有任务
    
    - **wish_id**: 愿望ID
    """
    try:
        tasks = await tasks_db.read_all()
        wish_tasks = [t for t in tasks if t.get('wish_id') == wish_id]
        
        return APIResponse(
            success=True,
            message="获取愿望相关任务成功",
            data=wish_tasks
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取愿望相关任务失败: {str(e)}") 