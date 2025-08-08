import bpy
import math

# Clear existing objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Create a cube
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 0))
cube = bpy.context.active_object
cube.name = "Example_Cube"

# Add a material
material = bpy.data.materials.new(name="Example_Material")
material.use_nodes = True
nodes = material.node_tree.nodes

# Clear default nodes
nodes.clear()

# Create emission shader
emission = nodes.new(type='ShaderNodeEmission')
emission.inputs[0].default_value = (1, 0.5, 0, 1)  # Orange color
emission.inputs[1].default_value = 5.0  # Strength

# Create material output
material_output = nodes.new(type='ShaderNodeOutputMaterial')

# Link nodes
material.node_tree.links.new(emission.outputs[0], material_output.inputs[0])

# Assign material to cube
if cube.data.materials:
    cube.data.materials[0] = material
else:
    cube.data.materials.append(material)

# Add a light
bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
light = bpy.context.active_object
light.data.energy = 5.0

# Add a camera
bpy.ops.object.camera_add(location=(7, -7, 5))
camera = bpy.context.active_object
camera.rotation_euler = (math.radians(60), 0, math.radians(45))

# Set camera as active
bpy.context.scene.camera = camera

# Set render settings
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 128

print("Blender scene created successfully!")
print(f"Created objects: {[obj.name for obj in bpy.context.scene.objects]}") 