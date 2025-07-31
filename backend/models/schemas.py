"""
数据模型定义 - Pydantic schemas
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class WishStatus(str, Enum):
    """愿望状态枚举"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    REJECTED = "rejected"

class TaskStatus(str, Enum):
    """任务状态枚举"""
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CLOSED = "closed"

class ModuleStatus(str, Enum):
    """模块状态枚举"""
    SUBMITTED = "submitted"
    REVIEWING = "reviewing"
    APPROVED = "approved"
    REJECTED = "rejected"

class AgentStatus(str, Enum):
    """智能体状态枚举"""
    BUILDING = "building"
    TESTING = "testing"
    READY = "ready"
    DEPLOYED = "deployed"

# 愿望相关模型
class WishBase(BaseModel):
    """愿望基础模型"""
    content: str = Field(..., description="愿望内容", min_length=1, max_length=1000)
    user_id: Optional[str] = Field(None, description="用户ID")

class WishCreate(WishBase):
    """创建愿望请求模型"""
    pass

class WishResponse(WishBase):
    """愿望响应模型"""
    id: int
    status: WishStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class WishUpdate(BaseModel):
    """更新愿望请求模型"""
    content: Optional[str] = None
    status: Optional[WishStatus] = None

# 任务相关模型
class TaskBase(BaseModel):
    """任务基础模型"""
    wish_id: int = Field(..., description="关联的愿望ID")
    title: str = Field(..., description="任务标题", min_length=1, max_length=200)
    description: Optional[str] = Field(None, description="任务描述")
    modules: List[str] = Field(default=[], description="任务模块列表")

class TaskCreate(TaskBase):
    """创建任务请求模型"""
    pass

class TaskResponse(TaskBase):
    """任务响应模型"""
    id: int
    status: TaskStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    """更新任务请求模型"""
    title: Optional[str] = None
    description: Optional[str] = None
    modules: Optional[List[str]] = None
    status: Optional[TaskStatus] = None

# 模块相关模型
class ModuleBase(BaseModel):
    """模块基础模型"""
    task_id: int = Field(..., description="关联的任务ID")
    name: str = Field(..., description="模块名称", min_length=1, max_length=100)
    content: str = Field(..., description="模块内容")
    user_id: Optional[str] = Field(None, description="提交用户ID")

class ModuleCreate(ModuleBase):
    """创建模块请求模型"""
    pass

class ModuleResponse(ModuleBase):
    """模块响应模型"""
    id: int
    status: ModuleStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ModuleUpdate(BaseModel):
    """更新模块请求模型"""
    name: Optional[str] = None
    content: Optional[str] = None
    status: Optional[ModuleStatus] = None

# 智能体相关模型
class AgentBase(BaseModel):
    """智能体基础模型"""
    task_id: int = Field(..., description="关联的任务ID")
    name: str = Field(..., description="智能体名称", min_length=1, max_length=100)
    description: Optional[str] = Field(None, description="智能体描述")
    code: Optional[str] = Field(None, description="智能体代码")

class AgentCreate(AgentBase):
    """创建智能体请求模型"""
    pass

class AgentResponse(AgentBase):
    """智能体响应模型"""
    id: int
    status: AgentStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class AgentUpdate(BaseModel):
    """更新智能体请求模型"""
    name: Optional[str] = None
    description: Optional[str] = None
    code: Optional[str] = None
    status: Optional[AgentStatus] = None

# 署名相关模型
class SignatureBase(BaseModel):
    """署名基础模型"""
    agent_id: int = Field(..., description="关联的智能体ID")
    user_id: str = Field(..., description="用户ID")
    contribution: str = Field(..., description="贡献内容", min_length=1, max_length=500)

class SignatureCreate(SignatureBase):
    """创建署名请求模型"""
    pass

class SignatureResponse(SignatureBase):
    """署名响应模型"""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# API响应模型
class APIResponse(BaseModel):
    """通用API响应模型"""
    success: bool
    message: str
    data: Optional[Any] = None

class PaginatedResponse(BaseModel):
    """分页响应模型"""
    items: List[Any]
    total: int
    page: int
    size: int
    pages: int

# 任务合成相关模型
class TaskSynthesisRequest(BaseModel):
    """任务合成请求模型"""
    wish_id: int = Field(..., description="愿望ID")
    use_ai: bool = Field(True, description="是否使用AI合成")

class TaskSynthesisResponse(BaseModel):
    """任务合成响应模型"""
    task: TaskResponse
    modules: List[str]
    synthesis_method: str

# 智能体构建相关模型
class AgentBuildRequest(BaseModel):
    """智能体构建请求模型"""
    task_id: int = Field(..., description="任务ID")
    modules: List[int] = Field(..., description="模块ID列表")

class AgentDemoResponse(BaseModel):
    """智能体演示响应模型"""
    agent: AgentResponse
    demo_code: str
    usage_examples: List[str]
    dependencies: List[str] 