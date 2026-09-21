import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { esIdiomaValido, type Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { fichasQuery } from "@/sanity/lib/queries";
import type { Ficha, TipoFicha } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { FichaCard } from "@/components/FichaCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "Exploring Antuco" : "Explorando Antuco",
    description: en
      ? "Field guide to the species, geosites and landmarks of Antuco."
      : "Guía de campo de las especies, geositios e hitos de Antuco.",
  };
}

const GRUPOS: { tipo: TipoFicha; es: string; en: string }[] = [
  { tipo: "especie", es: "Especies", en: "Species" },
  { tipo: "geositio", es: "Geositios", en: "Geosites" },
  { tipo: "hito", es: "Hitos", en: "Landmarks" },
];

async function obtenerFichas(lang: Idioma): Promise<Ficha[]> {
  const res = await sanityFetch<Ficha[]>({ query: fichasQuery, params: { lang }, tags: [TAGS.ficha] });
  if (res.length === 0 && lang !== "es") {
    return sanityFetch<Ficha[]>({ query: fichasQuery, params: { lang: "es" }, tags: [TAGS.ficha] });
  }
  return res;
}

export default async function ExplorandoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const d = getDiccionario(lang);
  const en = lang === "en";
  const fichas = await obtenerFichas(lang);

  return (
    <>
      <PageHeader
        migas={[{ label: d.nav.inicio, href: rutas(lang).inicio }, { label: d.nav.explorando }]}
        titulo={en ? "Exploring Antuco" : "Explorando Antuco"}
        bajada={
          en
            ? "The territory's field guide: species, geosites and landmarks. Scan the QR codes on the trail signs to read each entry on site."
            : "La guía de campo del territorio: especies, geositios e hitos. Escanea los códigos QR de la señalética en los senderos para leer cada ficha en terreno."
        }
      />

      {/* Guía de campo + QR en lote */}
      <Container as="section">
        <div className="flex flex-col gap-4 rounded-tarjeta border border-tinta/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl">{en ? "Field guide (PDF)" : "Guía de campo (PDF)"}</h2>
            <p className="mt-1 text-sm text-secundario">
              {en
                ? "Download the full guide to take it with you — coming soon."
                : "Descarga la guía completa para llevarla contigo — próximamente."}
            </p>
          </div>
          <Link
            href={`${rutas(lang).explorando}/qr`}
            className="inline-flex items-center justify-center rounded-tarjeta border border-tinta/20 bg-white px-4 py-2.5 font-titulo text-sm font-semibold text-tinta hover:border-tinta/40"
          >
            {en ? "All QR codes (print)" : "Todos los QR (imprimir)"}
          </Link>
        </div>
      </Container>

      {/* Índice de fichas por grupo */}
      <Container as="section" className="space-y-12 py-12">
        {GRUPOS.map((g) => {
          const items = fichas.filter((f) => f.tipo === g.tipo);
          if (items.length === 0) return null;
          return (
            <div key={g.tipo}>
              <h2 className="mb-5 text-2xl">{en ? g.en : g.es}</h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((f) => (
                  <li key={f._id}>
                    <FichaCard ficha={f} lang={lang} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Container>
    </>
  );
}
