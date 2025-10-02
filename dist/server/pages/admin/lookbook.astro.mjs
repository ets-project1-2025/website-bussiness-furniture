/* empty css                                        */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { h as getAllLookbookGalleries } from '../../chunks/admin-api_DFNxy3BB.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CkwFf8le.mjs';
export { renderers } from '../../renderers.mjs';

const $$Lookbook = createComponent(async ($$result, $$props, $$slots) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.redirect(new URL("/admin/login", request.url));
  }
  const { data: profileData } = await supabase.from("profiles").select("id").eq("id", user.id).single();
  if (!profileData) {
    return Response.redirect(new URL("/akun/login", request.url));
  }
  let galleries = [];
  try {
    galleries = await getAllLookbookGalleries();
  } catch (error) {
    console.error("Error fetching lookbook galleries:", error);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Lookbook" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-6"> <h2 class="text-2xl font-bold text-[var(--furniture-brown)]">Manajemen Lookbook</h2> <a href="/admin/lookbook/new" class="btn-primary">Tambah Gallery</a> </div>  <div class="bg-white rounded-lg shadow-md overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-[var(--furniture-light-brown)]"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Judul</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Deskripsi</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Tanggal Dibuat</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Aksi</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${galleries.map((gallery) => renderTemplate`<tr${addAttribute(gallery.id, "key")}> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm font-medium text-gray-900">${gallery.title}</div> </td> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-500">${gallery.description}</div> </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${new Date(gallery.created_at).toLocaleDateString("id-ID")} </td> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"> <a${addAttribute(`/admin/lookbook/edit/${gallery.id}`, "href")} class="text-blue-600 hover:text-blue-900 mr-3">Edit</a> <button${addAttribute(() => deleteGallery(gallery.id), "onClick")} class="text-red-600 hover:text-red-900">
Hapus
</button> </td> </tr>`)} </tbody> </table> </div> ` })} ${renderScript($$result, "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/lookbook.astro";
const $$url = "/admin/lookbook";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Lookbook,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
