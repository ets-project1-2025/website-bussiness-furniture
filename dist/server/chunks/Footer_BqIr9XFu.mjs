import { e as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getCurrentUser } from './auth_DlBTwayV.mjs';
import { c as createSupabaseClient } from './supabase_Cmeg_PNw.mjs';

// src/lib/cart.js

// Fungsi untuk mendapatkan item keranjang berdasarkan user ID
const getCartItems = async (userId) => {
  if (!userId) {
    // Jika tidak ada userId, coba ambil dari localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  // Buat client Supabase
  const supabase = createSupabaseClient();
  
  // Periksa apakah client Supabase tersedia
  if (!supabase) {
    console.warn('Supabase client not available. Using fallback from localStorage.');
    // Jika client tidak tersedia, kembalikan dari localStorage sebagai fallback
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  // Ambil dari database untuk pengguna terotentikasi
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products(*, product_images(*))
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching cart items:', error);
    // Jika terjadi error, kembalikan dari localStorage sebagai fallback
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  // Format data agar konsisten dengan struktur sebelumnya
  return data.map(item => ({
    ...item.product,
    quantity: item.quantity,
    cart_item_id: item.id // ID dari item keranjang
  }));
};

// Fungsi untuk menghapus item dari keranjang
const removeFromCart = async (userId, productId) => {
  if (!userId) {
    // Jika tidak ada userId, hapus dari localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      const cart = await getCartItems(userId);
      const updatedCart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    }
    return [];
  }

  // Buat client Supabase
  const supabase = createSupabaseClient();
  
  // Periksa apakah client Supabase tersedia
  if (!supabase) {
    console.warn('Supabase client not available. Removing from local storage.');
    // Jika client tidak tersedia, hapus dari localStorage sebagai fallback
    if (typeof window !== 'undefined') {
      const cart = await getCartItems(userId);
      const updatedCart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    }
    return [];
  }

  // Hapus dari database untuk pengguna terotentikasi
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }

  return await getCartItems(userId);
};

// Fungsi untuk memperbarui jumlah item di keranjang
const updateCartItemQuantity = async (userId, productId, quantity) => {
  if (!userId) {
    // Jika tidak ada userId, perbarui di localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      const cart = await getCartItems(userId);
      const item = cart.find(item => item.id === productId);
      
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          return removeFromCart(userId, productId);
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
    return [];
  }

  // Buat client Supabase
  const supabase = createSupabaseClient();
  
  // Periksa apakah client Supabase tersedia
  if (!supabase) {
    console.warn('Supabase client not available. Updating local storage.');
    // Jika client tidak tersedia, perbarui di localStorage sebagai fallback
    if (typeof window !== 'undefined') {
      const cart = await getCartItems(userId);
      const item = cart.find(item => item.id === productId);
      
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          return removeFromCart(userId, productId);
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
    return [];
  }

  // Perbarui di database untuk pengguna terotentikasi
  if (quantity > 0) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .select(`
        *,
        product:products(*, product_images(*))
      `)
      .single();

    if (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }

    // Format data agar konsisten
    return [{
      ...data.product,
      quantity: data.quantity,
      cart_item_id: data.id
    }]; // Kembalikan dalam bentuk array untuk konsistensi
  } else {
    return removeFromCart(userId, productId);
  }
};

// Fungsi untuk mengosongkan keranjang
const clearCart = async (userId) => {
  if (!userId) {
    // Jika tidak ada userId, kosongkan localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      return [];
    }
    return [];
  }

  // Buat client Supabase
  const supabase = createSupabaseClient();
  
  // Periksa apakah client Supabase tersedia
  if (!supabase) {
    console.warn('Supabase client not available. Clearing local storage.');
    // Jika client tidak tersedia, kosongkan localStorage sebagai fallback
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      return [];
    }
    return [];
  }

  // Kosongkan database untuk pengguna terotentikasi
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }

  return [];
};

