/**
 * Listas de selección compartidas por los esquemas.
 * Centralizarlas evita erratas y mantiene coherencia entre documentos.
 * (Los editores eligen de una lista; no escriben texto libre.)
 */

export const LOCALIDADES = [
  { title: "Antuco (pueblo)", value: "antuco" },
  { title: "Abanico", value: "abanico" },
  { title: "Villa Peluca", value: "villa-peluca" },
  { title: "Alto Antuco", value: "alto-antuco" },
] as const;

export const TEMPORADAS = [
  { title: "Invierno", value: "invierno" },
  { title: "Primavera", value: "primavera" },
  { title: "Verano", value: "verano" },
  { title: "Otoño", value: "otono" },
] as const;

export const DIFICULTADES = [
  { title: "Baja", value: "baja" },
  { title: "Media", value: "media" },
  { title: "Alta", value: "alta" },
] as const;

export const TIPOS_PRESTADOR = [
  { title: "Alojamiento", value: "alojamiento" },
  { title: "Dónde comer", value: "comida" },
  { title: "Guía u operador", value: "guia" },
] as const;

export const SUBTIPOS_PRESTADOR = [
  // Alojamiento
  { title: "Cabaña", value: "cabana" },
  { title: "Hostal / hospedaje", value: "hostal" },
  { title: "Camping", value: "camping" },
  { title: "Hotel", value: "hotel" },
  // Comida
  { title: "Restaurante", value: "restaurante" },
  { title: "Café / cafetería", value: "cafe" },
  { title: "Cocinería / comida casera", value: "cocineria" },
  // Guía
  { title: "Guía de montaña", value: "guia-montana" },
  { title: "Operador de turismo", value: "operador" },
  { title: "Arriero / cabalgatas", value: "arriero" },
] as const;

export const TIPOS_FICHA = [
  { title: "Especie (flora o fauna)", value: "especie" },
  { title: "Geositio", value: "geositio" },
  { title: "Hito (histórico o cultural)", value: "hito" },
] as const;

export const ESTADOS_CAMINO = [
  { title: "Normal / despejado", value: "normal" },
  { title: "Con nieve", value: "nieve" },
  { title: "Se requieren cadenas", value: "cadenas" },
  { title: "Cerrado", value: "cerrado" },
] as const;
