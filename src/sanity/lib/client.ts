import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Cliente de solo lectura para el sitio público.
 * useCdn en true para datos publicados (rápido y cacheado); la frescura del
 * "estado del día" la garantiza la revalidación por webhook, no el CDN.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
