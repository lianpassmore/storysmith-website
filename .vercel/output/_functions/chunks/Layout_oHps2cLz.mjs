import { e as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, f as createAstro, h as addAttribute, n as renderHead, k as renderComponent, o as renderSlot } from './astro/server_DmvM-GcU.mjs';
/* empty css                         */
import 'clsx';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- src/components/Header.astro -->${maybeRenderHead()}<header class="fixed top-0 left-0 right-0 z-50 bg-warm-parchment/95 backdrop-blur-sm border-b border-brand-black/10"> <nav class="container mx-auto px-6 py-4"> <div class="flex items-center justify-between"> <!-- Logo --> <a href="/" class="hover:opacity-80 transition-opacity"> <img src="/storysmith-logo-black.png" alt="StorySmith" class="h-10 md:h-12"> </a> <!-- Desktop Navigation --> <ul class="hidden md:flex items-center gap-8"> <li> <a href="/legacy" class="bg-brand-navy text-warm-parchment font-open-sauce uppercase tracking-wider py-2 px-6 hover:bg-opacity-90 transition-colors rounded-md text-sm">
The Spoken Legacy
</a> </li> </ul> <!-- Mobile Menu Button --> <button id="mobile-menu-button" class="md:hidden text-brand-black focus:outline-none" aria-label="Toggle menu"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> <!-- Mobile Navigation --> <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4"> <ul class="flex flex-col gap-4"> <li> <a href="/legacy" class="block bg-brand-navy text-warm-parchment font-open-sauce uppercase tracking-wider py-3 px-6 hover:bg-opacity-90 transition-colors rounded-md text-sm text-center">
The Spoken Legacy
</a> </li> </ul> </div> </nav> </header> <!-- Spacer to prevent content from hiding under fixed header --> <div class="h-16"></div> ${renderScript($$result, "/Users/boss/storysmith-website/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/boss/storysmith-website/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<!-- src/layouts/Layout.astro --><html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="StorySmith: We transform wisdom into a sacred, lasting asset."><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>StorySmith</title><!-- Google Fonts Import --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Playfair+Display:wght@700&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-warm-parchment text-brand-black font-open-sauce"> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/boss/storysmith-website/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
