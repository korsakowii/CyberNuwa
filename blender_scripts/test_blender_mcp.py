#!/usr/bin/env python3
"""
Test Blender MCP Server
Demonstrates various Blender MCP functionality
"""

import asyncio
from advanced_blender_mcp_server import AdvancedBlenderMCPServer

async def test_blender_mcp():
    """Test Blender MCP server functionality"""
    server = AdvancedBlenderMCPServer()
    
    print("🎨 Blender MCP Server Test")
    print("=" * 50)
    
    # Test 1: Get status
    print("\n1. Checking Blender status...")
    result = await server.get_status()
    print(f"   Result: {result}")
    
    # Test 2: List tools
    print("\n2. Listing available tools...")
    tools = await server.list_tools()
    print(f"   Available tools: {len(tools['tools'])}")
    for tool in tools['tools']:
        print(f"   - {tool['name']}: {tool['description']}")
    
    # Test 3: Create a cube
    print("\n3. Creating a cube...")
    result = await server.create_cube([2, 0, 0], 1.5)
    print(f"   Result: {result}")
    
    # Test 4: Create a sphere
    print("\n4. Creating a sphere...")
    result = await server.create_sphere([-2, 0, 0], 1.0)
    print(f"   Result: {result}")
    
    # Test 5: Create a custom scene
    print("\n5. Creating a custom scene...")
    custom_script = """
import bpy
import math

# Clear existing objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Create a ground plane
bpy.ops.mesh.primitive_plane_add(size=10, location=(0, 0, 0))
ground = bpy.context.active_object
ground.name = "Ground"

# Create multiple cubes in a circle
for i in range(8):
    angle = i * (2 * math.pi / 8)
    x = math.cos(angle) * 3
    y = math.sin(angle) * 3
    z = 1
    
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    cube = bpy.context.active_object
    cube.name = f"Cube_{i}"
    
    # Add some rotation
    cube.rotation_euler = (i * 0.5, i * 0.3, i * 0.2)

# Create a central sphere
bpy.ops.mesh.primitive_uv_sphere_add(radius=1.5, location=(0, 0, 2))
sphere = bpy.context.active_object
sphere.name = "Central_Sphere"

# Add a light
bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
light = bpy.context.active_object
light.data.energy = 5.0

# Add a camera
bpy.ops.object.camera_add(location=(8, -8, 6))
camera = bpy.context.active_object
camera.rotation_euler = (math.radians(60), 0, math.radians(45))
bpy.context.scene.camera = camera

print("Custom scene created successfully!")
print(f"Created {len(bpy.context.scene.objects)} objects")
"""
    
    result = await server.execute_script(custom_script)
    print(f"   Result: {result}")
    
    # Test 6: Render the scene
    print("\n6. Rendering the scene...")
    result = await server.render_scene("/tmp/blender_mcp_test_render.png", [1280, 720])
    print(f"   Result: {result}")
    
    print("\n✅ Blender MCP Server test completed!")

if __name__ == "__main__":
    asyncio.run(test_blender_mcp()) 