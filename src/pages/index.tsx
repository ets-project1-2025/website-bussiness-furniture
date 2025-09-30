import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import categoriesQuery from "lib/sanity/queries/categories";
import featuredProductsQuery from "lib/sanity/queries/featured_products";
import { CategorySchema, ProductSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import PageLayout from "components/PageLayout/PageLayout";
import CategoryList from "components/CategoryList/CategoryList";
import ProductList from "components/ProductList/ProductList";

interface HomeProps {
  categories: CategorySchema[];
  products: ProductSchema[];
}

const Home: React.FC<HomeProps> = ({ categories, products }) => {
  return (
    <PageLayout>
      <MetaHead 
        title="Furniture Business - Produk Furnitur Berkualitas Tinggi" 
        description="Temukan berbagai produk furnitur berkualitas tinggi dengan desain yang indah dan fungsional untuk rumah dan kantor Anda." 
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-gray-100 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Transformasikan Ruang Anda dengan <span className="text-blue-600">Furniture Berkualitas</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Temukan koleksi furnitur eksklusif kami yang dirancang untuk memberikan kenyamanan, fungsionalitas, dan keindahan pada setiap ruang.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/produk" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Jelajahi Produk
              </a>
              <a 
                href="/tentang-kami" 
                className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 md:h-[450px]" />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Kategori Produk</h2>
          {categories && <CategoryList categories={categories} />}
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Produk Unggulan</h2>
            <a href="/produk" className="text-blue-600 hover:underline font-medium">
              Lihat Semua Produk
            </a>
          </div>
          {products && <ProductList products={products} />}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Apa Kata Pelanggan Kami</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81l-1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Furniture yang saya beli sangat berkualitas dan sesuai dengan deskripsi. Pelayanan pelanggan juga sangat ramah dan membantu."
                </p>
                <p className="font-medium text-gray-800">- Pelanggan {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Temukan Furnitur Impian Anda</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dapatkan inspirasi dan temukan berbagai pilihan furnitur yang sempurna untuk rumah atau kantor Anda.
          </p>
          <a 
            href="/kontak" 
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition duration-300"
          >
            Hubungi Kami Sekarang
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await client.fetch(categoriesQuery);
  const featuredProducts = await client.fetch(featuredProductsQuery);

  if (!categories || !featuredProducts) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { categories, products: featuredProducts },
    revalidate: 60
  };
};

export default Home;
