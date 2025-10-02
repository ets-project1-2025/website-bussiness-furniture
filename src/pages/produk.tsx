import { GetStaticProps } from "next";
import { createClient } from "lib/supabase/client";
import productsQuery from "lib/supabase/queries";
import categoriesQuery from "lib/supabase/queries";
import { ProductSchema, CategorySchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import ProductList from "components/ProductList/ProductList";

interface ProductsPageProps {
  products: ProductSchema[];
  categories: CategorySchema[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, categories }) => {
  return (
    <>
      <MetaHead title="Katalog Produk - Furniture Business" description="Temukan berbagai produk furnitur kami yang berkualitas tinggi dan desain yang indah." />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Katalog Produk</h1>
        
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Kategori</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Semua Kategori</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Urutkan Berdasarkan</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="terbaru">Terbaru</option>
                <option value="harga-terendah">Harga: Terendah ke Tertinggi</option>
                <option value="harga-tertinggi">Harga: Tertinggi ke Terendah</option>
                <option value="terpopuler">Terpopuler</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Harga</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-gray-700 mb-2 font-medium">Filter Tambahan</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                Material: Jati
              </button>
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                Material: Mahoni
              </button>
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                Ruangan: Ruang Tamu
              </button>
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                Ruangan: Kamar Tidur
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold">{products.length}</span> produk
          </p>
          <div className="text-sm text-gray-500">
            <span>Urutkan berdasarkan:</span>
            <select className="ml-2 border border-gray-300 rounded px-2 py-1">
              <option>Terbaru</option>
              <option>Harga Terendah</option>
              <option>Harga Tertinggi</option>
              <option>Terpopuler</option>
            </select>
          </div>
        </div>
        
        {products && <ProductList products={products} />}
        
        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300">
            Muat Lebih Banyak Produk
          </button>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Implementasi query ke Supabase
  // const supabase = createClient();
  // const { data: products, error: productsError } = await supabase.from('products').select('*');
  // const { data: categories, error: categoriesError } = await supabase.from('categories').select('*');

  // if (productsError || categoriesError) {
  //   throw Error("Sorry, something went wrong.");
  // }

  // Temporary: Menggunakan data dummy
  const products = [];
  const categories = [];

  return {
    props: { products, categories },
    revalidate: 60
  };
};

export default ProductsPage;