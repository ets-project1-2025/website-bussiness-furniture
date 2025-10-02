// Interface untuk struktur data produk dan kategori sesuai dengan skema Supabase
// Berdasarkan dokumentasi di PROJECT_SUMMARY.md
// Juga menyertakan field-field kompatibilitas untuk migrasi dari Sanity

export interface ProductSchema {
  id: string;
  _id?: string; // Untuk kompatibilitas dengan struktur Sanity lama
  name: string;
  slug: string;
  description: string; // Di Supabase, deskripsi biasanya disimpan sebagai text
  image_url: string; // URL gambar produk dari Supabase Storage
  image_urls?: string[]; // URL tambahan dari Supabase Storage
  featured_image?: any; // Untuk kompatibilitas dengan struktur Sanity lama
  images?: any[]; // Untuk kompatibilitas dengan struktur Sanity lama
  price: number;
  currency: string;
  on_sale: boolean;
  sale_price: number;
  sku: string;
  category_id: string; // Foreign key ke tabel categories
  category?: CategorySchema; // Reference to category schema
  featured?: boolean; // For featured products
  dimensions?: Record<string, any>; // JSONB field untuk dimensi produk
  materials?: string[]; // Array field untuk material produk
  // Field dari struktur Sanity lama
  title?: string;
  _type?: string;
  asset?: any;
}

export interface CategorySchema {
  id: string;
  _id?: string; // Untuk kompatibilitas dengan struktur Sanity lama
  name: string; // Mengganti title menjadi name untuk konsistensi
  title?: string; // Untuk kompatibilitas dengan struktur Sanity lama
  description: string;
  slug: string;
  image_url: string; // URL gambar kategori dari Supabase Storage
  featured_image?: any; // Untuk kompatibilitas dengan struktur Sanity lama
  _type?: string;
}
