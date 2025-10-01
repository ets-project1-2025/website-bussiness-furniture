// src/lib/logging.js
// Sistem logging dan monitoring untuk WIDI Furniture

// Konfigurasi tingkat log
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

// Konfigurasi awal
const config = {
  level: process.env.LOG_LEVEL || 'INFO',
  enabled: process.env.LOG_ENABLED !== 'false',
  logToConsole: process.env.LOG_TO_CONSOLE !== 'false',
  logToFile: process.env.LOG_TO_FILE === 'true',
  logFilePath: process.env.LOG_FILE_PATH || './logs/app.log'
};

// Fungsi untuk mencatat log
const log = (level, message, meta = {}) => {
  if (!config.enabled || LOG_LEVELS[level] < LOG_LEVELS[config.level]) {
    return;
  }

  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    meta
  };

  // Tampilkan di konsol jika diaktifkan
  if (config.logToConsole) {
    const consoleMessage = `[${timestamp}] ${level}: ${message}`;
    switch (level) {
      case 'ERROR':
        console.error(consoleMessage, meta);
        break;
      case 'WARN':
        console.warn(consoleMessage, meta);
        break;
      case 'INFO':
        console.info(consoleMessage, meta);
        break;
      case 'DEBUG':
        console.debug(consoleMessage, meta);
        break;
      default:
        console.log(consoleMessage, meta);
    }
  }

  // Simpan ke file jika diaktifkan (dalam implementasi nyata)
  if (config.logToFile) {
    // Dalam lingkungan browser, kita tidak dapat menyimpan langsung ke file
    // Di sini kita hanya mencontohkan bagaimana log akan disimpan
    console.log('Log akan disimpan ke file:', logEntry);
  }

  // Kirim ke layanan monitoring eksternal (misalnya Sentry, LogRocket)
  // Dalam implementasi nyata, ini akan dikirim ke layanan eksternal
  sendToMonitoringService(logEntry);
};

// Fungsi untuk mengirim log ke layanan monitoring eksternal
const sendToMonitoringService = (logEntry) => {
  // Dalam implementasi nyata, ini akan mengirim log ke layanan eksternal
  // seperti Sentry, LogRocket, atau layanan logging lainnya
  if (typeof window !== 'undefined' && 'fetch' in window) {
    // Hanya jalankan di lingkungan klien
    // Simulasi pengiriman ke layanan monitoring
    console.log('Kirim log ke layanan monitoring:', logEntry);
  }
};

// Fungsi-fungsi log spesifik
export const debug = (message, meta) => log('DEBUG', message, meta);
export const info = (message, meta) => log('INFO', message, meta);
export const warn = (message, meta) => log('WARN', message, meta);
export const error = (message, meta) => log('ERROR', message, meta);

// Fungsi untuk menangkap error dan mencatatnya
export const captureException = (error, context = {}) => {
  error('Error captured', {
    message: error.message,
    stack: error.stack,
    ...context
  });
};

// Fungsi untuk menangkap promise rejection
export const captureUnhandledRejections = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
      error('Unhandled promise rejection', {
        reason: event.reason,
        promise: event.promise
      });
    });
  }
};

// Fungsi untuk konfigurasi logging
export const configureLogging = (newConfig) => {
  Object.assign(config, newConfig);
  info('Logging configuration updated', config);
};