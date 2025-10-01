// src/lib/language.js
// File ini berisi fungsi-fungsi terkait manajemen bahasa

// Fungsi untuk memeriksa apakah kode berjalan di lingkungan browser
const isBrowser = () => typeof window !== 'undefined';

// Fungsi untuk mendapatkan bahasa yang sedang aktif
export const getCurrentLanguage = () => {
  // Dalam implementasi nyata, Anda bisa mendapatkan bahasa dari:
  // 1. Parameter URL
  // 2. Cookie
  // 3. LocalStorage
  // 4. Preferensi browser
  // Untuk sekarang, kita gunakan bahasa Indonesia sebagai default
  
  if (isBrowser()) {
    // Contoh ambil dari localStorage
    const lang = localStorage.getItem('lang') || 'id';
    return lang;
  }
  
  // Jika di lingkungan server, kembalikan default
  return 'id';
};

// Fungsi untuk mengganti bahasa
export const changeLanguage = (lang) => {
  if (!isBrowser()) {
    console.warn('Fungsi changeLanguage hanya bisa digunakan di lingkungan browser');
    return;
  }
  
  // Validasi bahasa
  const validLangs = ['id', 'en'];
  if (!validLangs.includes(lang)) {
    console.error(`Bahasa ${lang} tidak didukung`);
    return;
  }
  
  // Simpan preferensi bahasa ke localStorage
  localStorage.setItem('lang', lang);
  
  // Refresh halaman untuk menerapkan perubahan bahasa
  window.location.reload();
};

// Fungsi untuk mendapatkan label bahasa
export const getLanguageLabel = (langCode) => {
  const labels = {
    'id': 'Indonesia',
    'en': 'English'
  };
  
  return labels[langCode] || langCode;
};

// Fungsi untuk mengganti bahasa tanpa refresh (untuk penggunaan di komponen React)
export const changeLanguageNoRefresh = (lang, setLang) => {
  if (!isBrowser()) {
    console.warn('Fungsi changeLanguageNoRefresh hanya bisa digunakan di lingkungan browser');
    return;
  }
  
  // Validasi bahasa
  const validLangs = ['id', 'en'];
  if (!validLangs.includes(lang)) {
    console.error(`Bahasa ${lang} tidak didukung`);
    return;
  }
  
  // Simpan preferensi bahasa ke localStorage
  localStorage.setItem('lang', lang);
  
  // Panggil setter state jika disediakan
  if (setLang && typeof setLang === 'function') {
    setLang(lang);
  }
};