// Test script untuk menguji query join langsung ke Supabase
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Ambil konfigurasi dari environment
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Buat client Supabase dengan service role
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const testDirectQuery = async () => {
  console.log('Menguji query join langsung ke Supabase...');
  
  try {
    // Ambil produk dengan join gambar
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .limit(5);
    
    if (error) {
      console.error('Error dalam query join:', error);
      return;
    }
    
    console.log(`Ditemukan ${data.length} produk dengan join:`);
    
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}:`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Jumlah gambar: ${product.product_images ? product.product_images.length : 0}`);
      
      if (product.product_images && product.product_images.length > 0) {
        product.product_images.forEach((img, imgIndex) => {
          console.log(`   Gambar ${imgIndex + 1}: ${img.image_url} (primary: ${img.is_primary})`);
        });
      }
      console.log('');
    });
    
    // Juga coba query spesifik untuk satu produk
    console.log('Menguji query produk spesifik...');
    const { data: specificData, error: specificError } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .eq('name', 'Kursi Tamu Minimalis')
      .single();
    
    if (specificError) {
      console.error('Error mengambil produk spesifik:', specificError);
    } else {
      console.log('Produk spesifik:');
      console.log(`- Nama: ${specificData.name}`);
      console.log(`- ID: ${specificData.id}`);
      console.log(`- Jumlah gambar: ${specificData.product_images ? specificData.product_images.length : 0}`);
      
      if (specificData.product_images) {
        specificData.product_images.forEach((img, idx) => {
          console.log(`  Gambar ${idx + 1}: ${img.image_url}`);
        });
      }
    }
    
  } catch (error) {
    console.error('Error dalam testDirectQuery:', error);
  }
};

testDirectQuery();