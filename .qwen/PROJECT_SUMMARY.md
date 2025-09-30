### **Roadmap & Arsitektur Website Furniture (SEO-Powered)**

Fokus utama kita adalah **SEO (Search Engine Optimization)** dan **kecepatan muat halaman**. Google menyukai website yang cepat dan mudah di-crawl. Oleh karena itu, arsitektur yang kita pilih harus menghasilkan halaman HTML statis yang siap saji untuk mesin pencari, bukan yang harus di-render di sisi klien.

-----

### \#\# Fase 1: Pemilihan Arsitektur & Tumpukan Teknologi (Tech Stack)

Ini adalah keputusan paling fundamental. Saya merekomendasikan arsitektur **Jamstack** yang dipadukan dengan **Headless CMS**.

  * **Mengapa Jamstack?** Karena website yang dihasilkan pada dasarnya adalah file HTML, CSS, dan JavaScript statis. Ini membuatnya **super cepat**, **aman**, dan **sangat disukai oleh Google** karena tidak perlu menunggu database atau server backend untuk merender konten.

#### **Rekomendasi Tumpukan Teknologi (Tech Stack):**

1.  **Framework Frontend: Next.js (React)**

      * **Kekuatan untuk SEO:** Ini adalah pilihan terbaik saat ini. Next.js memungkinkan kita membuat halaman secara **SSR (Server-Side Rendering)** dan **SSG (Static Site Generation)**. Untuk website furniture, sebagian besar halaman (Beranda, Tentang Kami, Kontak, detail produk) bisa dibuat sebagai SSG, yang artinya halaman HTML-nya sudah jadi saat *build time*. Ini adalah performa SEO maksimal.
      * **Ekosistem:** Didukung oleh Vercel, memiliki ekosistem yang matang dan komunitas yang besar.

2.  **Headless CMS: Strapi atau Sanity.io**

      * **Fungsi:** Ini akan menjadi "dapur" tempat teman Anda mengelola konten (produk furniture, artikel blog, info kontak) tanpa harus menyentuh kode. CMS ini menyediakan data melalui API.
      * **Strapi:** Pilihan *open-source* dan *self-hosted*. Memberi Anda kontrol penuh. Bisa dijalankan di Docker atau layanan hosting lain.
      * **Sanity.io:** Pilihan berbasis cloud dengan *free tier* yang sangat memadai untuk memulai. Proses setup lebih cepat.
      * **Keputusan Awal:** Mari kita mulai dengan **Sanity.io** untuk mempercepat pengembangan awal.

3.  **Styling: Tailwind CSS**

      * **Kekuatan:** Framework CSS *utility-first* yang memungkinkan pengembangan UI dengan cepat tanpa menulis CSS kustom. Hasil akhirnya sangat optimal karena hanya menyertakan *style* yang benar-benar digunakan.

4.  **Deployment: Vercel**

      * **Kekuatan:** Platform yang dibuat oleh tim Next.js. Integrasi dengan GitHub sangat mulus. Setiap kali Anda melakukan `git push`, Vercel akan secara otomatis membangun dan men-deploy website Anda. Menyediakan CDN global secara gratis, membuat website cepat diakses dari mana saja.

#### **Visualisasi Arsitektur:**

```
[ Teman Anda (Admin) ]
       |
       v
[ Headless CMS (Sanity.io) ]  <-- Input data produk, gambar, deskripsi
       |
       v (API Call saat build time)
[ GitHub Codespace (Next.js + Tailwind) ] <-- Anda melakukan coding di sini
       |
       v (Git Push)
[ Vercel (Platform Deployment) ] <-- Build & Deploy situs statis
       |
       v
[ Pengunjung Website ] <-- Melihat website yang super cepat
```

-----

### \#\# Fase 2: Penyiapan Lingkungan & Halaman Inti

Setelah Anda setuju dengan arsitektur di atas, kita akan masuk ke tahap eksekusi.

1.  **Inisialisasi Proyek:**

      * Membuat repository baru di GitHub.
      * Membuka repository tersebut di **GitHub Codespaces**.
      * Di dalam terminal Codespaces, kita akan menginstal Next.js dan Tailwind CSS.

