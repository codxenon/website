import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { getImage } from "astro:assets";

const defaultImage = {
  path: "/og-image.png",
  alt: "CoD Xenon",
  width: 1200,
  height: 630,
};

export const onRequest = defineRouteMiddleware(async (context) => {
  const { entry, head } = context.locals.starlightRoute;
  const artwork = entry.data.shareImage ?? defaultImage;
  const imported = "file" in artwork;
  const image = imported
    ? {
        path: (
          await getImage({ src: artwork.file, format: "jpeg", quality: 85 })
        ).src,
        alt: artwork.alt,
        width: artwork.file.width,
        height: artwork.file.height,
      }
    : artwork;
  const imageUrl = new URL(image.path, context.site ?? context.url).href;
  const extension = imported
    ? "jpeg"
    : image.path.split(".").at(-1)?.toLowerCase();
  const mediaType = extension === "jpg" ? "jpeg" : extension;
  const properties = {
    "og:image": imageUrl,
    "og:image:alt": image.alt,
    "og:image:width": String(image.width),
    "og:image:height": String(image.height),
    "og:image:type": `image/${mediaType}`,
  };

  for (const [property, content] of Object.entries(properties)) {
    head.push({ tag: "meta", attrs: { property, content } });
  }
  head.push(
    { tag: "meta", attrs: { name: "twitter:image", content: imageUrl } },
    { tag: "meta", attrs: { name: "twitter:image:alt", content: image.alt } },
  );
});
