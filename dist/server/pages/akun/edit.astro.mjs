/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { g as getCurrentUser } from '../../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  let user = null;
  let profile = null;
  try {
    user = await getCurrentUser();
    if (!user) {
      return Astro2.redirect("/akun/login");
    }
    const { data: profileData, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (profileData) {
      profile = profileData;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--furniture-cream)] py-8"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6"> <h1 class="text-2xl font-bold text-[var(--furniture-brown)] mb-6">Edit Profil</h1> ${profile ? renderTemplate`<form class="space-y-6"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label> <input type="text" name="full_name"${addAttribute(profile.full_name || "", "value")} class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" name="email"${addAttribute(user.email, "value")} disabled class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)] bg-gray-100"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label> <input type="tel" name="phone"${addAttribute(profile.phone || "", "value")} class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label> <textarea name="address" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]">${profile.address || ""}</textarea> </div> <div class="flex space-x-4"> <button type="submit" class="bg-[var(--furniture-brown)] text-white px-6 py-2 rounded-md hover:bg-[var(--furniture-light-brown)] transition">
Simpan Perubahan
</button> <a href="/akun/profil" class="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition">
Batal
</a> </div> </form>` : renderTemplate`<p class="text-gray-600">Memuat data profil...</p>`} </div> </div> </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/akun/edit.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/akun/edit.astro";
const $$url = "/akun/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
