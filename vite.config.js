import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',    // This allows access from other devices
    port: 3000,
    strictPort: true,   // This ensures it uses this specific port
  }
})
