import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 9000,
  },
  plugins: [react()],
  test: {
    globals: true,
    enviroment: "happy-dom",
    setupFiles: "./setupTests.js"
  }
})
