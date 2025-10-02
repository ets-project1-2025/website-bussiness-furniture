/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { b as getAllLookbookGalleries } from '../chunks/products_DowiKeHc.mjs';
import { $ as $$Layout } from '../chunks/Layout_DAI1A3cM.mjs';
export { renderers } from '../renderers.mjs';

const $$Lookbook = createComponent(async ($$result, $$props, $$slots) => {
  let galleries = [];
  try {
    galleries = await getAllLookbookGalleries();
  } catch (error) {
    console.error("Error fetching lookbook galleries:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <h1 class="text-3xl font-bold text-gray-900 mb-6">Shop the Look</h1> <p class="text-gray-600 mb-8">Temukan furnitur yang Anda sukai dari berbagai gaya ruangan yang kami tawarkan</p> ${galleries.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${galleries.map((gallery) => renderTemplate`<a${addAttribute(`/lookbook/${gallery.id}`, "href")}${addAttribute(gallery.id, "key")} class="block group"> <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1"> ${gallery.cover_image_url ? renderTemplate`<img${addAttribute(gallery.cover_image_url, "src")}${addAttribute(gallery.title, "alt")} class="w-full h-64 object-cover">` : renderTemplate`<div class="bg-gray-200 border-2 border-dashed rounded-t-lg w-full h-64 flex items-center justify-center text-gray-500">
Tidak ada gambar
</div>`} <div class="p-4"> <h3 class="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">${gallery.title}</h3> <p class="text-gray-600 mt-2 line-clamp-2">${gallery.description}</p> </div> </div> </a>`)} </div>` : renderTemplate`<div class="text-center py-12"> <p class="text-gray-600">Belum ada galeri lookbook yang tersedia.</p> </div>`} </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/lookbook.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/lookbook.astro";
const $$url = "/lookbook";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Lookbook,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
