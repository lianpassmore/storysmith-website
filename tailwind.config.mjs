// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#1a1a1a',
        'warm-parchment': '#f9f7f4',
        'brand-navy': '#1e3a78',
        'soft-peach': '#e8e7ad',
        'vital-lime': '#b5b741',
        'legacy-purple': '#c5a0b8',
      },
      fontFamily: {
        'migra': ['Playfair Display', 'serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
        'open-sauce': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}