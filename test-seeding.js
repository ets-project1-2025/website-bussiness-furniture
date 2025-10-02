// Test script untuk menjalankan seeding dengan logging tambahan
import { insertDummyProducts } from './src/lib/seed-products.js';

const testSeeding = async () => {
  console.log('Memulai seeding produk dummy...');
  
  try {
    await insertDummyProducts();
    console.log('Seeding selesai!');
  } catch (error) {
    console.error('Error dalam seeding:', error);
  }
  
  // Sekarang periksa jumlah produk dan gambar
  console.log('\nMemeriksa hasil seeding...');
  const { createSupabaseClient } = await import('./src/lib/supabase.js');
  
  // Gunakan service role untuk akses penuh
  const supabase = createSupabaseClient(true);
  
  // Hitung jumlah produk
  const { count: productCount, error: productError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  
  if (productError) {
    console.error('Error menghitung produk:', productError);
  } else {
    console.log(`Jumlah produk: ${productCount}`);
  }
  
  // Hitung jumlah gambar
  const { count: imageCount, error: imageError } = await supabase
    .from('product_images')
    .select('*', { count: 'exact', head: true });
  
  if (imageError) {
    console.error('Error menghitung gambar:', imageError);
  } else {
    console.log(`Jumlah gambar produk: ${imageCount}`);
  }
};

testSeeding();