// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Fungsi untuk membuat client Supabase
export const createSupabaseClient = (useServiceRole = false) => {
  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Client will not be initialized properly.');
    // Mengembalikan client kosong atau null jika variabel lingkungan tidak tersedia
    return null;
  }

  // Gunakan service role key jika diminta dan tersedia
  if (useServiceRole && supabaseServiceRoleKey) {
    return createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// Membuat instance client Supabase
export const supabase = createSupabaseClient();

// Fungsi untuk mendapatkan client Supabase
export const getSupabase = () => {
  return supabase;
};