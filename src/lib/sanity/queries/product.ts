import groq from "groq";

const productQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    description,
    featured_image,
    images,
    price,
    currency,
    on_sale,
    sale_price,
    "categories": categories[]->{
      title,
      'slug': slug.current
    },
    "category": categories[0]->{
      title,
      'slug': slug.current
    },
    sku,
    featured
  }
`;

export default productQuery;
