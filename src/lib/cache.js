// src/lib/cache.js
// Sistem caching untuk WIDI Furniture

// Fungsi untuk membuat cache sederhana menggunakan localStorage
class SimpleCache {
  constructor(prefix = 'widi-furniture-', ttl = 3600000) { // Default TTL: 1 jam
    this.prefix = prefix;
    this.ttl = ttl; // Time to live dalam milidetik
  }

  // Fungsi untuk menyimpan data ke cache
  set(key, value) {
    if (typeof window === 'undefined') {
      // Di sisi server, kita tidak menggunakan localStorage
      return;
    }

    const cacheKey = this.prefix + key;
    const cacheData = {
      value: value,
      timestamp: Date.now(),
      ttl: this.ttl
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Gagal menyimpan ke cache:', error);
    }
  }

  // Fungsi untuk mengambil data dari cache
  get(key) {
    if (typeof window === 'undefined') {
      // Di sisi server, kita tidak menggunakan localStorage
      return null;
    }

    const cacheKey = this.prefix + key;

    try {
      const cachedStr = localStorage.getItem(cacheKey);
      if (!cachedStr) {
        return null;
      }

      const cachedData = JSON.parse(cachedStr);
      const now = Date.now();

      // Periksa apakah cache masih valid
      if (now - cachedData.timestamp > cachedData.ttl) {
        // Hapus cache yang sudah kadaluarsa
        localStorage.removeItem(cacheKey);
        return null;
      }

      return cachedData.value;
    } catch (error) {
      console.warn('Gagal mengambil dari cache:', error);
      return null;
    }
  }

  // Fungsi untuk menghapus data dari cache
  remove(key) {
    if (typeof window === 'undefined') {
      return;
    }

    const cacheKey = this.prefix + key;
    try {
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.warn('Gagal menghapus dari cache:', error);
    }
  }

  // Fungsi untuk menghapus semua cache
  clear() {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.warn('Gagal membersihkan cache:', error);
    }
  }
}

// Membuat instance cache global
const globalCache = new SimpleCache();

// Fungsi untuk menyimpan produk ke cache
export const cacheProduct = (productId, productData) => {
  globalCache.set(`product_${productId}`, productData);
};

// Fungsi untuk mengambil produk dari cache
export const getCachedProduct = (productId) => {
  return globalCache.get(`product_${productId}`);
};

// Fungsi untuk menghapus produk dari cache
export const removeCachedProduct = (productId) => {
  globalCache.remove(`product_${productId}`);
};

// Fungsi untuk menyimpan daftar produk ke cache
export const cacheProductList = (category = 'all', productList) => {
  globalCache.set(`products_${category}`, productList);
};

// Fungsi untuk mengambil daftar produk dari cache
export const getCachedProductList = (category = 'all') => {
  return globalCache.get(`products_${category}`);
};

// Fungsi untuk menyimpan data profil ke cache
export const cacheProfile = (userId, profileData) => {
  globalCache.set(`profile_${userId}`, profileData);
};

// Fungsi untuk mengambil data profil dari cache
export const getCachedProfile = (userId) => {
  return globalCache.get(`profile_${userId}`);
};

// Fungsi untuk menyimpan data keranjang ke cache
export const cacheCart = (userId, cartData) => {
  globalCache.set(`cart_${userId}`, cartData);
};

// Fungsi untuk mengambil data keranjang dari cache
export const getCachedCart = (userId) => {
  return globalCache.get(`cart_${userId}`);
};

// Cache dengan TTL khusus
export const cacheWithTTL = (key, data, ttl) => {
  const customCache = new SimpleCache('widi-custom-', ttl);
  customCache.set(key, data);
};

// Fungsi untuk membersihkan semua cache
export const clearCache = () => {
  globalCache.clear();
};

// Fungsi untuk menghitung penggunaan cache
export const getCacheStats = () => {
  if (typeof window === 'undefined') {
    return { count: 0, size: 0 };
  }

  let count = 0;
  let size = 0;
  const prefix = globalCache.prefix;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      count++;
      size += localStorage.getItem(key).length;
    }
  }

  return { count, size: `${(size / 1024).toFixed(2)} KB` };
};