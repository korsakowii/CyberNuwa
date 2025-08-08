#!/usr/bin/env python3
"""
Advanced Blender MCP Server
A full MCP server implementation for controlling Blender
"""

import json
import subprocess
import sys
import os
import asyncio
from typing import Dict, Any, List, Optional

class AdvancedBlenderMCPServer:
    def __init__(self):
        self.blender_path = "/Applications/Blender.app/Contents/MacOS/Blender"
        self.running = False
        self.server_info = {
            "name": "blender-mcp-server",
            "version": "1.0.0"
        }
        
    async def initialize(self, client_id: str, client_name: str, client_version: str) -> Dict[str, Any]:
        """Initialize the MCP server"""
        return {
            "protocolVersion": "2024-11-05",
            "capabilities": {
                "tools": {},
                "resources": {}
            },
            "serverInfo": self.server_info
        }
    
    async def list_tools(self) -> Dict[str, Any]:
        """List available tools"""
        return {
            "tools": [
                {
                    "name": "start_blender",
                    "description": "Start Blender application",
                    "inputSchema": {
                        "type": "object",
                        "properties": {},
                        "required": []
                    }
                },
                {
                    "name": "stop_blender", 
                    "description": "Stop Blender application",
                    "inputSchema": {
                        "type": "object",
                        "properties": {},
                        "required": []
                    }
                },
                {
                    "name": "get_status",
                    "description": "Get Blender status",
                    "inputSchema": {
                        "type": "object",
                        "properties": {},
                        "required": []
                    }
                },
                {
                    "name": "execute_script",
                    "description": "Execute Python script in Blender",
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "script": {
                                "type": "string",
                                "description": "Python script to execute"
                            }
                        },
                        "required": ["script"]
                    }
                },
                {
                    "name": "create_cube",
                    "description": "Create a cube in Blender",
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "location": {
                                "type": "array",
                                "items": {"type": "number"},
                                "description": "Location [x, y, z]"
                            },
                            "size": {
                                "type": "number",
                                "description": "Cube size"
                            }
                        },
                        "required": []
                    }
                },
                {
                    "name": "create_sphere",
                    "description": "Create a sphere in Blender",
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "location": {
                                "type": "array",
                                "items": {"type": "number"},
                                "description": "Location [x, y, z]"
                            },
                            "radius": {
                                "type": "number",
                                "description": "Sphere radius"
                            }
                        },
                        "required": []
                    }
                },
                {
                    "name": "render_scene",
                    "description": "Render the current scene",
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "output_path": {
                                "type": "string",
                                "description": "Output file path"
                            },
                            "resolution": {
                                "type": "array",
                                "items": {"type": "number"},
                                "description": "Resolution [width, height]"
                            }
                        },
                        "required": []
                    }
                }
            ]
        }
    
    async def call_tool(self, name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        """Call a specific tool"""
        if name == "start_blender":
            return await self.start_blender()
        elif name == "stop_blender":
            return await self.stop_blender()
        elif name == "get_status":
            return await self.get_status()
        elif name == "execute_script":
            return await self.execute_script(arguments.get("script", ""))
        elif name == "create_cube":
            return await self.create_cube(arguments.get("location", [0, 0, 0]), arguments.get("size", 2))
        elif name == "create_sphere":
            return await self.create_sphere(arguments.get("location", [0, 0, 0]), arguments.get("radius", 1))
        elif name == "render_scene":
            return await self.render_scene(arguments.get("output_path", "/tmp/blender_render.png"), arguments.get("resolution", [1280, 720]))
        else:
            return {"error": f"Unknown tool: {name}"}
    
    async def start_blender(self) -> Dict[str, Any]:
        """Start Blender application"""
        try:
            if not os.path.exists(self.blender_path):
                return {
                    "error": f"Blender not found at {self.blender_path}"
                }
            
            subprocess.Popen([self.blender_path], 
                           stdout=subprocess.DEVNULL, 
                           stderr=subprocess.DEVNULL)
            self.running = True
            
            return {
                "content": [{"type": "text", "text": "Blender started successfully"}]
            }
        except Exception as e:
            return {"error": str(e)}
    
    async def stop_blender(self) -> Dict[str, Any]:
        """Stop Blender application"""
        try:
            subprocess.run(["pkill", "-f", "Blender"], 
                         capture_output=True)
            self.running = False
            
            return {
                "content": [{"type": "text", "text": "Blender stopped successfully"}]
            }
        except Exception as e:
            return {"error": str(e)}
    
    async def get_status(self) -> Dict[str, Any]:
        """Get Blender status"""
        try:
            result = subprocess.run(["pgrep", "-f", "Blender"], 
                                  capture_output=True, text=True)
            is_running = result.returncode == 0
            
            status = "running" if is_running else "stopped"
            return {
                "content": [{"type": "text", "text": f"Blender is {status}"}]
            }
        except Exception as e:
            return {"error": str(e)}
    
    async def execute_script(self, script: str) -> Dict[str, Any]:
        """Execute Python script in Blender"""
        try:
            # Create a temporary script file
            script_file = "/tmp/blender_script.py"
            with open(script_file, "w") as f:
                f.write(script)
            
            # Execute the script in Blender
            cmd = [self.blender_path, "--background", "--python", script_file]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                return {
                    "content": [{"type": "text", "text": f"Script executed successfully:\n{result.stdout}"}]
                }
            else:
                return {
                    "error": f"Script execution failed:\n{result.stderr}"
                }
        except Exception as e:
            return {"error": str(e)}
    
    async def create_cube(self, location: List[float], size: float) -> Dict[str, Any]:
        """Create a cube in Blender"""
        script = f"""
import bpy
bpy.ops.mesh.primitive_cube_add(size={size}, location=({location[0]}, {location[1]}, {location[2]}))
cube = bpy.context.active_object
cube.name = "MCP_Cube"
print(f"Created cube at {location} with size {size}")
"""
        return await self.execute_script(script)
    
    async def create_sphere(self, location: List[float], radius: float) -> Dict[str, Any]:
        """Create a sphere in Blender"""
        script = f"""
import bpy
bpy.ops.mesh.primitive_uv_sphere_add(radius={radius}, location=({location[0]}, {location[1]}, {location[2]}))
sphere = bpy.context.active_object
sphere.name = "MCP_Sphere"
print(f"Created sphere at {location} with radius {radius}")
"""
        return await self.execute_script(script)
    
    async def render_scene(self, output_path: str, resolution: List[int]) -> Dict[str, Any]:
        """Render the current scene"""
        script = f"""
import bpy
bpy.context.scene.render.filepath = "{output_path}"
bpy.context.scene.render.resolution_x = {resolution[0]}
bpy.context.scene.render.resolution_y = {resolution[1]}
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 128
bpy.ops.render.render(write_still=True)
print(f"Rendered scene to {output_path}")
"""
        return await self.execute_script(script)

async def main():
    """Main function for testing"""
    server = AdvancedBlenderMCPServer()
    
    # Test the server
    print("Testing Blender MCP Server...")
    
    # Get status
    result = await server.get_status()
    print(f"Status: {result}")
    
    # List tools
    tools = await server.list_tools()
    print(f"Available tools: {len(tools['tools'])}")
    
    # Create a cube
    result = await server.create_cube([0, 0, 0], 2)
    print(f"Create cube: {result}")

if __name__ == "__main__":
    asyncio.run(main()) 