import type { PortableTextBlock } from "@portabletext/types";

export interface ProductSchema {
  _id: string;
  name: string;
  slug: string;
  description: [PortableTextBlock];
  featured_image: Image;
  images?: Image[]; // Additional images for gallery
  price: number;
  currency: string;
  on_sale: boolean;
  sale_price: number;
  sku: string;
  categories: [
    {
      title: string;
      slug: string;
    }
  ];
  category?: CategorySchema; // Reference to category schema
  featured?: boolean; // For featured products
}

export interface CategorySchema {
  _id: string;
  title: string;
  description: string;
  slug: string;
  featured_image: Image;
}

export interface Image {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}
