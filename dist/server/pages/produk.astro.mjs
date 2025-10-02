/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DAI1A3cM.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_BqIr9XFu.mjs';
import { g as getAllProducts, d as getCategories } from '../chunks/products_DowiKeHc.mjs';
export { renderers } from '../renderers.mjs';

const $$Produk = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getAllProducts();
  const categories = await getCategories();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})}  ${maybeRenderHead()}<section class="bg-[var(--furniture-cream)] py-8 px-6"> <div class="container mx-auto"> <h1 class="text-3xl font-bold text-[var(--furniture-brown)]">Katalog Produk</h1> <p class="text-gray-600 mt-2">Temukan berbagai pilihan furniture berkualitas tinggi untuk mempercantik ruang hidup Anda</p> </div> </section> <main class="container mx-auto py-8 px-4"> <!-- Filter dan pencarian --> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"> <div class="w-full md:w-auto"> <input type="text" placeholder="Cari produk..." class="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)]"> </div> <div class="w-full md:w-auto"> <select class="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)]"> <option value="">Semua Kategori</option> ${categories.map((category) => renderTemplate`<option${addAttribute(category.id, "key")}${addAttribute(category.id, "value")}>${category.name}</option>`)} </select> </div> <div class="w-full md:w-auto"> <select class="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)]"> <option value="terbaru">Terbaru</option> <option value="harga-terendah">Harga Terendah</option> <option value="harga-tertinggi">Harga Tertinggi</option> <option value="nama">A-Z</option> </select> </div> </div> <!-- Produk Grid --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> ${products.map((product) => renderTemplate`<div class="product-card group"> <div class="relative"> ${product.product_images && product.product_images.length > 0 ? renderTemplate`<img${addAttribute(product.product_images[0]?.image_url || "/images/placeholder-product.jpg", "src")}${addAttribute(product.name, "alt")} class="w-full h-64 object-cover">` : renderTemplate`<div class="w-full h-64 bg-gray-200 flex items-center justify-center"> <span class="text-gray-500">Gambar tidak tersedia</span> </div>`} <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"> <button class="bg-white rounded-full p-2 shadow-md hover:bg-[var(--furniture-brown)] hover:text-white transition-colors duration-300"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg> </button> </div> </div> <div class="p-4"> <div class="flex justify-between items-start"> <div> <h3 class="font-semibold text-lg mb-1">${product.name}</h3> <p class="text-gray-600 text-sm mb-2 line-clamp-2">${product.description?.substring(0, 60)}${product.description?.length > 60 ? "..." : ""}</p> </div> <span class="text-lg font-bold text-[var(--furniture-brown)]">Rp ${product.price?.toLocaleString("id-ID")}</span> </div> <div class="mt-4"> <a${addAttribute(`/produk/${product.id}`, "href")} class="btn-secondary w-full">Lihat Detail</a> </div> </div> </div>`)} </div> <!-- Pagination --> <div class="flex justify-center mt-12"> <nav class="flex items-center space-x-2"> <a href="#" class="px-3 py-1 rounded-md bg-[var(--furniture-brown)] text-white">1</a> <a href="#" class="px-3 py-1 rounded-md hover:bg-[var(--furniture-light-brown)]">2</a> <a href="#" class="px-3 py-1 rounded-md hover:bg-[var(--furniture-light-brown)]">3</a> <span class="px-2">...</span> <a href="#" class="px-3 py-1 rounded-md hover:bg-[var(--furniture-light-brown)]">10</a> <a href="#" class="ml-2 px-3 py-1 rounded-md hover:bg-[var(--furniture-light-brown)] flex items-center">
Selanjutnya
<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </nav> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/produk.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/produk.astro";
const $$url = "/produk";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Produk,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
