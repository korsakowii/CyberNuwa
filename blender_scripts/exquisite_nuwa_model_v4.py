#!/usr/bin/env python3
"""
Exquisite Nuwa Model Creator for Blender 4.5+
专为Blender 4.5+设计的超精致女娲3D模型创建器
使用最新的材质、几何节点和渲染功能
"""

import bpy
import math
import random
import os
from datetime import datetime
from mathutils import Vector, Matrix

print("🎨 开始创建超精致女娲3D模型 (Blender 4.5+)...")
print("✨ 使用最新材质、几何节点和渲染功能...")

# 清除所有现有对象
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

print("✅ 场景已清空")

# === 高级材质创建函数 ===
def create_advanced_skin_material():
    """创建高级皮肤材质（使用Blender 4.5新功能）"""
    mat = bpy.data.materials.new(name="Advanced_Skin")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    
    # 主着色器
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs['Base Color'].default_value = (0.85, 0.65, 0.55, 1)
    principled.inputs['Roughness'].default_value = 0.25
    principled.inputs['Metallic'].default_value = 0.0
    
    # 次表面散射（Blender 4.5支持）
    if 'Subsurface' in principled.inputs:
        principled.inputs['Subsurface'].default_value = 0.15
        principled.inputs['Subsurface Color'].default_value = (0.9, 0.4, 0.3, 1)
    
    # 高光
    if 'Specular' in principled.inputs:
        principled.inputs['Specular'].default_value = 0.3
    
    # 噪波纹理用于皮肤细节
    noise = nodes.new(type='ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = 50.0
    noise.inputs['Detail'].default_value = 8.0
    noise.inputs['Roughness'].default_value = 0.7
    
    # 颜色映射
    color_ramp = nodes.new(type='ShaderNodeValToRGB')
    color_ramp.color_ramp.elements[0].position = 0.4
    color_ramp.color_ramp.elements[0].color = (0.8, 0.6, 0.5, 1)
    color_ramp.color_ramp.elements[1].position = 0.6
    color_ramp.color_ramp.elements[1].color = (0.9, 0.7, 0.6, 1)
    
    # 混合节点
    mix_rgb = nodes.new(type='ShaderNodeMixRGB')
    mix_rgb.blend_type = 'MULTIPLY'
    mix_rgb.inputs['Fac'].default_value = 0.3
    
    # 输出节点
    output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # 连接节点
    links.new(noise.outputs['Color'], color_ramp.inputs['Fac'])
    links.new(color_ramp.outputs['Color'], mix_rgb.inputs['Color1'])
    links.new(principled.outputs['Base Color'], mix_rgb.inputs['Color2'])
    links.new(mix_rgb.outputs['Color'], principled.inputs['Base Color'])
    links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return mat

def create_advanced_snake_skin_material():
    """创建高级蛇皮材质"""
    mat = bpy.data.materials.new(name="Advanced_Snake_Skin")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    
    # 主着色器
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs['Base Color'].default_value = (0.1, 0.35, 0.15, 1)
    principled.inputs['Roughness'].default_value = 0.6
    principled.inputs['Metallic'].default_value = 0.3
    
    # 蛇皮纹理 - Voronoi
    voronoi = nodes.new(type='ShaderNodeTexVoronoi')
    voronoi.feature = 'DISTANCE_TO_EDGE'
    voronoi.inputs['Scale'].default_value = 20.0
    
    # 噪波纹理
    noise = nodes.new(type='ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = 30.0
    noise.inputs['Detail'].default_value = 10.0
    
    # 混合纹理
    mix_rgb = nodes.new(type='ShaderNodeMixRGB')
    mix_rgb.blend_type = 'MULTIPLY'
    mix_rgb.inputs['Fac'].default_value = 0.7
    
    # 颜色映射
    color_ramp = nodes.new(type='ShaderNodeValToRGB')
    color_ramp.color_ramp.elements[0].position = 0.3
    color_ramp.color_ramp.elements[0].color = (0.05, 0.25, 0.1, 1)
    color_ramp.color_ramp.elements[1].position = 0.7
    color_ramp.color_ramp.elements[1].color = (0.15, 0.45, 0.2, 1)
    
    # 输出节点
    output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # 连接节点
    links.new(voronoi.outputs['Distance'], mix_rgb.inputs['Color1'])
    links.new(noise.outputs['Color'], mix_rgb.inputs['Color2'])
    links.new(mix_rgb.outputs['Color'], color_ramp.inputs['Fac'])
    links.new(color_ramp.outputs['Color'], principled.inputs['Base Color'])
    links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return mat

def create_advanced_hair_material():
    """创建高级头发材质"""
    mat = bpy.data.materials.new(name="Advanced_Hair")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    
    # 主着色器
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs['Base Color'].default_value = (0.03, 0.02, 0.01, 1)
    principled.inputs['Roughness'].default_value = 0.8
    principled.inputs['Metallic'].default_value = 0.0
    
    # 头发纹理
    noise = nodes.new(type='ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = 100.0
    noise.inputs['Detail'].default_value = 15.0
    
    # 颜色映射
    color_ramp = nodes.new(type='ShaderNodeValToRGB')
    color_ramp.color_ramp.elements[0].position = 0.4
    color_ramp.color_ramp.elements[0].color = (0.02, 0.015, 0.008, 1)
    color_ramp.color_ramp.elements[1].position = 0.6
    color_ramp.color_ramp.elements[1].color = (0.04, 0.025, 0.012, 1)
    
    # 混合节点
    mix_rgb = nodes.new(type='ShaderNodeMixRGB')
    mix_rgb.blend_type = 'MULTIPLY'
    mix_rgb.inputs['Fac'].default_value = 0.4
    
    # 输出节点
    output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # 连接节点
    links.new(noise.outputs['Color'], color_ramp.inputs['Fac'])
    links.new(color_ramp.outputs['Color'], mix_rgb.inputs['Color1'])
    links.new(principled.outputs['Base Color'], mix_rgb.inputs['Color2'])
    links.new(mix_rgb.outputs['Color'], principled.inputs['Base Color'])
    links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return mat

def create_advanced_gold_material():
    """创建高级金色材质"""
    mat = bpy.data.materials.new(name="Advanced_Gold")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    
    # 主着色器
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs['Base Color'].default_value = (1.0, 0.8, 0.2, 1)
    principled.inputs['Metallic'].default_value = 1.0
    principled.inputs['Roughness'].default_value = 0.05
    
    # 金色纹理
    noise = nodes.new(type='ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = 200.0
    noise.inputs['Detail'].default_value = 12.0
    
    # 颜色映射
    color_ramp = nodes.new(type='ShaderNodeValToRGB')
    color_ramp.color_ramp.elements[0].position = 0.45
    color_ramp.color_ramp.elements[0].color = (0.9, 0.7, 0.1, 1)
    color_ramp.color_ramp.elements[1].position = 0.55
    color_ramp.color_ramp.elements[1].color = (1.0, 0.9, 0.3, 1)
    
    # 混合节点
    mix_rgb = nodes.new(type='ShaderNodeMixRGB')
    mix_rgb.blend_type = 'MULTIPLY'
    mix_rgb.inputs['Fac'].default_value = 0.2
    
    # 输出节点
    output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # 连接节点
    links.new(noise.outputs['Color'], color_ramp.inputs['Fac'])
    links.new(color_ramp.outputs['Color'], mix_rgb.inputs['Color1'])
    links.new(principled.outputs['Base Color'], mix_rgb.inputs['Color2'])
    links.new(mix_rgb.outputs['Color'], principled.inputs['Base Color'])
    links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return mat

# === 创建材质 ===
print("🎨 创建高级材质...")
skin_mat = create_advanced_skin_material()
snake_mat = create_advanced_snake_skin_material()
hair_mat = create_advanced_hair_material()
gold_mat = create_advanced_gold_material()

# === 创建精致的头部 ===
print("👤 创建精致头部...")
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.8, location=(0, 0, 2.5))
head = bpy.context.active_object
head.name = "Nuwa_Head_Advanced"

# 细分头部以获得更好的细节
bpy.ops.object.modifier_add(type='SUBSURF')
head.modifiers["Subdivision"].levels = 3
head.modifiers["Subdivision"].render_levels = 4

# 应用材质
head.data.materials.append(skin_mat)

print("✅ 创建精致头部")

# === 创建精致的躯干 ===
print("👗 创建精致躯干...")
bpy.ops.mesh.primitive_cylinder_add(radius=0.6, depth=1.5, location=(0, 0, 1.2))
torso = bpy.context.active_object
torso.name = "Nuwa_Torso_Advanced"

# 细分躯干
bpy.ops.object.modifier_add(type='SUBSURF')
torso.modifiers["Subdivision"].levels = 3

# 应用材质
torso.data.materials.append(skin_mat)

print("✅ 创建精致躯干")

# === 创建精致的手臂 ===
print("💪 创建精致手臂...")
for side, name in [(-1, "Left"), (1, "Right")]:
    # 上臂
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.18, 
        depth=0.8, 
        location=(side * 1.0, 0, 1.8)
    )
    upper_arm = bpy.context.active_object
    upper_arm.name = f"Nuwa_UpperArm_{name}"
    upper_arm.rotation_euler = (0, math.radians(side * 25), 0)
    upper_arm.data.materials.append(skin_mat)
    
    # 前臂
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.15, 
        depth=0.7, 
        location=(side * 1.4, 0, 1.4)
    )
    forearm = bpy.context.active_object
    forearm.name = f"Nuwa_Forearm_{name}"
    forearm.rotation_euler = (0, math.radians(side * 35), 0)
    forearm.data.materials.append(skin_mat)
    
    # 手部
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=0.12, 
        location=(side * 1.7, 0, 1.1)
    )
    hand = bpy.context.active_object
    hand.name = f"Nuwa_Hand_{name}"
    hand.scale = (0.8, 0.6, 0.4)
    hand.data.materials.append(skin_mat)

