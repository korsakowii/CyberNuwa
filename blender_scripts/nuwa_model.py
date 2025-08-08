import bpy
import math
import bmesh
from mathutils import Vector

# Clear existing objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

def create_nuwa_model():
    """创建女娲3D模型"""
    
    # 创建人体上半身
    bpy.ops.mesh.primitive_cylinder_add(radius=0.3, depth=1.2, location=(0, 0, 1.5))
    torso = bpy.context.active_object
    torso.name = "Nuwa_Torso"
    
    # 创建头部
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.25, location=(0, 0, 2.8))
    head = bpy.context.active_object
    head.name = "Nuwa_Head"
    
    # 创建手臂
    # 左臂
    bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=0.8, location=(-0.4, 0, 1.8))
    left_arm = bpy.context.active_object
    left_arm.name = "Nuwa_LeftArm"
    left_arm.rotation_euler = (0, math.radians(30), 0)
    
    # 右臂
    bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=0.8, location=(0.4, 0, 1.8))
    right_arm = bpy.context.active_object
    right_arm.name = "Nuwa_RightArm"
    right_arm.rotation_euler = (0, math.radians(-30), 0)
    
    # 创建蛇身（下半身）
    create_snake_body()
    
    # 创建头发
    create_hair()
    
    # 创建装饰品
    create_decorations()
    
    # 创建材质
    create_materials()
    
    # 设置摄像机
    setup_camera()
    
    # 设置光照
    setup_lighting()

def create_snake_body():
    """创建蛇身"""
    # 创建蛇身的主要部分
    segments = 12
    radius = 0.25
    segment_length = 0.3
    
    for i in range(segments):
        # 蛇身逐渐变细
        current_radius = radius * (1 - i * 0.05)
        z_pos = 0.5 - i * segment_length
        
        # 添加一些弯曲
        x_offset = math.sin(i * 0.3) * 0.1
        y_offset = math.cos(i * 0.2) * 0.05
        
        bpy.ops.mesh.primitive_cylinder_add(
            radius=current_radius, 
            depth=segment_length, 
            location=(x_offset, y_offset, z_pos)
        )
        segment = bpy.context.active_object
        segment.name = f"Snake_Segment_{i+1}"
        
        # 添加旋转以创建蛇的弯曲效果
        segment.rotation_euler = (math.radians(i * 5), math.radians(i * 3), 0)
    
    # 创建蛇尾
    bpy.ops.mesh.primitive_cone_add(
        radius1=0.1, 
        radius2=0.01, 
        depth=0.8, 
        location=(0, 0, -3.5)
    )
    tail = bpy.context.active_object
    tail.name = "Snake_Tail"
    tail.rotation_euler = (math.radians(90), 0, 0)

def create_hair():
    """创建头发"""
    # 创建长发
    hair_segments = 8
    for i in range(hair_segments):
        angle = (2 * math.pi * i) / hair_segments
        x = 0.15 * math.cos(angle)
        y = 0.15 * math.sin(angle)
        z = 2.9 - i * 0.1
        
        bpy.ops.mesh.primitive_cylinder_add(
            radius=0.02, 
            depth=0.8, 
            location=(x, y, z)
        )
        hair = bpy.context.active_object
        hair.name = f"Hair_Strand_{i+1}"
        
        # 添加弯曲
        hair.rotation_euler = (math.radians(i * 10), math.radians(i * 5), 0)

def create_decorations():
    """创建装饰品"""
    # 创建头饰
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.3, 
        minor_radius=0.05, 
        location=(0, 0, 3.1)
    )
    crown = bpy.context.active_object
    crown.name = "Nuwa_Crown"
    
    # 创建项链
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.35, 
        minor_radius=0.02, 
        location=(0, 0, 2.0)
    )
    necklace = bpy.context.active_object
    necklace.name = "Nuwa_Necklace"
    
    # 创建手镯
    # 左手镯
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.12, 
        minor_radius=0.02, 
        location=(-0.4, 0, 1.4)
    )
    left_bracelet = bpy.context.active_object
    left_bracelet.name = "Left_Bracelet"
    left_bracelet.rotation_euler = (0, math.radians(30), 0)
    
    # 右手镯
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.12, 
        minor_radius=0.02, 
        location=(0.4, 0, 1.4)
    )
    right_bracelet = bpy.context.active_object
    right_bracelet.name = "Right_Bracelet"
    right_bracelet.rotation_euler = (0, math.radians(-30), 0)

