# Sanity Studio - ETS Project 1 2025

Ini adalah studio Sanity untuk proyek e-commerce furniture yang dikonfigurasi untuk bekerja dengan GitHub Codespaces.

## Struktur

- `sanity.config.ts` - Konfigurasi utama Sanity studio
- `sanity.cli.ts` - Konfigurasi CLI Sanity
- `schemas/` - Definisi skema konten
- `package.json` - Dependensi dan script untuk Sanity studio

## Penggunaan

### Menjalankan Studio Lokal di Codespaces

1. Instal dependensi:
```bash
npm install
```

2. Jalankan studio:
```bash
npm run dev
```

3. Codespaces akan menanyakan apakah akan membuat port publik - pilih "Make Public" atau "Open in Browser"

### Konfigurasi

- **Project ID**: g7h0ho9q
- **Dataset**: production

## Keamanan

Token API Sanity harus disimpan sebagai variabel lingkungan dan tidak boleh disimpan dalam repositori kode.