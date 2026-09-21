import { groq } from "next-sanity";

/** Fragmento de imagen: conserva la referencia del asset para urlForImage,
 *  más dimensiones y placeholder difuso (lqip) para evitar saltos de layout. */
const IMG = groq`{
  _key, alt, asset,
  "lqip": asset->metadata.lqip,
  "dims": asset->metadata.dimensions{ width, height }
}`;

// --- Singletons (no traducidos) --------------------------------------------
export const estadoQuery = groq`
  *[_type == "estado"][0]{
    parqueAbierto, estadoCamino, nieveCm, andarivelesOperativos,
    cupos, avisoEs, avisoEn, actualizado
  }
`;

export const configuracionQuery = groq`
  *[_type == "configuracion"][0]{
    email, telefono, whatsapp, direccionOficina, horarioOficina,
    instagram, facebook, enlaceEntradasConaf
  }
`;

// --- Experiencias -----------------------------------------------------------
export const experienciasQuery = groq`
  *[_type == "experiencia" && language == $lang] | order(titulo asc){
    _id, titulo, "slug": slug.current, temporadas, dificultad,
    duracion, grupoMaximo, precioDesde, fotos[]${IMG}
  }
`;

export const experienciaSlugsQuery = groq`
  *[_type == "experiencia" && defined(slug.current)]{ "slug": slug.current, language }
`;

export const experienciaPorSlugQuery = groq`
  *[_type == "experiencia" && slug.current == $slug && language == $lang][0]{
    _id, titulo, "slug": slug.current, temporadas, dificultad, duracion,
    grupoMaximo, precioDesde, descripcion, itinerario, incluye, noIncluye,
    politicaCancelacion, enlaceReserva, whatsapp, fotos[]${IMG},
    guia->{ _id, nombre, tipo, localidad, whatsapp, fotos[]${IMG} }
  }
`;

// --- Prestadores (directorio) ----------------------------------------------
export const prestadoresQuery = groq`
  *[_type == "prestador" && language == $lang] | order(nombre asc){
    _id, nombre, tipo, subtipo, localidad, detalle, precioDesde,
    registradoSernatur, enlaceReserva, whatsapp, ubicacion, fotos[]${IMG}
  }
`;

// --- Eventos (oculta los pasados por fecha) ---------------------------------
export const eventosProximosQuery = groq`
  *[_type == "evento" && language == $lang &&
    coalesce(fechaTermino, fechaInicio) >= $hoy] | order(fechaInicio asc){
    _id, nombre, fechaInicio, fechaTermino, lugar, descripcion, enlace
  }
`;

// --- Fichas de la guía ------------------------------------------------------
export const fichasQuery = groq`
  *[_type == "ficha" && language == $lang] | order(nombreComun asc){
    _id, tipo, nombreComun, nombreCientifico, "slug": slug.current, fotos[]${IMG}
  }
`;

export const fichaSlugsQuery = groq`
  *[_type == "ficha" && defined(slug.current)]{ "slug": slug.current, language }
`;

export const fichaPorSlugQuery = groq`
  *[_type == "ficha" && slug.current == $slug && language == $lang][0]{
    _id, tipo, nombreComun, nombreCientifico, "slug": slug.current,
    texto, ubicacion, fotos[]${IMG}
  }
`;
