# Studio Sanity - studio-ets.project1.2025

Dokumen ini menjelaskan konfigurasi Sanity studio yang dibuat secara manual untuk menghindari error dari perintah `create-sanity`.

## Latar Belakang

Perintah asli:
```bash
npm create sanity@latest -- --project g7h0ho9q --dataset production --template clean --typescript --output-path studio-ets.project1.2025
```

Mengalami error dengan pesan `TypeError: resolvePkg is not a function` karena versi terbaru dari `create-sanity` memiliki bug. Oleh karena itu, kita membuat konfigurasi Sanity studio secara manual.

## Konfigurasi yang Dibuat

- `sanity.config.ts`: File konfigurasi utama Sanity
- `sanity.cli.ts`: File konfigurasi CLI
- `package.json`: Dependensi dan script Sanity studio
- `schemas/`: Direktori skema konten
  - `schema.ts`: File skema utama (diperbarui untuk Sanity v3+)
- `README.md`: Dokumentasi studio ini

## Perubahan Penting

Karena versi Sanity yang kita gunakan adalah v3+, kita perlu memperbarui sintaks skema:

### Sebelum (untuk Sanity v2):
```typescript
import { createSchema } from 'sanity';
import { schemaTypes } from 'all:part:@sanity/base/schema-type';

export const schema = createSchema({
  name: 'default',
  types: schemaTypes.concat([...])
});
```

### Sesudah (untuk Sanity v3+):
```typescript
import { defineSchema, defineType } from 'sanity';

export const schema = defineSchema({
  name: 'default',
  types: [
    // Tambahkan tipe skema di sini
  ],
});
```

## Cara Menjalankan Studio di Codespaces

1. Pastikan tidak ada proses Sanity studio lain yang berjalan:
```bash
pkill -f "sanity dev" || true
```

2. Jalankan studio menggunakan script:
```bash
npm run studio-dev
```

3. Atau secara langsung:
```bash
cd studio-ets.project1.2025
npx sanity dev --port 3334
```

4. Di Codespaces, setelah menjalankan perintah, buka tab "Ports" di VS Code
5. Temukan port yang digunakan (misalnya 3334), klik ikon "Globe" untuk membuatnya publik
6. Klik "Open in Browser" untuk membuka studio Sanity di browser baru

## Menambahkan Skema

Untuk menambahkan skema konten (seperti product, category, dll.), buat file skema baru di direktori `schemas/` dan impor ke dalam `schemas/schema.ts`.

Contoh struktur skema bisa dilihat di folder `sanity/schemas/` sebagai referensi.

## Keamanan

- Jangan commit API token Sanity ke repositori
- Gunakan environment variables untuk menyimpan token yang sensitif
- Telah ditambahkan `.sanity` ke `.gitignore` untuk mencegah kebocoran konfigurasi sensitif

## Troubleshooting

Jika studio tidak bisa diakses:
1. Pastikan port yang digunakan (misalnya 3334) diatur ke "Public" di pengaturan Ports VS Code
2. Pastikan tidak ada proses Sanity lain yang menggunakan port yang sama
3. Pastikan semua dependensi telah diinstal: `cd studio-ets.project1.2025 && npm install`
4. Jika muncul error tentang import "all:part:@sanity/base/schema-type", pastikan menggunakan sintaks Sanity v3+ seperti yang dijelaskan di atas