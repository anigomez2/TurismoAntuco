import { defineType, defineField } from "sanity";
import { TIPOS_FICHA } from "../opciones";

/**
 * FICHA — especies, geositios e hitos de la guía de campo "Explorando Antuco".
 *
 * IMPORTANTE: la dirección web (slug) se enlaza con códigos QR IMPRESOS en la
 * señalética de los senderos. Si cambia, los QR dejan de funcionar. Por eso el
 * slug se BLOQUEA automáticamente una vez que existe, y solo puede cambiarse
 * activando conscientemente el candado de abajo.
 */
export const ficha = defineType({
  name: "ficha",
  title: "Ficha de la guía",
  type: "document",
  fields: [
    defineField({
      name: "tipo",
      title: "Tipo de ficha",
      type: "string",
      options: { list: [...TIPOS_FICHA], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nombreComun",
      title: "Nombre común",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nombreCientifico",
      title: "Nombre científico",
      description: "Solo para especies. Se muestra en cursiva.",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Dirección web (slug) — ⚠ NO cambiar tras imprimir los QR",
      description:
        "Se genera desde el nombre común. Una vez publicada la ficha e impresos sus códigos QR, este valor NO debe cambiar o los QR dejarán de funcionar. Queda bloqueado automáticamente.",
      type: "slug",
      options: { source: "nombreComun", maxLength: 40 },
      readOnly: ({ document }) =>
        Boolean(document?.slug) && !document?.desbloquearSlug,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desbloquearSlug",
      title: "Desbloquear la dirección web (avanzado, no recomendado)",
      description:
        "Actívalo SOLO si sabes que los códigos QR de esta ficha aún no se han impreso. Al desactivarlo, el slug vuelve a quedar bloqueado.",
      type: "boolean",
      initialValue: false,
      options: { layout: "checkbox" },
    }),
    defineField({
      name: "texto",
      title: "Texto de la ficha",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "fotos",
      title: "Fotos",
      type: "array",
      of: [{ type: "fotoConAlt" }],
    }),
    defineField({
      name: "ubicacion",
      title: "Ubicación en el mapa",
      type: "geopoint",
    }),
  ],
  preview: {
    select: { title: "nombreComun", tipo: "tipo", media: "fotos.0" },
    prepare({ title, tipo, media }) {
      return { title, subtitle: tipo, media };
    },
  },
});
