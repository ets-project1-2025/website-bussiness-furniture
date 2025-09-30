import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { ProductSchema } from "lib/interfaces/schema";
import CartItemsContext from "contexts/cartItemsContext";
import Types from "reducers/cart/types";
import { PortableText, toPlainText } from "@portabletext/react";
import productsSlugsQuery from "lib/sanity/queries/products_slugs";
import productQuery from "lib/sanity/queries/product";
import urlFor from "lib/sanity/urlFor";
import client from "lib/sanity/client";
import classNames from "classnames";
import MetaHead from "components/MetaHead";
import CartVisibilityContext from "contexts/cartVisibilityContext";

interface ProductProps {
  product: ProductSchema;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { toggleCartVisibility } = useContext(CartVisibilityContext);
  const { dispatch } = useContext(CartItemsContext);

  const addToCart = () => {
    dispatch({
      type: Types.addToCart,
      payload: { ...product }
    });

    toggleCartVisibility();
  };

  // WhatsApp sharing functionality
  const shareToWhatsApp = () => {
    const message = `Halo, saya tertarik dengan produk '${product.name}'. Apakah produk ini masih tersedia?`;
    const phoneNumber = '622112345678'; // Replace with actual phone number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  
  // If product is not available, show a message
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 mt-2">Maaf, produk yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Link href="/produk">
          <a className="text-blue-600 hover:underline flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Katalog
          </a>
        </Link>
        
        {product?.name && (
          <MetaHead
            title={`${product.name} - FurnitureKami`}
            description={product.description && Array.isArray(product.description) ? toPlainText(product.description) : ''}
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery Section */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {product?.images && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`relative h-48 rounded-lg overflow-hidden cursor-pointer ${index === 0 ? 'col-span-2' : ''}`}
                    onClick={() => console.log('Zoom image', img)}
                  >
                    <Image
                      src={urlFor(img).url()}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      alt={`${product.name} - Gambar ${index + 1}`}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-2 bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                  <span className="text-gray-500">Gambar tidak tersedia</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="w-16 h-16 bg-gray-200 border border-gray-300 rounded cursor-pointer">
                  <div className="bg-gray-200 border-2 border-dashed rounded w-full h-full" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81l-1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 ml-2">(42 ulasan)</span>
            </div>
            
            <div className="text-2xl font-bold text-blue-600 mb-6">
              {product.price && product.currency 
                ? new Intl.NumberFormat('id-ID', { 
                    style: 'currency', 
                    currency: product.currency 
                  }).format(product.price) 
                : 'Hubungi Kami'}
            </div>
            
            {/* Specifications */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Spesifikasi Produk</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Kategori</p>
                  <p className="font-medium">{product.category?.title || 'Umum'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Material</p>
                  <p className="font-medium">Kayu Jati berkualitas</p>
                </div>
                <div>
                  <p className="text-gray-600">Dimensi</p>
                  <p className="font-medium">120 x 60 x 75 cm</p>
                </div>
                <div>
                  <p className="text-gray-600">Berat</p>
                  <p className="font-medium">15 kg</p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Deskripsi</h3>
              {product?.description && (
                <div className="text-gray-600">
                  <PortableText value={product?.description} />
                </div>
              )}
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 min-w-[200px]"
              >
                Tambahkan ke Keranjang
              </button>
              <button
                onClick={shareToWhatsApp}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center min-w-[200px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Tanyakan via WhatsApp
              </button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Layanan Kami</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <p className="text-sm">Pengiriman</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-sm">Garansi</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p className="text-sm">Purna Jual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="relative h-48 w-full bg-gray-200">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Nama Produk Terkait</h3>
                  <p className="text-gray-600 text-sm mb-3">Deskripsi singkat produk terkait</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">Rp 1.500.000</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await client.fetch(productQuery, {
    slug: params?.slug
  });

  // Return a fallback page if product is not found
  if (!product) {
    return {
      props: { 
        product: null 
      },
      revalidate: 100
    };
  }

  return {
    props: { product },
    revalidate: 100
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(productsSlugsQuery);

  const paths = slugs.map((item: { slug: string }) => ({
    params: { slug: item.slug }
  }));

  return {
    paths,
    fallback: true
  };
};

export default Product;