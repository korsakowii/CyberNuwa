/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/CyberNuwa',
  assetPrefix: '/CyberNuwa/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig; 