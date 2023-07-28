import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'


export default defineConfig({
  base: './',
  plugins: [
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
