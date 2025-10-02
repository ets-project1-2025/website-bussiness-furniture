import { c as createSupabaseClient } from './supabase_Cmeg_PNw.mjs';

// src/lib/admin-api.js

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
      category_name:categories(name),
      product_images(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all products:', error);
    return [];
  }

  return data;
};

const getAllCategories = async () => {
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
    console.error('Error fetching all categories:', error);
    return [];
  }

  return data;
};

// Fungsi CRUD untuk lookbook galleries
const createLookbookGallery = async (galleryData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('lookbook_galleries')
    .insert([galleryData])
    .select()
    .single();

  if (error) {
    console.error('Error creating lookbook gallery:', error);
    throw error;
  }

  return data;
};

const updateLookbookGallery = async (id, galleryData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('lookbook_galleries')
    .update(galleryData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating lookbook gallery:', error);
    throw error;
  }

  return data;
};

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
    console.error('Error fetching all lookbook galleries:', error);
    return [];
  }

  return data;
};

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
    console.error('Error fetching lookbook gallery by ID:', error);
    return null;
  }

  return data;
};

// Fungsi CRUD untuk lookbook hotspots
const createLookbookHotspot = async (hotspotData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('lookbook_hotspots')
    .insert([hotspotData])
    .select()
    .single();

  if (error) {
    console.error('Error creating lookbook hotspot:', error);
    throw error;
  }

  return data;
};

const updateLookbookHotspot = async (id, hotspotData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('lookbook_hotspots')
    .update(hotspotData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating lookbook hotspot:', error);
    throw error;
  }

  return data;
};

const getHotspotsByGalleryId = async (galleryId) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }

  const { data, error } = await supabase
    .from('lookbook_hotspots')
    .select(`
      *,
      product:products(name, price, product_images(image_url))
    `)
    .eq('gallery_id', galleryId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching hotspots by gallery ID:', error);
    return [];
  }

  return data;
};

// Fungsi CRUD untuk orders
const createOrder = async (orderData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }

  return data;
};

const getAllOrders = async () => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:profiles(full_name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }

  return data;
};

const getOrderById = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return null;
  }

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:profiles(full_name),
      order_items(*, product:products(name, price, product_images(image_url)))
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching order by ID:', error);
    return null;
  }

  return data;
};

// Fungsi CRUD untuk order_items
const createOrderItem = async (orderItemData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('order_items')
    .insert([orderItemData])
    .select()
    .single();

  if (error) {
    console.error('Error creating order item:', error);
    throw error;
  }

  return data;
};

export { getLookbookGalleryById as a, getAllProducts as b, createLookbookGallery as c, getHotspotsByGalleryId as d, updateLookbookHotspot as e, createLookbookHotspot as f, getAllCategories as g, getAllLookbookGalleries as h, getAllOrders as i, createOrder as j, createOrderItem as k, getOrderById as l, updateLookbookGallery as u };
