// src/lib/advanced-personalization.js
// Sistem personalisasi tingkat lanjut untuk WIDI Furniture

// Fungsi untuk membuat profil pengguna berdasarkan perilaku
export const createUserProfile = async (userId) => {
  try {
    // Ambil semua data perilaku pengguna
    const userBehavior = await getUserBehavior(userId);
    
    // Ambil data pengguna dari profil
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) throw profileError;
    
    // Ambil data pesanan pengguna
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (ordersError) throw ordersError;
    
    // Buat profil berdasarkan kombinasi data perilaku, profil, dan pesanan
    const profile = {
      id: userId,
      demographics: {
        location: profileData.address,
        preferred_language: profileData.preferred_language || 'id',
      },
      preferences: {
        preferred_categories: getPreferredCategories(orders, userBehavior),
        preferred_price_range: getPreferredPriceRange(orders),
        preferred_styles: getPreferredStyles(orders, userBehavior)
      },
      behavior: {
        browsing_frequency: getBrowsingFrequency(userBehavior),
        cart_abandonment_rate: getCartAbandonmentRate(orders, userBehavior),
        peak_activity_time: getPeakActivityTime(userBehavior),
      },
      engagement: {
        total_orders: orders.length,
        avg_order_value: getAvgOrderValue(orders),
        last_purchase_date: orders.length > 0 ? orders[0].created_at : null,
        loyalty_score: calculateLoyaltyScore(orders, userBehavior)
      }
    };
    
    // Simpan profil ke database
    const { error: saveError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        profile_data: profile,
        updated_at: new Date().toISOString()
      });
    
    if (saveError) throw saveError;
    
    return profile;
  } catch (error) {
    console.error('Gagal membuat profil pengguna:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan kategori yang disukai
const getPreferredCategories = (orders, behavior) => {
  if (!behavior.productViews || behavior.productViews.length === 0) {
    // Jika tidak ada data perilaku, gunakan data pesanan
    const categoryCounts = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        if (item.product?.category_id) {
          categoryCounts[item.product.category_id] = (categoryCounts[item.product.category_id] || 0) + 1;
        }
      });
    });
    
    return Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([id]) => id);
  }
  
  // Gunakan data perilaku untuk menentukan kategori yang disukai
  const categoryCounts = {};
  behavior.productViews.forEach(view => {
    categoryCounts[view.category_id] = (categoryCounts[view.category_id] || 0) + 1;
  });
  
  return Object.entries(categoryCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([id]) => id);
};

// Fungsi untuk mendapatkan kisaran harga yang disukai
const getPreferredPriceRange = (orders) => {
  if (orders.length === 0) return { min: 0, max: 10000000 }; // Default
  
  const prices = orders.flatMap(order => 
    order.items?.map(item => item.price || 0) || []
  ).filter(price => price > 0);
  
  if (prices.length === 0) return { min: 0, max: 10000000 };
  
  const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  return {
    min: Math.floor(minPrice * 0.8),
    max: Math.ceil(maxPrice * 1.2),
    avg: Math.round(avgPrice)
  };
};

// Fungsi untuk mendapatkan gaya yang disukai
const getPreferredStyles = (orders, behavior) => {
  // Dalam implementasi nyata, ini akan menggunakan teknik analisis yang lebih kompleks
  // berdasarkan deskripsi produk, kategori, dan perilaku pengguna
  
  const styleCounts = {
    'minimalis': 0,
    'skandinavia': 0,
    'industrial': 0,
    'klasik': 0,
    'modern': 0
  };
  
  // Hitung berdasarkan produk yang dilihat dan dibeli
  if (behavior.productViews) {
    behavior.productViews.forEach(view => {
      if (view.product_name?.toLowerCase().includes('minimal')) {
        styleCounts['minimalis']++;
      } else if (view.product_name?.toLowerCase().includes('skandinavia')) {
        styleCounts['skandinavia']++;
      }
      // Tambahkan pengecekan untuk gaya lainnya
    });
  }
  
  return Object.entries(styleCounts)
    .filter(([_, count]) => count > 0)
    .sort(([,a], [,b]) => b - a)
    .map(([style]) => style);
};

