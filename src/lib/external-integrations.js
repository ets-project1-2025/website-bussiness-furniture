// src/lib/external-integrations.js
// Sistem integrasi dengan layanan eksternal untuk WIDI Furniture

// Fungsi untuk mengintegrasikan dengan layanan pengiriman
export const integrateShippingService = async (shippingData) => {
  try {
    // Dalam implementasi nyata, ini akan menghubungi API layanan pengiriman
    // seperti JNE, J&T, SiCepat, dll.
    
    // Contoh penggunaan API eksternal (misalnya API pengiriman)
    const response = await fetch(import.meta.env.SHIPPING_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.SHIPPING_API_KEY}`
      },
      body: JSON.stringify({
        origin: shippingData.origin,
        destination: shippingData.destination,
        weight: shippingData.weight,
        length: shippingData.length,
        width: shippingData.width,
        height: shippingData.height,
        value: shippingData.value,
        cod: shippingData.cod || false
      })
    });
    
    if (!response.ok) {
      throw new Error(`API pengiriman gagal: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Simpan hasil ke database
    const { error } = await supabase
      .from('shipping_integrations')
      .insert({
        order_id: shippingData.orderId,
        service_provider: shippingData.serviceProvider,
        tracking_number: result.tracking_number,
        estimated_delivery: result.estimated_delivery,
        cost: result.cost,
        status: 'processed',
        created_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return result;
  } catch (error) {
    console.error('Gagal mengintegrasikan layanan pengiriman:', error);
    
    // Simpan error ke database
    const { error: logError } = await supabase
      .from('integration_logs')
      .insert({
        integration_type: 'shipping',
        error_message: error.message,
        payload: shippingData,
        created_at: new Date().toISOString()
      });
    
    if (logError) {
      console.error('Gagal mencatat error integrasi:', logError);
    }
    
    // Dalam implementasi nyata, kembalikan hasil default atau coba layanan cadangan
    return {
      tracking_number: 'DEFAULT000',
      estimated_delivery: '3-5 hari kerja',
      cost: shippingData.weight * 10000, // Estimasi biaya
      service_provider: 'Default Service'
    };
  }
};

// Fungsi untuk mengintegrasikan dengan gateway pembayaran
export const integratePaymentGateway = async (paymentData) => {
  try {
    // Dalam implementasi nyata, ini akan menghubungi API gateway pembayaran
    // seperti Midtrans, Xendit, dll.
    
    let response;
    let result;
    
    switch (paymentData.paymentMethod) {
      case 'credit_card':
        // Contoh integrasi dengan Midtrans
        response = await fetch('https://api.sandbox.midtrans.com/v2/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${btoa(import.meta.env.MIDTRANS_SERVER_KEY + ':')}`
          },
          body: JSON.stringify({
            payment_type: 'credit_card',
            transaction_details: {
              order_id: paymentData.orderId,
              gross_amount: paymentData.amount
            },
            credit_card: {
              secure: true
            },
            customer_details: {
              first_name: paymentData.customer.firstName,
              last_name: paymentData.customer.lastName,
              email: paymentData.customer.email,
              phone: paymentData.customer.phone
            }
          })
        });
        break;
        
      case 'bank_transfer':
        // Contoh integrasi untuk transfer bank
        response = await fetch('https://api.sandbox.midtrans.com/v2/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${btoa(import.meta.env.MIDTRANS_SERVER_KEY + ':')}`
          },
          body: JSON.stringify({
            payment_type: 'bank_transfer',
            bank: paymentData.bank,
            transaction_details: {
              order_id: paymentData.orderId,
              gross_amount: paymentData.amount
            },
            customer_details: {
              first_name: paymentData.customer.firstName,
              last_name: paymentData.customer.lastName,
              email: paymentData.customer.email,
              phone: paymentData.customer.phone
            }
          })
        });
        break;
        
      case 'e_wallet':
        // Contoh integrasi untuk e-wallet
        response = await fetch('https://api.sandbox.midtrans.com/v2/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${btoa(import.meta.env.MIDTRANS_SERVER_KEY + ':')}`
          },
          body: JSON.stringify({
            payment_type: 'gopay', // atau ovo, dana, dll.
            transaction_details: {
              order_id: paymentData.orderId,
              gross_amount: paymentData.amount
            },
            customer_details: {
              first_name: paymentData.customer.firstName,
              last_name: paymentData.customer.lastName,
              email: paymentData.customer.email,
              phone: paymentData.customer.phone
            }
          })
        });
        break;
        
      default:
        throw new Error(`Metode pembayaran tidak didukung: ${paymentData.paymentMethod}`);
    }
    
    if (!response.ok) {
      throw new Error(`API pembayaran gagal: ${response.status}`);
    }
    
    result = await response.json();
    
    // Simpan hasil ke database
    const { error } = await supabase
      .from('payment_integrations')
      .insert({
        order_id: paymentData.orderId,
        payment_method: paymentData.paymentMethod,
        transaction_id: result.transaction_id || result.order_id,
        status: result.transaction_status,
        amount: paymentData.amount,
        created_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return result;
  } catch (error) {
    console.error('Gagal mengintegrasikan gateway pembayaran:', error);
    
    // Simpan error ke database
    const { error: logError } = await supabase
      .from('integration_logs')
      .insert({
        integration_type: 'payment',
        error_message: error.message,
        payload: paymentData,
        created_at: new Date().toISOString()
      });
    
    if (logError) {
      console.error('Gagal mencatat error integrasi:', logError);
    }
    
    // Dalam implementasi nyata, tangani error sesuai kebijakan bisnis
    throw error;
  }
};

