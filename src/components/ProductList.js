// Contoh komponen React untuk menampilkan produk dari Sanity
import { useState, useEffect } from 'react';
import { getAllProducts } from '../lib/sanity';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4">
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-contain mb-4"
            />
          )}
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-gray-600">${product.price?.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {product.description?.[0]?.children?.[0]?.text || 'No description available'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;