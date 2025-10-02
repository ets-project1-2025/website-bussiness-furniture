// Test script untuk menguji fungsi createSupabaseClient
import { createSupabaseClient } from './src/lib/supabase.js';

const testSupabaseClient = async () => {
  console.log('Menguji fungsi createSupabaseClient...');
  
  // Buat client tanpa service role
  const supabaseAnon = createSupabaseClient();
  console.log('Client anon:', supabaseAnon ? 'tersedia' : 'tidak tersedia');
  
  // Buat client dengan service role
  const supabaseService = createSupabaseClient(true);
  console.log('Client service role:', supabaseService ? 'tersedia' : 'tidak tersedia');
  
  if (supabaseService) {
    console.log('Mencoba query dengan client service role dari fungsi...');
    try {
      const { data, error } = await supabaseService
        .from('products')
        .select(`
          *,
          product_images(*)
        `)
        .limit(2);
      
      if (error) {
        console.error('Error dalam query dengan client service role:', error);
      } else {
        console.log(`Berhasil mengambil ${data.length} produk:`);
        data.forEach((product, index) => {
          console.log(`${index + 1}. ${product.name}: ${product.product_images ? product.product_images.length : 0} gambar`);
        });
      }
    } catch (error) {
      console.error('Error saat mencoba query:', error);
    }
  }
};

testSupabaseClient();