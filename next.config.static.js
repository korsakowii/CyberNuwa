/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 确保只构建showcase页面
  experimental: {
    // 可以在这里添加其他静态构建优化
  }
}

module.exports = nextConfig; 