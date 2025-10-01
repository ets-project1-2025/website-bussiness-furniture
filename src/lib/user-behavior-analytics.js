// src/lib/user-behavior-analytics.js
// Sistem analisis perilaku pengguna untuk WIDI Furniture

// Fungsi untuk melacak kunjungan halaman
export const trackPageView = async (pageUrl, userId = null) => {
  try {
    const pageViewData = {
      user_id: userId,
      page_url: pageUrl,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`
    };

    // Kirim ke database analitik
    if (typeof window !== 'undefined') {
      // Di sisi klien, kirim ke API
      await fetch('/api/analytics/page-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageViewData)
      });
    } else {
      // Di sisi server, simpan langsung ke database
      const { error } = await supabase
        .from('page_views')
        .insert(pageViewData);
      
      if (error) throw error;
    }

    console.log(`Melacak kunjungan halaman: ${pageUrl}`);
  } catch (error) {
    console.error('Gagal melacak kunjungan halaman:', error);
  }
};

// Fungsi untuk melacak klik
export const trackClick = async (elementId, elementName, userId = null) => {
  try {
    const clickData = {
      user_id: userId,
      element_id: elementId,
      element_name: elementName,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      session_id: getSessionId()
    };

    // Kirim ke database analitik
    if (typeof window !== 'undefined') {
      await fetch('/api/analytics/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clickData)
      });
    } else {
      const { error } = await supabase
        .from('click_events')
        .insert(clickData);
      
      if (error) throw error;
    }

    console.log(`Melacak klik: ${elementName} (${elementId})`);
  } catch (error) {
    console.error('Gagal melacak klik:', error);
  }
};

// Fungsi untuk melacak pencarian produk
export const trackProductSearch = async (searchTerm, resultsCount, userId = null) => {
  try {
    const searchData = {
      user_id: userId,
      search_term: searchTerm,
      results_count: resultsCount,
      timestamp: new Date().toISOString(),
      session_id: getSessionId()
    };

    // Kirim ke database analitik
    if (typeof window !== 'undefined') {
      await fetch('/api/analytics/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchData)
      });
    } else {
      const { error } = await supabase
        .from('search_events')
        .insert(searchData);
      
      if (error) throw error;
    }

    console.log(`Melacak pencarian: ${searchTerm} (${resultsCount} hasil)`);
  } catch (error) {
    console.error('Gagal melacak pencarian:', error);
  }
};

// Fungsi untuk melacak detail produk
export const trackProductDetailView = async (productId, userId = null) => {
  try {
    const viewData = {
      user_id: userId,
      product_id: productId,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
      page_url: window.location.href
    };

    // Kirim ke database analitik
    if (typeof window !== 'undefined') {
      await fetch('/api/analytics/product-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(viewData)
      });
    } else {
      const { error } = await supabase
        .from('product_views')
        .insert(viewData);
      
      if (error) throw error;
    }

    console.log(`Melacak tampilan detail produk: ${productId}`);
  } catch (error) {
    console.error('Gagal melacak tampilan produk:', error);
  }
};

// Fungsi untuk melacak penambahan ke keranjang
export const trackAddToCart = async (productId, productName, price, quantity = 1, userId = null) => {
  try {
    const cartData = {
      user_id: userId,
      product_id: productId,
      product_name: productName,
      price: price,
      quantity: quantity,
      timestamp: new Date().toISOString(),
      session_id: getSessionId()
    };

    // Kirim ke database analitik
    if (typeof window !== 'undefined') {
      await fetch('/api/analytics/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData)
      });
    } else {
      const { error } = await supabase
        .from('cart_events')
        .insert(cartData);
      
      if (error) throw error;
    }

    console.log(`Melacak penambahan ke keranjang: ${productName} (x${quantity})`);
  } catch (error) {
    console.error('Gagal melacak penambahan ke keranjang:', error);
  }
};

// Fungsi untuk melacak pembuatan pesanan
export const trackOrderCreation = async (orderData, userId = null) => {
  try {
    const orderAnalytics = {
      user_id: userId,
      order_id: orderData.id,
      total_amount: orderData.total_amount,
      items_count: orderData.items?.length || 0,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
      payment_method: orderData.payment_method,
      shipping_method: orderData.shipping_method
    };

    // Kirim ke database analitik
    if (typeof window !== 'undefined') {
      await fetch('/api/analytics/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderAnalytics)
      });
    } else {
      const { error } = await supabase
        .from('order_events')
        .insert(orderAnalytics);
      
      if (error) throw error;
    }

    console.log(`Melacak pembuatan pesanan: ${orderData.id}`);
  } catch (error) {
    console.error('Gagal melacak pembuatan pesanan:', error);
  }
};

// Fungsi untuk mendapatkan ID sesi
const getSessionId = () => {
  if (typeof window === 'undefined') return null;
  
  let sessionId = localStorage.getItem('session_id');
  
  if (!sessionId) {
    // Buat ID sesi baru
    sessionId = generateSessionId();
    localStorage.setItem('session_id', sessionId);
  }
  
  return sessionId;
};

// Fungsi untuk menghasilkan ID sesi
const generateSessionId = () => {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Fungsi untuk mendapatkan perilaku pengguna
export const getUserBehavior = async (userId) => {
  try {
    // Dalam implementasi nyata, ini akan menggabungkan data dari berbagai tabel analitik
    // untuk memberikan gambaran lengkap tentang perilaku pengguna
    
    // Ambil data kunjungan halaman
    const { data: pageViews, error: pageViewError } = await supabase
      .from('page_views')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(50);

    if (pageViewError) throw pageViewError;

    // Ambil data klik
    const { data: clicks, error: clickError } = await supabase
      .from('click_events')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(50);

    if (clickError) throw clickError;

    // Ambil data pencarian
    const { data: searches, error: searchError } = await supabase
      .from('search_events')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(50);

    if (searchError) throw searchError;

    // Ambil data tampilan produk
    const { data: productViews, error: productViewError } = await supabase
      .from('product_views')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(50);

    if (productViewError) throw productViewError;

    // Gabungkan semua data perilaku
    const behavior = {
      pageViews,
      clicks,
      searches,
      productViews,
      totalPageViews: pageViews.length,
      totalClicks: clicks.length,
      totalSearches: searches.length,
      totalProductViews: productViews.length
    };

    return behavior;
  } catch (error) {
    console.error('Gagal mendapatkan perilaku pengguna:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan tren pencarian
export const getSearchTrends = async (days = 7) => {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    // Dalam implementasi nyata, ini akan menggunakan query kompleks
    // untuk menghitung frekuensi pencarian
    const { data, error } = await supabase
      .from('search_events')
      .select('search_term')
      .gte('timestamp', sinceDate.toISOString());

    if (error) throw error;

    // Hitung frekuensi setiap istilah pencarian
    const searchTerms = data.map(item => item.search_term.toLowerCase());
    const termFrequency = {};
    
    searchTerms.forEach(term => {
      termFrequency[term] = (termFrequency[term] || 0) + 1;
    });

    // Urutkan berdasarkan frekuensi
    const sortedTerms = Object.entries(termFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Ambil 10 teratas

    return sortedTerms.map(([term, count]) => ({ term, count }));
  } catch (error) {
    console.error('Gagal mendapatkan tren pencarian:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan produk paling banyak dilihat
export const getMostViewedProducts = async (days = 7) => {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    // Dalam implementasi nyata, ini akan menggabungkan dengan tabel produk
    // untuk mendapatkan informasi produk yang lengkap
    const { data, error } = await supabase
      .from('product_views')
      .select('product_id')
      .gte('timestamp', sinceDate.toISOString());

    if (error) throw error;

    // Hitung frekuensi setiap produk
    const productIds = data.map(item => item.product_id);
    const productIdFrequency = {};
    
    productIds.forEach(productId => {
      productIdFrequency[productId] = (productIdFrequency[productId] || 0) + 1;
    });

    // Urutkan berdasarkan frekuensi
    const sortedProducts = Object.entries(productIdFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Ambil 10 teratas

    // Dalam implementasi nyata, kita akan mengambil detail produk dari tabel produk
    return sortedProducts.map(([productId, count]) => ({ productId, count }));
  } catch (error) {
    console.error('Gagal mendapatkan produk paling banyak dilihat:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan funnels konversi
export const getConversionFunnels = async (days = 7) => {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    // Hitung jumlah pengunjung unik
    const { count: uniqueVisitors, error: visitorError } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', sinceDate.toISOString());

    if (visitorError) throw visitorError;

    // Hitung jumlah pencarian
    const { count: searchCount, error: searchError } = await supabase
      .from('search_events')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', sinceDate.toISOString());

    if (searchError) throw searchError;

    // Hitung jumlah tampilan produk
    const { count: productViewCount, error: productError } = await supabase
      .from('product_views')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', sinceDate.toISOString());

    if (productError) throw productError;

    // Hitung jumlah penambahan ke keranjang
    const { count: addToCartCount, error: cartError } = await supabase
      .from('cart_events')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', sinceDate.toISOString());

    if (cartError) throw cartError;

    // Hitung jumlah pesanan
    const { count: orderCount, error: orderError } = await supabase
      .from('order_events')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', sinceDate.toISOString());

    if (orderError) throw orderError;

    // Hitung persentase konversi untuk setiap langkah
    return {
      uniqueVisitors: uniqueVisitors || 0,
      searchConversion: uniqueVisitors ? parseFloat(((searchCount || 0) / uniqueVisitors * 100).toFixed(2)) : 0,
      productViewConversion: searchCount ? parseFloat(((productViewCount || 0) / searchCount * 100).toFixed(2)) : 0,
      addToCartConversion: productViewCount ? parseFloat(((addToCartCount || 0) / productViewCount * 100).toFixed(2)) : 0,
      purchaseConversion: addToCartCount ? parseFloat(((orderCount || 0) / addToCartCount * 100).toFixed(2)) : 0,
      overallConversion: uniqueVisitors ? parseFloat(((orderCount || 0) / uniqueVisitors * 100).toFixed(2)) : 0
    };
  } catch (error) {
    console.error('Gagal mendapatkan funnels konversi:', error);
    return null;
  }
};

// Fungsi untuk melacak durasi kunjungan
export const trackVisitDuration = async (pageUrl, duration, userId = null) => {
  try {
    const durationData = {
      user_id: userId,
      page_url: pageUrl,
      duration_seconds: duration,
      timestamp: new Date().toISOString(),
      session_id: getSessionId()
    };

    // Kirim ke database analitik
    if (typeof window !== 'undefined') {
      await fetch('/api/analytics/visit-duration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(durationData)
      });
    } else {
      const { error } = await supabase
        .from('visit_durations')
        .insert(durationData);
      
      if (error) throw error;
    }

    console.log(`Melacak durasi kunjungan: ${pageUrl} (${duration}s)`);
  } catch (error) {
    console.error('Gagal melacak durasi kunjungan:', error);
  }
};

// Fungsi untuk mendapatkan rekomendasi berdasarkan perilaku
export const getBehaviorBasedRecommendations = async (userId, limit = 4) => {
  try {
    // Ambil perilaku pengguna terbaru
    const userBehavior = await getUserBehavior(userId);

    if (!userBehavior || userBehavior.totalProductViews === 0) {
      // Jika tidak ada perilaku, kembalikan produk populer
      const { data: popularProducts, error } = await supabase
        .from('products')
        .select('*, product_images(image_url), category_name(name)')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return popularProducts;
    }

    // Ambil ID produk yang sering dilihat oleh pengguna
    const viewedProductIds = userBehavior.productViews
      .map(view => view.product_id)
      .filter((id, index, self) => self.indexOf(id) === index); // Hapus duplikat

    // Ambil semua produk
    const { data: allProducts, error: allProductsError } = await supabase
      .from('products')
      .select('*, product_images(image_url), category_name(name)')
      .limit(100);

    if (allProductsError) throw allProductsError;

    // Hitung kesamaan antara produk yang dilihat pengguna dan semua produk lainnya
    // (Dalam implementasi nyata, ini akan lebih kompleks dan melibatkan model ML)
    const recommendationScores = allProducts.map(product => {
      if (viewedProductIds.includes(product.id)) {
        // Jangan rekomendasikan produk yang sudah dilihat
        return { product, score: 0 };
      }

      let score = 0;

      // Berikan skor berdasarkan kesamaan kategori dengan produk yang dilihat
      userBehavior.productViews.forEach(view => {
        if (product.category_id === view.product_id) {
          // Ini hanya simulasi; dalam implementasi nyata kita perlu menyimpan kategori dari produk yang dilihat
          score += 0.3;
        }
      });

      // Berikan skor berdasarkan kesamaan harga
      userBehavior.productViews.forEach(view => {
        // Di sini kita asumsikan kita memiliki akses ke harga produk yang dilihat
        // Dalam implementasi nyata, kita akan menyimpan harga saat tampilan produk
        score += 0.2; // Tambahkan skor berdasarkan kesamaan harga jika tersedia
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
    console.error('Gagal mendapatkan rekomendasi berdasarkan perilaku:', error);
    return [];
  }
};