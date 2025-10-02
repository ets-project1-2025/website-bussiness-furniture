/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { g as getCurrentUser } from '../../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Pesanan = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pesanan;
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--furniture-cream)] py-8"> <div class="container mx-auto px-4"> <div class="max-w-4xl mx-auto"> <h1 class="text-2xl font-bold text-[var(--furniture-brown)] mb-6">Daftar Pesanan Saya</h1> <div class="bg-white rounded-lg shadow-md overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-[var(--furniture-light-brown)]"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">ID Pesanan</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Tanggal</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Total</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Status</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Aksi</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${[
    { id: "ORD001", date: "2023-06-15", total: 35e5, status: "Dikirim" },
    { id: "ORD002", date: "2023-07-22", total: 75e5, status: "Diterima" },
    { id: "ORD003", date: "2023-08-05", total: 42e5, status: "Diproses" }
  ].map((order) => renderTemplate`<tr${addAttribute(order.id, "key")}> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${order.id}</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.date}</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp ${order.total.toLocaleString("id-ID")}</td> <td class="px-6 py-4 whitespace-nowrap"> <span${addAttribute(`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === "Diproses" ? "bg-yellow-100 text-yellow-800" : order.status === "Dikirim" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`, "class")}> ${order.status} </span> </td> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"> <a${addAttribute(`/pesanan/${order.id}`, "href")} class="text-[var(--furniture-brown)] hover:text-[var(--furniture-dark-brown)]">Lihat Detail</a> </td> </tr>`)} </tbody> </table> </div> <div class="mt-8 text-center"> <p class="text-gray-600">Anda tidak memiliki pesanan lainnya.</p> <a href="/" class="inline-block mt-4 bg-[var(--furniture-brown)] text-white py-2 px-6 rounded-md hover:bg-[var(--furniture-light-brown)] transition">
Mulai Belanja
</a> </div> </div> </div> </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/akun/pesanan.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/akun/pesanan.astro";
const $$url = "/akun/pesanan";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pesanan,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
