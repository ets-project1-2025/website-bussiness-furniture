/* empty css                                           */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as renderScript } from '../../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { a as getLookbookGalleryById, d as getHotspotsByGalleryId } from '../../../chunks/admin-api_DFNxy3BB.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_DAI1A3cM.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const id = Astro2.params.id;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.redirect(new URL("/admin/login", request.url));
  }
  const { data: profileData } = await supabase.from("profiles").select("id").eq("id", user.id).single();
  if (!profileData) {
    return Response.redirect(new URL("/akun/login", request.url));
  }
  let gallery = null;
  let hotspots = [];
  try {
    gallery = await getLookbookGalleryById(id);
    hotspots = await getHotspotsByGalleryId(id);
  } catch (error) {
    console.error("Error fetching lookbook gallery or hotspots:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="flex justify-between items-center mb-6"> <h1 class="text-3xl font-bold text-gray-900">Detail Gallery: ${gallery?.title}</h1> <a${addAttribute(`/admin/lookbook/edit/${id}`, "href")} class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Edit Gallery</a> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="lg:col-span-2"> ${gallery?.cover_image_url ? renderTemplate`<img${addAttribute(gallery.cover_image_url, "src")}${addAttribute(gallery.title, "alt")} class="w-full h-auto rounded-lg shadow-md">` : renderTemplate`<div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
Tidak ada gambar cover
</div>`} </div> <div> <h2 class="text-xl font-semibold text-gray-800 mb-4">Deskripsi</h2> <p class="text-gray-600">${gallery?.description || "Tidak ada deskripsi"}</p> </div> </div> <div class="mt-8"> <div class="flex justify-between items-center mb-4"> <h2 class="text-2xl font-bold text-gray-900">Hotspot Produk</h2> <a${addAttribute(`/admin/lookbook/${id}/hotspots/new`, "href")} class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">Tambah Hotspot</a> </div> <div class="bg-white shadow-md rounded-lg overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Koordinat</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${hotspots.map((hotspot) => renderTemplate`<tr${addAttribute(hotspot.id, "key")}> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm font-medium text-gray-900">${hotspot.product?.name}</div> </td> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-500">Rp${Number(hotspot.product?.price).toLocaleString("id-ID")}</div> </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${JSON.stringify(hotspot.coordinates)} </td> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"> <a${addAttribute(`/admin/lookbook/${id}/hotspots/edit/${hotspot.id}`, "href")} class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a> <button${addAttribute(() => deleteHotspot(hotspot.id), "onClick")} class="text-red-600 hover:text-red-900">
Hapus
</button> </td> </tr>`)} </tbody> </table> </div> </div> </div> ${renderScript($$result2, "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/[id]/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/[id]/index.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/[id]/index.astro";
const $$url = "/admin/lookbook/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
