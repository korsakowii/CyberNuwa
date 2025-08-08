/** @type {import('next').NextConfig} */
const nextConfig = {
  // 生产环境优化
  productionBrowserSourceMaps: false, // 生产环境不生成source maps
  
  // 图片优化
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 实验性功能
  experimental: {
    optimizeCss: true, // 优化CSS
    optimizePackageImports: ['@/components'], // 优化组件导入
  },
  
  // 环境变量
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  
  // 重定向规则
  async redirects() {
    return [
      // 生产环境重定向测试页面到首页
      ...(process.env.NODE_ENV === 'production' ? [
        {
          source: '/test-:path*',
          destination: '/',
          permanent: false,
        },
        {
          source: '/integration-test',
          destination: '/',
          permanent: false,
        },
      ] : []),
    ]
  },
  
  // 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // 压缩配置
  compress: true,
  
  // 输出配置
  output: 'standalone',
  
  // 类型检查
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint配置
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 