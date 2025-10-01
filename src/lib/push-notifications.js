// src/lib/push-notifications.js
// Sistem notifikasi push untuk WIDI Furniture

// Fungsi untuk berlangganan notifikasi push
export const subscribeToPushNotifications = async () => {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Browser tidak mendukung notifikasi push');
    }

    // Dapatkan service worker
    const registration = await navigator.serviceWorker.ready;

    // Berlangganan push
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(import.meta.env.VAPID_PUBLIC_KEY)
    });

    // Simpan langganan ke database
    const { error } = await supabase
      .from('push_subscriptions')
      .insert({
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        user_id: getCurrentUserId(), // Dapatkan ID pengguna saat ini
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    console.log('Berlangganan notifikasi push berhasil');
    return subscription;
  } catch (error) {
    console.error('Gagal berlangganan notifikasi push:', error);
    throw error;
  }
};

// Fungsi untuk berhenti berlangganan notifikasi push
export const unsubscribeFromPushNotifications = async () => {
  try {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service worker tidak tersedia');
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      // Hapus dari database
      const { error } = await supabase
        .from('push_subscriptions')
        .delete()
        .eq('endpoint', subscription.endpoint);

      if (error) throw error;

      // Batalkan langganan
      await subscription.unsubscribe();
      console.log('Berhenti berlangganan notifikasi push berhasil');
      return true;
    }

    return false; // Tidak ada langganan
  } catch (error) {
    console.error('Gagal berhenti berlangganan notifikasi push:', error);
    throw error;
  }
};

// Fungsi untuk mengirim notifikasi push
export const sendPushNotification = async (subscription, payload) => {
  try {
    // Dalam implementasi nyata, ini akan dikirim ke endpoint push yang disediakan oleh browser
    // dan akan diproses oleh service worker
    console.log('Mengirim notifikasi push ke:', subscription.endpoint);
    console.log('Payload:', payload);

    // Simulasi pengiriman
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Notifikasi berhasil dikirim' });
      }, 500);
    });
  } catch (error) {
    console.error('Gagal mengirim notifikasi push:', error);
    throw error;
  }
};

// Fungsi untuk mengirim notifikasi promosi
export const sendPromotionalNotification = async (userId, promotionData) => {
  try {
    // Ambil semua langganan push untuk pengguna
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    // Kirim notifikasi ke setiap langganan
    const results = [];
    for (const subscription of subscriptions) {
      const payload = {
        title: promotionData.title || 'Promo Spesial dari WIDI Furniture',
        body: promotionData.description || 'Nikmati diskon hingga 50% untuk produk pilihan',
        icon: '/icons/notification-icon.png',
        badge: '/icons/badge-icon.png',
        data: {
          url: promotionData.url || '/produk',
          promotionId: promotionData.id
        }
      };

      const result = await sendPushNotification(subscription, payload);
      results.push({ subscriptionId: subscription.id, result });
    }

    return results;
  } catch (error) {
    console.error('Gagal mengirim notifikasi promosi:', error);
    throw error;
  }
};

// Fungsi untuk mengirim notifikasi status pesanan
export const sendOrderStatusNotification = async (userId, orderData) => {
  try {
    // Ambil langganan push untuk pengguna
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    // Tentukan pesan berdasarkan status pesanan
    let title, body;
    switch (orderData.status) {
      case 'confirmed':
        title = 'Pesanan Dikonfirmasi';
        body = `Pesanan #${orderData.id.substring(0, 8)} telah dikonfirmasi dan sedang diproses.`;
        break;
      case 'shipped':
        title = 'Pesanan Dikirim';
        body = `Pesanan #${orderData.id.substring(0, 8)} telah dikirim. Estimasi tiba dalam 3-5 hari kerja.`;
        break;
      case 'delivered':
        title = 'Pesanan Diterima';
        body = `Pesanan #${orderData.id.substring(0, 8)} telah diterima. Terima kasih telah berbelanja di WIDI Furniture.`;
        break;
      default:
        title = 'Status Pesanan Diperbarui';
        body = `Status pesanan #${orderData.id.substring(0, 8)} telah diperbarui menjadi ${orderData.status}.`;
    }

    // Kirim notifikasi ke setiap langganan
    const results = [];
    for (const subscription of subscriptions) {
      const payload = {
        title,
        body,
        icon: '/icons/order-status-icon.png',
        badge: '/icons/badge-icon.png',
        data: {
          url: `/pesanan/${orderData.id}`,
          orderId: orderData.id
        }
      };

      const result = await sendPushNotification(subscription, payload);
      results.push({ subscriptionId: subscription.id, result });
    }

    return results;
  } catch (error) {
    console.error('Gagal mengirim notifikasi status pesanan:', error);
    throw error;
  }
};

