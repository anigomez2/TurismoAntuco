import type { Idioma } from "@/lib/i18n";
import { obtenerPronostico, type DiaPronostico } from "@/lib/weather";
import { IconSun, IconCloud, IconRain, IconSnow, IconExternal } from "@/components/Icons";

/**
 * Bloque de pronóstico del tiempo (AccuWeather).
 * Server component: si no hay API key o la API falla, no renderiza nada.
 */
export async function Forecast({ lang }: { lang: Idioma }) {
  const pronostico = await obtenerPronostico(lang);
  if (!pronostico) return null;

  const t =
    lang === "en"
      ? { titulo: "5-day forecast", nota: "Forecast for Antuco town — conditions in the park may be harsher.", rain: "rain", fuente: "Forecast by AccuWeather" }
      : { titulo: "Pronóstico a 5 días", nota: "Pronóstico del pueblo de Antuco — en el parque las condiciones pueden ser más extremas.", rain: "lluvia", fuente: "Pronóstico por AccuWeather" };

  return (
    <section aria-label={t.titulo} className="rounded-tarjeta border border-tinta/10 bg-white p-4 sm:p-6">
      <h3 className="font-titulo text-lg font-bold">{t.titulo}</h3>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {pronostico.dias.map((dia) => (
          <li key={dia.fechaISO} className="rounded border border-tinta/10 p-3 text-center">
            <p className="font-titulo text-sm font-semibold capitalize text-tinta">
              {nombreDia(dia.fechaISO, lang)}
            </p>
            <div className="my-2 flex justify-center text-glaciar">
              <IconoClima icono={dia.iconoAccu} />
            </div>
            <p className="font-titulo text-tinta">
              <span className="font-bold">{dia.maxC}°</span>{" "}
              <span className="text-secundario">{dia.minC}°</span>
            </p>
            <p className="mt-1 text-xs leading-snug text-secundario">{dia.frase}</p>
            {typeof dia.probLluviaDia === "number" && dia.probLluviaDia >= 30 && (
              <p className="mt-1 text-xs text-glaciar">{dia.probLluviaDia}% {t.rain}</p>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-secundario">{t.nota}</p>
      <a
        href={pronostico.enlace}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1 text-xs text-secundario hover:text-tinta"
      >
        {t.fuente}
        <IconExternal size={12} />
      </a>
    </section>
  );
}

/** Mapea el número de ícono de AccuWeather a un ícono de línea. */
function IconoClima({ icono }: { icono: number }) {
  if ([19, 20, 21, 22, 23, 24, 25, 26, 29, 43, 44].includes(icono))
    return <IconSnow size={28} />;
  if ([12, 13, 14, 15, 16, 17, 18, 39, 40, 41, 42].includes(icono))
    return <IconRain size={28} />;
  if ([1, 2, 3, 4, 5, 30, 33, 34].includes(icono)) return <IconSun size={28} />;
  return <IconCloud size={28} />;
}

function nombreDia(iso: string, lang: Idioma) {
  const fecha = new Date(iso);
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-CL", {
    weekday: "short",
    timeZone: "America/Santiago",
  }).format(fecha);
}

export type { DiaPronostico };
