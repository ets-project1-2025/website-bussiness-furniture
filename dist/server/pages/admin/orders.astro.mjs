/* empty css                                        */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CkwFf8le.mjs';
import { i as getAllOrders } from '../../chunks/admin-api_DFNxy3BB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Orders = createComponent(async ($$result, $$props, $$slots) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.redirect(new URL("/admin/login", request.url));
  }
  const { data: profileData } = await supabase.from("profiles").select("id").eq("id", user.id).single();
  if (!profileData) {
    return Response.redirect(new URL("/akun/login", request.url));
  }
  let orders = [];
  try {
    orders = await getAllOrders();
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Pesanan" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-6"> <h2 class="text-2xl font-bold text-[var(--furniture-brown)]">Manajemen Pesanan</h2> </div>  <div class="bg-white rounded-lg shadow-md overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-[var(--furniture-light-brown)]"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">ID Pesanan</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Pengguna</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Total</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Status</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Tanggal</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-[var(--furniture-brown)] uppercase tracking-wider">Aksi</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${orders.map((order) => renderTemplate`<tr${addAttribute(order.id, "key")}> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> ${order.id.substring(0, 8)} </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${order.user?.email || order.user_id.substring(0, 8)} </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
Rp ${Number(order.total_amount).toLocaleString("id-ID")} </td> <td class="px-6 py-4 whitespace-nowrap"> <span${addAttribute(`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : order.status === "confirmed" ? "bg-blue-100 text-blue-800" : order.status === "shipped" ? "bg-indigo-100 text-indigo-800" : order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, "class")}> ${order.status} </span> </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${new Date(order.created_at).toLocaleDateString("id-ID")} </td> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"> <a${addAttribute(`/pesanan/${order.id}`, "href")} class="text-blue-600 hover:text-blue-900 mr-3">Lihat</a> <button onclick="updateOrderStatus('{order.id}', '{order.status}')" class="text-gray-600 hover:text-gray-900">
Ubah Status
</button> </td> </tr>`)} </tbody> </table> </div> ` })} ${renderScript($$result, "/workspaces/website-bussiness-furniture/src/pages/admin/orders.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/orders.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/orders.astro";
const $$url = "/admin/orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Orders,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
