/* empty css                                                    */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../../../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { a as getLookbookGalleryById, b as getAllProducts, d as getHotspotsByGalleryId, e as updateLookbookHotspot } from '../../../../../../chunks/admin-api_DFNxy3BB.mjs';
import { $ as $$Layout } from '../../../../../../chunks/Layout_DAI1A3cM.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const $$Astro = createAstro();
const $$hotspotId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$hotspotId;
  const galleryId = Astro2.params.id;
  const hotspotId = Astro2.params.hotspotId;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.redirect(new URL("/admin/login", request.url));
  }
  const { data: profileData } = await supabase.from("profiles").select("id").eq("id", user.id).single();
  if (!profileData) {
    return Response.redirect(new URL("/akun/login", request.url));
  }
  let gallery = null;
  let products = [];
  let hotspot = null;
  try {
    gallery = await getLookbookGalleryById(galleryId);
    products = await getAllProducts();
    const allHotspots = await getHotspotsByGalleryId(galleryId);
    hotspot = allHotspots.find((h) => h.id === hotspotId);
  } catch (error) {
    console.error("Error fetching lookbook gallery, products, or hotspot:", error);
  }
  if (request.method === "POST") {
    const formData = await request.formData();
    const productId = formData.get("product_id");
    const coordinates = JSON.parse(formData.get("coordinates"));
    try {
      await updateLookbookHotspot(hotspotId, {
        gallery_id: galleryId,
        product_id: productId,
        coordinates
      });
      return Response.redirect(new URL(`/admin/lookbook/${galleryId}`, request.url));
    } catch (error) {
      console.error("Error updating lookbook hotspot:", error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Hotspot Produk untuk: ${gallery?.title}</h1> ${hotspot ? renderTemplate`<form method="post" class="bg-white shadow-md rounded-lg p-6"> <div class="mb-4"> <label for="product_id" class="block text-gray-700 font-medium mb-2">Pilih Produk</label> <select id="product_id" name="product_id" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"> <option value="">-- Pilih Produk --</option> ${products.map((product) => renderTemplate`<option${addAttribute(product.id, "key")}${addAttribute(product.id, "value")}${addAttribute(product.id === hotspot.product_id, "selected")}> ${product.name} - Rp${Number(product.price).toLocaleString("id-ID")} </option>`)} </select> </div> <div class="mb-4"> <label for="coordinates" class="block text-gray-700 font-medium mb-2">Koordinat Hotspot (format JSON: ${"{"}x: number, y: number${"}"})</label> <input type="text" id="coordinates" name="coordinates" required${addAttribute(JSON.stringify(hotspot.coordinates), "value")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"> <p class="text-sm text-gray-500 mt-1">Koordinat dalam persen (0-100) dari posisi gambar</p> </div> <div class="flex justify-end"> <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
Simpan Perubahan
</button> </div> </form>` : renderTemplate`<p>Hotspot tidak ditemukan.</p>`} </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/[id]/hotspots/edit/[hotspotId].astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/[id]/hotspots/edit/[hotspotId].astro";
const $$url = "/admin/lookbook/[id]/hotspots/edit/[hotspotId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$hotspotId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
