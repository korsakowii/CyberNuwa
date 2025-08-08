# Blender Scripts 文件夹

这个文件夹包含了所有与Blender相关的Python脚本和资源。

## 文件分类

### MCP服务器相关
- `advanced_blender_mcp_server.py` - 高级Blender MCP服务器
- `blender_mcp_server.py` - 基础Blender MCP服务器
- `blender-mcp-env/` - Blender MCP环境文件夹

### 女娲模型脚本
- `nuwa_ultra_exquisite.py` - 超精致女娲模型（最新版本）
- `exquisite_nuwa_model_v4_compatible.py` - 兼容版本精致女娲模型
- `exquisite_nuwa_model_v4.py` - 精致女娲模型v4
- `exquisite_nuwa_model.py` - 精致女娲模型
- `exquisite_nuwa_model_simple.py` - 简化版精致女娲模型
- `complete_nuwa_model.py` - 完整女娲模型
- `delicate_nuwa_model.py` - 精美女娲模型
- `simple_nuwa.py` - 简单女娲模型

### 基础模型脚本
- `nuwa_model.py` - 基础女娲模型
- `nuwa_model_direct.py` - 直接创建女娲模型
- `nuwa_model_for_blender.py` - 为Blender优化的女娲模型
- `nuwa_model_interactive.py` - 交互式女娲模型
- `nuwa_model_blender_script.py` - Blender脚本版本女娲模型
- `nuwa_model_blender_ui.py` - 带UI的女娲模型
- `nuwa_in_blender.py` - Blender中的女娲模型

### 渲染脚本
- `render_exquisite_nuwa.py` - 渲染精致女娲模型
- `render_complete_nuwa.py` - 渲染完整女娲模型
- `render_nuwa.py` - 渲染女娲模型
- `render_simple_nuwa.py` - 渲染简单女娲模型
- `simple_render_nuwa.py` - 简单渲染女娲模型

### 启动脚本
- `start_blender_with_nuwa.py` - 启动Blender并加载女娲模型
- `start_exquisite_nuwa.py` - 启动精致女娲模型
- `create_and_render_exquisite_nuwa.py` - 创建并渲染精致女娲模型

## 使用方法

### 运行最新版本（推荐）
```bash
/Applications/Blender.app/Contents/MacOS/Blender --python blender_scripts/nuwa_ultra_exquisite.py --background
```

### 运行其他版本
```bash
# 精致版本
/Applications/Blender.app/Contents/MacOS/Blender --python blender_scripts/exquisite_nuwa_model_v4_compatible.py --background

# 简单版本
/Applications/Blender.app/Contents/MacOS/Blender --python blender_scripts/simple_nuwa.py --background
```

### 启动Blender界面
```bash
/Applications/Blender.app/Contents/MacOS/Blender --python blender_scripts/start_blender_with_nuwa.py
```

## 渲染输出

所有渲染的图片都会保存在项目根目录的 `renders/` 文件夹中。

## 技术特性

### 最新版本 (nuwa_ultra_exquisite.py) 包含：
- ✨ 超高级PBR材质（皮肤、蛇皮、头发、金色、玉石、丝绸）
- 👤 精致头部（细分曲面5级）
- 👗 精致躯干（细分曲面4级）
- 💪 精致手臂（上臂、前臂、手部）
- 🐍 30段精致蛇身（复杂弯曲路径）
- 💇 120根精致头发（随机飘逸效果）
- 👁️ 精致面部特征（眼球、眼白、嘴唇）
- 💎 精致装饰品（头冠、耳环、项链、手镯、额饰、发簪）
- 👘 丝绸长袍
- 💡 六光源照明系统
- 📷 专业相机设置（60mm镜头、景深效果）
- 🎬 专业渲染设置（Cycles引擎、1024采样、降噪）
- 🌌 渐变星空背景

### 渲染设置
- 引擎：Cycles
- 采样：1024
- 分辨率：2560x1440 (2K)
- 降噪：启用
- 景深：启用

## 兼容性

所有脚本都兼容Blender 4.5+版本，部分脚本也兼容较早版本。

## 注意事项

1. 确保Blender已正确安装
2. 渲染高质量图像需要较长时间（约47分钟）
3. 建议使用GPU加速渲染以获得更好性能
4. 所有材质都使用PBR工作流，确保最佳视觉效果 