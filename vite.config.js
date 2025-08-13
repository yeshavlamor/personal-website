import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // import react and tailwindcss plugins to use in the project
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // set up path alias for the src directory
    }
  }
}); 
