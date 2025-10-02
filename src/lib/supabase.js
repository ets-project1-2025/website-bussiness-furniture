// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Fungsi untuk membuat client Supabase
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Client will not be initialized properly.');
    // Mengembalikan client kosong atau null jika variabel lingkungan tidak tersedia
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// Membuat instance client Supabase
export const supabase = createSupabaseClient();