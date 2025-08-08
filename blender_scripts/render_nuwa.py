import bpy
import os
import math

# 设置高质量渲染
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 512  # 高质量采样
bpy.context.scene.cycles.use_denoising = True
bpy.context.scene.cycles.denoiser = 'OPTIX'  # 使用OptiX降噪

# 设置分辨率
bpy.context.scene.render.resolution_x = 1920
bpy.context.scene.render.resolution_y = 1080
bpy.context.scene.render.resolution_percentage = 100

# 设置输出
output_path = "/tmp/nuwa_render.png"
bpy.context.scene.render.filepath = output_path
bpy.context.scene.render.image_settings.file_format = 'PNG'
bpy.context.scene.render.image_settings.color_mode = 'RGBA'
bpy.context.scene.render.image_settings.compression = 15

# 设置世界背景
world = bpy.context.scene.world
if not world:
    world = bpy.data.worlds.new("World")
    bpy.context.scene.world = world

world.use_nodes = True
nodes = world.node_tree.nodes
nodes.clear()

# 创建渐变背景
gradient = nodes.new(type='ShaderNodeTexGradient')
gradient.gradient_type = 'RADIAL'

# 创建颜色映射
color_ramp = nodes.new(type='ShaderNodeValToRGB')
color_ramp.color_ramp.elements[0].position = 0.0
color_ramp.color_ramp.elements[0].color = (0.1, 0.1, 0.3, 1)  # 深蓝色
color_ramp.color_ramp.elements[1].position = 1.0
color_ramp.color_ramp.elements[1].color = (0.8, 0.9, 1.0, 1)  # 浅蓝色

# 创建背景着色器
background = nodes.new(type='ShaderNodeBackground')
background.inputs[1].default_value = 2.0  # 强度

# 创建世界输出
world_output = nodes.new(type='ShaderNodeOutputWorld')

# 连接节点
world.node_tree.links.new(gradient.outputs[0], color_ramp.inputs[0])
world.node_tree.links.new(color_ramp.outputs[0], background.inputs[0])
world.node_tree.links.new(background.outputs[0], world_output.inputs[0])

# 调整摄像机位置以获得更好的角度
camera = bpy.context.scene.camera
if camera:
    camera.location = (4, -4, 3)
    camera.rotation_euler = (math.radians(55), 0, math.radians(45))

# 添加一些额外的光照效果
# 创建体积光效果
bpy.ops.object.light_add(type='VOLUME', location=(0, 0, 5))
volume_light = bpy.context.active_object
volume_light.data.energy = 50.0
volume_light.data.size = 10.0

# 创建环境光
bpy.context.scene.world.light_settings.use_ambient_occlusion = True
bpy.context.scene.world.light_settings.ao_factor = 0.5

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
    print(f"📊 文件大小: {file_size / 1024 / 1024:.1f} MB")
else:
    print("❌ 渲染文件未找到") 