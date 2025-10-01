// src/lib/integrations.js
// Fungsi-fungsi untuk integrasi dengan layanan eksternal

// Konfigurasi untuk layanan eksternal
const integrationsConfig = {
  shipping: {
    apiKey: import.meta.env.PUBLIC_SHIPPING_API_KEY || '',
    baseUrl: import.meta.env.PUBLIC_SHIPPING_API_URL || 'https://api.shipping-provider.com'
  },
  payment: {
    apiKey: import.meta.env.PUBLIC_PAYMENT_API_KEY || '',
    baseUrl: import.meta.env.PUBLIC_PAYMENT_API_URL || 'https://api.payment-gateway.com'
  }
};

// Fungsi untuk mendapatkan estimasi biaya pengiriman
export const getShippingEstimate = async (destination, items) => {
  try {
    // Validasi konfigurasi
    if (!integrationsConfig.shipping.apiKey) {
      console.warn('Shipping API key not configured');
      // Dalam implementasi nyata, Anda mungkin ingin mengembalikan biaya pengiriman default
      return { cost: 0, estimatedDays: 5, provider: 'Default Shipping' };
    }

    // Format data untuk dikirim ke layanan eksternal
    const shippingData = {
      destination: destination,
      items: items.map(item => ({
        id: item.id,
        weight: item.weight || 1, // dalam kg
        length: item.dimensions?.length || 10, // dalam cm
        width: item.dimensions?.width || 10,
        height: item.dimensions?.height || 10
      }))
    };

    // Simulasikan panggilan API ke layanan pengiriman
    // Dalam implementasi nyata, ini akan menjadi panggilan fetch ke layanan eksternal
    const response = {
      cost: calculateShippingCost(destination, items),
      estimatedDays: calculateEstimatedDays(destination),
      provider: 'WIDI Express'
    };

    return response;
  } catch (error) {
    console.error('Error getting shipping estimate:', error);
    // Kembalikan nilai default jika terjadi error
    return { cost: 0, estimatedDays: 5, provider: 'Default Shipping' };
  }
};

// Fungsi untuk membuat pembayaran
export const processPayment = async (orderData, paymentMethod) => {
  try {
    // Validasi konfigurasi
    if (!integrationsConfig.payment.apiKey) {
      console.error('Payment API key not configured');
      throw new Error('Payment gateway not configured');
    }

    // Format data pembayaran
    const paymentData = {
      amount: orderData.total_amount,
      currency: 'IDR',
      order_id: orderData.id,
      customer: {
        id: orderData.user_id,
        name: orderData.shipping_name,
        email: orderData.shipping_email,
        phone: orderData.shipping_phone
      },
      items: orderData.order_items.map(item => ({
        id: item.product_id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price
      })),
      payment_method: paymentMethod,
      billing_address: orderData.billing_address,
      shipping_address: orderData.shipping_address
    };

    // Simulasikan panggilan API ke gateway pembayaran
    // Dalam implementasi nyata, ini akan menjadi panggilan fetch ke layanan pembayaran
    const response = {
      success: true,
      transaction_id: generateTransactionId(),
      status: 'pending',
      redirect_url: paymentMethod === 'bank_transfer' 
        ? `/pembayaran/bank-transfer/${orderData.id}` 
        : paymentMethod === 'e_wallet' 
          ? `/pembayaran/e-wallet/${orderData.id}`
          : null
    };

    return response;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan status pembayaran
export const getPaymentStatus = async (transactionId) => {
  try {
    // Simulasikan panggilan API untuk mengecek status pembayaran
    // Dalam implementasi nyata, ini akan menjadi panggilan fetch ke layanan pembayaran
    const status = Math.random() > 0.2 ? 'completed' : Math.random() > 0.5 ? 'pending' : 'failed';
    
    return {
      transaction_id: transactionId,
      status: status,
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

// Fungsi bantu untuk menghitung biaya pengiriman
const calculateShippingCost = (destination, items) => {
  // Dalam implementasi nyata, ini akan menggunakan API dari layanan pengiriman
  // Untuk sekarang, kita buat simulasi sederhana
  
  // Biaya dasar
  let cost = 15000;
  
  // Tambahkan biaya berdasarkan berat
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  cost += totalWeight * 5000;
  
  // Tambahkan biaya berdasarkan jarak (simulasi)
  if (destination.province === 'Papua' || destination.province === 'Maluku') {
    cost += 100000; // Biaya tambahan untuk daerah timur
  } else if (destination.province === 'Kalimantan' || destination.province === 'Sulawesi') {
    cost += 50000; // Biaya tambahan untuk daerah tengah
  }
  
  // Tambahkan biaya berdasarkan ukuran
  items.forEach(item => {
    if (item.dimensions) {
      const volume = (item.dimensions.length || 10) * 
                     (item.dimensions.width || 10) * 
                     (item.dimensions.height || 10);
      if (volume > 10000) { // Jika volume > 10.000 cm3
        cost += 25000; // Biaya tambahan untuk barang besar
      }
    }
  });
  
  return cost;
};

// Fungsi bantu untuk menghitung estimasi hari
const calculateEstimatedDays = (destination) => {
  // Dalam implementasi nyata, ini akan menggunakan API dari layanan pengiriman
  // Untuk sekarang, kita buat simulasi sederhana
  
  if (destination.province === 'Papua' || destination.province === 'Maluku') {
    return 10; // Pengiriman ke daerah timur
  } else if (destination.province === 'Kalimantan' || destination.province === 'Sulawesi') {
    return 7; // Pengiriman ke daerah tengah
  } else if (destination.city.includes('Jakarta') || destination.city.includes('Surabaya')) {
    return 2; // Pengiriman ke kota besar
  } else {
    return 5; // Standar
  }
};

// Fungsi bantu untuk menghasilkan ID transaksi
const generateTransactionId = () => {
  return 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};