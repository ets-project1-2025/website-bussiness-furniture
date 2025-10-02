/* empty css                                                 */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { a as getLookbookGalleryById, b as getAllProducts, f as createLookbookHotspot } from '../../../../../chunks/admin-api_DFNxy3BB.mjs';
import { $ as $$Layout } from '../../../../../chunks/Layout_DAI1A3cM.mjs';
export { renderers } from '../../../../../renderers.mjs';

const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const galleryId = Astro2.params.id;
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
  try {
    gallery = await getLookbookGalleryById(galleryId);
    products = await getAllProducts();
  } catch (error) {
    console.error("Error fetching lookbook gallery or products:", error);
  }
  if (request.method === "POST") {
    const formData = await request.formData();
    const productId = formData.get("product_id");
    const coordinates = JSON.parse(formData.get("coordinates"));
    try {
      await createLookbookHotspot({
        gallery_id: galleryId,
        product_id: productId,
        coordinates
      });
      return Response.redirect(new URL(`/admin/lookbook/${galleryId}`, request.url));
    } catch (error) {
      console.error("Error creating lookbook hotspot:", error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <h1 class="text-3xl font-bold text-gray-900 mb-6">Tambah Hotspot Produk untuk: ${gallery?.title}</h1> <form method="post" class="bg-white shadow-md rounded-lg p-6"> <div class="mb-4"> <label for="product_id" class="block text-gray-700 font-medium mb-2">Pilih Produk</label> <select id="product_id" name="product_id" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"> <option value="">-- Pilih Produk --</option> ${products.map((product) => renderTemplate`<option${addAttribute(product.id, "key")}${addAttribute(product.id, "value")}> ${product.name} - Rp${Number(product.price).toLocaleString("id-ID")} </option>`)} </select> </div> <div class="mb-4"> <label for="coordinates" class="block text-gray-700 font-medium mb-2">Koordinat Hotspot (format JSON: ${"{"}x: number, y: number${"}"})</label> <input type="text" id="coordinates" name="coordinates" required placeholder="{&quot;x&quot;: 50, &quot;y&quot;: 30}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"> <p class="text-sm text-gray-500 mt-1">Koordinat dalam persen (0-100) dari posisi gambar</p> </div> <div class="flex justify-end"> <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
Simpan Hotspot
</button> </div> </form> </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/[id]/hotspots/new.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/[id]/hotspots/new.astro";
const $$url = "/admin/lookbook/[id]/hotspots/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
