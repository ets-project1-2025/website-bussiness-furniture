// Contoh cara mengakses data dari Sanity di aplikasi Next.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Konfigurasi client Sanity
export const client = createClient({
  projectId: 'g7h0ho9q',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2022-03-07', // Tanggal versi API Sanity
});

// Builder untuk menghasilkan URL gambar dari Sanity
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Contoh query untuk mendapatkan semua produk
export async function getAllProducts() {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    description,
    price,
    "image": featured_image.asset->url
  }`;
  
  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Contoh query untuk mendapatkan produk berdasarkan slug
export async function getProductBySlug(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    price,
    categories[]->{
      title,
      slug
    },
    "image": featured_image.asset->url
  }`;
  
  try {
    const product = await client.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}