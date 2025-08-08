import bpy
import math
import bmesh

# 清除现有场景
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# 设置视图着色模式为材质预览
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        for space in area.spaces:
            if space.type == 'VIEW_3D':
                space.shading.type = 'MATERIAL'

print("🎨 开始创建女娲3D模型...")

# === 创建头部 ===
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.8, location=(0, 0, 2.5))
head = bpy.context.active_object
head.name = "Nuwa_Head"

# 创建头部材质
head_mat = bpy.data.materials.new(name="Skin_Material")
head_mat.use_nodes = True
nodes = head_mat.node_tree.nodes
nodes.clear()

# 添加Principled BSDF
principled = nodes.new(type='ShaderNodeBsdfPrincipled')
principled.inputs['Base Color'].default_value = (0.8, 0.6, 0.5, 1)  # 肤色
principled.inputs['Roughness'].default_value = 0.3
principled.inputs['Subsurface'].default_value = 0.1
principled.inputs['Subsurface Color'].default_value = (0.9, 0.4, 0.3, 1)

# 添加材质输出
material_output = nodes.new(type='ShaderNodeOutputMaterial')
head_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])

# 分配材质
if head.data.materials:
    head.data.materials[0] = head_mat
else:
    head.data.materials.append(head_mat)

# === 创建躯干 ===
bpy.ops.mesh.primitive_cylinder_add(radius=0.6, depth=1.5, location=(0, 0, 1.2))
torso = bpy.context.active_object
torso.name = "Nuwa_Torso"
torso.data.materials.append(head_mat)

# === 创建手臂 ===
# 左臂
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=1.2, location=(-1.2, 0, 1.8))
left_arm = bpy.context.active_object
left_arm.name = "Nuwa_LeftArm"
left_arm.rotation_euler = (0, math.radians(30), 0)
left_arm.data.materials.append(head_mat)

# 右臂
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=1.2, location=(1.2, 0, 1.8))
right_arm = bpy.context.active_object
right_arm.name = "Nuwa_RightArm"
right_arm.rotation_euler = (0, math.radians(-30), 0)
right_arm.data.materials.append(head_mat)

# === 创建蛇身 ===
# 蛇身由多个圆柱体组成，形成弯曲的形状
snake_segments = 8
for i in range(snake_segments):
    # 计算弯曲路径
    angle = i * 0.3
    x = math.sin(angle) * 0.5
    y = i * 0.4
    z = 0.5 - i * 0.1
    
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.4 - i * 0.02, 
        depth=0.4, 
        location=(x, y, z)
    )
    segment = bpy.context.active_object
    segment.name = f"Nuwa_SnakeSegment_{i}"
    
    # 旋转以创建弯曲效果
    segment.rotation_euler = (math.radians(angle * 30), 0, 0)
    
    # 创建蛇皮材质
    if i == 0:  # 只为第一个段创建材质
        snake_mat = bpy.data.materials.new(name="Snake_Skin")
        snake_mat.use_nodes = True
        nodes = snake_mat.node_tree.nodes
        nodes.clear()
        
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        principled.inputs['Base Color'].default_value = (0.1, 0.3, 0.1, 1)  # 深绿色
        principled.inputs['Roughness'].default_value = 0.8
        principled.inputs['Metallic'].default_value = 0.1
        
        material_output = nodes.new(type='ShaderNodeOutputMaterial')
        snake_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    segment.data.materials.append(snake_mat)

# === 创建头发 ===
# 创建多个长发丝
for i in range(20):
    angle = i * 0.3
    x = math.sin(angle) * 0.3
    y = math.cos(angle) * 0.3
    
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.02, 
        depth=1.5, 
        location=(x, y, 2.8)
    )
    hair = bpy.context.active_object
    hair.name = f"Nuwa_Hair_{i}"
    
    # 随机旋转
    hair.rotation_euler = (
        math.radians(30 + i * 5), 
        math.radians(i * 10), 
        math.radians(i * 15)
    )
    
    # 创建头发材质
    if i == 0:
        hair_mat = bpy.data.materials.new(name="Hair_Material")
        hair_mat.use_nodes = True
        nodes = hair_mat.node_tree.nodes
        nodes.clear()
        
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        principled.inputs['Base Color'].default_value = (0.1, 0.05, 0.02, 1)  # 深棕色
        principled.inputs['Roughness'].default_value = 0.9
        
        material_output = nodes.new(type='ShaderNodeOutputMaterial')
        hair_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    hair.data.materials.append(hair_mat)

# === 创建金色装饰 ===
# 头冠
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.9, 
    minor_radius=0.1, 
    location=(0, 0, 3.2)
)
crown = bpy.context.active_object
crown.name = "Nuwa_Crown"

# 创建金色材质
gold_mat = bpy.data.materials.new(name="Gold_Material")
gold_mat.use_nodes = True
nodes = gold_mat.node_tree.nodes
nodes.clear()

principled = nodes.new(type='ShaderNodeBsdfPrincipled')
principled.inputs['Base Color'].default_value = (1.0, 0.8, 0.0, 1)  # 金色
principled.inputs['Metallic'].default_value = 1.0
principled.inputs['Roughness'].default_value = 0.1

material_output = nodes.new(type='ShaderNodeOutputMaterial')
gold_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])

crown.data.materials.append(gold_mat)

# 耳环
for side in [-1, 1]:
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.15, 
        minor_radius=0.03, 
        location=(side * 0.7, 0, 2.3)
    )
    earring = bpy.context.active_object
    earring.name = f"Nuwa_Earring_{side}"
    earring.data.materials.append(gold_mat)

# === 设置光照 ===
# 删除默认光源
bpy.ops.object.select_by_type(type='LIGHT')
bpy.ops.object.delete(use_global=False)

# 添加太阳光
bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
sun = bpy.context.active_object
sun.data.energy = 3.0
sun.rotation_euler = (math.radians(45), math.radians(45), 0)

# 添加补光
bpy.ops.object.light_add(type='AREA', location=(-3, -3, 5))
fill_light = bpy.context.active_object
fill_light.data.energy = 2.0
fill_light.data.size = 2.0

# === 设置相机 ===
# 删除默认相机
bpy.ops.object.select_by_type(type='CAMERA')
bpy.ops.object.delete(use_global=False)

# 添加新相机
bpy.ops.object.camera_add(location=(4, -4, 3))
camera = bpy.context.active_object
camera.rotation_euler = (math.radians(60), 0, math.radians(45))
bpy.context.scene.camera = camera

# === 设置渲染引擎 ===
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 128

# === 设置视图 ===
# 切换到相机视图
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        for space in area.spaces:
            if space.type == 'VIEW_3D':
                space.region_3d.view_perspective = 'CAMERA'

print("✅ 女娲3D模型创建完成！")
print(f"📊 创建了 {len(bpy.context.scene.objects)} 个对象")
print("🎨 模型包含：头部、躯干、手臂、蛇身、头发、金色装饰")
print("💡 光照系统：太阳光 + 补光")
print("📷 相机已设置到最佳视角")

# 选择所有对象以便查看
bpy.ops.object.select_all(action='SELECT') 