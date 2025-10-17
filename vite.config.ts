import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __BASE_PATH__: JSON.stringify('/')
  },
  base: '/',
  server: {
    host: '0.0.0.0', // Allow connections from any IP
    port: 3000,
    strictPort: true,
    open: false
  }
})