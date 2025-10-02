/* empty css                                        */
import { e as createComponent, f as createAstro } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$lang = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$lang;
  const lang = Astro2.params.lang;
  const validLangs = ["id", "en"];
  if (!validLangs.includes(lang)) {
    return Astro2.redirect("/");
  }
  const referer = Astro2.request.headers.get("Referer") || "/";
  return Astro2.redirect(referer);
}, "/workspaces/website-bussiness-furniture/src/pages/lang/[lang].astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/lang/[lang].astro";
const $$url = "/lang/[lang]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$lang,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
