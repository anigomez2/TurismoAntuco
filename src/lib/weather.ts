import "server-only";
import type { Idioma } from "@/lib/i18n";

/**
 * Integración con AccuWeather (pronóstico del tiempo).
 *
 * - Solo se ejecuta en el servidor (la API key nunca llega al navegador).
 * - Cachea el pronóstico ~3 h y la clave de localidad ~30 días para respetar
 *   el límite del plan gratuito (50 llamadas/día).
 * - Si falta la API key o la API falla, devuelve null y el sitio sigue
 *   funcionando sin el bloque de clima.
 *
 * Nota: el pronóstico corresponde al pueblo de Antuco. En el parque, a mayor
 * altitud, las condiciones pueden ser más extremas.
 */

const BASE = "https://dataservice.accuweather.com";
// Coordenadas aproximadas del pueblo de Antuco (Biobío).
const ANTUCO_LAT = -37.3336;
const ANTUCO_LON = -71.6785;

const REVALIDATE_LOCACION = 60 * 60 * 24 * 30; // 30 días
const REVALIDATE_PRONOSTICO = 60 * 60 * 3; // 3 horas

export interface DiaPronostico {
  fechaISO: string;
  minC: number;
  maxC: number;
  frase: string;
  iconoAccu: number; // número de ícono de AccuWeather (1-44)
  probLluviaDia?: number;
}

export interface Pronostico {
  dias: DiaPronostico[];
  enlace: string; // enlace a AccuWeather (atribución obligatoria)
}

function idiomaAccu(lang: Idioma) {
  return lang === "en" ? "en-us" : "es";
}

async function resolverLocationKey(apiKey: string): Promise<string | null> {
  const fija = process.env.ACCUWEATHER_LOCATION_KEY?.trim();
  if (fija) return fija;

  const url =
    `${BASE}/locations/v1/cities/geoposition/search` +
    `?apikey=${apiKey}&q=${ANTUCO_LAT},${ANTUCO_LON}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_LOCACION, tags: ["clima"] },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { Key?: string } | null;
    return data?.Key ?? null;
  } catch {
    return null;
  }
}

/** Devuelve el pronóstico de 5 días, o null si no está disponible. */
export async function obtenerPronostico(lang: Idioma): Promise<Pronostico | null> {
  const apiKey = process.env.ACCUWEATHER_API_KEY?.trim();
  if (!apiKey) return null;

  const locationKey = await resolverLocationKey(apiKey);
  if (!locationKey) return null;

  const url =
    `${BASE}/forecasts/v1/daily/5day/${locationKey}` +
    `?apikey=${apiKey}&language=${idiomaAccu(lang)}&metric=true&details=true`;

  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_PRONOSTICO, tags: ["clima"] },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as AccuRespuesta;

    const dias: DiaPronostico[] = (data.DailyForecasts ?? []).map((d) => ({
      fechaISO: d.Date,
      minC: Math.round(d.Temperature?.Minimum?.Value ?? 0),
      maxC: Math.round(d.Temperature?.Maximum?.Value ?? 0),
      frase: d.Day?.IconPhrase ?? "",
      iconoAccu: d.Day?.Icon ?? 1,
      probLluviaDia: d.Day?.PrecipitationProbability,
    }));

    if (dias.length === 0) return null;

    return {
      dias,
      enlace:
        data.Headline?.Link ??
        `https://www.accuweather.com/es/cl/antuco/${locationKey}/weather-forecast/${locationKey}`,
    };
  } catch {
    return null;
  }
}

// --- Tipos parciales de la respuesta de AccuWeather ------------------------
interface AccuRespuesta {
  Headline?: { Link?: string };
  DailyForecasts?: Array<{
    Date: string;
    Temperature?: {
      Minimum?: { Value?: number };
      Maximum?: { Value?: number };
    };
    Day?: { Icon?: number; IconPhrase?: string; PrecipitationProbability?: number };
  }>;
}
