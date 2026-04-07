// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://codxenon.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Barlow Condensed",
      cssVariable: "--font-barlow-condensed",
      weights: [700, 900],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Barlow",
      cssVariable: "--font-barlow",
      weights: [400, 500],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Share Tech Mono",
      cssVariable: "--font-share-tech-mono",
      weights: [400],
    },
  ],
  adapter: cloudflare({
    imageService: "compile",
  }),
});
