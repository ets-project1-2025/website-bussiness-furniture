// Test script untuk mencocokkan query dari test-debug-images.js
import { createSupabaseClient } from './src/lib/supabase.js';

const testMatchingQuery = async () => {
  console.log('Mencoba query yang sama seperti dalam test-debug-images.js...');
  
  try {
    // Gunakan service role untuk memastikan akses penuh
    const supabase = createSupabaseClient(true);
    
    if (!supabase) {
      console.error('Supabase client tidak tersedia');
      return;
    }
    
    // Ambil produk dengan join gambar (query yang sama seperti dalam test-debug-images.js)
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .limit(3);
    
    if (error) {
      console.error('Error saat mengambil produk:', error);
      return;
    }
    
    console.log(`Ditemukan ${data.length} produk dengan join`);
    data.forEach((prod, idx) => {
      const imageCount = prod.product_images ? prod.product_images.length : 0;
      console.log(`${idx + 1}. ${prod.name} (ID: ${prod.id}): ${imageCount} gambar`);
      if (prod.product_images && prod.product_images.length > 0) {
        console.log(`   Contoh URL: ${prod.product_images[0].image_url}`);
      }
    });

    console.log('\nSekarang mencoba query produk "Kursi Tamu Minimalis" spesifik...');
    const { data: specificData, error: specificError } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .eq('name', 'Kursi Tamu Minimalis')
      .single();
    
    if (specificError) {
      console.error('Error saat mengambil produk spesifik:', specificError);
      return;
    }
    
    console.log('Produk spesifik:');
    console.log('ID:', specificData.id);
    console.log('Nama:', specificData.name);
    console.log('Gambar produk:', specificData.product_images ? specificData.product_images.length : 0);
    
    if (specificData.product_images && specificData.product_images.length > 0) {
      console.log('Gambar-gambar produk:');
      specificData.product_images.forEach((img, idx) => {
        console.log(`${idx + 1}. ${img.image_url} (primary: ${img.is_primary})`);
      });
    }
    
  } catch (error) {
    console.error('Error saat mengambil produk:', error);
  }
};

testMatchingQuery();