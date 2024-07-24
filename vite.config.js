import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AlgoWiz/',
  build: {
    outDir: 'dist',  // Ensure the build directory is 'dist'
  }
})
