# Panduan Konfigurasi Sanity.io di GitHub Codespaces

Dokumen ini menjelaskan langkah-langkah untuk mengkonfigurasi dan menggunakan Sanity.io di lingkungan GitHub Codespaces.

## Prasyarat

1. Pastikan Anda memiliki akun di Sanity.io
2. Anda harus memiliki Project ID Sanity (dalam kasus ini: `g7h0ho9q`)
3. Sudah memiliki akses ke dataset `production`

## Langkah-langkah Konfigurasi

### 1. Struktur Direktori

Sanity harus terintegrasi dengan proyek Next.js Anda. Struktur yang sekarang adalah:

```
/workspace/website-bussiness-furniture/
├── sanity/                 # Direktori Sanity studio
│   ├── schemas/            # Definisi skema konten
│   ├── sanity.config.ts    # Konfigurasi Sanity
│   ├── sanity.cli.ts       # Konfigurasi CLI
│   └── package.json        # Dependensi Sanity studio
├── src/
│   ├── lib/
│   │   └── sanity.js       # Client Sanity untuk Next.js
│   └── components/
│       └── ProductList.js  # Contoh komponen menggunakan data Sanity
└── package.json            # Script npm untuk Sanity
```

### 2. Instalasi Dependensi

Dalam Codespaces, jalankan perintah berikut untuk menginstal dependensi Sanity:

```bash
cd sanity
npm install
```

Perintah ini akan menginstal semua dependensi yang diperlukan untuk Sanity studio.

### 3. Menjalankan Sanity Studio di Codespaces

Karena Anda menggunakan Codespaces, Anda perlu menjalankan Sanity studio dan membuatnya dapat diakses melalui URL publik:

1. Jalankan Sanity studio:
```bash
cd sanity
npx sanity dev --port 3333
```

2. Codespaces secara otomatis akan menanyakan apakah akan membuat port `3333` dapat diakses secara publik. Pilih "Open in browser" atau "Make port public" tergantung pada preferensi Anda.

3. Anda akan dapat mengakses Sanity studio di alamat seperti: `https://nama-codespace-3333.preview.app.github.dev` (port bisa berbeda)

### 4. Menggunakan Port Forwarding Codespaces

Jika Anda ingin mengontrol port lebih lanjut:

1. Buka tab "Ports" di jendela terminal VS Code
2. Temukan port 3333 (atau port yang digunakan Sanity)
3. Klik ikon " Globe" untuk membuat port dapat diakses secara publik
4. Klik "Open in Browser" untuk membuka Sanity studio

### 5. Konfigurasi di package.json (sudah dilakukan)

Sudah ditambahkan ke package.json utama:
```json
{
  "scripts": {
    "sanity-dev": "cd sanity && npx sanity dev",
    "sanity-build": "cd sanity && npx sanity build"
  }
}
```

### 6. Menjalankan Sanity Studio dengan npm script

Anda juga bisa menjalankan Sanity studio dengan:
```bash
npm run sanity-dev
```

Lalu lakukan port forwarding seperti di atas.

## Integrasi dengan Aplikasi Next.js

### 1. Client Sanity

File `src/lib/sanity.js` menyediakan client untuk berkomunikasi dengan API Sanity:

```javascript
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'g7h0ho9q',  // Ganti dengan project ID Anda
  dataset: 'production',  // Ganti dengan dataset Anda
  useCdn: true,          // Gunakan CDN untuk kinerja lebih baik
  apiVersion: '2022-03-07' // Tanggal versi API Sanity
});
```

### 2. Query Contoh

Lihat file `src/components/ProductList.js` untuk contoh query dan penggunaan data dari Sanity di komponen React.

## Deploy Sanity Studio

Sanity studio dapat dideploy secara terpisah menggunakan perintah:

```bash
npm run sanity-build
```

## Penanganan Error yang Sering Terjadi

### 1. TypeError: resolvePkg is not a function

Ini adalah error yang terjadi ketika menggunakan perintah `npm create sanity@latest`. Kita telah menghindari error ini dengan membuat konfigurasi Sanity secara manual.

### 2. Port tidak dapat diakses

Di Codespaces, pastikan:
- Port yang digunakan oleh Sanity (default 3333) diatur ke "Public"
- Tidak ada proses lain yang menggunakan port yang sama
- Firewall diatur dengan benar

### 3. Kredensial tidak berfungsi

Pastikan:
- Project ID dan dataset benar
- Token API (jika digunakan) memiliki izin yang cukup
- Dataset tidak diatur ke private (jika Anda mengakses tanpa token)

## Tips untuk Menggunakan Sanity di Codespaces

1. **Pengelolaan Port**: Selalu pastikan port yang digunakan Sanity dibuat publik di Codespaces agar bisa diakses melalui browser.

2. **Persistensi Data**: Karena Codespaces adalah lingkungan berbasis cloud, pastikan semua perubahan data penting disimpan ke Sanity cloud, bukan hanya lokal.

3. **Keamanan**: Jangan commit file konfigurasi sensitif atau token ke repository. Sudah ditangani dengan menambahkan `.sanity` ke `.gitignore`.

4. **Efisiensi**: Gunakan `useCdn: true` di development untuk mengurangi waktu loading data dari Sanity API.

## Troubleshooting

Jika Anda mengalami masalah saat menjalankan Sanity studio di Codespaces:

1. Pastikan tidak ada proses Sanity lain yang sedang berjalan:
```bash
pkill -f "sanity" || true
```

2. Cek apakah port 3333 (atau port lain yang Anda gunakan) sedang digunakan:
```bash
lsof -i :3333
```

3. Hapus cache npm jika mengalami masalah:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Referensi

- [Dokumentasi Sanity](https://www.sanity.io/docs)
- [Sanity + Next.js](https://www.sanity.io/docs/introduction-to-content-modelling)
- [GitHub Codespaces Port Forwarding](https://docs.github.com/en/codespaces/developing-in-codespaces/forwarding-ports-in-your-codespace)