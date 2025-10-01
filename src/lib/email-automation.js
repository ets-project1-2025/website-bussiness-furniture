// src/lib/email-automation.js
// Sistem otomatisasi email marketing untuk WIDI Furniture

// Template email untuk berbagai skenario
const emailTemplates = {
  welcome: {
    subject: 'Selamat Datang di WIDI Furniture!',
    body: (userName) => `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #8B4513;">Halo ${userName || 'Pelanggan'},</h1>
            <p>Terima kasih telah bergabung dengan WIDI Furniture! Kami sangat senang Anda menjadi bagian dari komunitas kami.</p>
            <p>Sebagai anggota baru, Anda sekarang memiliki akses eksklusif ke:</p>
            <ul>
              <li>Promo anggota pertama: Diskon 15% untuk pembelian pertama Anda</li>
              <li>Pembaruan produk terbaru</li>
              <li>Insight desain interior</li>
            </ul>
            <p>Gunakan kode <strong>WELCOME15</strong> saat checkout untuk mendapatkan diskon Anda.</p>
            <p style="margin-top: 30px;">
              <a href="https://widifurniture.com" style="background-color: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Mulai Belanja</a>
            </p>
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Hormat kami,<br>
              Tim WIDI Furniture
            </p>
          </div>
        </body>
      </html>
    `
  },
  
  abandonedCart: {
    subject: 'Anda meninggalkan sesuatu di keranjang Anda',
    body: (userName, cartItems) => `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #8B4513;">Halo ${userName || 'Pelanggan'},</h1>
            <p>Kami melihat Anda meninggalkan beberapa item yang menarik di keranjang belanja Anda:</p>
            <ul>
              ${cartItems.map(item => `<li>${item.name} - Rp ${Number(item.price).toLocaleString('id-ID')}</li>`).join('')}
            </ul>
            <p>Anda mungkin terburu-buru atau menemukan harga yang membuat ragu. Kami ingin mengingatkan bahwa stok terbatas dan item favorit Anda mungkin tidak akan bertahan lama.</p>
            <p style="margin-top: 30px;">
              <a href="https://widifurniture.com/keranjang" style="background-color: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Lanjutkan Pembelian</a>
            </p>
            <p style="margin-top: 20px; font-size: 14px;">
              Jika Anda memerlukan bantuan atau informasi tambahan tentang produk kami, jangan ragu untuk menghubungi tim layanan pelanggan kami.
            </p>
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Hormat kami,<br>
              Tim WIDI Furniture
            </p>
          </div>
        </body>
      </html>
    `
  },
  
  orderConfirmation: {
    subject: 'Konfirmasi Pesanan - ${orderId}',
    body: (userName, order) => `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #8B4513;">Terima kasih atas pesanan Anda, ${userName || 'Pelanggan'}!</h1>
            <p>Pesanan Anda dengan ID <strong>#${order.id.substring(0, 8)}</strong> telah kami terima dan sedang diproses.</p>
            <p><strong>Detail Pesanan:</strong></p>
            <ul>
              ${order.items.map(item => `<li>${item.name} x${item.quantity} - Rp ${Number(item.price * item.quantity).toLocaleString('id-ID')}</li>`).join('')}
            </ul>
            <p><strong>Total: Rp ${Number(order.total_amount).toLocaleString('id-ID')}</strong></p>
            <p>Estimasi pengiriman: 3-5 hari kerja untuk Jabodetabek, 7-14 hari kerja untuk luar Jabodetabek.</p>
            <p>Anda dapat melacak status pesanan Anda di <a href="https://widifurniture.com/akun/pesanan">halaman akun</a> Anda.</p>
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Hormat kami,<br>
              Tim WIDI Furniture
            </p>
          </div>
        </body>
      </html>
    `
  },
  
  newsletter: {
    subject: 'Koleksi Terbaru dari WIDI Furniture',
    body: (userName) => `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #8B4513;">Halo ${userName || 'Pelanggan'},</h1>
            <p>Kami hadir kembali dengan koleksi terbaru furnitur eksklusif yang menggabungkan desain modern dengan kehangatan alami kayu.</p>
            <p>Dalam edisi ini, Anda akan menemukan:</p>
            <ul>
              <li>Koleksi sofa minimalis dengan bahan premium</li>
              <li>Meja makan desain skandinavia</li>
              <li>Lemari multifungsi untuk ruang terbatas</li>
            </ul>
            <p>Sebagai pelanggan setia, nikmati diskon spesial 20% untuk pembelian dalam minggu ini!</p>
            <p style="margin-top: 30px;">
              <a href="https://widifurniture.com/produk" style="background-color: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Lihat Koleksi Baru</a>
            </p>
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Hormat kami,<br>
              Tim WIDI Furniture
            </p>
          </div>
        </body>
      </html>
    `
  }
};

// Fungsi untuk mengirim email
export const sendEmail = async (emailData) => {
  try {
    // Dalam implementasi nyata, ini akan menggunakan layanan email seperti SendGrid, Mailgun, atau AWS SES
    console.log('Mengirim email ke:', emailData.to);
    console.log('Subjek:', emailData.subject);
    console.log('Isi:', emailData.body.substring(0, 100) + '...');
    
    // Simulasi pengiriman email
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, messageId: 'msg_' + Date.now() });
      }, 1000 + Math.random() * 2000); // Simulasikan waktu pengiriman
    });
  } catch (error) {
    console.error('Gagal mengirim email:', error);
    return { success: false, error: error.message };
  }
};

