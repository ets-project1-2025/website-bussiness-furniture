const featuredProductsQuery = `*[_type == "product" && featured == true]{
  _id,
  name,
  "slug": slug.current,
  price,
  currency,
  "image": images[0].asset->url,
  description,
  category->
}`;

export default featuredProductsQuery;