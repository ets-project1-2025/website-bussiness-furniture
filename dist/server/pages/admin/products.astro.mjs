/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CkwFf8le.mjs';
import { g as getCurrentUser } from '../../chunks/auth_DlBTwayV.mjs';
import { b as getAllProducts } from '../../chunks/admin-api_DFNxy3BB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Products;
  let user = null;
  try {
    user = await getCurrentUser();
    if (!user) {
      return Astro2.redirect("/admin/login");
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return Astro2.redirect("/admin/login");
  }
  const products = await getAllProducts();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Produk" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-6"> <h2 class="text-2xl font-bold text-[var(--furniture-brown)]">Manajemen Produk</h2> <a href="/admin/products/new" class="btn-primary">Tambah Produk Baru</a> </div>  <div class="bg-white rounded-lg shadow-md overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-[var(--furniture-light-brown)]"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Nama Produk</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Kategori</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Harga</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Stok</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Terjual</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Rating</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Aksi</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${products.map((product) => renderTemplate`<tr${addAttribute(product.id, "key")}> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm font-medium text-gray-900">${product.name}</div> <div class="text-sm text-gray-500">${product.description?.substring(0, 50)}...</div> </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${product.category_name?.name || "Tidak ada kategori"} </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
Rp ${product.price?.toLocaleString("id-ID")} </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${product.stock || "N/A"} </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${product.sales_count || 0} </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> <div class="flex items-center"> <div class="flex text-yellow-400"> ${[...Array(5)].map((_, i) => renderTemplate`<svg${addAttribute(i, "key")} xmlns="http://www.w3.org/2000/svg"${addAttribute(`h-4 w-4 ${i < Math.floor(product.avg_rating || 0) ? "text-yellow-400" : "text-gray-300"}`, "class")} viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg>`)} </div> <span class="ml-1">(${product.avg_rating?.toFixed(1) || "0.0"})</span> </div> </td> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"> <a${addAttribute(`/admin/products/edit/${product.id}`, "href")} class="text-blue-600 hover:text-blue-900 mr-3">Edit</a> <button onclick="deleteProductConfirm('{product.id}', '{product.name}')" class="text-red-600 hover:text-red-900">
Hapus
</button> </td> </tr>`)} </tbody> </table> </div> ${renderScript($$result2, "/workspaces/website-bussiness-furniture/src/pages/admin/products.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/products.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/products.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
