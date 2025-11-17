import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_B3m0CZ9Q.mjs';
import { manifest } from './manifest_D4zI1V_B.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/demo/check-limit.astro.mjs');
const _page2 = () => import('./pages/api/demo/track.astro.mjs');
const _page3 = () => import('./pages/api/stripe/checkout.astro.mjs');
const _page4 = () => import('./pages/legacy.astro.mjs');
const _page5 = () => import('./pages/legacy-purchase.astro.mjs');
const _page6 = () => import('./pages/purchase-success.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/demo/check-limit.ts", _page1],
    ["src/pages/api/demo/track.ts", _page2],
    ["src/pages/api/stripe/checkout.ts", _page3],
    ["src/pages/legacy.astro", _page4],
    ["src/pages/legacy-purchase.astro", _page5],
    ["src/pages/purchase-success.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d67ac80a-f74b-4e96-962c-34e16080df01",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
