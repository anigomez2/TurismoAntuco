import { defineType, defineField } from "sanity";

/**
 * HISTORIA Y PATRIMONIO — documento único (singleton).
 * Contenido editable de la página "Historia y patrimonio": una bajada y varias
 * secciones (título, texto y foto), en español e inglés. El inglés es opcional.
 */
export const historia = defineType({
  name: "historia",
  title: "Historia y patrimonio",
  type: "document",
  fields: [
    defineField({
      name: "bajadaEs",
      title: "Bajada / introducción (español)",
      description: "Frase corta bajo el título de la página.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "bajadaEn",
      title: "Bajada / introducción (inglés)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "secciones",
      title: "Secciones",
      description: "Cada bloque de historia, en orden. Arrastra para reordenar.",
      type: "array",
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
              name: "textoEs",
              title: "Texto (español)",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required(),
            },
            { name: "textoEn", title: "Texto (inglés)", type: "text", rows: 5 },
            { name: "foto", title: "Foto", type: "fotoConAlt" },
          ],
          preview: {
            select: { title: "tituloEs", subtitle: "tituloEn", media: "foto" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Historia y patrimonio" }),
  },
});
