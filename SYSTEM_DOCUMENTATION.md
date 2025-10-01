# Panduan Penggunaan Sistem Monitoring & Backup

## Ringkasan

Dokumen ini menjelaskan cara menggunakan sistem monitoring dan backup yang telah diimplementasikan untuk WIDI Furniture. Sistem ini dirancang untuk memastikan aplikasi berjalan optimal dan data aman dari kehilangan.

## 1. Sistem Monitoring

Sistem monitoring otomatis diinisialisasi saat aplikasi dimuat dan mencakup:

### 1.1 Inisialisasi Monitoring
Untuk menginisialisasi semua fitur monitoring:

```javascript
import { setupMonitoring } from './lib/production-monitoring';

// Inisialisasi semua fitur monitoring
setupMonitoring();
```

### 1.2 Pelacakan Error
Sistem secara otomatis melacak error JavaScript dan promise rejection. Anda juga bisa mencatat error manual:

```javascript
import { logAppEvent } from './lib/production-monitoring';

try {
  // Kode yang mungkin gagal
} catch (error) {
  logAppEvent('error', 'Gagal memproses pesanan', {
    orderId: 'ORD123',
    error: error.message,
    stack: error.stack
  });
}
```

### 1.3 Pelacakan Performa
Sistem melacak metrik performa penting seperti LCP dan CLS secara otomatis. Anda juga bisa mencatat metrik kustom:

```javascript
import { logAppEvent } from './lib/production-monitoring';

// Mencatat waktu eksekusi fungsi
const startTime = performance.now();
// ... eksekusi fungsi penting ...
const endTime = performance.now();

logAppEvent('info', 'Waktu eksekusi fungsi', {
  functionName: 'processOrder',
  duration: endTime - startTime
});
```

### 1.4 Laporan Kesehatan
Untuk mendapatkan laporan kesehatan aplikasi saat ini:

```javascript
import { getApplicationHealth, startHealthReporting } from './lib/production-monitoring';

// Dapatkan sekali
const health = await getApplicationHealth();

// Atau mulai pelaporan berkala (default setiap 5 menit)
startHealthReporting(300000); // 5 menit dalam milidetik
```

## 2. Sistem Backup & Recovery

### 2.1 Membuat Backup Manual
Untuk membuat backup database secara manual:

```javascript
import { createDatabaseBackup, createFileBackup } from './lib/backup-recovery';

// Backup database penuh
const dbBackup = await createDatabaseBackup('full');

// Backup file penting
const fileBackup = await createFileBackup([
  '/public/images/products',
  '/src/config'
]);
```

### 2.2 Jadwal Backup Otomatis
Untuk mengatur jadwal backup otomatis:

```javascript
import { scheduleAutomaticBackup } from './lib/backup-recovery';

await scheduleAutomaticBackup({
  frequency: 'daily',    // daily, weekly, monthly
  time: '02:00',         // Waktu backup dalam format 24 jam
  retention_days: 30     // Jumlah hari untuk menyimpan backup
});
```

### 2.3 Mendapatkan Daftar Backup
Untuk melihat backup yang tersedia:

```javascript
import { getBackupList } from './lib/backup-recovery';

// Dapatkan semua backup
const allBackups = await getBackupList();

// Dapatkan backup tipe tertentu
const dbBackups = await getBackupList('full');
```

### 2.4 Pemulihan Data
Untuk memulihkan data dari backup:

```javascript
import { restoreFromBackup } from './lib/backup-recovery';

// Pulihkan dari backup tertentu
const restoreResult = await restoreFromBackup('backup_123456789');
```

### 2.5 Membersihkan Backup Lama
Untuk membersihkan backup yang sudah tua:

```javascript
import { cleanupOldBackups } from './lib/backup-recovery';

// Hapus backup lebih lama dari 30 hari
const cleanupResult = await cleanupOldBackups(30);
```

### 2.6 Membuat Snapshot Sistem
Untuk membuat snapshot kondisi sistem saat ini:

```javascript
import { createSystemSnapshot } from './lib/backup-recovery';

const snapshot = await createSystemSnapshot();
```

### 2.7 Uji Pemulihan Bencana
Untuk menjalankan simulasi pemulihan bencana:

```javascript
import { runDisasterRecoveryTest } from './lib/backup-recovery';

const testResult = await runDisasterRecoveryTest();
```

### 2.8 Membuat Rencana Pemulihan
Untuk membuat rencana pemulihan kustom:

```javascript
import { createRecoveryPlan } from './lib/backup-recovery';

await createRecoveryPlan({
  name: 'Rencana Pemulihan Kritis',
  critical_services: ['database', 'payment', 'authentication'],
  recovery_time_objective: 2, // maksimal 2 jam untuk pulih
  steps: [
    'Langkah 1...',
    'Langkah 2...'
  ]
});
```

### 2.9 Status Backup Terbaru
Untuk memeriksa status backup terbaru:

```javascript
import { getLatestBackupStatus } from './lib/backup-recovery';

const status = await getLatestBackupStatus();
console.log(`Status backup: ${status.status} - ${status.message}`);
```

## 3. Konfigurasi Produksi

### 3.1 Variabel Lingkungan
Pastikan variabel lingkungan berikut diatur untuk produksi:

```env
# Monitoring
SENTRY_DSN=your_sentry_dsn

# Backup Storage
BACKUP_STORAGE_PATH=/path/to/secure/backup/location
BACKUP_RETENTION_DAYS=30
```

### 3.2 Pengaturan Cron (Opsional)
Jika sistem backup tidak terintegrasi dengan scheduler otomatis, Anda bisa menambahkan cron jobs:

```bash
# Jalankan backup harian pukul 02:00
0 2 * * * /path/to/backup/script.sh

# Bersihkan backup lama setiap hari Minggu pukul 03:00
0 3 * * 0 /path/to/cleanup/script.sh
```

## 4. Prosedur Tanggap Darurat

### 4.1 Deteksi Masalah
Jika sistem menunjukkan tanda-tanda masalah:
1. Periksa laporan kesehatan aplikasi
2. Tinjau log error terbaru
3. Periksa metrik performa
4. Konfirmasi dengan tim teknis

### 4.2 Prosedur Pemulihan
Jika terjadi kegagalan kritis:
1. Aktifkan mode pemeliharaan jika perlu
2. Gunakan recovery plan yang telah dibuat
3. Pulihkan dari backup terbaru
4. Verifikasi fungsi utama
5. Aktifkan kembali sistem
6. Dokumentasikan kejadian

## 5. Panduan Troubleshooting

### 5.1 Monitoring Tidak Bekerja
- Pastikan `setupMonitoring()` dipanggil di awal aplikasi
- Periksa koneksi jaringan untuk pengiriman log
- Verifikasi konfigurasi layanan monitoring eksternal

### 5.2 Backup Gagal
- Periksa izin akses ke lokasi penyimpanan
- Pastikan ruang penyimpanan mencukupi
- Verifikasi konfigurasi cron atau scheduler

### 5.3 Pemulihan Gagal
- Verifikasi integritas file backup
- Pastikan database tujuan dalam kondisi baik
- Periksa log error untuk detail lebih lanjut

---

Dokumen ini merupakan bagian dari dokumentasi akhir Fase 9: Peluncuran & Pemantauan Produksi.