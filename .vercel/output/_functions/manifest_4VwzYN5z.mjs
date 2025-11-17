import { p as decodeKey } from './chunks/astro/server_DmvM-GcU.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BOqf9_4I.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/boss/storysmith-website/","cacheDir":"file:///Users/boss/storysmith-website/node_modules/.astro/","outDir":"file:///Users/boss/storysmith-website/dist/","srcDir":"file:///Users/boss/storysmith-website/src/","publicDir":"file:///Users/boss/storysmith-website/public/","buildClientDir":"file:///Users/boss/storysmith-website/dist/client/","buildServerDir":"file:///Users/boss/storysmith-website/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"legacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/legacy","isIndex":false,"type":"page","pattern":"^\\/legacy\\/?$","segments":[[{"content":"legacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/legacy.astro","pathname":"/legacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/demo/check-limit","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/demo\\/check-limit\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"demo","dynamic":false,"spread":false}],[{"content":"check-limit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/demo/check-limit.ts","pathname":"/api/demo/check-limit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/demo/track","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/demo\\/track\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"demo","dynamic":false,"spread":false}],[{"content":"track","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/demo/track.ts","pathname":"/api/demo/track","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/stripe/checkout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/stripe\\/checkout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"stripe","dynamic":false,"spread":false}],[{"content":"checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/stripe/checkout.ts","pathname":"/api/stripe/checkout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BDe8wAj-.css"}],"routeData":{"route":"/legacy-purchase","isIndex":false,"type":"page","pattern":"^\\/legacy-purchase\\/?$","segments":[[{"content":"legacy-purchase","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/legacy-purchase.astro","pathname":"/legacy-purchase","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BDe8wAj-.css"}],"routeData":{"route":"/purchase-success","isIndex":false,"type":"page","pattern":"^\\/purchase-success\\/?$","segments":[[{"content":"purchase-success","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/purchase-success.astro","pathname":"/purchase-success","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/boss/storysmith-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/boss/storysmith-website/src/pages/legacy-purchase.astro",{"propagation":"none","containsHead":true}],["/Users/boss/storysmith-website/src/pages/legacy.astro",{"propagation":"none","containsHead":true}],["/Users/boss/storysmith-website/src/pages/purchase-success.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/demo/check-limit@_@ts":"pages/api/demo/check-limit.astro.mjs","\u0000@astro-page:src/pages/api/demo/track@_@ts":"pages/api/demo/track.astro.mjs","\u0000@astro-page:src/pages/api/stripe/checkout@_@ts":"pages/api/stripe/checkout.astro.mjs","\u0000@astro-page:src/pages/legacy@_@astro":"pages/legacy.astro.mjs","\u0000@astro-page:src/pages/legacy-purchase@_@astro":"pages/legacy-purchase.astro.mjs","\u0000@astro-page:src/pages/purchase-success@_@astro":"pages/purchase-success.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_4VwzYN5z.mjs","/Users/boss/storysmith-website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_asvZz3--.mjs","/Users/boss/storysmith-website/src/pages/legacy.astro?astro&type=script&index=0&lang.ts":"_astro/legacy.astro_astro_type_script_index_0_lang.KpB3279J.js","/Users/boss/storysmith-website/src/pages/legacy-purchase.astro?astro&type=script&index=0&lang.ts":"_astro/legacy-purchase.astro_astro_type_script_index_0_lang.CyUNZB6_.js","/Users/boss/storysmith-website/src/pages/purchase-success.astro?astro&type=script&index=0&lang.ts":"_astro/purchase-success.astro_astro_type_script_index_0_lang.CkbaM_aZ.js","/Users/boss/storysmith-website/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DRugwHEn.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/boss/storysmith-website/src/pages/legacy.astro?astro&type=script&index=0&lang.ts","async function s(t,e={}){try{await fetch(\"/api/demo/track\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({event:t,metadata:e})})}catch(n){console.error(\"Analytics error:\",n)}}async function d(){try{const e=await(await fetch(\"/api/demo/check-limit\")).json(),n=document.getElementById(\"rate-limit-warning\"),i=document.getElementById(\"demo-widget-container\"),o=document.getElementById(\"rate-limit-message\"),c=document.getElementById(\"demos-remaining\");e.allowed?c&&e.remaining!==void 0&&(c.textContent=`${e.remaining} demo${e.remaining!==1?\"s\":\"\"} remaining today`):(n&&n.classList.remove(\"hidden\"),i&&i.classList.add(\"hidden\"),o&&e.message&&(o.textContent=e.message))}catch(t){console.error(\"Error checking demo limit:\",t)}}function r(){const t=document.getElementById(\"widget-loading\"),e=document.getElementById(\"widget-content\"),n=document.getElementById(\"widget-error\");setTimeout(()=>{t&&t.classList.add(\"hidden\"),e&&e.classList.remove(\"hidden\"),s(\"demo_started\")},2e3),setTimeout(()=>{const i=document.querySelector(\"elevenlabs-convai\");(!i||!i.shadowRoot)&&(e&&e.classList.add(\"hidden\"),n&&n.classList.remove(\"hidden\"))},1e4)}function m(){document.querySelectorAll('a[href=\"/legacy-purchase\"]').forEach(e=>{e.addEventListener(\"click\",()=>{s(\"demo_conversion\",{source:\"demo_page\",timestamp:new Date().toISOString()})})})}function a(){d(),r(),m()}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",a):a();"],["/Users/boss/storysmith-website/src/pages/legacy-purchase.astro?astro&type=script&index=0&lang.ts","const l=document.querySelector(\"form\"),c=document.getElementById(\"checkout-button\"),d=document.getElementById(\"button-text\"),u=document.getElementById(\"button-spinner\");l?.addEventListener(\"submit\",async m=>{m.preventDefault();const e=new FormData(l),s=e.get(\"your_name\"),r=e.get(\"your_email\"),a=e.get(\"storyteller_name\"),o=e.get(\"storyteller_email\"),y=e.get(\"gifting_experience\");if(!s||!r||!a||!o){alert(\"Please fill in all required fields\");return}const i=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;if(!i.test(r)||!i.test(o)){alert(\"Please enter valid email addresses\");return}c.disabled=!0,d.classList.add(\"hidden\"),u.classList.remove(\"hidden\");try{const t=await fetch(\"/api/stripe/checkout\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:r,yourName:s,storytellerName:a,storytellerEmail:o,giftingType:y})}),n=await t.json();if(!t.ok)throw new Error(n.error||\"Something went wrong\");if(n.url)window.location.href=n.url;else throw new Error(\"No checkout URL returned\")}catch(t){console.error(\"Error:\",t),alert(\"There was an error processing your request. Please try again.\"),c.disabled=!1,d.classList.remove(\"hidden\"),u.classList.add(\"hidden\")}});"],["/Users/boss/storysmith-website/src/pages/purchase-success.astro?astro&type=script&index=0&lang.ts","const o=new URLSearchParams(window.location.search),s=o.get(\"session_id\");s&&console.log(\"Checkout session:\",s);"],["/Users/boss/storysmith-website/src/components/Header.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"mobile-menu-button\"),e=document.getElementById(\"mobile-menu\");t?.addEventListener(\"click\",()=>{e?.classList.toggle(\"hidden\")});document.addEventListener(\"click\",n=>{!t?.contains(n.target)&&!e?.contains(n.target)&&e?.classList.add(\"hidden\")});window.addEventListener(\"resize\",()=>{window.innerWidth>=768&&e?.classList.add(\"hidden\")});"]],"assets":["/_astro/index.BDe8wAj-.css","/favicon.svg","/master-icon-square.svg","/monogram-avatar-128.png","/monogram-avatar-64.png","/next.svg","/og-image.png","/storysmith-logo-black.png","/storysmith-logo-white.png","/legacy/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"9LrS4W4nPg3UnyfXMZQXaUJcyXzHhdeqQ0AQL/L3mRo="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
