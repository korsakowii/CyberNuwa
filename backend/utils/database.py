"""
数据库工具模块 - JSON文件操作和SQLite数据库管理
"""

import json
import sqlite3
import os
import aiofiles
from typing import Dict, List, Any, Optional
from datetime import datetime
from utils.config import settings

class JSONDatabase:
    """JSON文件数据库操作类"""
    
    def __init__(self, file_path: str):
        self.file_path = file_path
        self._ensure_file_exists()
    
    def _ensure_file_exists(self):
        """确保文件存在"""
        if not os.path.exists(self.file_path):
            os.makedirs(os.path.dirname(self.file_path), exist_ok=True)
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump([], f, ensure_ascii=False, indent=2)
    
    async def read_all(self) -> List[Dict[str, Any]]:
        """读取所有数据"""
        async with aiofiles.open(self.file_path, 'r', encoding='utf-8') as f:
            content = await f.read()
            return json.loads(content) if content else []
    
    async def write_all(self, data: List[Dict[str, Any]]):
        """写入所有数据"""
        async with aiofiles.open(self.file_path, 'w', encoding='utf-8') as f:
            await f.write(json.dumps(data, ensure_ascii=False, indent=2))
    
    async def add_item(self, item: Dict[str, Any]) -> Dict[str, Any]:
        """添加新项目"""
        data = await self.read_all()
        # 生成唯一ID
        item['id'] = len(data) + 1
        item['created_at'] = datetime.now().isoformat()
        data.append(item)
        await self.write_all(data)
        return item
    
    async def get_item_by_id(self, item_id: int) -> Optional[Dict[str, Any]]:
        """根据ID获取项目"""
        data = await self.read_all()
        for item in data:
            if item.get('id') == item_id:
                return item
        return None
    
    async def update_item(self, item_id: int, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """更新项目"""
        data = await self.read_all()
        for i, item in enumerate(data):
            if item.get('id') == item_id:
                data[i].update(updates)
                data[i]['updated_at'] = datetime.now().isoformat()
                await self.write_all(data)
                return data[i]
        return None
    
    async def delete_item(self, item_id: int) -> bool:
        """删除项目"""
        data = await self.read_all()
        for i, item in enumerate(data):
            if item.get('id') == item_id:
                del data[i]
                await self.write_all(data)
                return True
        return False

class SQLiteDatabase:
    """SQLite数据库操作类"""
    
    def __init__(self, db_path: str = "cybernuwa.db"):
        self.db_path = db_path
        self._init_database()
    
    def _init_database(self):
        """初始化数据库表"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # 创建愿望表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS wishes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                user_id TEXT,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 创建任务表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                wish_id INTEGER,
                title TEXT NOT NULL,
                description TEXT,
                modules TEXT,  -- JSON格式存储模块列表
                status TEXT DEFAULT 'open',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (wish_id) REFERENCES wishes (id)
            )
        ''')
        
        # 创建模块表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS modules (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_id INTEGER,
                name TEXT NOT NULL,
                content TEXT,
                user_id TEXT,
                status TEXT DEFAULT 'submitted',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (task_id) REFERENCES tasks (id)
            )
        ''')
        
        # 创建智能体表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS agents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_id INTEGER,
                name TEXT NOT NULL,
                description TEXT,
                code TEXT,
                status TEXT DEFAULT 'building',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (task_id) REFERENCES tasks (id)
            )
        ''')
        
        # 创建署名表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS signatures (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                agent_id INTEGER,
                user_id TEXT,
                contribution TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (agent_id) REFERENCES agents (id)
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def get_connection(self):
        """获取数据库连接"""
        return sqlite3.connect(self.db_path)

# 创建全局数据库实例
wishes_db = JSONDatabase(os.path.join(settings.data_dir, settings.wishes_file))
tasks_db = JSONDatabase(os.path.join(settings.data_dir, settings.tasks_file))
signatures_db = JSONDatabase(os.path.join(settings.data_dir, settings.signatures_file))
sqlite_db = SQLiteDatabase()

async def init_database():
    """初始化数据库"""
    print("📊 初始化数据库...")
    
    # 创建示例数据（如果数据库为空）
    wishes_data = await wishes_db.read_all()
    if not wishes_data:
        print("📝 创建示例愿望数据...")
        sample_wishes = [
            {
                "content": "想知道喜欢的女生什么时候跟我确定关系",
                "user_id": "user_001",
                "status": "pending"
            },
            {
                "content": "希望有一个智能助手帮我管理日常任务",
                "user_id": "user_002", 
                "status": "processing"
            }
        ]
        for wish in sample_wishes:
            await wishes_db.add_item(wish)
    
    tasks_data = await tasks_db.read_all()
    if not tasks_data:
        print("📋 创建示例任务数据...")
        sample_tasks = [
            {
                "wish_id": 1,
                "title": "情感关系分析助手",
                "description": "分析用户与目标对象的关系状态，提供建议",
                "modules": ["情感分析", "行为预测", "建议生成"],
                "status": "open"
            }
        ]
        for task in sample_tasks:
            await tasks_db.add_item(task)
    
    print("✅ 数据库初始化完成!") 