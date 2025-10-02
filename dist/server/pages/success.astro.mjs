/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DAI1A3cM.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_BqIr9XFu.mjs';
export { renderers } from '../renderers.mjs';

const $$Success = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="container mx-auto py-8 px-4"> <div class="text-center"> <h1 class="text-3xl font-bold text-green-600 mb-4">Pembayaran Berhasil!</h1> <p class="text-lg text-gray-700 mb-6">
Terima kasih atas pembelian Anda! Pesanan Anda telah diproses.
</p> <p class="text-gray-600">
Mohon dicatat bahwa toko ini dalam mode pengujian.
</p> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/success.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/success.astro";
const $$url = "/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
