// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server', // Menggunakan server-side rendering
  adapter: node({ mode: 'standalone' }),
  server: {
    port: 4321,
    host: true  // Mengizinkan akses dari alamat IP eksternal (penting untuk codespaces)
  }
});