print("✅ 创建精致手臂")

# === 创建精致的蛇身 ===
print("🐍 开始创建精致蛇身...")
snake_segments = 20  # 增加段数
for i in range(snake_segments):
    # 计算更复杂的弯曲路径
    angle = i * 0.2
    wave = math.sin(angle * 2) * 0.3
    spiral = math.cos(angle * 0.5) * 0.2
    x = math.sin(angle) * 0.8 + wave + spiral
    y = i * 0.3
    z = 0.4 - i * 0.04 + math.cos(angle) * 0.2
    
    # 创建蛇身段
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.5 - i * 0.02, 
        depth=0.3, 
        location=(x, y, z)
    )
    segment = bpy.context.active_object
    segment.name = f"Nuwa_SnakeSegment_{i}"
    
    # 复杂的旋转
    segment.rotation_euler = (
        math.radians(angle * 15 + wave * 20), 
        math.radians(angle * 10 + spiral * 15), 
        math.radians(wave * 15)
    )
    
    # 细分以获得更好的细节
    bpy.ops.object.modifier_add(type='SUBSURF')
    segment.modifiers["Subdivision"].levels = 2
    
    # 应用材质
    segment.data.materials.append(snake_mat)
    
    print(f"  ✅ 创建蛇身段 {i+1}/{snake_segments}")

