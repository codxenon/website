// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://codxenon.dev",
  redirects: {
    "/guides/iw3-bot-warfare/": "/guides/iw3/bot-warfare/",
  },
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [
    starlight({
      title: "CoD Xenon",
      favicon: "/favicon.ico",
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      head: [
        {
          tag: "meta",
          attrs: { property: "og:site_name", content: "CoD Xenon" },
        },
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
        {
          tag: "meta",
          attrs: { property: "og:image:type", content: "image/png" },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/codxenon",
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
          items: [
            "guides/codxe",
            {
              label: "Call of Duty 4 (IW3)",
              items: [{ label: "Bot Warfare", slug: "guides/iw3/bot-warfare" }],
            },
            {
              label: "Modern Warfare 2 (IW4)",
              items: [
                { label: "Fastfiles", slug: "guides/iw4/fastfiles" },
                { label: "Bot Warfare", slug: "guides/iw4/bot-warfare" },
              ],
            },
            {
              label: "World at War (T4)",
              items: [{ label: "Bot Warfare", slug: "guides/t4/bot-warfare" }],
            },
          ],
        },
      ],
    }),
  ],
});
