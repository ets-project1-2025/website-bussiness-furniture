// Skrip untuk menambahkan kolom is_admin ke tabel profiles
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Ambil konfigurasi dari environment
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Buat client Supabase dengan service role
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const addAdminColumn = async () => {
  console.log('Menambahkan kolom is_admin ke tabel profiles...');
  
  try {
    // Kita tidak bisa menjalankan ALTER TABLE secara langsung dari JS client biasa
    // Jadi kita akan memberikan instruksi SQL yang harus dijalankan di SQL Editor Supabase
    
    console.log('Untuk menambahkan kolom is_admin ke tabel profiles, silakan:');
    console.log('1. Buka Supabase Dashboard');
    console.log('2. Pilih proyek Anda');
    console.log('3. Masuk ke halaman SQL Editor');
    console.log('4. Jalankan query berikut:');
    console.log('');
    console.log('-- Tambahkan kolom is_admin ke tabel profiles');
    console.log('ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;');
    console.log('');
    console.log('-- Opsional: Berikan akses admin ke user tertentu');
    console.log('-- Ganti YOUR_USER_ID dengan ID user yang ingin dijadikan admin');
    console.log('-- UPDATE profiles SET is_admin = TRUE WHERE id = \'YOUR_USER_ID\';');
    
    // Cek apakah kolom sudah ditambahkan dengan mencoba mengambilnya
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('is_admin')
      .limit(1);
    
    if (profilesError) {
      console.log('');
      console.log('Error saat mencoba mengakses kolom is_admin (kemungkinan besar kolom belum ditambahkan):');
      console.log(profilesError.message);
      console.log('');
      console.log('Silakan tambahkan kolom seperti di atas, lalu coba lagi.');
    } else {
      console.log('');
      console.log('Berhasil! Kolom is_admin sudah tersedia di tabel profiles.');
      console.log('Sekarang Anda bisa menandai user sebagai admin.');
    }
  } catch (error) {
    console.error('Error dalam addAdminColumn:', error);
  }
};

addAdminColumn();