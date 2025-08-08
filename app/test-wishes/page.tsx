'use client'

import { useState } from 'react'

export default function TestWishes() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Hello from dynamic page!')

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🧪 Test Wishes Page</h1>
        
        <div className="bg-zinc-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Dynamic Content Test</h2>
          <p className="text-zinc-300 mb-4">{message}</p>
          <p className="text-zinc-300 mb-4">Counter: {count}</p>
          
          <div className="space-x-4">
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Increment Counter
            </button>
            
            <button 
              onClick={() => setMessage('Message changed at ' + new Date().toLocaleTimeString())}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              Change Message
            </button>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Wishes Page Should Work Like This</h2>
          <p className="text-zinc-300">
            If you can see this page and the buttons work, then your dynamic pages should work too.
            The issue might be with browser caching or the specific wishes page implementation.
          </p>
        </div>
      </div>
    </div>
  )
} 