2.  **Struktur Halaman (Routing):**

      * Next.js menggunakan sistem routing berbasis file. Kita akan membuat struktur awal:
          * `pages/index.js` (Halaman Beranda)
          * `pages/produk/index.js` (Halaman Katalog Produk)
          * `pages/produk/[slug].js` (Halaman Detail untuk setiap Produk, `[slug]` adalah nama produk yang unik)
          * `pages/tentang-kami.js` (Halaman Tentang Bisnis)
          * `pages/kontak.js` (Halaman Kontak & Alamat)

3.  **Komponen Awal:**

      * Membuat komponen yang bisa digunakan kembali (reusable components) seperti `Navbar`, `Footer`, `ProductCard`, `Layout`.

-----

### \#\# Fase 3: Integrasi CMS & Konten Dinamis

1.  **Setup Sanity.io:**

      * Membuat akun dan proyek baru di Sanity.io.
      * Mendefinisikan skema konten (Content Model) untuk "Produk". Isinya seperti: `namaProduk` (teks), `slug` (URL unik), `harga` (angka), `deskripsi` (rich text), `gambar` (satu atau lebih gambar), `kategori` (mis: Meja, Kursi, Lemari).

2.  **Menghubungkan Next.js ke Sanity:**

      * Menginstal *client library* Sanity di proyek Next.js kita.
      * Menggunakan fungsi `getStaticProps` di Next.js untuk mengambil data dari Sanity saat proses *build*.
      * Untuk halaman detail produk, kita akan menggunakan `getStaticPaths` untuk memberi tahu Next.js halaman apa saja yang harus dibuat secara statis berdasarkan data `slug` dari Sanity.


Tentu. Selamat atas instalasi Qwen Code yang berhasil! Sekarang adalah bagian yang paling menarik: merancang arsitektur fitur agar website ini tidak hanya berfungsi, tapi juga mengesankan dan unggul di pasar.

Sebagai partner teknis Anda, saya sudah siapkan roadmap pembangunan yang terstruktur dalam beberapa fase. Ini memungkinkan kita untuk meluncurkan versi dasar yang solid (MVP), lalu mengembangkannya dengan fitur-fitur canggih secara bertahap.

---
### ## Roadmap Pembangunan Website Furniture Profesional

### 🚀 Fase 1: Fondasi & MVP (Minimum Viable Product)
**Tujuan:** Meluncurkan website secepat mungkin dengan semua fitur esensial yang fungsional, profesional, dan SEO-friendly.

1.  **Halaman Utama (Homepage)**
    * **Fitur:** Hero section dengan gambar/video berkualitas tinggi, slogan bisnis, produk unggulan (Featured Products), pengenalan singkat tentang brand, dan testimoni pilihan.
    * **Manfaat:** Memberikan kesan pertama yang kuat dan profesional, serta memandu pengguna ke bagian terpenting situs.

2.  **Katalog Produk**
    * **Halaman Daftar Produk:** Menampilkan semua produk dalam format grid atau list.
    * **Fitur Wajib:**
        * **Filter Lanjutan:** Berdasarkan Kategori (Kursi, Meja, Lemari), Harga (slider rentang harga), Material (Jati, Mahoni), dan Ruangan (Ruang Tamu, Kamar Tidur).
        * **Urutkan (Sort by):** Berdasarkan Harga Termurah, Termahal, Terbaru, Terpopuler.
    * **Manfaat:** Memudahkan pengguna menemukan produk yang mereka cari dengan cepat.

3.  **Halaman Detail Produk**
    * **Fitur:**
        * Galeri gambar produk dari berbagai sudut.
        * Nama, harga, dan deskripsi produk yang mendetail.
        * Spesifikasi teknis (dimensi, material, warna finishing).
        * Tombol *Call-to-Action* (CTA) yang jelas: **"Hubungi via WhatsApp"** atau **"Tanyakan Ketersediaan"**.
        * Tampilkan produk terkait (Related Products).
    * **Manfaat:** Memberikan semua informasi yang dibutuhkan calon pembeli untuk membuat keputusan.

4.  **Halaman Statis**
    * **Tentang Kami (About Us):** Cerita di balik bisnis, nilai-nilai, dan foto tim/workshop untuk membangun kepercayaan.
    * **Kontak:** Alamat, peta Google Maps yang interaktif, nomor telepon, email, dan formulir kontak sederhana.
    * **Cara Pemesanan & FAQ:** Menjelaskan alur pemesanan dan menjawab pertanyaan umum.

