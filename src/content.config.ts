import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { games, publishedGames } from "./games.mjs";

const hidden = games.filter((game) => !publishedGames.includes(game.id));
export const collections = {
  docs: defineCollection({
    loader: glob({
      base: "./src/content/docs",
      pattern: [
        "**/[^_]*.{md,mdx}",
        ...hidden.flatMap(({ id }) => [`!guides/${id}/**`, `!games/${id}/**`]),
      ],
    }),
    schema: docsSchema(),
  }),
};
