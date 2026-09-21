import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Construye URLs del CDN de Sanity con formato automático (WebP/AVIF).
 * Uso: urlForImage(foto).width(800).height(600).url()
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
