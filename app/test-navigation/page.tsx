'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TestNavigation() {
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testDirectNavigation = (path: string) => {
    addLog(`直接导航到: ${path}`);
    router.push(path);
  };

  const testLinkClick = (path: string) => {
    addLog(`Link点击: ${path}`);
  };

  const testWindowLocation = (path: string) => {
    addLog(`使用window.location跳转到: ${path}`);
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 导航测试页面</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 测试页面 */}
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">测试页面跳转</h2>
            <div className="space-y-3">
              <button
                onClick={() => testDirectNavigation('/wishes')}
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                跳转到愿望池 (router.push)
              </button>
              <button
                onClick={() => testDirectNavigation('/agents')}
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                跳转到智能体 (router.push)
              </button>
              <button
                onClick={() => testWindowLocation('/launch-mission')}
                className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              >
                跳转到发起任务 (window.location)
              </button>
            </div>
          </div>

          {/* Link组件测试 */}
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Link组件测试</h2>
            <div className="space-y-3">
              <Link 
                href="/wishes" 
                onClick={() => testLinkClick('/wishes')}
                className="block w-full bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-center"
              >
                愿望池 (Link组件)
              </Link>
              <Link 
                href="/agents" 
                onClick={() => testLinkClick('/agents')}
                className="block w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-center"
              >
                智能体 (Link组件)
              </Link>
              <Link 
                href="/train-agent" 
                onClick={() => testLinkClick('/train-agent')}
                className="block w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-center"
              >
                训练智能体 (Link组件)
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
          <h2 className="text-xl font-semibold mb-4">操作日志</h2>
          <div className="bg-zinc-900 p-4 rounded max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-zinc-400">暂无操作记录</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-sm text-zinc-300 mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setLogs([])}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            清空日志
          </button>
        </div>

        {/* 环境信息 */}
        <div className="mt-8 p-4 bg-zinc-800/50 border border-zinc-600 rounded-lg">
          <h3 className="text-zinc-300 font-semibold mb-2">环境信息:</h3>
          <p className="text-zinc-200">NODE_ENV: {process.env.NODE_ENV}</p>
          <p className="text-zinc-200">当前时间: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
