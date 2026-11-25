// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import cloudflare from "@astrojs/cloudflare";

const buildBranch = process.env.WORKERS_CI_BRANCH;

// https://astro.build/config
export default defineConfig({
  site:
    process.env.SITE_URL ||
    (buildBranch === "beta"
      ? "https://beta.codxenon.dev"
      : "https://codxenon.dev"),
  vite: {
    build: {
      // Starlight marks its barrel as side-effect-free. Skip unused components
      // that would otherwise pull the Markdown parser into the Worker bundle.
      rolldownOptions: { experimental: { lazyBarrel: true } },
    },
  },
  redirects: {
    "/getting-started/": "/setup/",
    "/guides/codxe/xbox-360/": "/setup/xbox-360/",
    "/guides/codxe/xenia/": "/setup/xenia/",
    "/guides/prepare-game-files/": "/setup/",
    "/setup/game-formats/": "/setup/",
    "/guides/xenia/install/": "/setup/xenia/#install-xenia",
    "/setup/xenia/emulator/": "/setup/xenia/#install-xenia",
    "/guides/iw3/fastfiles/": "/games/iw3/maps/",
    "/guides/iw3-bot-warfare/": "/games/iw3/bot-warfare/",
    "/guides/iw3/bot-warfare/": "/games/iw3/bot-warfare/",
    "/guides/iw3/galactic-warfare/": "/games/iw3/galactic-warfare/",
    "/guides/t4/fastfiles/": "/games/t4/zombies/",
    "/guides/t4/bot-warfare/": "/games/t4/bot-warfare/",
    "/guides/iw5/bot-warfare/": "/games/iw5/bot-warfare/",
    "/games/t4/single-player-settings/": "/games/t4/#single-player-settings",
    "/get-help/": "/help/",
    "/reference/supported-games/": "/help/compatibility/",
    "/reference/credits/": "/help/credits/",
    "/guides/title-updates/xbox-360/": "/help/xbox-360-title-updates/",
    "/guides/title-updates/xenia/": "/help/xenia-title-updates/",
  },
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  }),
  session: false,
  integrations: [
    {
      name: "local-dev-cache",
      hooks: {
        "astro:config:setup": ({ command, updateConfig }) => {
          // A concurrent build must leave the running dev server's modules intact.
          if (command === "dev")
            updateConfig({ vite: { cacheDir: "node_modules/.vite-dev" } });
        },
      },
    },
    starlight({
      title: "CoD Xenon",
      description:
        "CoD Xe setup guides and curated maps and mods for Xbox 360 and Xenia.",
      editLink: {
        baseUrl: `https://github.com/codxenon/website/edit/${buildBranch ?? "beta"}`,
      },
      components: {
        Header: "/src/components/SiteHeader.astro",
        Hero: "/src/components/SiteHero.astro",
        Sidebar: "/src/components/SiteSidebar.astro",
      },
      routeMiddleware: ["/src/share-metadata.ts"],
      pagination: false,
      favicon: "/favicon.ico",
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
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
        {
          icon: "heart",
          label: "Ko-fi",
          href: "https://ko-fi.com/michaeloliverx",
        },
      ],
      sidebar: [
        {
          label: "Setup",
          items: ["setup", "setup/xbox-360", "setup/xenia"],
        },
        {
          label: "Call of Duty 4",
          items: [
            { label: "Overview", slug: "games/iw3" },
            { label: "Multiplayer maps", slug: "games/iw3/maps" },
            { label: "Bot Warfare", slug: "games/iw3/bot-warfare" },
            {
              label: "Galactic Warfare",
              slug: "games/iw3/galactic-warfare",
            },
          ],
        },
        {
          label: "World at War",
          items: [
            { label: "Overview", slug: "games/t4" },
            { label: "Multiplayer maps", slug: "games/t4/maps" },
            { label: "Zombies maps", slug: "games/t4/zombies" },
            { label: "Bot Warfare", slug: "games/t4/bot-warfare" },
          ],
        },
        {
          label: "Modern Warfare 3",
          items: [
            { label: "Overview", slug: "games/iw5" },
            { label: "Bot Warfare", slug: "games/iw5/bot-warfare" },
          ],
        },
        {
          label: "Help & reference",
          items: [
            "help",
            "help/compatibility",
            {
              label: "Xbox 360 title updates",
              slug: "help/xbox-360-title-updates",
            },
            {
              label: "Xenia title updates",
              slug: "help/xenia-title-updates",
            },
            "help/credits",
          ],
        },
      ],
    }),
  ],
});
