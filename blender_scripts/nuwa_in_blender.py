import bpy
import math

print("🎨 开始创建女娲模型...")

# 清除所有现有对象
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

print("✅ 场景已清空")

# === 创建头部 ===
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.8, location=(0, 0, 2.5))
head = bpy.context.active_object
head.name = "Nuwa_Head"
print("✅ 创建头部")

# === 创建躯干 ===
bpy.ops.mesh.primitive_cylinder_add(radius=0.6, depth=1.5, location=(0, 0, 1.2))
torso = bpy.context.active_object
torso.name = "Nuwa_Torso"
print("✅ 创建躯干")

# === 创建手臂 ===
# 左臂
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=1.2, location=(-1.2, 0, 1.8))
left_arm = bpy.context.active_object
left_arm.name = "Nuwa_LeftArm"
left_arm.rotation_euler = (0, math.radians(30), 0)

# 右臂
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=1.2, location=(1.2, 0, 1.8))
right_arm = bpy.context.active_object
right_arm.name = "Nuwa_RightArm"
right_arm.rotation_euler = (0, math.radians(-30), 0)
print("✅ 创建手臂")

# === 创建蛇身 ===
print("🐍 开始创建蛇身...")
snake_segments = 6
for i in range(snake_segments):
    # 计算弯曲路径
    angle = i * 0.5
    x = math.sin(angle) * 0.8
    y = i * 0.5
    z = 0.2 - i * 0.1
    
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.5 - i * 0.05, 
        depth=0.5, 
        location=(x, y, z)
    )
    segment = bpy.context.active_object
    segment.name = f"Nuwa_SnakeSegment_{i}"
    
    # 旋转以创建弯曲效果
    segment.rotation_euler = (math.radians(angle * 25), 0, 0)
    print(f"  ✅ 创建蛇身段 {i+1}/{snake_segments}")

# === 创建头发 ===
print("💇 开始创建头发...")
for i in range(10):
    angle = i * 0.4
    x = math.sin(angle) * 0.4
    y = math.cos(angle) * 0.4
    
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.025, 
        depth=2.0, 
        location=(x, y, 2.9)
    )
    hair = bpy.context.active_object
    hair.name = f"Nuwa_Hair_{i}"
    
    # 随机旋转
    hair.rotation_euler = (
        math.radians(15 + i * 4), 
        math.radians(i * 6), 
        math.radians(i * 10)
    )

# === 创建金色装饰 ===
# 头冠
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.9, 
    minor_radius=0.08, 
    location=(0, 0, 3.2)
)
crown = bpy.context.active_object
crown.name = "Nuwa_Crown"

# 耳环
for side in [-1, 1]:
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.12, 
        minor_radius=0.02, 
        location=(side * 0.7, 0, 2.3)
    )
    earring = bpy.context.active_object
    earring.name = f"Nuwa_Earring_{side}"

print("✅ 创建装饰品")

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

print("✅ 设置光照")

# === 设置相机 ===
# 删除默认相机
bpy.ops.object.select_by_type(type='CAMERA')
bpy.ops.object.delete(use_global=False)

# 添加新相机
bpy.ops.object.camera_add(location=(4, -4, 3))
camera = bpy.context.active_object
camera.rotation_euler = (math.radians(60), 0, math.radians(45))
bpy.context.scene.camera = camera

print("✅ 设置相机")

# 选择所有对象
bpy.ops.object.select_all(action='SELECT')

print("🎉 女娲模型创建完成！")
print(f"📊 总共创建了 {len(bpy.context.scene.objects)} 个对象")
print("🐉 女娲模型包含：头部、躯干、手臂、蛇身、头发、金色装饰")
print("💡 光照和相机已设置完成") 