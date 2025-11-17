import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server mode for API routes
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});