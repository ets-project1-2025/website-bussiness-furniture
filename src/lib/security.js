// src/lib/security.js
// Fungsi-fungsi keamanan untuk WIDI Furniture

// Fungsi untuk membersihkan input pengguna dari potensi XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }

  // Hapus tag HTML dan karakter berbahaya
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Fungsi untuk memvalidasi email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fungsi untuk memvalidasi password
export const validatePassword = (password) => {
  // Setidaknya 8 karakter, setidaknya satu huruf besar, satu huruf kecil, dan satu angka
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Fungsi untuk memvalidasi nomor telepon
export const validatePhone = (phone) => {
  // Hanya angka dan format internasional
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, '').replace(/\-/g, ''));
};

// Fungsi untuk memvalidasi nama
export const validateName = (name) => {
  // Hanya huruf, spasi, tanda hubung, dan apostrof
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  return nameRegex.test(name) && name.trim().length > 0;
};

// Fungsi untuk menghasilkan token CSRF
export const generateCSRFToken = () => {
  if (typeof window !== 'undefined') {
    // Di sisi klien, kita bisa menggunakan crypto API
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  } else {
    // Di sisi server, kita bisa menggunakan library crypto
    // Kita gunakan implementasi sederhana untuk contoh
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
};

// Fungsi untuk memvalidasi token CSRF
export const validateCSRFToken = (token, expectedToken) => {
  return token && expectedToken && token === expectedToken;
};

// Fungsi untuk mendeteksi serangan SQL Injection sederhana
export const detectSQLInjection = (input) => {
  if (typeof input !== 'string') {
    return false;
  }

  const sqlPatterns = [
    /(\%27)|(\')|(--)|(\%23)|(#)/gi, // Komentar SQL
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/gi, // Eksploitasi SQL
    /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/gi, // Union-based SQL injection
    /((\%27)|(\'))union/gi // Union-based SQL injection
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
};

// Fungsi untuk memvalidasi input dari potensi serangan
export const validateInput = (input, type) => {
  if (typeof input !== 'string') {
    return { valid: false, message: 'Input harus berupa string' };
  }

  // Deteksi potensi serangan
  if (detectSQLInjection(input)) {
    return { valid: false, message: 'Input mengandung potensi serangan SQL Injection' };
  }

  switch (type) {
    case 'email':
      if (!validateEmail(input)) {
        return { valid: false, message: 'Format email tidak valid' };
      }
      break;
    case 'password':
      if (!validatePassword(input)) {
        return { valid: false, message: 'Password tidak memenuhi kriteria keamanan' };
      }
      break;
    case 'phone':
      if (!validatePhone(input)) {
        return { valid: false, message: 'Format nomor telepon tidak valid' };
      }
      break;
    case 'name':
      if (!validateName(input)) {
        return { valid: false, message: 'Format nama tidak valid' };
      }
      break;
    default:
      break;
  }

  return { valid: true, message: 'Input valid' };
};

// Fungsi untuk mengenkripsi data sensitif sederhana di sisi klien (BUKAN untuk digunakan di produksi)
export const simpleEncrypt = (text, key = 'widi-furniture-key') => {
  if (typeof window === 'undefined') {
    // Di sisi server, kita tidak menyimpan data sensitif
    return text;
  }

  // Ini hanya enkripsi sederhana, BUKAN untuk data kritis di produksi
  // Untuk produksi, gunakan enkripsi sebenarnya seperti SubtleCrypto API
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result); // Encode ke base64
};

// Fungsi untuk mendekripsi data sensitif sederhana di sisi klien (BUKAN untuk digunakan di produksi)
export const simpleDecrypt = (encryptedText, key = 'widi-furniture-key') => {
  if (typeof window === 'undefined') {
    return encryptedText;
  }

  // Ini hanya dekripsi sederhana, BUKAN untuk data kritis di produksi
  try {
    const text = atob(encryptedText); // Decode dari base64
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (e) {
    return encryptedText; // Jika gagal, kembalikan teks asli
  }
};