// Fungsi untuk mendapatkan frekuensi browsing
const getBrowsingFrequency = (behavior) => {
  if (!behavior.pageViews || behavior.pageViews.length < 2) {
    return 'rendah'; // Jika tidak banyak data
  }
  
  const firstView = new Date(behavior.pageViews[behavior.pageViews.length - 1].timestamp);
  const lastView = new Date(behavior.pageViews[0].timestamp);
  const daysDiff = (lastView - firstView) / (1000 * 60 * 60 * 24);
  
  const viewsPerDay = behavior.pageViews.length / Math.max(daysDiff, 1);
  
  if (viewsPerDay > 5) return 'tinggi';
  if (viewsPerDay > 2) return 'sedang';
  return 'rendah';
};

// Fungsi untuk mendapatkan tingkat pembatalan keranjang
const getCartAbandonmentRate = (orders, behavior) => {
  // Jumlah total penambahan ke keranjang
  const totalCartAdds = behavior.totalProductViews; // Gunakan tampilan produk sebagai proxy
  
  // Jumlah checkout
  const totalCheckouts = orders.length;
  
  // Tingkat pembatalan (dalam implementasi nyata, ini akan lebih akurat)
  const abandonmentRate = totalCartAdds > 0 ? 
    parseFloat(((totalCartAdds - totalCheckouts) / totalCartAdds * 100).toFixed(2)) : 0;
  
  return abandonmentRate;
};

