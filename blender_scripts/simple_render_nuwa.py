import bpy
import os

# 设置渲染引擎
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 128  # 降低采样数以加快渲染

# 设置分辨率
bpy.context.scene.render.resolution_x = 1280
bpy.context.scene.render.resolution_y = 720

# 设置输出
output_path = "/tmp/nuwa_simple_render.png"
bpy.context.scene.render.filepath = output_path
bpy.context.scene.render.image_settings.file_format = 'PNG'

print("🎨 开始渲染女娲模型...")
print(f"📐 分辨率: {bpy.context.scene.render.resolution_x}x{bpy.context.scene.render.resolution_y}")
print(f"🎯 采样数: {bpy.context.scene.cycles.samples}")
print(f"📁 输出: {output_path}")

# 渲染
bpy.ops.render.render(write_still=True)

print("✅ 女娲模型渲染完成！")
print(f"📁 输出文件: {output_path}")

# 检查文件大小
if os.path.exists(output_path):
    file_size = os.path.getsize(output_path)
    print(f"📊 文件大小: {file_size / 1024:.1f} KB")
else:
    print("❌ 渲染文件未找到") 