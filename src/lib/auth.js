// src/lib/auth.js
import { createSupabaseClient } from './supabase';
import { createSupabaseServerClient } from './supabase-server'; // Impor fungsi server client

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
  // Untuk logout, kita tetap bisa menggunakan client anon di sisi klien,
  // atau server client jika konteksnya SSR.
  // Dalam konteks SSR, kita mungkin ingin menerima konteks Astro di sini juga.
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
// Menerima konteks Astro untuk SSR
export const getCurrentUser = async (Astro = null) => {
  let supabase;

  if (Astro) {
    // Jika konteks Astro tersedia (SSR), gunakan server client
    const { client } = createSupabaseServerClient(Astro);
    supabase = client;
    if (!supabase) {
      console.warn('Supabase server client not available.');
      return null;
    }
  } else {
    // Jika tidak (klien), gunakan client anon
    supabase = createSupabaseClient();
    if (!supabase) {
      console.warn('Supabase client not available.');
      return null;
    }
  }

  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Fungsi untuk memeriksa apakah user sudah login
// Menerima konteks Astro untuk SSR
export const isAuthenticated = async (Astro = null) => {
  const user = await getCurrentUser(Astro);
  return !!user;
};

// Fungsi untuk mendapatkan profile pelanggan
// Menerima konteks Astro untuk SSR
export const getCustomerProfile = async (Astro = null) => {
  const supabase = createSupabaseClient(); // Kita tetap gunakan client anon untuk query data
  
  if (!supabase) {
    throw new Error('Supabase client not available. Profile cannot be retrieved.');
  }

  const user = await getCurrentUser(Astro); // Gunakan SSR-aware getCurrentUser
  
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

// Fungsi untuk memeriksa apakah user adalah admin
// Menerima konteks Astro untuk SSR
// Penting: service role key hanya digunakan untuk mengakses tabel profiles, bukan untuk auth.getUser
export const isAdmin = async (Astro = null) => {
  // Gunakan service role untuk mengakses tabel profiles
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    console.warn('Supabase client with service role not available.');
    return false;
  }

  const user = await getCurrentUser(Astro); // Gunakan SSR-aware getCurrentUser
  
  if (!user) {
    return false;
  }

  // Cek apakah user memiliki role admin di tabel profiles
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error checking admin status:', error);
    // Jika tabel profiles belum memiliki kolom is_admin, default ke false
    return false;
  }

  return profile?.is_admin === true;
};

// Fungsi untuk memperbarui profile pelanggan
// Menerima konteks Astro untuk SSR
export const updateCustomerProfile = async (profileData, Astro = null) => {
  const supabase = createSupabaseClient(); // Kita tetap gunakan client anon untuk mutation data
  
  if (!supabase) {
    throw new Error('Supabase client not available. Profile cannot be updated.');
  }

  const user = await getCurrentUser(Astro); // Gunakan SSR-aware getCurrentUser
  
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