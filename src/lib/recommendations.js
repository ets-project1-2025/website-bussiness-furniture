// src/lib/recommendations.js
// Fungsi-fungsi untuk sistem rekomendasi produk

import { getAllProducts } from './products';
import { getCartItems } from './cart';

// Fungsi untuk mendapatkan produk-produk yang direkomendasikan berdasarkan produk yang sedang dilihat
export const getRecommendedProducts = async (currentProductId, userId = null, limit = 4) => {
  try {
    // Ambil semua produk
    const allProducts = await getAllProducts();
    
    // Temukan produk saat ini
    const currentProduct = allProducts.find(p => p.id === currentProductId);
    
    if (!currentProduct) {
      return [];
    }
    
    // Filter produk berdasarkan kategori yang sama, tapi bukan produk saat ini
    let recommended = allProducts
      .filter(p => 
        p.category_id === currentProduct.category_id && 
        p.id !== currentProductId
      );
    
    // Jika rekomendasi dari kategori yang sama terlalu sedikit, tambahkan dari kategori lain
    if (recommended.length < 2) {
      const additionalProducts = allProducts
        .filter(p => 
          p.category_id !== currentProduct.category_id && 
          p.id !== currentProductId
        )
        .slice(0, 4 - recommended.length);
      
      recommended = [...recommended, ...additionalProducts];
    }
    
    // Batasi jumlah produk yang direkomendasikan
    return recommended.slice(0, limit);
  } catch (error) {
    console.error('Error getting recommended products:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan produk-produk yang sering dibeli bersama
export const getFrequentlyBoughtTogether = async (productId) => {
  try {
    // Ini adalah implementasi sederhana
    // Dalam implementasi nyata, ini akan menggunakan algoritma analisis keranjang/penjualan
    const allProducts = await getAllProducts();
    
    // Simulasikan produk yang sering dibeli bersama dengan mengambil produk dari kategori yang sama
    const product = allProducts.find(p => p.id === productId);
    if (!product) return [];
    
    return allProducts
      .filter(p => 
        p.category_id === product.category_id && 
        p.id !== productId
      )
      .slice(0, 3);
  } catch (error) {
    console.error('Error getting frequently bought together products:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan produk-produk berdasarkan riwayat keranjang pengguna
export const getPersonalizedRecommendations = async (userId) => {
  try {
    // Ambil item dari keranjang pengguna
    const cartItems = await getCartItems(userId);
    
    if (!cartItems || cartItems.length === 0) {
      // Jika tidak ada item di keranjang, kembalikan produk-produk populer
      return await getPopularProducts(8);
    }
    
    // Ambil semua produk
    const allProducts = await getAllProducts();
    
    // Dapatkan kategori-kategori dari item di keranjang
    const cartCategories = [...new Set(cartItems.map(item => item.category_id))];
    
    // Rekomendasikan produk dari kategori yang sama
    return allProducts
      .filter(p => 
        cartCategories.includes(p.category_id) && 
        !cartItems.some(ci => ci.id === p.id) // Tidak termasuk item yang sudah di keranjang
      )
      .slice(0, 8);
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan produk-produk populer
export const getPopularProducts = async (limit = 8) => {
  try {
    // Ini adalah implementasi sederhana
    // Dalam implementasi nyata, ini akan berdasarkan jumlah penjualan, ulasan, atau popularitas lainnya
    const allProducts = await getAllProducts();
    
    // Urutkan berdasarkan harga sebagai simulasi (dalam implementasi nyata akan berdasarkan metrik lain)
    return allProducts
      .sort((a, b) => (b.price || 0) - (a.price || 0))
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting popular products:', error);
    return [];
  }
};