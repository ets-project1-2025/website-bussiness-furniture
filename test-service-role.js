import { createClient } from '@supabase/supabase-js';

// Coba akses langsung menggunakan key yang diberikan
const supabaseUrl = 'https://xgbfvmvlxrzsxktaomcz.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnYmZ2bXZseHJ6c3hrdGFvbWN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTIzNzIwMSwiZXhwIjoyMDc0ODEzMjAxfQ.6gLrLosUHobLlOmczNlUS0TCT3tFi9l71kjfK78_hQ4';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const testServiceRole = async () => {
  console.log('Menguji akses service role...');
  
  try {
    // Coba menghapus data lama
    console.log('Menghapus data lama...');
    await supabase.from('categories').delete();
    await supabase.from('product_images').delete();
    await supabase.from('products').delete();
    
    console.log('Berhasil menghapus data lama');
    
    // Coba insert kategori
    console.log('Mencoba insert kategori...');
    const { data, error } = await supabase.from('categories').insert([
      {
        name: 'Test Category',
        slug: 'test-category'
      }
    ]).select();
    
    if (error) {
      console.error('Error saat insert kategori:', error);
    } else {
      console.log('Berhasil insert kategori:', data);
    }
  } catch (error) {
    console.error('Error dalam testServiceRole:', error);
  }
};

testServiceRole();