// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://codxenon.dev",
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [
    starlight({
      title: "Cod Xenon",
      favicon: "/favicon.ico",
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://codxenon.dev/og-image.png",
          },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:width", content: "1200" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:height", content: "630" },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.com/invite/wCgjAMEQU5",
        },
      ],
      sidebar: [
        {
          label: "Start Here",
          items: ["getting-started"],
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
      ],
    }),
  ],
});
