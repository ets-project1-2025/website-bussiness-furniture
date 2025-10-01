// src/lib/supabase-config.ts
// File konfigurasi untuk Supabase project

export const SUPABASE_CONFIG = {
  url: import.meta.env.PUBLIC_SUPABASE_URL!,
  anonKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
};

export const TABLES = {
  PROFILES: 'profiles',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  PRODUCT_IMAGES: 'product_images',
  LOOKBOOK_GALLERIES: 'lookbook_galleries',
  LOOKBOOK_HOTSPOTS: 'lookbook_hotspots',
  REVIEWS: 'reviews',
  WISHLISTS: 'wishlists',
  LOYALTY_POINTS_LOG: 'loyalty_points_log',
  USER_GENERATED_CONTENT: 'user_generated_content',
  POSTS: 'posts',
  ORDERS: 'orders',
  ORDER_ITEMS: 'order_items',
} as const;