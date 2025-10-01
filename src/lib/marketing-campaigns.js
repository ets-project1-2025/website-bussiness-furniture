// src/lib/marketing-campaigns.js
// Sistem manajemen kampanye pemasaran untuk WIDI Furniture

// Fungsi untuk membuat kampanye baru
export const createCampaign = async (campaignData) => {
  try {
    // Validasi data kampanye
    if (!campaignData.name || !campaignData.type || !campaignData.startDate || !campaignData.endDate) {
      throw new Error('Data kampanye tidak lengkap');
    }

    // Validasi bahwa tanggal mulai sebelum tanggal akhir
    if (new Date(campaignData.startDate) >= new Date(campaignData.endDate)) {
      throw new Error('Tanggal mulai harus sebelum tanggal akhir');
    }

    // Dalam implementasi nyata, ini akan disimpan ke database
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .insert({
        ...campaignData,
        created_at: new Date().toISOString(),
        status: 'draft' // Status default adalah draft
      });

    if (error) throw error;

    return {
      success: true,
      campaignId: data[0].id,
      message: 'Kampanye berhasil dibuat'
    };
  } catch (error) {
    console.error('Error creating campaign:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk memperbarui kampanye
export const updateCampaign = async (campaignId, updateData) => {
  try {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .update(updateData)
      .eq('id', campaignId);

    if (error) throw error;

    return {
      success: true,
      message: 'Kampanye berhasil diperbarui'
    };
  } catch (error) {
    console.error('Error updating campaign:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk menghapus kampanye
export const deleteCampaign = async (campaignId) => {
  try {
    const { error } = await supabase
      .from('marketing_campaigns')
      .delete()
      .eq('id', campaignId);

    if (error) throw error;

    return {
      success: true,
      message: 'Kampanye berhasil dihapus'
    };
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk mendapatkan kampanye berdasarkan ID
export const getCampaignById = async (campaignId) => {
  try {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error getting campaign by ID:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan semua kampanye
export const getAllCampaigns = async (status = null) => {
  try {
    let query = supabase.from('marketing_campaigns').select('*').order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error getting all campaigns:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan kampanye aktif
export const getActiveCampaigns = async () => {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .select('*')
      .eq('status', 'active')
      .lte('startDate', now)
      .gte('endDate', now);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error getting active campaigns:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan kampanye berdasarkan jenis
export const getCampaignsByType = async (type) => {
  try {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error getting campaigns by type:', error);
    return [];
  }
};

// Fungsi untuk memulai kampanye
export const startCampaign = async (campaignId) => {
  try {
    // Periksa apakah kampanye sudah bisa dimulai
    const campaign = await getCampaignById(campaignId);
    if (!campaign) {
      throw new Error('Kampanye tidak ditemukan');
    }

    if (campaign.status === 'active') {
      throw new Error('Kampanye sudah aktif');
    }

    // Perbarui status kampanye
    const { error } = await supabase
      .from('marketing_campaigns')
      .update({ status: 'active', started_at: new Date().toISOString() })
      .eq('id', campaignId);

    if (error) throw error;

    // Dalam implementasi nyata, ini akan memicu sistem otomatisasi
    console.log(`Kampanye ${campaignId} telah dimulai`);

    return {
      success: true,
      message: 'Kampanye berhasil dimulai'
    };
  } catch (error) {
    console.error('Error starting campaign:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk menghentikan kampanye
export const stopCampaign = async (campaignId) => {
  try {
    const { error } = await supabase
      .from('marketing_campaigns')
      .update({ status: 'stopped', stopped_at: new Date().toISOString() })
      .eq('id', campaignId);

    if (error) throw error;

    return {
      success: true,
      message: 'Kampanye berhasil dihentikan'
    };
  } catch (error) {
    console.error('Error stopping campaign:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk menghitung statistik kampanye
export const getCampaignStats = async (campaignId) => {
  try {
    // Dalam implementasi nyata, ini akan menggabungkan data dari berbagai sumber
    // seperti email automation, click-through rate, conversion rate, dll.
    
    // Ambil data kampanye
    const campaign = await getCampaignById(campaignId);
    if (!campaign) {
      throw new Error('Kampanye tidak ditemukan');
    }

    // Simulasi perhitungan statistik
    // Dalam implementasi nyata, ini akan mengambil dari database tracking
    const stats = {
      id: campaignId,
      name: campaign.name,
      type: campaign.type,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      totalImpressions: Math.floor(Math.random() * 50000) + 10000,
      totalClicks: Math.floor(Math.random() * 5000) + 500,
      totalConversions: Math.floor(Math.random() * 100) + 10,
      totalRevenue: Math.floor(Math.random() * 50000000) + 5000000,
      ctr: 0, // Click-through rate
      conversionRate: 0,
      roi: 0 // Return on investment
    };

    // Hitung CTR (Click-through rate)
    stats.ctr = stats.totalImpressions > 0 
      ? parseFloat(((stats.totalClicks / stats.totalImpressions) * 100).toFixed(2)) 
      : 0;

    // Hitung conversion rate
    stats.conversionRate = stats.totalClicks > 0 
      ? parseFloat(((stats.totalConversions / stats.totalClicks) * 100).toFixed(2)) 
      : 0;

    // Hitung ROI (Return on Investment) - dalam implementasi nyata, ini akan memerlukan biaya kampanye
    const campaignCost = campaign.budget || 10000000; // Asumsi biaya kampanye
    stats.roi = parseFloat(((stats.totalRevenue - campaignCost) / campaignCost * 100).toFixed(2));

    return stats;
  } catch (error) {
    console.error('Error getting campaign stats:', error);
    return null;
  }
};

// Fungsi untuk membuat audiens target
export const createTargetAudience = async (audienceData) => {
  try {
    const { data, error } = await supabase
      .from('target_audiences')
      .insert({
        ...audienceData,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    return {
      success: true,
      audienceId: data[0].id,
      message: 'Audiens target berhasil dibuat'
    };
  } catch (error) {
    console.error('Error creating target audience:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk mendapatkan audiens target
export const getTargetAudience = async (audienceId) => {
  try {
    const { data, error } = await supabase
      .from('target_audiences')
      .select('*')
      .eq('id', audienceId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error getting target audience:', error);
    return null;
  }
};

// Fungsi untuk membuat kupon diskon
export const createDiscountCoupon = async (couponData) => {
  try {
    // Validasi data kupon
    if (!couponData.code || !couponData.type || !couponData.value) {
      throw new Error('Data kupon tidak lengkap');
    }

    // Dalam implementasi nyata, ini akan disimpan ke database
    const { data, error } = await supabase
      .from('discount_coupons')
      .insert({
        ...couponData,
        created_at: new Date().toISOString(),
        is_active: true
      });

    if (error) throw error;

    return {
      success: true,
      couponId: data[0].id,
      message: 'Kupon diskon berhasil dibuat'
    };
  } catch (error) {
    console.error('Error creating discount coupon:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk mendapatkan kupon berdasarkan kode
export const getCouponByCode = async (code) => {
  try {
    const { data, error } = await supabase
      .from('discount_coupons')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    // Periksa apakah kupon masih berlaku
    if (data && data.expiry_date && new Date() > new Date(data.expiry_date)) {
      await deactivateCoupon(data.id);
      return null; // Kupon telah kedaluwarsa
    }

    return data;
  } catch (error) {
    console.error('Error getting coupon by code:', error);
    return null;
  }
};

// Fungsi untuk menonaktifkan kupon
export const deactivateCoupon = async (couponId) => {
  try {
    const { error } = await supabase
      .from('discount_coupons')
      .update({ is_active: false })
      .eq('id', couponId);

    if (error) throw error;

    return {
      success: true,
      message: 'Kupon berhasil dinonaktifkan'
    };
  } catch (error) {
    console.error('Error deactivating coupon:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk mendapatkan kupon aktif
export const getActiveCoupons = async () => {
  try {
    const { data, error } = await supabase
      .from('discount_coupons')
      .select('*')
      .eq('is_active', true)
      .gte('expiry_date', new Date().toISOString());

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error getting active coupons:', error);
    return [];
  }
};

// Fungsi untuk membuat kampanye promosi berbasis AI
export const createAIPersonalizedCampaign = async (campaignData) => {
  try {
    // Ambil informasi pengguna untuk personalisasi
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select(`
        id, 
        email, 
        full_name,
        created_at
      `)
      .limit(1000); // Batasi jumlah pengguna untuk efisiensi

    if (usersError) throw usersError;

    // Dalam implementasi nyata, kita akan menganalisis perilaku pengguna
    // dan membuat konten yang dipersonalisasi berdasarkan data tersebut
    const personalizedData = users.map(user => {
      // Simulasi data personalisasi
      const userBehavior = {
        lastVisit: new Date(user.created_at).toISOString(),
        preferredCategory: ['sofa', 'meja', 'lemari'][Math.floor(Math.random() * 3)],
        avgOrderValue: Math.floor(Math.random() * 5000000) + 1000000,
        frequency: Math.floor(Math.random() * 10) + 1
      };

      return {
        userId: user.id,
        email: user.email,
        name: user.full_name,
        personalization: userBehavior
      };
    });

    // Simpan informasi kampanye personalisasi
    const { data: campaign, error: campaignError } = await supabase
      .from('ai_campaigns')
      .insert({
        ...campaignData,
        created_at: new Date().toISOString(),
        status: 'processing',
        target_users_count: personalizedData.length
      });

    if (campaignError) throw campaignError;

    // Dalam implementasi nyata, kita akan meneruskan data ini ke model AI
    // untuk menghasilkan konten yang dipersonalisasi
    console.log(`Kampanye personalisasi AI dibuat untuk ${personalizedData.length} pengguna`);

    return {
      success: true,
      campaignId: campaign[0].id,
      targetUsersCount: personalizedData.length,
      message: 'Kampanye personalisasi AI berhasil dibuat'
    };
  } catch (error) {
    console.error('Error creating AI personalized campaign:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk menjadwalkan kampanye
export const scheduleCampaign = async (campaignId, scheduledTime) => {
  try {
    const { error } = await supabase
      .from('marketing_campaigns')
      .update({ 
        scheduled_at: scheduledTime,
        status: 'scheduled'
      })
      .eq('id', campaignId);

    if (error) throw error;

    // Dalam implementasi nyata, ini akan terhubung ke sistem penjadwalan
    console.log(`Kampanye ${campaignId} dijadwalkan untuk berjalan pada ${scheduledTime}`);

    return {
      success: true,
      message: 'Kampanye berhasil dijadwalkan'
    };
  } catch (error) {
    console.error('Error scheduling campaign:', error);
    return { success: false, message: error.message };
  }
};