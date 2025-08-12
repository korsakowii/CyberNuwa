'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../utils/smartApiClient';

export default function TestApi() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing API call...');
      const response = await api.get('/api/wishes/list_wishes');
      console.log('API Response:', response);
      setResult(response);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API 测试页面</h1>
        
        <button
          onClick={testApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? '测试中...' : '测试 API 调用'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-800/50 border border-red-600 rounded-lg">
            <h3 className="text-red-300 font-semibold">错误:</h3>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-800/50 border border-green-600 rounded-lg">
            <h3 className="text-green-300 font-semibold">成功:</h3>
            <pre className="text-green-200 text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-zinc-800/50 border border-zinc-600 rounded-lg">
          <h3 className="text-zinc-300 font-semibold mb-2">环境信息:</h3>
          <p className="text-zinc-200">NODE_ENV: {process.env.NODE_ENV}</p>
          <p className="text-zinc-200">API Base URL: {process.env.NODE_ENV === 'production' ? 'https://api.cybernuwa.com' : 'http://localhost:8002'}</p>
        </div>
      </div>
    </div>
  );
}
