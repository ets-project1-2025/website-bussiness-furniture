/* empty css                                        */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { g as getSupabase } from '../../chunks/supabase_Cmeg_PNw.mjs';
export { renderers } from '../../renderers.mjs';

const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.redirect(new URL("/admin/login", request.url));
  }
  const { data: profileData } = await supabase.from("profiles").select("id").eq("id", user.id).single();
  if (!profileData) {
    return Response.redirect(new URL("/akun/login", request.url));
  }
  let users = [];
  const { data: profilesData, error } = await getSupabase().from("profiles").select(`
    id,
    email,
    full_name,
    phone,
    address,
    created_at,
    updated_at,
    user_level
  `).order("created_at", { ascending: false });
  if (profilesData) {
    users = profilesData;
  }
  if (error) {
    console.error("Error fetching users:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="flex justify-between items-center mb-6"> <h1 class="text-3xl font-bold text-gray-900">Manajemen Pengguna</h1> </div> <!-- Tabel Pengguna --> <div class="bg-white rounded-lg shadow-md overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Telepon</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${users.map((profile) => renderTemplate`<tr${addAttribute(profile.id, "key")}> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm font-medium text-gray-900">${profile.email}</div> </td> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-900">${profile.full_name || "-"}</div> </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${profile.phone || "-"} </td> <td class="px-6 py-4 whitespace-nowrap"> <span${addAttribute(`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${profile.user_level === "admin" ? "bg-red-100 text-red-800" : profile.user_level === "premium" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`, "class")}> ${profile.user_level || "basic"} </span> </td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${new Date(profile.created_at).toLocaleDateString("id-ID")} </td> <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"> <button onclick="changeUserLevel('{profile.id}', '{profile.user_level}')" class="text-blue-600 hover:text-blue-900 mr-3">
Ubah Level
</button> <button onclick="viewUserDetails('{profile.id}')" class="text-gray-600 hover:text-gray-900">
Detail
</button> </td> </tr>`)} </tbody> </table> </div> </div> ${renderScript($$result2, "/workspaces/website-bussiness-furniture/src/pages/admin/users.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/admin/users.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/admin/users.astro";
const $$url = "/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Users,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
