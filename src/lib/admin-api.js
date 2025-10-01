// src/lib/admin-api.js
import { supabase } from './supabase';

// Fungsi CRUD untuk produk
export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateProduct = async (id, productData) => {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category_name:categories(name),
      product_images(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi CRUD untuk kategori
export const createCategory = async (categoryData) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([categoryData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateCategory = async (id, categoryData) => {
  const { data, error } = await supabase
    .from('categories')
    .update(categoryData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteCategory = async (id) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi untuk mengelola gambar produk
export const addProductImage = async (imageData) => {
  const { data, error } = await supabase
    .from('product_images')
    .insert([imageData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const removeProductImage = async (imageId) => {
  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', imageId);

  if (error) {
    throw error;
  }

  return { success: true };
};

// Fungsi CRUD untuk lookbook galleries
export const createLookbookGallery = async (galleryData) => {
  const { data, error } = await supabase
    .from('lookbook_galleries')
    .insert([galleryData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateLookbookGallery = async (id, galleryData) => {
  const { data, error } = await supabase
    .from('lookbook_galleries')
    .update(galleryData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteLookbookGallery = async (id) => {
  const { error } = await supabase
    .from('lookbook_galleries')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return { success: true };
};

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

// Fungsi CRUD untuk lookbook hotspots
export const createLookbookHotspot = async (hotspotData) => {
  const { data, error } = await supabase
    .from('lookbook_hotspots')
    .insert([hotspotData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateLookbookHotspot = async (id, hotspotData) => {
  const { data, error } = await supabase
    .from('lookbook_hotspots')
    .update(hotspotData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteLookbookHotspot = async (id) => {
  const { error } = await supabase
    .from('lookbook_hotspots')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const getHotspotsByGalleryId = async (galleryId) => {
  const { data, error } = await supabase
    .from('lookbook_hotspots')
    .select(`
      *,
      product:products(name, price, product_images(image_url))
    `)
    .eq('gallery_id', galleryId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi CRUD untuk orders
export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateOrder = async (id, orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .update(orderData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteOrder = async (id) => {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:profiles(full_name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const getOrderById = async (id) => {
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
    throw error;
  }

  return data;
};

// Fungsi CRUD untuk order_items
export const createOrderItem = async (orderItemData) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert([orderItemData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getOrderItemsByOrderId = async (orderId) => {
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      product:products(name, price, product_images(image_url))
    `)
    .eq('order_id', orderId);

  if (error) {
    throw error;
  }

  return data;
};

// Fungsi CRUD untuk reviews
export const createReview = async (reviewData) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select(`
      *,
      user:profiles(full_name, avatar_url)
    `)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateReview = async (id, reviewData) => {
  const { data, error } = await supabase
    .from('reviews')
    .update(reviewData)
    .eq('id', id)
    .select(`
      *,
      user:profiles(full_name, avatar_url)
    `)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteReview = async (id) => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return { success: true };
};

export const getReviewsByProduct = async (productId) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      user:profiles(full_name, avatar_url)
    `)
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const getAverageRatingByProduct = async (productId) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId);

  if (error) {
    throw error;
  }

  if (data.length === 0) {
    return 0;
  }

  const sum = data.reduce((acc, review) => acc + review.rating, 0);
  return sum / data.length;
};