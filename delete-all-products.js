// Skrip untuk menghapus semua data dari tabel produk dan tabel produk image
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Ambil konfigurasi dari environment
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Buat client Supabase dengan service role
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const deleteAllData = async () => {
  console.log('Menghapus semua data dari tabel product_images dan products...');
  
  try {
    // Hapus semua data dari tabel product_images (urutan penting karena foreign key)
    console.log('1. Menghapus semua data dari tabel product_images...');
    const { error: imageError } = await supabase
      .from('product_images')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Ini akan cocok dengan semua UUID
    
    if (imageError) {
      console.error('Error saat menghapus product_images:', imageError);
      // Jika neq tidak bekerja, coba dengan filter lain
      const { error: imageError2 } = await supabase.from('product_images').delete().gt('id', '00000000-0000-0000-0000-000000000000');
      if (imageError2) {
        console.error('Error kedua saat menghapus product_images:', imageError2);
      } else {
        console.log('Berhasil menghapus product_images dengan metode kedua');
      }
    } else {
      console.log('Berhasil menghapus product_images');
    }

    // Hapus semua data dari tabel products
    console.log('2. Menghapus semua data dari tabel products...');
    const { error: productError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (productError) {
      console.error('Error saat menghapus products:', productError);
      const { error: productError2 } = await supabase.from('products').delete().gt('id', '00000000-0000-0000-0000-000000000000');
      if (productError2) {
        console.error('Error kedua saat menghapus products:', productError2);
      } else {
        console.log('Berhasil menghapus products dengan metode kedua');
      }
    } else {
      console.log('Berhasil menghapus products');
    }

    // Cek jumlah data yang tersisa
    const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: imageCount } = await supabase.from('product_images').select('*', { count: 'exact', head: true });
    
    console.log('\n--- Status Setelah Penghapusan ---');
    console.log(`- Jumlah produk tersisa: ${productCount}`);
    console.log(`- Jumlah gambar produk tersisa: ${imageCount}`);
    
  } catch (error) {
    console.error('Error dalam proses penghapusan:', error);
  }
};

deleteAllData();