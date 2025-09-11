import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import generouted from '@generouted/react-router/plugin';

import { version } from './package.json';
process.env.VITE_APP_VERSION = version;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    build: {
      rollupOptions: {
        output: {
          manualChunks: id => {
            if (/(?!.*@chakra-ui).*(framer-motion|dplayer|hls.js|\breact-dom\b)/.test(id))
              return id.split('node_modules/')[1].split('/')[1];
          },
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.API_URL || 'http://localhost:8888',
          changeOrigin: true,
        },
        '/bangumi': {
          target: env.API_URL || 'http://localhost:8888',
          changeOrigin: true,
        },
        '/resource': {
          target: env.API_URL || 'http://localhost:8888',
          changeOrigin: true,
        },
      },
    },
    plugins: [react(), generouted()],
    resolve: {
      alias: {
        '~': '/src',
      },
    },
  };
});
