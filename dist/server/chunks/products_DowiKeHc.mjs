import { c as createSupabaseClient } from './supabase_Cmeg_PNw.mjs';

// src/lib/products.js

// Fungsi untuk mendapatkan semua produk
const getAllProducts = async () => {
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
const getProductById = async (id) => {
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

// Fungsi untuk mendapatkan kategori produk
const getCategories = async () => {
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
const getAllLookbookGalleries = async () => {
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
const getLookbookGalleryById = async (id) => {
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

export { getLookbookGalleryById as a, getAllLookbookGalleries as b, getProductById as c, getCategories as d, getAllProducts as g };
