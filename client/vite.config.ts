import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'api': path.resolve(__dirname, 'src/api'),
      'consts': path.resolve(__dirname, 'src/consts'),
      'components': path.resolve(__dirname, 'src/components'),
      'App': path.resolve(__dirname, 'src/App'),
      'config': path.resolve(__dirname, 'src/config'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'services': path.resolve(__dirname, 'src/services'),
      'shared': path.resolve(__dirname, 'src/shared'),
      'store': path.resolve(__dirname, 'src/store'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'types': path.resolve(__dirname, 'src/types'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'public': path.resolve(__dirname, 'public'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "styles/variables.scss" as *;`,
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    sourcemap: true,
  },
});