// Fungsi untuk mengirim email selamat datang
export const sendWelcomeEmail = async (userEmail, userName) => {
  const template = emailTemplates.welcome;
  const emailData = {
    to: userEmail,
    subject: template.subject,
    body: template.body(userName)
  };
  
  return await sendEmail(emailData);
};

// Fungsi untuk mengirim email keranjang yang ditinggalkan
export const sendAbandonedCartEmail = async (userEmail, userName, cartItems) => {
  if (cartItems.length === 0) return { success: false, error: 'Tidak ada item di keranjang' };
  
  const template = emailTemplates.abandonedCart;
  const emailData = {
    to: userEmail,
    subject: template.subject,
    body: template.body(userName, cartItems)
  };
  
  return await sendEmail(emailData);
};

// Fungsi untuk mengirim email konfirmasi pesanan
export const sendOrderConfirmationEmail = async (userEmail, userName, order) => {
  const template = emailTemplates.orderConfirmation;
  const emailData = {
    to: userEmail,
    subject: template.subject.replace('${orderId}', order.id.substring(0, 8)),
    body: template.body(userName, order)
  };
  
  return await sendEmail(emailData);
};

// Fungsi untuk mengirim newsletter
export const sendNewsletter = async (subscribers, subjectOverride = null) => {
  const template = emailTemplates.newsletter;
  const results = [];
  
  for (const subscriber of subscribers) {
    const emailData = {
      to: subscriber.email,
      subject: subjectOverride || template.subject,
      body: template.body(subscriber.name)
    };
    
    const result = await sendEmail(emailData);
    results.push({ email: subscriber.email, result });
  }
  
  return results;
};

// Fungsi untuk mengelola daftar langganan
export const manageSubscription = async (email, action) => {
  try {
    // Dalam implementasi nyata, ini akan berinteraksi dengan database langganan
    if (action === 'subscribe') {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email, subscribed_at: new Date().toISOString() });
      
      if (error) throw error;
      console.log(`Email ${email} telah berlangganan newsletter`);
      return { success: true, message: 'Berhasil berlangganan' };
    } else if (action === 'unsubscribe') {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('email', email);
      
      if (error) throw error;
      console.log(`Email ${email} telah berhenti berlangganan`);
      return { success: true, message: 'Berhasil berhenti berlangganan' };
    } else {
      return { success: false, message: 'Aksi tidak valid' };
    }
  } catch (error) {
    console.error('Gagal mengelola langganan:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk menjadwalkan pengiriman email
export const scheduleEmail = async (emailData, sendTime) => {
  try {
    const delay = sendTime.getTime() - new Date().getTime();
    
    if (delay <= 0) {
      // Jika waktu sudah lewat, kirim segera
      return await sendEmail(emailData);
    }
    
    // Dalam implementasi nyata, ini akan menyimpan ke antrian pengiriman
    console.log(`Email dijadwalkan untuk dikirim pada: ${sendTime}`);
    console.log('Data email:', emailData);
    
    // Simulasi penjadwalan
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await sendEmail(emailData);
        resolve(result);
      }, delay);
    });
  } catch (error) {
    console.error('Gagal menjadwalkan email:', error);
    return { success: false, error: error.message };
  }
};

// Fungsi untuk membuat kampanye email otomatis
export const createAutomatedCampaign = async (campaignData) => {
  try {
    // Dalam implementasi nyata, ini akan menyimpan ke database dan mengaktifkan sistem otomatisasi
    console.log('Membuat kampanye email otomatis:', campaignData);
    
    // Simulasi pembuatan kampanye
    const campaignId = 'camp_' + Date.now();
    
    // Dalam implementasi nyata, kita akan menyimpan ini ke database
    // dan membuat sistem untuk mengelola kampanye ini
    return {
      success: true,
      campaignId,
      message: 'Kampanye email berhasil dibuat'
    };
  } catch (error) {
    console.error('Gagal membuat kampanye email:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk mendapatkan statistik email
export const getEmailStats = async (campaignId = null) => {
  try {
    // Dalam implementasi nyata, ini akan mengambil dari database
    // atau layanan email untuk mendapatkan statistik
    const stats = {
      totalSent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      conversionRate: 0,
      revenueGenerated: 0
    };
    
    // Simulasi data statistik
    if (campaignId) {
      // Data fiktif untuk kampanye tertentu
      stats.totalSent = 10000;
      stats.delivered = 9500;
      stats.opened = 4200;
      stats.clicked = 1100;
      stats.bounced = 500;
      stats.unsubscribed = 45;
      stats.conversionRate = 3.2;
      stats.revenueGenerated = 25000000;
    } else {
      // Data agregat dari semua kampanye
      stats.totalSent = 50000;
      stats.delivered = 47500;
      stats.opened = 21000;
      stats.clicked = 5500;
      stats.bounced = 2500;
      stats.unsubscribed = 225;
      stats.conversionRate = 2.8;
      stats.revenueGenerated = 125000000;
    }
    
    return stats;
  } catch (error) {
    console.error('Gagal mendapatkan statistik email:', error);
    return null;
  }
};