import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Unfonts from 'unplugin-fonts/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Unfonts({
      inlineFontFace: true,
      google: {
        families: [
          { name: 'Cormorant Garamond', styles: 'ital,wght@0,400;0,600;0,700;1,400' },
          { name: 'Montserrat', styles: 'wght@300;400;500' },
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
