import { c as createSupabaseClient } from './supabase_Cmeg_PNw.mjs';

// src/lib/auth.js

// Fungsi untuk login
const login = async (email, password) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Authentication cannot proceed.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error);
    throw error;
  }

  return data;
};

// Fungsi untuk register
const register = async (email, password, fullName) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Registration cannot proceed.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });

  if (error) {
    console.error('Registration error:', error);
    throw error;
  }

  // Tambahkan profile ke tabel profiles
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id, full_name: fullName }]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }
  }

  return data;
};

// Fungsi untuk logout
const logout = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Logout cannot proceed.');
  }

  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan user saat ini
const getCurrentUser = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export { logout as a, getCurrentUser as g, login as l, register as r };
