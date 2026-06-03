import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Kuxipilli | Educación Digital Parental',
        short_name: 'Kuxipilli',
        description: 'Plataforma educativa para madres, padres y tutores sobre prevención de riesgos digitales.',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        id: '/?source=pwa',
        orientation: 'portrait',
        categories: ['education', 'parenting'],
        dir: 'ltr',
        prefer_related_applications: false,
        display_override: ['standalone', 'window-controls-overlay'],
        screenshots: [
          {
            src: 'og-image.jpg',
            sizes: '1200x630',
            type: 'image/jpeg',
            form_factor: 'wide',
            label: 'Kuxipilli - Educación Digital Parental'
          }
        ],
        shortcuts: [
          {
            name: 'Mi Panel',
            short_name: 'Panel',
            url: '/panel',
            description: 'Ver mi avance y recomendaciones'
          },
          {
            name: 'Explorar Cursos',
            short_name: 'Cursos',
            url: '/cursos',
            description: 'Explorar cursos disponibles'
          }
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
