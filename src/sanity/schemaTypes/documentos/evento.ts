import { defineType, defineField } from "sanity";

/**
 * EVENTO — agenda de eventos.
 * El listado del sitio oculta los eventos pasados automáticamente (por fecha,
 * vía consulta GROQ); aquí no hay que hacer nada especial para eso.
 */
export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre del evento",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fechaInicio",
      title: "Fecha de inicio",
      type: "date",
      options: { dateFormat: "DD-MM-YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fechaTermino",
      title: "Fecha de término",
      description: "Deja vacío si dura un solo día.",
      type: "date",
      options: { dateFormat: "DD-MM-YYYY" },
    }),
    defineField({
      name: "lugar",
      title: "Lugar",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "enlace",
      title: "Enlace (más información o inscripción)",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  orderings: [
    {
      title: "Fecha (próximos primero)",
      name: "fechaAsc",
      by: [{ field: "fechaInicio", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "nombre", fecha: "fechaInicio", lugar: "lugar" },
    prepare({ title, fecha, lugar }) {
      return { title, subtitle: [fecha, lugar].filter(Boolean).join(" · ") };
    },
  },
});