def create_materials():
    """创建材质"""
    # 皮肤材质
    skin_mat = bpy.data.materials.new(name="Nuwa_Skin")
    skin_mat.use_nodes = True
    nodes = skin_mat.node_tree.nodes
    nodes.clear()
    
    # 创建皮肤着色器
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs[0].default_value = (0.8, 0.6, 0.5, 1)  # 肤色
    principled.inputs[7].default_value = 0.3  # 粗糙度
    
    # 创建材质输出
    material_output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # 连接节点
    skin_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    # 蛇身材质
    snake_mat = bpy.data.materials.new(name="Snake_Skin")
    snake_mat.use_nodes = True
    nodes = snake_mat.node_tree.nodes
    nodes.clear()
    
    # 创建蛇皮着色器
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs[0].default_value = (0.1, 0.3, 0.1, 1)  # 深绿色
    principled.inputs[7].default_value = 0.8  # 粗糙度
    principled.inputs[9].default_value = 0.1  # 金属度
    
    # 创建材质输出
    material_output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # 连接节点
    snake_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    # 头发材质
    hair_mat = bpy.data.materials.new(name="Hair")
    hair_mat.use_nodes = True
    nodes = hair_mat.node_tree.nodes
    nodes.clear()
    
    # 创建头发着色器
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs[0].default_value = (0.1, 0.05, 0.02, 1)  # 深棕色
    principled.inputs[7].default_value = 0.9  # 粗糙度
    
    # 创建材质输出
    material_output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # 连接节点
    hair_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    # 金色装饰材质
    gold_mat = bpy.data.materials.new(name="Gold")
    gold_mat.use_nodes = True
    nodes = gold_mat.node_tree.nodes
    nodes.clear()
    
    # 创建金属着色器
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs[0].default_value = (1.0, 0.8, 0.0, 1)  # 金色
    principled.inputs[7].default_value = 0.1  # 粗糙度
    principled.inputs[9].default_value = 1.0  # 金属度
    
    # 创建材质输出
    material_output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # 连接节点
    gold_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])
    
    # 分配材质
    # 皮肤材质
    for obj_name in ["Nuwa_Torso", "Nuwa_Head", "Nuwa_LeftArm", "Nuwa_RightArm"]:
        obj = bpy.data.objects.get(obj_name)
        if obj:
            if obj.data.materials:
                obj.data.materials[0] = skin_mat
            else:
                obj.data.materials.append(skin_mat)
    
    # 蛇身材质
    for i in range(1, 13):
        obj = bpy.data.objects.get(f"Snake_Segment_{i}")
        if obj:
            if obj.data.materials:
                obj.data.materials[0] = snake_mat
            else:
                obj.data.materials.append(snake_mat)
    
    # 蛇尾材质
    tail = bpy.data.objects.get("Snake_Tail")
    if tail:
        if tail.data.materials:
            tail.data.materials[0] = snake_mat
        else:
            tail.data.materials.append(snake_mat)
    
    # 头发材质
    for i in range(1, 9):
        obj = bpy.data.objects.get(f"Hair_Strand_{i}")
        if obj:
            if obj.data.materials:
                obj.data.materials[0] = hair_mat
            else:
                obj.data.materials.append(hair_mat)
    
    # 金色装饰材质
    for obj_name in ["Nuwa_Crown", "Nuwa_Necklace", "Left_Bracelet", "Right_Bracelet"]:
        obj = bpy.data.objects.get(obj_name)
        if obj:
            if obj.data.materials:
                obj.data.materials[0] = gold_mat
            else:
                obj.data.materials.append(gold_mat)

def setup_camera():
    """设置摄像机"""
    bpy.ops.object.camera_add(location=(3, -3, 2))
    camera = bpy.context.active_object
    camera.rotation_euler = (math.radians(60), 0, math.radians(45))
    bpy.context.scene.camera = camera

def setup_lighting():
    """设置光照"""
    # 主光源
    bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
    sun = bpy.context.active_object
    sun.data.energy = 3.0
    
    # 补光
    bpy.ops.object.light_add(type='AREA', location=(-3, -3, 3))
    fill_light = bpy.context.active_object
    fill_light.data.energy = 100.0
    fill_light.data.size = 2.0
    
    # 背光
    bpy.ops.object.light_add(type='POINT', location=(0, 3, 4))
    back_light = bpy.context.active_object
    back_light.data.energy = 200.0

# 创建女娲模型
create_nuwa_model()

print("🐉 女娲3D模型创建完成！")
print("📦 模型包含：")
print("   - 人首蛇身的主体结构")
print("   - 长发装饰")
print("   - 金色头饰和首饰")
print("   - 逼真的材质系统")
print("   - 专业的光照设置")
print("🎨 材质：皮肤、蛇皮、头发、金色装饰")
print("�� 光照：太阳光 + 补光 + 背光") 