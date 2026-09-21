import type { Idioma } from "@/lib/i18n";
import { obtenerPronostico, type CategoriaClima } from "@/lib/weather";
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
      ? { titulo: "5-day forecast", nota: "Forecast for Antuco town — conditions in the park may be harsher.", rain: "rain" }
      : { titulo: "Pronóstico a 5 días", nota: "Pronóstico del pueblo de Antuco — en el parque las condiciones pueden ser más extremas.", rain: "lluvia" };

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
              <IconoClima categoria={dia.categoria} />
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
        {pronostico.fuente}
        <IconExternal size={12} />
      </a>
    </section>
  );
}

/** Ícono de línea según la categoría de clima. */
function IconoClima({ categoria }: { categoria: CategoriaClima }) {
  if (categoria === "nieve") return <IconSnow size={28} />;
  if (categoria === "lluvia" || categoria === "tormenta") return <IconRain size={28} />;
  if (categoria === "sol") return <IconSun size={28} />;
  return <IconCloud size={28} />;
}

function nombreDia(iso: string, lang: Idioma) {
  const fecha = new Date(iso);
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-CL", {
    weekday: "short",
    timeZone: "America/Santiago",
  }).format(fecha);
}
