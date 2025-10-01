// src/public/sw.js
const CACHE_NAME = 'widi-furniture-v1';
const urlsToCache = [
  '/',
  '/produk',
  '/tentang',
  '/kontak',
  '/akun/profil',
  '/akun/wishlist',
  '/lookbook',
  '/css/style.css',
  '/js/main.js'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});