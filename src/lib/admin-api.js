// src/lib/admin-api.js
import { createSupabaseClient } from './supabase';

// Fungsi CRUD untuk produk
export const createProduct = async (productData) => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  return data;
};

export const updateProduct = async (id, productData) => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }

  return data;
};

export const deleteProduct = async (id) => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }

  return { success: true };
};

export const getAllProducts = async () => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
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

// Fungsi CRUD untuk kategori
export const createCategory = async (categoryData) => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('categories')
    .insert([categoryData])
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }

  return data;
};

export const updateCategory = async (id, categoryData) => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('categories')
    .update(categoryData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating category:', error);
    throw error;
  }

  return data;
};

export const deleteCategory = async (id) => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    throw error;
  }

  return { success: true };
};

export const getAllCategories = async () => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
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

// Fungsi untuk mengelola gambar produk
export const addProductImage = async (imageData) => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('product_images')
    .insert([imageData])
    .select()
    .single();

  if (error) {
    console.error('Error adding product image:', error);
    throw error;
  }

  return data;
};

export const removeProductImage = async (imageId) => {
  // Gunakan service role key untuk operasi admin
  const supabase = createSupabaseClient(true);
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', imageId);

  if (error) {
    console.error('Error removing product image:', error);
    throw error;
  }

  return { success: true };
};

// Fungsi CRUD untuk lookbook galleries
export const createLookbookGallery = async (galleryData) => {
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

export const updateLookbookGallery = async (id, galleryData) => {
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

export const deleteLookbookGallery = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { error } = await supabase
    .from('lookbook_galleries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting lookbook gallery:', error);
    throw error;
  }

  return { success: true };
};

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
    console.error('Error fetching all lookbook galleries:', error);
    return [];
  }

  return data;
};

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
    console.error('Error fetching lookbook gallery by ID:', error);
    return null;
  }

  return data;
};

// Fungsi CRUD untuk lookbook hotspots
export const createLookbookHotspot = async (hotspotData) => {
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

export const updateLookbookHotspot = async (id, hotspotData) => {
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

export const deleteLookbookHotspot = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { error } = await supabase
    .from('lookbook_hotspots')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting lookbook hotspot:', error);
    throw error;
  }

  return { success: true };
};

export const getHotspotsByGalleryId = async (galleryId) => {
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
export const createOrder = async (orderData) => {
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

export const updateOrder = async (id, orderData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('orders')
    .update(orderData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order:', error);
    throw error;
  }

  return data;
};

export const deleteOrder = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting order:', error);
    throw error;
  }

  return { success: true };
};

export const getAllOrders = async () => {
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

export const getOrderById = async (id) => {
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
export const createOrderItem = async (orderItemData) => {
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

export const getOrderItemsByOrderId = async (orderId) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }

  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      product:products(name, price, product_images(image_url))
    `)
    .eq('order_id', orderId);

  if (error) {
    console.error('Error fetching order items by order ID:', error);
    return [];
  }

  return data;
};

// Fungsi CRUD untuk reviews
export const createReview = async (reviewData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select(`
      *,
      user:profiles(full_name, avatar_url)
    `)
    .single();

  if (error) {
    console.error('Error creating review:', error);
    throw error;
  }

  return data;
};

export const updateReview = async (id, reviewData) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

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
    console.error('Error updating review:', error);
    throw error;
  }

  return data;
};

export const deleteReview = async (id) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not available. Operation cannot proceed.');
  }

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting review:', error);
    throw error;
  }

  return { success: true };
};

export const getReviewsByProduct = async (productId) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return [];
  }

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      user:profiles(full_name, avatar_url)
    `)
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews by product:', error);
    return [];
  }

  return data;
};

export const getAverageRatingByProduct = async (productId) => {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client not available.');
    return 0;
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId);

  if (error) {
    console.error('Error fetching average rating by product:', error);
    return 0;
  }

  if (data.length === 0) {
    return 0;
  }

  const sum = data.reduce((acc, review) => acc + review.rating, 0);
  return sum / data.length;
};