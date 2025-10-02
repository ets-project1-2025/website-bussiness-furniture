// src/lib/auth.js
import { createSupabaseClient } from './supabase';

// Fungsi untuk login
export const login = async (email, password) => {
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
export const register = async (email, password, fullName) => {
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
export const logout = async () => {
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
export const getCurrentUser = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Fungsi untuk memeriksa apakah user sudah login
export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return !!user;
};

// Fungsi untuk mendapatkan profile pelanggan
export const getCustomerProfile = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Profile cannot be retrieved.');
  }

  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching customer profile:', error);
    throw error;
  }

  return data;
};

// Fungsi untuk memperbarui profile pelanggan
export const updateCustomerProfile = async (profileData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Profile cannot be updated.');
  }

  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating customer profile:', error);
    throw error;
  }

  return data;
};