// src/lib/monitoring.js
// Sistem monitoring kinerja untuk WIDI Furniture

// Fungsi untuk mengukur waktu eksekusi
export const measureTime = (fn, label = 'Operation') => {
  return async (...args) => {
    const start = performance.now();
    try {
      const result = await fn(...args);
      const end = performance.now();
      const duration = end - start;
      
      console.log(`${label} took ${duration.toFixed(2)} milliseconds`);
      
      // Kirim data ke layanan monitoring
      sendPerformanceMetric(label, duration);
      
      return result;
    } catch (error) {
      const end = performance.now();
      const duration = end - start;
      console.error(`${label} failed after ${duration.toFixed(2)} milliseconds`, error);
      
      // Kirim data ke layanan monitoring
      sendPerformanceMetric(label, duration, true);
      
      throw error;
    }
  };
};

// Fungsi untuk mengukur kinerja halaman
export const measurePageLoad = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    if (perfData) {
      const metrics = {
        pageLoadTime: perfData.loadEventEnd - perfData.loadEventStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        firstContentfulPaint: getFCP(),
        largestContentfulPaint: getLCP(),
        cumulativeLayoutShift: getCLS()
      };
      
      console.log('Page Load Metrics:', metrics);
      sendPageLoadMetrics(metrics);
    }
  });
};

// Fungsi untuk mendapatkan FCP (First Contentful Paint)
const getFCP = () => {
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          observer.disconnect();
          resolve(entry.startTime);
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });
  });
};

// Fungsi untuk mendapatkan LCP (Largest Contentful Paint)
const getLCP = () => {
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      observer.disconnect();
      resolve(lastEntry.startTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  });
};

// Fungsi untuk mendapatkan CLS (Cumulative Layout Shift)
const getCLS = () => {
  return new Promise(resolve => {
    let clsValue = 0;
    const entries = [];

    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.hadRecentInput) continue;
        
        entries.push(entry);
        clsValue += entry.value;
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Tunggu hingga akhir sesi untuk mendapatkan nilai akhir
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        observer.disconnect();
        resolve(clsValue);
      }
    }, { once: true });
  });
};

// Fungsi untuk mengukur penggunaan memori
export const measureMemoryUsage = () => {
  if (typeof performance !== 'undefined' && performance.memory) {
    const memoryInfo = performance.memory;
    const metrics = {
      usedJSHeapSize: Math.round(memoryInfo.usedJSHeapSize / 1048576), // dalam MB
      totalJSHeapSize: Math.round(memoryInfo.totalJSHeapSize / 1048576),
      jsHeapSizeLimit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576),
      percentageUsed: Math.round((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100)
    };
    
    console.log('Memory Usage Metrics:', metrics);
    return metrics;
  }
  
  return null; // Tidak tersedia di semua browser
};

// Fungsi untuk mengukur penggunaan jaringan
export const measureNetworkUsage = () => {
  if (typeof performance !== 'undefined') {
    const navigationEntries = performance.getEntriesByType('navigation');
    const resourceEntries = performance.getEntriesByType('resource');
    
    const metrics = {
      totalRequests: navigationEntries.length + resourceEntries.length,
      navigationRequest: navigationEntries[0]?.transferSize || 0,
      totalResourceSize: resourceEntries.reduce((total, entry) => total + (entry.transferSize || 0), 0),
      largestResource: Math.max(...resourceEntries.map(e => e.transferSize || 0), 0)
    };
    
    console.log('Network Usage Metrics:', metrics);
    return metrics;
  }
  
  return null;
};

// Fungsi untuk mengirim metrik kinerja ke layanan monitoring
export const sendPerformanceMetric = (metricName, value, isError = false) => {
  // Dalam implementasi nyata, kirim ke layanan seperti Sentry, DataDog, dll
  if (typeof window !== 'undefined' && 'fetch' in window) {
    // Simulasi pengiriman ke layanan monitoring
    const metricData = {
      timestamp: new Date().toISOString(),
      metricName,
      value,
      isError,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Hanya log ke konsol dalam contoh ini
    console.log('Sending performance metric:', metricData);
    
    // Dalam implementasi nyata, uncomment baris berikut:
    // fetch('/api/performance-metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metricData)
    // }).catch(err => console.error('Failed to send metric:', err));
  }
};

// Fungsi untuk mengirim metrik kinerja halaman
export const sendPageLoadMetrics = (metrics) => {
  // Dalam implementasi nyata, kirim ke layanan monitoring
  if (typeof window !== 'undefined' && 'fetch' in window) {
    const metricData = {
      timestamp: new Date().toISOString(),
      metrics,
      userAgent: navigator.userAgent,
      url: window.location.href,
      page: window.location.pathname
    };
    
    // Hanya log ke konsol dalam contoh ini
    console.log('Sending page load metrics:', metricData);
    
    // Dalam implementasi nyata, uncomment baris berikut:
    // fetch('/api/page-load-metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metricData)
    // }).catch(err => console.error('Failed to send page load metrics:', err));
  }
};

// Fungsi untuk mengukur waktu respon pengguna
export const measureUserInteraction = (element, eventType = 'click') => {
  element.addEventListener(eventType, (event) => {
    const start = performance.now();
    
    // Schedul pengecekan setelah event selesai diproses
    setTimeout(() => {
      const end = performance.now();
      const duration = end - start;
      
      console.log(`User interaction ${eventType} took ${duration.toFixed(2)} milliseconds`);
      sendPerformanceMetric(`user_interaction_${eventType}`, duration);
    }, 0);
  });
};

// Fungsi untuk menginisialisasi monitoring kinerja
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Ukur kinerja halaman
  measurePageLoad();
  
  // Ukur penggunaan memori secara berkala
  setInterval(() => {
    const memoryMetrics = measureMemoryUsage();
    if (memoryMetrics && memoryMetrics.percentageUsed > 80) {
      console.warn('High memory usage detected:', memoryMetrics);
      sendPerformanceMetric('high_memory_usage', memoryMetrics.percentageUsed, true);
    }
  }, 30000); // Cek setiap 30 detik
  
  // Ukur penggunaan jaringan saat diminta
  window.addEventListener('beforeunload', () => {
    const networkMetrics = measureNetworkUsage();
    if (networkMetrics) {
      sendPerformanceMetric('network_usage', networkMetrics.totalResourceSize);
    }
  });
};