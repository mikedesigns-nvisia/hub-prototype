import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.join(__dirname, 'src/renderer'),
  base: './',
  build: {
    outDir: path.join(__dirname, 'dist/renderer'),
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron'],
    }
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/renderer')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
}) 