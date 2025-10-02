/* empty css                                              */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { a as getLookbookGalleryById, u as updateLookbookGallery } from '../../../../chunks/admin-api_DFNxy3BB.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_DAI1A3cM.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
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
  try {
    gallery = await getLookbookGalleryById(id);
  } catch (error) {
    console.error("Error fetching lookbook gallery:", error);
  }
  if (request.method === "POST") {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const coverImage = formData.get("cover_image");
    try {
      await updateLookbookGallery(id, {
        title,
        description,
        cover_image_url: coverImage
      });
      return Response.redirect(new URL("/admin/lookbook", request.url));
    } catch (error) {
      console.error("Error updating lookbook gallery:", error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Gallery Lookbook</h1> ${gallery ? renderTemplate`<form method="post" class="bg-white shadow-md rounded-lg p-6"> <div class="mb-4"> <label for="title" class="block text-gray-700 font-medium mb-2">Judul</label> <input type="text" id="title" name="title"${addAttribute(gallery.title || "", "value")} required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"> </div> <div class="mb-4"> <label for="description" class="block text-gray-700 font-medium mb-2">Deskripsi</label> <textarea id="description" name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">${gallery.description || ""}</textarea> </div> <div class="mb-4"> <label for="cover_image" class="block text-gray-700 font-medium mb-2">URL Gambar Cover</label> <input type="text" id="cover_image" name="cover_image"${addAttribute(gallery.cover_image_url || "", "value")} required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"> </div> <div class="flex justify-end"> <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
Simpan Perubahan
</button> </div> </form>` : renderTemplate`<p>Gallery tidak ditemukan.</p>`} </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/edit/[id].astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook/edit/[id].astro";
const $$url = "/admin/lookbook/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
