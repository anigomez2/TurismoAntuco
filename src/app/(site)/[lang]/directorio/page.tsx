import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { prestadoresQuery } from "@/sanity/lib/queries";
import type { Prestador } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { DirectorioCliente } from "@/components/DirectorioCliente";
import { CtaPublica } from "@/components/CtaPublica";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "Where to sleep and eat" : "Dónde dormir y comer",
    description: en
      ? "Lodging, restaurants and guides in the Antuco commune, in one place."
      : "Alojamiento, dónde comer y guías de la comuna de Antuco, en un solo lugar.",
  };
}

/** Fetch de prestadores con respaldo al español si el idioma no tiene contenido. */
async function obtenerPrestadores(lang: "es" | "en"): Promise<Prestador[]> {
  const lista = await sanityFetch<Prestador[]>({
    query: prestadoresQuery,
    params: { lang },
    tags: [TAGS.prestador],
  });
  if (lista.length === 0 && lang !== "es") {
    return sanityFetch<Prestador[]>({
      query: prestadoresQuery,
      params: { lang: "es" },
      tags: [TAGS.prestador],
    });
  }
  return lista;
}

export default async function DirectorioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const d = getDiccionario(lang);
  const en = lang === "en";

  const prestadores = await obtenerPrestadores(lang);

  return (
    <>
      <PageHeader
        migas={[
          { label: d.nav.inicio, href: rutas(lang).inicio },
          { label: en ? "Directory" : "Directorio" },
        ]}
        titulo={en ? "Where to sleep, eat and who to go out with" : "Dónde dormir, comer y con quién salir"}
        bajada={
          en
            ? "The commune's services gathered in one place. Those marked as registered are listed in Sernatur's National Registry of Tourism Service Providers."
            : "Servicios de la comuna reunidos en un solo lugar. Los marcados como registrados están inscritos en el Registro Nacional de Prestadores de Servicios Turísticos de Sernatur."
        }
      />

      <Container as="section">
        <DirectorioCliente prestadores={prestadores} lang={lang} />
      </Container>

      <Container as="section" className="py-14">
        <CtaPublica lang={lang} />
      </Container>
    </>
  );
}
