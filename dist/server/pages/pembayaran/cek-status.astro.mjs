/* empty css                                        */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, w as Fragment, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { $ as $$Header, a as $$Footer } from '../../chunks/Footer_BqIr9XFu.mjs';
export { renderers } from '../../renderers.mjs';

const $$CekStatus = createComponent(($$result, $$props, $$slots) => {
  const orderId = "12345678";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})}  ${maybeRenderHead()}<section class="bg-[var(--furniture-cream)] py-8 px-6"> <div class="container mx-auto text-center"> <h1 class="text-3xl font-bold text-[var(--furniture-brown)]">Status Pembayaran</h1> </div> </section> <main class="container mx-auto py-8 px-4"> <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center"> ${renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h2 class="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2> <p class="text-gray-600 mb-6">Terima kasih atas pembayaran Anda. Pesanan #${orderId} telah diproses.</p> <div class="flex justify-center space-x-4"> <a${addAttribute(`/pesanan/${orderId}`, "href")} class="btn-primary">Lihat Pesanan</a> <a href="/produk" class="btn-secondary">Lanjutkan Belanja</a> </div> ` })}` } </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/pembayaran/cek-status.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/pembayaran/cek-status.astro";
const $$url = "/pembayaran/cek-status";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CekStatus,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
