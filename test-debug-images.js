// Test script untuk mengecek dan men-debug tabel product_images
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Ambil konfigurasi dari environment
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Buat client Supabase dengan service role
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const checkProductImages = async () => {
  console.log('Memeriksa status tabel product_images...');
  
  try {
    // Ambil info detail dari tabel product_images
    const { data: images, error } = await supabase
      .from('product_images')
      .select('*')
      .limit(10);
    
    if (error) {
      console.error('Error saat mengambil data dari product_images:', error);
      return;
    }
    
    console.log(`Ditemukan ${images?.length || 0} gambar dalam tabel`);
    
    if (images && images.length > 0) {
      console.log('Contoh beberapa gambar:');
      images.slice(0, 3).forEach((img, idx) => {
        console.log(`${idx + 1}. ID: ${img.id}, Product ID: ${img.product_id}, URL: ${img.image_url}, Primary: ${img.is_primary}`);
      });
    }

    // Ambil info dari tabel products
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('*')
      .limit(5);
    
    if (productError) {
      console.error('Error saat mengambil data dari products:', productError);
      return;
    }
    
    console.log(`\nDitemukan ${products?.length || 0} produk dalam tabel`);
    
    if (products && products.length > 0) {
      console.log('Contoh beberapa produk:');
      products.slice(0, 3).forEach((prod, idx) => {
        console.log(`${idx + 1}. ID: ${prod.id}, Nama: ${prod.name}, Category ID: ${prod.category_id}`);
      });
    }

    // Ambil info dari tabel categories
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .limit(10);
    
    if (categoryError) {
      console.error('Error saat mengambil data dari categories:', categoryError);
      return;
    }
    
    console.log(`\nDitemukan ${categories?.length || 0} kategori dalam tabel`);
    
    if (categories && categories.length > 0) {
      console.log('Contoh beberapa kategori:');
      categories.slice(0, 3).forEach((cat, idx) => {
        console.log(`${idx + 1}. ID: ${cat.id}, Nama: ${cat.name}, Slug: ${cat.slug}`);
      });
    }

    // Juga coba ambil produk dengan join gambar
    console.log('\nMencoba mengambil produk dengan gambar (join):');
    const { data: productsWithImages, error: joinError } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .limit(3);
    
    if (joinError) {
      console.error('Error pada join query:', joinError);
      return;
    }
    
    if (productsWithImages) {
      console.log(`Ditemukan ${productsWithImages.length} produk dengan join`);
      productsWithImages.forEach((prod, idx) => {
        const imageCount = prod.product_images ? prod.product_images.length : 0;
        console.log(`${idx + 1}. ${prod.name}: ${imageCount} gambar`);
        if (prod.product_images && prod.product_images.length > 0) {
          console.log(`   Contoh URL: ${prod.product_images[0].image_url}`);
        }
      });
    }

  } catch (error) {
    console.error('Error dalam checkProductImages:', error);
  }
};

checkProductImages();