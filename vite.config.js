// vite.config.js (konfigurasi untuk Vitest)
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Konfigurasi dasar untuk pengujian
    globals: true,
    environment: 'jsdom', // Gunakan jsdom untuk simulasi lingkungan browser
    setupFiles: ['./tests/setup.js'], // File setup untuk pengujian
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    
    // Konfigurasi pelaporan
    reporters: ['verbose'],
    
    // Konfigurasi cakupan kode
    coverage: {
      provider: 'v8', // atau 'istanbul'
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'dist/**',
        'tests/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/tests/**',
        '**/__tests__/**',
        '**/coverage/**',
        '**/vite.config.js',
        '**/vitest.config.js',
        '**/astro.config.mjs'
      ]
    },
    
    // Konfigurasi waktu tunggu
    testTimeout: 10000,
    hookTimeout: 15000,
    
    // Konfigurasi snapshot
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true
    }
  },
  
  resolve: {
    alias: {
      // Alias untuk modul agar lebih mudah diimpor
      '@': resolve(__dirname, './src'),
      '@lib': resolve(__dirname, './src/lib'),
      '@components': resolve(__dirname, './src/components'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@pages': resolve(__dirname, './src/pages'),
      '@assets': resolve(__dirname, './src/assets'),
      '@styles': resolve(__dirname, './src/styles')
    }
  },
  
  define: {
    // Definisi variabel global untuk pengujian
    'process.env.TESTING': JSON.stringify(true)
  }
});