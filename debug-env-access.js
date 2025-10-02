// Debug script untuk mengecek akses variabel lingkungan dalam fungsi
import 'dotenv/config';

// Import supabase client function
const { createClient } = await import('@supabase/supabase-js');

// Fungsi yang identik dengan di supabase.js
const debugCreateSupabaseClient = (useServiceRole = false) => {
  console.log('Memeriksa environment variables dalam fungsi...');
  console.log('PUBLIC_SUPABASE_URL:', process.env.PUBLIC_SUPABASE_URL ? 'ADA' : 'TIDAK ADA');
  console.log('PUBLIC_SUPABASE_ANON_KEY:', process.env.PUBLIC_SUPABASE_ANON_KEY ? 'ADA' : 'TIDAK ADA');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'ADA' : 'TIDAK ADA');
  console.log('useServiceRole parameter:', useServiceRole);

  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('supabaseUrl:', supabaseUrl ? 'ADA' : 'TIDAK ADA');
  console.log('supabaseAnonKey:', supabaseAnonKey ? 'ADA' : 'TIDAK ADA');
  console.log('supabaseServiceRoleKey:', supabaseServiceRoleKey ? 'ADA' : 'TIDAK ADA');

  if (!supabaseUrl) {
    console.error('Missing Supabase URL. Client will not be initialized properly.');
    return null;
  }

  // Jika service role diminta dan service role key tersedia
  if (useServiceRole && supabaseServiceRoleKey) {
    console.log('Menginisialisasi Supabase client dengan service role key');
    return createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  // Jika service role tidak diminta, pastikan anon key tersedia
  if (!useServiceRole) {
    if (!supabaseAnonKey) {
      console.warn('Missing Supabase Anon Key. Client will not be initialized properly.');
      return null;
    }
    console.log('Menginisialisasi Supabase client dengan anon key');
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  // Jika service role diminta tapi service role key tidak tersedia
  if (useServiceRole && !supabaseServiceRoleKey) {
    console.error('Service role diminta tapi SUPABASE_SERVICE_ROLE_KEY tidak ditemukan');
    console.log('Menginisialisasi Supabase client dengan anon key sebagai fallback');
    if (!supabaseAnonKey) {
      console.error('Anon key juga tidak ditemukan, mengembalikan null');
      return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  // Default case
  console.log('Menginisialisasi Supabase client dengan anon key');
  return createClient(supabaseUrl, supabaseAnonKey);
};

console.log('=== Tes createSupabaseClient(false) ===');
const client1 = debugCreateSupabaseClient(false);
console.log('Client 1:', !!client1);

console.log('\n=== Tes createSupabaseClient(true) ===');
const client2 = debugCreateSupabaseClient(true);
console.log('Client 2:', !!client2);

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