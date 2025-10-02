import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Ch8CWROK.mjs';
import { manifest } from './manifest_D3FC0eKb.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/analytics.astro.mjs');
const _page2 = () => import('./pages/admin/categories/new.astro.mjs');
const _page3 = () => import('./pages/admin/categories.astro.mjs');
const _page4 = () => import('./pages/admin/dashboard.astro.mjs');
const _page5 = () => import('./pages/admin/login.astro.mjs');
const _page6 = () => import('./pages/admin/lookbook/edit/_id_.astro.mjs');
const _page7 = () => import('./pages/admin/lookbook/new.astro.mjs');
const _page8 = () => import('./pages/admin/lookbook/_id_/hotspots/edit/_hotspotid_.astro.mjs');
const _page9 = () => import('./pages/admin/lookbook/_id_/hotspots/new.astro.mjs');
const _page10 = () => import('./pages/admin/lookbook/_id_.astro.mjs');
const _page11 = () => import('./pages/admin/lookbook.astro.mjs');
const _page12 = () => import('./pages/admin/orders.astro.mjs');
const _page13 = () => import('./pages/admin/products/new.astro.mjs');
const _page14 = () => import('./pages/admin/products.astro.mjs');
const _page15 = () => import('./pages/admin/recommendations.astro.mjs');
const _page16 = () => import('./pages/admin/users.astro.mjs');
const _page17 = () => import('./pages/admin.astro.mjs');
const _page18 = () => import('./pages/akun/edit.astro.mjs');
const _page19 = () => import('./pages/akun/login.astro.mjs');
const _page20 = () => import('./pages/akun/logout.astro.mjs');
const _page21 = () => import('./pages/akun/pesanan.astro.mjs');
const _page22 = () => import('./pages/akun/profil.astro.mjs');
const _page23 = () => import('./pages/akun/register.astro.mjs');
const _page24 = () => import('./pages/akun/ubah-password.astro.mjs');
const _page25 = () => import('./pages/akun/wishlist.astro.mjs');
const _page26 = () => import('./pages/akun.astro.mjs');
const _page27 = () => import('./pages/api/stripe.astro.mjs');
const _page28 = () => import('./pages/checkout.astro.mjs');
const _page29 = () => import('./pages/keranjang.astro.mjs');
const _page30 = () => import('./pages/kontak.astro.mjs');
const _page31 = () => import('./pages/lang/_lang_.astro.mjs');
const _page32 = () => import('./pages/lookbook/_id_.astro.mjs');
const _page33 = () => import('./pages/lookbook.astro.mjs');
const _page34 = () => import('./pages/pembayaran/cek-status.astro.mjs');
const _page35 = () => import('./pages/pesanan/_id_.astro.mjs');
const _page36 = () => import('./pages/produk/_id_.astro.mjs');
const _page37 = () => import('./pages/produk.astro.mjs');
const _page38 = () => import('./pages/robots.txt.astro.mjs');
const _page39 = () => import('./pages/sitemap.xml.astro.mjs');
const _page40 = () => import('./pages/success.astro.mjs');
const _page41 = () => import('./pages/tentang.astro.mjs');
const _page42 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/analytics.astro", _page1],
    ["src/pages/admin/categories/new.astro", _page2],
    ["src/pages/admin/categories.astro", _page3],
    ["src/pages/admin/dashboard.astro", _page4],
    ["src/pages/admin/login.astro", _page5],
    ["src/pages/admin/lookbook/edit/[id].astro", _page6],
    ["src/pages/admin/lookbook/new.astro", _page7],
    ["src/pages/admin/lookbook/[id]/hotspots/edit/[hotspotId].astro", _page8],
    ["src/pages/admin/lookbook/[id]/hotspots/new.astro", _page9],
    ["src/pages/admin/lookbook/[id]/index.astro", _page10],
    ["src/pages/admin/lookbook.astro", _page11],
    ["src/pages/admin/orders.astro", _page12],
    ["src/pages/admin/products/new.astro", _page13],
    ["src/pages/admin/products.astro", _page14],
    ["src/pages/admin/recommendations.astro", _page15],
    ["src/pages/admin/users.astro", _page16],
    ["src/pages/admin/index.astro", _page17],
    ["src/pages/akun/edit.astro", _page18],
    ["src/pages/akun/login.astro", _page19],
    ["src/pages/akun/logout.astro", _page20],
    ["src/pages/akun/pesanan.astro", _page21],
    ["src/pages/akun/profil.astro", _page22],
    ["src/pages/akun/register.astro", _page23],
    ["src/pages/akun/ubah-password.astro", _page24],
    ["src/pages/akun/wishlist.astro", _page25],
    ["src/pages/akun.astro", _page26],
    ["src/pages/api/stripe.ts", _page27],
    ["src/pages/checkout.astro", _page28],
    ["src/pages/keranjang.astro", _page29],
    ["src/pages/kontak.astro", _page30],
    ["src/pages/lang/[lang].astro", _page31],
    ["src/pages/lookbook/[id].astro", _page32],
    ["src/pages/lookbook.astro", _page33],
    ["src/pages/pembayaran/cek-status.astro", _page34],
    ["src/pages/pesanan/[id].astro", _page35],
    ["src/pages/produk/[id].astro", _page36],
    ["src/pages/produk.astro", _page37],
    ["src/pages/robots.txt.astro", _page38],
    ["src/pages/sitemap.xml.astro", _page39],
    ["src/pages/success.astro", _page40],
    ["src/pages/tentang.astro", _page41],
    ["src/pages/index.astro", _page42]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///workspaces/website-bussiness-furniture/dist/client/",
    "server": "file:///workspaces/website-bussiness-furniture/dist/server/",
    "host": true,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
