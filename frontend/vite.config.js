import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/static/',   // THIS is critical — prefix all asset URLs with /static/
  build: {
    outDir: 'dist',    // your build output folder inside frontend/
    emptyOutDir: true,
  },
})
