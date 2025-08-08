#!/usr/bin/env python3
"""
Render Exquisite Nuwa Model
渲染精致女娲3D模型，生成高质量图像
"""

import bpy
import os
import math
from datetime import datetime

def setup_render_settings():
    """设置高质量渲染参数"""
    print("🎬 设置高质量渲染参数...")
    
    # 渲染引擎
    bpy.context.scene.render.engine = 'CYCLES'
    
    # 采样设置
    bpy.context.scene.cycles.samples = 1024
    bpy.context.scene.cycles.preview_samples = 256
    
    # 分辨率设置
    bpy.context.scene.render.resolution_x = 2560
    bpy.context.scene.render.resolution_y = 1440
    bpy.context.scene.render.resolution_percentage = 100
    
    # 质量设置
    bpy.context.scene.cycles.max_bounces = 12
    bpy.context.scene.cycles.diffuse_bounces = 6
    bpy.context.scene.cycles.glossy_bounces = 6
    bpy.context.scene.cycles.transmission_bounces = 12
    bpy.context.scene.cycles.volume_bounces = 4
    
    # 降噪设置
    bpy.context.scene.cycles.use_denoising = True
    bpy.context.scene.cycles.denoiser = 'OPTIX'
    
    # 文件格式设置
    bpy.context.scene.render.image_settings.file_format = 'PNG'
    bpy.context.scene.render.image_settings.color_mode = 'RGBA'
    bpy.context.scene.render.image_settings.compression = 15
    
    print("✅ 渲染参数设置完成")

def setup_camera_angles():
    """设置多个相机角度"""
    print("📷 设置多个相机角度...")
    
    # 删除现有相机
    bpy.ops.object.select_by_type(type='CAMERA')
    bpy.ops.object.delete(use_global=False)
    
    cameras = []
    
    # 正面视角
    bpy.ops.object.camera_add(location=(6, -6, 5))
    camera_front = bpy.context.active_object
    camera_front.name = "Camera_Front"
    camera_front.rotation_euler = (math.radians(50), 0, math.radians(45))
    camera_front.data.lens = 85
    camera_front.data.dof.use_dof = True
    camera_front.data.dof.aperture_fstop = 2.8
    camera_front.data.dof.focus_distance = 8.0
    cameras.append(("front", camera_front))
    
    # 侧面视角
    bpy.ops.object.camera_add(location=(8, 0, 4))
    camera_side = bpy.context.active_object
    camera_side.name = "Camera_Side"
    camera_side.rotation_euler = (math.radians(60), 0, math.radians(90))
    camera_side.data.lens = 85
    camera_side.data.dof.use_dof = True
    camera_side.data.dof.aperture_fstop = 2.8
    camera_side.data.dof.focus_distance = 8.0
    cameras.append(("side", camera_side))
    
    # 背面视角
    bpy.ops.object.camera_add(location=(-6, 6, 5))
    camera_back = bpy.context.active_object
    camera_back.name = "Camera_Back"
    camera_back.rotation_euler = (math.radians(50), 0, math.radians(225))
    camera_back.data.lens = 85
    camera_back.data.dof.use_dof = True
    camera_back.data.dof.aperture_fstop = 2.8
    camera_back.data.dof.focus_distance = 8.0
    cameras.append(("back", camera_back))
    
    # 俯视角度
    bpy.ops.object.camera_add(location=(0, 0, 10))
    camera_top = bpy.context.active_object
    camera_top.name = "Camera_Top"
    camera_top.rotation_euler = (0, 0, 0)
    camera_top.data.lens = 50
    camera_top.data.dof.use_dof = True
    camera_top.data.dof.aperture_fstop = 4.0
    camera_top.data.dof.focus_distance = 10.0
    cameras.append(("top", camera_top))
    
    # 特写角度
    bpy.ops.object.camera_add(location=(3, -3, 3))
    camera_close = bpy.context.active_object
    camera_close.name = "Camera_Close"
    camera_close.rotation_euler = (math.radians(30), 0, math.radians(45))
    camera_close.data.lens = 135
    camera_close.data.dof.use_dof = True
    camera_close.data.dof.aperture_fstop = 1.8
    camera_close.data.dof.focus_distance = 4.0
    cameras.append(("close", camera_close))
    
    print(f"✅ 创建了 {len(cameras)} 个相机角度")
    return cameras

