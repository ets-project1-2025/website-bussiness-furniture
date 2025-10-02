// Test script untuk memeriksa produk tertentu
import { createSupabaseClient } from './src/lib/supabase.js';

const testSpecificProduct = async () => {
  console.log('Mengambil produk "Kursi Tamu Minimalis" dari Supabase menggunakan service role...');
  
  try {
    // Gunakan service role untuk memastikan akses penuh
    const supabase = createSupabaseClient(true);
    
    if (!supabase) {
      console.error('Supabase client tidak tersedia');
      return;
    }
    
    // Ambil produk dengan nama "Kursi Tamu Minimalis"
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .eq('name', 'Kursi Tamu Minimalis')
      .single();
    
    if (error) {
      console.error('Error saat mengambil produk:', error);
      return;
    }
    
    console.log('Ditemukan produk:');
    console.log('ID:', data.id);
    console.log('Nama:', data.name);
    console.log('Gambar produk:', data.product_images ? data.product_images.length : 0);
    
    if (data.product_images && data.product_images.length > 0) {
      console.log('Gambar-gambar produk:');
      data.product_images.forEach((img, idx) => {
        console.log(`${idx + 1}. ${img.image_url} (primary: ${img.is_primary})`);
      });
    }
    
  } catch (error) {
    console.error('Error saat mengambil produk:', error);
  }
};

testSpecificProduct();