/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_CkwFf8le.mjs';
import { g as getCurrentUser } from '../chunks/auth_DlBTwayV.mjs';
import { b as getAllProducts, g as getAllCategories } from '../chunks/admin-api_DFNxy3BB.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let user = null;
  let products = [];
  let categories = [];
  try {
    user = await getCurrentUser();
    if (!user) {
      return Astro2.redirect("/admin/login");
    }
    products = await getAllProducts();
    categories = await getAllCategories();
  } catch (error) {
    console.error("Error checking authentication or fetching data:", error);
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Beranda" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h2 class="text-2xl font-bold text-[var(--furniture-brown)] mb-6">Ringkasan Dasbor</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> <div class="bg-white p-6 rounded-lg shadow-md"> <h3 class="text-lg font-semibold mb-2">Total Produk</h3> <p class="text-3xl font-bold text-[var(--furniture-brown)]">${products.length}</p> </div> <div class="bg-white p-6 rounded-lg shadow-md"> <h3 class="text-lg font-semibold mb-2">Total Kategori</h3> <p class="text-3xl font-bold text-[var(--furniture-brown)]">${categories.length}</p> </div> <div class="bg-white p-6 rounded-lg shadow-md"> <h3 class="text-lg font-semibold mb-2">Pesanan Baru</h3> <p class="text-3xl font-bold text-[var(--furniture-brown)]">0</p> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> <div class="bg-white p-6 rounded-lg shadow-md"> <h3 class="text-lg font-semibold mb-4 text-[var(--furniture-brown)]">Produk Terbaru</h3> <div class="space-y-4"> ${products.slice(0, 5).map((product) => renderTemplate`<div${addAttribute(product.id, "key")} class="border-b border-gray-200 pb-4 last:border-0 last:pb-0"> <h4 class="font-medium">${product.name}</h4> <p class="text-gray-600 text-sm">Rp ${product.price?.toLocaleString("id-ID")}</p> <div class="mt-2"> <a${addAttribute(`/admin/products/edit/${product.id}`, "href")} class="text-blue-600 hover:underline text-sm">Edit</a> <span class="mx-2">|</span> <a href="#" class="text-red-600 hover:underline text-sm">Hapus</a> </div> </div>`)} </div> <a href="/admin/products" class="mt-4 inline-block text-[var(--furniture-brown)] hover:underline">Lihat semua produk →</a> </div> <div class="bg-white p-6 rounded-lg shadow-md"> <h3 class="text-lg font-semibold mb-4 text-[var(--furniture-brown)]">Kategori Produk</h3> <div class="space-y-3"> ${categories.map((category) => renderTemplate`<div${addAttribute(category.id, "key")} class="flex justify-between items-center"> <span>${category.name}</span> <div> <a${addAttribute(`/admin/categories/edit/${category.id}`, "href")} class="text-blue-600 hover:underline text-sm mr-2">Edit</a> <a href="#" class="text-red-600 hover:underline text-sm">Hapus</a> </div> </div>`)} </div> <a href="/admin/categories" class="mt-4 inline-block text-[var(--furniture-brown)] hover:underline">Lihat semua kategori →</a> </div> </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/index.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
