// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing Supabase URL in environment variables');
}

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase Anon Key in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);