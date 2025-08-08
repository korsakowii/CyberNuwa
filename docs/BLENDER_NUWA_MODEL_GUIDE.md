# 🐉 在Blender中创建女娲模型指南

## 🎯 目标
在Blender界面中直接创建和查看女娲3D模型

## 📋 准备工作

### 1. 确保Blender已启动
```bash
# 检查Blender状态
python3 blender_mcp_server.py status

# 如果未启动，启动Blender
python3 blender_mcp_server.py start
```

### 2. 准备脚本文件
- `nuwa_model_direct.py` - 简化版女娲模型脚本
- `nuwa_model_blender_ui.py` - 完整版女娲模型脚本（含材质）

## 🎨 在Blender中运行脚本

### 方法1：通过Blender界面（推荐）

1. **打开Blender**
   - 如果Blender没有自动打开，手动启动：`open -a Blender`

2. **切换到Scripting工作区**
   - 在Blender顶部菜单栏点击"Scripting"标签

3. **打开脚本编辑器**
   - 在底部面板找到文本编辑器
   - 点击"Open"按钮

4. **加载脚本文件**
   - 导航到项目文件夹：`/Users/yanxiaoyu/projects/CyberNuwa`
   - 选择 `nuwa_model_direct.py` 或 `nuwa_model_blender_ui.py`

5. **运行脚本**
   - 点击"Run Script"按钮（或按 `Alt + P`）

### 方法2：通过命令行

```bash
# 运行简化版女娲模型
python3 blender_mcp_server.py script nuwa_model_direct.py

# 运行完整版女娲模型（含材质）
python3 blender_mcp_server.py script nuwa_model_blender_ui.py
```

## 🐉 女娲模型特性

### 模型组成
- **头部**：球体，代表人类头部
- **躯干**：圆柱体，代表上半身
- **手臂**：两个圆柱体，左右对称
- **蛇身**：8-10个圆柱体段，形成优雅的S形弯曲
- **头发**：15-25根长发丝，随机旋转创造飘逸效果
- **装饰品**：金色头冠、耳环、项链

### 材质系统（完整版）
- **皮肤材质**：肤色，带次表面散射
- **蛇皮材质**：深绿色，金属质感
- **头发材质**：深棕色，粗糙质感
- **金色材质**：金属质感，高反射

### 光照系统
- **太阳光**：主光源，45度角照射
- **补光**：区域光，填充阴影
- **背光**：点光源，创造轮廓光（完整版）

## 🎯 查看模型

### 视图控制
- **数字键盘 0**：切换到相机视图
- **数字键盘 1**：前视图
- **数字键盘 3**：右视图
- **数字键盘 7**：顶视图
- **鼠标中键**：旋转视图
- **Shift + 鼠标中键**：平移视图
- **鼠标滚轮**：缩放视图

### 着色模式
- **实体**：默认模式，显示基本颜色
- **材质预览**：显示材质效果（推荐）
- **渲染**：最终渲染效果

## 🔧 自定义修改

### 修改模型参数
在脚本中可以调整以下参数：

```python
# 蛇身段数
snake_segments = 8  # 可以改为更多或更少

# 头发数量
for i in range(15):  # 可以改为更多或更少

# 蛇身弯曲程度
angle = i * 0.4  # 可以调整弯曲强度

# 位置和大小
radius=0.8  # 头部大小
location=(0, 0, 2.5)  # 位置坐标
```

### 添加新元素
可以在脚本中添加更多装饰品：

```python
# 添加手镯
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.15, 
    minor_radius=0.03, 
    location=(side * 1.5, 0, 1.5)
)
```

## 🎨 渲染设置

### 快速渲染
```python
# 设置渲染引擎
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 128  # 降低采样数加快渲染
```

### 高质量渲染
```python
# 高质量设置
bpy.context.scene.cycles.samples = 512
bpy.context.scene.render.resolution_x = 1920
bpy.context.scene.render.resolution_y = 1080
```

## 🚀 高级功能

### 动画准备
为模型添加骨骼系统：

```python
# 添加骨骼
bpy.ops.object.armature_add(location=(0, 0, 0))
armature = bpy.context.active_object

# 进入编辑模式添加骨骼
bpy.ops.object.mode_set(mode='EDIT')
# 添加骨骼点...
bpy.ops.object.mode_set(mode='OBJECT')
```

### 粒子系统
为头发添加粒子系统：

```python
# 选择头部对象
bpy.context.scene.objects.active = head
head.select_set(True)

# 添加粒子系统
bpy.ops.object.particle_system_add()
particle_system = head.particle_systems[0]
particle_system.settings.type = 'HAIR'
```

## 🎉 完成！

运行脚本后，你应该能在Blender中看到：

1. **完整的女娲模型**：人首蛇身，符合神话传说
2. **优雅的蛇身弯曲**：S形曲线，自然流畅
3. **飘逸的长发**：随机旋转，动态效果
4. **金色装饰品**：头冠、耳环、项链
5. **专业光照**：多光源系统
6. **最佳视角**：相机自动设置

## 🔍 故障排除

### 如果看不到模型
1. 确保脚本成功运行（查看控制台输出）
2. 按 `A` 键选择所有对象
3. 按 `Home` 键聚焦到所有对象
4. 检查是否在正确的视图模式

### 如果材质不显示
1. 确保使用"材质预览"着色模式
2. 检查渲染引擎是否设置为Cycles
3. 确保光照设置正确

### 如果性能问题
1. 减少蛇身段数
2. 减少头发数量
3. 降低渲染采样数

## 📚 相关文件

- `nuwa_model_direct.py` - 简化版模型
- `nuwa_model_blender_ui.py` - 完整版模型
- `nuwa_model.py` - 原始模型脚本
- `BLENDER_MCP_SETUP_COMPLETE.md` - MCP配置文档

---

**🎨 现在你可以在Blender中欣赏完整的女娲3D模型了！** 🐉✨ 