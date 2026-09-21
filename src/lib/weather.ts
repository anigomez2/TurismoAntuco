import "server-only";
import type { Idioma } from "@/lib/i18n";

/**
 * Pronóstico del tiempo con Open-Meteo (https://open-meteo.com).
 *
 * - Gratuito, sin API key ni cuota que administrar (elegido por facilidad de
 *   mantención).
 * - Se ejecuta en el servidor y se cachea ~3 h.
 * - Degradación elegante: si la API falla, devuelve null y el sitio sigue
 *   funcionando sin el bloque de clima.
 *
 * Nota: el pronóstico corresponde al pueblo de Antuco. En el parque, a mayor
 * altitud, las condiciones pueden ser más extremas.
 */

// Coordenadas aproximadas del pueblo de Antuco (Biobío).
const ANTUCO_LAT = -37.3336;
const ANTUCO_LON = -71.6785;
const REVALIDATE_PRONOSTICO = 60 * 60 * 3; // 3 horas

export type CategoriaClima = "sol" | "nube" | "lluvia" | "nieve" | "tormenta";

export interface DiaPronostico {
  fechaISO: string;
  minC: number;
  maxC: number;
  frase: string;
  categoria: CategoriaClima;
  probLluviaDia?: number;
}

export interface Pronostico {
  dias: DiaPronostico[];
  enlace: string; // atribución a Open-Meteo
  fuente: string;
}

/** Devuelve el pronóstico de 5 días, o null si no está disponible. */
export async function obtenerPronostico(lang: Idioma): Promise<Pronostico | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${ANTUCO_LAT}&longitude=${ANTUCO_LON}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=America%2FSantiago&forecast_days=5`;

  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_PRONOSTICO, tags: ["clima"] },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as OpenMeteoRespuesta;
    const d = data.daily;
    if (!d?.time?.length) return null;

    const dias: DiaPronostico[] = d.time.map((fecha, i) => {
      const code = d.weather_code?.[i] ?? 0;
      const info = interpretarWMO(code, lang);
      return {
        fechaISO: fecha,
        maxC: Math.round(d.temperature_2m_max?.[i] ?? 0),
        minC: Math.round(d.temperature_2m_min?.[i] ?? 0),
        probLluviaDia: d.precipitation_probability_max?.[i] ?? undefined,
        frase: info.frase,
        categoria: info.categoria,
      };
    });

    return {
      dias,
      enlace: "https://open-meteo.com/",
      fuente: lang === "en" ? "Weather data by Open-Meteo" : "Datos del tiempo por Open-Meteo",
    };
  } catch {
    return null;
  }
}

/** Traduce un código WMO a frase (es/en) y categoría de ícono. */
function interpretarWMO(code: number, lang: Idioma): { frase: string; categoria: CategoriaClima } {
  const es = lang !== "en";
  const map: Record<number, { es: string; en: string; cat: CategoriaClima }> = {
    0: { es: "Despejado", en: "Clear", cat: "sol" },
    1: { es: "Mayormente despejado", en: "Mainly clear", cat: "sol" },
    2: { es: "Parcialmente nublado", en: "Partly cloudy", cat: "nube" },
    3: { es: "Nublado", en: "Overcast", cat: "nube" },
    45: { es: "Niebla", en: "Fog", cat: "nube" },
    48: { es: "Niebla con escarcha", en: "Rime fog", cat: "nube" },
    51: { es: "Llovizna ligera", en: "Light drizzle", cat: "lluvia" },
    53: { es: "Llovizna", en: "Drizzle", cat: "lluvia" },
    55: { es: "Llovizna intensa", en: "Dense drizzle", cat: "lluvia" },
    56: { es: "Llovizna helada", en: "Freezing drizzle", cat: "lluvia" },
    57: { es: "Llovizna helada intensa", en: "Dense freezing drizzle", cat: "lluvia" },
    61: { es: "Lluvia ligera", en: "Light rain", cat: "lluvia" },
    63: { es: "Lluvia", en: "Rain", cat: "lluvia" },
    65: { es: "Lluvia intensa", en: "Heavy rain", cat: "lluvia" },
    66: { es: "Lluvia helada", en: "Freezing rain", cat: "lluvia" },
    67: { es: "Lluvia helada intensa", en: "Heavy freezing rain", cat: "lluvia" },
    71: { es: "Nieve ligera", en: "Light snow", cat: "nieve" },
    73: { es: "Nieve", en: "Snow", cat: "nieve" },
    75: { es: "Nieve intensa", en: "Heavy snow", cat: "nieve" },
    77: { es: "Granos de nieve", en: "Snow grains", cat: "nieve" },
    80: { es: "Chubascos ligeros", en: "Light showers", cat: "lluvia" },
    81: { es: "Chubascos", en: "Showers", cat: "lluvia" },
    82: { es: "Chubascos intensos", en: "Violent showers", cat: "lluvia" },
    85: { es: "Chubascos de nieve", en: "Snow showers", cat: "nieve" },
    86: { es: "Chubascos de nieve intensos", en: "Heavy snow showers", cat: "nieve" },
    95: { es: "Tormenta eléctrica", en: "Thunderstorm", cat: "tormenta" },
    96: { es: "Tormenta con granizo", en: "Thunderstorm with hail", cat: "tormenta" },
    99: { es: "Tormenta con granizo fuerte", en: "Thunderstorm with heavy hail", cat: "tormenta" },
  };
  const e = map[code] ?? map[3];
  return { frase: es ? e.es : e.en, categoria: e.cat };
}

interface OpenMeteoRespuesta {
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: (number | null)[];
  };
}
