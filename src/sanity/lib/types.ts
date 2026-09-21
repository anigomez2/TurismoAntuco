/** Tipos del contenido de Sanity usados en el sitio. */

export type Idioma = "es" | "en";

export interface FotoConAlt {
  _key?: string;
  alt: string;
  asset?: { _ref: string; _type: "reference" };
  lqip?: string;
  dims?: { width: number; height: number };
}

export interface Estado {
  parqueAbierto: boolean;
  estadoCamino: "normal" | "nieve" | "cadenas" | "cerrado";
  nieveCm?: number;
  andarivelesOperativos?: boolean;
  cupos?: number;
  avisoEs?: string;
  avisoEn?: string;
  actualizado?: string;
}

export interface Configuracion {
  email?: string;
  telefono?: string;
  whatsapp?: string;
  direccionOficina?: string;
  horarioOficina?: string;
  instagram?: string;
  facebook?: string;
  enlaceEntradasConaf?: string;
}

export type TipoPrestador = "alojamiento" | "comida" | "guia";
export type Localidad = "antuco" | "abanico" | "villa-peluca" | "alto-antuco";
export type Temporada = "invierno" | "primavera" | "verano" | "otono";
export type Dificultad = "baja" | "media" | "alta";

export interface Prestador {
  _id: string;
  nombre: string;
  tipo: TipoPrestador;
  subtipo?: string;
  localidad: Localidad;
  detalle?: string;
  precioDesde?: number;
  registradoSernatur?: boolean;
  enlaceReserva?: string;
  whatsapp?: string;
  fotos?: FotoConAlt[];
  ubicacion?: { lat: number; lng: number };
}

export interface Experiencia {
  _id: string;
  titulo: string;
  slug: string;
  temporadas: Temporada[];
  dificultad: Dificultad;
  duracion?: string;
  grupoMaximo?: number;
  precioDesde?: number;
  descripcion?: unknown[];
  itinerario?: string[];
  incluye?: string[];
  noIncluye?: string[];
  guia?: Prestador | null;
  politicaCancelacion?: string;
  enlaceReserva?: string;
  whatsapp?: string;
  fotos?: FotoConAlt[];
}

export interface Evento {
  _id: string;
  nombre: string;
  fechaInicio: string;
  fechaTermino?: string;
  lugar?: string;
  descripcion?: string;
  enlace?: string;
}

export type TipoFicha = "especie" | "geositio" | "hito";

export interface Ficha {
  _id: string;
  tipo: TipoFicha;
  nombreComun: string;
  nombreCientifico?: string;
  slug: string;
  texto?: unknown[];
  fotos?: FotoConAlt[];
  ubicacion?: { lat: number; lng: number };
}
