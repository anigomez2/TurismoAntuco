import { defineType, defineField } from "sanity";
import { ESTADOS_CAMINO } from "../opciones";

/**
 * ESTADO DEL DÍA — documento único (singleton).
 * Es el documento que se edita todos los días. Pocos campos, orden lógico,
 * cómodo de editar desde el navegador del teléfono. Aparece PRIMERO en el Studio.
 */
export const estado = defineType({
  name: "estado",
  title: "Estado del día",
  type: "document",
  fields: [
    defineField({
      name: "parqueAbierto",
      title: "¿El parque está abierto?",
      description: "Estado del Parque Nacional Laguna del Laja (Conaf).",
      type: "boolean",
      initialValue: true,
      options: { layout: "switch" },
    }),
    defineField({
      name: "estadoCamino",
      title: "Estado de la Ruta Q-45",
      type: "string",
      options: { list: [...ESTADOS_CAMINO], layout: "radio" },
      initialValue: "normal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nieveCm",
      title: "Centímetros de nieve",
      description: "Deja 0 si no hay nieve.",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(1000),
    }),
    defineField({
      name: "andarivelesOperativos",
      title: "¿Andariveles operativos?",
      type: "boolean",
      initialValue: false,
      options: { layout: "switch" },
    }),
    defineField({
      name: "cupos",
      title: "Cupos disponibles",
      description:
        "Número aproximado de cupos de ingreso al parque para hoy. Deja vacío si no aplica.",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "avisoEs",
      title: "Texto de aviso (español)",
      description:
        "Mensaje breve del día en la franja superior. Ej.: “Camino con cadenas obligatorias desde Abanico”. Deja vacío si no hay avisos.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "avisoEn",
      title: "Texto de aviso (inglés)",
      description: "Traducción del aviso. Opcional.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "actualizado",
      title: "Última actualización",
      description:
        "Se completa automáticamente al publicar. Muestra al público cuándo se revisó el estado.",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: { abierto: "parqueAbierto", camino: "estadoCamino" },
    prepare({ abierto, camino }) {
      return {
        title: "Estado del día",
        subtitle: `Parque ${abierto ? "ABIERTO" : "CERRADO"} · camino: ${camino ?? "—"}`,
      };
    },
  },
});
