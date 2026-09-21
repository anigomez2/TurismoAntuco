import { defineType, defineField } from "sanity";
import { TEMPORADAS, DIFICULTADES } from "../opciones";

/**
 * EXPERIENCIA — tours y actividades con precio publicado.
 * Tiene listado filtrable y página de detalle propia.
 */
export const experiencia = defineType({
  name: "experiencia",
  title: "Experiencia",
  type: "document",
  groups: [
    { name: "basico", title: "Datos básicos", default: true },
    { name: "detalle", title: "Detalle de la experiencia" },
    { name: "reserva", title: "Reserva y contacto" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      group: "basico",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Dirección web (slug)",
      description: "Se genera desde el título. Parte final de la URL de la experiencia.",
      type: "slug",
      group: "basico",
      options: { source: "titulo", maxLength: 60 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "temporadas",
      title: "Temporadas",
      description: "¿En qué estaciones se ofrece? Puedes marcar varias.",
      type: "array",
      group: "basico",
      of: [{ type: "string" }],
      options: { list: [...TEMPORADAS] },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "dificultad",
      title: "Dificultad",
      type: "string",
      group: "basico",
      options: { list: [...DIFICULTADES], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duracion",
      title: "Duración",
      description: "Ej.: “4 horas”, “Día completo”, “2 días / 1 noche”.",
      type: "string",
      group: "basico",
    }),
    defineField({
      name: "grupoMaximo",
      title: "Tamaño máximo del grupo",
      type: "number",
      group: "basico",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "precioDesde",
      title: "Precio desde (CLP por persona)",
      description: "Solo el número, sin puntos ni símbolo.",
      type: "number",
      group: "basico",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "fotos",
      title: "Galería de fotos",
      type: "array",
      group: "basico",
      of: [{ type: "fotoConAlt" }],
      options: { layout: "grid" },
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "array",
      group: "detalle",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "itinerario",
      title: "Itinerario",
      description: "Un punto por paso o parada.",
      type: "array",
      group: "detalle",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "incluye",
      title: "Qué incluye",
      type: "array",
      group: "detalle",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "noIncluye",
      title: "Qué NO incluye",
      type: "array",
      group: "detalle",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "guia",
      title: "Guía",
      description: "Elige el prestador (tipo “guía”) a cargo de esta experiencia.",
      type: "reference",
      group: "detalle",
      to: [{ type: "prestador" }],
    }),
    defineField({
      name: "politicaCancelacion",
      title: "Política de cancelación",
      type: "text",
      rows: 3,
      group: "reserva",
    }),
    defineField({
      name: "enlaceReserva",
      title: "Enlace de reserva",
      type: "url",
      group: "reserva",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      description: "Número con código de país, sin símbolos. Ej.: 56912345678.",
      type: "string",
      group: "reserva",
      validation: (Rule) =>
        Rule.regex(/^[0-9]{8,15}$/).warning(
          "Solo números, con código de país (ej.: 56912345678)."
        ),
    }),
  ],
  preview: {
    select: { title: "titulo", dificultad: "dificultad", media: "fotos.0" },
    prepare({ title, dificultad, media }) {
      return { title, subtitle: dificultad ? `Dificultad: ${dificultad}` : "", media };
    },
  },
});
