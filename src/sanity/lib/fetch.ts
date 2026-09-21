import { draftMode } from "next/headers";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Cliente de servidor con token de lectura. Se usa SOLO en Server Components
 * (el token nunca se envía al navegador: no lleva prefijo NEXT_PUBLIC_).
 * Así el sitio lee el contenido publicado aunque el dataset sea privado.
 */
const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});

/** Cliente para la vista previa de borradores (Draft Mode + Presentation). */
const previewClient = serverClient.withConfig({
  perspective: "previewDrafts",
  useCdn: false,
  stega: { studioUrl: "/studio" },
});

/**
 * Etiquetas de caché por tipo de documento. El webhook de Sanity revalida la
 * etiqueta correspondiente al publicar, de modo que el sitio (estático) se
 * actualiza en segundos sin reconstruir todo.
 */
export const TAGS = {
  estado: "estado",
  prestador: "prestador",
  experiencia: "experiencia",
  evento: "evento",
  ficha: "ficha",
  configuracion: "configuracion",
} as const;

export type Tag = (typeof TAGS)[keyof typeof TAGS];

/**
 * Consulta a Sanity con caché etiquetada para revalidación a demanda.
 * En Draft Mode (vista previa) lee los borradores sin caché; en producción
 * lee lo publicado y solo se refresca cuando el webhook revalida su etiqueta.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags: Tag[];
}): Promise<T> {
  // draftMode() solo existe dentro de una petición. En generateStaticParams o
  // en el sitemap (fuera de petición) lanza: ahí asumimos contenido publicado.
  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  if (isDraft) {
    return previewClient.fetch<T>(query, params, {
      cache: "no-store",
    });
  }

  return serverClient.fetch<T>(query, params, {
    next: { tags },
  });
}
