import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IDIOMAS, esIdiomaValido, type Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { historiaQuery } from "@/sanity/lib/queries";
import type { Historia, HistoriaSeccion } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { SanityImage } from "@/components/SanityImage";
import { Parrafos } from "@/components/Parrafos";

async function obtenerHistoria(): Promise<Historia | null> {
  return sanityFetch<Historia | null>({ query: historiaQuery, tags: [TAGS.historia] });
}

function buscarSeccion(historia: Historia | null, slug: string): HistoriaSeccion | undefined {
  return historia?.secciones?.find((s) => s.slug === slug);
}

export async function generateStaticParams() {
  const historia = await obtenerHistoria();
  const params: { lang: string; slug: string }[] = [];
  for (const s of historia?.secciones ?? []) {
    for (const lang of IDIOMAS) params.push({ lang, slug: s.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!esIdiomaValido(lang)) return {};
  const seccion = buscarSeccion(await obtenerHistoria(), slug);
  if (!seccion) return {};
  const en = lang === "en";
  return {
    title: (en ? seccion.tituloEn : seccion.tituloEs) || seccion.tituloEs,
    description: (en ? seccion.resumenEn : seccion.resumenEs) || seccion.resumenEs,
  };
}

export default async function HistoriaDetallePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const idioma = lang as Idioma;
  const seccion = buscarSeccion(await obtenerHistoria(), slug);
  if (!seccion) notFound();

  const d = getDiccionario(idioma);
  const en = idioma === "en";
  const titulo = (en ? seccion.tituloEn : seccion.tituloEs) || seccion.tituloEs;
  const contenido = (en ? seccion.contenidoEn : seccion.contenidoEs) || seccion.contenidoEs;

  return (
    <>
      <PageHeader
        migas={[
          { label: d.nav.inicio, href: rutas(idioma).inicio },
          { label: d.nav.historia, href: rutas(idioma).historia },
          { label: titulo },
        ]}
        titulo={titulo}
      />

      <Container as="article" className="pb-16">
        <div className="mx-auto max-w-3xl">
          {seccion.foto && (
            <div className="mb-8 overflow-hidden rounded-tarjeta">
              <SanityImage foto={seccion.foto} priority sizes="(min-width:768px) 768px, 100vw" className="w-full object-cover" />
            </div>
          )}
          <div className="text-lg">
            <Parrafos texto={contenido} />
          </div>
        </div>
      </Container>
    </>
  );
}
