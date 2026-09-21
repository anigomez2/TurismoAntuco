"use client";

import { useMemo, useState } from "react";
import type { Experiencia, Temporada, Dificultad } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { ExperienciaCard } from "@/components/ExperienciaCard";

const TEMPORADAS: (Temporada | "todas")[] = ["todas", "invierno", "primavera", "verano", "otono"];
const DIFICULTADES: (Dificultad | "todas")[] = ["todas", "baja", "media", "alta"];

export function ExperienciasCliente({
  experiencias,
  lang,
}: {
  experiencias: Experiencia[];
  lang: Idioma;
}) {
  const d = getDiccionario(lang);
  const [temporada, setTemporada] = useState<Temporada | "todas">("todas");
  const [dificultad, setDificultad] = useState<Dificultad | "todas">("todas");

  const filtradas = useMemo(
    () =>
      experiencias.filter(
        (e) =>
          (temporada === "todas" || e.temporadas?.includes(temporada)) &&
          (dificultad === "todas" || e.dificultad === dificultad)
      ),
    [experiencias, temporada, dificultad]
  );

  const etTodas = lang === "en" ? "All" : "Todas";

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-tinta/10 pb-5">
        <FiltroPills
          etiqueta={lang === "en" ? "Season" : "Temporada"}
          opciones={TEMPORADAS.map((t) => ({
            id: t,
            label: t === "todas" ? etTodas : d.temporadas[t],
          }))}
          activo={temporada}
          onChange={(v) => setTemporada(v as Temporada | "todas")}
        />
        <FiltroPills
          etiqueta={lang === "en" ? "Difficulty" : "Dificultad"}
          opciones={DIFICULTADES.map((t) => ({
            id: t,
            label: t === "todas" ? etTodas : d.dificultades[t],
          }))}
          activo={dificultad}
          onChange={(v) => setDificultad(v as Dificultad | "todas")}
        />
      </div>

      {filtradas.length === 0 ? (
        <p className="mt-8 rounded-tarjeta border border-tinta/10 bg-white p-6 text-secundario">
          {d.comun.sinResultados}
        </p>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((e) => (
            <li key={e._id}>
              <ExperienciaCard experiencia={e} lang={lang} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FiltroPills({
  etiqueta,
  opciones,
  activo,
  onChange,
}: {
  etiqueta: string;
  opciones: { id: string; label: string }[];
  activo: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-titulo text-sm font-semibold text-secundario">{etiqueta}:</span>
      {opciones.map((o) => {
        const on = o.id === activo;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            aria-pressed={on}
            className={`toque rounded-full border px-3.5 py-1.5 font-titulo text-sm font-semibold transition-colors ${
              on
                ? "border-tinta bg-tinta text-white"
                : "border-tinta/20 bg-white text-tinta hover:border-tinta/40"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
