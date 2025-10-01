// src/lib/cart.js
import { supabase } from './supabase';

// Fungsi untuk mendapatkan item keranjang berdasarkan user ID
export const getCartItems = async (userId) => {
  if (!userId) {
    // Jika tidak ada userId, coba ambil dari localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  // Ambil dari database untuk pengguna terotentikasi
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products(*, product_images(*))
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching cart items:', error);
    // Jika terjadi error, kembalikan dari localStorage sebagai fallback
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  // Format data agar konsisten dengan struktur sebelumnya
  return data.map(item => ({
    ...item.product,
    quantity: item.quantity,
    cart_item_id: item.id // ID dari item keranjang
  }));
};

// Fungsi untuk menambahkan item ke keranjang
export const addToCart = async (userId, product, quantity = 1) => {
  if (!userId) {
    // Jika tidak ada userId, gunakan localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      const cart = await getCartItems(userId);
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
    return [];
  }

  // Tambahkan ke database untuk pengguna terotentikasi
  const { data, error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: userId,
      product_id: product.id,
      quantity: quantity
    }, {
      onConflict: 'user_id,product_id'
    })
    .select(`
      *,
      product:products(*, product_images(*))
    `)
    .single();

  if (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }

  // Format data agar konsisten
  return [{
    ...data.product,
    quantity: data.quantity,
    cart_item_id: data.id
  }]; // Kembalikan dalam bentuk array untuk konsistensi
};

// Fungsi untuk menghapus item dari keranjang
export const removeFromCart = async (userId, productId) => {
  if (!userId) {
    // Jika tidak ada userId, hapus dari localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      const cart = await getCartItems(userId);
      const updatedCart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    }
    return [];
  }

  // Hapus dari database untuk pengguna terotentikasi
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }

  return await getCartItems(userId);
};

// Fungsi untuk memperbarui jumlah item di keranjang
export const updateCartItemQuantity = async (userId, productId, quantity) => {
  if (!userId) {
    // Jika tidak ada userId, perbarui di localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      const cart = await getCartItems(userId);
      const item = cart.find(item => item.id === productId);
      
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          return removeFromCart(userId, productId);
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
    return [];
  }

  // Perbarui di database untuk pengguna terotentikasi
  if (quantity > 0) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .select(`
        *,
        product:products(*, product_images(*))
      `)
      .single();

    if (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }

    // Format data agar konsisten
    return [{
      ...data.product,
      quantity: data.quantity,
      cart_item_id: data.id
    }]; // Kembalikan dalam bentuk array untuk konsistensi
  } else {
    return removeFromCart(userId, productId);
  }
};

// Fungsi untuk mengosongkan keranjang
export const clearCart = async (userId) => {
  if (!userId) {
    // Jika tidak ada userId, kosongkan localStorage untuk pengguna anonim
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      return [];
    }
    return [];
  }

  // Kosongkan database untuk pengguna terotentikasi
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }

  return [];
};

// Fungsi untuk menghitung total item di keranjang
export const getCartItemCount = async (userId) => {
  const cartItems = await getCartItems(userId);
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Fungsi untuk menghitung total harga di keranjang
export const getCartTotal = async (userId) => {
  const cartItems = await getCartItems(userId);
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};