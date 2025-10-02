import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_CONFIG } from '../supabase-config';

export const createClient = () => 
  createBrowserClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
  );
  
// Fungsi untuk server-side rendering
export const createServerClient = () => {
  return createBrowserClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
  );
};