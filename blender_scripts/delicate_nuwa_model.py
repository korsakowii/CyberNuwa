import bpy
import math
import bmesh

print("🎨 开始创建精致的女娲3D模型...")

# 清除所有现有对象
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

print("✅ 场景已清空")

# === 创建头部 ===
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.8, location=(0, 0, 2.5))
head = bpy.context.active_object
head.name = "Nuwa_Head"

# 创建头部材质 - 皮肤
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

print("✅ 创建头部")

# === 创建躯干 ===
bpy.ops.mesh.primitive_cylinder_add(radius=0.6, depth=1.5, location=(0, 0, 1.2))
torso = bpy.context.active_object
torso.name = "Nuwa_Torso"
torso.data.materials.append(head_mat)

print("✅ 创建躯干")

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

print("✅ 创建手臂")

# === 创建精致的蛇身 ===
print("🐍 开始创建精致的蛇身...")
snake_segments = 12
for i in range(snake_segments):
    # 计算更优雅的弯曲路径
    angle = i * 0.3
    x = math.sin(angle) * 0.8
    y = i * 0.4
    z = 0.3 - i * 0.06
    
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.5 - i * 0.03, 
        depth=0.4, 
        location=(x, y, z)
    )
    segment = bpy.context.active_object
    segment.name = f"Nuwa_SnakeSegment_{i}"
    
    # 旋转以创建弯曲效果
    segment.rotation_euler = (math.radians(angle * 20), 0, 0)
    
    # 创建蛇皮材质
    if i == 0:  # 只为第一个段创建材质
        snake_mat = bpy.data.materials.new(name="Snake_Skin")
        snake_mat.use_nodes = True
        nodes = snake_mat.node_tree.nodes
        nodes.clear()
        
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        principled.inputs['Base Color'].default_value = (0.1, 0.4, 0.2, 1)  # 深绿色
        principled.inputs['Roughness'].default_value = 0.7
        principled.inputs['Metallic'].default_value = 0.2
        
        material_output = nodes.new(type='ShaderNodeOutputMaterial')
        snake_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    segment.data.materials.append(snake_mat)
    print(f"  ✅ 创建蛇身段 {i+1}/{snake_segments}")

# === 创建精致的头发 ===
print("💇 开始创建精致的头发...")
for i in range(25):
    angle = i * 0.25
    x = math.sin(angle) * 0.4
    y = math.cos(angle) * 0.4
    
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.015, 
        depth=2.2, 
        location=(x, y, 2.9)
    )
    hair = bpy.context.active_object
    hair.name = f"Nuwa_Hair_{i}"
    
    # 随机旋转，创造飘逸效果
    hair.rotation_euler = (
        math.radians(20 + i * 2), 
        math.radians(i * 5), 
        math.radians(i * 8)
    )
    
    # 创建头发材质
    if i == 0:
        hair_mat = bpy.data.materials.new(name="Hair_Material")
        hair_mat.use_nodes = True
        nodes = hair_mat.node_tree.nodes
        nodes.clear()
        
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        principled.inputs['Base Color'].default_value = (0.05, 0.03, 0.01, 1)  # 深棕色
        principled.inputs['Roughness'].default_value = 0.9
        
        material_output = nodes.new(type='ShaderNodeOutputMaterial')
        hair_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    hair.data.materials.append(hair_mat)

# === 创建精致的金色装饰 ===
# 头冠
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.9, 
    minor_radius=0.08, 
    location=(0, 0, 3.3)
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
        major_radius=0.12, 
        minor_radius=0.02, 
        location=(side * 0.7, 0, 2.3)
    )
    earring = bpy.context.active_object
    earring.name = f"Nuwa_Earring_{side}"
    earring.data.materials.append(gold_mat)

# 项链
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.8, 
    minor_radius=0.05, 
    location=(0, 0, 1.8)
)
necklace = bpy.context.active_object
necklace.name = "Nuwa_Necklace"
necklace.data.materials.append(gold_mat)

# 手镯
for side in [-1, 1]:
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.15, 
        minor_radius=0.03, 
        location=(side * 1.5, 0, 1.5)
    )
    bracelet = bpy.context.active_object
    bracelet.name = f"Nuwa_Bracelet_{side}"
    bracelet.data.materials.append(gold_mat)

print("✅ 创建装饰品")

# === 创建面部特征 ===
# 眼睛
for side in [-1, 1]:
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=0.08, 
        location=(side * 0.25, -0.6, 2.6)
    )
    eye = bpy.context.active_object
    eye.name = f"Nuwa_Eye_{side}"
    
    # 创建眼睛材质
    eye_mat = bpy.data.materials.new(name="Eye_Material")
    eye_mat.use_nodes = True
    nodes = eye_mat.node_tree.nodes
    nodes.clear()
    
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs['Base Color'].default_value = (0.1, 0.1, 0.1, 1)  # 黑色
    principled.inputs['Roughness'].default_value = 0.1
    
    material_output = nodes.new(type='ShaderNodeOutputMaterial')
    eye_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    eye.data.materials.append(eye_mat)

