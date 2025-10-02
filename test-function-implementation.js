// Test script untuk membandingkan implementasi createSupabaseClient
import { createClient } from '@supabase/supabase-js';

// Ini adalah versi fungsi createSupabaseClient yang sebenarnya digunakan di aplikasi
const createSupabaseClient = (useServiceRole = false) => {
  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('Supabase URL:', supabaseUrl ? 'Tersedia' : 'Tidak Tersedia');
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Tersedia' : 'Tidak Tersedia');
  console.log('Supabase Service Role Key:', supabaseServiceRoleKey ? 'Tersedia' : 'Tidak Tersedia');
  console.log('useServiceRole:', useServiceRole);

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Client will not be initialized properly.');
    // Mengembalikan client kosong atau null jika variabel lingkungan tidak tersedia
    return null;
  }

  // Gunakan service role key jika diminta dan tersedia
  if (useServiceRole && supabaseServiceRoleKey) {
    console.log('Menggunakan service role key');
    return createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  console.log('Menggunakan anon key');
  return createClient(supabaseUrl, supabaseAnonKey);
};

const testFunctionImplementation = async () => {
  console.log('Menguji implementasi fungsi createSupabaseClient...');
  
  // Pastikan environment variables tersedia
  import('dotenv').then(async (dotenv) => {
    dotenv.config();
    
    // Buat client dengan service role
    const supabase = createSupabaseClient(true);
    
    if (!supabase) {
      console.error('Gagal membuat supabase client');
      return;
    }
    
    try {
      // Coba insert kategori
      console.log('Mencoba insert kategori menggunakan fungsi createSupabaseClient...');
      const { data, error } = await supabase.from('categories').insert([
        {
          name: 'Test Category dari Fungsi',
          slug: 'test-category-fungsi'
        }
      ]).select();
      
      if (error) {
        console.error('Error saat insert kategori dari fungsi:', error);
      } else {
        console.log('Berhasil insert kategori dari fungsi:', data);
      }
    } catch (error) {
      console.error('Error dalam testFunctionImplementation:', error);
    }
  });
};

testFunctionImplementation();