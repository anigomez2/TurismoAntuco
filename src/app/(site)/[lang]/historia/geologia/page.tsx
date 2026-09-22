import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido, type Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { historiaQuery } from "@/sanity/lib/queries";
import type { Historia } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { SanityImage } from "@/components/SanityImage";
import { Parrafos } from "@/components/Parrafos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "The geological history of the Antuco Volcano" : "La historia geológica del Volcán Antuco",
    description: en
      ? "How the Antuco volcano, Sierra Velluda and the collapse that dammed Laguna del Laja shaped the landscape."
      : "Cómo el volcán Antuco, la Sierra Velluda y el colapso que represó la Laguna del Laja formaron el paisaje.",
  };
}

export default async function GeologiaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const idioma = lang as Idioma;
  const d = getDiccionario(idioma);
  const en = idioma === "en";

  const historia = await sanityFetch<Historia | null>({
    query: historiaQuery,
    tags: [TAGS.historia],
  });

  const titulo =
    (en ? historia?.heroTituloEn : historia?.heroTituloEs) ||
    (en ? "The geological history of the Antuco Volcano" : "La historia geológica del Volcán Antuco");
  const contenido =
    (en ? historia?.heroContenidoEn : historia?.heroContenidoEs) ||
    (en ? historia?.heroTextoEn : historia?.heroTextoEs);

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
          {historia?.heroFoto && (
            <div className="mb-8 overflow-hidden rounded-tarjeta">
              <SanityImage foto={historia.heroFoto} priority sizes="(min-width:768px) 768px, 100vw" className="w-full object-cover" />
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
