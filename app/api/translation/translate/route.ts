import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, target_lang, source_lang = 'auto' } = body

    if (!text || !target_lang) {
      return NextResponse.json(
        { error: 'Missing required fields: text and target_lang' },
        { status: 400 }
      )
    }

    // 调用后端翻译API
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8003'
    const response = await fetch(`${backendUrl}/api/translation/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        target_lang,
        source_lang,
      }),
    })

    if (!response.ok) {
      throw new Error(`Backend translation failed: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { error: 'Translation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
