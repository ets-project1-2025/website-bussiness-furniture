/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { $ as $$Header, a as $$Footer } from '../../chunks/Footer_BqIr9XFu.mjs';
import { g as getCurrentUser } from '../../chunks/auth_DlBTwayV.mjs';
import { l as getOrderById } from '../../chunks/admin-api_DFNxy3BB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const id = Astro2.params.id;
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Error checking authentication:", error);
  }
  let order = null;
  try {
    if (user) {
      order = await getOrderById(id);
      if (order && order.user_id !== user.id) {
        order = null;
      }
    }
  } catch (error) {
    console.error("Error fetching order:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})}  ${maybeRenderHead()}<section class="bg-[var(--furniture-cream)] py-8 px-6"> <div class="container mx-auto"> <h1 class="text-3xl font-bold text-[var(--furniture-brown)]">Detail Pesanan</h1> <p class="text-gray-600 mt-2">Informasi lengkap tentang pesanan Anda</p> </div> </section> <main class="container mx-auto py-8 px-4"> ${order ? renderTemplate`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Ringkasan Pesanan --> <div class="lg:col-span-2"> <div class="bg-white rounded-lg shadow-md p-6 mb-6"> <div class="flex justify-between items-start mb-6"> <div> <h2 class="text-xl font-semibold text-[var(--furniture-brown)]">Pesanan #${order.id.substring(0, 8)}</h2> <p class="text-gray-600">Tanggal: ${new Date(order.created_at).toLocaleDateString("id-ID")}</p> </div> <span${addAttribute(`px-3 py-1 rounded-full text-sm font-medium ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : order.status === "confirmed" ? "bg-blue-100 text-blue-800" : order.status === "shipped" ? "bg-indigo-100 text-indigo-800" : order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, "class")}> ${order.status === "pending" ? "Menunggu Pembayaran" : order.status === "confirmed" ? "Dikonfirmasi" : order.status === "shipped" ? "Dikirim" : order.status === "delivered" ? "Diterima" : "Dibatalkan"} </span> </div> <div class="border-t border-gray-200 pt-6"> <h3 class="text-lg font-medium text-gray-900 mb-4">Item Pesanan</h3> <div class="space-y-6"> ${order.order_items.map((item) => renderTemplate`<div${addAttribute(item.id, "key")} class="flex items-center"> ${item.product.product_images && item.product.product_images.length > 0 ? renderTemplate`<img${addAttribute(item.product.product_images[0].image_url, "src")}${addAttribute(item.product.name, "alt")} class="w-16 h-16 object-cover rounded-md">` : renderTemplate`<div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-gray-500">
Tidak ada gambar
</div>`} <div class="ml-4 flex-grow"> <h4 class="font-medium">${item.product.name}</h4> <p class="text-sm text-gray-600">Qty: ${item.quantity}</p> </div> <div class="text-right"> <p class="font-medium">Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</p> </div> </div>`)} </div> </div> </div> </div> <!-- Detail Pengiriman & Pembayaran --> <div> <div class="bg-white rounded-lg shadow-md p-6 mb-6"> <h2 class="text-lg font-semibold text-[var(--furniture-brown)] mb-4">Detail Pesanan</h2> <div class="space-y-4"> <div> <p class="text-sm text-gray-600">Status</p> <p class="font-medium"> ${order.status === "pending" ? "Menunggu Pembayaran" : order.status === "confirmed" ? "Dikonfirmasi" : order.status === "shipped" ? "Dikirim" : order.status === "delivered" ? "Diterima" : "Dibatalkan"} </p> </div> <div> <p class="text-sm text-gray-600">Tanggal Pesanan</p> <p class="font-medium">${new Date(order.created_at).toLocaleDateString("id-ID")}</p> </div> <div> <p class="text-sm text-gray-600">Total Pembayaran</p> <p class="font-medium text-[var(--furniture-brown)] text-lg">Rp ${Number(order.total_amount).toLocaleString("id-ID")}</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-lg font-semibold text-[var(--furniture-brown)] mb-4">Ringkasan Pembayaran</h2> <div class="space-y-2"> <div class="flex justify-between"> <span>Subtotal</span> <span>Rp ${order.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("id-ID")}</span> </div> <div class="flex justify-between"> <span>Biaya Pengiriman</span> <span>Gratis</span> </div> <div class="flex justify-between mt-4 pt-4 border-t border-gray-200"> <span class="font-semibold">Total</span> <span class="font-semibold">Rp ${Number(order.total_amount).toLocaleString("id-ID")}</span> </div> </div> </div> </div> </div>` : renderTemplate`<div class="text-center py-12"> <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg> <h3 class="text-xl font-medium text-gray-900 mb-2">Pesanan Tidak Ditemukan</h3> <p class="text-gray-500 mb-6">Pesanan dengan ID tersebut tidak ditemukan atau bukan milik Anda</p> <a href="/produk" class="btn-primary">Jelajahi Produk</a> </div>`} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/pesanan/[id].astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/pesanan/[id].astro";
const $$url = "/pesanan/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
