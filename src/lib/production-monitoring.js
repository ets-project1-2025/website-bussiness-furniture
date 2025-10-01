// src/lib/production-monitoring.js
// Sistem monitoring & logging produksi untuk WIDI Furniture

// Fungsi untuk menginisialisasi monitoring
export const initProductionMonitoring = () => {
  console.log('Menginisialisasi sistem monitoring produksi...');

  // Inisialisasi error tracking (dengan Sentry atau layanan serupa)
  initErrorTracking();

  // Pasang event listener untuk pelacakan performa
  initPerformanceTracking();

  // Pasang event listener untuk pelacakan error
  initErrorMonitoring();

  // Pasang event listener untuk pelacakan penggunaan
  initUsageTracking();

  console.log('Sistem monitoring produksi telah diinisialisasi');
};

// Fungsi untuk menginisialisasi pelacakan error
const initErrorTracking = () => {
  if (typeof window !== 'undefined') {
    // Simulasi inisialisasi Sentry atau layanan error tracking
    // Dalam implementasi nyata:
    // import * as Sentry from "@sentry/browser";
    // Sentry.init({ dsn: import.meta.env.SENTRY_DSN });

    // Untuk simulasi, kita gunakan console.error dengan tambahan metadata
    const originalConsoleError = console.error;
    console.error = function(...args) {
      // Kirim error ke layanan monitoring
      sendErrorToMonitoring(args);
      // Tetap tampilkan di konsol
      originalConsoleError.apply(console, args);
    };
  }
};

// Fungsi untuk menginisialisasi pelacakan performa
const initPerformanceTracking = () => {
  if ('PerformanceObserver' in window) {
    // Lacak Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      sendPerformanceMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Lacak Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });

    // Kirim CLS saat page visibility berubah
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendPerformanceMetric('CLS', clsValue);
      }
    }, { once: true });
  }
};

// Fungsi untuk menginisialisasi monitoring error
const initErrorMonitoring = () => {
  // Tangani error yang tidak tertangani
  window.addEventListener('error', (event) => {
    sendErrorToMonitoring({
      message: event.error?.message || event.message,
      stack: event.error?.stack,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      type: 'javascript_error'
    });
  });

  // Tangani promise rejection yang tidak tertangani
  window.addEventListener('unhandledrejection', (event) => {
    sendErrorToMonitoring({
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack,
      type: 'promise_rejection'
    });
  });
};

// Fungsi untuk menginisialisasi pelacakan penggunaan
const initUsageTracking = () => {
  // Lacak halaman yang dikunjungi
  if (typeof window !== 'undefined') {
    let currentPage = location.pathname;
    const updatePage = () => {
      if (location.pathname !== currentPage) {
        sendPageView(location.pathname);
        currentPage = location.pathname;
      }
    };

    // Gunakan MutationObserver atau polling untuk mendeteksi perubahan URL
    // Dalam implementasi nyata dengan framework routing
    setInterval(updatePage, 500);
  }
};

// Fungsi untuk mengirim error ke layanan monitoring
const sendErrorToMonitoring = (errorData) => {
  if (typeof window === 'undefined') return; // Hanya di sisi klien

  // Simpan error ke localStorage untuk dikirim nanti jika network offline
  const errorQueue = JSON.parse(localStorage.getItem('errorQueue') || '[]');
  errorQueue.push({
    ...errorData,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  });

  // Batasi jumlah error di antrian
  if (errorQueue.length > 100) {
    errorQueue.shift(); // Hapus error tertua
  }

  localStorage.setItem('errorQueue', JSON.stringify(errorQueue));

  // Kirim error segera jika mungkin
  sendQueuedErrors();
};

// Fungsi untuk mengirim error yang antri
const sendQueuedErrors = async () => {
  if (typeof navigator === 'undefined' || !navigator.onLine) return;

  const errorQueue = JSON.parse(localStorage.getItem('errorQueue') || '[]');
  if (errorQueue.length === 0) return;

  try {
    // Dalam implementasi nyata, kirim ke layanan monitoring
    // await fetch('/api/error-logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorQueue)
    // });

    // Simulasi pengiriman
    console.log('Mengirim', errorQueue.length, 'error ke layanan monitoring');
    
    // Kosongkan antrian setelah berhasil dikirim
    localStorage.removeItem('errorQueue');
  } catch (error) {
    console.error('Gagal mengirim error ke layanan monitoring:', error);
    // Error akan tetap di antrian untuk dikirim nanti
  }
};

