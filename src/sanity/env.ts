/**
 * Lectura y validación de las variables de entorno de Sanity.
 * Se importa tanto desde el sitio (Next.js) como desde el Studio.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Falta la variable de entorno: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Falta la variable de entorno: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

/** Idiomas del sitio. El español es el principal. */
export const idiomas = [
  { id: "es", title: "Español" },
  { id: "en", title: "English" },
] as const;

export const idiomaPrincipal = "es";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
