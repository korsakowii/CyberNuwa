'use client';

import Link from 'next/link';

export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 简单测试页面</h1>
        
        <div className="space-y-4 mb-8">
          <Link 
            href="/wishes" 
            className="block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-center"
          >
            跳转到愿望池
          </Link>
          
          <Link 
            href="/agents" 
            className="block bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-center"
          >
            跳转到智能体
          </Link>
          
          <Link 
            href="/" 
            className="block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-center"
          >
            返回主页
          </Link>
        </div>
        
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">测试说明</h2>
          <p className="text-zinc-300">
            这是一个简单的测试页面，用于验证 Next.js 的路由功能是否正常工作。
            点击上面的按钮应该能够正常跳转到对应的页面。
          </p>
        </div>
      </div>
    </div>
  );
}
