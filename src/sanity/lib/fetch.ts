import { client } from "./client";

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
  return client.fetch<T>(query, params, {
    next: { tags },
  });
}
