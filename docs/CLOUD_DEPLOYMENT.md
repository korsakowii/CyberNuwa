# CyberNuwa 云端部署指南

## 🚀 快速部署

### 方法 1: 使用部署脚本 (推荐)

```bash
# 运行云端部署脚本
./scripts/deploy-cloud.sh
```

### 方法 2: 手动部署

## 🌐 部署平台选择

### 1. Vercel (推荐 ⭐⭐⭐⭐⭐)

**优点:**
- 免费额度大 (每月 100GB 带宽)
- 部署简单，自动 CI/CD
- 全球 CDN，速度快
- 支持 Python 3.9+

**部署步骤:**
```bash
cd backend
npm install -g vercel
vercel --prod
```

**配置要求:**
- 确保 `vercel.json` 存在
- 环境变量在 Vercel 控制台设置

### 2. Railway (推荐 ⭐⭐⭐⭐)

**优点:**
- 稳定可靠
- 每月 $5 免费额度
- 自动 HTTPS
- 支持环境变量

**部署步骤:**
```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
```

### 3. Render (推荐 ⭐⭐⭐⭐)

**优点:**
- 免费服务
- 自动部署
- 支持自定义域名

**部署步骤:**
1. 访问 [render.com](https://render.com)
2. 连接 GitHub 仓库
3. 选择 "Web Service"
4. 配置构建和启动命令

### 4. Heroku (经典 ⭐⭐⭐)

**优点:**
- 经典平台
- 生态系统成熟

**缺点:**
- 免费额度有限
- 需要信用卡验证

## 🔧 部署前准备

### 1. 环境变量配置

复制 `env.example` 为 `.env` 并配置：

```bash
cp env.example .env
# 编辑 .env 文件，填入实际值
```

**必需的环境变量:**
- `OPENAI_API_KEY`: OpenAI API 密钥
- `SECRET_KEY`: 应用密钥
- `DATABASE_URL`: 数据库连接字符串

### 2. 依赖检查

确保 `requirements.txt` 包含所有必需依赖：

```bash
pip install -r requirements.txt
```

### 3. 代码测试

本地测试确保应用正常运行：

```bash
python main.py
curl http://localhost:8002/health
```

## 📱 部署后配置

### 1. 更新前端 API 地址

部署成功后，更新前端代码中的 API 地址：

```typescript
// 从本地地址
const API_BASE = 'http://localhost:8002'

// 改为云端地址
const API_BASE = 'https://your-backend-domain.vercel.app'
```

### 2. 配置 CORS

确保后端允许前端域名访问：

```python
# 在 main.py 中更新 CORS 配置
origins = [
    "https://your-frontend-domain.com",
    "http://localhost:3000"
]
```

### 3. 环境变量设置

在部署平台的控制台中设置环境变量：
- `OPENAI_API_KEY`
- `SECRET_KEY`
- `DATABASE_URL` (如果使用外部数据库)

## 🔍 部署后测试

### 1. 健康检查

```bash
curl https://your-backend-domain.vercel.app/health
```

### 2. API 文档

访问: `https://your-backend-domain.vercel.app/docs`

### 3. 功能测试

测试主要 API 端点是否正常工作。

## 🚨 常见问题

### 1. 依赖安装失败

**解决方案:**
- 检查 Python 版本兼容性
- 更新 `requirements.txt`
- 使用 `pip-tools` 管理依赖

### 2. 环境变量未生效

**解决方案:**
- 在部署平台重新设置环境变量
- 重启服务
- 检查变量名拼写

### 3. 数据库连接失败

**解决方案:**
- 检查数据库 URL 格式
- 确认数据库服务状态
- 检查网络连接

### 4. CORS 错误

**解决方案:**
- 更新 CORS 配置
- 检查前端域名是否正确
- 清除浏览器缓存

## 📊 监控和维护

### 1. 日志监控

- 使用部署平台的日志功能
- 设置错误告警
- 定期检查性能指标

### 2. 性能优化

- 启用缓存
- 优化数据库查询
- 使用 CDN 加速

### 3. 安全维护

- 定期更新依赖
- 监控 API 使用情况
- 设置访问限制

## 🎯 下一步

部署成功后，你可以：

1. **测试所有功能** - 确保前后端正常通信
2. **配置域名** - 设置自定义域名
3. **设置监控** - 配置性能监控和告警
4. **优化性能** - 根据使用情况优化应用

---

**需要帮助？** 查看项目文档或提交 Issue。
