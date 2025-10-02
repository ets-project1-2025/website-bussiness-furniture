/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { g as getCurrentUser } from '../../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Profil = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Profil;
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--furniture-cream)] py-8"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6"> <h1 class="text-2xl font-bold text-[var(--furniture-brown)] mb-6">Profil Saya</h1> ${profile ? renderTemplate`<div class="space-y-6"> <div> <h2 class="text-lg font-semibold text-gray-900 mb-2">Informasi Pribadi</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700">Nama Lengkap</label> <p class="mt-1 text-gray-900">${profile.full_name || "-"}</p> </div> <div> <label class="block text-sm font-medium text-gray-700">Email</label> <p class="mt-1 text-gray-900">${user.email}</p> </div> <div> <label class="block text-sm font-medium text-gray-700">No. Telepon</label> <p class="mt-1 text-gray-900">${profile.phone || "-"}</p> </div> <div> <label class="block text-sm font-medium text-gray-700">Level Pengguna</label> <p class="mt-1 text-gray-900">${profile.user_level || "basic"}</p> </div> </div> </div> <div> <h2 class="text-lg font-semibold text-gray-900 mb-2">Alamat</h2> <p class="text-gray-900">${profile.address || "Alamat belum diisi"}</p> </div> <div class="flex space-x-4"> <a href="/akun/edit" class="bg-[var(--furniture-brown)] text-white px-4 py-2 rounded-md hover:bg-[var(--furniture-light-brown)] transition">
Edit Profil
</a> <a href="/akun/ubah-password" class="bg-[var(--furniture-light-brown)] text-white px-4 py-2 rounded-md hover:bg-[var(--furniture-dark-brown)] transition">
Ubah Kata Sandi
</a> </div> </div>` : renderTemplate`<p class="text-gray-600">Memuat data profil...</p>`} </div> </div> </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/akun/profil.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/akun/profil.astro";
const $$url = "/akun/profil";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profil,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
