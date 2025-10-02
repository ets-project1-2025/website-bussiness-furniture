/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { a as getLookbookGalleryById } from '../../chunks/products_DowiKeHc.mjs';
import { $ as $$Layout } from '../../chunks/Layout_DAI1A3cM.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const LookbookInteractive = ({ gallery }) => {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  if (!gallery) {
    return /* @__PURE__ */ jsx("div", { children: "Galeri tidak ditemukan" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: gallery.cover_image_url,
        alt: gallery.title,
        className: "w-full h-auto rounded-lg shadow-md"
      }
    ),
    gallery.lookbook_hotspots.map((hotspot) => /* @__PURE__ */ jsx(
      "a",
      {
        href: `/produk/${hotspot.product_id}`,
        className: "absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold hover:bg-indigo-700 transition-all duration-200 hover:scale-125",
        style: {
          left: `${hotspot.coordinates.x}%`,
          top: `${hotspot.coordinates.y}%`
        },
        title: hotspot.product.name,
        onMouseEnter: () => setHoveredHotspot(hotspot),
        onMouseLeave: () => setHoveredHotspot(null),
        children: "?"
      },
      hotspot.id
    )),
    hoveredHotspot && /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute bg-white p-4 rounded-lg shadow-xl border border-gray-200 max-w-xs z-10",
        style: {
          left: `${hoveredHotspot.coordinates.x + 5}%`,
          top: `${hoveredHotspot.coordinates.y}%`,
          transform: "translateY(-50%)"
        },
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          hoveredHotspot.product.product_images && hoveredHotspot.product.product_images[0]?.image_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: hoveredHotspot.product.product_images[0].image_url,
              alt: hoveredHotspot.product.name,
              className: "w-16 h-16 object-cover rounded mr-3"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "bg-gray-200 border-2 border-dashed rounded w-16 h-16 flex items-center justify-center text-gray-500 mr-3", children: "?" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: hoveredHotspot.product.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-indigo-600 font-bold", children: [
              "Rp",
              Number(hoveredHotspot.product.price).toLocaleString("id-ID")
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Klik untuk detail" })
          ] })
        ] })
      }
    )
  ] });
};

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const id = Astro2.params.id;
  let gallery = null;
  try {
    gallery = await getLookbookGalleryById(id);
  } catch (error) {
    console.error("Error fetching lookbook gallery:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> ${gallery ? renderTemplate`<div> <div class="mb-6"> <h1 class="text-3xl font-bold text-gray-900">${gallery.title}</h1> <p class="text-gray-600 mt-2">${gallery.description}</p> </div> ${renderComponent($$result2, "LookbookInteractive", LookbookInteractive, { "gallery": gallery })} <div class="mt-8"> <h2 class="text-2xl font-bold text-gray-900 mb-4">Furnitur dalam Gaya Ini</h2> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> ${gallery.lookbook_hotspots.map((hotspot) => renderTemplate`<a${addAttribute(`/produk/${hotspot.product_id}`, "href")}${addAttribute(hotspot.id, "key")} class="block group"> <div class="bg-white rounded-lg shadow-md overflow-hidden"> ${hotspot.product.product_images && hotspot.product.product_images.length > 0 ? renderTemplate`<img${addAttribute(hotspot.product.product_images[0].image_url, "src")}${addAttribute(hotspot.product.name, "alt")} class="w-full h-48 object-cover group-hover:opacity-90">` : renderTemplate`<div class="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center text-gray-500">
Tidak ada gambar
</div>`} <div class="p-4"> <h3 class="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">${hotspot.product.name}</h3> <p class="text-indigo-600 font-bold mt-2">Rp${Number(hotspot.product.price).toLocaleString("id-ID")}</p> </div> </div> </a>`)} </div> </div> </div>` : renderTemplate`<div class="text-center py-12"> <p class="text-gray-600">Galeri lookbook tidak ditemukan.</p> </div>`} </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/lookbook/[id].astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/lookbook/[id].astro";
const $$url = "/lookbook/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
