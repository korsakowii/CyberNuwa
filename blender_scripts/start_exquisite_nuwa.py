#!/usr/bin/env python3
"""
Start Blender and create Exquisite Nuwa model
启动Blender并创建精致的女娲3D模型
"""

import subprocess
import os
import tempfile
import sys

def create_exquisite_nuwa_script():
    """创建精致女娲模型脚本"""
    
    # 读取精致女娲模型脚本
    script_path = os.path.join(os.path.dirname(__file__), 'exquisite_nuwa_model.py')
    
    if os.path.exists(script_path):
        with open(script_path, 'r', encoding='utf-8') as f:
            script_content = f.read()
    else:
        print("❌ 找不到 exquisite_nuwa_model.py 文件")
        return None
    
    # 创建临时脚本文件
    script_file = tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8')
    script_file.write(script_content)
    script_file.close()
    
    return script_file.name

def find_blender_path():
    """查找Blender安装路径"""
    possible_paths = [
        "/Applications/Blender.app/Contents/MacOS/Blender",  # macOS
        "C:\\Program Files\\Blender Foundation\\Blender\\blender.exe",  # Windows
        "/usr/bin/blender",  # Linux
        "/usr/local/bin/blender",  # Linux alternative
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            return path
    
    # 尝试从PATH中查找
    try:
        result = subprocess.run(['which', 'blender'], capture_output=True, text=True)
        if result.returncode == 0:
            return result.stdout.strip()
    except:
        pass
    
    return None

def main():
    print("🎨 启动Blender并创建精致女娲3D模型...")
    print("✨ 使用高级材质和精细细节...")
    
    # 查找Blender路径
    blender_path = find_blender_path()
    
    if not blender_path:
        print("❌ 找不到Blender安装路径")
        print("请确保Blender已正确安装，或手动指定Blender路径")
        return
    
    print(f"📁 找到Blender: {blender_path}")
    
    # 创建精致女娲模型脚本
    script_file = create_exquisite_nuwa_script()
    
    if not script_file:
        return
    
    print("📁 脚本文件:", script_file)
    print("🚀 启动Blender...")
    
    try:
        # 启动Blender并执行脚本
        cmd = [blender_path, "--python", script_file, "--background"]
        print("🔄 正在创建精致女娲模型，请稍候...")
        
        result = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
        
        if result.returncode == 0:
            print("✅ 精致女娲模型创建成功！")
            print("📊 模型统计信息:")
            
            # 解析输出中的统计信息
            output_lines = result.stdout.split('\n')
            for line in output_lines:
                if any(keyword in line for keyword in ['总共创建了', '种材质', '精致女娲模型包含']):
                    print(f"   {line}")
        else:
            print("❌ 创建模型时出现错误")
            print("错误输出:", result.stderr)
            
    except KeyboardInterrupt:
        print("\n⏹️ 用户中断")
    except Exception as e:
        print(f"❌ 运行错误: {e}")
    finally:
        # 清理临时文件
        try:
            os.unlink(script_file)
        except:
            pass

if __name__ == "__main__":
    main() 