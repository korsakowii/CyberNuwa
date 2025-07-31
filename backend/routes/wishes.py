"""
愿望管理路由 - 处理用户愿望的提交和管理
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from models.schemas import (
    WishCreate, WishResponse, WishUpdate, APIResponse, PaginatedResponse
)
from utils.database import wishes_db
from utils.ai_service import synthesize_task_from_wish
import json

router = APIRouter()

@router.post("/submit_wish", response_model=APIResponse)
async def submit_wish(wish: WishCreate):
    """
    提交用户愿望
    
    - **content**: 愿望内容
    - **user_id**: 用户ID（可选）
    
    返回创建的愿望信息
    """
    try:
        # 创建愿望记录
        wish_data = wish.dict()
        created_wish = await wishes_db.add_item(wish_data)
        
        return APIResponse(
            success=True,
            message="愿望提交成功",
            data=created_wish
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"提交愿望失败: {str(e)}")

@router.get("/list_wishes", response_model=APIResponse)
async def list_wishes(
    page: int = 1,
    size: int = 10,
    status: Optional[str] = None
):
    """
    获取愿望列表
    
    - **page**: 页码（默认1）
    - **size**: 每页数量（默认10）
    - **status**: 状态筛选（可选）
    """
    try:
        wishes = await wishes_db.read_all()
        
        # 状态筛选
        if status:
            wishes = [w for w in wishes if w.get('status') == status]
        
        # 分页处理
        total = len(wishes)
        start = (page - 1) * size
        end = start + size
        paginated_wishes = wishes[start:end]
        
        return APIResponse(
            success=True,
            message="获取愿望列表成功",
            data=PaginatedResponse(
                items=paginated_wishes,
                total=total,
                page=page,
                size=size,
                pages=(total + size - 1) // size
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取愿望列表失败: {str(e)}")

@router.get("/wish/{wish_id}", response_model=APIResponse)
async def get_wish(wish_id: int):
    """
    获取单个愿望详情
    
    - **wish_id**: 愿望ID
    """
    try:
        wish = await wishes_db.get_item_by_id(wish_id)
        if not wish:
            raise HTTPException(status_code=404, detail="愿望不存在")
        
        return APIResponse(
            success=True,
            message="获取愿望详情成功",
            data=wish
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取愿望详情失败: {str(e)}")

@router.put("/wish/{wish_id}", response_model=APIResponse)
async def update_wish(wish_id: int, wish_update: WishUpdate):
    """
    更新愿望信息
    
    - **wish_id**: 愿望ID
    - **wish_update**: 更新内容
    """
    try:
        updates = {k: v for k, v in wish_update.dict().items() if v is not None}
        updated_wish = await wishes_db.update_item(wish_id, updates)
        
        if not updated_wish:
            raise HTTPException(status_code=404, detail="愿望不存在")
        
        return APIResponse(
            success=True,
            message="愿望更新成功",
            data=updated_wish
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新愿望失败: {str(e)}")

@router.delete("/wish/{wish_id}", response_model=APIResponse)
async def delete_wish(wish_id: int):
    """
    删除愿望
    
    - **wish_id**: 愿望ID
    """
    try:
        success = await wishes_db.delete_item(wish_id)
        if not success:
            raise HTTPException(status_code=404, detail="愿望不存在")
        
        return APIResponse(
            success=True,
            message="愿望删除成功"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除愿望失败: {str(e)}")

@router.post("/wish/{wish_id}/synthesize", response_model=APIResponse)
async def synthesize_wish_to_task(wish_id: int):
    """
    将愿望合成为任务
    
    - **wish_id**: 愿望ID
    """
    try:
        # 获取愿望信息
        wish = await wishes_db.get_item_by_id(wish_id)
        if not wish:
            raise HTTPException(status_code=404, detail="愿望不存在")
        
        # 调用AI服务合成任务
        task_data = await synthesize_task_from_wish(wish)
        
        # 更新愿望状态
        await wishes_db.update_item(wish_id, {"status": "processing"})
        
        return APIResponse(
            success=True,
            message="愿望合成任务成功",
            data=task_data
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"合成任务失败: {str(e)}") 