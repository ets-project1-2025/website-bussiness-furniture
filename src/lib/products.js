// src/lib/products.js
import { createSupabaseClient } from './supabase';

// Fungsi untuk mendapatkan semua produk
export const getAllProducts = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data;
};

// Fungsi untuk mendapatkan produk berdasarkan ID
export const getProductById = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return null;
  }
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*),
      categories(name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }

  return data;
};

// Fungsi untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = async (categoryId) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .eq('category_id', categoryId);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data;
};

// Fungsi untuk mendapatkan kategori produk
export const getCategories = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
};

// Fungsi untuk mendapatkan semua lookbook galleries
export const getAllLookbookGalleries = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }
  
  const { data, error } = await supabase
    .from('lookbook_galleries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching lookbook galleries:', error);
    return [];
  }

  return data;
};

// Fungsi untuk mendapatkan detail lookbook gallery beserta hotspot-nya
export const getLookbookGalleryById = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return null;
  }
  
  const { data, error } = await supabase
    .from('lookbook_galleries')
    .select(`
      *,
      lookbook_hotspots(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching lookbook gallery:', error);
    return null;
  }

  return data;
};