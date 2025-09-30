import { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";

// Define pages for sitemap
const pages: { route: string; lastmod: string }[] = [
  { route: "/", lastmod: new Date().toISOString().split("T")[0] },
  { route: "/produk", lastmod: new Date().toISOString().split("T")[0] },
  { route: "/tentang-kami", lastmod: new Date().toISOString().split("T")[0] },
  { route: "/kontak", lastmod: new Date().toISOString().split("T")[0] },
];

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // In a real implementation, you would fetch your dynamic routes from your CMS
  // For now, we'll create a static sitemap
  const dynamicPages: { route: string; lastmod: string }[] = []; // In a full implementation, you would fetch products and categories

  const allPages = [...pages, ...dynamicPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map(
          (page) => `
        <url>
          <loc>https://furniturekami.vercel.app${page.route}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};