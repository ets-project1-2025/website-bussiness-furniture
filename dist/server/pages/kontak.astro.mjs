/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CJN7PJsY.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DAI1A3cM.mjs';
export { renderers } from '../renderers.mjs';

const $$Kontak = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--furniture-cream)]"> <!-- Hero Section --> <section class="bg-[var(--furniture-brown)] text-white py-16"> <div class="container mx-auto px-4 text-center"> <h1 class="text-4xl font-bold mb-4">Hubungi Kami</h1> <p class="text-xl max-w-2xl mx-auto">Kami siap membantu Anda dengan pertanyaan atau pesanan furnitur impian Anda</p> </div> </section> <!-- Contact Information --> <section class="py-16"> <div class="container mx-auto px-4"> <div class="flex flex-col lg:flex-row gap-12"> <div class="lg:w-1/2"> <h2 class="text-3xl font-bold text-[var(--furniture-brown)] mb-6">Informasi Kontak</h2> <div class="space-y-6"> <div class="flex items-start"> <div class="w-12 h-12 bg-[var(--furniture-brown)] rounded-full flex items-center justify-center mr-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </div> <div> <h3 class="text-lg font-semibold text-gray-900">Alamat</h3> <p class="text-gray-700">Jl. Jendral Sudirman No. 123, Jakarta Selatan, DKI Jakarta, Indonesia</p> </div> </div> <div class="flex items-start"> <div class="w-12 h-12 bg-[var(--furniture-brown)] rounded-full flex items-center justify-center mr-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> </div> <div> <h3 class="text-lg font-semibold text-gray-900">Telepon</h3> <p class="text-gray-700">+62 21 1234 5678</p> </div> </div> <div class="flex items-start"> <div class="w-12 h-12 bg-[var(--furniture-brown)] rounded-full flex items-center justify-center mr-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> </div> <div> <h3 class="text-lg font-semibold text-gray-900">Email</h3> <p class="text-gray-700">info@widifurniture.com</p> </div> </div> <div class="flex items-start"> <div class="w-12 h-12 bg-[var(--furniture-brown)] rounded-full flex items-center justify-center mr-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div> <h3 class="text-lg font-semibold text-gray-900">Jam Operasional</h3> <p class="text-gray-700">Senin - Sabtu: 09:00 - 18:00 WIB<br>Minggu: Libur</p> </div> </div> </div> <div class="mt-12"> <h2 class="text-2xl font-bold text-[var(--furniture-brown)] mb-4">Lokasi Kami</h2> <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
Peta Lokasi WIDI Furniture
</div> </div> </div> <div class="lg:w-1/2"> <h2 class="text-3xl font-bold text-[var(--furniture-brown)] mb-6">Kirim Pesan</h2> <form class="space-y-6"> <div> <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label> <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="Nama Anda"> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label> <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="email@contoh.com"> </div> <div> <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subjek</label> <input type="text" id="subject" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="Subjek pesan"> </div> <div> <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Pesan</label> <textarea id="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]" placeholder="Tulis pesan Anda di sini..."></textarea> </div> <button type="submit" class="w-full bg-[var(--furniture-brown)] text-white py-3 px-4 rounded-md hover:bg-[var(--furniture-light-brown)] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--furniture-brown)]">
Kirim Pesan
</button> </form> </div> </div> </div> </section> <!-- FAQ Section --> <section class="py-16 bg-[var(--furniture-light-brown)]"> <div class="container mx-auto px-4"> <h2 class="text-3xl font-bold text-center text-[var(--furniture-brown)] mb-12">Pertanyaan Umum</h2> <div class="max-w-3xl mx-auto space-y-6"> ${[
    {
      question: "Berapa lama waktu pengiriman pesanan?",
      answer: "Waktu pengiriman bervariasi tergantung lokasi Anda. Secara umum, pengiriman di Jabodetabek memakan waktu 3-5 hari kerja, sedangkan luar Jabodetabek memakan waktu 7-14 hari kerja."
    },
    {
      question: "Apakah produk WIDI Furniture dilengkapi dengan garansi?",
      answer: "Ya, kami memberikan garansi 1 tahun untuk produk-produk kami terhadap cacat produksi. Untuk informasi lebih lanjut tentang syarat dan ketentuan garansi, hubungi tim layanan pelanggan kami."
    },
    {
      question: "Apakah saya bisa memesan furnitur secara khusus sesuai keinginan?",
      answer: "Tentu! Kami melayani pesanan furnitur khusus sesuai dengan desain dan ukuran yang Anda inginkan. Silakan hubungi tim desain kami untuk konsultasi dan penawaran harga."
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer: "Kami menerima berbagai metode pembayaran termasuk transfer bank, kartu kredit, dan dompet digital seperti OVO, Dana, dan LinkAja."
    }
  ].map((faq, index) => renderTemplate`<div${addAttribute(index, "key")} class="bg-white p-6 rounded-lg shadow-md"> <h3 class="text-lg font-semibold text-[var(--furniture-brown)] mb-2">${faq.question}</h3> <p class="text-gray-700">${faq.answer}</p> </div>`)} </div> </div> </section> </div> ` })}`;
}, "/workspaces/website-bussiness-furniture/src/pages/kontak.astro", void 0);

const $$file = "/workspaces/website-bussiness-furniture/src/pages/kontak.astro";
const $$url = "/kontak";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Kontak,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
