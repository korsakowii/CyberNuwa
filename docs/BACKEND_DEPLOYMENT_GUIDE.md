# CyberNuwa 后端部署指南

## 🚀 快速开始

### 本地开发环境

1. **启动后端服务器**
```bash
# 在项目根目录运行
./scripts/deploy-backend.sh
```

2. **手动启动**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python main.py
```

3. **访问地址**
- 后端 API: http://localhost:8001
- API 文档: http://localhost:8001/docs
- 健康检查: http://localhost:8001/health

## 🌐 云端部署选项

### 1. Vercel (推荐)

**优势：**
- 与前端在同一平台
- 自动 HTTPS
- 免费额度充足
- 简单配置

**部署步骤：**
1. 安装 Vercel CLI: `npm i -g vercel`
2. 在 `backend/` 目录运行: `vercel`
3. 按提示配置项目

**配置文件：** `backend/vercel.json`

### 2. Railway

**优势：**
- 简单易用
- 自动部署
- 支持数据库

**部署步骤：**
1. 访问 [Railway.app](https://railway.app)
2. 连接 GitHub 仓库
3. 选择 `backend/` 目录
4. 配置环境变量

### 3. Render

**优势：**
- 免费额度
- 自动 HTTPS
- 简单配置

**部署步骤：**
1. 访问 [Render.com](https://render.com)
2. 创建新的 Web Service
3. 连接 GitHub 仓库
4. 配置构建命令: `pip install -r requirements.txt`
5. 配置启动命令: `uvicorn main:app --host=0.0.0.0 --port=$PORT`

### 4. Heroku

**优势：**
- 稳定可靠
- 丰富的插件生态

**部署步骤：**
1. 安装 Heroku CLI
2. 在 `backend/` 目录运行:
```bash
heroku create your-app-name
git add .
git commit -m "Deploy backend"
git push heroku main
```

**配置文件：** `backend/Procfile`

## 🔧 环境变量配置

创建 `backend/.env` 文件：

```env
# 数据库配置
DATABASE_URL=sqlite:///./cybernuwa.db

# OpenAI API (可选)
OPENAI_API_KEY=your_openai_api_key

# 安全配置
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# 服务器配置
HOST=0.0.0.0
PORT=8001
DEBUG=True
```

## 📊 API 端点

### 基础端点
- `GET /` - API 状态
- `GET /health` - 健康检查
- `GET /docs` - API 文档

### 功能端点
- `GET /api/wishes` - 获取愿望列表
- `POST /api/wishes` - 创建新愿望
- `GET /api/agents` - 获取智能体列表
- `GET /api/tasks` - 获取任务列表
- `GET /api/modules` - 获取模块列表

## 🔍 故障排除

### 常见问题

1. **端口被占用**
```bash
# 检查端口占用
lsof -i :8001
# 杀死进程
kill -9 <PID>
```

2. **依赖安装失败**
```bash
# 升级 pip
pip install --upgrade pip
# 重新安装依赖
pip install -r requirements.txt --force-reinstall
```

3. **数据库连接问题**
```bash
# 检查数据库文件
ls -la backend/cybernuwa.db
# 重新初始化数据库
python -c "from utils.database import init_database; import asyncio; asyncio.run(init_database())"
```

## 📈 监控和维护

### 日志查看
```bash
# 查看应用日志
tail -f logs/app.log

# 查看错误日志
tail -f logs/error.log
```

### 性能监控
- 使用 `/health` 端点监控服务状态
- 定期检查数据库大小
- 监控 API 响应时间

## 🔐 安全建议

1. **生产环境配置**
   - 设置 `DEBUG=False`
   - 配置具体的 CORS 域名
   - 使用强密码和密钥

2. **API 安全**
   - 启用身份验证
   - 限制请求频率
   - 使用 HTTPS

3. **数据安全**
   - 定期备份数据库
   - 加密敏感数据
   - 监控异常访问

## 📞 支持

如果遇到问题，请检查：
1. 日志文件
2. API 文档
3. 环境变量配置
4. 网络连接

或联系开发团队获取支持。
