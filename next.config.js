const nextBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  basePath: nextBasePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mikanani.me',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:8888/api/:slug*'
      },
      {
        source: '/bangumi/:slug*',
        destination: 'http://localhost:8888/bangumi/:slug*'
      },
      {
        source: '/resource/:slug*',
        destination: 'http://localhost:8888/resource/:slug*'
      }
    ]
  },
};

module.exports = nextConfig;
