import bpy
import os

# Set render settings
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 128  # Lower samples for faster render
bpy.context.scene.render.resolution_x = 1280
bpy.context.scene.render.resolution_y = 720
bpy.context.scene.render.filepath = "/tmp/blender_demo_render.png"
bpy.context.scene.render.image_settings.file_format = 'PNG'

# Enable denoising for better quality
bpy.context.scene.cycles.use_denoising = True

# Render the scene
print("🎨 Starting render...")
bpy.ops.render.render(write_still=True)

print(f"✅ Render completed!")
print(f"📁 Output: {bpy.context.scene.render.filepath}")
print(f"📐 Resolution: {bpy.context.scene.render.resolution_x}x{bpy.context.scene.render.resolution_y}")
print(f"🎯 Samples: {bpy.context.scene.cycles.samples}")

# Check if file was created
if os.path.exists(bpy.context.scene.render.filepath):
    file_size = os.path.getsize(bpy.context.scene.render.filepath)
    print(f"📊 File size: {file_size / 1024:.1f} KB")
else:
    print("❌ Render file not found") 