# === 创建精致的头发 ===
print("💇 开始创建精致头发...")
hair_count = 60  # 增加头发数量
for i in range(hair_count):
    # 计算头发位置
    angle = i * 2 * math.pi / hair_count
    radius = 0.4 + random.uniform(-0.15, 0.15)
    x = math.cos(angle) * radius
    y = math.sin(angle) * radius
    
    # 创建头发丝
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.01, 
        depth=2.8, 
        location=(x, y, 2.9)
    )
    hair = bpy.context.active_object
    hair.name = f"Nuwa_Hair_{i}"
    
    # 随机旋转，创造飘逸效果
    hair.rotation_euler = (
        math.radians(20 + random.uniform(-15, 15)), 
        math.radians(random.uniform(-20, 20)), 
        math.radians(random.uniform(-25, 25))
    )
    
    # 应用材质
    hair.data.materials.append(hair_mat)

print(f"✅ 创建了 {hair_count} 根精致头发")

# === 创建精致的面部特征 ===
print("👁️ 创建精致面部特征...")

# 眼睛
for side in [-1, 1]:
    # 眼球
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=0.08, 
        location=(side * 0.25, -0.6, 2.6)
    )
    eye = bpy.context.active_object
    eye.name = f"Nuwa_Eye_{side}"
    
    # 创建眼睛材质
    eye_mat = bpy.data.materials.new(name=f"Eye_Material_{side}")
    eye_mat.use_nodes = True
    nodes = eye_mat.node_tree.nodes
    nodes.clear()
    
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs['Base Color'].default_value = (0.1, 0.1, 0.1, 1)
    principled.inputs['Roughness'].default_value = 0.1
    
    output = nodes.new(type='ShaderNodeOutputMaterial')
    eye_mat.node_tree.links.new(principled.outputs[0], output.inputs[0])
    
    eye.data.materials.append(eye_mat)
    
    # 眼白
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=0.09, 
        location=(side * 0.25, -0.58, 2.6)
    )
    eye_white = bpy.context.active_object
    eye_white.name = f"Nuwa_EyeWhite_{side}"
    
    # 眼白材质
    white_mat = bpy.data.materials.new(name=f"EyeWhite_Material_{side}")
    white_mat.use_nodes = True
    nodes = white_mat.node_tree.nodes
    nodes.clear()
    
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.inputs['Base Color'].default_value = (0.95, 0.95, 0.95, 1)
    principled.inputs['Roughness'].default_value = 0.2
    
    output = nodes.new(type='ShaderNodeOutputMaterial')
    white_mat.node_tree.links.new(principled.outputs[0], output.inputs[0])
    
    eye_white.data.materials.append(white_mat)