// Fungsi untuk menghitung total item di keranjang
const getCartItemCount = async (userId) => {
  const cartItems = await getCartItems(userId);
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Fungsi untuk menghitung total harga di keranjang
const getCartTotal = async (userId) => {
  const cartItems = await getCartItems(userId);
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// src/lib/language.js
// File ini berisi fungsi-fungsi terkait manajemen bahasa

// Fungsi untuk memeriksa apakah kode berjalan di lingkungan browser
const isBrowser = () => typeof window !== 'undefined';

// Fungsi untuk mendapatkan bahasa yang sedang aktif
const getCurrentLanguage = () => {
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
const changeLanguage = (lang) => {
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
const getLanguageLabel = (langCode) => {
  const labels = {
    'id': 'Indonesia',
    'en': 'English'
  };
  
  return labels[langCode] || langCode;
};

// src/lib/i18n.js
// File ini menyimpan terjemahan untuk berbagai bahasa

const translations = {
  id: {
    // Terjemahan bahasa Indonesia
    'home': 'Beranda',
    'products': 'Produk',
    'about': 'Tentang',
    'contact': 'Kontak',
    'login': 'Masuk',
    'register': 'Daftar',
    'logout': 'Keluar',
    'profile': 'Profil',
    'wishlist': 'Wishlist',
    'cart': 'Keranjang',
    'search': 'Cari',
    'shop_the_look': 'Shop the Look',
    'admin_panel': 'Panel Admin',
    'welcome': 'Selamat datang di WIDI Furniture',
    'latest_products': 'Produk Terbaru',
    'view_all': 'Lihat Semua',
    'add_to_cart': 'Tambah ke Keranjang',
    'add_to_wishlist': 'Tambah ke Wishlist',
    'remove_from_wishlist': 'Hapus dari Wishlist',
    'buy_now': 'Beli Sekarang',
    'description': 'Deskripsi',
    'specifications': 'Spesifikasi',
    'reviews': 'Ulasan',
    'related_products': 'Produk Terkait',
    'your_cart': 'Keranjang Anda',
    'cart_summary': 'Ringkasan Keranjang',
    'total': 'Total',
    'checkout': 'Checkout',
    'continue_shopping': 'Lanjutkan Belanja',
    'empty_cart': 'Keranjang Anda kosong',
    'empty_wishlist': 'Wishlist Anda kosong',
    'product_added_to_cart': 'Produk telah ditambahkan ke keranjang',
    'product_removed_from_wishlist': 'Produk telah dihapus dari wishlist',
    'product_added_to_wishlist': 'Produk telah ditambahkan ke wishlist',
    'language': 'Bahasa',
    'indonesian': 'Indonesia',
    'english': 'Inggris',
    'customer_service': 'Layanan Pelanggan',
    'follow_us': 'Ikuti Kami',
    'copyright': 'Hak Cipta',
    'all_rights_reserved': 'Semua Hak Dilindungi',
    'contact_info': 'Informasi Kontak',
    'address': 'Alamat',
    'email': 'Email',
    'phone': 'Telepon',
    'business_hours': 'Jam Operasional',
    'customer_care': 'Layanan Pelanggan',
    'shipping_returns': 'Pengiriman & Pengembalian',
    'privacy_policy': 'Kebijakan Privasi',
    'terms_conditions': 'Syarat & Ketentuan',
    'my_account': 'Akun Saya',
    'my_orders': 'Pesanan Saya',
    'my_wishlist': 'Wishlist Saya',
    'account_settings': 'Pengaturan Akun',
    'first_name': 'Nama Depan',
    'last_name': 'Nama Belakang',
    'full_name': 'Nama Lengkap',
    'password': 'Kata Sandi',
    'confirm_password': 'Konfirmasi Kata Sandi',
    'forgot_password': 'Lupa Kata Sandi',
    'reset_password': 'Reset Kata Sandi',
    'verification': 'Verifikasi',
    'account_verification': 'Verifikasi Akun',
    'resend_verification': 'Kirim Ulang Verifikasi',
    'already_have_account': 'Sudah memiliki akun?',
    'dont_have_account': 'Belum memiliki akun?',
    'sign_in': 'Masuk',
    'sign_up': 'Daftar',
    'remember_me': 'Ingat Saya',
    'or_continue_with': 'Atau lanjutkan dengan',
    'home_page': 'Halaman Utama',
    'product_details': 'Detail Produk',
    'quantity': 'Jumlah',
    'in_stock': 'Tersedia',
    'out_of_stock': 'Habis',
    'add_to_compare': 'Tambahkan untuk Dibandingkan',
    'size_chart': 'Ukuran',
    'delivery': 'Pengiriman',
    'secure_payment': 'Pembayaran Aman',
    'returns': 'Pengembalian',
    'faq': 'Pertanyaan Umum',
    'about_us': 'Tentang Kami',
    'our_story': 'Cerita Kami',
    'our_mission': 'Misi Kami',
    'our_vision': 'Visi Kami',
    'our_values': 'Nilai Kami',
    'sustainability': 'Keberlanjutan',
    'care_guide': 'Petunjuk Perawatan',
    'assembly_guide': 'Petunjuk Perakitan',
    'warranty': 'Garansi',
    'size_guide': 'Petunjuk Ukuran',
    'color_guide': 'Petunjuk Warna',
    'design_services': 'Layanan Desain',
    'room_planning': 'Perencanaan Ruangan',
    'custom_furniture': 'Furnitur Kustom',
    'project_showcase': 'Proyek Kami',
    'blog': 'Blog',
    'news': 'Berita',
    'events': 'Acara',
    'careers': 'Karir',
    'press': 'Pers',
    'awards': 'Penghargaan',
    'testimonials': 'Testimoni',
    'reviews_and_ratings': 'Ulasan & Penilaian',
    'verified_purchases': 'Pembelian Terverifikasi',
    'submit_review': 'Kirim Ulasan',
    'overall_rating': 'Nilai Keseluruhan',
    'quality': 'Kualitas',
    'value': 'Nilai',
    'design': 'Desain',
    'ease_of_assembly': 'Kemudahan Perakitan',
    'customer_service': 'Layanan Pelanggan',
    'install_app': 'Pasang Aplikasi',
    'install_app_message': 'Pasang aplikasi kami untuk pengalaman belanja yang lebih baik',
    'install': 'Pasang',
    'close': 'Tutup'
  },
  en: {
    // Terjemahan bahasa Inggris
    'home': 'Home',
    'products': 'Products',
    'about': 'About',
    'contact': 'Contact',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'profile': 'Profile',
    'wishlist': 'Wishlist',
    'cart': 'Cart',
    'search': 'Search',
    'shop_the_look': 'Shop the Look',
    'admin_panel': 'Admin Panel',
    'welcome': 'Welcome to WIDI Furniture',
    'latest_products': 'Latest Products',
    'view_all': 'View All',
    'add_to_cart': 'Add to Cart',
    'add_to_wishlist': 'Add to Wishlist',
    'remove_from_wishlist': 'Remove from Wishlist',
    'buy_now': 'Buy Now',
    'description': 'Description',
    'specifications': 'Specifications',
    'reviews': 'Reviews',
    'related_products': 'Related Products',
    'your_cart': 'Your Cart',
    'cart_summary': 'Cart Summary',
    'total': 'Total',
    'checkout': 'Checkout',
    'continue_shopping': 'Continue Shopping',
    'empty_cart': 'Your cart is empty',
    'empty_wishlist': 'Your wishlist is empty',
    'product_added_to_cart': 'Product added to cart',
    'product_removed_from_wishlist': 'Product removed from wishlist',
    'product_added_to_wishlist': 'Product added to wishlist',
    'language': 'Language',
    'indonesian': 'Indonesian',
    'english': 'English',
    'customer_service': 'Customer Service',
    'follow_us': 'Follow Us',
    'copyright': 'Copyright',
    'all_rights_reserved': 'All Rights Reserved',
    'contact_info': 'Contact Info',
    'address': 'Address',
    'email': 'Email',
    'phone': 'Phone',
    'business_hours': 'Business Hours',
    'customer_care': 'Customer Care',
    'shipping_returns': 'Shipping & Returns',
    'privacy_policy': 'Privacy Policy',
    'terms_conditions': 'Terms & Conditions',
    'my_account': 'My Account',
    'my_orders': 'My Orders',
    'my_wishlist': 'My Wishlist',
    'account_settings': 'Account Settings',
    'first_name': 'First Name',
    'last_name': 'Last Name',
    'full_name': 'Full Name',
    'password': 'Password',
    'confirm_password': 'Confirm Password',
    'forgot_password': 'Forgot Password',
    'reset_password': 'Reset Password',
    'verification': 'Verification',
    'account_verification': 'Account Verification',
    'resend_verification': 'Resend Verification',
    'already_have_account': 'Already have an account?',
    'dont_have_account': 'Don\'t have an account?',
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'remember_me': 'Remember Me',
    'or_continue_with': 'Or continue with',
    'home_page': 'Home Page',
    'product_details': 'Product Details',
    'quantity': 'Quantity',
    'in_stock': 'In Stock',
    'out_of_stock': 'Out of Stock',
    'add_to_compare': 'Add to Compare',
    'size_chart': 'Size Chart',
    'delivery': 'Delivery',
    'secure_payment': 'Secure Payment',
    'returns': 'Returns',
    'faq': 'FAQ',
    'about_us': 'About Us',
    'our_story': 'Our Story',
    'our_mission': 'Our Mission',
    'our_vision': 'Our Vision',
    'our_values': 'Our Values',
    'sustainability': 'Sustainability',
    'care_guide': 'Care Guide',
    'assembly_guide': 'Assembly Guide',
    'warranty': 'Warranty',
    'size_guide': 'Size Guide',
    'color_guide': 'Color Guide',
    'design_services': 'Design Services',
    'room_planning': 'Room Planning',
    'custom_furniture': 'Custom Furniture',
    'project_showcase': 'Project Showcase',
    'blog': 'Blog',
    'news': 'News',
    'events': 'Events',
    'careers': 'Careers',
    'press': 'Press',
    'awards': 'Awards',
    'testimonials': 'Testimoni',
    'reviews_and_ratings': 'Reviews & Ratings',
    'verified_purchases': 'Verified Purchases',
    'submit_review': 'Submit Review',
    'overall_rating': 'Overall Rating',
    'quality': 'Quality',
    'value': 'Value',
    'design': 'Design',
    'ease_of_assembly': 'Ease of Assembly',
    'customer_service': 'Customer Service',
    'install_app': 'Install App',
    'install_app_message': 'Install our app for a better shopping experience',
    'install': 'Install',
    'close': 'Close'
  }
};

// Fungsi untuk mendapatkan terjemahan berdasarkan kunci dan bahasa
const t = (key, lang = null) => {
  const currentLang = lang || getCurrentLanguage();
  const langTranslations = translations[currentLang] || translations.id;
  return langTranslations[key] || key;
};

const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  let user = null;
  let cartCount = 0;
  try {
    user = await getCurrentUser();
    const userId = user ? user.id : null;
    cartCount = await getCartItemCount(userId);
  } catch (error) {
    console.error("Error checking user or fetching cart count:", error);
  }
  const currentLang = getCurrentLanguage();
  const otherLang = currentLang === "id" ? "en" : "id";
  const langLabel = getLanguageLabel(currentLang);
  const otherLangLabel = getLanguageLabel(otherLang);
  return renderTemplate`${maybeRenderHead()}<header class="bg-[var(--furniture-brown)] text-white py-4 px-6 shadow-md"> <div class="container mx-auto flex flex-wrap justify-between items-center"> <div class="flex items-center space-x-2 mb-2 md:mb-0"> <h1 class="text-2xl font-bold">WIDI Furniture</h1> <p class="text-[var(--furniture-cream)] text-sm hidden md:block">Furniture Modern yang Mewah dan Alami</p> </div> <nav class="hidden md:flex space-x-6 mb-2 md:mb-0"> <a href="/" class="hover:text-[var(--furniture-cream)] transition-colors">${t("home")}</a> <a href="/produk" class="hover:text-[var(--furniture-cream)] transition-colors">${t("products")}</a> <a href="/lookbook" class="hover:text-[var(--furniture-cream)] transition-colors">${t("shop_the_look")}</a> <a href="/tentang" class="hover:text-[var(--furniture-cream)] transition-colors">${t("about")}</a> <a href="/kontak" class="hover:text-[var(--furniture-cream)] transition-colors">${t("contact")}</a> </nav> <div class="flex items-center space-x-4"> <div class="relative group"> <button class="flex items-center space-x-1 focus:outline-none"> <span>${langLabel}</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </button> <div class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50"> <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"${addAttribute((e) => {
    e.preventDefault();
    changeLanguage(otherLang);
  }, "onClick")}> ${otherLangLabel} </a> </div> </div> <a href="/keranjang" class="relative"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path> </svg> <span class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">${cartCount}</span> </a> <a href="/akun" class="ml-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path> </svg> </a> </div> <button class="md:hidden text-white"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path> </svg> </button> </div> </header>`;
}, "/workspaces/website-bussiness-furniture/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-[var(--furniture-light-brown)] text-[var(--furniture-brown)] py-8 px-6"> <div class="container mx-auto"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8"> <div> <h3 class="text-lg font-semibold mb-4">WIDI Furniture</h3> <p class="text-sm">Furniture modern yang menggabungkan desain elegan dengan kualitas terbaik untuk rumah dan kantor Anda.</p> </div> <div> <h3 class="text-lg font-semibold mb-4">Tautan Cepat</h3> <ul class="space-y-2"> <li><a href="/" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Beranda</a></li> <li><a href="/produk" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Produk</a></li> <li><a href="/lookbook" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Lookbook</a></li> <li><a href="/tentang" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Tentang Kami</a></li> <li><a href="/kontak" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Kontak</a></li> </ul> </div> <div> <h3 class="text-lg font-semibold mb-4">Kategori Produk</h3> <ul class="space-y-2"> <li><a href="/produk#ruang-tamu" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Ruang Tamu</a></li> <li><a href="/produk#ruang-tidur" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Ruang Tidur</a></li> <li><a href="/produk#ruang-makan" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Ruang Makan</a></li> <li><a href="/produk#kantor" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Furniture Kantor</a></li> <li><a href="/produk#outdoor" class="hover:text-[var(--furniture-brown)]/70 transition-colors">Furniture Outdoor</a></li> </ul> </div> <div> <h3 class="text-lg font-semibold mb-4">Kontak Kami</h3> <ul class="space-y-2"> <li class="flex items-start"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> <span>+62 812-3456-7890</span> </li> <li class="flex items-start"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> <span>info@widifurniture.com</span> </li> <li class="flex items-start"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span>Jl. Furniture No. 123, Jakarta Selatan</span> </li> </ul> </div> </div> <div class="border-t border-[var(--furniture-brown)]/30 mt-8 pt-6 text-center text-sm"> <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} WIDI Furniture. Hak Cipta Dilindungi.</p> </div> </div> </footer>`;
}, "/workspaces/website-bussiness-furniture/src/components/Footer.astro", void 0);

export { $$Header as $, $$Footer as a, getCartTotal as b, clearCart as c, getCartItemCount as d, getCartItems as g, removeFromCart as r, updateCartItemQuantity as u };
