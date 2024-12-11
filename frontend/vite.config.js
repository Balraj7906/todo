import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development'
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(mode === 'production' 
      ? 'https://your-api-domain.com' // Replace with your actual API domain
      : 'http://localhost:3000'
    )
  }
}));