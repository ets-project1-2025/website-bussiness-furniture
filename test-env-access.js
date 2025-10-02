// Test script untuk menguji akses environment variable
import 'dotenv/config';

console.log('Menguji akses environment variable...');
console.log('PUBLIC_SUPABASE_URL:', process.env.PUBLIC_SUPABASE_URL ? 'TERSEDIA' : 'TIDAK ADA');
console.log('PUBLIC_SUPABASE_ANON_KEY:', process.env.PUBLIC_SUPABASE_ANON_KEY ? 'TERSEDIA' : 'TIDAK ADA');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'TERSEDIA' : 'TIDAK ADA');

// Jika key tersedia, coba buat client langsung
if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.PUBLIC_SUPABASE_URL) {
  console.log('\nMembuat client langsung dengan service role key...');
  
  const { createClient } = await import('@supabase/supabase-js');
  
  const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  console.log('Client berhasil dibuat:', !!supabase);
  
  // Coba query
  try {
    const { data, error } = await supabase
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
      }
    }
  } catch (error) {
    console.error('Error saat mencoba query:', error);
  }
} else {
  console.log('Environment variable tidak lengkap');
}