// src/lib/auth.js
import { supabase } from './supabase';

// Fungsi untuk login
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi untuk register
export const register = async (email, password, fullName) => {
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
    throw error;
  }

  // Tambahkan profile ke tabel profiles
  if (data.user) {
    await supabase
      .from('profiles')
      .insert([{ id: data.user.id, full_name: fullName }]);
  }

  return data;
};

// Fungsi untuk logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
};

// Fungsi untuk mendapatkan user saat ini
export const getCurrentUser = async () => {
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
    throw error;
  }

  return data;
};

// Fungsi untuk memperbarui profile pelanggan
export const updateCustomerProfile = async (profileData) => {
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
    throw error;
  }

  return data;
};