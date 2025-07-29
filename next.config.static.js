/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // 只在GitHub Pages部署时使用basePath
  ...(process.env.GITHUB_PAGES === 'true' && {
    basePath: '/CyberNuwa',
    assetPrefix: '/CyberNuwa/',
  }),
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig; 