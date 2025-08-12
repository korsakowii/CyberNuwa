'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DebugNavigation() {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const router = useRouter();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    addLog(`页面加载完成，当前路径: ${window.location.pathname}`);
  }, []);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const testNavigation = async (method: string, path: string) => {
    try {
      addLog(`开始测试 ${method} 到 ${path}`);
      
      switch (method) {
        case 'router.push':
          router.push(path);
          addLog(`router.push(${path}) 执行完成`);
          break;
        case 'Link.click':
          addLog(`Link 组件点击 ${path}`);
          break;
        case 'window.location':
          addLog(`准备使用 window.location.href 跳转到 ${path}`);
          window.location.href = path;
          break;
        case 'window.open':
          addLog(`准备使用 window.open 打开 ${path}`);
          window.open(path, '_self');
          break;
      }
    } catch (error) {
      addLog(`错误: ${error}`);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 导航调试页面</h1>
        
        {/* 当前状态 */}
        <div className="bg-zinc-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">当前状态</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-300">当前路径:</p>
              <p className="text-white font-mono">{currentPath}</p>
            </div>
            <div>
              <p className="text-zinc-300">用户代理:</p>
              <p className="text-white text-sm">{navigator.userAgent}</p>
            </div>
          </div>
        </div>

        {/* 测试方法 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 编程式导航 */}
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">编程式导航测试</h2>
            <div className="space-y-3">
              <button
                onClick={() => testNavigation('router.push', '/wishes')}
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                使用 router.push 跳转到愿望池
              </button>
              <button
                onClick={() => testNavigation('router.push', '/agents')}
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                使用 router.push 跳转到智能体
              </button>
              <button
                onClick={() => testNavigation('window.location', '/launch-mission')}
                className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              >
                使用 window.location 跳转到发起任务
              </button>
              <button
                onClick={() => testNavigation('window.open', '/train-agent')}
                className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
              >
                使用 window.open 跳转到训练智能体
              </button>
            </div>
          </div>

          {/* Link组件测试 */}
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Link组件测试</h2>
            <div className="space-y-3">
              <Link 
                href="/wishes" 
                onClick={() => testNavigation('Link.click', '/wishes')}
                className="block w-full bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-center"
              >
                愿望池 (Link组件)
              </Link>
              <Link 
                href="/agents" 
                onClick={() => testNavigation('Link.click', '/agents')}
                className="block w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-center"
              >
                智能体 (Link组件)
              </Link>
              <Link 
                href="/roles" 
                onClick={() => testNavigation('Link.click', '/roles')}
                className="block w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded text-center"
              >
                用户角色 (Link组件)
              </Link>
              <Link 
                href="/narratives" 
                onClick={() => testNavigation('Link.click', '/narratives')}
                className="block w-full bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded text-center"
              >
                元叙事广场 (Link组件)
              </Link>
            </div>
          </div>
        </div>

        {/* 返回主页 */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-block bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-lg"
          >
            ← 返回主页
          </Link>
        </div>

        {/* 日志显示 */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">操作日志</h2>
            <button
              onClick={clearLogs}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              清空日志
            </button>
          </div>
          <div className="bg-zinc-900 p-4 rounded max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-zinc-400">暂无操作记录</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-sm text-zinc-300 mb-1 font-mono">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 环境信息 */}
        <div className="mt-8 p-4 bg-zinc-800/50 border border-zinc-600 rounded-lg">
          <h3 className="text-zinc-300 font-semibold mb-2">环境信息:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-200">NODE_ENV: {process.env.NODE_ENV}</p>
              <p className="text-zinc-200">当前时间: {new Date().toLocaleString()}</p>
              <p className="text-zinc-200">页面标题: {document.title}</p>
            </div>
            <div>
              <p className="text-zinc-200">URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
              <p className="text-zinc-200">协议: {typeof window !== 'undefined' ? window.location.protocol : 'N/A'}</p>
              <p className="text-zinc-200">主机: {typeof window !== 'undefined' ? window.location.host : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
