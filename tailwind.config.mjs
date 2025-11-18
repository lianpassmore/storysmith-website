// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // --- COLOR PALETTE ---
      // Direct, simple color names for easy use.
      colors: {
        'brand-black': '#1a1a1a',
        'brand-white': '#f9f7f4',
        'brand-navy': '#1e3a78',
        'brand-peach': '#e8e7ad',
        'brand-lime': '#b5b741',
      },

      // --- FONT FAMILY ---
      // We'll use 'sans' for body and 'serif' for headlines to keep it simple.
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },

      // --- CUSTOM SPACING & SIZING ---
      // Optional, but good for consistency.
      container: {
        center: true,
        padding: '1.5rem', // Corresponds to px-6 in your code
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
}