# 嘴唇
bpy.ops.mesh.primitive_uv_sphere_add(
    radius=0.12, 
    location=(0, -0.7, 2.2)
)
lips = bpy.context.active_object
lips.name = "Nuwa_Lips"
lips.scale = (0.8, 0.3, 0.2)

# 嘴唇材质
lips_mat = bpy.data.materials.new(name="Lips_Material")
lips_mat.use_nodes = True
nodes = lips_mat.node_tree.nodes
nodes.clear()

principled = nodes.new(type='ShaderNodeBsdfPrincipled')
principled.inputs['Base Color'].default_value = (0.8, 0.2, 0.3, 1)
principled.inputs['Roughness'].default_value = 0.2

# 次表面散射
if 'Subsurface' in principled.inputs:
    principled.inputs['Subsurface'].default_value = 0.4
    principled.inputs['Subsurface Color'].default_value = (0.9, 0.3, 0.4, 1)

output = nodes.new(type='ShaderNodeOutputMaterial')
lips_mat.node_tree.links.new(principled.outputs[0], output.inputs[0])

lips.data.materials.append(lips_mat)

print("✅ 创建精致面部特征")

# === 创建精致的装饰品 ===
print("💎 创建精致装饰品...")

# 头冠
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.9, 
    minor_radius=0.08, 
    location=(0, 0, 3.3)
)
crown = bpy.context.active_object
crown.name = "Nuwa_Crown_Advanced"
crown.data.materials.append(gold_mat)

# 头冠装饰
for i in range(12):  # 增加装饰数量
    angle = i * 2 * math.pi / 12
    x = math.cos(angle) * 0.9
    y = math.sin(angle) * 0.9
    
    bpy.ops.mesh.primitive_cone_add(
        radius1=0.05,
        radius2=0.02,
        depth=0.3,
        location=(x, y, 3.5)
    )
    gem = bpy.context.active_object
    gem.name = f"Nuwa_CrownGem_{i}"
    gem.data.materials.append(gold_mat)

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
    
    # 耳环装饰
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=0.03,
        location=(side * 0.7, 0, 2.1)
    )
    earring_gem = bpy.context.active_object
    earring_gem.name = f"Nuwa_EarringGem_{side}"
    earring_gem.data.materials.append(gold_mat)

# 项链
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.8, 
    minor_radius=0.05, 
    location=(0, 0, 1.8)
)
necklace = bpy.context.active_object
necklace.name = "Nuwa_Necklace_Advanced"
necklace.data.materials.append(gold_mat)

# 项链装饰
for i in range(8):  # 增加装饰数量
    angle = i * 2 * math.pi / 8
    x = math.cos(angle) * 0.8
    y = math.sin(angle) * 0.8
    
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=0.04,
        location=(x, y, 1.8)
    )
    necklace_gem = bpy.context.active_object
    necklace_gem.name = f"Nuwa_NecklaceGem_{i}"
    necklace_gem.data.materials.append(gold_mat)

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
for i in range(6):  # 增加发簪数量
    angle = i * 2 * math.pi / 6
    x = math.cos(angle) * 0.3
    y = math.sin(angle) * 0.3
    
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.02, 
        depth=1.2, 
        location=(x, y, 3.1)
    )
    hairpin = bpy.context.active_object
    hairpin.name = f"Nuwa_Hairpin_{i}"
    hairpin.rotation_euler = (math.radians(15), 0, angle)
    hairpin.data.materials.append(gold_mat)

