// src/lib/optimization.js
// Fungsi-fungsi optimasi untuk WIDI Furniture

// Fungsi untuk menghasilkan URL gambar yang dioptimasi
export const optimizeImage = (imageUrl, width = null, height = null, quality = 80) => {
  if (!imageUrl) return imageUrl;

  // Jika URL sudah dari CDN yang mendukung optimasi (misalnya, Cloudinary, Imgix)
  // kita tambahkan parameter optimasi
  try {
    const url = new URL(imageUrl);
    
    // Contoh untuk Cloudinary
    if (url.hostname.includes('cloudinary')) {
      let transformation = `f_auto,q_${quality}`;
      if (width) transformation += `,w_${width}`;
      if (height) transformation += `,h_${height},c_fill`;
      
      // Masukkan transformasi ke dalam path URL
      const pathParts = url.pathname.split('/');
      const publicIdIndex = pathParts.findIndex(part => part === 'upload') + 1;
      if (publicIdIndex > 0) {
        pathParts.splice(publicIdIndex, 0, transformation);
        url.pathname = pathParts.join('/');
      }
    }
    // Tambahkan kasus untuk layanan optimasi gambar lainnya
    else if (url.hostname.includes('res.cloudinary.com')) {
      // Format Cloudinary: /upload/[transformations]/[public_id]
      const pathParts = url.pathname.split('/');
      const uploadIndex = pathParts.indexOf('upload');
      if (uploadIndex !== -1) {
        let transformation = `f_auto,q_${quality}`;
        if (width) transformation += `,w_${width}`;
        if (height) transformation += `,h_${height},c_fill`;
        
        pathParts.splice(uploadIndex + 1, 0, transformation);
        url.pathname = pathParts.join('/');
      }
    } 
    else {
      // Jika bukan layanan optimasi gambar, kita tambahkan parameter kueri sederhana
      if (width) url.searchParams.set('w', width);
      if (height) url.searchParams.set('h', height);
      url.searchParams.set('q', quality);
    }
    
    return url.toString();
  } catch (error) {
    console.warn('Gagal mengoptimasi gambar:', error);
    return imageUrl; // Kembalikan URL asli jika tidak bisa di-parse
  }
};

// Fungsi untuk mendapatkan ukuran gambar yang dioptimasi berdasarkan perangkat
export const getOptimizedImageSize = (context = 'default') => {
  const width = window.innerWidth;
  
  switch (context) {
    case 'product_thumbnail':
      if (width < 768) return { width: 150, height: 150 };
      if (width < 1024) return { width: 200, height: 200 };
      return { width: 300, height: 300 };
      
    case 'product_detail':
      if (width < 768) return { width: 300, height: 300 };
      if (width < 1024) return { width: 400, height: 400 };
      return { width: 600, height: 600 };
      
    case 'hero_banner':
      if (width < 768) return { width: 400, height: 200 };
      if (width < 1024) return { width: 700, height: 350 };
      return { width: 1200, height: 600 };
      
    default:
      if (width < 768) return { width: 200, height: 200 };
      if (width < 1024) return { width: 300, height: 300 };
      return { width: 400, height: 400 };
  }
};

// Fungsi untuk lazy loading gambar
export const setupLazyLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Jika tidak di browser atau IntersectionObserver tidak didukung
    // gunakan fallback dengan menampilkan semua gambar
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  // Amati semua gambar dengan kelas lazy
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Fungsi untuk mengimplementasikan preloading sumber daya penting
export const preloadResources = (resources) => {
  if (typeof document === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = resource.rel || 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    document.head.appendChild(link);
  });
};

// Fungsi untuk mengoptimasi kueri database (simulasi)
export const optimizeQuery = (baseQuery, options = {}) => {
  const {
    limit = 20,
    offset = 0,
    sortBy = 'created_at',
    sortOrder = 'desc',
    searchTerm = null
  } = options;

  // Tambahkan pagination
  let query = baseQuery;
  query += ` order(${sortBy}, { ascending: ${sortOrder === 'asc'} })`;
  query += ` range(${offset}, ${offset + limit - 1})`;

  // Tambahkan pencarian jika disediakan
  if (searchTerm) {
    query += ` ilike(name, '%${searchTerm}%')`;
  }

  return query;
};

// Fungsi untuk menghitung dan mengoptimasi penggunaan memori
export const getMemoryUsage = () => {
  if (typeof performance !== 'undefined' && performance.memory) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
      percentage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
    };
  }
  return null; // Tidak tersedia di semua browser
};

// Fungsi untuk deferred loading komponen non-kritis
export const deferredLoad = (importFunction, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const module = await importFunction();
      resolve(module);
    }, delay);
  });
};

// Fungsi untuk mengoptimasi loading halaman
export const optimizePageLoad = () => {
  // Nonaktifkan animasi jika perangkat memiliki kinerja rendah
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
  }

  // Setel kualitas gambar berdasarkan koneksi
  if ('connection' in navigator) {
    const conn = navigator.connection;
    if (conn.effectiveType.includes('2g') || conn.downlink < 1) {
      window.imageQuality = 'low'; // Kualitas rendah untuk koneksi lambat
    } else if (conn.effectiveType.includes('3g') || conn.downlink < 2) {
      window.imageQuality = 'medium'; // Kualitas sedang
    } else {
      window.imageQuality = 'high'; // Kualitas tinggi
    }
  } else {
    window.imageQuality = 'medium'; // Default kualitas sedang
  }
};