# Dokumentasi: Error dan Solusi untuk Konfigurasi Sanity Studio

## Masalah yang Terjadi

Perintah awal untuk membuat studio Sanity gagal dengan error:

```
npm create sanity@latest -- --project g7h0ho9q --dataset production --template clean --typescript --output-path studio-ets.project1.2025
```

Error yang muncul:
```
TypeError: resolvePkg is not a function
    at Object.<anonymous> (/home/codespace/.npm/_npx/.../node_modules/create-sanity/index.js:7:16)
```

## Penyebab Error

Error ini terjadi karena versi terbaru dari paket `create-sanity` mencoba menggunakan fungsi `resolvePkg` yang tidak tersedia di lingkungan tertentu, termasuk GitHub Codespaces.

## Solusi yang Diterapkan

Karena perintah `create-sanity` tidak berfungsi, kami membuat struktur Sanity studio secara manual:

1. Membuat direktori `studio-ets.project1.2025`
2. Membuat file konfigurasi:
   - `sanity.config.ts` - Konfigurasi utama Sanity
   - `sanity.cli.ts` - Konfigurasi CLI
   - `package.json` - Dependensi Sanity studio
   - `schemas/schema.ts` - Skema dasar
3. Menginstal semua dependensi Sanity studio
4. Menambahkan script ke package.json utama

## Masalah Tambahan dan Perbaikan

Setelah instalasi dependensi, muncul masalah tambahan saat menjalankan studio:

```
[plugin:vite:import-analysis] Failed to resolve import "all:part:@sanity/base/schema-type"
```

Ini terjadi karena:
- Kita menggunakan Sanity v3+, tetapi sintaks skema yang digunakan adalah dari Sanity v2
- Sintaks `all:part:@sanity/base/schema-type` adalah sintaks lama dari Sanity v2

### Perubahan yang dilakukan:
1. Memperbarui semua dependensi Sanity ke versi yang kompatibel
2. Memperbarui sintaks skema di file `schemas/schema.ts`:
   - Dari: `import { schemaTypes } from 'all:part:@sanity/base/schema-type';`
   - Menjadi: Menggunakan `defineSchema` dan `defineType` dari Sanity v3+

## Hasil Akhir

Sanity studio sekarang berhasil dibuat dan dapat dijalankan di Codespaces dengan perintah:
```
npm run studio-dev
```

Studio ini dikonfigurasi untuk menggunakan project ID `g7h0ho9q` dan dataset `production` seperti yang diminta, dan berjalan tanpa error.

## Catatan Tambahan

- Dua studio Sanity sekarang ada di proyek ini:
  1. `/sanity` - Studio yang dibuat sebelumnya
  2. `/studio-ets.project1.2025` - Studio yang baru dibuat untuk perintah yang diminta
- Kedua studio berfungsi dengan baik dan diintegrasikan dengan proyek Next.js
- Solusi ini menghindari bug pada versi terbaru dari `create-sanity` dan memperbarui sintaks untuk kompatibilitas dengan Sanity v3+

## Referensi

- File dokumentasi lengkap tersedia di `studio-ets.project1.2025/SETUP_NOTES.md`
- Panduan konfigurasi Codespaces di `sanity/CONFIGURATION_GUIDE.md`