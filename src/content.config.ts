import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";
import { games, publishedGames } from "./games.mjs";

const hidden = games.filter((game) => !publishedGames.includes(game.id));
export const collections = {
  docs: defineCollection({
    loader: glob({
      base: "./src/content/docs",
      pattern: [
        "**/[^_]*.{md,mdx}",
        ...hidden.map(({ id }) => `!games/${id}/**`),
      ],
    }),
    schema: docsSchema({
      extend: ({ image }) =>
        z.object({
          // Share an imported image or artwork already in public/og.
          shareImage: z
            .union([
              z.object({
                file: image(),
                alt: z.string().min(1),
              }),
              z.object({
                path: z
                  .string()
                  .regex(/^\/og\/[a-z0-9/_-]+\.(?:png|jpe?g|webp)$/i),
                alt: z.string().min(1),
                width: z.number().int().positive().default(1200),
                height: z.number().int().positive().default(630),
              }),
            ])
            .optional(),
        }),
    }),
  }),
};
