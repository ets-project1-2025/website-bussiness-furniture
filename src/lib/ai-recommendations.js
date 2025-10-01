// src/lib/ai-recommendations.js
// Sistem rekomendasi produk berbasis AI/ML sederhana untuk WIDI Furniture

// Fungsi untuk menghitung kesamaan antara dua produk berdasarkan fitur
const calculateSimilarity = (productA, productB) => {
  // Dalam implementasi nyata, ini akan melibatkan model ML yang kompleks
  // Untuk simulasi, kita gunakan pendekatan sederhana berdasarkan kategori dan harga
  
  let similarity = 0;
  
  // Kesamaan kategori
  if (productA.category_id === productB.category_id) {
    similarity += 0.4; // Bobot 40% untuk kategori yang sama
  }
  
  // Kesamaan harga (menggunakan perbedaan relatif)
  const priceDiff = Math.abs(productA.price - productB.price) / Math.max(productA.price, productB.price);
  similarity += (1 - Math.min(priceDiff, 1)) * 0.3; // Bobot 30% untuk kesamaan harga
  
  // Kesamaan berdasarkan deskripsi (menggunakan kesamaan kata kunci sederhana)
  if (productA.description && productB.description) {
    const descA = productA.description.toLowerCase().split(' ');
    const descB = productB.description.toLowerCase().split(' ');
    const commonWords = descA.filter(word => descB.includes(word)).length;
    const totalWords = new Set([...descA, ...descB]).size;
    const descSimilarity = totalWords > 0 ? commonWords / totalWords : 0;
    similarity += descSimilarity * 0.3; // Bobot 30% untuk kesamaan deskripsi
  }
  
  return Math.min(similarity, 1); // Batasi antara 0-1
};

