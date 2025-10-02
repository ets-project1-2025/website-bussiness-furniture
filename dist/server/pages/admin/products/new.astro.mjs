/* empty css                                           */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_DAI1A3cM.mjs';
import { g as getCurrentUser } from '../../../chunks/auth_DlBTwayV.mjs';
import { g as getAllCategories } from '../../../chunks/admin-api_DFNxy3BB.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
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
  const categories = await getAllCategories();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--furniture-cream)]"> <header class="bg-[var(--furniture-brown)] text-white p-4"> <div class="container mx-auto flex justify-between items-center"> <h1 class="text-xl font-bold">Dasbor Admin - WIDI Furniture</h1> <div class="flex items-center space-x-4"> <span>Halo, ${user.email}</span> <a href="/admin/logout" class="btn-secondary text-sm">Logout</a> </div> </div> </header> <nav class="bg-[var(--furniture-light-brown)] p-4"> <div class="container mx-auto"> <ul class="flex space-x-6"> <li><a href="/admin/" class="text-[var(--furniture-brown)] hover:underline">Beranda</a></li> <li><a href="/admin/products" class="text-[var(--furniture-brown)] font-medium hover:underline">Produk</a></li> <li><a href="/admin/categories" class="text-[var(--furniture-brown)] hover:underline">Kategori</a></li> <li><a href="/admin/orders" class="text-[var(--furniture-brown)] hover:underline">Pesanan</a></li> <li><a href="/admin/users" class="text-[var(--furniture-brown)] hover:underline">Pengguna</a></li> </ul> </div> </nav> <main class="container mx-auto py-8 px-4"> <h2 class="text-2xl font-bold text-[var(--furniture-brown)] mb-6">Tambah Produk Baru</h2> <form class="bg-white p-6 rounded-lg shadow-md max-w-3xl"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="md:col-span-2"> <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label> <input type="text" id="name" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div class="md:col-span-2"> <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Deskripsi Produk</label> <textarea id="description" name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"></textarea> </div> <div> <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Harga (Rp) *</label> <input type="number" id="price" name="price" required min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div> <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Kategori</label> <select id="category" name="category" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> <option value="">Pilih Kategori</option> ${categories.map((category) => renderTemplate`<option${addAttribute(category.id, "key")}${addAttribute(category.id, "value")}>${category.name}</option>`)} </select> </div> <div> <label for="length" class="block text-sm font-medium text-gray-700 mb-1">Panjang (cm)</label> <input type="number" id="length" name="length" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div> <label for="width" class="block text-sm font-medium text-gray-700 mb-1">Lebar (cm)</label> <input type="number" id="width" name="width" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div> <label for="height" class="block text-sm font-medium text-gray-700 mb-1">Tinggi (cm)</label> <input type="number" id="height" name="height" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div class="md:col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Material</label> <div class="flex flex-wrap gap-2" id="material-tags"> <span class="hidden">Placeholder untuk material tags</span> </div> <div class="mt-1 flex"> <input type="text" id="new-material" placeholder="Tambahkan material (tekan Enter)" class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> <button type="button" onclick="addMaterialTag()" class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-[var(--furniture-brown)] hover:bg-[var(--furniture-light-brown)] focus:outline-none">
Tambah
</button> </div> <input type="hidden" id="materials" name="materials" value="[]"> </div> <div class="md:col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Gambar Produk</label> <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"> <div class="space-y-1 text-center"> <div class="flex text-sm text-gray-600"> <label for="product-images" class="relative cursor-pointer bg-white rounded-md font-medium text-[var(--furniture-brown)] hover:text-[var(--furniture-light-brown)] focus-within:outline-none"> <span>Unggah file</span> <input id="product-images" name="product-images" type="file" class="sr-only" multiple accept="image/*"> </label> <p class="pl-1">atau seret dan lepas</p> </div> <p class="text-xs text-gray-500">
PNG, JPG, GIF hingga 10MB
</p> </div> </div> </div> </div> <div class="mt-8 flex justify-end space-x-3"> <a href="/admin/products" class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
Batal
</a> <button type="button" onclick="submitProduct()" class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--furniture-brown)] hover:bg-[var(--furniture-light-brown)] focus:outline-none">
Simpan Produk
</button> </div> </form> </main> <footer class="bg-[var(--furniture-light-brown)] py-6 mt-12"> <div class="container mx-auto text-center text-[var(--furniture-brown)]"> <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} WIDI Furniture - Dasbor Admin</p> </div> </footer> </div> ${renderScript($$result2, "/workspaces/website-bussiness-furniture/src/pages/admin/products/new.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/products/new.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/products/new.astro";
const $$url = "/admin/products/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
