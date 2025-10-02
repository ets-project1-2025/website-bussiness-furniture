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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--furniture-cream)]"> <header class="bg-[var(--furniture-brown)] text-white p-4"> <div class="container mx-auto flex justify-between items-center"> <h1 class="text-xl font-bold">Dasbor Admin - WIDI Furniture</h1> <div class="flex items-center space-x-4"> <span>Halo, ${user.email}</span> <a href="/admin/logout" class="btn-secondary text-sm">Logout</a> </div> </div> </header> <nav class="bg-[var(--furniture-light-brown)] p-4"> <div class="container mx-auto"> <ul class="flex space-x-6"> <li><a href="/admin/" class="text-[var(--furniture-brown)] hover:underline">Beranda</a></li> <li><a href="/admin/products" class="text-[var(--furniture-brown)] hover:underline">Produk</a></li> <li><a href="/admin/categories" class="text-[var(--furniture-brown)] font-medium hover:underline">Kategori</a></li> <li><a href="/admin/orders" class="text-[var(--furniture-brown)] hover:underline">Pesanan</a></li> <li><a href="/admin/users" class="text-[var(--furniture-brown)] hover:underline">Pengguna</a></li> </ul> </div> </nav> <main class="container mx-auto py-8 px-4"> <h2 class="text-2xl font-bold text-[var(--furniture-brown)] mb-6">Tambah Kategori Baru</h2> <form class="bg-white p-6 rounded-lg shadow-md max-w-2xl"> <div class="grid grid-cols-1 gap-6"> <div> <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori *</label> <input type="text" id="name" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div> <label for="slug" class="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label> <input type="text" id="slug" name="slug" readonly class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" placeholder="akan diisi otomatis dari nama"> <p class="mt-1 text-xs text-gray-500">Slug digunakan dalam URL. Biarkan kosong untuk diisi otomatis dari nama kategori.</p> </div> <div> <label for="parent" class="block text-sm font-medium text-gray-700 mb-1">Kategori Induk</label> <select id="parent" name="parent" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> <option value="">Pilih Kategori Induk (opsional)</option> ${categories.map((category) => renderTemplate`<option${addAttribute(category.id, "key")}${addAttribute(category.id, "value")}>${category.name}</option>`)} </select> </div> </div> <div class="mt-8 flex justify-end space-x-3"> <a href="/admin/categories" class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
Batal
</a> <button type="button" onclick="submitCategory()" class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--furniture-brown)] hover:bg-[var(--furniture-light-brown)] focus:outline-none">
Simpan Kategori
</button> </div> </form> </main> <footer class="bg-[var(--furniture-light-brown)] py-6 mt-12"> <div class="container mx-auto text-center text-[var(--furniture-brown)]"> <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} WIDI Furniture - Dasbor Admin</p> </div> </footer> </div> ${renderScript($$result2, "/workspaces/website-bussiness-furniture/src/pages/admin/categories/new.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/categories/new.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/categories/new.astro";
const $$url = "/admin/categories/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
