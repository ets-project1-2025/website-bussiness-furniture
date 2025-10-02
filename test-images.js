// Test script untuk memeriksa data gambar produk di Supabase
import { createSupabaseClient } from './src/lib/supabase.js';

const testImages = async () => {
  console.log('Mengambil gambar produk dari Supabase...');
  
  // Gunakan service role untuk akses penuh ke data
  const supabase = createSupabaseClient(true);
  
  try {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10); // Ambil 10 entri terbaru saja
    
    if (error) {
      console.error('Error saat mengambil gambar produk:', error);
      return;
    }
    
    console.log(`Ditemukan ${data?.length || 0} gambar produk di tabel product_images`);
    
    if (data && data.length > 0) {
      console.log('\nContoh gambar produk pertama:');
      console.log('ID:', data[0].id);
      console.log('Product ID:', data[0].product_id);
      console.log('URL Gambar:', data[0].image_url);
      console.log('Apakah utama:', data[0].is_primary);
      
      console.log('\nBeberapa entri gambar produk:');
      data.forEach((img, index) => {
        console.log(`${index + 1}. Produk ${img.product_id}: ${img.image_url} (utama: ${img.is_primary})`);
      });
    } else {
      console.log('Tabel product_images kosong.');
    }
    
    // Sekarang coba ambil produk dengan gambar-gambar mereka
    console.log('\nMencoba mengambil produk dengan gambar menggunakan join...');
    const { data: productsWithImages, error: joinError } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .limit(5); // Ambil 5 produk pertama
    
    if (joinError) {
      console.error('Error saat mengambil produk dengan gambar:', joinError);
      return;
    }
    
    if (productsWithImages) {
      console.log(`\nDitemukan ${productsWithImages.length} produk dengan informasi gambar`);
      
      productsWithImages.forEach((product, index) => {
        const imageCount = product.product_images ? product.product_images.length : 0;
        console.log(`${index + 1}. ${product.name}: ${imageCount} gambar`);
        
        if (imageCount > 0) {
          console.log(`   Contoh URL gambar: ${product.product_images[0].image_url}`);
        }
      });
    }
    
  } catch (error) {
    console.error('Error saat mengambil data gambar:', error);
  }
};

testImages();