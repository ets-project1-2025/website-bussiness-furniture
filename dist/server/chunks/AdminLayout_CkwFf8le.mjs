import { e as createComponent, f as createAstro, h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate } from './astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getCurrentUser } from './auth_DlBTwayV.mjs';
/* empty css                             */

const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Error checking authentication:", error);
  }
  if (!user) {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`<html lang="id" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title ? `${title} - Admin` : "Dasbor Admin - WIDI Furniture"}</title><meta name="description" content="Dasbor administrasi WIDI Furniture - Kelola produk, pesanan, dan pengguna"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-2kanml4j> <div class="min-h-screen bg-[var(--furniture-cream)]" data-astro-cid-2kanml4j> <header class="bg-[var(--furniture-brown)] text-white p-4" data-astro-cid-2kanml4j> <div class="container mx-auto flex justify-between items-center" data-astro-cid-2kanml4j> <h1 class="text-xl font-bold" data-astro-cid-2kanml4j>Dasbor Admin - WIDI Furniture</h1> <div class="flex items-center space-x-4" data-astro-cid-2kanml4j> <span data-astro-cid-2kanml4j>Halo, ${user.email}</span> <a href="/admin/logout" class="btn-secondary text-sm" data-astro-cid-2kanml4j>Logout</a> </div> </div> </header> <nav class="bg-[var(--furniture-light-brown)] p-4" data-astro-cid-2kanml4j> <div class="container mx-auto" data-astro-cid-2kanml4j> <ul class="flex flex-wrap space-x-4 md:space-x-6" data-astro-cid-2kanml4j> <li data-astro-cid-2kanml4j><a href="/admin/" class="text-[var(--furniture-brown)] hover:underline" data-astro-cid-2kanml4j>Beranda</a></li> <li data-astro-cid-2kanml4j><a href="/admin/products" class="text-[var(--furniture-brown)] hover:underline" data-astro-cid-2kanml4j>Produk</a></li> <li data-astro-cid-2kanml4j><a href="/admin/categories" class="text-[var(--furniture-brown)] hover:underline" data-astro-cid-2kanml4j>Kategori</a></li> <li data-astro-cid-2kanml4j><a href="/admin/orders" class="text-[var(--furniture-brown)] hover:underline" data-astro-cid-2kanml4j>Pesanan</a></li> <li data-astro-cid-2kanml4j><a href="/admin/users" class="text-[var(--furniture-brown)] hover:underline" data-astro-cid-2kanml4j>Pengguna</a></li> <li data-astro-cid-2kanml4j><a href="/admin/lookbook" class="text-[var(--furniture-brown)] hover:underline" data-astro-cid-2kanml4j>Lookbook</a></li> <li data-astro-cid-2kanml4j><a href="/admin/recommendations" class="text-[var(--furniture-brown)] hover:underline" data-astro-cid-2kanml4j>Rekomendasi</a></li> <li data-astro-cid-2kanml4j><a href="/admin/analytics" class="text-[var(--furniture-brown)] hover:underline" data-astro-cid-2kanml4j>Analitik</a></li> </ul> </div> </nav> <main class="container mx-auto py-8 px-4" data-astro-cid-2kanml4j> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-[var(--furniture-light-brown)] py-6 mt-12" data-astro-cid-2kanml4j> <div class="container mx-auto text-center text-[var(--furniture-brown)]" data-astro-cid-2kanml4j> <p data-astro-cid-2kanml4j>© ${(/* @__PURE__ */ new Date()).getFullYear()} WIDI Furniture - Dasbor Admin</p> </div> </footer> </div> </body></html>`;
}, "/workspaces/website-bussiness-furniture/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