// Fungsi untuk mengirim metrik performa
const sendPerformanceMetric = (metricName, value) => {
  if (typeof window === 'undefined') return; // Hanya di sisi klien

  // Simulasi pengiriman metrik performa
  console.log(`Metrik performa: ${metricName} = ${value}ms`);

  // Dalam implementasi nyata:
  // fetch('/api/performance-logs', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     metricName,
  //     value,
  //     timestamp: new Date().toISOString(),
  //     userAgent: navigator.userAgent,
  //     url: window.location.href
  //   })
  // }).catch(err => console.error('Gagal mengirim metrik performa:', err));
};

// Fungsi untuk mengirim view halaman
const sendPageView = (pagePath) => {
  if (typeof window === 'undefined') return; // Hanya di sisi klien

  // Simulasi pengiriman page view
  console.log(`Page view: ${pagePath}`);

  // Dalam implementasi nyata:
  // fetch('/api/analytics/page-view', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     pagePath,
  //     timestamp: new Date().toISOString(),
  //     userAgent: navigator.userAgent,
  //     referrer: document.referrer
  //   })
  // }).catch(err => console.error('Gagal mengirim page view:', err));
};

// Fungsi untuk mencatat log aplikasi
export const logAppEvent = (level, message, meta = {}) => {
  const logEntry = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location.href : 'server'
  };

  // Simpan ke localStorage untuk dikirim nanti
  const logQueue = JSON.parse(localStorage.getItem('logQueue') || '[]');
  logQueue.push(logEntry);

  // Batasi jumlah log di antrian
  if (logQueue.length > 500) {
    logQueue.shift(); // Hapus log tertua
  }

  localStorage.setItem('logQueue', JSON.stringify(logQueue));

  // Kirim log segera jika mungkin
  sendQueuedLogs();

  // Tampilkan di konsol berdasarkan level
  switch (level) {
    case 'error':
      console.error('[APP ERROR]', message, meta);
      break;
    case 'warn':
      console.warn('[APP WARN]', message, meta);
      break;
    case 'info':
      console.info('[APP INFO]', message, meta);
      break;
    case 'debug':
      console.debug('[APP DEBUG]', message, meta);
      break;
    default:
      console.log('[APP LOG]', message, meta);
  }
};

// Fungsi untuk mengirim log yang antri
const sendQueuedLogs = async () => {
  if (typeof navigator === 'undefined' || !navigator.onLine) return;

  const logQueue = JSON.parse(localStorage.getItem('logQueue') || '[]');
  if (logQueue.length === 0) return;

  try {
    // Dalam implementasi nyata, kirim ke layanan logging
    console.log('Mengirim', logQueue.length, 'log ke layanan logging');
    
    // Kosongkan antrian setelah berhasil dikirim
    localStorage.removeItem('logQueue');
  } catch (error) {
    console.error('Gagal mengirim log ke layanan logging:', error);
    // Log akan tetap di antrian untuk dikirim nanti
  }
};

// Fungsi untuk membuat snapshot kesehatan aplikasi
export const getApplicationHealth = async () => {
  try {
    const healthData = {
      timestamp: new Date().toISOString(),
      uptime: typeof performance !== 'undefined' ? performance.now() : 0,
      memory: typeof performance !== 'undefined' && performance.memory ? {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      } : null,
      connection: typeof navigator !== 'undefined' ? {
        onLine: navigator.onLine,
        effectiveType: navigator.connection?.effectiveType,
        downlink: navigator.connection?.downlink
      } : null,
      errorsInQueue: JSON.parse(localStorage.getItem('errorQueue') || '[]').length,
      logsInQueue: JSON.parse(localStorage.getItem('logQueue') || '[]').length
    };

    return healthData;
  } catch (error) {
    console.error('Gagal mendapatkan kesehatan aplikasi:', error);
    return null;
  }
};

// Fungsi untuk mengirim laporan kesehatan secara berkala
export const startHealthReporting = (interval = 300000) => { // Default setiap 5 menit
  setInterval(async () => {
    const healthData = await getApplicationHealth();
    if (healthData) {
      // Dalam implementasi nyata, kirim ke layanan monitoring
      console.log('Laporan kesehatan aplikasi:', healthData);
      
      // Kirim ke layanan monitoring
      // fetch('/api/health-report', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(healthData)
      // }).catch(err => console.error('Gagal mengirim laporan kesehatan:', err));
    }
  }, interval);
};

// Fungsi untuk menginisialisasi semua fitur monitoring
export const setupMonitoring = () => {
  initProductionMonitoring();
  startHealthReporting();
  
  // Kirim log awal
  logAppEvent('info', 'Sistem monitoring telah diinisialisasi');
};