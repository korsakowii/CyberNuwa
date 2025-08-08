# Blender MCP 配置指南

## 概述

这个项目包含了一个简单的 Blender MCP (Model Context Protocol) 服务器，允许你通过命令行控制 Blender 应用程序。

## 安装的组件

1. **Blender 4.5.1** - 通过 Homebrew 安装
2. **Python 虚拟环境** - `blender-mcp-env`
3. **自定义 MCP 服务器** - `blender_mcp_server.py`
4. **MCP 配置文件** - `mcp-config.json`

## 文件说明

### `blender_mcp_server.py`
主要的 MCP 服务器文件，提供以下功能：
- 启动/停止 Blender
- 检查 Blender 状态
- 执行 Python 脚本

### `mcp-config.json`
MCP 配置文件，定义了 Blender 服务器的配置。

### `example_blender_script.py`
示例 Blender Python 脚本，创建一个带有发光材质的立方体场景。

## 使用方法

### 1. 激活虚拟环境
```bash
source blender-mcp-env/bin/activate
```

### 2. 检查 Blender 状态
```bash
python3 blender_mcp_server.py status
```

### 3. 启动 Blender
```bash
python3 blender_mcp_server.py start
```

### 4. 执行 Python 脚本
```bash
python3 blender_mcp_server.py script example_blender_script.py
```

### 5. 停止 Blender
```bash
python3 blender_mcp_server.py stop
```

## 命令说明

| 命令 | 描述 |
|------|------|
| `start` | 启动 Blender 应用程序 |
| `stop` | 停止所有 Blender 进程 |
| `status` | 检查 Blender 是否正在运行 |
| `script <file>` | 在 Blender 中执行 Python 脚本 |

## 示例脚本功能

`example_blender_script.py` 会：
1. 清除现有场景
2. 创建一个立方体
3. 添加橙色发光材质
4. 添加太阳光源
5. 设置摄像机
6. 配置渲染设置

## 与 MCP Inspector 集成

你可以使用 MCP Inspector 来测试服务器：

```bash
npx @modelcontextprotocol/inspector-cli --config mcp-config.json --server blender
```

## 注意事项

1. 确保 Blender 已正确安装在 `/Applications/Blender.app`
2. 脚本执行使用后台模式，不会打开 Blender GUI
3. 所有输出都会以 JSON 格式返回
4. 错误处理包含在响应中

## 扩展功能

你可以通过修改 `blender_mcp_server.py` 来添加更多功能：
- 场景管理
- 材质操作
- 动画控制
- 渲染设置
- 文件导入/导出

## 故障排除

如果遇到问题：

1. **Blender 路径错误**：检查 `/Applications/Blender.app/Contents/MacOS/Blender` 是否存在
2. **权限问题**：确保有执行 Blender 的权限
3. **Python 版本**：当前使用 Python 3.7.6，某些功能可能需要更高版本

## 下一步

1. 升级到 Python 3.8+ 以支持更多 MCP 功能
2. 添加更多 Blender 操作命令
3. 集成完整的 MCP 协议支持
4. 添加 Web UI 界面 