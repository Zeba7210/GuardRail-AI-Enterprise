import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

//https://vite.dev
export default defineConfig({
  plugins:[
    react(),
    tailwindcss // 👈 Humne Tailwind ka plugin Vite engine mein jod diya!
  ],
})
