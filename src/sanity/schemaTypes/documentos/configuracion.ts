import { defineType, defineField } from "sanity";

/**
 * CONFIGURACIÓN — documento único (singleton).
 * Datos que aparecen en el pie de página y en varias secciones del sitio.
 * Se edita muy de vez en cuando.
 */
export const configuracion = defineType({
  name: "configuracion",
  title: "Configuración del sitio",
  type: "document",
  groups: [
    { name: "contacto", title: "Contacto", default: true },
    { name: "portada", title: "Portada" },
    { name: "redes", title: "Redes sociales" },
    { name: "enlaces", title: "Enlaces útiles" },
  ],
  fields: [
    defineField({
      name: "fotosPortada",
      title: "Fotos de portada (inicio)",
      description:
        "Fotografías del carrusel del inicio. Con una se muestra fija; con varias, se van alternando solas. Horizontales, de buena calidad. Se recomiendan de 3 a 6.",
      type: "array",
      group: "portada",
      of: [{ type: "fotoConAlt" }],
    }),
    defineField({
      name: "fotoPortada",
      title: "Foto de portada (respaldo, opcional)",
      description:
        "Se usa solo si no cargaste fotos en el carrusel de arriba. Puedes ignorar este campo.",
      type: "fotoConAlt",
      group: "portada",
    }),
    defineField({
      name: "email",
      title: "Correo electrónico",
      type: "string",
      group: "contacto",
      validation: (Rule) => Rule.email().warning("Revisa el formato del correo."),
    }),
    defineField({
      name: "telefono",
      title: "Teléfono de la oficina",
      type: "string",
      group: "contacto",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp de la oficina",
      description: "Número con código de país, sin símbolos. Ej.: 56912345678.",
      type: "string",
      group: "contacto",
    }),
    defineField({
      name: "direccionOficina",
      title: "Dirección de la oficina de información",
      type: "string",
      group: "contacto",
    }),
    defineField({
      name: "horarioOficina",
      title: "Horario de atención",
      description: "Ej.: “Lunes a domingo, 9:00 a 18:00”.",
      type: "text",
      rows: 2,
      group: "contacto",
    }),
    defineField({
      name: "instagram",
      title: "Instagram (URL)",
      type: "url",
      group: "redes",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "facebook",
      title: "Facebook (URL)",
      type: "url",
      group: "redes",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "enlaceEntradasConaf",
      title: "Enlace de compra de entradas (Conaf)",
      description: "URL oficial de Conaf para comprar la entrada al parque.",
      type: "url",
      group: "enlaces",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "camaraWebUrl",
      title: "Cámara web en vivo (URL)",
      description:
        "Enlace a la cámara en vivo del acceso al parque, si existe. Se muestra en “Planifica tu visita”. Déjalo vacío si aún no hay.",
      type: "url",
      group: "enlaces",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "tarifasEntrada",
      title: "Tarifas de entrada (texto)",
      description:
        "Valores de la entrada al parque. Ej.: “Adulto [PRECIO] · Niño [PRECIO] · Adulto mayor [PRECIO]”. Una línea por tarifa.",
      type: "text",
      rows: 4,
      group: "enlaces",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configuración del sitio" };
    },
  },
});
