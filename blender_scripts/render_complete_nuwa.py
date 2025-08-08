import bpy
import os

# 设置渲染引擎
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 256  # 高质量采样

# 设置分辨率
bpy.context.scene.render.resolution_x = 1920
bpy.context.scene.render.resolution_y = 1080

# 设置输出
output_path = "/tmp/complete_nuwa_render.png"
bpy.context.scene.render.filepath = output_path
bpy.context.scene.render.image_settings.file_format = 'PNG'

# 启用降噪
bpy.context.scene.cycles.use_denoising = True

# 设置世界背景为更深的蓝色
world = bpy.context.scene.world
if world and world.use_nodes:
    nodes = world.node_tree.nodes
    for node in nodes:
        if node.type == 'BACKGROUND':
            node.inputs['Color'].default_value = (0.02, 0.05, 0.1, 1)  # 更深的蓝色
            node.inputs['Strength'].default_value = 0.3

print("🎨 开始渲染完整的女娲3D模型...")
print(f"📐 分辨率: {bpy.context.scene.render.resolution_x}x{bpy.context.scene.render.resolution_y}")
print(f"🎯 采样数: {bpy.context.scene.cycles.samples}")
print(f"📁 输出: {output_path}")

# 渲染场景
bpy.ops.render.render(write_still=True)

print("✅ 完整的女娲3D模型渲染完成！")
print(f"📁 输出文件: {output_path}")

# 检查文件大小
if os.path.exists(output_path):
    file_size = os.path.getsize(output_path)
    print(f"📊 文件大小: {file_size / 1024 / 1024:.1f} MB")
else:
    print("❌ 渲染文件未找到") 