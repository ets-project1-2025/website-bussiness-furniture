/* empty css                                        */
import { e as createComponent, f as createAstro, h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate, k as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                    */
import { l as login } from '../../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$AdminAuthLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AdminAuthLayout;
  return renderTemplate`<html lang="id" data-astro-cid-hrpbzfej> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title ? `${title} - Admin` : "Login Admin - WIDI Furniture"}</title><meta name="description" content="Halaman login administrasi WIDI Furniture"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-hrpbzfej> <div class="min-h-screen flex items-center justify-center bg-[var(--furniture-cream)] py-12 px-4 sm:px-6 lg:px-8" data-astro-cid-hrpbzfej> <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg" data-astro-cid-hrpbzfej> ${renderSlot($$result, $$slots["default"])} </div> </div> </body></html>`;
}, "/workspaces/website-bussiness-furniture/src/layouts/AdminAuthLayout.astro", void 0);

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  let errorMessage = null;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login(email, password);
      return Astro2.redirect("/admin/");
    } catch (error) {
      errorMessage = "Email atau password salah. Silakan coba lagi.";
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminAuthLayout", $$AdminAuthLayout, { "title": "Login Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <h2 class="mt-6 text-center text-3xl font-extrabold text-[var(--furniture-brown)]">
Masuk ke Dasbor Admin
</h2> <p class="mt-2 text-center text-sm text-gray-600">
Gunakan akun admin Anda untuk masuk
</p> </div> ${errorMessage && renderTemplate`<div class="rounded-md bg-red-50 p-4"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <h3 class="text-sm font-medium text-red-800"> ${errorMessage} </h3> </div> </div> </div>`}<form class="mt-8 space-y-6" method="POST"> <div class="rounded-md shadow-sm -space-y-px"> <div> <label for="email" class="sr-only">Alamat Email</label> <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)] focus:z-10 sm:text-sm" placeholder="Alamat Email"> </div> <div> <label for="password" class="sr-only">Kata Sandi</label> <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)] focus:z-10 sm:text-sm" placeholder="Kata Sandi"> </div> </div> <div class="flex items-center justify-between"> <div class="text-sm"> <a href="/" class="font-medium text-[var(--furniture-brown)] hover:text-[var(--furniture-light-brown)]">
← Kembali ke Beranda
</a> </div> </div> <div> <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--furniture-brown)] hover:bg-[var(--furniture-light-brown)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--furniture-brown)]">
Masuk
</button> </div> </form> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/login.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
