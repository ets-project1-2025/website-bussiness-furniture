// Skrip untuk menandai pengguna tertentu sebagai admin di Supabase
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Ambil konfigurasi dari environment
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Buat client Supabase dengan service role
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const updateAdminStatus = async (email, isAdmin = true) => {
  console.log(`Memperbarui status admin untuk: ${email} -> ${isAdmin ? 'admin' : 'non-admin'}`);
  
  try {
    // Cari user berdasarkan email
    const { data: authUser, error: userError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError) {
      console.error('Error saat mencari user:', userError);
      return false;
    }

    if (!authUser) {
      console.error('User tidak ditemukan');
      return false;
    }

    // Update profil user dengan status admin
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authUser.id,
        is_admin: isAdmin
      }, { onConflict: 'id' });  // Gunakan upsert untuk membuat atau update

    if (profileError) {
      console.error('Error saat memperbarui status admin:', profileError);
      // Jika error karena kolom is_admin belum ada, coba update dengan hanya id
      const { error: simpleError } = await supabase
        .from('profiles')
        .upsert({ id: authUser.id }, { onConflict: 'id' });
      
      if (simpleError) {
        console.error('Error saat membuat profil:', simpleError);
        return false;
      }
      
      console.log('Profil berhasil dibuat, tetapi kolom is_admin mungkin tidak ada');
      return true;
    }

    console.log(`Status admin berhasil diperbarui untuk ${email}`);
    return true;
  } catch (error) {
    console.error('Error dalam updateAdminStatus:', error);
    return false;
  }
};

// Gunakan email yang ingin Anda jadikan admin
const emailAdmin = process.argv[2]; // Ambil email dari argumen command line

if (!emailAdmin) {
  console.log('Penggunaan: node set-admin.js <email_user>');
  console.log('Contoh: node set-admin.js admin@example.com');
  process.exit(1);
}

updateAdminStatus(emailAdmin, true);