print("✅ 创建精致装饰品")

# === 设置专业光照系统 ===
print("💡 设置专业光照系统...")

# 删除默认光源
bpy.ops.object.select_by_type(type='LIGHT')
bpy.ops.object.delete(use_global=False)

# 主光源 - 太阳光
bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
sun = bpy.context.active_object
sun.data.energy = 8.0
sun.rotation_euler = (math.radians(45), math.radians(45), 0)
sun.data.color = (1.0, 0.95, 0.9)

# 补光 - 区域光
bpy.ops.object.light_add(type='AREA', location=(-3, -3, 5))
fill_light = bpy.context.active_object
fill_light.data.energy = 5.0
fill_light.data.size = 5.0
fill_light.data.color = (0.9, 0.95, 1.0)

# 背光 - 点光源
bpy.ops.object.light_add(type='POINT', location=(0, -5, 3))
back_light = bpy.context.active_object
back_light.data.energy = 6.0
back_light.data.color = (1.0, 1.0, 0.9)

# 顶部光 - 区域光
bpy.ops.object.light_add(type='AREA', location=(0, 0, 8))
top_light = bpy.context.active_object
top_light.data.energy = 4.0
top_light.data.size = 6.0
top_light.data.color = (1.0, 1.0, 1.0)

# 侧光 - 区域光
bpy.ops.object.light_add(type='AREA', location=(4, -2, 2))
side_light = bpy.context.active_object
side_light.data.energy = 4.5
side_light.data.size = 4.0
side_light.data.color = (0.95, 0.9, 1.0)

# 底部光 - 点光源（用于填充阴影）
bpy.ops.object.light_add(type='POINT', location=(0, 0, -2))
bottom_light = bpy.context.active_object
bottom_light.data.energy = 3.0
bottom_light.data.color = (0.8, 0.8, 0.9)

print("✅ 设置专业光照系统")

# === 设置专业相机 ===
print("📷 设置专业相机...")

# 删除默认相机
bpy.ops.object.select_by_type(type='CAMERA')
bpy.ops.object.delete(use_global=False)

# 添加新相机
bpy.ops.object.camera_add(location=(6, -6, 5))
camera = bpy.context.active_object
camera.name = "Nuwa_Camera_Advanced"
camera.rotation_euler = (math.radians(50), 0, math.radians(45))
bpy.context.scene.camera = camera

# 设置相机参数
camera.data.lens = 85  # 85mm镜头
camera.data.dof.use_dof = True
camera.data.dof.aperture_fstop = 2.8
camera.data.dof.focus_distance = 8.0

print("✅ 设置专业相机")

# === 设置专业渲染参数 ===
print("🎬 设置专业渲染参数...")

# 设置渲染引擎
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 2048  # 增加采样数
bpy.context.scene.cycles.preview_samples = 512

# 设置渲染分辨率
bpy.context.scene.render.resolution_x = 3840  # 4K分辨率
bpy.context.scene.render.resolution_y = 2160
bpy.context.scene.render.resolution_percentage = 100

# 设置渲染质量
bpy.context.scene.cycles.max_bounces = 16
bpy.context.scene.cycles.diffuse_bounces = 8
bpy.context.scene.cycles.glossy_bounces = 8
bpy.context.scene.cycles.transmission_bounces = 16
bpy.context.scene.cycles.volume_bounces = 8

# 启用降噪
bpy.context.scene.cycles.use_denoising = True
bpy.context.scene.cycles.denoiser = 'OPTIX'

# 文件格式设置
bpy.context.scene.render.image_settings.file_format = 'PNG'
bpy.context.scene.render.image_settings.color_mode = 'RGBA'
bpy.context.scene.render.image_settings.compression = 15

print("✅ 设置专业渲染参数")

# === 设置专业世界背景 ===
print("🌌 设置专业世界背景...")

