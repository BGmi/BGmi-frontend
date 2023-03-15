const nextBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'bundle',
  basePath: nextBasePath,
  rewrites: async () => {
    return [
      {
        source: nextBasePath + '/api/:slug',
        destination: 'https://home.kahosan.top/bgmidev/api/:slug'
      },
      {
        source: nextBasePath + '/bangumi/:slug',
        destination: 'https://home.kahosan.top/bgmidev/:slug'
      }
    ]
  },
};

module.exports = nextConfig;
