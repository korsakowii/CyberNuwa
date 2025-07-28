import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CyberNuwa Feature Showcase - AI Agent Platform',
  description: 'Explore the complete features of the CyberNuwa AI Agent Platform with bilingual support and modern UI design.',
}

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900 text-white antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
} 