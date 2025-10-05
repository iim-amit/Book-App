import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
    server: {
    host: true, // bind to 0.0.0.0
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: [
      'e-book-d2lq.onrender.com', // Add your Render domain here
      'localhost'
    ],
  },
})