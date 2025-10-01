# WIDI Furniture - E-commerce Furniture Modern

Website e-commerce furnitur yang tidak hanya fungsional dan profesional, tetapi juga memberikan pengalaman belanja yang unik, interaktif, dan personal melalui fitur-fitur inovatif.

## ✨ Fitur Unggulan

- "Shop the Look" Interaktif
- Asisten Desainer Berbasis AI
- Bukti Sosial & Urgensi Real-time
- Program Loyalitas Berbasis Gamifikasi
- Progressive Web App (PWA)
- Dukungan Multi-bahasa (Indonesia & Inggris)

## 🛠️ Teknologi yang Digunakan

- **Framework Frontend:** Astro
- **Backend & Database:** Supabase
- **Styling:** Tailwind CSS
- **Hosting/Deployment:** Vercel
- **Version Control:** GitHub

## 🧰 Setup Project

1. Copy file `.env.example` ke `.env` dan isi dengan nilai yang sesuai:
   ```
   PUBLIC_SUPABASE_URL=your_supabase_project_url
   PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
2. Install dependencies: `npm install`
3. Jalankan development server: `npm run dev`

## 📁 Struktur Project

Struktur project utama:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   ├── supabase.js
│   │   └── types.ts
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── README.md
└── package.json
```

## 🚀 Pengembangan

- Astro mencari file `.astro` atau `.md` di direktori `src/pages/` sebagai rute berdasarkan nama filenya
- Saat menjalankan `npm run dev`, Astro akan memulai server development lokal di `http://localhost:4321`
- Astro akan otomatis me-reload browser saat terjadi perubahan konten

## 📈 Roadmap Pengembangan

### 🚀 Fase 1: Fondasi, MVP, & Dasbor Admin
- [ ] Setup & Infrastruktur: Inisialisasi proyek Supabase, buat skema database
- [ ] Dasbor Admin: Implementasikan login/logout dan modul CRUD untuk Produk dan Kategori
- [ ] Website Publik (MVP): Bangun halaman utama, katalog, dan detail produk

### ✨ Fase 2: Peningkatan Pengalaman & Keterlibatan
- [ ] Fitur "Shop the Look": Modul CRUD untuk lookbook dengan hotspot interaktif
- [ ] Akun Pelanggan: Sistem pendaftaran/login dan wishlist
- [ ] Konfigurasi Aplikasi Modern: Implementasi PWA dan multi-bahasa

### 💡 Fase 3: Fitur Komunitas & Konversi
- [ ] Program Loyalitas & Gamifikasi: Implementasi poin loyalitas
- [ ] Bukti Sosial & Ulasan: Fitur realtime dan review pelanggan
- [ ] Asisten Desainer AI: Integrasi dengan API LLM

### 🏆 Fase 4: E-commerce Penuh & Optimalisasi
- [ ] Implementasi Keranjang Belanja & Checkout
- [ ] Manajemen Pesanan di Dasbor Admin
- [ ] Analitik & SEO Lanjutan
