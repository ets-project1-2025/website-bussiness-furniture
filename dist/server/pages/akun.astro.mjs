/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DAI1A3cM.mjs';
import { g as getCurrentUser } from '../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Akun = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Akun;
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--furniture-cream)] py-8"> <div class="container mx-auto px-4"> <div class="max-w-4xl mx-auto"> <h1 class="text-3xl font-bold text-[var(--furniture-brown)] mb-8">Akun Saya</h1> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <!-- Profile Card --> <div class="md:col-span-1 bg-white rounded-lg shadow-md p-6"> <div class="text-center"> <div class="w-20 h-20 bg-[var(--furniture-brown)] rounded-full mx-auto flex items-center justify-center mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path> </svg> </div> <h2 class="text-xl font-semibold text-gray-900">${user.email}</h2> <p class="text-gray-600">Pelanggan</p> <div class="mt-6 space-y-3"> <a href="/akun/profil" class="block w-full bg-[var(--furniture-brown)] text-white py-2 px-4 rounded-md hover:bg-[var(--furniture-light-brown)] transition text-center">
Lihat Profil
</a> <a href="/akun/pesanan" class="block w-full border border-[var(--furniture-brown)] text-[var(--furniture-brown)] py-2 px-4 rounded-md hover:bg-[var(--furniture-brown)] hover:text-white transition text-center">
Pesanan Saya
</a> <a href="/akun/wishlist" class="block w-full border border-[var(--furniture-brown)] text-[var(--furniture-brown)] py-2 px-4 rounded-md hover:bg-[var(--furniture-brown)] hover:text-white transition text-center">
Wishlist
</a> </div> </div> </div> <!-- Main Content --> <div class="md:col-span-2 space-y-6"> <!-- Recent Orders --> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-xl font-semibold text-gray-900 mb-4">Pesanan Terbaru</h2> <p class="text-gray-600 mb-4">Anda belum memiliki pesanan. Mulai belanja sekarang!</p> <a href="/" class="inline-block bg-[var(--furniture-brown)] text-white py-2 px-4 rounded-md hover:bg-[var(--furniture-light-brown)] transition">
Mulai Belanja
</a> </div> <!-- Account Actions --> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-xl font-semibold text-gray-900 mb-4">Pengaturan Akun</h2> <div class="space-y-3"> <a href="/akun/profil" class="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition text-center">
Edit Profil
</a> <a href="/akun/ubah-password" class="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition text-center">
Ubah Kata Sandi
</a> <a href="/akun/logout" class="block w-full border border-red-300 text-red-700 py-2 px-4 rounded-md hover:bg-red-50 transition text-center">
Keluar
</a> </div> </div> </div> </div> </div> </div> </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/akun.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/akun.astro";
const $$url = "/akun";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Akun,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
