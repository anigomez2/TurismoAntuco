import type { Idioma } from "@/lib/i18n";

/**
 * Textos fijos de la interfaz (los que NO vienen de Sanity).
 * El español es el idioma principal; el inglés puede completarse luego.
 */
export const diccionarios = {
  es: {
    slogan: "Ven, respira profundo y descubre Antuco",
    nav: {
      inicio: "Inicio",
      planifica: "Planifica tu visita",
      directorio: "Directorio",
      experiencias: "Experiencias",
      agenda: "Agenda",
      explorando: "Explorando Antuco",
      historia: "Historia y patrimonio",
      contacto: "Contacto",
    },
    estado: {
      titulo: "Estado del día",
      parqueAbierto: "Parque abierto",
      parqueCerrado: "Parque cerrado",
      camino: "Ruta Q-45",
      nieve: "Nieve",
      cupos: "Cupos",
      andariveles: "Andariveles",
      operativos: "operativos",
      detenidos: "detenidos",
      verDetalle: "Ver detalle",
      actualizado: "Actualizado",
      caminoEstados: {
        normal: "despejada",
        nieve: "con nieve",
        cadenas: "cadenas obligatorias",
        cerrado: "cerrada",
      },
    },
    comun: {
      desde: "desde",
      porPersona: "por persona",
      reservar: "Reservar",
      whatsapp: "WhatsApp",
      verMas: "Ver más",
      dificultad: "Dificultad",
      duracion: "Duración",
      grupo: "Grupo máximo",
      personas: "personas",
      registradoSernatur: "Registrado Sernatur",
      cargando: "Cargando…",
      sinResultados: "No hay resultados con estos filtros.",
      fotoPendiente: "Foto pendiente",
    },
    localidades: {
      antuco: "Antuco",
      abanico: "Abanico",
      "villa-peluca": "Villa Peluca",
      "alto-antuco": "Alto Antuco",
    },
    temporadas: {
      invierno: "Invierno",
      primavera: "Primavera",
      verano: "Verano",
      otono: "Otoño",
    },
    dificultades: { baja: "Baja", media: "Media", alta: "Alta" },
    footer: {
      oficina: "Oficina de información turística",
      contacto: "Contacto",
      horario: "Horario",
      siguenos: "Síguenos",
      derechos: "Cámara de Turismo de Antuco y Municipalidad de Antuco",
    },
  },
  en: {
    slogan: "Come, breathe deeply and discover Antuco",
    nav: {
      inicio: "Home",
      planifica: "Plan your visit",
      directorio: "Directory",
      experiencias: "Experiences",
      agenda: "Events",
      explorando: "Exploring Antuco",
      historia: "History & heritage",
      contacto: "Contact",
    },
    estado: {
      titulo: "Today's status",
      parqueAbierto: "Park open",
      parqueCerrado: "Park closed",
      camino: "Route Q-45",
      nieve: "Snow",
      cupos: "Spots",
      andariveles: "Lifts",
      operativos: "running",
      detenidos: "stopped",
      verDetalle: "See details",
      actualizado: "Updated",
      caminoEstados: {
        normal: "clear",
        nieve: "snowy",
        cadenas: "chains required",
        cerrado: "closed",
      },
    },
    comun: {
      desde: "from",
      porPersona: "per person",
      reservar: "Book",
      whatsapp: "WhatsApp",
      verMas: "See more",
      dificultad: "Difficulty",
      duracion: "Duration",
      grupo: "Max group",
      personas: "people",
      registradoSernatur: "Sernatur registered",
      cargando: "Loading…",
      sinResultados: "No results for these filters.",
      fotoPendiente: "Photo pending",
    },
    localidades: {
      antuco: "Antuco",
      abanico: "Abanico",
      "villa-peluca": "Villa Peluca",
      "alto-antuco": "Alto Antuco",
    },
    temporadas: {
      invierno: "Winter",
      primavera: "Spring",
      verano: "Summer",
      otono: "Autumn",
    },
    dificultades: { baja: "Easy", media: "Moderate", alta: "Hard" },
    footer: {
      oficina: "Tourist information office",
      contacto: "Contact",
      horario: "Hours",
      siguenos: "Follow us",
      derechos: "Antuco Tourism Chamber and Municipality of Antuco",
    },
  },
} as const;

export type Diccionario = (typeof diccionarios)[Idioma];

export function getDiccionario(lang: Idioma) {
  return diccionarios[lang];
}
