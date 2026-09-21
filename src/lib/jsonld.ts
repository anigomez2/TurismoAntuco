import type { Experiencia, Ficha, Prestador, Evento } from "@/sanity/lib/types";

const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** El destino turístico (para la portada). */
export function jsonLdDestino() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Antuco",
    description:
      "Comuna de Antuco, Región del Biobío, Chile. Parque Nacional Laguna del Laja, volcán Antuco, Sierra Velluda y bosque nativo, dentro de la Reserva de la Biosfera Nevados de Chillán–Laguna del Laja.",
    url: base,
    touristType: ["Naturaleza", "Montaña", "Aventura"],
    geo: { "@type": "GeoCoordinates", latitude: -37.3336, longitude: -71.6785 },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Biobío",
      addressCountry: "CL",
      addressLocality: "Antuco",
    },
  };
}

/** Una experiencia como viaje turístico. */
export function jsonLdExperiencia(e: Experiencia, lang: string) {
  return limpiar({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: e.titulo,
    url: `${base}/${lang}/experiencias/${e.slug}`,
    ...(e.precioDesde
      ? {
          offers: {
            "@type": "Offer",
            price: e.precioDesde,
            priceCurrency: "CLP",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  });
}

/** Una ficha (especie/geositio/hito) como atractivo turístico. */
export function jsonLdFicha(f: Ficha, lang: string) {
  return limpiar({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: f.nombreComun,
    alternateName: f.nombreCientifico,
    url: `${base}/${lang}/ficha/${f.slug}`,
    ...(f.ubicacion
      ? { geo: { "@type": "GeoCoordinates", latitude: f.ubicacion.lat, longitude: f.ubicacion.lng } }
      : {}),
  });
}

/** Un prestador como negocio (alojamiento/restaurante). */
export function jsonLdPrestador(p: Prestador) {
  const tipo =
    p.tipo === "alojamiento" ? "LodgingBusiness" : p.tipo === "comida" ? "Restaurant" : "LocalBusiness";
  return limpiar({
    "@type": tipo,
    name: p.nombre,
    address: {
      "@type": "PostalAddress",
      addressLocality: p.localidad,
      addressRegion: "Biobío",
      addressCountry: "CL",
    },
    ...(p.ubicacion
      ? { geo: { "@type": "GeoCoordinates", latitude: p.ubicacion.lat, longitude: p.ubicacion.lng } }
      : {}),
  });
}

/** Lista de prestadores del directorio. */
export function jsonLdDirectorio(prestadores: Prestador[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: prestadores.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: jsonLdPrestador(p),
    })),
  };
}

/** Un evento de la agenda. */
export function jsonLdEvento(e: Evento) {
  return limpiar({
    "@type": "Event",
    name: e.nombre,
    startDate: e.fechaInicio,
    ...(e.fechaTermino ? { endDate: e.fechaTermino } : {}),
    ...(e.lugar ? { location: { "@type": "Place", name: e.lugar } } : {}),
    ...(e.enlace ? { url: e.enlace } : {}),
  });
}

export function jsonLdAgenda(eventos: Evento[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: eventos.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: jsonLdEvento(e),
    })),
  };
}

/** Quita claves undefined para no ensuciar el JSON. */
function limpiar<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}
