import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cyber Nüwa Feature Showcase - AI Agent Platform',
  description:
    'Explore the complete features of the Cyber Nüwa AI Agent Platform with bilingual support and modern UI design.',
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-zinc-900 text-white antialiased`}>
        {/* 静态页面有自己的Footer，不需要全局Footer */}
        {children}
      </body>
    </html>
  );
}
