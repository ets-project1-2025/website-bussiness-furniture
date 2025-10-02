/* empty css                                     */
import { e as createComponent, r as renderTemplate } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import 'clsx';
import { S as SITE_URL } from '../chunks/config_CansV41r.mjs';
export { renderers } from '../renderers.mjs';

const $$Robots = createComponent(($$result, $$props, $$slots) => {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`.trim();
  return renderTemplate`${robotsTxt}`;
}, "/workspaces/website-bussiness-furniture/src/pages/robots.txt.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/robots.txt.astro";
const $$url = "/robots.txt";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Robots,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
