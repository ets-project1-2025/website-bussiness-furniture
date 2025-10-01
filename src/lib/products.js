// src/lib/products.js
import { supabase } from './supabase';

// Fungsi untuk mendapatkan semua produk
export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi untuk mendapatkan produk berdasarkan ID
export const getProductById = async (id) => {
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
    throw error;
  }

  return data;
};

// Fungsi untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .eq('category_id', categoryId);

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi untuk mendapatkan kategori produk
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi untuk mendapatkan semua lookbook galleries
export const getAllLookbookGalleries = async () => {
  const { data, error } = await supabase
    .from('lookbook_galleries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi untuk mendapatkan detail lookbook gallery beserta hotspot-nya
export const getLookbookGalleryById = async (id) => {
  const { data, error } = await supabase
    .from('lookbook_galleries')
    .select(`
      *,
      lookbook_hotspots(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};