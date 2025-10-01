# Quick Setup: Sanity.io in GitHub Codespaces

Ikuti langkah-langkah ini untuk segera mulai menggunakan Sanity.io di GitHub Codespaces Anda.

## Langkah 1: Instalasi Dependensi

Pertama, instal dependensi Sanity studio:

```bash
cd sanity
npm install
```

## Langkah 2: Jalankan Sanity Studio

Jalankan Sanity studio di Codespaces:

```bash
cd sanity
npx sanity dev --port 3333
```

## Langkah 3: Akses Sanity Studio

1. Setelah perintah di atas dijalankan, Codespaces akan menanyakan apakah akan membuat port 3333 publik
2. Pilih "Open in browser" untuk membuka Sanity Studio di browser baru
3. Alternatif: Buka tab "Ports" di VS Code dan ubah visibility port 3333 ke "Public"

## Langkah 4: Gunakan Sanity Studio

- Gunakan Sanity Studio untuk mengelola content seperti produk dan kategori
- Schema untuk produk dan kategori sudah disediakan di `sanity/schemas/`

## Catatan Penting

- Project ID Sanity: `g7h0ho9q`
- Dataset: `production`
- Jika Anda menutup Codespaces, Anda harus menjalankan kembali perintah `npx sanity dev`
- Pastikan port Sanity (misalnya 3333) selalu diatur ke "Public" agar bisa diakses dari browser

## Troubleshooting

Jika Sanity studio tidak bisa diakses:
1. Pastikan tidak ada proses Sanity lain yang berjalan: `pkill -f "sanity"`
2. Pastikan port 3333 tidak digunakan oleh aplikasi lain
3. Pastikan port 3333 diatur ke "Public" di pengaturan Ports VS Code