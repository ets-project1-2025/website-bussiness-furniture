/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DAI1A3cM.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_BqIr9XFu.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const heroContent = {
    title: "Furniture Modern yang Mewah dan Alami",
    subtitle: "Temukan koleksi eksklusif kami yang menggabungkan desain inovatif dengan kehangatan alami kayu",
    ctaText: "Jelajahi Produk",
    ctaLink: "/produk"
  };
  const featuredProducts = [
    {
      id: 1,
      name: "Meja Tamu Minimalis",
      description: "Meja tamu dengan desain modern dan finishing halus",
      price: 35e5,
      image: "/images/meja-tamu-minimalis.jpg"
    },
    {
      id: 2,
      name: "Kursi Santai Kayu Jati",
      description: "Kursi nyaman dengan bahan kayu jati pilihan",
      price: 275e4,
      image: "/images/kursi-santai-kayu.jpg"
    },
    {
      id: 3,
      name: "Lemari Pakaian Klasik",
      description: "Lemari dengan ukiran klasik dan ruang penyimpanan luas",
      price: 52e5,
      image: "/images/lemari-pakaian-klasik.jpg"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})}  ${maybeRenderHead()}<section class="bg-[var(--furniture-cream)] py-16 px-6"> <div class="container mx-auto text-center"> <h1 class="text-4xl md:text-5xl font-bold text-[var(--furniture-brown)] mb-4">${heroContent.title}</h1> <p class="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">${heroContent.subtitle}</p> <a${addAttribute(heroContent.ctaLink, "href")} class="btn-primary inline-block"> ${heroContent.ctaText} </a> </div> </section>  <section class="py-12 px-6"> <div class="container mx-auto"> <h2 class="text-3xl font-bold text-center text-[var(--furniture-brown)] mb-12">Kenapa Memilih Kami?</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="text-center p-6 bg-white rounded-lg shadow-md"> <div class="w-16 h-16 bg-[var(--furniture-light-brown)] rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[var(--furniture-brown)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> </div> <h3 class="text-xl font-semibold mb-2">Kualitas Terbaik</h3> <p>Kami hanya menggunakan bahan-bahan pilihan dan proses produksi yang teruji untuk memastikan kualitas terbaik.</p> </div> <div class="text-center p-6 bg-white rounded-lg shadow-md"> <div class="w-16 h-16 bg-[var(--furniture-light-brown)] rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[var(--furniture-brown)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path> </svg> </div> <h3 class="text-xl font-semibold mb-2">Desain Inovatif</h3> <p>Desain kami menggabungkan estetika modern dengan fungsionalitas tinggi untuk ruang hidup Anda.</p> </div> <div class="text-center p-6 bg-white rounded-lg shadow-md"> <div class="w-16 h-16 bg-[var(--furniture-light-brown)] rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[var(--furniture-brown)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-xl font-semibold mb-2">Pengiriman Cepat</h3> <p>Kami menjamin pengiriman tepat waktu dengan layanan pelanggan yang ramah dan profesional.</p> </div> </div> </div> </section>  <section class="py-12 px-6 bg-[var(--furniture-cream)]"> <div class="container mx-auto"> <h2 class="text-3xl font-bold text-center text-[var(--furniture-brown)] mb-12">Produk Unggulan</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${featuredProducts.map((product) => renderTemplate`<div class="product-card"> <div class="h-64 bg-gray-200 overflow-hidden"> <img${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover"> </div> <div class="p-6"> <h3 class="text-xl font-semibold mb-2">${product.name}</h3> <p class="text-gray-600 mb-4">${product.description}</p> <div class="flex justify-between items-center"> <span class="text-lg font-bold text-[var(--furniture-brown)]">Rp ${product.price.toLocaleString("id-ID")}</span> <button class="btn-secondary text-sm">Lihat Detail</button> </div> </div> </div>`)} </div> <div class="text-center mt-12"> <a href="/produk" class="btn-primary">Lihat Semua Produk</a> </div> </div> </section>  <section class="py-12 px-6"> <div class="container mx-auto"> <h2 class="text-3xl font-bold text-center text-[var(--furniture-brown)] mb-12">Apa Kata Pelanggan Kami</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"> <div class="bg-white p-6 rounded-lg shadow-md"> <div class="flex items-center mb-4"> <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div> <div> <h4 class="font-semibold">Budi Santoso</h4> <div class="flex text-yellow-400"> ${[...Array(5)].map((_, i) => renderTemplate`<svg${addAttribute(i, "key")} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg>`)} </div> </div> </div> <p class="text-gray-600">"Furniture yang saya beli sangat berkualitas dan desainnya sesuai dengan harapan saya. Pelayanan pelanggan juga sangat ramah dan membantu."</p> </div> <div class="bg-white p-6 rounded-lg shadow-md"> <div class="flex items-center mb-4"> <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div> <div> <h4 class="font-semibold">Siti Rahayu</h4> <div class="flex text-yellow-400"> ${[...Array(5)].map((_, i) => renderTemplate`<svg${addAttribute(i, "key")} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg>`)} </div> </div> </div> <p class="text-gray-600">"Desain interior rumah saya benar-benar berubah setelah menambahkan furniture dari WIDI Furniture. Kualitas dan estetikanya luar biasa!"</p> </div> </div> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/index.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
