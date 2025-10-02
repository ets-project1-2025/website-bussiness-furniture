/* empty css                                     */
import { e as createComponent, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import 'clsx';
import { S as SITE_URL } from '../chunks/config_CansV41r.mjs';
export { renderers } from '../renderers.mjs';

const $$Sitemap = createComponent(($$result, $$props, $$slots) => {
  const pages = [
    { route: "/", lastmod: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] },
    { route: "/produk", lastmod: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] },
    { route: "/tentang", lastmod: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] },
    { route: "/kontak", lastmod: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] }
  ];
  const dynamicPages = [];
  const allPages = [...pages, ...dynamicPages];
  return renderTemplate`<!--?xml version="1.0" encoding="UTF-8"?-->${maybeRenderHead()}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ${allPages.map((page) => `
    <url>
      <loc>${SITE_URL}${page.route}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
  `).join("")} </urlset>`;
}, "/workspaces/website-bussiness-furniture/src/pages/sitemap.xml.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/sitemap.xml.astro";
const $$url = "/sitemap.xml";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sitemap,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