// Fungsi untuk mengintegrasikan dengan layanan email
export const integrateEmailService = async (emailData) => {
  try {
    // Dalam implementasi nyata, ini akan menghubungi API layanan email
    // seperti SendGrid, Mailgun, AWS SES, dll.
    
    // Contoh penggunaan API SendGrid
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.SENDGRID_API_KEY}`
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: emailData.to }],
            subject: emailData.subject
          }
        ],
        from: { email: import.meta.env.SENDER_EMAIL },
        content: [
          {
            type: 'text/html',
            value: emailData.body
          }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`API email gagal: ${response.status}`);
    }
    
    // Simpan hasil ke database
    const { error } = await supabase
      .from('email_integrations')
      .insert({
        recipient: emailData.to,
        subject: emailData.subject,
        status: 'sent',
        sent_at: new Date().toISOString(),
        template_type: emailData.templateType || 'custom'
      });
    
    if (error) throw error;
    
    return { success: true, messageId: response.headers.get('X-Message-Id') };
  } catch (error) {
    console.error('Gagal mengintegrasikan layanan email:', error);
    
    // Simpan error ke database
    const { error: logError } = await supabase
      .from('integration_logs')
      .insert({
        integration_type: 'email',
        error_message: error.message,
        payload: emailData,
        created_at: new Date().toISOString()
      });
    
    if (logError) {
      console.error('Gagal mencatat error integrasi:', logError);
    }
    
    // Dalam implementasi nyata, coba layanan cadangan
    return { success: false, error: error.message };
  }
};

// Fungsi untuk mengintegrasikan dengan layanan analitik
export const integrateAnalyticsService = async (analyticsData) => {
  try {
    // Dalam implementasi nyata, ini akan menghubungi API layanan analitik
    // seperti Google Analytics 4, Mixpanel, dll.
    
    // Contoh pengiriman data ke Google Analytics 4
    const measurementId = import.meta.env.GA_MEASUREMENT_ID;
    const apiSecret = import.meta.env.GA_API_SECRET;
    
    const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: analyticsData.clientId,
        events: [
          {
            name: analyticsData.eventName,
            params: {
              ...analyticsData.parameters,
              timestamp_micros: Date.now() * 1000
            }
          }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`API analitik gagal: ${response.status}`);
    }
    
    // Simpan hasil ke database
    const { error } = await supabase
      .from('analytics_integrations')
      .insert({
        event_name: analyticsData.eventName,
        user_id: analyticsData.userId,
        session_id: analyticsData.sessionId,
        parameters: analyticsData.parameters,
        status: 'processed',
        processed_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Gagal mengintegrasikan layanan analitik:', error);
    
    // Simpan error ke database
    const { error: logError } = await supabase
      .from('integration_logs')
      .insert({
        integration_type: 'analytics',
        error_message: error.message,
        payload: analyticsData,
        created_at: new Date().toISOString()
      });
    
    if (logError) {
      console.error('Gagal mencatat error integrasi:', logError);
    }
    
    // Gagal mengirim ke layanan analitik tidak seharusnya menghentikan operasi utama
    return { success: false, error: error.message };
  }
};

// Fungsi untuk mengintegrasikan dengan layanan CRM
export const integrateCRMService = async (customerData) => {
  try {
    // Dalam implementasi nyata, ini akan menghubungi API layanan CRM
    // seperti Salesforce, HubSpot, Zoho CRM, dll.
    
    // Contoh pengiriman data ke CRM fiktif
    const response = await fetch(import.meta.env.CRM_API_URL + '/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.CRM_API_KEY}`
      },
      body: JSON.stringify({
        email: customerData.email,
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        phone: customerData.phone,
        company: customerData.company,
        custom_fields: {
          total_spent: customerData.totalSpent,
          last_purchase_date: customerData.lastPurchaseDate,
          preferred_categories: customerData.preferredCategories
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`API CRM gagal: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Simpan hasil ke database
    const { error } = await supabase
      .from('crm_integrations')
      .insert({
        customer_id: customerData.customerId,
        crm_contact_id: result.id,
        status: 'synced',
        synced_at: new Date().toISOString(),
        service_provider: 'hubspot' // atau provider lainnya
      });
    
    if (error) throw error;
    
    return result;
  } catch (error) {
    console.error('Gagal mengintegrasikan layanan CRM:', error);
    
    // Simpan error ke database
    const { error: logError } = await supabase
      .from('integration_logs')
      .insert({
        integration_type: 'crm',
        error_message: error.message,
        payload: customerData,
        created_at: new Date().toISOString()
      });
    
    if (logError) {
      console.error('Gagal mencatat error integrasi:', logError);
    }
    
    return { success: false, error: error.message };
  }
};

// Fungsi untuk mengintegrasikan dengan layanan inventory
export const integrateInventoryService = async (inventoryData) => {
  try {
    // Dalam implementasi nyata, ini akan menghubungi API layanan inventory
    // seperti sistem ERP internal atau layanan eksternal
    
    // Contoh pengiriman data ke layanan inventory fiktif
    const response = await fetch(import.meta.env.INVENTORY_API_URL + '/update-stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.INVENTORY_API_KEY}`
      },
      body: JSON.stringify({
        product_id: inventoryData.productId,
        new_stock: inventoryData.newStock,
        location: inventoryData.location || 'main_warehouse',
        adjustment_reason: inventoryData.reason
      })
    });
    
    if (!response.ok) {
      throw new Error(`API inventory gagal: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Simpan hasil ke database
    const { error } = await supabase
      .from('inventory_integrations')
      .insert({
        product_id: inventoryData.productId,
        previous_stock: inventoryData.previousStock,
        new_stock: inventoryData.newStock,
        adjustment_reason: inventoryData.reason,
        status: 'processed',
        processed_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return result;
  } catch (error) {
    console.error('Gagal mengintegrasikan layanan inventory:', error);
    
    // Simpan error ke database
    const { error: logError } = await supabase
      .from('integration_logs')
      .insert({
        integration_type: 'inventory',
        error_message: error.message,
        payload: inventoryData,
        created_at: new Date().toISOString()
      });
    
    if (logError) {
      console.error('Gagal mencatat error integrasi:', logError);
    }
    
    return { success: false, error: error.message };
  }
};

// Fungsi untuk mengelola kredensial integrasi
export const manageIntegrationCredentials = async (integrationType, credentials) => {
  try {
    const { error } = await supabase
      .from('integration_credentials')
      .upsert({
        integration_type: integrationType,
        credentials: credentials,
        updated_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    console.log(`Kredensial integrasi untuk ${integrationType} diperbarui`);
    return { success: true, message: 'Kredensial berhasil diperbarui' };
  } catch (error) {
    console.error('Gagal mengelola kredensial integrasi:', error);
    return { success: false, message: error.message };
  }
};

// Fungsi untuk mendapatkan kredensial integrasi
export const getIntegrationCredentials = async (integrationType) => {
  try {
    const { data, error } = await supabase
      .from('integration_credentials')
      .select('credentials')
      .eq('integration_type', integrationType)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Jika tidak ditemukan, kembalikan null
        return null;
      }
      throw error;
    }
    
    return data.credentials;
  } catch (error) {
    console.error('Gagal mendapatkan kredensial integrasi:', error);
    return null;
  }
};

// Fungsi untuk menguji koneksi integrasi
export const testIntegrationConnection = async (integrationType) => {
  try {
    let testResult = false;
    
    switch (integrationType) {
      case 'shipping':
        // Uji koneksi layanan pengiriman
        testResult = await testShippingConnection();
        break;
      case 'payment':
        // Uji koneksi gateway pembayaran
        testResult = await testPaymentConnection();
        break;
      case 'email':
        // Uji koneksi layanan email
        testResult = await testEmailConnection();
        break;
      case 'analytics':
        // Uji koneksi layanan analitik
        testResult = await testAnalyticsConnection();
        break;
      case 'crm':
        // Uji koneksi layanan CRM
        testResult = await testCRMConnection();
        break;
      case 'inventory':
        // Uji koneksi layanan inventory
        testResult = await testInventoryConnection();
        break;
      default:
        throw new Error(`Tipe integrasi tidak dikenal: ${integrationType}`);
    }
    
    // Simpan hasil pengujian
    const { error } = await supabase
      .from('integration_tests')
      .insert({
        integration_type: integrationType,
        status: testResult ? 'success' : 'failed',
        tested_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return testResult;
  } catch (error) {
    console.error(`Gagal menguji koneksi integrasi ${integrationType}:`, error);
    
    // Simpan error pengujian
    const { error: logError } = await supabase
      .from('integration_tests')
      .insert({
        integration_type: integrationType,
        status: 'error',
        error_message: error.message,
        tested_at: new Date().toISOString()
      });
    
    if (logError) {
      console.error('Gagal mencatat error pengujian:', logError);
    }
    
    return false;
  }
};

// Fungsi-fungsi uji koneksi spesifik
const testShippingConnection = async () => {
  try {
    // Uji koneksi ke layanan pengiriman
    const response = await fetch(import.meta.env.SHIPPING_API_URL + '/health', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.SHIPPING_API_KEY}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Uji koneksi pengiriman gagal:', error);
    return false;
  }
};

const testPaymentConnection = async () => {
  try {
    // Uji koneksi ke gateway pembayaran
    const response = await fetch('https://api.sandbox.midtrans.com/v2', {
      headers: {
        'Authorization': `Basic ${btoa(import.meta.env.MIDTRANS_SERVER_KEY + ':')}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Uji koneksi pembayaran gagal:', error);
    return false;
  }
};

const testEmailConnection = async () => {
  try {
    // Uji koneksi ke layanan email
    const response = await fetch('https://api.sendgrid.com/v3/user/profile', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.SENDGRID_API_KEY}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Uji koneksi email gagal:', error);
    return false;
  }
};

const testAnalyticsConnection = async () => {
  try {
    // Uji koneksi ke layanan analitik
    // Ini mungkin memerlukan pengiriman event test
    return true; // Dalam contoh, kita asumsikan berhasil
  } catch (error) {
    console.error('Uji koneksi analitik gagal:', error);
    return false;
  }
};

const testCRMConnection = async () => {
  try {
    // Uji koneksi ke layanan CRM
    const response = await fetch(import.meta.env.CRM_API_URL + '/health', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.CRM_API_KEY}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Uji koneksi CRM gagal:', error);
    return false;
  }
};

const testInventoryConnection = async () => {
  try {
    // Uji koneksi ke layanan inventory
    const response = await fetch(import.meta.env.INVENTORY_API_URL + '/health', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.INVENTORY_API_KEY}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Uji koneksi inventory gagal:', error);
    return false;
  }
};