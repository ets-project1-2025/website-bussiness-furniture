import { GetStaticProps, GetStaticPaths } from "next";
import { createClient } from "lib/supabase/client";
import { CategorySchema, ProductSchema } from "lib/interfaces";
import categoryQuery from "lib/supabase/queries";
import categoriesSlugsQuery from "lib/supabase/queries";
import categoryProductsQuery from "lib/supabase/queries";
import ProductList from "components/ProductList/ProductList";
import MetaHead from "components/MetaHead";

interface CategoryProps {
  products: ProductSchema[];
  category: CategorySchema;
}

const Category: React.FC<CategoryProps> = ({ products, category }) => {
  const { title, description } = category;
  return (
    <>
      {title && (
        <MetaHead
          title={`NextJS Sanity Stripe eCommerce | ${title}`}
          description={description}
        />
      )}
      <div>
        <h1 className="page-heading capitalize">{category.title}</h1>
        {category.description && (
          <p className="paragraph">{category.description}</p>
        )}
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <p className="font-semibold">
            Awww! All {title} products are sold out!
          </p>
        )}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // TODO: Implementasi query ke Supabase
  // const supabase = createClient();
  // const { data: category, error: categoryError } = await supabase
  //   .from('categories')
  //   .select('*')
  //   .eq('slug', params?.slug)
  //   .single();

  // if (categoryError || !category) {
  //   throw Error("Sorry, something went wrong.");
  // }

  // const { data: products, error: productsError } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('category_id', category.id);  // Asumsi ada relasi category_id

  // if (productsError || !products) {
  //   throw Error("Sorry, something went wrong.");
  // }

  // Temporary: Menggunakan data dummy
  const products: any[] = [];
  const category: any = { id: '', title: '', description: '', slug: params?.slug as string };

  return {
    props: { products, category },
    revalidate: 100
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Implementasi query ke Supabase
  // const supabase = createClient();
  // const { data: slugs, error } = await supabase
  //   .from('categories')
  //   .select('slug')
  //   .limit(100); // Batasi jumlah slug untuk performa

  // if (error) {
  //   throw error;
  // }

  // Temporary: Menggunakan data dummy
  const slugs: any[] = [];

  const paths = slugs.map((item: { slug: string }) => ({
    params: { slug: item.slug }
  }));

  return {
    paths,
    fallback: "blocking"
  };
};

export default Category;
