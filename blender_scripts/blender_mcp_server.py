#!/usr/bin/env python3
"""
Blender MCP Server
A simple MCP server for controlling Blender
"""

import json
import subprocess
import sys
import os
from typing import Dict, Any, List

class BlenderMCPServer:
    def __init__(self):
        self.blender_path = "/Applications/Blender.app/Contents/MacOS/Blender"
        self.running = False
        
    def start_blender(self) -> Dict[str, Any]:
        """Start Blender application"""
        try:
            if not os.path.exists(self.blender_path):
                return {
                    "success": False,
                    "error": f"Blender not found at {self.blender_path}"
                }
            
            subprocess.Popen([self.blender_path], 
                           stdout=subprocess.DEVNULL, 
                           stderr=subprocess.DEVNULL)
            self.running = True
            
            return {
                "success": True,
                "message": "Blender started successfully"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def stop_blender(self) -> Dict[str, Any]:
        """Stop Blender application"""
        try:
            subprocess.run(["pkill", "-f", "Blender"], 
                         capture_output=True)
            self.running = False
            
            return {
                "success": True,
                "message": "Blender stopped successfully"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_status(self) -> Dict[str, Any]:
        """Get Blender status"""
        try:
            result = subprocess.run(["pgrep", "-f", "Blender"], 
                                  capture_output=True, text=True)
            is_running = result.returncode == 0
            
            return {
                "success": True,
                "running": is_running,
                "message": "Blender is running" if is_running else "Blender is not running"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def execute_python_script(self, script: str) -> Dict[str, Any]:
        """Execute Python script in Blender"""
        try:
            # Create a temporary script file
            script_file = "/tmp/blender_script.py"
            with open(script_file, "w") as f:
                f.write(script)
            
            # Execute the script in Blender
            cmd = [self.blender_path, "--background", "--python", script_file]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            return {
                "success": result.returncode == 0,
                "output": result.stdout,
                "error": result.stderr if result.returncode != 0 else None
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

def main():
    server = BlenderMCPServer()
    
    # Simple command-line interface
    if len(sys.argv) < 2:
        print("Usage: python blender_mcp_server.py <command> [args...]")
        print("Commands:")
        print("  start     - Start Blender")
        print("  stop      - Stop Blender")
        print("  status    - Check Blender status")
        print("  script    - Execute Python script in Blender")
        return
    
    command = sys.argv[1]
    
    if command == "start":
        result = server.start_blender()
    elif command == "stop":
        result = server.stop_blender()
    elif command == "status":
        result = server.get_status()
    elif command == "script":
        if len(sys.argv) < 3:
            print("Error: Please provide a Python script file")
            return
        with open(sys.argv[2], "r") as f:
            script = f.read()
        result = server.execute_python_script(script)
    else:
        print(f"Unknown command: {command}")
        return
    
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main() 