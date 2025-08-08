'use client'

import { useState, useEffect } from 'react'
import { fetchWishes } from '../../lib/api'

export default function TestAPI() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true)
        const response = await fetchWishes()
        setData(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testAPI()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🧪 API Test Page</h1>
        
        {loading && (
          <div className="bg-zinc-800 p-6 rounded-lg mb-6">
            <p className="text-zinc-300">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-red-400">Error</h2>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {data && (
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">API Response</h2>
            <pre className="text-sm text-zinc-300 overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
} 