const nextBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
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
        destination: 'https://home.kahosan.top/bgmidev/api/:slug*'
      },
      {
        source: '/bangumi/:slug*',
        destination: 'https://home.kahosan.top/bgmidev/bangumi/:slug*'
      }
    ]
  },
};

module.exports = nextConfig;
