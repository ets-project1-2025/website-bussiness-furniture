# Sanity Integration

Sanity digunakan sebagai headless CMS untuk mengelola konten produk dan kategori di website e-commerce furniture ini.

## Struktur Sanity

Sanity memiliki dua entitas utama:
- **Product**: Untuk mengelola data produk seperti nama, deskripsi, harga, gambar, dll.
- **Category**: Untuk mengelola kategori produk

## Penggunaan

### Menjalankan Sanity Studio Lokal

Untuk mengedit konten di lokal:

```bash
npm run sanity-dev
```

Sanity Studio akan tersedia di http://localhost:3333

### Mengakses Data dari Next.js

Data dari Sanity dapat diakses dari aplikasi Next.js menggunakan `@sanity/client` dan komponen dari `next-sanity`.

## Konfigurasi

- **Project ID**: g7h0ho9q
- **Dataset**: production
- **API Version**: 2022-03-07 (default dari next-sanity)

## Skema

Skema Sanity terletak di `sanity/schemas/` dan mencakup:

- `product.ts`: Skema untuk produk furniture
- `category.ts`: Skema untuk kategori produk
- `blockContent.ts`: Skema untuk konten teks kaya
- `schema.ts`: Gabungan dari semua skema

## Deployment

Sanity Studio dideploy secara terpisah dari aplikasi web utama.