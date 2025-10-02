// Test script untuk menguji fungsi createSupabaseClient secara spesifik
import { createSupabaseClient } from './src/lib/supabase.js';

const testSpecific = async () => {
  console.log('=== Menguji createSupabaseClient(false) ===');
  const client1 = createSupabaseClient(false);
  console.log('Client 1 (tanpa service role):', !!client1);
  
  console.log('\n=== Menguji createSupabaseClient(true) ===');
  const client2 = createSupabaseClient(true);
  console.log('Client 2 (dengan service role):', !!client2);
  
  if (client2) {
    console.log('Mencoba query dengan client service role...');
    try {
      const { data, error } = await client2
        .from('products')
        .select(`
          *,
          product_images(*)
        `)
        .limit(1);
      
      if (error) {
        console.error('Error dalam query:', error);
      } else {
        console.log('Query berhasil!');
        console.log('Jumlah produk:', data.length);
        if (data.length > 0) {
          console.log('Nama produk:', data[0].name);
          console.log('Jumlah gambar:', data[0].product_images ? data[0].product_images.length : 0);
          if (data[0].product_images && data[0].product_images.length > 0) {
            console.log('URL gambar pertama:', data[0].product_images[0].image_url);
          }
        }
      }
    } catch (error) {
      console.error('Error saat mencoba query:', error);
    }
  }
};

testSpecific();