5.  **Fondasi Teknis**
    * **Desain Responsif & Mobile-First:** Tampilan sempurna di semua perangkat.
    * **Setup SEO Dasar:** Meta title & description untuk setiap halaman, URL yang bersih, dan pembuatan `sitemap.xml`.
    * **Integrasi Penuh dengan Sanity.io CMS:** Agar pemilik bisnis bisa mengelola semua konten di atas tanpa koding.

---
### ✨ Fase 2: Peningkatan Pengalaman & Keterlibatan
**Tujuan:** Membuat website lebih dari sekadar katalog, menjadi sumber inspirasi dan alat bantu bagi pelanggan.

1.  **Galeri Inspirasi / Lookbook**
    * **Ide Brilian:** Buat halaman khusus yang menampilkan produk Anda dalam setting ruangan yang nyata dan tertata apik (mis: "Inspirasi Ruang Tamu Skandinavia"). Setiap item dalam foto bisa di-klik untuk menuju ke halaman produknya.
    * **Manfaat:** Menjual "gaya hidup" bukan hanya produk, dan memberikan ide nyata kepada pelanggan. Sangat visual dan bagus untuk dibagikan di media sosial.

2.  **Blog & Artikel Panduan**
    * **Fitur:** Konten berkualitas seputar furnitur. Contoh: "Cara Merawat Furnitur Kayu Jati", "5 Kesalahan dalam Memilih Sofa", "Tren Warna 2025 untuk Interior".
    * **Manfaat:** Meningkatkan SEO secara masif, membangun otoritas brand sebagai ahli di bidang furnitur.

3.  **Kalkulator Ruangan (Room Planner Sederhana)**
    * **Ide Brilian:** Sebuah *tool* interaktif sederhana di mana pengguna bisa memasukkan ukuran ruangan mereka, lalu menyeret dan menaruh (drag-and-drop) bentuk 2D dari produk furnitur Anda untuk melihat apakah ukurannya pas.
    * **Manfaat:** Sangat fungsional, membantu mengatasi keraguan terbesar pembeli ("Apakah ini muat di ruangan saya?"), dan membuat website Anda sangat menonjol dari kompetitor.

4.  **Testimoni & Galeri Pelanggan**
    * **Fitur:** Halaman khusus untuk menampilkan ulasan dan foto-foto yang dikirim oleh pelanggan yang puas.
    * **Manfaat:** Membangun bukti sosial (*social proof*) yang sangat kuat dan meningkatkan kepercayaan calon pembeli.

---
### 💡 Fase 3: Fitur Lanjutan & Pertumbuhan
**Tujuan:** Menggunakan teknologi terdepan untuk menciptakan pengalaman yang tak terlupakan dan mempersiapkan skala bisnis yang lebih besar.

1.  **Visualisasi Produk 3D & Augmented Reality (AR)**
    * **Ide Brilian:** Ini adalah *game-changer*. Pengguna bisa melihat model 3D produk di website, memutarnya 360 derajat. Dengan fitur AR, mereka bisa menggunakan kamera ponsel untuk **"meletakkan" furnitur virtual tersebut di ruangan mereka secara *real-time***.
    * **Manfaat:** Meningkatkan konversi secara drastis dengan menghilangkan keraguan pembeli tentang bagaimana tampilan dan ukuran furnitur di rumah mereka.

2.  **Kustomisasi Produk Real-time**
    * **Fitur:** Untuk produk tertentu, izinkan pengguna memilih opsi kustom (mis: warna kain sofa, jenis finishing kayu) dan gambar produk akan berubah secara langsung sesuai pilihan.
    * **Manfaat:** Memberikan pengalaman belanja yang personal dan premium.

3.  **Integrasi WhatsApp Lanjutan**
    * **Fitur:** Tombol CTA di halaman produk akan membuka WhatsApp dengan pesan yang sudah terisi otomatis, contoh: "Halo, saya tertarik dengan produk 'Meja Makan Jati Tipe A'. Apakah stoknya tersedia?".
    * **Manfaat:** Mengurangi friksi dan mempermudah pengguna untuk memulai percakapan.

4.  **Persiapan E-commerce Penuh**
    * **Fitur:** Implementasi keranjang belanja, integrasi dengan *payment gateway* (Midtrans, Xendit, dll.), dan sistem manajemen pesanan.
    * **Manfaat:** Mengubah website dari katalog menjadi mesin penjualan otomatis.

