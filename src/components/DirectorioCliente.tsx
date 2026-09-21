"use client";

import { useMemo, useState } from "react";
import type { Prestador, TipoPrestador, Localidad } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { PrestadorCard } from "@/components/PrestadorCard";

const TIPOS: { id: TipoPrestador; es: string; en: string; descEs: string; descEn: string }[] = [
  {
    id: "alojamiento",
    es: "Alojamiento",
    en: "Lodging",
    descEs: "Cabañas, hostales, hospedajes y campings. Reserva directo o en la plataforma donde cada uno está publicado.",
    descEn: "Cabins, guesthouses and campgrounds. Book directly or on each provider's platform.",
  },
  {
    id: "comida",
    es: "Dónde comer",
    en: "Where to eat",
    descEs: "Restaurantes, cafés y cocinerías con sabores de la comuna.",
    descEn: "Restaurants, cafés and home kitchens with local flavors.",
  },
  {
    id: "guia",
    es: "Guías y operadores",
    en: "Guides & operators",
    descEs: "Guías y operadores para recorrer el volcán, la laguna y los senderos con seguridad.",
    descEn: "Guides and operators to explore the volcano, the lagoon and the trails safely.",
  },
];

const LOCALIDADES: { id: Localidad | "todas"; es: string; en: string }[] = [
  { id: "todas", es: "Todas las localidades", en: "All localities" },
  { id: "antuco", es: "Antuco", en: "Antuco" },
  { id: "abanico", es: "Abanico", en: "Abanico" },
  { id: "villa-peluca", es: "Villa Peluca", en: "Villa Peluca" },
  { id: "alto-antuco", es: "Alto Antuco", en: "Alto Antuco" },
];

export function DirectorioCliente({
  prestadores,
  lang,
}: {
  prestadores: Prestador[];
  lang: Idioma;
}) {
  const d = getDiccionario(lang);
  const [tipo, setTipo] = useState<TipoPrestador>("alojamiento");
  const [localidad, setLocalidad] = useState<Localidad | "todas">("todas");

  const filtrados = useMemo(
    () =>
      prestadores.filter(
        (p) => p.tipo === tipo && (localidad === "todas" || p.localidad === localidad)
      ),
    [prestadores, tipo, localidad]
  );

  const tipoActivo = TIPOS.find((t) => t.id === tipo)!;

  return (
    <div>
      {/* Pestañas de tipo (estilo píldora) + filtro de localidad */}
      <div className="flex flex-col gap-4 border-b border-tinta/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label={lang === "en" ? "Category" : "Categoría"} className="flex flex-wrap gap-2">
          {TIPOS.map((t) => {
            const activo = t.id === tipo;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={activo}
                onClick={() => setTipo(t.id)}
                className={`toque rounded-full border px-4 py-2 font-titulo text-sm font-semibold transition-colors ${
                  activo
                    ? "border-tinta bg-tinta text-white"
                    : "border-tinta/20 bg-white text-tinta hover:border-tinta/40"
                }`}
              >
                {lang === "en" ? t.en : t.es}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-sm text-secundario">
          <span className="sr-only sm:not-sr-only">{lang === "en" ? "Locality" : "Localidad"}</span>
          <select
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value as Localidad | "todas")}
            className="toque rounded-tarjeta border border-tinta/20 bg-white px-3 py-2 font-titulo text-sm font-semibold text-tinta"
          >
            {LOCALIDADES.map((l) => (
              <option key={l.id} value={l.id}>
                {lang === "en" ? l.en : l.es}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-5 max-w-3xl text-secundario">
        {lang === "en" ? tipoActivo.descEn : tipoActivo.descEs}
      </p>

      {/* Resultados */}
      {filtrados.length === 0 ? (
        <p className="mt-8 rounded-tarjeta border border-tinta/10 bg-white p-6 text-secundario">
          {d.comun.sinResultados}
        </p>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((p) => (
            <li key={p._id}>
              <PrestadorCard prestador={p} lang={lang} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