// Fungsi untuk mengirim notifikasi produk kembali stok
export const sendRestockNotification = async (userId, productData) => {
  try {
    // Ambil langganan push untuk pengguna
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const payload = {
      title: 'Produk Kembali Tersedia',
      body: `${productData.name} kini kembali tersedia. Segera dapatkan sebelum kehabisan kembali!`,
      icon: productData.image_url || '/icons/product-icon.png',
      badge: '/icons/badge-icon.png',
      data: {
        url: `/produk/${productData.id}`,
        productId: productData.id
      }
    };

    // Kirim notifikasi ke setiap langganan
    const results = [];
    for (const subscription of subscriptions) {
      const result = await sendPushNotification(subscription, payload);
      results.push({ subscriptionId: subscription.id, result });
    }

    return results;
  } catch (error) {
    console.error('Gagal mengirim notifikasi restock:', error);
    throw error;
  }
};

// Fungsi untuk memeriksa apakah browser mendukung notifikasi push
export const isPushSupported = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

// Fungsi untuk meminta izin notifikasi
export const requestPushPermission = () => {
  return new Promise((resolve, reject) => {
    if (!isPushSupported()) {
      reject(new Error('Browser tidak mendukung notifikasi push'));
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        resolve(true);
      } else {
        reject(new Error('Izin notifikasi ditolak'));
      }
    }).catch(err => {
      reject(err);
    });
  });
};

// Fungsi untuk mengonversi VAPID public key
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Fungsi untuk mendapatkan ID pengguna saat ini
const getCurrentUserId = () => {
  // Dalam implementasi nyata, ini akan mendapatkan ID pengguna dari sesi
  // atau token otentikasi
  if (typeof window !== 'undefined') {
    // Misalnya dari localStorage jika menggunakan auth client-side
    const userStr = localStorage.getItem('widi_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id;
    }
  }
  return null;
};

// Fungsi untuk mengirim notifikasi pengingat keranjang
export const sendCartReminderNotification = async (userId) => {
  try {
    // Ambil langganan push untuk pengguna
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const payload = {
      title: 'Jangan Lupa Barang di Keranjang Anda',
      body: 'Anda memiliki barang di keranjang yang belum dibeli. Segera selesaikan pembelian Anda!',
      icon: '/icons/cart-icon.png',
      badge: '/icons/badge-icon.png',
      data: {
        url: '/keranjang'
      }
    };

    // Kirim notifikasi ke setiap langganan
    const results = [];
    for (const subscription of subscriptions) {
      const result = await sendPushNotification(subscription, payload);
      results.push({ subscriptionId: subscription.id, result });
    }

    return results;
  } catch (error) {
    console.error('Gagal mengirim notifikasi pengingat keranjang:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua langganan push untuk pengguna
export const getUserPushSubscriptions = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Gagal mendapatkan langganan push pengguna:', error);
    return [];
  }
};

// Fungsi untuk menghapus langganan push yang tidak valid
export const cleanupInvalidSubscriptions = async () => {
  try {
    // Dalam implementasi nyata, ini akan mencoba mengirim notifikasi uji ke semua langganan
    // dan menghapus yang gagal
    console.log('Membersihkan langganan push yang tidak valid...');

    // Simulasi membersihkan langganan yang lebih dari 30 hari tidak aktif
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .lt('created_at', thirtyDaysAgo.toISOString());

    if (error) throw error;

    console.log('Pembersihan selesai');
    return { success: true, message: 'Pembersihan langganan selesai' };
  } catch (error) {
    console.error('Gagal membersihkan langganan push:', error);
    throw error;
  }
};