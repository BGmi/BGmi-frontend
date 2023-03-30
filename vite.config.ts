import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import generouted from '@generouted/react-router/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      manualChunks: (id) => {
        if (id.includes('node_modules'))
          return id.split('node_modules/')[1].split('/')[1];
      }
    },
    outDir: 'front_static'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true
      },
      '/bangumi': {
        target: 'http://localhost:8888',
        changeOrigin: true
      },
      '/resource': {
        target: 'http://localhost:8888',
        changeOrigin: true
      }
    }
  },
  plugins: [
    react(),
    generouted()
  ],
  resolve: {
    alias: {
      '~': '/src'
    }
  }
});
