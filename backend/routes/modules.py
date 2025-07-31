"""
模块管理路由 - 处理用户提交的模块内容
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List, Optional
from models.schemas import (
    ModuleCreate, ModuleResponse, ModuleUpdate, APIResponse, PaginatedResponse
)
from utils.database import modules_db, tasks_db
import os
import aiofiles
from utils.config import settings

router = APIRouter()

@router.post("/submit_module", response_model=APIResponse)
async def submit_module(module: ModuleCreate):
    """
    接收用户认领任务后的模块内容
    
    - **task_id**: 关联的任务ID
    - **name**: 模块名称
    - **content**: 模块内容（代码或prompt）
    - **user_id**: 提交用户ID（可选）
    
    返回创建的模块信息
    """
    try:
        # 验证任务是否存在
        task = await tasks_db.get_item_by_id(module.task_id)
        if not task:
            raise HTTPException(status_code=404, detail="关联的任务不存在")
        
        # 创建模块记录
        module_data = module.dict()
        created_module = await modules_db.add_item(module_data)
        
        # 保存模块文件到本地
        module_file_path = os.path.join(
            settings.data_dir, 
            settings.modules_dir, 
            f"module_{created_module['id']}.txt"
        )
        
        async with aiofiles.open(module_file_path, 'w', encoding='utf-8') as f:
            await f.write(f"模块名称: {module.name}\n")
            await f.write(f"任务ID: {module.task_id}\n")
            await f.write(f"提交用户: {module.user_id or '匿名'}\n")
            await f.write(f"创建时间: {created_module['created_at']}\n")
            await f.write("-" * 50 + "\n")
            await f.write(module.content)
        
        created_module['file_path'] = module_file_path
        
        return APIResponse(
            success=True,
            message="模块提交成功",
            data=created_module
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"提交模块失败: {str(e)}")

@router.post("/upload_module_file", response_model=APIResponse)
async def upload_module_file(
    task_id: int,
    name: str,
    user_id: Optional[str] = None,
    file: UploadFile = File(...)
):
    """
    上传模块文件
    
    - **task_id**: 关联的任务ID
    - **name**: 模块名称
    - **user_id**: 提交用户ID（可选）
    - **file**: 上传的文件
    """
    try:
        # 验证任务是否存在
        task = await tasks_db.get_item_by_id(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="关联的任务不存在")
        
        # 读取文件内容
        content = await file.read()
        content_str = content.decode('utf-8')
        
        # 创建模块记录
        module_data = {
            "task_id": task_id,
            "name": name,
            "content": content_str,
            "user_id": user_id
        }
        
        created_module = await modules_db.add_item(module_data)
        
        # 保存文件到本地
        file_extension = os.path.splitext(file.filename)[1] if file.filename else '.txt'
        module_file_path = os.path.join(
            settings.data_dir,
            settings.modules_dir,
            f"module_{created_module['id']}{file_extension}"
        )
        
        async with aiofiles.open(module_file_path, 'wb') as f:
            await f.write(content)
        
        created_module['file_path'] = module_file_path
        
        return APIResponse(
            success=True,
            message="模块文件上传成功",
            data=created_module
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"上传模块文件失败: {str(e)}")

@router.get("/list_modules", response_model=APIResponse)
async def list_modules(
    task_id: Optional[int] = None,
    user_id: Optional[str] = None,
    status: Optional[str] = None,
    page: int = 1,
    size: int = 10
):
    """
    获取模块列表
    
    - **task_id**: 任务ID筛选（可选）
    - **user_id**: 用户ID筛选（可选）
    - **status**: 状态筛选（可选）
    - **page**: 页码（默认1）
    - **size**: 每页数量（默认10）
    """
    try:
        modules = await modules_db.read_all()
        
        # 筛选条件
        if task_id:
            modules = [m for m in modules if m.get('task_id') == task_id]
        if user_id:
            modules = [m for m in modules if m.get('user_id') == user_id]
        if status:
            modules = [m for m in modules if m.get('status') == status]
        
        # 按创建时间倒序排序
        modules.sort(key=lambda x: x.get('created_at', ''), reverse=True)
        
        # 分页处理
        total = len(modules)
        start = (page - 1) * size
        end = start + size
        paginated_modules = modules[start:end]
        
        # 为每个模块添加关联的任务信息
        for module in paginated_modules:
            if module.get('task_id'):
                task = await tasks_db.get_item_by_id(module['task_id'])
                module['task'] = task
        
        return APIResponse(
            success=True,
            message="获取模块列表成功",
            data=PaginatedResponse(
                items=paginated_modules,
                total=total,
                page=page,
                size=size,
                pages=(total + size - 1) // size
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取模块列表失败: {str(e)}")

@router.get("/module/{module_id}", response_model=APIResponse)
async def get_module(module_id: int):
    """
    获取单个模块详情
    
    - **module_id**: 模块ID
    """
    try:
        module = await modules_db.get_item_by_id(module_id)
        if not module:
            raise HTTPException(status_code=404, detail="模块不存在")
        
        # 添加关联的任务信息
        if module.get('task_id'):
            task = await tasks_db.get_item_by_id(module['task_id'])
            module['task'] = task
        
        return APIResponse(
            success=True,
            message="获取模块详情成功",
            data=module
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取模块详情失败: {str(e)}")

@router.put("/module/{module_id}", response_model=APIResponse)
async def update_module(module_id: int, module_update: ModuleUpdate):
    """
    更新模块信息
    
    - **module_id**: 模块ID
    - **module_update**: 更新内容
    """
    try:
        updates = {k: v for k, v in module_update.dict().items() if v is not None}
        updated_module = await modules_db.update_item(module_id, updates)
        
        if not updated_module:
            raise HTTPException(status_code=404, detail="模块不存在")
        
        return APIResponse(
            success=True,
            message="模块更新成功",
            data=updated_module
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新模块失败: {str(e)}")

@router.delete("/module/{module_id}", response_model=APIResponse)
async def delete_module(module_id: int):
    """
    删除模块
    
    - **module_id**: 模块ID
    """
    try:
        success = await modules_db.delete_item(module_id)
        if not success:
            raise HTTPException(status_code=404, detail="模块不存在")
        
        return APIResponse(
            success=True,
            message="模块删除成功"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除模块失败: {str(e)}")

@router.get("/modules_by_task/{task_id}", response_model=APIResponse)
async def get_modules_by_task(task_id: int):
    """
    获取指定任务的所有模块
    
    - **task_id**: 任务ID
    """
    try:
        modules = await modules_db.read_all()
        task_modules = [m for m in modules if m.get('task_id') == task_id]
        
        return APIResponse(
            success=True,
            message="获取任务相关模块成功",
            data=task_modules
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取任务相关模块失败: {str(e)}") 