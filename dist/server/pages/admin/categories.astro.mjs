/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CkwFf8le.mjs';
import { g as getCurrentUser } from '../../chunks/auth_DlBTwayV.mjs';
import { g as getAllCategories } from '../../chunks/admin-api_DFNxy3BB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Categories = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Categories;
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
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Kategori" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-6"> <h2 class="text-2xl font-bold text-[var(--furniture-brown)]">Manajemen Kategori</h2> <a href="/admin/categories/new" class="btn-primary">Tambah Kategori Baru</a> </div>  <div class="bg-white rounded-lg shadow-md overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-[var(--furniture-light-brown)]"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Nama Kategori</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Slug</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Aksi</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${categories.map((category) => renderTemplate`<tr${addAttribute(category.id, "key")}> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm font-medium text-gray-900">${category.name}</div> </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${category.slug} </td> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"> <a${addAttribute(`/admin/categories/edit/${category.id}`, "href")} class="text-blue-600 hover:text-blue-900 mr-3">Edit</a> <button onclick="deleteCategoryConfirm('{category.id}', '{category.name}')" class="text-red-600 hover:text-red-900">
Hapus
</button> </td> </tr>`)} </tbody> </table> </div> ${renderScript($$result2, "/workspaces/website-bussiness-furniture/src/pages/admin/categories.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/categories.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/categories.astro";
const $$url = "/admin/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Categories,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
