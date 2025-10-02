/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { g as getCurrentUser } from '../../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$UbahPassword = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UbahPassword;
  let user = null;
  try {
    user = await getCurrentUser();
    if (!user) {
      return Astro2.redirect("/akun/login");
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return Astro2.redirect("/akun/login");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--furniture-cream)] py-8"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6"> <h1 class="text-2xl font-bold text-[var(--furniture-brown)] mb-6">Ubah Kata Sandi</h1> <form class="space-y-6"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Saat Ini</label> <input type="password" name="current_password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="Masukkan kata sandi saat ini"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label> <input type="password" name="new_password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="Masukkan kata sandi baru"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi Baru</label> <input type="password" name="confirm_new_password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="Konfirmasi kata sandi baru"> </div> <div class="flex space-x-4"> <button type="submit" class="bg-[var(--furniture-brown)] text-white px-6 py-2 rounded-md hover:bg-[var(--furniture-light-brown)] transition">
Simpan Perubahan
</button> <a href="/akun/profil" class="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition">
Batal
</a> </div> </form> </div> </div> </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/akun/ubah-password.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/akun/ubah-password.astro";
const $$url = "/akun/ubah-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$UbahPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
