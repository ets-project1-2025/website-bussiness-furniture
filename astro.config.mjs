// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server', // Menggunakan server-side rendering
  adapter: vercel({ 
    mode: 'serverless' // Menggunakan mode serverless untuk Vercel
  }),
  server: {
    port: 4321,
    host: true  // Mengizinkan akses dari alamat IP eksternal (penting untuk codespaces)
  }
});
