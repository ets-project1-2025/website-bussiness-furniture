// src/lib/ai-chatbot.js
// Sistem chatbot pelanggan berbasis AI untuk WIDI Furniture

// Basis pengetahuan sederhana untuk chatbot
const knowledgeBase = {
  greetings: [
    'Halo! Selamat datang di WIDI Furniture. Saya siap membantu Anda.',
    'Hai! Saya asisten virtual WIDI Furniture. Ada yang bisa saya bantu?',
    'Selamat datang di WIDI Furniture! Saya di sini untuk membantu Anda menemukan furnitur impian Anda.'
  ],
  
  about: [
    'WIDI Furniture menyediakan furnitur berkualitas tinggi yang menggabungkan desain modern dengan kehangatan alami kayu.',
    'Sejak 2020, WIDI Furniture berkomitmen untuk menyediakan furnitur berkualitas tinggi dengan desain yang indah.'
  ],
  
  products: [
    'Kami memiliki berbagai jenis furnitur termasuk sofa, meja makan, lemari, tempat tidur, dan furnitur taman.',
    'Produk kami terbuat dari bahan berkualitas tinggi dan didesain oleh tim desainer profesional.',
    'Kami menawarkan berbagai gaya furnitur seperti minimalis, skandinavia, industrial, dan klasik.'
  ],
  
  pricing: [
    'Harga produk kami bervariasi tergantung jenis, bahan, dan ukuran furnitur.',
    'Kami menawarkan harga yang kompetitif dengan kualitas terbaik.',
    'Anda bisa menemukan harga spesifik di halaman masing-masing produk.'
  ],
  
  shipping: [
    'Kami melayani pengiriman ke seluruh Indonesia.',
    'Waktu pengiriman bervariasi tergantung lokasi Anda. Secara umum, pengiriman di Jabodetabek memakan waktu 3-5 hari kerja.',
    'Biaya pengiriman akan dihitung berdasarkan berat produk dan jarak pengiriman.'
  ],
  
  warranty: [
    'Kami memberikan garansi 1 tahun untuk produk-produk kami terhadap cacat produksi.',
    'Garansi mencakup perbaikan atau penggantian produk jika terjadi cacat produksi.',
    'Untuk informasi lebih lanjut tentang syarat dan ketentuan garansi, hubungi tim layanan pelanggan kami.'
  ],
  
  contact: [
    'Anda dapat menghubungi kami melalui halaman kontak di situs web kami.',
    'Email: info@widifurniture.com',
    'Telepon: +62 21 1234 5678',
    'Alamat: Jl. Jendral Sudirman No. 123, Jakarta Selatan, DKI Jakarta, Indonesia'
  ],
  
  custom: [
    'Kami melayani pesanan furnitur khusus sesuai dengan desain dan ukuran yang Anda inginkan.',
    'Silakan hubungi tim desain kami untuk konsultasi dan penawaran harga.',
    'Proses pesanan khusus biasanya memakan waktu 2-4 minggu tergantung tingkat kesulitan.'
  ],
  
  payment: [
    'Kami menerima berbagai metode pembayaran termasuk transfer bank, kartu kredit, dan dompet digital seperti OVO, Dana, dan LinkAja.',
    'Anda juga dapat menggunakan cicilan tanpa bunga untuk pembelian tertentu.'
  ],
  
  default: [
    'Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda mengajukan pertanyaan dalam cara yang berbeda?',
    'Saya tidak yakin bagaimana menjawab itu. Silakan kunjungi halaman kontak kami untuk bantuan lebih lanjut.',
    'Mohon maaf, informasi tersebut tidak tersedia saat ini. Silakan hubungi layanan pelanggan kami.'
  ]
};

// Fungsi untuk memetakan pertanyaan pengguna ke kategori
const categorizeQuestion = (question) => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('halo') || lowerQuestion.includes('hai') || lowerQuestion.includes('haii')) {
    return 'greetings';
  } else if (lowerQuestion.includes('tentang') || lowerQuestion.includes('profil') || lowerQuestion.includes('perusahaan')) {
    return 'about';
  } else if (lowerQuestion.includes('produk') || lowerQuestion.includes('furnitur') || lowerQuestion.includes('kursi') || lowerQuestion.includes('sofa') || lowerQuestion.includes('meja')) {
    return 'products';
  } else if (lowerQuestion.includes('harga') || lowerQuestion.includes('murah') || lowerQuestion.includes('mahal') || lowerQuestion.includes('biaya')) {
    return 'pricing';
  } else if (lowerQuestion.includes('kirim') || lowerQuestion.includes('ongkir') || lowerQuestion.includes('pengiriman') || lowerQuestion.includes('antar')) {
    return 'shipping';
  } else if (lowerQuestion.includes('garansi') || lowerQuestion.includes('warranty')) {
    return 'warranty';
  } else if (lowerQuestion.includes('kontak') || lowerQuestion.includes('hubungi') || lowerQuestion.includes('email') || lowerQuestion.includes('telepon')) {
    return 'contact';
  } else if (lowerQuestion.includes('khusus') || lowerQuestion.includes('custom') || lowerQuestion.includes('desain')) {
    return 'custom';
  } else if (lowerQuestion.includes('bayar') || lowerQuestion.includes('pembayaran') || lowerQuestion.includes('cicil')) {
    return 'payment';
  } else {
    return 'default';
  }
};

