// src/lib/products.js
import { createSupabaseClient } from './supabase';
import { 
  getAllDummyProducts, 
  getDummyProductById, 
  getDummyProductsByCategory, 
  getDummyCategories 
} from './dummy-products';

// Fungsi untuk mendapatkan semua produk
export const getAllProducts = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available. Using dummy data.');
    return getAllDummyProducts();
  }
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      console.warn('Falling back to dummy data.');
      return getAllDummyProducts();
    }

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    console.warn('Falling back to dummy data.');
    return getAllDummyProducts();
  }
};

// Fungsi untuk mendapatkan produk berdasarkan ID
export const getProductById = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available. Using dummy data.');
    return getDummyProductById(id);
  }
  
  try {
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
      console.error('Error fetching product by ID from Supabase:', error);
      console.warn('Falling back to dummy data.');
      return getDummyProductById(id);
    }

    return data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    console.warn('Falling back to dummy data.');
    return getDummyProductById(id);
  }
};

// Fungsi untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = async (categoryId) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available. Using dummy data.');
    return getDummyProductsByCategory(categoryId);
  }
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .eq('category_id', categoryId);

    if (error) {
      console.error('Error fetching products by category from Supabase:', error);
      console.warn('Falling back to dummy data.');
      return getDummyProductsByCategory(categoryId);
    }

    return data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    console.warn('Falling back to dummy data.');
    return getDummyProductsByCategory(categoryId);
  }
};

// Fungsi untuk mendapatkan kategori produk
export const getCategories = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available. Using dummy data.');
    return getDummyCategories();
  }
  
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories from Supabase:', error);
      console.warn('Falling back to dummy data.');
      return getDummyCategories();
    }

    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    console.warn('Falling back to dummy data.');
    return getDummyCategories();
  }
};

// Fungsi untuk mendapatkan semua lookbook galleries
export const getAllLookbookGalleries = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('lookbook_galleries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching lookbook galleries from Supabase:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching lookbook galleries:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan detail lookbook gallery beserta hotspot-nya
export const getLookbookGalleryById = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('lookbook_galleries')
      .select(`
        *,
        lookbook_hotspots(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching lookbook gallery from Supabase:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching lookbook gallery:', error);
    return null;
  }
};