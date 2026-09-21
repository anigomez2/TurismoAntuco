import { defineType } from "sanity";

/**
 * Imagen con texto alternativo OBLIGATORIO.
 * El texto alternativo describe la foto para personas que usan lectores de
 * pantalla y es requisito de accesibilidad. Se usa en todos los esquemas.
 */
export const fotoConAlt = defineType({
  name: "fotoConAlt",
  title: "Foto",
  type: "image",
  options: {
    hotspot: true, // permite elegir el punto focal para recortes responsivos
  },
  fields: [
    {
      name: "alt",
      title: "Texto alternativo",
      description:
        "Describe brevemente qué se ve en la foto (ej.: “Volcán Antuco nevado al amanecer visto desde la laguna”). Es obligatorio.",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("El texto alternativo es obligatorio."),
    },
  ],
  preview: {
    select: { imageUrl: "asset.url", title: "alt" },
  },
});
