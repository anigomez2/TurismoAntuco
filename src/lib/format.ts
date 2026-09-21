import type { Idioma } from "@/lib/i18n";

/** Formatea un precio en pesos chilenos: 25000 → "$25.000". */
export function formatearPrecio(valor?: number): string | null {
  if (valor === undefined || valor === null || valor <= 0) return null;
  return "$" + new Intl.NumberFormat("es-CL").format(valor);
}

/**
 * Construye el enlace de WhatsApp con mensaje prellenado.
 * numero: solo dígitos con código de país (ej.: 56912345678).
 */
export function urlWhatsApp(numero?: string, mensaje?: string): string | null {
  if (!numero) return null;
  const limpio = numero.replace(/\D/g, "");
  if (limpio.length < 8) return null;
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : "";
  return `https://wa.me/${limpio}${texto}`;
}

/**
 * Etiqueta del botón de reserva según la plataforma del enlace.
 * Booking → "Reservar en Booking"; Airbnb → "Reservar en Airbnb"; otro → "Reservar".
 */
export function etiquetaReserva(url: string | undefined, lang: Idioma): string {
  const base = lang === "en" ? "Book" : "Reservar";
  if (!url) return base;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    if (host.includes("booking")) return lang === "en" ? "Book on Booking" : "Reservar en Booking";
    if (host.includes("airbnb")) return lang === "en" ? "Book on Airbnb" : "Reservar en Airbnb";
  } catch {
    /* URL inválida: se usa la etiqueta genérica */
  }
  return base;
}

/** Formatea una fecha ISO (YYYY-MM-DD) de forma legible según idioma. */
export function formatearFecha(iso: string, lang: Idioma): string {
  const [y, m, d] = iso.split("-").map(Number);
  const fecha = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(fecha);
}

/** Fecha/hora de "actualizado" del estado, legible. */
export function formatearFechaHora(iso: string, lang: Idioma): string {
  const fecha = new Date(iso);
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-CL", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Santiago",
  }).format(fecha);
}