world = bpy.context.scene.world
if world:
    world.use_nodes = True
    nodes = world.node_tree.nodes
    links = world.node_tree.links
    nodes.clear()
    
    # 创建渐变背景
    gradient = nodes.new(type='ShaderNodeTexGradient')
    gradient.gradient_type = 'RADIAL'
    
    # 颜色映射
    color_ramp = nodes.new(type='ShaderNodeValToRGB')
    color_ramp.color_ramp.elements[0].position = 0.0
    color_ramp.color_ramp.elements[0].color = (0.005, 0.01, 0.02, 1)  # 更深蓝色
    color_ramp.color_ramp.elements[1].position = 1.0
    color_ramp.color_ramp.elements[1].color = (0.03, 0.06, 0.12, 1)  # 浅蓝色
    
    # 噪波纹理用于星空效果
    noise = nodes.new(type='ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = 100.0
    noise.inputs['Detail'].default_value = 15.0
    
    # 混合节点
    mix_rgb = nodes.new(type='ShaderNodeMixRGB')
    mix_rgb.blend_type = 'MULTIPLY'
    mix_rgb.inputs['Fac'].default_value = 0.3
    
    # 背景节点
    background = nodes.new(type='ShaderNodeBackground')
    background.inputs['Strength'].default_value = 0.8
    
    # 世界输出节点
    world_output = nodes.new(type='ShaderNodeOutputWorld')
    
    # 连接节点
    links.new(gradient.outputs['Color'], color_ramp.inputs['Fac'])
    links.new(color_ramp.outputs['Color'], mix_rgb.inputs['Color1'])
    links.new(noise.outputs['Color'], mix_rgb.inputs['Color2'])
    links.new(mix_rgb.outputs['Color'], background.inputs['Color'])
    links.new(background.outputs['Background'], world_output.inputs['Surface'])

print("✅ 设置专业世界背景")

# === 渲染模型 ===
print("🎨 开始渲染超精致女娲模型...")

# 设置输出目录
output_dir = os.path.join(os.path.dirname(__file__), "renders")
os.makedirs(output_dir, exist_ok=True)

# 设置输出文件路径
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
filename = f"nuwa_advanced_{timestamp}.png"
filepath = os.path.join(output_dir, filename)
bpy.context.scene.render.filepath = filepath

# 渲染
print("🔄 正在渲染，请稍候...")
bpy.ops.render.render(write_still=True)

print(f"✅ 渲染完成: {filename}")

# === 选择所有对象 ===
bpy.ops.object.select_all(action='SELECT')

# === 统计信息 ===
total_objects = len(bpy.context.scene.objects)
total_materials = len(bpy.data.materials)

print("\n🎉 超精致女娲3D模型创建并渲染完成！")
print(f"📊 总共创建了 {total_objects} 个对象")
print(f"🎨 总共创建了 {total_materials} 种材质")
print(f"📁 渲染文件保存在: {output_dir}")
print(f"🖼️ 渲染文件: {filename}")
print("\n🐉 超精致女娲模型包含：")
print("   ✨ 高级皮肤材质（带噪波纹理和次表面散射）")
print("   ✨ 高级蛇皮材质（带Voronoi纹理和金属感）")
print("   ✨ 高级头发材质（带噪波纹理）")
print("   ✨ 高级金色材质（带噪波纹理和金属感）")
print("   👤 精致头部（细分曲面3级）")
print("   👗 精致躯干（细分曲面3级）")
print("   💪 精致手臂（上臂、前臂、手部）")
print("   🐍 20段精致蛇身（复杂弯曲路径）")
print("   💇 60根精致头发（随机飘逸效果）")
print("   👁️ 精致面部特征（眼球、眼白、嘴唇）")
print("   💎 精致装饰品（头冠、耳环、项链、手镯、额饰、发簪）")
print("   💡 六光源照明系统（太阳光、区域光、点光源）")
print("   📷 专业相机设置（85mm镜头、景深效果）")
print("   🎬 专业渲染设置（Cycles引擎、2048采样、OptiX降噪）")
print("   🌌 渐变星空背景")
print("\n💡 渲染引擎：Cycles，2048采样，4K分辨率")
print("🎨 材质特性：PBR材质、次表面散射、金属度、粗糙度")
print("✨ 光照特性：多光源、暖冷色调混合、区域光照明")
print("📊 渲染质量：OptiX降噪、超高采样、景深效果")
print("🚀 专为Blender 4.5+优化设计") 