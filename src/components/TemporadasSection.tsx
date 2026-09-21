"use client";

import Link from "next/link";
import { Tabs } from "@/components/Tabs";
import { ExperienciaCard } from "@/components/ExperienciaCard";
import type { Experiencia, Temporada } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";

const ORDEN: Temporada[] = ["invierno", "primavera", "verano", "otono"];

const INTRO: Record<Temporada, { es: string; en: string }> = {
  invierno: {
    es: "Nieve, trineo y centro de esquí dentro del parque. La temporada más conocida, con paisajes blancos al pie del volcán.",
    en: "Snow, sledding and the ski center inside the park. The best-known season, with white landscapes at the foot of the volcano.",
  },
  primavera: {
    es: "Deshielos, cascadas con máximo caudal y flores de altura. Ideal para senderismo antes del calor.",
    en: "Snowmelt, waterfalls at full flow and alpine flowers. Ideal for hiking before the heat.",
  },
  verano: {
    es: "Días largos para la laguna, el volcán y las araucarias. La mejor época para acampar y ascensiones.",
    en: "Long days for the lagoon, the volcano and the araucarias. The best time to camp and climb.",
  },
  otono: {
    es: "Bosque nativo en colores, menos gente y cielos despejados. Perfecto para fotografía y cabalgatas.",
    en: "Native forest in autumn colors, fewer people and clear skies. Perfect for photography and horseback rides.",
  },
};

export function TemporadasSection({
  experiencias,
  lang,
}: {
  experiencias: Experiencia[];
  lang: Idioma;
}) {
  const d = getDiccionario(lang);
  const r = rutas(lang);

  const items = ORDEN.map((t) => ({ id: t, label: d.temporadas[t] }));

  const panels = ORDEN.map((t) => {
    const delaTemporada = experiencias.filter((e) => e.temporadas?.includes(t)).slice(0, 3);
    return (
      <div key={t}>
        <p className="mb-6 max-w-2xl text-secundario">{lang === "en" ? INTRO[t].en : INTRO[t].es}</p>
        {delaTemporada.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {delaTemporada.map((e) => (
              <li key={e._id}>
                <ExperienciaCard experiencia={e} lang={lang} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-secundario">
            {lang === "en"
              ? "New activities for this season coming soon."
              : "Pronto más actividades para esta temporada."}
          </p>
        )}
        <p className="mt-6">
          <Link href={r.experiencias} className="font-titulo text-sm font-semibold text-glaciar">
            {lang === "en" ? "See all experiences →" : "Ver todas las experiencias →"}
          </Link>
        </p>
      </div>
    );
  });

  return <Tabs items={items} panels={panels} idInicial="invierno" />;
}
