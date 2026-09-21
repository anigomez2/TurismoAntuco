import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { experienciasQuery } from "@/sanity/lib/queries";
import type { Experiencia } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ExperienciasCliente } from "@/components/ExperienciasCliente";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "Experiences" : "Experiencias",
    description: en
      ? "Guided tours and activities to discover Antuco in every season."
      : "Salidas guiadas y actividades para descubrir Antuco en cada temporada.",
  };
}

async function obtenerExperiencias(lang: "es" | "en"): Promise<Experiencia[]> {
  const lista = await sanityFetch<Experiencia[]>({
    query: experienciasQuery,
    params: { lang },
    tags: [TAGS.experiencia],
  });
  if (lista.length === 0 && lang !== "es") {
    return sanityFetch<Experiencia[]>({
      query: experienciasQuery,
      params: { lang: "es" },
      tags: [TAGS.experiencia],
    });
  }
  return lista;
}

export default async function ExperienciasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const d = getDiccionario(lang);
  const en = lang === "en";

  const experiencias = await obtenerExperiencias(lang);

  return (
    <>
      <PageHeader
        migas={[
          { label: d.nav.inicio, href: rutas(lang).inicio },
          { label: d.nav.experiencias },
        ]}
        titulo={en ? "What to do in Antuco" : "Qué hacer en Antuco"}
        bajada={
          en
            ? "Guided tours and activities to visit the volcano, the lagoon and the trails — in every season."
            : "Salidas guiadas y actividades para conocer el volcán, la laguna y los senderos — en cada temporada."
        }
      />

      <Container as="section" className="pb-16">
        <ExperienciasCliente experiencias={experiencias} lang={lang} />
      </Container>
    </>
  );
}
