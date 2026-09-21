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
 * Por defecto no expira por tiempo: solo se refresca cuando el webhook
 * revalida su etiqueta (o en cada build).
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
  return serverClient.fetch<T>(query, params, {
    next: { tags },
  });
}
