import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Custom plugin to serve the root-level images/ folder at /images/ URL
function serveImagesPlugin() {
  return {
    name: 'serve-images',
    configureServer(server: any) {
      server.middlewares.use('/images', (req: any, res: any, next: any) => {
        const imgPath = path.resolve(__dirname, 'images', req.url.slice(1))
        if (fs.existsSync(imgPath)) {
          const ext = path.extname(imgPath).toLowerCase()
          const mimeMap: Record<string, string> = {
            '.webp': 'image/webp',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
          }
          res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream')
          fs.createReadStream(imgPath).pipe(res)
        } else {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    serveImagesPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.webp', '**/*.png'],
})
