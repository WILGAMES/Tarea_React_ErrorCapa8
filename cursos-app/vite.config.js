import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/iaslab/compu2/A00405025-api/api/',
  plugins: [react()],
})
