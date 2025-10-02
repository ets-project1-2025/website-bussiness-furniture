/* empty css                                        */
import { e as createComponent, f as createAstro } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import 'clsx';
import { a as logout } from '../../chunks/auth_DlBTwayV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  await logout();
  return Astro2.redirect("/");
}, "/workspaces/website-bussiness-furniture/src/pages/akun/logout.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/akun/logout.astro";
const $$url = "/akun/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
