/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { $ as $$Header, a as $$Footer } from '../../chunks/Footer_BqIr9XFu.mjs';
import { r as register } from '../../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  let errorMessage = null;
  let successMessage = null;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const fullName = formData.get("full-name");
    try {
      await register(email, password, fullName);
      successMessage = "Registrasi berhasil! Silakan cek email Anda untuk verifikasi.";
    } catch (error) {
      errorMessage = "Terjadi kesalahan saat registrasi. Silakan coba lagi.";
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<section class="bg-[var(--furniture-cream)] py-12 px-4"> <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"> <h2 class="text-2xl font-bold text-center text-[var(--furniture-brown)] mb-6">Buat Akun Baru</h2> ${errorMessage && renderTemplate`<div class="rounded-md bg-red-50 p-4 mb-4"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <h3 class="text-sm font-medium text-red-800"> ${errorMessage} </h3> </div> </div> </div>`} ${successMessage && renderTemplate`<div class="rounded-md bg-green-50 p-4 mb-4"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <h3 class="text-sm font-medium text-green-800"> ${successMessage} </h3> </div> </div> </div>`} <form method="POST" class="space-y-6"> <div> <label for="full-name" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label> <input id="full-name" name="full-name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="Nama Lengkap Anda"> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label> <input id="email" name="email" type="email" autocomplete="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="contoh@email.com"> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label> <input id="password" name="password" type="password" required minlength="6" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="••••••••"> <p class="mt-1 text-xs text-gray-500">Kata sandi minimal 6 karakter</p> </div> <div> <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label> <input id="confirm-password" name="confirm-password" type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="••••••••"> </div> <div class="flex items-center"> <input id="terms" name="terms" type="checkbox" required class="h-4 w-4 text-[var(--furniture-brown)] focus:ring-[var(--furniture-brown)] border-gray-300 rounded"> <label for="terms" class="ml-2 block text-sm text-gray-900">
Saya setuju dengan <a href="/syarat-ketentuan" class="text-[var(--furniture-brown)] hover:underline">Syarat & Ketentuan</a> dan <a href="/kebijakan-privasi" class="text-[var(--furniture-brown)] hover:underline">Kebijakan Privasi</a> </label> </div> <div> <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--furniture-brown)] hover:bg-[var(--furniture-light-brown)] focus:outline-none">
Daftar
</button> </div> </form> <div class="mt-6 text-center"> <p class="text-sm text-gray-600">
Sudah memiliki akun?${" "} <a href="/akun/login" class="font-medium text-[var(--furniture-brown)] hover:text-[var(--furniture-light-brown)]">
Masuk di sini
</a> </p> </div> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/akun/register.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/akun/register.astro";
const $$url = "/akun/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