// Fungsi untuk mendapatkan waktu aktivitas puncak
const getPeakActivityTime = (behavior) => {
  if (!behavior.pageViews || behavior.pageViews.length === 0) {
    return '09:00-17:00'; // Default
  }
  
  const hours = behavior.pageViews.map(view => {
    const date = new Date(view.timestamp);
    return date.getHours();
  });
  
  // Kelompokkan berdasarkan jam
  const hourCounts = {};
  hours.forEach(hour => {
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  
  // Temukan jam dengan aktivitas tertinggi
  let peakHour = 0;
  let maxCount = 0;
  for (const [hour, count] of Object.entries(hourCounts)) {
    if (count > maxCount) {
      maxCount = count;
      peakHour = parseInt(hour);
    }
  }
  
  // Kembalikan rentang waktu sekitar jam puncak
  const startHour = Math.max(0, peakHour - 2);
  const endHour = Math.min(23, peakHour + 2);
  return `${startHour.toString().padStart(2, '0')}:00-${endHour.toString().padStart(2, '0')}:00`;
};

// Fungsi untuk mendapatkan nilai rata-rata pesanan
const getAvgOrderValue = (orders) => {
  if (orders.length === 0) return 0;
  
  const total = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  return Math.round(total / orders.length);
};

// Fungsi untuk menghitung skor loyalitas
const calculateLoyaltyScore = (orders, behavior) => {
  if (orders.length === 0) return 0;
  
  // Faktor-faktor untuk skor loyalitas
  const totalSpent = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const frequency = orders.length; // Jumlah pesanan
  const recency = new Date() - new Date(orders[0].created_at); // Jarak waktu dari pesanan terakhir
  
  // Skor dasar berdasarkan pengeluaran dan frekuensi
  let baseScore = Math.min(100, (totalSpent / 1000000) * 0.4 + frequency * 5);
  
  // Kurangi skor jika pengguna tidak aktif dalam waktu lama
  if (recency > 90 * 24 * 60 * 60 * 1000) { // Lebih dari 90 hari
    baseScore *= 0.5;
  } else if (recency > 30 * 24 * 60 * 60 * 1000) { // Lebih dari 30 hari
    baseScore *= 0.8;
  }
  
  return Math.round(Math.min(100, baseScore));
};

// Fungsi untuk mendapatkan rekomendasi produk sangat personal
export const getHyperPersonalizedRecommendations = async (userId, limit = 8) => {
  try {
    // Ambil profil pengguna
    const profile = await getUserProfile(userId);
    
    if (!profile) {
      // Jika tidak ada profil, kembalikan rekomendasi berbasis konten biasa
      return await getRecommendedProducts(null, userId, limit);
    }
    
    // Ambil semua produk
    const { data: allProducts, error } = await supabase
      .from('products')
      .select('*, product_images(image_url), category_name(name)')
      .limit(200); // Batasi untuk efisiensi
    
    if (error) throw error;
    
    // Hitung skor personalisasi untuk setiap produk
    const personalizedScores = allProducts.map(product => {
      let score = 0;
      
      // Bobot berdasarkan kategori yang disukai
      if (profile.preferences.preferred_categories.includes(product.category_id)) {
        score += 30;
      }
      
      // Bobot berdasarkan kisaran harga
      if (profile.preferences.preferred_price_range) {
        const { min, max, avg } = profile.preferences.preferred_price_range;
        if (product.price >= min && product.price <= max) {
          score += 20;
        } else if (Math.abs(product.price - avg) / avg < 0.3) {
          score += 10; // Harga mendekati rata-rata
        }
      }
      
      // Bobot berdasarkan gaya yang disukai
      if (profile.preferences.preferred_styles.some(style => 
        product.name.toLowerCase().includes(style.toLowerCase()) ||
        product.description.toLowerCase().includes(style.toLowerCase())
      )) {
        score += 15;
      }
      
      // Faktor tambahan berdasarkan engagement
      if (profile.engagement.loyalty_score > 70) {
        // Pengguna loyal mungkin menyukai produk premium
        if (product.price > profile.preferences.preferred_price_range.avg) {
          score += 5;
        }
      }
      
      return { product, score };
    });
    
    // Urutkan berdasarkan skor dan ambil beberapa produk teratas
    const sortedProducts = personalizedScores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
    
    return sortedProducts;
  } catch (error) {
    console.error('Gagal mendapatkan rekomendasi sangat personal:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan pengalaman pengguna personal
export const getPersonalizedUserExperience = async (userId) => {
  try {
    const profile = await getUserProfile(userId);
    
    if (!profile) {
      return {
        theme: 'default',
        language: 'id',
        recommendations_enabled: true,
        notifications_frequency: 'daily',
        ui_preferences: {},
        promotions: []
      };
    }
    
    // Tentukan tema berdasarkan perilaku
    let theme = 'default';
    if (profile.preferences.preferred_styles.includes('minimalis')) {
      theme = 'minimalist';
    } else if (profile.preferences.preferred_styles.includes('skandinavia')) {
      theme = 'light_wood';
    } else if (profile.preferences.preferred_styles.includes('industrial')) {
      theme = 'dark_modern';
    }
    
    // Tentukan frekuensi notifikasi berdasarkan engagement
    let notificationFrequency = 'daily';
    if (profile.engagement.loyalty_score > 80) {
      notificationFrequency = 'real_time';
    } else if (profile.engagement.loyalty_score < 40) {
      notificationFrequency = 'weekly';
    }
    
    // Dapatkan promosi yang sesuai
    const promotions = await getPersonalizedPromotions(userId, profile);
    
    return {
      theme,
      language: profile.demographics.preferred_language || 'id',
      recommendations_enabled: true,
      notifications_frequency: notificationFrequency,
      ui_preferences: {
        layout: profile.behavior.browsing_frequency === 'tinggi' ? 'compact' : 'spacious',
        font_size: 'medium',
        high_contrast: false
      },
      promotions
    };
  } catch (error) {
    console.error('Gagal mendapatkan pengalaman pengguna personal:', error);
    return {
      theme: 'default',
      language: 'id',
      recommendations_enabled: true,
      notifications_frequency: 'daily',
      ui_preferences: {},
      promotions: []
    };
  }
};

// Fungsi untuk mendapatkan promosi yang sesuai
const getPersonalizedPromotions = async (userId, profile) => {
  try {
    // Ambil semua promosi aktif
    const { data: promotions, error } = await supabase
      .from('marketing_campaigns')
      .select('*')
      .eq('status', 'active')
      .gte('startDate', new Date().toISOString())
      .lte('endDate', new Date().toISOString());
    
    if (error) throw error;
    
    // Hitung relevansi setiap promosi
    const relevantPromotions = promotions.map(promo => {
      let relevance = 0;
      
      // Jika promosi berdasarkan kategori, cocokkan dengan kategori yang disukai
      if (promo.target_categories) {
        const matchingCategories = promo.target_categories.filter(cat => 
          profile.preferences.preferred_categories.includes(cat)
        ).length;
        relevance += matchingCategories * 25;
      }
      
      // Jika promosi berdasarkan harga, cocokkan dengan kisaran harga yang disukai
      if (promo.min_price && promo.max_price) {
        const avgPrefPrice = profile.preferences.preferred_price_range.avg;
        if (avgPrefPrice >= promo.min_price && avgPrefPrice <= promo.max_price) {
          relevance += 20;
        }
      }
      
      // Berdasarkan skor loyalitas
      if (promo.target_loyalty_tier) {
        let tierMatch = 0;
        if (promo.target_loyalty_tier === 'premium' && profile.engagement.loyalty_score > 80) {
          tierMatch = 30;
        } else if (promo.target_loyalty_tier === 'standard' && profile.engagement.loyalty_score > 50) {
          tierMatch = 20;
        } else if (promo.target_loyalty_tier === 'new' && profile.engagement.loyalty_score < 30) {
          tierMatch = 25;
        }
        relevance += tierMatch;
      }
      
      return { promo, relevance };
    });
    
    // Urutkan berdasarkan relevansi
    return relevantPromotions
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3) // Ambil 3 promosi teratas
      .map(item => item.promo);
  } catch (error) {
    console.error('Gagal mendapatkan promosi personal:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan profil pengguna dari database
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('profile_data')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      // Jika profil tidak ditemukan, buat profil baru
      if (error.code === 'PGRST116') {
        return await createUserProfile(userId);
      }
      throw error;
    }
    
    return data.profile_data;
  } catch (error) {
    console.error('Gagal mendapatkan profil pengguna:', error);
    return null;
  }
};

// Fungsi untuk memperbarui preferensi pengguna
export const updateUserPreferences = async (userId, preferences) => {
  try {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        preferences: preferences,
        updated_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    console.log(`Preferensi pengguna ${userId} diperbarui`);
    return { success: true, message: 'Preferensi berhasil diperbarui' };
  } catch (error) {
    console.error('Gagal memperbarui preferensi pengguna:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk mendapatkan preferensi pengguna
export const getUserPreferences = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('preferences')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      // Jika preferensi tidak ditemukan, kembalikan preferensi default
      if (error.code === 'PGRST116') {
        return {
          communication: {
            email: true,
            push: true,
            sms: false
          },
          notification_frequency: 'daily',
          interface: {
            theme: 'light',
            language: 'id',
            currency: 'IDR'
          }
        };
      }
      throw error;
    }
    
    return data.preferences;
  } catch (error) {
    console.error('Gagal mendapatkan preferensi pengguna:', error);
    return null;
  }
};

// Fungsi untuk menyesuaikan UI berdasarkan preferensi
export const customizeUIForUser = async (userId) => {
  try {
    const profile = await getUserProfile(userId);
    const preferences = await getUserPreferences(userId);
    
    // Gabungkan informasi dari profil dan preferensi
    const uiSettings = {
      theme: profile?.theme || preferences?.interface?.theme || 'light',
      language: profile?.language || preferences?.interface?.language || 'id',
      currency: preferences?.interface?.currency || 'IDR',
      layout: profile?.ui_preferences?.layout || 'standard',
      font_size: profile?.ui_preferences?.font_size || 'medium',
      high_contrast: profile?.ui_preferences?.high_contrast || false
    };
    
    // Simpan pengaturan UI ke localStorage untuk digunakan di klien
    if (typeof window !== 'undefined') {
      localStorage.setItem('widi_ui_settings', JSON.stringify(uiSettings));
    }
    
    // Terapkan tema ke dokumen
    applyTheme(uiSettings.theme);
    
    return uiSettings;
  } catch (error) {
    console.error('Gagal menyesuaikan UI untuk pengguna:', error);
    return null;
  }
};

// Fungsi untuk menerapkan tema ke UI
const applyTheme = (theme) => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  
  switch (theme) {
    case 'minimalist':
      root.style.setProperty('--primary-color', '#2c3e50');
      root.style.setProperty('--accent-color', '#3498db');
      root.style.setProperty('--background-color', '#ffffff');
      root.style.setProperty('--text-color', '#333333');
      break;
    case 'light_wood':
      root.style.setProperty('--primary-color', '#8B4513');
      root.style.setProperty('--accent-color', '#A0522D');
      root.style.setProperty('--background-color', '#F5F5DC');
      root.style.setProperty('--text-color', '#5D4037');
      break;
    case 'dark_modern':
      root.style.setProperty('--primary-color', '#e0e0e0');
      root.style.setProperty('--accent-color', '#bb86fc');
      root.style.setProperty('--background-color', '#121212');
      root.style.setProperty('--text-color', '#ffffff');
      break;
    default:
      // Tema default (seperti yang digunakan sebelumnya)
      root.style.setProperty('--primary-color', '#8B4513');
      root.style.setProperty('--accent-color', '#D2B48C');
      root.style.setProperty('--background-color', '#F5F5DC');
      root.style.setProperty('--text-color', '#333333');
  }
};