// Skrip untuk memeriksa struktur tabel profiles
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Ambil konfigurasi dari environment
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Buat client Supabase dengan service role
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const checkProfilesTable = async () => {
  console.log('Memeriksa struktur tabel profiles...');
  
  try {
    // Cek struktur tabel dari information_schema
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'profiles');
    
    if (error) {
      console.error('Error saat mengambil informasi kolom:', error);
      // Jika gagal melalui information_schema, coba ambil satu baris dari tabel profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
        
      if (profileError) {
        console.error('Error saat mengambil data dari profiles:', profileError);
      } else {
        if (profileData && profileData.length > 0) {
          console.log('Contoh data dari tabel profiles (kolom-kolom yang tersedia):');
          console.log(Object.keys(profileData[0]));
        } else {
          console.log('Tabel profiles kosong, tidak bisa menentukan struktur');
        }
      }
      return;
    }
    
    console.log('Struktur tabel profiles:');
    data.forEach(column => {
      console.log(`- ${column.column_name}: ${column.data_type} ${column.is_nullable === 'YES' ? '(nullable)' : '(not nullable)'} ${column.column_default ? `default: ${column.column_default}` : ''}`);
    });
    
    // Cek apakah kolom is_admin sudah ada
    const hasIsAdmin = data.some(col => col.column_name === 'is_admin');
    console.log(`\nKolom is_admin: ${hasIsAdmin ? 'SUDAH ADA' : 'BELUM ADA'}`);
    
    // Ambil juga beberapa data profil untuk melihat struktur sebenarnya
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(2);
    
    if (profilesError) {
      console.log('Error saat mengambil data profiles:', profilesError);
    } else if (profilesData && profilesData.length > 0) {
      console.log('\nContoh data dari tabel profiles:');
      profilesData.forEach((profile, index) => {
        console.log(`${index + 1}. ID: ${profile.id}`);
        console.log(`   Struktur:`, profile);
      });
    } else {
      console.log('\nTabel profiles kosong');
    }
    
  } catch (error) {
    console.error('Error dalam checkProfilesTable:', error);
  }
};

checkProfilesTable();