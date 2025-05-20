// Imports.
import path               from 'node:path';
import react              from '@vitejs/plugin-react'
import tailwindcss        from '@tailwindcss/vite'
import { defineConfig }   from 'vite'
import { fileURLToPath }  from 'node:url';

// Required to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@models": path.resolve(__dirname, "src/models"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@store": path.resolve(__dirname, "./src/store"),
      '@styles': path.resolve(__dirname, 'src/styles'),
    }
  }
})
