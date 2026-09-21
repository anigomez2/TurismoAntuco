import { defineType, defineField } from "sanity";
import {
  LOCALIDADES,
  TIPOS_PRESTADOR,
  SUBTIPOS_PRESTADOR,
} from "../opciones";

/**
 * PRESTADOR — alojamientos, lugares para comer y guías/operadores.
 * Alimenta el Directorio y se referencia como "guía" en las experiencias.
 */
export const prestador = defineType({
  name: "prestador",
  title: "Prestador (directorio)",
  type: "document",
  groups: [
    { name: "basico", title: "Datos básicos", default: true },
    { name: "reserva", title: "Reserva y contacto" },
    { name: "fotos", title: "Fotos y ubicación" },
  ],
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      description: "Nombre del negocio o de la persona.",
      type: "string",
      group: "basico",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo",
      description: "¿En qué pestaña del directorio aparece?",
      type: "string",
      group: "basico",
      options: { list: [...TIPOS_PRESTADOR], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtipo",
      title: "Subtipo",
      type: "string",
      group: "basico",
      options: { list: [...SUBTIPOS_PRESTADOR] },
    }),
    defineField({
      name: "localidad",
      title: "Localidad",
      type: "string",
      group: "basico",
      options: { list: [...LOCALIDADES] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "detalle",
      title: "Detalle / capacidad",
      description:
        "Breve. Ej.: “Capacidad 6 personas, 2 dormitorios” o “Cocina chilena, 40 cubiertos”.",
      type: "text",
      rows: 2,
      group: "basico",
    }),
    defineField({
      name: "precioDesde",
      title: "Precio desde (CLP)",
      description:
        "Solo el número, sin puntos ni símbolo. Se muestra como “desde $X”. Deja vacío si no aplica.",
      type: "number",
      group: "basico",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "registradoSernatur",
      title: "¿Registrado en Sernatur?",
      description: "Activa el distintivo “Registrado Sernatur” en la ficha.",
      type: "boolean",
      initialValue: false,
      group: "basico",
      options: { layout: "switch" },
    }),
    defineField({
      name: "enlaceReserva",
      title: "Enlace de reserva",
      description: "URL de Booking, Airbnb o sitio propio. Debe empezar con https://",
      type: "url",
      group: "reserva",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).warning(
          "Revisa que la dirección esté completa."
        ),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      description:
        "Número con código de país, sin símbolos. Ej.: 56912345678. Genera el botón de WhatsApp.",
      type: "string",
      group: "reserva",
      validation: (Rule) =>
        Rule.regex(/^[0-9]{8,15}$/, {
          name: "telefono",
          invert: false,
        }).warning("Solo números, con código de país (ej.: 56912345678)."),
    }),
    defineField({
      name: "contactoSolicitante",
      title: "Contacto de la solicitud (uso interno)",
      description:
        "Se completa automáticamente cuando alguien envía el formulario “Publica tu servicio”. Sirve para contactar al prestador antes de publicar. No se muestra en el sitio.",
      type: "string",
      group: "basico",
      readOnly: true,
    }),
    defineField({
      name: "fotos",
      title: "Fotos",
      type: "array",
      group: "fotos",
      of: [{ type: "fotoConAlt" }],
      options: { layout: "grid" },
    }),
    defineField({
      name: "ubicacion",
      title: "Ubicación en el mapa",
      description: "Marca el punto en el mapa (opcional).",
      type: "geopoint",
      group: "fotos",
    }),
  ],
  preview: {
    select: { title: "nombre", tipo: "tipo", localidad: "localidad", media: "fotos.0" },
    prepare({ title, tipo, localidad, media }) {
      return {
        title,
        subtitle: [tipo, localidad].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
