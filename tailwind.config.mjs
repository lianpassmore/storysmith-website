// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#1a1a1a',
        'brand-white': '#f9f7f4',
        'brand-navy': '#1e3a78',
        'brand-peach': '#e8e7ad',
        'brand-lime': '#b5b741',
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