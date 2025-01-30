import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  plugins: [react(), tailwindcss()],
})
