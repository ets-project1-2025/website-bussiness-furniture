// src/lib/notifications.js
// Fungsi-fungsi untuk sistem notifikasi

// Fungsi untuk menampilkan notifikasi sukses
export const showSuccessNotification = (message, duration = 5000) => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    createNotification(message, 'success', duration);
  } else {
    console.log(`[SUCCESS] ${message}`);
  }
};

// Fungsi untuk menampilkan notifikasi error
export const showErrorNotification = (message, duration = 7000) => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    createNotification(message, 'error', duration);
  } else {
    console.error(`[ERROR] ${message}`);
  }
};

// Fungsi untuk menampilkan notifikasi peringatan
export const showWarningNotification = (message, duration = 6000) => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    createNotification(message, 'warning', duration);
  } else {
    console.warn(`[WARNING] ${message}`);
  }
};

// Fungsi untuk menampilkan notifikasi info
export const showInfoNotification = (message, duration = 5000) => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    createNotification(message, 'info', duration);
  } else {
    console.info(`[INFO] ${message}`);
  }
};

// Fungsi internal untuk membuat elemen notifikasi
const createNotification = (message, type, duration) => {
  // Hapus notifikasi yang sudah ada jika ada
  const existingNotification = document.getElementById('widi-notifications');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Buat container untuk notifikasi
  const container = document.createElement('div');
  container.id = 'widi-notifications';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `;

  // Tentukan warna berdasarkan tipe notifikasi
  let bgColor, textColor;
  switch (type) {
    case 'success':
      bgColor = '#4ade80'; // hijau muda
      textColor = '#15803d'; // hijau tua
      break;
    case 'error':
      bgColor = '#f87171'; // merah muda
      textColor = '#b91c1c'; // merah tua
      break;
    case 'warning':
      bgColor = '#fbbf24'; // kuning
      textColor = '#92400e'; // oranye tua
      break;
    case 'info':
      bgColor = '#93c5fd'; // biru muda
      textColor = '#1d4ed8'; // biru tua
      break;
    default:
      bgColor = '#9ca3af'; // abu-abu
      textColor = '#374151'; // abu-abu tua
  }

  // Buat elemen notifikasi
  const notification = document.createElement('div');
  notification.className = 'widi-notification';
  notification.style.cssText = `
    background-color: ${bgColor};
    color: ${textColor};
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-width: 400px;
    min-width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: fadeInRight 0.3s ease, fadeOut 0.5s ease ${duration/1000}s forwards;
  `;

  // Tambahkan pesan
  const messageElement = document.createElement('span');
  messageElement.textContent = message;
  messageElement.style.cssText = `
    flex-grow: 1;
    margin-right: 12px;
  `;

  // Tambahkan tombol tutup
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.style.cssText = `
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${textColor};
    padding: 0;
    margin: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  closeButton.onclick = () => {
    notification.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  };

  notification.appendChild(messageElement);
  notification.appendChild(closeButton);
  container.appendChild(notification);

  document.body.appendChild(container);

  // Hapus notifikasi setelah durasi
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }
  }, duration);
};

// Tambahkan animasi ke dalam style
if (typeof document !== 'undefined' && !document.querySelector('#widi-notifications-style')) {
  const style = document.createElement('style');
  style.id = 'widi-notifications-style';
  style.textContent = `
    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        visibility: hidden;
      }
    }
  `;
  document.head.appendChild(style);
}