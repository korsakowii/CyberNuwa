import bpy
import math

# Clear existing objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Create a ground plane
bpy.ops.mesh.primitive_plane_add(size=10, location=(0, 0, -1))
ground = bpy.context.active_object
ground.name = "Ground"

# Create ground material
ground_mat = bpy.data.materials.new(name="Ground_Material")
ground_mat.use_nodes = True
nodes = ground_mat.node_tree.nodes
nodes.clear()

# Create checker texture
checker = nodes.new(type='ShaderNodeTexChecker')
checker.inputs[1].default_value = (0.2, 0.2, 0.2, 1)  # Dark color
checker.inputs[2].default_value = (0.8, 0.8, 0.8, 1)  # Light color
checker.inputs[3].default_value = 20  # Scale

# Create principled BSDF
principled = nodes.new(type='ShaderNodeBsdfPrincipled')

# Create material output
material_output = nodes.new(type='ShaderNodeOutputMaterial')

# Link nodes
ground_mat.node_tree.links.new(checker.outputs[0], principled.inputs[0])
ground_mat.node_tree.links.new(principled.outputs[0], material_output.inputs[0])

# Assign material to ground
ground.data.materials.append(ground_mat)

# Create multiple cubes in a circle
num_cubes = 8
radius = 3
for i in range(num_cubes):
    angle = (2 * math.pi * i) / num_cubes
    x = radius * math.cos(angle)
    y = radius * math.sin(angle)
    z = 0.5
    
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    cube = bpy.context.active_object
    cube.name = f"Cube_{i+1}"
    
    # Create material for each cube
    cube_mat = bpy.data.materials.new(name=f"Cube_Material_{i+1}")
    cube_mat.use_nodes = True
    nodes = cube_mat.node_tree.nodes
    nodes.clear()
    
    # Create emission shader with different colors
    emission = nodes.new(type='ShaderNodeEmission')
    hue = i / num_cubes
    emission.inputs[0].default_value = (hue, 0.8, 0.8, 1)  # HSV color
    emission.inputs[1].default_value = 2.0  # Strength
    
    # Create material output
    material_output = nodes.new(type='ShaderNodeOutputMaterial')
    
    # Link nodes
    cube_mat.node_tree.links.new(emission.outputs[0], material_output.inputs[0])
    
    # Assign material to cube
    cube.data.materials.append(cube_mat)
    
    # Add rotation animation
    cube.rotation_euler = (0, 0, angle)
    cube.keyframe_insert(data_path="rotation_euler", frame=1)
    cube.rotation_euler = (0, 0, angle + 2*math.pi)
    cube.keyframe_insert(data_path="rotation_euler", frame=120)

# Create a central sphere
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.5, location=(0, 0, 2))
sphere = bpy.context.active_object
sphere.name = "Central_Sphere"

# Create sphere material
sphere_mat = bpy.data.materials.new(name="Sphere_Material")
sphere_mat.use_nodes = True
nodes = sphere_mat.node_tree.nodes
nodes.clear()

# Create glass shader
glass = nodes.new(type='ShaderNodeBsdfGlass')
glass.inputs[0].default_value = (0.8, 0.9, 1.0, 1)  # Light blue
glass.inputs[1].default_value = 1.45  # IOR

# Create material output
material_output = nodes.new(type='ShaderNodeOutputMaterial')

# Link nodes
sphere_mat.node_tree.links.new(glass.outputs[0], material_output.inputs[0])

# Assign material to sphere
sphere.data.materials.append(sphere_mat)

# Add camera
bpy.ops.object.camera_add(location=(8, -8, 6))
camera = bpy.context.active_object
camera.rotation_euler = (math.radians(60), 0, math.radians(45))
bpy.context.scene.camera = camera

# Add lighting
bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
sun = bpy.context.active_object
sun.data.energy = 3.0

# Add point lights around the scene
for i in range(4):
    angle = (2 * math.pi * i) / 4
    x = 6 * math.cos(angle)
    y = 6 * math.sin(angle)
    z = 4
    
    bpy.ops.object.light_add(type='POINT', location=(x, y, z))
    light = bpy.context.active_object
    light.name = f"Point_Light_{i+1}"
    light.data.energy = 100.0
    light.data.color = (1, 0.5 + 0.5*i/4, 0.5, 1)  # Varying colors

# Set render settings
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 256
bpy.context.scene.render.resolution_x = 1920
bpy.context.scene.render.resolution_y = 1080

# Set animation settings
bpy.context.scene.frame_start = 1
bpy.context.scene.frame_end = 120

print("🎬 Demo scene created successfully!")
print(f"📦 Created objects: {[obj.name for obj in bpy.context.scene.objects]}")
print(f"🎨 Materials: {[mat.name for mat in bpy.data.materials]}")
print(f"💡 Lights: {[obj.name for obj in bpy.context.scene.objects if obj.type == 'LIGHT']}")
print(f"🎥 Camera: {bpy.context.scene.camera.name}")
print(f"🎞️ Animation frames: {bpy.context.scene.frame_start} - {bpy.context.scene.frame_end}") 