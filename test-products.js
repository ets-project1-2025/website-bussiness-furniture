// Test script untuk memeriksa struktur data produk dari Supabase
import { createSupabaseClient } from './src/lib/supabase.js';

const testProducts = async () => {
  console.log('Mengambil produk dari Supabase menggunakan service role...');
  
  try {
    // Gunakan service role untuk memastikan akses penuh
    const supabase = createSupabaseClient(true);
    
    if (!supabase) {
      console.error('Supabase client tidak tersedia');
      return;
    }
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error saat mengambil produk:', error);
      return;
    }
    
    console.log(`Ditemukan ${data.length} produk`);
    
    // Tampilkan informasi produk pertama sebagai contoh
    if (data.length > 0) {
      const firstProduct = data[0];
      console.log('\nContoh produk pertama:');
      console.log('ID:', firstProduct.id);
      console.log('Nama:', firstProduct.name);
      console.log('Deskripsi:', firstProduct.description.substring(0, 100) + '...');
      console.log('Harga:', firstProduct.price);
      console.log('Dimensi:', JSON.stringify(firstProduct.dimensions));
      console.log('Materials:', firstProduct.materials);
      console.log('Category ID:', firstProduct.category_id);
      
      console.log('\nGambar produk:', firstProduct.product_images ? firstProduct.product_images.length : 0);
      if (firstProduct.product_images && firstProduct.product_images.length > 0) {
        console.log('URL gambar pertama:', firstProduct.product_images[0].image_url);
      } else {
        console.log('Tidak ada gambar ditemukan untuk produk ini');
      }
    }
    
    // Periksa beberapa produk secara acak
    console.log('\nMemeriksa beberapa produk secara acak:');
    for (let i = 0; i < Math.min(5, data.length); i++) {
      const product = data[i];
      const imageCount = product.product_images ? product.product_images.length : 0;
      console.log(`${product.name}: ${imageCount} gambar`);
    }
    
  } catch (error) {
    console.error('Error saat mengambil produk:', error);
  }
};

testProducts();