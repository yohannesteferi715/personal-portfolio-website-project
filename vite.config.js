import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    proxy: {
      // All /api/* requests are forwarded to the live Render FastAPI server (or local override)
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://yoni-portfolio-api.onrender.com',
        changeOrigin: true,
      },
    },
  },
})