import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base set to './' for GitHub Pages subpath compatibility.
export default defineConfig({
  base: './',
  plugins: [react()],
})

