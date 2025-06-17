
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'areia-31-simulador' with your actual GitHub repository name if it's different.
  base: '/areia-31-simulador/', 
})
