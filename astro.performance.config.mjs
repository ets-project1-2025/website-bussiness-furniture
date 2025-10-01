// astro.config.mjs (sudah ada, tapi saya akan berikan rekomendasi konfigurasi untuk optimasi)

/*
Berikut adalah rekomendasi konfigurasi untuk optimasi kinerja di astro.config.mjs:

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
  output: 'server', // atau 'hybrid' tergantung kebutuhan
  adapter: process.env.DEPLOYMENT_ENV === 'cloudflare' 
    ? cloudflare() 
    : node({ mode: 'standalone' }),
  
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    }),
  ],
  
  vite: {
    plugins: [
      VitePWA({
        // Konfigurasi PWA
        strategies: 'generateSW',
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        manifest: {
          name: 'WIDI Furniture',
          short_name: 'WIDI',
          description: 'Furniture Modern yang Mewah dan Alami',
          theme_color: '#8B4513',
          background_color: '#F5F5DC',
          display: 'standalone',
          icon: 'src/assets/icon.png'
        }
      })
    ],
    
    build: {
      minify: 'terser', // Gunakan terser untuk minifikasi lebih agresif
      cssMinify: 'lightningcss', // Optimasi CSS
      rollupOptions: {
        output: {
          // Split bundle untuk mengurangi ukuran
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-supabase': ['@supabase/supabase-js'],
            'vendor-ui': ['@headlessui/react', '@heroicons/react']
          }
        }
      }
    },
    
    ssr: {
      noExternal: [
        // Daftar paket yang tidak boleh di-external ketika SSR
        'your-ssr-compatible-packages'
      ]
    }
  },
  
  // Optimasi preloading
  prefetch: {
    prefetchAll: true
  },
  
  // Konfigurasi image optimization
  image: {
    domains: ['images.unsplash.com', 'your-cdn-domain.com'],
    format: ['webp']
  }
});
*/

// Karena astro.config.mjs sudah ada, kita akan buat file konfigurasi tambahan untuk build