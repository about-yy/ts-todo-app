/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    port: parseInt(process.env.PORT)
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