// Fungsi untuk mendapatkan rekomendasi produk berdasarkan produk yang sedang dilihat
export const getRecommendedProducts = async (currentProductId, userId = null, limit = 4) => {
  try {
    // Dalam implementasi nyata, kita akan menggunakan model ML untuk menghitung rekomendasi
    // Untuk simulasi, kita gunakan pendekatan berbasis konten sederhana
    
    // Ambil produk saat ini dan semua produk
    const { data: currentProduct, error: currentProductError } = await supabase
      .from('products')
      .select('*, product_images(image_url), category_name(name)')
      .eq('id', currentProductId)
      .single();
    
    if (currentProductError) {
      throw new Error(`Gagal mengambil produk saat ini: ${currentProductError.message}`);
    }
    
    const { data: allProducts, error: allProductsError } = await supabase
      .from('products')
      .select('*, product_images(image_url), category_name(name)')
      .neq('id', currentProductId) // Jangan sertakan produk saat ini
      .limit(50); // Batasi untuk efisiensi
    
    if (allProductsError) {
      throw new Error(`Gagal mengambil semua produk: ${allProductsError.message}`);
    }
    
    // Hitung kesamaan antara produk saat ini dan semua produk lainnya
    const similarityScores = allProducts.map(product => ({
      product,
      similarity: calculateSimilarity(currentProduct, product)
    }));
    
    // Urutkan berdasarkan kesamaan dan ambil beberapa produk teratas
    const sortedProducts = similarityScores
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.product);
    
    return sortedProducts;
  } catch (error) {
    console.error('Error getting recommended products:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan rekomendasi berdasarkan riwayat pengguna
export const getPersonalizedRecommendations = async (userId, limit = 8) => {
  try {
    // Dalam implementasi nyata, ini akan menggunakan model kolaboratif filtering
    // Untuk simulasi, kita gunakan pendekatan berbasis perilaku pengguna
    
    // Ambil pesanan pengguna sebelumnya
    const { data: userOrders, error: ordersError } = await supabase
      .from('orders')
      .select('order_items!inner(product_id)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5); // Ambil 5 pesanan terbaru
    
    if (ordersError) {
      throw new Error(`Gagal mengambil pesanan pengguna: ${ordersError.message}`);
    }
    
    // Dapatkan ID produk yang pernah dibeli
    const purchasedProductIds = userOrders.flatMap(order => 
      order.order_items.map(item => item.product_id)
    );
    
    if (purchasedProductIds.length === 0) {
      // Jika pengguna belum pernah memesan, kembalikan produk populer
      return await getPopularProducts(limit);
    }
    
    // Ambil detail produk yang pernah dibeli
    const { data: purchasedProducts, error: productsError } = await supabase
      .from('products')
      .select('*, category_name(name)')
      .in('id', purchasedProductIds);
    
    if (productsError) {
      throw new Error(`Gagal mengambil produk yang pernah dibeli: ${productsError.message}`);
    }
    
    // Ambil semua produk
    const { data: allProducts, error: allProductsError } = await supabase
      .from('products')
      .select('*, product_images(image_url), category_name(name)')
      .limit(100); // Batasi untuk efisiensi
    
    if (allProductsError) {
      throw new Error(`Gagal mengambil semua produk: ${allProductsError.message}`);
    }
    
    // Hitung skor rekomendasi berdasarkan kesamaan dengan produk yang pernah dibeli
    const recommendationScores = allProducts.map(product => {
      if (purchasedProductIds.includes(product.id)) {
        // Jangan rekomendasikan produk yang sudah dibeli
        return { product, score: 0 };
      }
      
      let score = 0;
      
      // Berikan skor berdasarkan kesamaan kategori dengan produk yang pernah dibeli
      purchasedProducts.forEach(purchased => {
        if (product.category_id === purchased.category_id) {
          score += 0.5; // Bobot tinggi untuk kategori yang sama
        }
      });
      
      // Berikan skor berdasarkan kesamaan harga
      purchasedProducts.forEach(purchased => {
        const priceDiff = Math.abs(product.price - purchased.price) / Math.max(product.price, purchased.price);
        score += (1 - Math.min(priceDiff, 1)) * 0.3;
      });
      
      return { product, score };
    });
    
    // Urutkan berdasarkan skor dan ambil beberapa produk teratas
    const sortedProducts = recommendationScores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
    
    return sortedProducts;
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    return await getPopularProducts(limit);
  }
};

// Fungsi untuk mendapatkan produk populer
export const getPopularProducts = async (limit = 8) => {
  try {
    // Dalam implementasi nyata, ini akan berdasarkan jumlah penjualan, rating, atau popularitas lainnya
    // Untuk simulasi, kita ambil produk dengan rating dan jumlah penjualan tertinggi
    
    const { data: products, error } = await supabase
      .from('products')
      .select('*, product_images(image_url), category_name(name)')
      .order('created_at', { ascending: false }) // Ambil produk terbaru sebagai simulasi
      .limit(limit);
    
    if (error) {
      throw new Error(`Gagal mengambil produk populer: ${error.message}`);
    }
    
    return products;
  } catch (error) {
    console.error('Error getting popular products:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan produk yang sering dibeli bersama
export const getFrequentlyBoughtTogether = async (productId, limit = 3) => {
  try {
    // Dalam implementasi nyata, ini akan menggunakan analisis keranjang belanja
    // Untuk simulasi, kita gunakan pendekatan sederhana berdasarkan kategori
    
    const { data: currentProduct, error: currentProductError } = await supabase
      .from('products')
      .select('category_id')
      .eq('id', productId)
      .single();
    
    if (currentProductError) {
      throw new Error(`Gagal mengambil produk saat ini: ${currentProductError.message}`);
    }
    
    // Ambil produk lain dalam kategori yang sama
    const { data: relatedProducts, error: relatedError } = await supabase
      .from('products')
      .select('*, product_images(image_url), category_name(name)')
      .eq('category_id', currentProduct.category_id)
      .neq('id', productId)
      .limit(limit);
    
    if (relatedError) {
      throw new Error(`Gagal mengambil produk terkait: ${relatedError.message}`);
    }
    
    return relatedProducts;
  } catch (error) {
    console.error('Error getting frequently bought together products:', error);
    return [];
  }
};

// Fungsi untuk melacak interaksi pengguna (untuk pelatihan model di masa mendatang)
export const trackUserInteraction = async (userId, productId, interactionType, value = null) => {
  try {
    // Simpan interaksi ke database untuk analisis di masa mendatang
    const { error } = await supabase
      .from('user_interactions')
      .insert({
        user_id: userId,
        product_id: productId,
        interaction_type: interactionType,
        value: value,
        timestamp: new Date().toISOString()
      });
    
    if (error) {
      console.error('Gagal menyimpan interaksi pengguna:', error);
    }
  } catch (error) {
    console.error('Error tracking user interaction:', error);
  }
};