def setup_enhanced_lighting():
    """设置增强光照系统"""
    print("💡 设置增强光照系统...")
    
    # 删除现有光源
    bpy.ops.object.select_by_type(type='LIGHT')
    bpy.ops.object.delete(use_global=False)
    
    # 主光源 - 太阳光
    bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
    sun = bpy.context.active_object
    sun.data.energy = 6.0
    sun.rotation_euler = (math.radians(45), math.radians(45), 0)
    sun.data.color = (1.0, 0.95, 0.9)
    
    # 补光 - 区域光
    bpy.ops.object.light_add(type='AREA', location=(-3, -3, 5))
    fill_light = bpy.context.active_object
    fill_light.data.energy = 4.0
    fill_light.data.size = 4.0
    fill_light.data.color = (0.9, 0.95, 1.0)
    
    # 背光 - 点光源
    bpy.ops.object.light_add(type='POINT', location=(0, -5, 3))
    back_light = bpy.context.active_object
    back_light.data.energy = 5.0
    back_light.data.color = (1.0, 1.0, 0.9)
    
    # 顶部光 - 区域光
    bpy.ops.object.light_add(type='AREA', location=(0, 0, 8))
    top_light = bpy.context.active_object
    top_light.data.energy = 3.0
    top_light.data.size = 5.0
    top_light.data.color = (1.0, 1.0, 1.0)
    
    # 侧光 - 区域光
    bpy.ops.object.light_add(type='AREA', location=(4, -2, 2))
    side_light = bpy.context.active_object
    side_light.data.energy = 3.5
    side_light.data.size = 3.0
    side_light.data.color = (0.95, 0.9, 1.0)
    
    # 底部光 - 点光源（用于填充阴影）
    bpy.ops.object.light_add(type='POINT', location=(0, 0, -2))
    bottom_light = bpy.context.active_object
    bottom_light.data.energy = 2.0
    bottom_light.data.color = (0.8, 0.8, 0.9)
    
    print("✅ 增强光照系统设置完成")

def setup_enhanced_world():
    """设置增强世界背景"""
    print("🌌 设置增强世界背景...")
    
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
    
    print("✅ 增强世界背景设置完成")

def render_multiple_angles(cameras, output_dir):
    """渲染多个角度"""
    print(f"🎨 开始渲染多个角度到: {output_dir}")
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 获取当前时间戳
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    for angle_name, camera in cameras:
        print(f"📷 渲染 {angle_name} 角度...")
        
        # 设置当前相机
        bpy.context.scene.camera = camera
        
        # 设置输出文件路径
        filename = f"nuwa_exquisite_{angle_name}_{timestamp}.png"
        filepath = os.path.join(output_dir, filename)
        bpy.context.scene.render.filepath = filepath
        
        # 渲染
        bpy.ops.render.render(write_still=True)
        
        print(f"✅ {angle_name} 角度渲染完成: {filename}")
    
    print(f"🎉 所有角度渲染完成！文件保存在: {output_dir}")

def main():
    print("🎨 开始渲染精致女娲3D模型...")
    print("✨ 生成高质量渲染图像...")
    
    # 检查是否有女娲模型
    if not bpy.context.scene.objects:
        print("❌ 场景中没有对象，请先创建女娲模型")
        return
    
    # 设置渲染参数
    setup_render_settings()
    
    # 设置相机角度
    cameras = setup_camera_angles()
    
    # 设置增强光照
    setup_enhanced_lighting()
    
    # 设置增强世界背景
    setup_enhanced_world()
    
    # 设置输出目录
    output_dir = os.path.join(os.path.dirname(__file__), "renders")
    
    # 渲染多个角度
    render_multiple_angles(cameras, output_dir)
    
    print("\n🎉 精致女娲模型渲染完成！")
    print("📊 渲染信息:")
    print(f"   📁 输出目录: {output_dir}")
    print(f"   📷 相机角度: {len(cameras)} 个")
    print("   🎬 渲染引擎: Cycles")
    print("   📊 分辨率: 2560x1440")
    print("   🎯 采样数: 1024")
    print("   ✨ 降噪: OptiX")
    print("   💎 文件格式: PNG (RGBA)")

if __name__ == "__main__":
    main() 