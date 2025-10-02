import { e as createComponent, f as createAstro, h as addAttribute, n as renderHead, o as renderSlot, l as renderScript, r as renderTemplate } from './astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                       */

const $$Astro = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="id"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="manifest" href="/manifest.json"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>WIDI Furniture - Furniture Modern yang Mewah dan Alami</title><meta name="description" content="Temukan koleksi furniture eksklusif kami yang menggabungkan desain modern dengan kehangatan alami kayu. Dapatkan pengalaman desain interior yang unik dan personal."><meta name="theme-color" content="#8B4513"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body> <div id="root"> ${renderSlot($$result, $$slots["default"])} </div> <!-- Tombol Install PWA --> <div id="installPrompt" class="install-prompt hidden"> <div class="install-content"> <h3>Install Aplikasi WIDI Furniture</h3> <p>Install aplikasi kami untuk pengalaman belanja yang lebih baik.</p> <button id="installButton" class="btn-primary">Install</button> <button id="closeInstall" class="btn-secondary">Tutup</button> </div> </div>  ${renderScript($$result, "/workspaces/website-bussiness-furniture/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/workspaces/website-bussiness-furniture/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