// Fungsi untuk mendapatkan jawaban dari basis pengetahuan
const getAnswer = (category) => {
  const answers = knowledgeBase[category];
  // Pilih jawaban secara acak dari kategori yang sesuai
  return answers[Math.floor(Math.random() * answers.length)];
};

// Fungsi utama untuk memproses pertanyaan pengguna
export const processUserQuestion = (question) => {
  // Kategorikan pertanyaan
  const category = categorizeQuestion(question);
  
  // Dapatkan jawaban
  const answer = getAnswer(category);
  
  // Simulasikan penundaan untuk meniru pemrosesan AI
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        answer,
        confidence: category !== 'default' ? 0.8 : 0.3, // Kepercayaan lebih tinggi untuk jawaban spesifik
        category
      });
    }, 500 + Math.random() * 1000); // Penundaan antara 0.5-1.5 detik
  });
};

// Fungsi untuk menyimpan percakapan ke database
export const saveChatHistory = async (userId, question, answer, session) => {
  try {
    if (typeof window !== 'undefined') {
      // Di sisi klien, kirim ke API
      const response = await fetch('/api/chat-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          question,
          answer,
          session_id: session,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        console.error('Gagal menyimpan riwayat chat');
      }
    } else {
      // Di sisi server, langsung simpan ke database
      const { error } = await supabase
        .from('chat_history')
        .insert({
          user_id: userId,
          question,
          answer,
          session_id: session,
          timestamp: new Date().toISOString()
        });
      
      if (error) {
        console.error('Gagal menyimpan riwayat chat:', error);
      }
    }
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

// Fungsi untuk mendapatkan riwayat percakapan
export const getChatHistory = async (userId, sessionId) => {
  try {
    if (typeof window !== 'undefined') {
      // Di sisi klien, ambil dari API
      const response = await fetch(`/api/chat-history?user_id=${userId}&session_id=${sessionId}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } else {
      // Di sisi server, ambil dari database
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', userId)
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });
      
      if (error) {
        console.error('Gagal mengambil riwayat chat:', error);
        return [];
      }
      
      return data;
    }
  } catch (error) {
    console.error('Error getting chat history:', error);
    return [];
  }
};

// Fungsi untuk menangani pertanyaan lanjutan
export const handleFollowUp = async (question, context) => {
  // Dalam implementasi nyata, ini akan menggunakan teknik NLP yang lebih kompleks
  // Untuk simulasi, kita gunakan pendekatan sederhana
  
  // Cek apakah pertanyaan terkait dengan konteks sebelumnya
  const lowerQuestion = question.toLowerCase();
  
  // Jika pertanyaan mengandung kata kunci yang mirip dengan konteks
  if (context && context.includes('harga')) {
    if (lowerQuestion.includes('berapa') || lowerQuestion.includes('berapaan') || lowerQuestion.includes('berapa harga')) {
      return {
        answer: 'Harga produk kami bervariasi tergantung jenis, bahan, dan ukuran furnitur. Anda bisa menemukan harga spesifik di halaman masing-masing produk atau menghubungi tim layanan pelanggan kami untuk informasi lebih lanjut.',
        confidence: 0.9,
        category: 'pricing'
      };
    }
  }
  
  if (context && context.includes('kirim')) {
    if (lowerQuestion.includes('lama') || lowerQuestion.includes('berapa lama') || lowerQuestion.includes('waktu')) {
      return {
        answer: 'Waktu pengiriman bervariasi tergantung lokasi Anda. Secara umum, pengiriman di Jabodetabek memakan waktu 3-5 hari kerja, sedangkan luar Jabodetabek memakan waktu 7-14 hari kerja.',
        confidence: 0.9,
        category: 'shipping'
      };
    }
  }
  
  // Jika tidak cocok dengan konteks, gunakan fungsi biasa
  return await processUserQuestion(question);
};

// Fungsi untuk mendapatkan saran otomatis berdasarkan pertanyaan
export const getAutoSuggestions = (input) => {
  const lowerInput = input.toLowerCase();
  
  // Daftar pertanyaan umum
  const commonQuestions = [
    'Apa saja produk yang tersedia?',
    'Berapa lama waktu pengiriman?',
    'Apakah produk dilengkapi garansi?',
    'Apa metode pembayaran yang tersedia?',
    'Bisakah memesan furnitur secara khusus?',
    'Bagaimana cara menghubungi layanan pelanggan?'
  ];
  
  // Filter pertanyaan berdasarkan input
  const suggestions = commonQuestions.filter(q => 
    q.toLowerCase().includes(lowerInput) || lowerInput.includes(q.toLowerCase().split(' ')[0])
  );
  
  // Kembalikan maksimal 3 saran
  return suggestions.slice(0, 3);
};

// Fungsi untuk inisialisasi chatbot
export const initChatbot = () => {
  // Dalam implementasi nyata, ini akan inisialisasi model AI/ML
  console.log('Chatbot WIDI Furniture telah diinisialisasi');
  
  // Kembalikan pesan sambutan acak
  return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
};