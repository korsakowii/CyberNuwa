/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基本配置
  swcMinify: true,
  compress: true,
  
  // API代理配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8002/api/:path*',
      },
    ];
  },

  // 重定向规则
  async redirects() {
    return [
      // 生产环境重定向测试页面到首页
      ...(process.env.NODE_ENV === 'production'
        ? [
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
          ]
        : []),
    ];
  },
};

module.exports = nextConfig;
