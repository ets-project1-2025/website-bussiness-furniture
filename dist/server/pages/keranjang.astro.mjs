/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DAI1A3cM.mjs';
import { g as getCartItems, d as getCartItemCount, b as getCartTotal, $ as $$Header, u as updateCartItemQuantity, r as removeFromCart, a as $$Footer } from '../chunks/Footer_BqIr9XFu.mjs';
import { g as getCurrentUser } from '../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../renderers.mjs';

const $$Keranjang = createComponent(async ($$result, $$props, $$slots) => {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Error checking authentication:", error);
  }
  let cartItems = [];
  let cartCount = 0;
  let cartTotal = 0;
  try {
    const userId = user ? user.id : null;
    cartItems = await getCartItems(userId);
    cartCount = await getCartItemCount(userId);
    cartTotal = await getCartTotal(userId);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})}  ${maybeRenderHead()}<section class="bg-[var(--furniture-cream)] py-8 px-6"> <div class="container mx-auto"> <h1 class="text-3xl font-bold text-[var(--furniture-brown)]">Keranjang Belanja</h1> <p class="text-gray-600 mt-2">Periksa item-item yang akan Anda beli</p> </div> </section> <main class="container mx-auto py-8 px-4"> ${cartItems.length > 0 ? renderTemplate`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Daftar Item Keranjang --> <div class="lg:col-span-2"> <div class="bg-white rounded-lg shadow-md p-6 mb-6"> <h2 class="text-xl font-semibold text-[var(--furniture-brown)] mb-4">Item di Keranjang (${cartCount})</h2> <div class="space-y-6"> ${cartItems.map((item) => renderTemplate`<div${addAttribute(item.cart_item_id, "key")} class="flex items-center border-b border-gray-200 pb-6 last:border-0 last:pb-0"> ${item.product_images && item.product_images.length > 0 ? renderTemplate`<img${addAttribute(item.product_images[0].image_url, "src")}${addAttribute(item.name, "alt")} class="w-24 h-24 object-cover rounded-md">` : renderTemplate`<div class="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex items-center justify-center text-gray-500">
Tidak ada gambar
</div>`} <div class="ml-6 flex-grow"> <h3 class="font-semibold text-lg">${item.name}</h3> <p class="text-[var(--furniture-brown)] font-bold mt-1">Rp ${Number(item.price).toLocaleString("id-ID")}</p> <div class="flex items-center mt-3"> <button class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"${addAttribute(async () => {
    await updateCartItemQuantity(user ? user.id : null, item.id, item.quantity - 1);
    window.location.reload();
  }, "onClick")}>
-
</button> <span class="mx-3 text-lg">${item.quantity}</span> <button class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"${addAttribute(async () => {
    await updateCartItemQuantity(user ? user.id : null, item.id, item.quantity + 1);
    window.location.reload();
  }, "onClick")}>
+
</button> <button class="ml-6 text-red-600 hover:text-red-800"${addAttribute(async () => {
    await removeFromCart(user ? user.id : null, item.id);
    window.location.reload();
  }, "onClick")}>
Hapus
</button> </div> </div> <div class="ml-6 text-right"> <p class="font-semibold">Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</p> </div> </div>`)} </div> </div> </div> <!-- Ringkasan Pesanan --> <div> <div class="bg-white rounded-lg shadow-md p-6 sticky top-6"> <h2 class="text-xl font-semibold text-[var(--furniture-brown)] mb-4">Ringkasan Pesanan</h2> <div class="flex justify-between mb-2"> <span>Subtotal (${cartCount} item)</span> <span>Rp ${cartTotal.toLocaleString("id-ID")}</span> </div> <div class="flex justify-between mb-2"> <span>Biaya Pengiriman</span> <span>Gratis</span> </div> <div class="flex justify-between mb-4 pt-4 border-t border-gray-200"> <span class="font-semibold">Total</span> <span class="font-semibold text-[var(--furniture-brown)] text-lg">Rp ${cartTotal.toLocaleString("id-ID")}</span> </div> <a href="/checkout" class="btn-block btn-primary py-3 rounded-md text-center inline-block">
Checkout
</a> <a href="/produk" class="btn-block btn-secondary py-2 mt-3 rounded-md text-center inline-block">
Lanjutkan Belanja
</a> </div> </div> </div>` : renderTemplate`<div class="text-center py-12"> <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path> </svg> <h3 class="text-xl font-medium text-gray-900 mb-2">Keranjang Anda Kosong</h3> <p class="text-gray-500 mb-6">Anda belum menambahkan produk ke dalam keranjang</p> <a href="/produk" class="btn-primary">Jelajahi Produk</a> </div>`} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/keranjang.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/keranjang.astro";
const $$url = "/keranjang";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Keranjang,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
