import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '🌌 Cyber Nüwa - 智能体共创平台',
  description: '面向创意共创与智能体养成的开放式平台，融合任务机制、协作空间与模型文化',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-zinc-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
