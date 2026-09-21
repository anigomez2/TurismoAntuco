/** Utilidades de idioma para el enrutado /es y /en. */

export const IDIOMAS = ["es", "en"] as const;
export type Idioma = (typeof IDIOMAS)[number];
export const IDIOMA_PRINCIPAL: Idioma = "es";

export function esIdiomaValido(valor: string): valor is Idioma {
  return (IDIOMAS as readonly string[]).includes(valor);
}
