/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DAI1A3cM.mjs';
import { g as getCartItems, b as getCartTotal, c as clearCart, $ as $$Header, a as $$Footer } from '../chunks/Footer_BqIr9XFu.mjs';
import { g as getCurrentUser } from '../chunks/auth_DlBTwayV.mjs';
import { j as createOrder, k as createOrderItem } from '../chunks/admin-api_DFNxy3BB.mjs';
export { renderers } from '../renderers.mjs';

const $$Checkout = createComponent(async ($$result, $$props, $$slots) => {
  let user = null;
  let profile = null;
  try {
    user = await getCurrentUser();
    if (user) {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (error) {
        throw error;
      }
      profile = data;
    }
  } catch (error) {
    console.error("Error checking authentication or fetching profile:", error);
  }
  let cartItems = [];
  let cartTotal = 0;
  try {
    const userId = user ? user.id : null;
    cartItems = await getCartItems(userId);
    cartTotal = await getCartTotal(userId);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
  if (request.method === "POST" && user && cartItems.length > 0) {
    const formData = await request.formData();
    formData.get("shipping_address");
    formData.get("shipping_city");
    formData.get("shipping_postcode");
    formData.get("payment_method");
    try {
      const order = await createOrder({
        user_id: user.id,
        total_amount: cartTotal,
        status: "confirmed"
      });
      for (const item of cartItems) {
        await createOrderItem({
          order_id: order.id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        });
      }
      await clearCart(user.id);
      return Response.redirect(new URL(`/pesanan/${order.id}`, request.url));
    } catch (error) {
      console.error("Error processing checkout:", error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})}  ${maybeRenderHead()}<section class="bg-[var(--furniture-cream)] py-8 px-6"> <div class="container mx-auto"> <h1 class="text-3xl font-bold text-[var(--furniture-brown)]">Checkout</h1> <p class="text-gray-600 mt-2">Lengkapi informasi untuk menyelesaikan pesanan Anda</p> </div> </section> <main class="container mx-auto py-8 px-4"> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Form Checkout --> <div class="lg:col-span-2"> <form method="post" class="bg-white rounded-lg shadow-md p-6 mb-6"> <h2 class="text-xl font-semibold text-[var(--furniture-brown)] mb-4">Informasi Pengiriman</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> <div> <label for="full_name" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label> <input type="text" id="full_name" name="full_name"${addAttribute(profile?.full_name || "", "value")} required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div> <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label> <input type="tel" id="phone" name="phone" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div class="md:col-span-2"> <label for="shipping_address" class="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman</label> <textarea id="shipping_address" name="shipping_address" rows="3" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"></textarea> </div> <div> <label for="shipping_city" class="block text-sm font-medium text-gray-700 mb-1">Kota</label> <input type="text" id="shipping_city" name="shipping_city" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> <div> <label for="shipping_postcode" class="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label> <input type="text" id="shipping_postcode" name="shipping_postcode" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"> </div> </div> <h2 class="text-xl font-semibold text-[var(--furniture-brown)] mb-4">Metode Pembayaran</h2> <div class="space-y-4 mb-6"> <div class="flex items-center"> <input type="radio" id="payment_transfer" name="payment_method" value="bank_transfer" required class="h-4 w-4 text-[var(--furniture-brown)] focus:ring-[var(--furniture-brown)]"> <label for="payment_transfer" class="ml-3 block text-sm font-medium text-gray-700">
Transfer Bank
</label> </div> <div class="flex items-center"> <input type="radio" id="payment_cod" name="payment_method" value="cash_on_delivery" class="h-4 w-4 text-[var(--furniture-brown)] focus:ring-[var(--furniture-brown)]"> <label for="payment_cod" class="ml-3 block text-sm font-medium text-gray-700">
Cash on Delivery (COD)
</label> </div> <div class="flex items-center"> <input type="radio" id="payment_ewallet" name="payment_method" value="e_wallet" class="h-4 w-4 text-[var(--furniture-brown)] focus:ring-[var(--furniture-brown)]"> <label for="payment_ewallet" class="ml-3 block text-sm font-medium text-gray-700">
E-Wallet
</label> </div> </div> <button type="submit" class="w-full btn-primary py-3 rounded-md"${addAttribute(!user || cartItems.length === 0, "disabled")}>
Bayar Sekarang
</button> </form> </div> <!-- Ringkasan Pesanan --> <div> <div class="bg-white rounded-lg shadow-md p-6 sticky top-6"> <h2 class="text-xl font-semibold text-[var(--furniture-brown)] mb-4">Ringkasan Pesanan</h2> <div class="space-y-4 mb-4"> ${cartItems.map((item) => renderTemplate`<div${addAttribute(item.id, "key")} class="flex justify-between"> <div> <h3 class="font-medium">${item.name}</h3> <p class="text-sm text-gray-600">${item.quantity} x Rp ${Number(item.price).toLocaleString("id-ID")}</p> </div> <p class="font-medium">Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</p> </div>`)} </div> <div class="pt-4 border-t border-gray-200"> <div class="flex justify-between mb-2"> <span>Subtotal</span> <span>Rp ${cartTotal.toLocaleString("id-ID")}</span> </div> <div class="flex justify-between mb-2"> <span>Biaya Pengiriman</span> <span>Gratis</span> </div> <div class="flex justify-between mb-4 pt-4 border-t border-gray-200"> <span class="font-semibold">Total</span> <span class="font-semibold text-[var(--furniture-brown)]">Rp ${cartTotal.toLocaleString("id-ID")}</span> </div> </div> </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/checkout.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/checkout.astro";
const $$url = "/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
