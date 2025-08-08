# CyberNuwa 数据库管理指南

## 📊 数据库概览

CyberNuwa项目使用了两种数据库存储方式：

### 1. JSON文件数据库 (主要使用)
- **位置**: `backend/data/` 目录
- **文件**: 
  - `wishes.json` - 愿望数据
  - `tasks.json` - 任务数据
  - `modules.json` - 模块数据
  - `agents.json` - 智能体数据
  - `signatures.json` - 署名数据

### 2. SQLite数据库 (备用)
- **位置**: `backend/cybernuwa.db`
- **表**: wishes, tasks, modules, agents, signatures

## 🔍 查看数据库的方法

### 方法1: 使用数据库查看工具

#### 完整查看工具
```bash
cd backend
python3 view_database.py
```

#### 快速查看工具
```bash
cd backend
python3 quick_view.py
```

### 方法2: 直接查看JSON文件

#### 查看愿望数据
```bash
cat backend/data/wishes.json | python3 -m json.tool
```

#### 查看任务数据
```bash
cat backend/data/tasks.json | python3 -m json.tool
```

#### 查看模块数据
```bash
cat backend/data/modules.json | python3 -m json.tool
```

#### 查看智能体数据
```bash
cat backend/data/agents.json | python3 -m json.tool
```

#### 查看署名数据
```bash
cat backend/data/signatures.json | python3 -m json.tool
```

### 方法3: 使用SQLite命令行工具

```bash
cd backend
sqlite3 cybernuwa.db

# 查看所有表
.tables

# 查看表结构
.schema wishes
.schema tasks
.schema modules
.schema agents
.schema signatures

# 查看数据
SELECT * FROM wishes;
SELECT * FROM tasks;
SELECT * FROM modules;
SELECT * FROM agents;
SELECT * FROM signatures;

# 退出
.quit
```

### 方法4: 使用API接口查看

#### 查看愿望列表
```bash
curl http://localhost:8000/api/wishes/list_wishes
```

#### 查看任务列表
```bash
curl http://localhost:8000/api/tasks/list_tasks
```

## 📋 当前数据库内容

### 愿望数据 (5条记录)
1. "想知道喜欢的女生什么时候跟我确定关系" (user_001)
2. "希望有一个智能助手帮我管理日常任务" (user_002)
3. "想知道喜欢的女生什么时候跟我确定关系" (user_001)
4. "测试愿望：希望有一个智能助手帮我管理时间" (test_user_001)
5. "想知道喜欢的女生什么时候跟我确定关系" (user_001)

### 任务数据 (4条记录)
1. 情感关系分析助手
2. 情感关系分析助手
3. 智能任务管理助手
4. 情感关系分析助手

### 模块数据 (3条记录)
1. 情感分析模块
2. 时间管理模块
3. 情感分析模块

### 智能体数据 (3条记录)
1. 情感关系分析助手 (ready)
2. 智能任务管理助手 (building)
3. 情感关系分析助手 (ready)

### 署名数据 (2条记录)
1. "参与了智能体的设计和测试" (user_003)
2. "参与了智能体的设计和测试" (user_003)

## 🛠️ 数据库操作

### 添加新数据

#### 通过API添加愿望
```bash
curl -X POST http://localhost:8000/api/wishes/submit_wish \
  -H "Content-Type: application/json" \
  -d '{"content": "新的愿望内容", "user_id": "user_001"}'
```

#### 通过API添加任务
```bash
curl -X POST http://localhost:8000/api/tasks/synthesize_task \
  -H "Content-Type: application/json" \
  -d '{"wish_id": 1}'
```

### 备份数据库

#### 备份JSON文件
```bash
cd backend
cp -r data data_backup_$(date +%Y%m%d_%H%M%S)
```

#### 备份SQLite数据库
```bash
cd backend
cp cybernuwa.db cybernuwa_backup_$(date +%Y%m%d_%H%M%S).db
```

### 恢复数据库

#### 恢复JSON文件
```bash
cd backend
rm -rf data
cp -r data_backup_20250128_120000 data
```

#### 恢复SQLite数据库
```bash
cd backend
cp cybernuwa_backup_20250128_120000.db cybernuwa.db
```

## 🔧 数据库维护

### 清理空数据
```bash
cd backend
python3 -c "
import json
import os

def clean_empty_data():
    data_dir = 'data'
    for filename in os.listdir(data_dir):
        if filename.endswith('.json'):
            file_path = os.path.join(data_dir, filename)
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # 移除空记录
            cleaned_data = [item for item in data if item]
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(cleaned_data, f, ensure_ascii=False, indent=2)
            
            print(f'Cleaned {filename}: {len(data)} -> {len(cleaned_data)}')

clean_empty_data()
"
```

### 验证数据完整性
```bash
cd backend
python3 -c "
import json
import os

def validate_data():
    data_dir = 'data'
    for filename in os.listdir(data_dir):
        if filename.endswith('.json'):
            file_path = os.path.join(data_dir, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                print(f'✅ {filename}: {len(data)} records')
            except Exception as e:
                print(f'❌ {filename}: {e}')

validate_data()
"
```

## 📊 数据库统计

### 生成统计报告
```bash
cd backend
python3 -c "
import json
import os
from datetime import datetime

def generate_stats():
    data_dir = 'data'
    stats = {}
    
    for filename in os.listdir(data_dir):
        if filename.endswith('.json'):
            file_path = os.path.join(data_dir, filename)
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            stats[filename] = {
                'count': len(data),
                'size': os.path.getsize(file_path),
                'last_modified': datetime.fromtimestamp(os.path.getmtime(file_path))
            }
    
    print('📊 数据库统计报告')
    print('=' * 50)
    for filename, info in stats.items():
        print(f'{filename}:')
        print(f'  记录数: {info[\"count\"]}')
        print(f'  文件大小: {info[\"size\"]} bytes')
        print(f'  最后修改: {info[\"last_modified\"]}')
        print()

generate_stats()
"
```

## 🚨 注意事项

1. **备份重要**: 在进行任何数据库操作前，请先备份数据
2. **JSON格式**: 确保JSON文件格式正确，避免手动编辑时破坏格式
3. **权限问题**: 确保对数据库文件有读写权限
4. **并发访问**: 避免同时修改同一个数据库文件
5. **数据一致性**: 定期检查JSON文件和SQLite数据库的一致性

## 📞 故障排除

### 常见问题

1. **JSON文件损坏**
   ```bash
   # 检查JSON格式
   python3 -m json.tool backend/data/wishes.json
   ```

2. **权限问题**
   ```bash
   # 修复权限
   chmod 644 backend/data/*.json
   chmod 644 backend/cybernuwa.db
   ```

3. **数据库锁定**
   ```bash
   # 重启后端服务
   pkill -f "python3 main.py"
   cd backend && python3 main.py
   ```

4. **数据不同步**
   ```bash
   # 重新初始化数据库
   cd backend
   rm -f cybernuwa.db
   python3 main.py
   ```

## 📚 相关文档

- [集成指南](INTEGRATION_GUIDE.md)
- [API文档](http://localhost:8000/docs)
- [项目文档](README.md) 