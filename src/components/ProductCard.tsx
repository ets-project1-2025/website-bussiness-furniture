import Link from "next/link";
import Image from "next/image";
import { ProductSchema } from "lib/interfaces/schema";

interface ProductCardProps {
  product: ProductSchema;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative h-60 w-full">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name} 
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Gambar tidak tersedia</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            {product.price && product.currency 
              ? new Intl.NumberFormat('id-ID', { 
                  style: 'currency', 
                  currency: product.currency 
                }).format(product.price) 
              : 'Hubungi Kami'}
          </span>
          <Link href={`/product/${product.slug}`}>
            <a className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Detail →
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;