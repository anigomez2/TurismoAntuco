import { defineType, defineField } from "sanity";

/**
 * HISTORIA Y PATRIMONIO — documento único (singleton).
 * Tiene un "hero" (la historia geológica de Antuco) y varias secciones temáticas.
 * Cada sección tiene un resumen (para la tarjeta) y un contenido completo (para
 * su propia página de detalle). Todo en español e inglés; el inglés es opcional.
 */
export const historia = defineType({
  name: "historia",
  title: "Historia y patrimonio",
  type: "document",
  groups: [
    { name: "hero", title: "Hero (historia geológica)", default: true },
    { name: "secciones", title: "Secciones" },
  ],
  fields: [
    // --- Hero: historia geológica ---
    defineField({
      name: "heroTituloEs",
      title: "Título del hero (español)",
      type: "string",
      group: "hero",
      initialValue: "La historia geológica del Volcán Antuco",
    }),
    defineField({ name: "heroTituloEn", title: "Título del hero (inglés)", type: "string", group: "hero" }),
    defineField({
      name: "heroTextoEs",
      title: "Historia geológica (español)",
      description: "Separa los párrafos con una línea en blanco.",
      type: "text",
      rows: 8,
      group: "hero",
    }),
    defineField({ name: "heroTextoEn", title: "Historia geológica — introducción (inglés)", type: "text", rows: 8, group: "hero" }),
    defineField({
      name: "heroContenidoEs",
      title: "Historia geológica — artículo completo (español)",
      description:
        "Texto completo de la página dedicada a la historia geológica. Separa los párrafos con una línea en blanco.",
      type: "text",
      rows: 16,
      group: "hero",
    }),
    defineField({ name: "heroContenidoEn", title: "Historia geológica — artículo completo (inglés)", type: "text", rows: 16, group: "hero" }),
    defineField({ name: "heroFoto", title: "Foto del hero", type: "fotoConAlt", group: "hero" }),

    // --- Secciones temáticas ---
    defineField({
      name: "secciones",
      title: "Secciones",
      description: "Cada tema con su tarjeta y su página de detalle. Arrastra para reordenar.",
      type: "array",
      group: "secciones",
      of: [
        {
          type: "object",
          name: "seccion",
          title: "Sección",
          fields: [
            {
              name: "tituloEs",
              title: "Título (español)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "tituloEn", title: "Título (inglés)", type: "string" },
            {
              name: "slug",
              title: "Dirección web (slug)",
              description: "Se genera desde el título. Parte final de la URL de la página del tema.",
              type: "slug",
              options: { source: "tituloEs", maxLength: 60 },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "resumenEs",
              title: "Resumen (español)",
              description: "Texto corto que aparece en la tarjeta de la página de Historia.",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            { name: "resumenEn", title: "Resumen (inglés)", type: "text", rows: 3 },
            {
              name: "contenidoEs",
              title: "Contenido completo (español)",
              description: "El artículo de la página del tema. Separa los párrafos con una línea en blanco.",
              type: "text",
              rows: 12,
              validation: (Rule) => Rule.required(),
            },
            { name: "contenidoEn", title: "Contenido completo (inglés)", type: "text", rows: 12 },
            { name: "foto", title: "Foto", type: "fotoConAlt" },
          ],
          preview: {
            select: { title: "tituloEs", subtitle: "slug.current", media: "foto" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Historia y patrimonio" }),
  },
});
