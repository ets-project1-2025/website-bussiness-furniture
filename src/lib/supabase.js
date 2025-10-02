// src/lib/supabase.js
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Fungsi untuk membuat client Supabase
export const createSupabaseClient = (useServiceRole = false) => {
  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

// Membuat instance client Supabase
export const supabase = createSupabaseClient();

// Fungsi untuk mendapatkan client Supabase
export const getSupabase = () => {
  return supabase;
};