# 嘴唇
bpy.ops.mesh.primitive_uv_sphere_add(
    radius=0.12, 
    location=(0, -0.7, 2.2)
)
lips = bpy.context.active_object
lips.name = "Nuwa_Lips"
lips.scale = (0.8, 0.3, 0.2)

# 创建嘴唇材质
lips_mat = bpy.data.materials.new(name="Lips_Material")
lips_mat.use_nodes = True
nodes = lips_mat.node_tree.nodes
nodes.clear()

principled = nodes.new(type='ShaderNodeBsdfPrincipled')
principled.inputs['Base Color'].default_value = (0.8, 0.2, 0.3, 1)  # 红色
principled.inputs['Roughness'].default_value = 0.2
principled.inputs['Subsurface'].default_value = 0.3

material_output = nodes.new(type='ShaderNodeOutputMaterial')
lips_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])

lips.data.materials.append(lips_mat)

print("✅ 创建面部特征")

# === 创建额外的装饰品 ===
# 额饰
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.7, 
    minor_radius=0.03, 
    location=(0, 0, 3.0)
)
forehead_ornament = bpy.context.active_object
forehead_ornament.name = "Nuwa_Forehead_Ornament"
forehead_ornament.data.materials.append(gold_mat)

# 发簪
for i in range(3):
    angle = i * 2 * math.pi / 3
    x = math.cos(angle) * 0.3
    y = math.sin(angle) * 0.3
    
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.02, 
        depth=1.0, 
        location=(x, y, 3.1)
    )
    hairpin = bpy.context.active_object
    hairpin.name = f"Nuwa_Hairpin_{i}"
    hairpin.rotation_euler = (math.radians(15), 0, angle)
    hairpin.data.materials.append(gold_mat)

print("✅ 创建额外装饰品")

# === 设置精致的光照系统 ===
# 删除默认光源
bpy.ops.object.select_by_type(type='LIGHT')
bpy.ops.object.delete(use_global=False)

# 主光源 - 太阳光
bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
sun = bpy.context.active_object
sun.data.energy = 4.0
sun.rotation_euler = (math.radians(45), math.radians(45), 0)

# 补光 - 区域光
bpy.ops.object.light_add(type='AREA', location=(-3, -3, 5))
fill_light = bpy.context.active_object
fill_light.data.energy = 2.5
fill_light.data.size = 2.0

# 背光 - 点光源
bpy.ops.object.light_add(type='POINT', location=(0, -5, 3))
back_light = bpy.context.active_object
back_light.data.energy = 3.0

# 顶部光 - 区域光
bpy.ops.object.light_add(type='AREA', location=(0, 0, 8))
top_light = bpy.context.active_object
top_light.data.energy = 1.5
top_light.data.size = 3.0

print("✅ 设置精致光照")

# === 设置相机 ===
# 删除默认相机
bpy.ops.object.select_by_type(type='CAMERA')
bpy.ops.object.delete(use_global=False)

# 添加新相机
bpy.ops.object.camera_add(location=(5, -5, 4))
camera = bpy.context.active_object
camera.rotation_euler = (math.radians(55), 0, math.radians(45))
bpy.context.scene.camera = camera

print("✅ 设置相机")

# === 设置渲染引擎 ===
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 256

# === 设置世界背景 ===
world = bpy.context.scene.world
if world:
    world.use_nodes = True
    nodes = world.node_tree.nodes
    nodes.clear()
    
    # 创建背景节点
    background = nodes.new(type='ShaderNodeBackground')
    background.inputs['Color'].default_value = (0.02, 0.05, 0.1, 1)  # 深蓝色
    background.inputs['Strength'].default_value = 0.3
    
    # 创建世界输出节点
    world_output = nodes.new(type='ShaderNodeOutputWorld')
    
    # 连接节点
    world.node_tree.links.new(background.outputs[0], world_output.inputs[0])

# 选择所有对象
bpy.ops.object.select_all(action='SELECT')

print("🎉 精致的女娲3D模型创建完成！")
print(f"📊 总共创建了 {len(bpy.context.scene.objects)} 个对象")
print("🐉 精致女娲模型包含：")
print("   - 头部、躯干、手臂（皮肤材质）")
print("   - 12段精致蛇身（蛇皮材质）")
print("   - 25根飘逸长发（头发材质）")
print("   - 金色装饰品（头冠、耳环、项链、手镯、额饰、发簪）")
print("   - 面部特征（眼睛、嘴唇）")
print("   - 四光源照明系统")
print("   - 深蓝色星空背景")
print("💡 渲染引擎：Cycles，256采样") 